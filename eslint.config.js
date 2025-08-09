// eslint.config.js — Flat config for ESLint v9 (Next.js + TypeScript + React)
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintImport from "eslint-plugin-import";
import globals from "globals";

export default [
  // Paths to ignore
  {
    ignores: [
      "node_modules/",
      ".next/",
      "out/",
      "dist/",
      "build/",
      "coverage/",
      "storybook-static/",
      "playwright-report/",
      // Scoatem codul server-side din lint deocamdată (conform CI)
      "backend/**",
      "agent-core/**",
    ],
  },

  // JS recommended
  js.configs.recommended,

  // TypeScript recommended (flat)
  ...tseslint.configs.recommended,

  // Frontend (React/TS)
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: eslintImport,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // React
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // Prefer TS variants and avoid duplicate reporting
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "off",
      // A11y (basic)
      "jsx-a11y/alt-text": "warn",
      // Import hygiene
      "import/first": "warn",
      "import/no-duplicates": "warn",
      "import/order": [
        "warn",
        { "newlines-between": "always", alphabetize: { order: "asc" } }
      ],
      // General JS/TS
      "no-unused-vars": "warn",
      "prefer-const": "warn",
      "no-undef": "error",
      quotes: ["warn", "double", { avoidEscape: true }],
      semi: ["warn", "always"],
    },
  },

  // Node/CommonJS configs and scripts
  {
    files: ["**/*.cjs", "scripts/**/*.{js,cjs}", "jest.config.cjs", "postcss.config.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: { ...globals.node },
    },
    rules: {
      "no-undef": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // Tests: relax a few noisy rules
  {
    files: ["**/__tests__/**/*", "**/*.{spec,test}.{ts,tsx,js,jsx}"],
    rules: {
      "no-undef": "off",
      "no-unused-expressions": "off",
    },
  },
];


