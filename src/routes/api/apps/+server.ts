// src/routes/api/apps/+server.ts
import type { RequestHandler } from '@sveltejs/kit';

interface AppEntry {
    id: string;
    title: string;
    description: string;
    image: string;
    url: string;
    buttonLabel?: string;
}

const apps: AppEntry[] = [
    {
        id: 'connect4',
        title: 'Connect 4 Game',
        description: 'Play a classic Connect-4 against an AI or with a friend online.',
        image: '/images/profile.png',
        url: '/apps/connect4',
    },
    {
        id: 'identity',
        title: 'Identity Service',
        description: 'Manage authentication and API access across your microservices.',
        image: '/images/profile.png',
        url: '/apps/identity',
    },
    {
        id: 'graph-analyzer',
        title: 'Graph Analyzer',
        description: 'Visualize and analyze complex graph networks directly in your browser.',
        image: '/images/profile.png',
        url: '/apps/graph-analyzer',
    }
];

export const GET: RequestHandler = () => {
    return new Response(JSON.stringify(apps), {
        headers: { 'Content-Type': 'application/json' }
    });
};
