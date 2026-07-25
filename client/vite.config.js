import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { heroMediaPlugin } from './vite/heroMediaPlugin';
export default defineConfig({
    plugins: [react(), heroMediaPlugin()],
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
            },
        },
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
});
