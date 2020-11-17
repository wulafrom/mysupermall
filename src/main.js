//引入Vue
import Vue from 'vue'
//顶级子组件
import App from './App.vue'
//路由
import router from './router'
//全局数据保存区
import store from "@/store";

Vue.config.productionTip = false
//在Vue中注册 $bus
Vue.prototype.$bus = new Vue


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
