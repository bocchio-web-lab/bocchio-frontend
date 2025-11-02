export interface App {
    slug: string;
    name: string;
    image: string;
    description: string;
    url: string;
    tech_stack?: string[];
    released?: string;
}
