// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'app',
  vue: true,
  typescript: true,
  markdown: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  ignores: [
    '**/dist',
    '**/node_modules',
    '**/.vitepress/cache',
  ],
}, {
  // Custom rule overrides
  rules: {
    'vue/no-deprecated-functional-template': 'off',
    'vue/one-component-per-file': 'off',
    'vue/no-template-shadow': 'off',
    'vue/require-prop-types': 'off',
    'node/no-callback-literal': 'off',
    'n/prefer-global/process': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
  },
}, {
  // Markdown and script files
  files: ['**/*.md', '**/*.md/*.*', 'demo.vue', 'demo.client.vue', 'scripts/*.ts', '*.test.ts', 'utils.ts'],
  rules: {
    'no-alert': 'off',
    'no-console': 'off',
    'no-undef': 'off',
    'unused-imports/no-unused-vars': 'off',
  },
}, {
  // VitePress theme plugins
  files: ['docs/.vitepress/theme/plugins/**/*.*'],
  rules: {
    'prefer-rest-params': 'off',
  },
})
