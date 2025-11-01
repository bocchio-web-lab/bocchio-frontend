import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (() => {

    redirect(302, '/');

}) satisfies PageServerLoad;

export const actions = {
    default({ cookies }) {
        cookies.set('backend_bocchio_session', '', {
            path: '/',
            expires: new Date(0),
        })

        redirect(302, '/auth/login');
    },
} satisfies Actions;