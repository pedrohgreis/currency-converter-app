// eslint.config.js
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';

export default [
  // Configurações base do ESLint
  eslint.configs.recommended,

  // Configurações para TypeScript + React
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parser: parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Habilita JSX
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react': pluginReact,
    },
    rules: {
      'semi': ['error', 'always'],
      'quotes': ['error', 'double'],
      'react/jsx-uses-react': 'error', // Evita warnings do React
      'react/jsx-uses-vars': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
];