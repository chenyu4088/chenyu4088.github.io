import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import rehypeSlug from 'rehype-slug';

export default defineConfig({
  site: 'https://www.mc33.top',
  output: 'static',
  markdown: {
    processor: unified({ rehypePlugins: [rehypeSlug] }),
  },
});
