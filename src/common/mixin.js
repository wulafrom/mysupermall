import {debounce} from "@/common/utils";
import BackTop from "@/components/content/backTop/BackTop";
import {BACK_POSITION} from "@/common/const";

export const itemListenerMixin = {
  data() {
    return {
      itemListener: null
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemListener)
  }
}
export const backTopMixin = {
  components: {BackTop},
  data() {
    return {
      isShowBackBtn: false,
    };
  },
  methods: {
    //回到顶部
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    //监听位置，是否展示回到顶部按钮
    listenShowBackBtn(position) {
      this.isShowBackBtn = (-position.y) > BACK_POSITION
    }
  }

}


