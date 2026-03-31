import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://motionbug.github.io',
  base: '/mcri',
  vite: {
    plugins: [tailwindcss()],
  },
});
