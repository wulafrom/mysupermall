//延迟调用
export function debounce(func, delay) {
  let timer = null
  return (...args) => {
    //第一次进来 time是 null
    //很短的时间，小于delay的时间内，第二次进来，说明是短时间重复调用
    //为了避免这种情况，不能让他短时间重复调用，所以将timer重置为null,清空，这样setTimeout(),因为失去引用，被销毁掉
    //当没有第31次调用的时候，将执行第30次的延迟调用函数 setTimeout()
    if (timer)  clearTimeout(timer)
    timer = setTimeout(() => {
      //this 指向的是本身的 func函数
      func.apply(this, args)
    }, delay)
  }
}
