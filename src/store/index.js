import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "@/store/mutations"
import actions from "@/store/actions"
import getters from "@/store/getters";


//1.安装插件
Vue.use(Vuex)


const state = {
  //保存加入购物车中的商品
  cartList: []
}

//2.创建store对象
const store = new Vuex.Store({
  //单一状态树 数据区
  state,
  //同步修改state中的数据。mutations每个方法的功能尽可能的单一，新增、修改、删除要分开
  mutations,
  //异步修改
  actions,
  //计算属性
  getters
})


//3.导出
export default store
