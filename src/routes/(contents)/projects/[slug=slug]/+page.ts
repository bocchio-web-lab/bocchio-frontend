import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
    const res = await fetch(`/api/projects/${params.slug}`);
    const project = await res.json();

    return { project };
};
