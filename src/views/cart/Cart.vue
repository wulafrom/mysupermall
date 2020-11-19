<template>
  <div id="cart">
    <!--顶层标题-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!--滚动区-->
    <scroll class="content" ref="scroll">
      <!--购物车列表-->
      <cart-list/>
    </scroll>
    <!--底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import CartList from "@/views/cart/childComps/CartList";
  import Scroll from "@/components/common/scroll/Scroll";
  import CartBottomBar from "@/views/cart/childComps/CartBottomBar";
  import {mapGetters} from 'vuex'

  export default {
    name: "cart",
    components: {NavBar, CartList, Scroll,CartBottomBar},
    computed: {
      // ...mapGetters({cartLengths:'cartLength'})
      ...mapGetters(["cartList"]),
      cartLength() {
        return this.cartList.filter(item => item.checked).length
      }
    },
    //必须是 keep-alive的组件才能使用这个钩子函数
    activated() {
      //进入购物车的刷新购物车的高度
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  #cart {
    position: relative;
    /*视图的高度,这就屏幕尺寸 的高度*/
    height: 100vh;
  }

  .nav-bar {
    position: relative;
    z-index: 9;
    background-color: var(--color-tint);
  }

  .content {
    height: calc(100% - 44px - 49px - 40px);
    /*超过这个部分的高度进行隐藏*/
    overflow: hidden;
  }
</style>
