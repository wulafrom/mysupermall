import {debounce} from "@/common/utils";

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


