<template>
  <div>
    <TabBar>
      <!--不加冒号是对该组件的属性进行赋值-->
      <!--加冒号是让 父子组件的属性进行双向绑定-->
      <TabTarItem path='/home' activecolor="red">
        <img src="~assets/img/tabtar/home/home.png" alt="" slot="item-icon">
        <img src="~assets/img/tabtar/home/home_active.png" alt="" slot="item-icon-active">
        <div slot="item-text">首页</div>
      </TabTarItem>
      <TabTarItem path='/category'>
        <img src="~assets/img/tabtar/category/category.png" alt="" slot="item-icon">
        <img src="~assets/img/tabtar/category/category_active.png" alt="" slot="item-icon-active">
        <div slot="item-text">分类</div>
      </TabTarItem>
      <TabTarItem path='/cart'>
        <img src="~assets/img/tabtar/cart/cart.png" alt="" slot="item-icon">
        <img src="~assets/img/tabtar/cart/cart_active.png" alt="" slot="item-icon-active">
        <div slot="item-text">购物车</div>
      </TabTarItem>
      <TabTarItem path='/profile'>
        <img src="~assets/img/tabtar/profile/profile.png" alt="" slot="item-icon">
        <img src="~assets/img/tabtar/profile/profile_active.png" alt="" slot="item-icon-active">
        <div slot="item-text">我的</div>
      </TabTarItem>
    </TabBar>

  </div>
</template>

<script>
import TabBar from 'components/common/tabtar/TabBar.vue'
import TabTarItem from 'components/common/tabtar/TabBarItem.vue'

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabTarItem,
  }
}
</script>

<style scoped>

</style>
