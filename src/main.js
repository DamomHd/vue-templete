/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-02 11:46:02
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-10-29 17:28:52
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
Vue.use(Vincent)
Vue.mixin(mixins)


new Vue({
  router, store,
  render: h => h(App),
}).$mount('#app')
