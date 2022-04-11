module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser

    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': 'error',
    },
};
