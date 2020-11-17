const actions = {
  //加入购物车
  addCart(context, payload) {
    let oldProduct = context.state.cartList.find(product => product.iid === payload.iid)
    if (oldProduct) {
      context.commit('addCartCounter', oldProduct)
    } else {
      context.commit('addCartProduct', payload)
    }
  },
}

export default actions
