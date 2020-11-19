
const actions = {
  //加入购物车
  addCart(context, payload) {

    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(product => product.iid === payload.iid)
      if (oldProduct) {
        context.commit('addCartCounter', oldProduct)
        resolve("商品购物车数量加 1 ")
      } else {
        context.commit('addCartProduct', payload)
        resolve('商品已添加到购物车')
      }
    })

  },
}

export default actions
