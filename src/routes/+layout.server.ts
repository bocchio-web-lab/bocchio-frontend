import type { LayoutServerLoad } from './$types';
import { getUser } from '$lib/server/auth';

// Need fix...
export const load: LayoutServerLoad = async ({ locals }) => {
    return {
        user: locals.user
    };
};