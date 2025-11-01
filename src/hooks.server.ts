import type { Handle } from "@sveltejs/kit"


export const handle: Handle = async ({ event, resolve }) => {

    const session = event.cookies.get('session')

    if (!session) { return await resolve(event) }

    const user = await db.user.findUnique({
        where: { userAuthToken: session },
        select: { username: true, role: true },
    })

    if (user) {
        event.locals.user = {
            nickname: user.nickname,
        }
    }

    return await resolve(event)
}