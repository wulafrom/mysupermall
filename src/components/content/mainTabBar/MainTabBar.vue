<template>
  <div>
    <TabBar>
      <!--不加冒号是对该组件的属性进行赋值-->
      <!--加冒号是让 父子组件的属性进行双向绑定-->
      <TabBarItem path='/home' activecolor="red">
        <img src="@/assets/img/tabbar/home.svg" alt="" slot="item-icon">
        <img src="@/assets/img/tabbar/home_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">首页</div>
      </TabBarItem>
      <TabBarItem path='/category'>
        <img src="@/assets/img/tabbar/category.svg" alt="" slot="item-icon">
        <img src="@/assets/img/tabbar/category_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">分类</div>
      </TabBarItem>
      <TabBarItem path='/cart'>
        <img src="@/assets/img/tabbar/shopcart.svg" alt="" slot="item-icon">
        <img src="@/assets/img/tabbar/shopcart_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">购物车</div>
      </TabBarItem>
      <TabBarItem path='/profile'>
        <img src="@/assets/img/tabbar/profile.svg" alt="" slot="item-icon">
        <img src="@/assets/img/tabbar/profile_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">我的</div>
      </TabBarItem>
    </TabBar>

  </div>
</template>

<script>
  import TabBar from '@/components/common/tabtar/TabBar'
  import TabBarItem from '@/components/common/tabtar/TabBarItem.vue'

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem,
    }
  }
</script>

<style scoped>

</style>
