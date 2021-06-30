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
            workbox: {
                additionalManifestEntries: [
                    // eslint-disable-next-line unicorn/no-null
                    { url: 'https://rsms.me/inter/inter.css', revision: null },
                ],
                cleanupOutdatedCaches: true,
                clientsClaim: true,
                skipWaiting: true,
                navigateFallback: undefined,
            },
            manifest: {
                name: 'five minute journal lite',
                short_name: 'Lite',
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
