module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: ["tsconfig.json", "tsconfig.dev.json"],
        sourceType: "module",
        tsconfigRootDir: __dirname, // <-- this did the trick for me
    },
    ignorePatterns: [
        "/lib/**/*", // Ignore built files.
        "*.js",
    ],
    plugins: [ 
        "@typescript-eslint",
        "import",
    ],
    rules: {
        "quotes": ["error", "double"],
        "space-before-function-paren": ["error", "never"],
        "arrow-parens": ["error", "always"],
        "object-curly-spacing": ["error", "always"],
        "object-shorthand": ["error", "never"],
        "template-curly-spacing": ["error", "always"],
        "key-spacing": ["error", { "align": "colon" }],
        "no-new-object": "error",
        "no-array-constructor": "error",
        "quote-props": ["error", "consistent"],
        "space-in-parens": ["error", "always"],
        "semi": ["error", "always"],
        "comma-dangle": ["error", "never"],
        "indent": ["error", 4],
        "camelcase": "error",
        "require-jsdoc": ["error", {
            "require": {
                "FunctionDeclaration": true,
                "MethodDefinition": true,
                "ClassDeclaration": true,
                "ArrowFunctionExpression": true,
                "FunctionExpression": true
            }
        }]        
    }
}