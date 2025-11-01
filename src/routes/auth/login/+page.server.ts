import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import * as setCookie from 'set-cookie-parser';

export const load = (({ cookies }) => {

    // if (cookies.get('backend_bocchio_session')) {
    //     redirect(307, '/dashboard');
    // }

}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, cookies, locals }) => {

        const data = await request.formData();
        const csrfResponse = await fetch('http://bocchio-backend.test/sanctum/csrf-cookie');

        let cookiesArray = setCookie.parse(csrfResponse.headers.getSetCookie() || '', {
            decodeValues: true,
            map: false,
        });

        cookiesArray.forEach(cookie => {
            cookies.set(cookie.name, cookie.value, {
                secure: true,
                httpOnly: true,
                path: '/'
            });
        });

        const xsrfToken = cookies.get('XSRF-TOKEN');
        const backend_bocchio_session = cookies.get('backend_bocchio_session');

        if (!xsrfToken || !backend_bocchio_session) {
            return fail(csrfResponse.status, { message: csrfResponse.statusText });
        }

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

        // const userResponse = await fetch('http://bocchio-backend.test/user',
        //     {
        //         method: 'GET',
        //         credentials: 'include',
        //         headers: {
        //             'accept': 'application/json',
        //             Cookie: `backend_bocchio_session=${backend_bocchio_session}; XSRF-TOKEN=${xsrfToken}`,
        //         },
        //         cache: 'no-cache',
        //     }
        // );

        // const user = await userResponse.json();

        // locals.user = {
        //     nickname: user.nickname,
        // };

        // return { success: userResponse.status == 200, statusText: userResponse.statusText };

    }
} satisfies Actions;
