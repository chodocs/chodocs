import { resolve } from 'node:path'
import { createRequire } from 'node:module'
import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { MarkdownTransform } from './.vitepress/plugins/markdownTransform'

const require = createRequire(import.meta.url)

export default defineConfig(async () => {
  return <UserConfig>{
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
      // custom
      MarkdownTransform(),
      // plugins
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
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        defaultStyle: 'display: inline-block',
      }),
      UnoCSS(),
    ],
    css: {
      postcss: {
        plugins: [
          require('postcss-nested'),
        ],
      },
    },
  }
})
