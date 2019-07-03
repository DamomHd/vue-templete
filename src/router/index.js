import Vue from 'vue'
import VueRouter from 'vue-router'
import util from '@/libs/util.js'

Vue.use(VueRouter)
// 路由数据
import routes from './routes'
const router = new VueRouter({
    routes
})


/**
 * 路由拦截
 * 权限验证
 */
// router.beforeEach((to, from, next) => {

// })

router.afterEach((to) => {
    // 更改标题
    util.title(to.meta.title)
})
export default router