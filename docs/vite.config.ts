import { defineConfig } from 'vite';
import { resolve } from 'path';
import { MarkdownTransform } from './.vitepress/plugins/markdownTransform';
import { Contributors } from './.vitepress/plugins/contributors';
import { getDocsContributors } from '../scripts/contributors';


export default defineConfig(async () => {

  const [contributions] = await Promise.all([
    getDocsContributors(),
  ])

  return {
    server: {
      hmr: {
        overlay: false,
      },
      fs: {
        allow: [
          resolve(__dirname, '..'),
        ],
      },
    },
    plugins: [
      MarkdownTransform(),
      Contributors(contributions),
    ]
  }
});