// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'app',
  vue: true,
  typescript: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  ignores: [
    '**/dist',
    '**/node_modules',
    '**/.vitepress/cache',
    '**/*.md', // Ignore markdown files to avoid parsing errors in code examples
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
  // Demo files and pattern examples - relaxed rules like VueUse
  files: [
    'demo.vue',
    'demo.client.vue',
    'scripts/*.ts',
    '*.test.ts',
    'utils.ts',
    '**/patterns/**/utils.ts', // Pattern example files
  ],
  rules: {
    'no-alert': 'off',
    'no-console': 'off',
    'no-undef': 'off',
    'unused-imports/no-unused-vars': 'off',
    'ts/no-this-alias': 'off', // Allow for singleton pattern examples
  },
}, {
  // RSS Feed plugin
  files: ['docs/.vitepress/plugins/genFeed.ts'],
  rules: {
    'regexp/no-super-linear-backtracking': 'off', // Allow for HTML parsing regex
  },
}, {
  // VitePress theme plugins
  files: ['docs/.vitepress/theme/plugins/**/*.*'],
  rules: {
    'prefer-rest-params': 'off',
  },
})
