import { resolve } from 'path';
import { preview } from 'vite';

export default {
  server: {
    port: 3801,
  },
  preview: {
    port: 3801,
  },
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
