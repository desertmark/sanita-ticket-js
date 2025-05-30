module.exports = {
  extends: 'erb',
  plugins: ['@typescript-eslint'],
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-import-module-exports': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'eslint-plugin-import/no-relative-packages': 'off',
    'compat/compat': 'off',
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'react/function-component-definition': 'off',
    'no-plusplus': 'off',
    'no-console': 'off',
    'no-alert': 'off',
    'react/require-default-props': 'off',
    'no-return-await': 'off',
    radix: 'off',
    'no-empty-function': 'off',
    'no-empty-constructor': 'off',
    'no-useless-constructor': 'off',
  },
  globals: {
    NodeJS: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
      },
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
