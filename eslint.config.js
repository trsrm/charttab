module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        angular: "readonly",
        window: "readonly",
        document: "readonly",
        console: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        chrome: "readonly",
        moment: "readonly",
        Blob: "readonly",
        FileReader: "readonly",
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "eqeqeq": ["error", "always"],
      "no-console": "off",
      "comma-dangle": ["error", "always-multiline"],
      "no-var": "warn",
      "prefer-const": "warn",
    },
  },
]; 