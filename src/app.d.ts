// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user: {
                id: number;
                name: string;
                email: string;
                email_verified_at?: string;
            } | null;
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export { };
