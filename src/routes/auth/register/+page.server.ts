import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (({ cookies }) => {

    if (cookies.get('bearer_token_auth')) {
        redirect(307, '/dashboard');
    }

}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, cookies }) => {

        const data = await request.formData();

        try {
            const csrfResponse = await fetch('http://bocchio-backend.test/sanctum/csrf-cookie');

            const csrfCookie = csrfResponse.headers.getSetCookie();
            const xsrfToken: string = csrfCookie.find(cookie => cookie.startsWith('XSRF-TOKEN'))?.split(';')[0].split('=')[1];
            const backend_bocchio_session: string = csrfCookie.find(cookie => cookie.startsWith('backend_bocchio_session'))?.split(';')[0].split('=')[1];

            cookies.set('XSRF-TOKEN', xsrfToken, { path: '/' });
            cookies.set('backend_bocchio_session', backend_bocchio_session, { path: '/' });

            const loginResponse = await fetch('http://bocchio-backend.test/login',
                {
                    body: data,
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
                        'accept': 'application/json',
                        Cookie: `backend_bocchio_session=${backend_bocchio_session}; XSRF-TOKEN=${xsrfToken}`,
                    },
                    cache: 'no-cache',
                }
            );

            return { success: loginResponse.status == 200, statusText: loginResponse.statusText };

        } catch (error) {
            console.error('An error occurred:', error);
        }

    }
} satisfies Actions;
