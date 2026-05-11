import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import pluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
            },
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
        plugins: {
            prettier: pluginPrettier,
        },      
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/no-mutating-props': 'error',
            // 'vue/component-name-in-template-casing': [
            //     'error',
            //     'PascalCase',
            //     { registeredComponentsOnly: false },
            // ],
            'vue/block-order': [
                'error',
                { order: ['template', 'script', 'style'] },
            ],
            'vue/require-v-for-key': 'error',
            'vue/no-duplicate-attributes': 'error',
            'vue/attributes-order': [
                'error',
                {
                    alphabetical: true,
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            'prettier/prettier': ['error', {}, { usePrettierrc: true }]
        },
    },
])
