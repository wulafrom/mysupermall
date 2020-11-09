<template>
  <div id="detail">
    <!--顶层的按钮-->
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <!--轮播图-->
      <detail-swiper :topImages="topImages"/>
      <!--商品信息-->
      <detail-goods :goods="goods"/>
      <!--商家信息-->
      <detail-shop-info :shop="shop"/>
      <!--商品详情展示图-->
      <detail-goods-info :detailInfo="detailInfo" @loadImgEvent="loadImgEvent"/>
      <!--商品参数-->
      <detail-params :param-info="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
  //子组件
  import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
  import DetailGoods from "@/views/detail/childComps/DetailGoods";
  import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
  import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
  import DetailParams from "@/views/detail/childComps/DetailParams";
  //网络请求
  import {getDetail, Goods, Shop,GoodsParam} from "@/network/detail";

  //第三方组件
  import Scroll from "@/components/common/scroll/Scroll";

  export default {
    name: "Detail",
    components: {DetailSwiper, DetailNavBar, DetailGoods, DetailShopInfo, Scroll,DetailGoodsInfo,DetailParams},
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo:{},
        paramInfo:{},
      }
    },
    created() {
      this.iid = this.$route.params.iid

      getDetail(this.iid).then(res => {
        //console.log(JSON.stringify(res));

        const data = res.result
        //1.获取顶部的轮播数据
        this.topImages = data.itemInfo.topImages

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3.商家信息
        this.shop = new Shop(data.shopInfo)

        //4.保存商品的详情展示数据
        this.detailInfo = data.detailInfo

        //5.商品参数
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      })
    },
    methods:{
      loadImgEvent(){
        this.$refs.scroll.refresh()
      }
    }

  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: white;
    /*视图的高度,这就屏幕尺寸 的高度*/
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px);
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: white;
  }
</style>
