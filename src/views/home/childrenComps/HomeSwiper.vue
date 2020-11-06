<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'


export default {
  name: "HomeSwiper",
  components: {
    Swiper, SwiperItem
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
}
</script>

<style scoped>

</style>
