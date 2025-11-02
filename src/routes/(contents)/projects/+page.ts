import type { PageLoad } from './$types';
import type { Project } from '$lib/types';

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch('/api/projects');
    const projects: Project[] = await res.json();
    return { projects };
};
