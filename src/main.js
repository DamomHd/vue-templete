import Vue from 'vue'
import App from './App.vue'
import router from './router'
// store
import store from '@/store/index'
// 个性化插件
import Vincent from '@/plugin/Vincent/index'


Vue.use(Vincent)





new Vue({
  router, store,
  render: h => h(App),
}).$mount('#app')
