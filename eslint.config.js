import mantine from 'eslint-config-mantine';
import react from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

// @ts-check
export default defineConfig(
  tseslint.configs.recommended,
  ...mantine,

  {
    ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}'],
  },

  {
    files: ['**/*.story.tsx'],
    rules: { 'no-console': 'off' },
  },

  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // 🔥 chiude automaticamente i tag vuoti
      'react/self-closing-comp': ['error', { component: true, html: true }],
    },
  },

  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: process.cwd(),
        project: ['./tsconfig.json'],
      },
    },
  }
);
