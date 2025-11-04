// src/lib/server/auth.ts
import { redirect, type Cookies } from '@sveltejs/kit';
import * as setCookie from 'set-cookie-parser';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://bocchio-backend.test';

interface AuthResponse {
    success: boolean;
    message?: string;
    errors?: Record<string, string[]>;
}

/**
 * Get CSRF token from Laravel Sanctum
 */
export async function getCsrfToken(cookies: Cookies): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, {
            credentials: 'include'
        });

        if (!response.ok) {
            return false;
        }

        const cookiesArray = setCookie.parse(response.headers.getSetCookie() || '', {
            decodeValues: true,
            map: false
        });

        cookiesArray.forEach((cookie) => {
            cookies.set(cookie.name, cookie.value, {
                path: '/',
                httpOnly: cookie.httpOnly ?? true,
                secure: cookie.secure ?? false,
                sameSite: (cookie.sameSite as 'strict' | 'lax' | 'none') ?? 'lax',
                maxAge: cookie.maxAge
            });
        });

        return true;
    } catch (error) {
        console.error('Failed to get CSRF token:', error);
        return false;
    }
}

/**
 * Make authenticated request to Laravel backend
 */
async function makeAuthRequest(
    endpoint: string,
    method: string,
    cookies: Cookies,
    body?: FormData
): Promise<Response> {
    const xsrfToken = cookies.get('XSRF-TOKEN');
    const sessionCookie = cookies.get('backend_bocchio_session');

    if (!xsrfToken || !sessionCookie) {
        return new Response(null, { status: 401 });
    }

    return await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        body,
        credentials: 'include',
        headers: {
            'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
            accept: 'application/json',
            Cookie: `backend_bocchio_session=${sessionCookie}; XSRF-TOKEN=${xsrfToken}`,
        }
    });
}

/**
 * Login user
 */
export async function login(
    email: string,
    password: string,
    cookies: Cookies
): Promise<AuthResponse> {
    try {
        // Get CSRF token first
        const csrfSuccess = await getCsrfToken(cookies);
        if (!csrfSuccess) {
            return { success: false, message: 'Failed to initialize session' };
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        const response = await makeAuthRequest('/login', 'POST', cookies, formData);

        if (response.ok) {
            return { success: true };
        }

        // Handle validation errors
        if (response.status === 422) {
            const data = await response.json();
            return {
                success: false,
                message: 'Validation failed',
                errors: data.errors
            };
        }

        return {
            success: false,
            message: response.statusText || 'Login failed'
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: 'An error occurred during login'
        };
    }
}

/**
 * Register new user
 */
export async function register(
    userData: {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    },
    cookies: Cookies
): Promise<AuthResponse> {
    try {
        // Get CSRF token first
        const csrfSuccess = await getCsrfToken(cookies);
        if (!csrfSuccess) {
            return { success: false, message: 'Failed to initialize session' };
        }

        const formData = new FormData();
        Object.entries(userData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const response = await makeAuthRequest('/register', 'POST', cookies, formData);

        if (response.ok) {
            return { success: true };
        }

        // Handle validation errors
        if (response.status === 422) {
            const data = await response.json();
            return {
                success: false,
                message: 'Validation failed',
                errors: data.errors
            };
        }

        return {
            success: false,
            message: response.statusText || 'Registration failed'
        };
    } catch (error) {
        console.error('Registration error:', error);
        return {
            success: false,
            message: 'An error occurred during registration'
        };
    }
}

/**
 * Logout user
 */
export async function logout(cookies: Cookies): Promise<void> {
    try {
        await makeAuthRequest('/logout', 'POST', cookies);
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        // Clear all auth cookies
        cookies.delete('XSRF-TOKEN', { path: '/' });
        cookies.delete('backend_bocchio_session', { path: '/' });
    }
}

/**
 * Get authenticated user
 */
export async function getUser(cookies: Cookies): Promise<any | null> {
    try {
        const response = await makeAuthRequest('/api/user', 'GET', cookies);

        if (response.ok) {
            return await response.json();
        }

        return null;
    } catch (error) {
        console.error('Get user error:', error);
        return null;
    }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(cookies: Cookies): Promise<boolean> {
    const sessionCookie = cookies.get('backend_bocchio_session');
    if (!sessionCookie) {
        return false;
    }

    const user = await getUser(cookies);
    return user !== null;
}


/**
 * Require authentication - redirect to login if not authenticated
 */
export async function requireAuth(cookies: Cookies, redirectTo: string = '/auth/login') {
    const authenticated = await isAuthenticated(cookies);
    if (!authenticated) {
        throw redirect(302, redirectTo);
    }
}