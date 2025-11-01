// src/routes/api/projects/[slug]/+server.ts
import { projects } from '$lib/data/projects';
import { json } from '@sveltejs/kit';

export const GET = async ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) return json({ error: 'Not found' }, { status: 404 });
    return json(project);
};
