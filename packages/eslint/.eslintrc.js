module.exports = {
    "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "next/core-web-vitals"
    ],
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint", "prettier"],
    "rules": {
    "prettier/prettier": "error",
    "react/display-name": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": [
        "warn",
        { "varsIgnorePattern": "^_", "argsIgnorePattern": "^_" }
    ]
    }
}