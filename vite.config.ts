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
                                    maxRetentionTime: 24 * 60 * 90, // 90 days
                                },
                            },
                        },
                    },
                ],
            },
            manifest: {
                name: 'Five Minute Journal Lite',
                short_name: 'JournalLite',
                description: 'PWA of Five Minute Journal',
                lang: 'en-US',
                display: 'standalone',
                theme_color: '#EDEDE5',
                icons: [
                    {
                        src: '/icons/icon-16x16.png',
                        sizes: '16x16',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-32x32.png',
                        sizes: '32x32',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-57x57.png',
                        sizes: '57x57',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-60x60.png',
                        sizes: '60x60',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-72x72.png',
                        sizes: '72x72',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-76x76.png',
                        sizes: '76x76',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-96x96.png',
                        sizes: '96x96',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-120x120.png',
                        sizes: '120x120',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-128x128.png',
                        sizes: '128x128',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-144x144.png',
                        sizes: '144x144',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-152x152.png',
                        sizes: '152x152',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-167x167.png',
                        sizes: '167x167',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-180x180.png',
                        sizes: '180x180',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-256x256.png',
                        sizes: '256x256',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-384x384.png',
                        sizes: '384x384',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
        }),
    ],
});
