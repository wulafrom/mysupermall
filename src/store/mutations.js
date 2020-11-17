export default {
  //购物车中添加新的商品
  addCartProduct(state, payload) {
    state.cartList.push(payload)
  },
  //购物车中的商品增加数量
  addCartCounter(state, payload) {
    payload.count++
  }
}
