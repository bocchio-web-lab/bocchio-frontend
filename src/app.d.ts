// src/app.d.ts
declare global {
    namespace App {
        interface Locals {
            user: {
                id: number;
                name: string;
                email: string;
                email_verified_at: string | null;
                created_at: string;
                updated_at: string;
            } | null;
        }

        interface PageData {
            user: App.Locals['user'];
        }
    }
}

export { };