// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { getUser } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.user = await getUser(event.cookies);
    return resolve(event);
};
