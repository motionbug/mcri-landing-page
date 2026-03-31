import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://motionbug.github.io',
  base: '/mcri-landing-page',
  vite: {
    plugins: [tailwindcss()],
  },
});
