// eslint.config.js (flat config for ESLint v9)
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default [
  // Ignoră foldere generate / ne-lintuite
  {
    ignores: [
      "node_modules/",
      ".next/",
      "dist/",
      "build/",
      "coverage/",
      "playwright-report/",
      "storybook-static/",
      "backend/**",
      "agent-core/**",
    ],
  },

  // Config de bază JS
  js.configs.recommended,

  // Config TypeScript recomandat (flat)
  ...tseslint.configs.recommended,

  // Reguli pentru proiectul frontend (TS/TSX + React)
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        // pentru teste unitare (Jest)
        ...globals.jest,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      // React
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // JS/TS ușor mai stricte (poți relaxa la nevoie)
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
    settings: {
      react: { version: "detect" },
    },
  },

  // Override pentru fișiere de test (relaxează reguli zgomotoase)
  {
    files: ["**/__tests__/**/*", "**/*.{spec,test}.{ts,tsx,js,jsx}"],
    rules: {
      "no-undef": "off",
      "no-unused-expressions": "off",
    },
  },
];
// ESLint flat config
// Migrated from legacy .eslintrc using recommended Next.js + TypeScript rules
import js from '@eslint/js';
import next from 'eslint-config-next';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['node_modules/**', 'backend/**', 'agent-core/**', '.next/**', 'storybook-static/**'],
  },
  js.configs.recommended,
  ...next(),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];


