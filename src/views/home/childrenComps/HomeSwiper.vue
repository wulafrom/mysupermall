<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="initImageComplete" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from '@/components/common/swiper'


  export default {
    name: "HomeSwiper",
    components: {
      Swiper, SwiperItem
    },
    data(){
      return {
        isInitComplete:false
      }
    },
    props: {
      banners: {
        type: Array,
        /*默认值要用函数返回，否则会数据共享*/
        default() {
          return []
        }
      }
    },
    methods:{
      initImageComplete(){
        if (!this.isInitComplete) {
          this.isInitComplete = true
          this.$emit("initImageComplete")
        }
      }
    }
  }
</script>

<style scoped>

</style>
