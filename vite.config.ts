import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
    server: {
        host: process.env.VITE_SERVER_HOST || 'localhost', // Add this to force IPv4 only
        hmr: {
            host: process.env.VITE_SERVER_HOST || 'localhost',
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
});
