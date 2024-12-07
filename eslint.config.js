module.exports = {
  parser: '@babel/eslint-parser',
  files: ['src/**/*.{js,ts,jsx,tsx}'],
  rules: {
    semi: ['error'],
    'no-unused-vars': 'warn',
  },
  linterOptions: {
    reportUnusedDisableDirectives: 'error',
  },
};
