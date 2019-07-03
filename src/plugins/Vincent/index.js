
//实现pxtorem自适应
import 'lib-flexible/flexible.js'
//解除各端css差异
import 'reset-css';
import filter from '@/plugins/Vincent/filter'

//移动端调试console
import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
if (process.env.NODE_ENV == 'development') {
    let vConsole = new VConsole() // 初始化
}
export default {
    async install(Vue, options) {
        // 设置为 false 以阻止 vue 在启动时生成生产提示
        // https://cn.vuejs.org/v2/api/#productionTip
        Vue.config.productionTip = false
        // 当前环境
        Vue.prototype.$env = process.env.NODE_ENV
        // 当前的 baseUrl
        Vue.prototype.$baseUrl = process.env.BASE_URL
        // 当前版本
        Vue.prototype.$version = process.env.VUE_APP_VERSION
        // 构建时间
        Vue.prototype.$buildTime = process.env.VUE_APP_BUILD_TIME


        Vue.use(filter)
    }
}