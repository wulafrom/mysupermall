<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommend="recommend"></recommend-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childrenComps/HomeSwiper";
import RecommendView from "./childrenComps/RecommendView";

import {getHomeMultidata} from "network/home";


export default {
  name: "home",
  components: {
    NavBar,HomeSwiper,RecommendView
  },
  data() {
    return {
      banners: null,
      dKeyword: null,
      keywords: null,
      recommend: null
    }
  },
  created() {
    //函数调用 ->压入到函数栈(保存函数调用过程中所有的变量)
    //函数调用结束->弹出函数栈（释放所有的临时变量）
    getHomeMultidata().then(res => {
      //1.请求多个数据
      console.log(res);
      this.banners = res.data.banner.list
      this.dKeyword = res.data.dKeyword.list
      this.keywords = res.data.keywords.list
      this.recommend = res.data.recommend.list
    })
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: white;
}


</style>
