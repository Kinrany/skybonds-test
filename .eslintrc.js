module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:import/typescript",
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
  plugins: ["prettier", "jest"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_" }],
  },
};
