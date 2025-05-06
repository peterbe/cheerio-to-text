import { defineConfig } from "eslint/config"
import globals from "globals"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  {
    extends: compat.extends("eslint:recommended", "prettier"),

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    rules: {
      eqeqeq: [2, "smart"],
      "no-caller": 2,
      "dot-notation": 2,
      "no-var": 2,
      "prefer-const": 2,

      "prefer-arrow-callback": [
        2,
        {
          allowNamedFunctions: true,
        },
      ],

      "arrow-body-style": [2, "as-needed"],
      "object-shorthand": 2,
      "prefer-template": 2,
      "one-var": [2, "never"],

      "prefer-destructuring": [
        2,
        {
          object: true,
        },
      ],

      "spaced-comment": 2,
      yoda: [2, "never"],
      curly: [2, "multi-line"],
      "no-else-return": 2,
    },
  },
  {
    files: ["**/*.ts"],

    extends: compat.extends(
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
    ),

    languageOptions: {
      ecmaVersion: 5,
      sourceType: "module",

      parserOptions: {
        project: "./tsconfig.eslint.json",
      },
    },

    rules: {
      "@typescript-eslint/prefer-for-of": 0,
      "@typescript-eslint/member-ordering": 0,
      "@typescript-eslint/explicit-function-return-type": 0,
      "@typescript-eslint/no-unused-vars": 0,

      "@typescript-eslint/no-use-before-define": [
        2,
        {
          functions: false,
        },
      ],

      "@typescript-eslint/consistent-type-definitions": [2, "interface"],
      "@typescript-eslint/prefer-function-type": 2,
      "@typescript-eslint/no-unnecessary-type-arguments": 2,
      "@typescript-eslint/prefer-string-starts-ends-with": 2,
      "@typescript-eslint/prefer-readonly": 2,
      "@typescript-eslint/prefer-includes": 2,
      "@typescript-eslint/no-unnecessary-condition": 2,
      "@typescript-eslint/switch-exhaustiveness-check": 2,
      "@typescript-eslint/prefer-nullish-coalescing": 2,
    },
  },
])
