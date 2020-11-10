<template>
  <div id="detail">
    <!--顶层的按钮-->
    <detail-nav-bar class="detail-nav" @switchTitle="switchTitle"/>
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
      <detail-params :param-info="paramInfo" ref="detailParams"/>
      <!--商品的评论-->
      <detail-comment :comment="commentInfo" ref="detailComment"/>
      <!--推荐的商品数据-->
      <goods-list :goods="recommends" ref="recommends"/>
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
  import DetailComment from "@/views/detail/childComps/DetailComment";
  //网络请求
  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "@/network/detail";

  import {itemListenerMixin} from "@/common/mixin";

  //第三方组件
  import Scroll from "@/components/common/scroll/Scroll";
  import GoodsList from "@/components/content/goods/GoodsList";
  import {debounce} from "@/common/utils";

  export default {
    name: "Detail",
    components: {
      DetailSwiper,
      DetailNavBar,
      DetailGoods,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParams,
      DetailComment,
      Scroll,
      GoodsList
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        titleContentLocation: [],
        getTitleY: null

      }
    },
    created() {
      this.iid = this.$route.params.iid

      //console.log('detail ' + this.iid)

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
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6.评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        this.$nextTick(() => {
          //DOM渲染完了，但是图片没有加载完
        })

        this.getTitleY = debounce(() => {
          this.titleContentLocation = []
          this.titleContentLocation.push(0)
          //this.$refs.paramInfo 获取的时组件对象，不是元素对象， .$el获取的是元素对象
          this.titleContentLocation.push(this.$refs.detailParams.$el.offsetTop)
          this.titleContentLocation.push(this.$refs.detailComment.$el.offsetTop)
          this.titleContentLocation.push(this.$refs.recommends.$el.offsetTop)
          console.log(this.titleContentLocation)
        })
      })

      //7.商品推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

    },
    mounted() {
    },
    methods: {

      //刷新详情页的高度
      loadImgEvent() {
        this.$refs.scroll.refresh()

        this.getTitleY()

      },
      //切换分类
      switchTitle(index) {
        this.$refs.scroll.scrollTo(0, -this.titleContentLocation[index], 0)
      }
    },
    updated() {
    },
    //因为当前组件没有再keep-alive中 不能使用 deactivated()
    destroyed() {
      //当当前组件销毁的时候，取消对商品详情中 推荐商品图片的加载
      this.$bus.$off('itemImageLoad', this.itemListener)
    },
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
