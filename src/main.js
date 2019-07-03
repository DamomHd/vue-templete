import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 个性化插件
import Vincent from '@/plugins/Vincent'







Vue.use(Vincent)





new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
