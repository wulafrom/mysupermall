<template>
  <div id="detail">
    <!--顶层的按钮-->
    <detail-nav-bar class="detail-nav" @switchTitle="switchTitle" ref="detailTitles"/>
    <!--滚动区-->
    <scroll class="content" ref="scroll" :probe-type=2 @scrollPosition="scrollPosition">
      <!--轮播图-->
      <detail-swiper :topImages="topImages"/>
      <!--商品信息-->
      <detail-goods :goods="goodsInfo"/>
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
    <!--顶部返回按钮-->
    <back-top @click.native="backTopClick" v-show="isShowBackBtn"></back-top>
    <!--添加到购物车-->
    <detail-bottom-bar @addCart='addToCart'/>
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
  import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
  //网络请求
  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "@/network/detail";
  //common公共
  import {itemListenerMixin} from "@/common/mixin";
  import {backTopMixin} from "@/common/mixin";
  import {mapActions} from '@/store/actions'
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
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goodsInfo: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        titleContentLocation: [],
        titleCurrentIndex: 0,
        getTitleY: null,

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
        this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

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
          this.titleContentLocation.push(Infinity)
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
      ...mapActions(["addCart"]),
      //刷新详情页的高度
      loadImgEvent() {
        this.$refs.scroll.refresh()
        this.getTitleY()
      },
      //切换分类
      switchTitle(index) {
        this.$refs.scroll.scrollTo(0, -this.titleContentLocation[index], 0)
      },
      //监听实时位置，判断是否切换标题
      scrollPosition(position) {
        //判断是否展示回到顶部按钮
        this.listenShowBackBtn(position)

        //监听是否切换顶部的标题
        let positionY = -position.y
        let length = this.titleContentLocation.length
        for (let i = 0; i < length - 1; i++) {

          if (this.titleCurrentIndex !== i && (this.titleContentLocation[i] <= positionY && positionY <
            this.titleContentLocation[i + 1])) {

            this.titleCurrentIndex = i
            this.$refs.detailTitles.currentIndex = i

          }
        }
      },
      addToCart() {
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goodsInfo.desc
        product.iid = this.iid
        product.realPrice = this.goodsInfo.lowNowPrice
        product.oldPrice = this.goodsInfo.oldPrice
        product.newPrice = this.goodsInfo.price
        product.count = 1
        product.checked = false

        //this.$store.commit('addCart',product)
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })
        this.addCart(product).then(res => {
          console.log(res)
        })

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
    height: calc(100% - 44px - 49px);
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: white;
  }
</style>
