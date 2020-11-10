<template>
  <div id="detail_goods_info" v-if="Object.keys(detailInfo).length != 0">
    <div class="goods_info_desc">
      <div style="float: left;" class="desc_line">
        <i class="desc_dot"></i>
      </div>
      <div class="desc_text">
        {{ detailInfo.desc }}
      </div>
      <div style="float: right;" class="desc_line">
        <i style="right: 0px;" class="desc_dot"></i>
      </div>
    </div>
    <div class="goods_info_key">
      {{ detailInfo.detailImage[0].key }}
    </div>
    <div class="goods_info_imgs">
      <img
        :src="item"
        alt=""
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :keys="index"
        @load="imageLoad"
      />
    </div>
  </div>
</template>
<script>
  export default {
    name: 'DetailGoodsInfo',
    data() {
      return {
        currentLoadTimes: 0,
        imagesLength: 0
      }
    },
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    methods: {
      imageLoad() {

        if (this.currentLoadTimes === 0) {
          this.$emit("loadImgEvent");
        }

        //存在的问题，第一次进来的时候，页面会出现断顿
        if (++this.currentLoadTimes === this.imagesLength)
          this.$emit("loadImgEvent");

      }
    },
    watch: {
      //相当于初始化时加载
      detailInfo() {
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    }
  };
</script>
<style scoped>
  #detail_goods_info {
    font-size: 0.68rem;
  }

  .goods_info_desc {
    font-size: 0.6rem;
    padding: 0.42rem 0.34rem;
  }

  .desc_line {
    width: 3.5rem;
    height: 0.04rem;
    background-color: gray;
    position: relative;
  }

  .desc_dot {
    position: absolute;
    top: -0.1rem;
    display: inline-block;
    width: 0.21rem;
    height: 0.21rem;
    background-color: black;
    border-radius: 50%;
  }

  .desc_text {
    padding: 0.85rem 0;
    color: gray;
  }

  .goods_info_key {
    padding: 0.42rem 0.34rem;
  }

  .goods_info_imgs img {
    width: 100%;
  }
</style>
