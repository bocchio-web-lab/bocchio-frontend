// src/routes/api/projects/+server.ts
import { projects } from '$lib/data/projects';
import { json } from '@sveltejs/kit';

export const GET = async () => json(projects);
