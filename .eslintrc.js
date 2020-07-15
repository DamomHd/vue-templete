/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2020-04-24 09:53:10
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2020-07-15 17:13:46
 * @description:
 */
module.exports = {
    root: true,

    env: {
        browser: true,
        node: true,
        es6: true
    },


    plugins: ["vue"], //prettier
    extends: [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    globals: {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },

    rules: {
        'no-console':process.env.NODE_ENV === 'production'?'error':'off',
        'no-debugger':process.env.NODE_ENV === 'production'?'error':'off',
        'no-multiple-empty-lines':0,
        'linebreak-style': ['error', 'windows'],
        'comma-dangle': ['error', 'never'], // 修正 eslint-plugin-vue 带来的问题
        "space-before-function-paren": 1,
        "no-duplicate-imports": 1,
        // 代码后不使用分号
        semi: ['error', 'never'],
         // 一行最多几个属性
        'vue/max-attributes-per-line': [
            'error',
            {
            singleline: 5,
            multiline: {
                max: 1,
                allowFirstLine: false
            }
            }
        ],
    },

    parserOptions: {
        // parser: "vue-eslint-parser", //"babel-eslint"
        sourceType: "module"
    },
    parser: "vue-eslint-parser",
};
