//引入Vue
import Vue from 'vue'
//顶级子组件
import App from './App.vue'
//路由
import router from '@/router'
//全局数据保存区
import store from "@/store";
//toast 弹出框
import Toast from '@/components/content/toast'
//fastclick 减少延迟
import FastClick from 'fastclick'
//lazy load
import LazyLoad from 'vue-lazyload'


Vue.config.productionTip = false

//在Vue中注册 $bus
Vue.prototype.$bus = new Vue

//Vue中安装插件
Vue.use(Toast)
Vue.use(LazyLoad, {
  loading: require('@/assets/img/common/placeholder.png')
})

//解决移动端300ms延迟
FastClick.attach(document.body)


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
