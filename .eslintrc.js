module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb-typescript",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier", "jest"],
  rules: {
    "prettier/prettier": ["error"],
    "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_" }],
  },
};
