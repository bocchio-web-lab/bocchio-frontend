// src/routes/api/blog/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import type { BlogPost } from '$lib/types/blog';

// Example in-memory data (replace with DB or JSON later)
const posts: BlogPost[] = [
    {
        slug: 'first-thoughts-on-robotics',
        title: 'First Thoughts on Robotics',
        date: '2025-10-29',
        content:
            'Exploring the foundations of robotic motion, grasping, and perception in modern frameworks. This post dives deep into the underlying kinematic principles, control architectures, and future trends shaping intelligent manipulation systems.'
    },
    {
        slug: 'future-of-jet-wing-flight',
        title: 'The Future of Jet-Wing Flight',
        date: '2025-11-01',
        content:
            'Personal aerial mobility is no longer science fiction — the technology is converging fast. Advances in control, propulsion, and lightweight materials are enabling new paradigms in flight. In this post, we analyze the key breakthroughs that could make personal jet-wings a reality.'
    }
];

// Return all post previews
export const GET: RequestHandler = () => {
    return new Response(JSON.stringify(posts), {
        headers: { 'Content-Type': 'application/json' }
    });
};
