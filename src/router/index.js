//1.导入
import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from "vue-router"
//2.安装插件
Vue.use(VueRouter)


//创建路由对象  懒加载
const Home = () => import('@/views/home/Home')
const Category = () => import('@/views/category/category.vue')
const Cart = () => import('@/views/cart/Cart.vue')
const Profile = () => import('@/views/profile/profile.vue')
const Detail = () => import('@/views/detail/Detail')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }

]
const router = new Router({
  routes,
  mode: 'history'
})

//3.默认导出
export default router
