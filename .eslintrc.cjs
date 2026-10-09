module.exports = {
  root: true,
  ignorePatterns: ['node_modules/', '.next/', 'dist/', 'build/', 'coverage/'],
  overrides: [
    {
      files: ['apps/api/**/*.ts', 'packages/**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      },
    },
  ],
};
