module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ],
    "no-unused-vars": ["warn", { "varsIgnorePattern": "^[A-Z]" }], // Ignorer les variables qui commencent par une majuscule (composants)
    "no-console": "off", // Permettre les console.log pour le développement
    "prefer-const": "error",
    "no-var": "error"
  }
};