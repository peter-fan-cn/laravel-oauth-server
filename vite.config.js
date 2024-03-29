import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server:{ },
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
                'resources/app/main.jsx',
            ],
            refresh: true,
        }),
        react(),
    ],
    resolve:{
        alias:{
            '@':'resources/app'
        }
    }
});
