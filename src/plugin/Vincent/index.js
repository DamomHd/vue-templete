/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-03 15:10:37
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-10-29 10:58:25
 * @description: 
 */

//实现pxtorem自适应
import 'lib-flexible/flexible.js'
//解除各端css差异
import 'reset-css';
//引入字体图标
import 'font-awesome/css/font-awesome.min.css'
//导入全局过滤器
import filters from '@/plugin/Vincent/filter'
// 组件
import '@/components'
//按需导入nutui组件
// import { Dialog, Picker, Toast, ImagePicker } from '@nutui/nutui';
import { Toast } from 'vant';

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

        //全局过滤器
        Object.keys(filters).forEach((key) => {
            Vue.filter(key, filters[key])
        })

        //按需导入nui组件
        // Dialog.install(Vue);
        // Picker.install(Vue);
        // Toast.install(Vue);
        // ImagePicker.install(Vue);
        // Object.keys(Skeleton).forEach((key) => {
        //     Skeleton[key].install(Vue)
        // })

        Vue.use(Toast)

    }
}