import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import rehypeSlug from 'rehype-slug';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mc33.top',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    processor: unified({ rehypePlugins: [rehypeSlug] }),
  },
});
