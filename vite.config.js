import { VitePWA } from 'vite-plugin-pwa';

export default {
  server: {
    port: 3801,
  },
  preview: {
    port: 3801,
  },
  plugins: [
    VitePWA({
      manifest: {
        name: 'Просто отпусти это',
        short_name: 'Отпускай',
        description: 'Вместе с котиком :3',
        theme_color: '#ffffff',
        background_color: '#2d2d2d',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'cat-frames/*.svg',
      ],
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: { enabled: true },
    }),
  ],
  // Optional: Silence Sass deprecation warnings. See note below.
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          'import',
          'mixed-decls',
          'color-functions',
          'global-builtin',
        ],
      },
    },
  },
};
