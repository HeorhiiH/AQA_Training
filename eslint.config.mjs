import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
     languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        projectService: {
          allowDefaultProject: ['eslint.config.mjs']
        }
      }
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        "@typescript-eslint/no-floating-promises": "error",
    }
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**', 'pages/**', 'fixtures/**'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      // Customize Playwright rules
      // ...
    },
  },
);