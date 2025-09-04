import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [['module:@preact/signals-react-transform']],
            },
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@hooks': path.resolve(__dirname, './src/hooks'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
});
