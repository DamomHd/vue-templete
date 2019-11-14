/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-02 11:46:02
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-14 18:47:58
 * @description: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// store
import store from '@/store/index'
// 个性化插件
import Vincent from '@/plugin/Vincent/index'
import mixins from './mainxins'
// import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
//let vConsole = new VConsole() // 初始化
Vue.use(Vincent)
Vue.mixin(mixins)
new Vue({
  router, store,
  render: h => h(App),
}).$mount('#app')
