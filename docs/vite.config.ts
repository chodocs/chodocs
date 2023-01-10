import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import { resolve } from 'path';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
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

      Components({
        dirs: resolve(__dirname, '.vitepress/theme/components'),
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          IconsResolver({
            componentPrefix: '',
          }),
        ],
        dts: './.vitepress/components.d.ts',
        transformer: 'vue3',
      }),
      UnoCSS(),
    ]
  }
});