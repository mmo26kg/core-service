// ESLint v9+ Flat Config for Node.js (ESM) + Prettier
import prettierPlugin from 'eslint-plugin-prettier'

export default [
    {
        files: ['**/*.js'],
        ignores: ['node_modules/**', 'coverage/**', 'dist/**', 'build/**', '.DS_Store'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                console: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                module: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
            },
        },
        plugins: { prettier: prettierPlugin },
        rules: {
            // Show Prettier issues in ESLint output (Problems panel)
            'prettier/prettier': 'warn',

            // Express-friendly defaults
            'no-console': 'off',
            'no-underscore-dangle': 'off',
            'class-methods-use-this': 'off',

            // Safer JS defaults
            eqeqeq: ['warn', 'smart'],
            'no-var': 'error',
            'prefer-const': ['warn', { destructuring: 'all' }],
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        },
    },
    {
        files: ['tests/**/*.js'],
        rules: {
            'no-unused-expressions': 'off',
        },
    },
]
