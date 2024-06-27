module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint", "react", "import"],
    rules: {
        "react/jsx-uses-react": "error",
        quotes: [
            "error",
            "double",
            { allowTemplateLiterals: true, avoidEscape: true },
        ],
        "spaced-comment": "error",
        indent: 2,
        "react/function-component-definition": [
            2,
            { namedComponents: "arrow-function" },
        ],
        "no-duplicate-imports": "error",
        "linebreak-style": ["error", "windows"],
        "react/self-closing-comp": [
            "error",
            {
                component: false,
                html: false,
            },
        ],
        "import/order": [
            "error",
            {
                groups: [
                    ["builtin", "external"],
                    ["internal", "parent", "sibling", "index"],
                    ["object", "type"],
                ],
                "newlines-between": "always",
                alphabetize: {
                    order: "asc",
                    caseInsensitive: true,
                },
            },
        ],
        "object-curly-spacing": ["error", "always"],
        "no-unused-vars": ["warn", { "argsIgnorePattern": ".*" }]
    },
};
