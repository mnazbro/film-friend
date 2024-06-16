module.exports = {
  plugins: ["@typescript-eslint", "no-only-tests", "regexp", "vitest"],
  extends: [
    "eslint:recommended",
    "plugin:@eslint-community/eslint-comments/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:regexp/recommended",
    "plugin:vitest/recommended",
    "plugin:deprecation/recommended",

    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  env: {
    browser: true,
    node: false,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      extends: [
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
      ],
      rules: {
        "@typescript-eslint/padding-line-between-statements": [
          "error",
          { blankLine: "always", next: "*", prev: "block-like" },
        ],
        "@typescript-eslint/no-unnecessary-condition": [
          "error",
          { allowConstantLoopConditions: true },
        ],
        "@typescript-eslint/prefer-nullish-coalescing": [
          "error",
          { ignorePrimitives: true },
        ],
        "@typescript-eslint/semi": ["error", "always"],
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/no-misused-promises": [
          "error",
          {
            checksVoidReturn: {
              arguments: false,
              attributes: false,
            },
          },
        ],
        "sort-imports": [
          "error",
          {
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          }
        ],
        'import/order': [
         'error',
         {
           alphabetize: {
             order: 'asc',
             caseInsensitive: true,
           },
         },
       ],
      },
    },
  ],
  reportUnusedDisableDirectives: true,
  root: true,
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": "error",
  },
};
