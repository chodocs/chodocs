const restricted = [
  '..',
  '../..',
]

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: '@antfu',
  rules: {
    'vue/no-deprecated-functional-template': 'off',
    'vue/one-component-per-file': 'off',
    'vue/no-template-shadow': 'off',
    'vue/require-prop-types': 'off',
    'spaced-comment': ['error', 'always', { exceptions: ['#__PURE__'] }],
    'no-restricted-imports': [
      'error',
      {
        paths: restricted,
      },
    ],
    'node/no-callback-literal': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'n/prefer-global/process': 'off',
  },
  overrides: [
    {
      files: ['**/*.md', '**/*.md/*.*', 'demo.vue', 'demo.client.vue', 'scripts/*.ts', '*.test.ts', 'utils.ts'],
      rules: {
        'no-alert': 'off',
        'no-console': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-restricted-imports': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-invalid-this': 'off',
        'unused-imports/no-unused-vars': 'off',
        '@typescript-eslint/no-this-alias': [
          'error',
          {
            allowedNames: ['self', 'instance'],
          },
        ],
      },
    },
    {
      files: ['docs/.vitepress/**/*.*'],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
    {
      files: ['docs/.vitepress/theme/plugins/**/*.*'],
      rules: {
        'prefer-rest-params': 'off',
      },
    },
  ],
}
