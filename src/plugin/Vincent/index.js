/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-03 15:10:37
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-13 17:43:32
 * @description: 
 */

//实现pxtorem自适应
import 'amfe-flexible';
//解除各端css差异
import 'reset-css';
//引入字体图标
import 'font-awesome/css/font-awesome.min.css'
//导入全局过滤器
import filters from '@/plugin/Vincent/filter'
//引入弹性布局
import '@/assets/style/flex.css';
import '@/assets/style/sprites.css';

// 组件
import '@/components'
import 'vant/lib/icon/local.css';
import { PullRefresh, Popup, ImagePreview, Dialog } from 'vant';
import util from '@/libs/util'


export default {
    install(Vue) {
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
        // 当前环境是否来源于 APP
        Vue.prototype.$isFromApp = navigator.userAgent.indexOf("healthsource-b2b-app") != -1
        //当前环境是否在微信内打开
        // Vue.prototype.$isWeixin = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger"

        //全局过滤器
        Object.keys(filters).forEach((key) => {
            Vue.filter(key, filters[key])
        })
        Vue.prototype.$toast = util.toast
        Vue.use(PullRefresh).use(Popup).use(ImagePreview).use(Dialog)

    }
}