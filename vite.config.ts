import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        brotliSize: false,
    },
    plugins: [
        tsconfigPaths(),
        reactRefresh(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                cleanupOutdatedCaches: true,
                clientsClaim: true,
                skipWaiting: true,
                navigateFallback: undefined,
                runtimeCaching: [
                    {
                        handler: 'NetworkOnly',
                        urlPattern: 'http://localhost:4000/graphql',
                        method: 'POST',
                        options: {
                            backgroundSync: {
                                name: 'journals',
                                options: {
                                    maxRetentionTime: 24 * 60 * 90,
                                },
                            },
                        },
                    },
                ],
            },
            manifest: {
                name: 'five minute journal lite',
                short_name: 'Lite',
                display: 'fullscreen',
                theme_color: '#EDEDE5',
                icons: [
                    {
                        src: '/icon_512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
        }),
    ],
});
