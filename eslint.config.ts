import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { defineConfig } from 'eslint/config'

export default defineConfig([
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.node,
                ...globals.browser,
            },
        },
        rules: {
            'no-unused-vars': 'off',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'warn',
            'vue/multi-word-component-names': 'off',
            'vue/block-order': [
                'error',
                { order: ['template', 'script', 'style'] },
            ],
            'vue/attributes-order': [
                'error',
                {
                    alphabetical: true,
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
    {
        files: ['**/*.vue'],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
    },
    pluginPrettierRecommended,
])
