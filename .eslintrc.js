module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-inferrable-types": "off",
  },
  ignorePatterns: [
    "build/",
    "build/**",
    "dist/",
    "dist/**",
    "node_modules/",
    "node_modules/**"
  ]
};
