// src/routes/auth/reset-password/+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { getCsrfToken } from '$lib/server/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://bocchio-backend.test';

export const load = (() => {
    // No redirect needed - anyone can access password reset
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email')?.toString();

        if (!email) {
            return fail(400, {
                error: 'Email is required',
                email
            });
        }

        try {
            // Get CSRF token
            const csrfSuccess = await getCsrfToken(cookies);
            if (!csrfSuccess) {
                return fail(500, {
                    error: 'Failed to initialize session',
                    email
                });
            }

            const xsrfToken = cookies.get('XSRF-TOKEN');
            const sessionCookie = cookies.get('backend_bocchio_session');

            const formData = new FormData();
            formData.append('email', email);

            const response = await fetch(`${API_BASE_URL}/forgot-password`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
                headers: {
                    'X-XSRF-TOKEN': decodeURIComponent(xsrfToken!),
                    accept: 'application/json',
                    Cookie: `backend_bocchio_session=${sessionCookie}; XSRF-TOKEN=${xsrfToken}`
                }
            });

            if (response.ok) {
                return {
                    success: true,
                    email
                };
            }

            if (response.status === 422) {
                const result = await response.json();
                return fail(422, {
                    error: 'Validation failed',
                    errors: result.errors,
                    email
                });
            }

            return fail(response.status, {
                error: 'Failed to send reset link',
                email
            });
        } catch (error) {
            console.error('Password reset error:', error);
            return fail(500, {
                error: 'An error occurred. Please try again.',
                email
            });
        }
    }
} satisfies Actions;