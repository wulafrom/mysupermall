<template>
  <div class="tab-control">

    <div v-for="(title,index) in titles" class="tar-control-item"
         :class="{active: index===currentIndex}"
         @click="titleClick(index)"
    >
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      },
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    justify-content: space-around;
  }

  .tar-control-item {

  }

  .active {
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
