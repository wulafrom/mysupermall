<template>
  <div id="home">
    <!--顶层购物街-->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content" ref="scroll"
            @scrollPosition="scrollPosition"
            @pullingUp="pullingUp"
            :probeType="3"
            :pullUpLoad='true'
    >
      <!--轮播图-->
      <home-swiper :banners="banners"/>
      <!--推荐栏-->
      <recommend-view :recommend="recommend"/>
      <!--本周流行-->
      <feature-view/>
      <!--分类栏-->
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
      />

      <!--商品列表-->
      <goods-list :goods="showGoods"/>

    </scroll>
    <!--监听组件原生的方法-->
    <back-top @click.native="backTopClick" v-show="isShowBackBtn"></back-top>
  </div>
</template>

<script>
  //导入子组件
  import HomeSwiper from "@/views/home/childrenComps/HomeSwiper";
  import RecommendView from "@/views/home/childrenComps/RecommendView";
  import FeatureView from "@/views/home/childrenComps/FeatureView";

  //导入公共组件
  import NavBar from "@/components/common/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/goodsList"
  import BackTop from "@/components/content/backTop/BackTop";


  //导入网络模块
  import {
    getHomeMultidata, getHomeGoods
  } from "@/network/home";

  //第三方滚动组件
  import Scroll from "@/components/common/scroll/Scroll";


  export default {
    name: "home",
    components: {
      HomeSwiper, RecommendView, FeatureView, NavBar, TabControl, GoodsList, Scroll, BackTop
    },
    data() {
      return {
        banners: null,
        dKeyword: null,
        keywords: null,
        recommend: null,
        goods: {
          pop: {page: 0, list: []},
          new: {page: 0, list: []},
          sell: {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackBtn: false
      }
    },
    computed: {
      //当前展示的类别和数据
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //函数调用 ->压入到函数栈(保存函数调用过程中所有的变量)
      //函数调用结束->弹出函数栈（释放所有的临时变量）

      //1.请求轮播图数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('sell')
      this.getHomeGoods('new')

    },
    methods: {
      /**
       * 网络请求相关
       */
      //初始化首页数据
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.dKeyword = res.data.dKeyword.list
          this.keywords = res.data.keywords.list
          this.recommend = res.data.recommend.list
        })
      },
      //获取指定类型下一页的数据
      getHomeGoods(type) {
        const nextPage = this.goods[type].page + 1
        getHomeGoods(type, nextPage).then(res => {

          this.goods[type].list.push(...res.data.list)

          this.goods[type].page++

          //刷新对上拉的监听
          this.$refs.scroll.uploadPullingUp()
        })
      },
      /**
       * 事件监听
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      //回到顶部
      backTopClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      //实时判断是否开启回到顶端
      scrollPosition(position) {
        this.isShowBackBtn = (-position.y) > 1000
      },
      //加载更多商品
      pullingUp() {
        //重新加载后，要刷新对上拉的监听 因为是异步的要在加载后刷新
        this.getHomeGoods(this.currentType)
      }
    }
  }
</script>

<style scoped>

  #home {
    height: 100vh;
  }

  .content {
    height: calc(100% - 49px);
    overflow: hidden;
    padding-top: 44px;

  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    /*position: sticky;*/
    top: 90px;
    z-index: 9;
  }


  /*#home {
    height: 100vh;
    position: relative;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }*/
</style>
