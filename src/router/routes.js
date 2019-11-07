/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-03 15:31:50
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-07 17:26:18
 * @description: 
 */


// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)
const frame = [
    {
        path: '/',
        name: 'index',
        meta: {
            auth: true,
            title: '商品详情'
        },
        component: _import('product/index.vue')
    },
    {
        path: '/test',
        name: 'productDetail',
        meta: {
            auth: true,
            title: '测试'
        },
        component: _import('product/index.vue')
    },
    {
        path: '/study',
        name: 'study',
        meta: {
            auth: true,
            title: '组件传参学习'
        },
        component: _import('study/component-communication/index')
    }
]
export default [
    ...frame
]