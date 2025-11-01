// src/routes/api/blog/+server.ts
import type { RequestHandler } from '@sveltejs/kit';

interface BlogPost {
    id: string;
    title: string;
    date: string;
    preview: string;
    content?: string;
}

// Example in-memory data (replace with DB or JSON later)
const posts: BlogPost[] = [
    {
        id: '1',
        title: 'First Thoughts on Robotics',
        date: '2025-10-29',
        preview:
            'Exploring the foundations of robotic motion, grasping, and perception in modern frameworks...',
        content:
            'Exploring the foundations of robotic motion, grasping, and perception in modern frameworks. This post dives deep into the underlying kinematic principles, control architectures, and future trends shaping intelligent manipulation systems.'
    },
    {
        id: '2',
        title: 'The Future of Jet-Wing Flight',
        date: '2025-11-01',
        preview:
            'Personal aerial mobility is no longer science fiction — the technology is converging fast...',
        content:
            'Personal aerial mobility is no longer science fiction — the technology is converging fast. Advances in control, propulsion, and lightweight materials are enabling new paradigms in flight. In this post, we analyze the key breakthroughs that could make personal jet-wings a reality.'
    }
];

// Return all post previews
export const GET: RequestHandler = ({ url }) => {
    const id = url.searchParams.get('id');

    if (id) {
        const post = posts.find((p) => p.id === id);
        if (!post) return new Response('Not found', { status: 404 });
        return new Response(JSON.stringify(post), { headers: { 'Content-Type': 'application/json' } });
    }

    const previews = posts.map(({ id, title, date, preview }) => ({ id, title, date, preview }));
    return new Response(JSON.stringify(previews), { headers: { 'Content-Type': 'application/json' } });
};
