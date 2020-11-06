<template>
  <div class="tar-bar-item" @click="btnClick()">

    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>

    <div :style="activeColor">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>

  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activecolor: {
        type: String,
        default: "red"
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeColor() {
        return this.isActive ? {color: this.activecolor} : {}
      }
    },
    methods: {
      btnClick() {
        this.$router.push(this.path)
      }
    }
  }
</script>

<style scoped>

  .tar-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tar-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }


</style>
