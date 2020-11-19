<template>
  <div class="bottom-bar">

    <div class="checked-content" @click="selectAll">
      <check-button class="check-button" :is-checked="isChecked"/>
      <span class="all-select">全选</span>
    </div>

    <div class="total-price">合计: {{ totalPrice }}</div>

    <div class="calculate"><p>去结算 ({{ cartLength }})</p></div>

  </div>
</template>

<script>
  import CheckButton from "@/components/content/checkButton/CheckButton";

  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(["cartList"]),
      //总价格
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.realPrice * item.count
        }, 0).toFixed(2)
      },
      //购物车中商品的总类数
      cartLength() {
        return this.cartList.filter(item => item.checked).length
      },
      //是否全部选中
      isChecked() {
        if (this.cartList.length > 0) {
          return !this.cartList.find(item => !item.checked)
        }
      }
    },
    methods: {
      selectAll() {
        console.log(1111)
        if (this.isChecked) {
          this.cartList.forEach(item => item.checked = false)
        } else {
          this.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 40px;
    font-size: 14px;
    background-color: #eee;

  }

  /*容器的高度由当前的设置和子容器的填充决定，没有任何设置和填充，高度将为0*/
  .checked-content {
    height: 100%;
    display: flex;
    /*子容器在主轴怎么排列 水平方向*/
    justify-content: space-around;
    /*子容器在交叉轴怎么排列 垂直方向*/
    align-items: center;
  }

  .check-button {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    margin-left: 20px;
    /*以下是测试用的，和排列方式和父容器相同*/
    /*子容器 flex 决定当前容器在主轴怎么排列 水平方向*/
    flex: none;
    /*子容器 align-self决定当前容器在交叉轴怎么排列 垂直方向*/
    align-self: center;
  }

  .calculate {
    width: 25%;
    height: 100%;
    background-color: orangered;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
