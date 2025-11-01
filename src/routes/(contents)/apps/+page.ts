import type { PageLoad } from './$types';

export const load = (async () => {

    // const res = await fetch('https://dummyjson.com/apps/search?q=' + param.params.contentType);
    const res = await fetch('http://blogger.test/api/posts');
    const apps = await res.json();

    return { apps };

}) satisfies PageLoad;