export interface Project {
    slug: string;
    name: string;
    year?: number;
    image: string;
    description: string;
    readme_html?: string;
    technologies?: string[];
    repo_url?: string;
    website_url?: string;
    category?: string;
}
