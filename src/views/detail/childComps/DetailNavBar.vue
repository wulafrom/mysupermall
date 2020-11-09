<template>
  <div>
    <nav-bar>
      <div slot="left" class="backIcon" @click="backToPrevious">
        <img src="@/assets/img/common/back.svg" alt="">
      </div>

      <div slot="center" class="title">
        <span v-for="(title,index) in titles" :class="{active: index===currentIndex}"
              @click="switchTitle(index)">
          {{title}}</span>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar", components: {NavBar},
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      switchTitle(index) {
        this.currentIndex = index
      },
      backToPrevious(){
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    justify-content: space-around;
    font-size: 14px;
  }

  .active {
    color: var(--color-high-text);
  }

  .backIcon img{
    margin-top: 11px;
  }
</style>
