/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-03 15:26:18
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-07 17:48:21
 * @description: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import util from '@/libs/util.js'

Vue.use(VueRouter)
// 路由数据
import routes from './routes'
const router = new VueRouter({
    mode: 'history',
    // base: '/dist/',
    routes
})


/**
 * 路由拦截
 * 权限验证
 */
// router.beforeEach((to, from, next) => {
//     console.log(to)
//     console.log(from)
//     next();
// })

router.afterEach((to) => {
    // 更改标题
    util.title(to.meta.title)
})
export default router