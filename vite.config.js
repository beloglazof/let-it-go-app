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
      manifest: false,
      registerType: 'autoUpdate',
      includeAssets: [
        'cat-frames/frame23.svg',
        'cat-frames/frame28.svg',
        'cat-frames/frame33.svg',
        'cat-frames/frame38.svg',
        'cat-frames/frame43.svg',
        'cat-frames/frame48.svg',
        'cat-frames/frame53.svg',
        'cat-frames/frame58.svg',
        'cat-frames/frame63.svg',
        'cat-frames/frame68.svg',
        'cat-frames/frame73.svg',
        'cat-frames/frame78.svg',
        'cat-frames/frame83.svg',
        'cat-frames/frame88.svg',
        'cat-frames/frame93.svg',
        'cat-frames/frame98.svg',
        'cat-frames/frame103.svg',
        'cat-frames/frame108.svg',
        'cat-frames/frame113.svg',
        'cat-frames/frame2.svg',
        'cat-frames/frame7.svg',
        'cat-frames/frame12.svg',
        'cat-frames/frame17.svg',
        'cat-frames/frame22.svg',
      ],
      workbox: { globPatterns: ['**/*.{js,css,html}'] },
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
