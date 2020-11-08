<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    components: {
      BScroll
    },
    data() {
      return {
        scroll: null,
        /*监听滑动位置级别*/
      }
    },
    props: {
      probeType: {
        type: Number,
        default() {
          return 0
        }
      },
      pullUpLoad: {
        type: Boolean,
        default() {
          return false;
        }
      }
    }
    ,
    mounted() {
      //初始化scroll对象  this.$refs.wrapper 获取的一定是 wrapper DOM元素
      //this.$refs 获取子组件和子元素的DOM对象
      this.scroll = new BScroll(this.$refs.wrapper,
        {
          click: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad,
        }
      );

      //监听滚动的位置，当滚动当下面的时候，出现回到顶部的按钮
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on("scroll", (position) => {
          //将实时位置，传递给父组件
          this.$emit("scrollPosition", position)
        })
      }

      if (this.pullUpLoad) {
        //监听是否滚到底部
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }

    },
    methods: {
      //对外暴露的方法 800毫秒回到顶端
      scrollTo(x, y, time = 800) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },

      //对外暴露的方法，重新加载 滚动到底部 的监听
      uploadPullingUp() {
        this.scroll && this.scroll.finishPullUp()
      },

      //刷新content内容高度
      refresh() {
        this.scroll && this.scroll.refresh()
      },

      //获取当前的Y坐标
      getCurrentY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<!--scoped 仅对当前 组件有效-->
<style scoped>

</style>
