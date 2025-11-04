// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { requireAuth } from '$lib/server/auth';

export const load = (async ({ cookies, locals }) => {
    // Require authentication
    await requireAuth(cookies);

    // User is already available in locals from hooks
    return {
        user: locals.user
    };
}) satisfies PageServerLoad;