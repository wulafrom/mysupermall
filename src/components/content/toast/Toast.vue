<template>
  <div class="toast" v-show="isShow">
    {{ message }}
  </div>
</template>

<script>
  import {TOAST_DELAY} from "@/common/const";

  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      showMessage(message = '已添加到购物车', delay = TOAST_DELAY) {
        this.isShow = true
        this.message = message

        setTimeout(() => {
          this.isShow = false
        }, delay)
      }
    }
  }
</script>

<style scoped>

  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 55%;
    text-align: center;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    border-radius: 5px;
    z-index: 9;


    color: white;
    background-color: rgba(0, 0, 0, 0.75);
  }

</style>
