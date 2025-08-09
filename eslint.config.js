// ESLint flat config (unified)
import js from "@eslint/js";
import next from "eslint-config-next";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: [
      "node_modules/**",
      "backend/**",
      "agent-core/**",
      ".next/**",
      "storybook-static/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "playwright-report/**",
    ],
  },
  js.configs.recommended,
  ...next(),
  {
    files: ["**/*.{spec,test}.{ts,tsx,js,jsx}", "**/__tests__/**/*"],
    rules: {
      // Relax rules in tests
      "no-undef": "off",
      "no-unused-expressions": "off",
    },
  },
];


