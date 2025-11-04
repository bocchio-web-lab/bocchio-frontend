import type { PageLoad } from './$types';
import type { BlogPost } from '$lib/types';

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch('/api/blog');
    const posts: BlogPost[] = await res.json();
    return { posts };
};
