// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/prefer-as-const': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      
      // Vue rules
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-components': 'warn',
      'vue/no-unused-vars': 'warn',
      'vue/require-default-prop': 'off',
      'vue/html-self-closing': 'off',
      
      // General rules
      'no-console': 'warn',
      'no-unused-vars': 'off', // Tắt để dùng rule của TypeScript
      'prefer-const': 'warn',
      'no-var': 'error',
    },
  },
  {
    // Config cho files cụ thể
    files: ['**/*.vue', '**/*.ts', '**/*.js'],
  },
  {
    // Override cho test files
    files: ['**/*.test.ts', '**/*.spec.ts', '**/test/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },
  {
    // Override cho config files
    files: ['**/*.config.*', '**/nuxt.config.*'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },
)