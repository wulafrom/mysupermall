//延迟调用
export function debounce(func, delay=300) {
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

/**
 * 格式化函数 ， 给日期格式化
 * date为 new Date()对象， fmt为 'yyyy-MM-dd'的格式
 */
export function formatDate(date, fmt) {
  //获取年份
  if (/(y+)/.test(fmt)) {
    let dateY = date.getFullYear() + "";
    //RegExp.$1 在判断中出现过，且是括号括起来的，所以 RegExp.$1 就是 "yyyy"
    //RegExp.$1 表示的时 (y+) 括号中的内容
    fmt = fmt.replace(RegExp.$1, dateY.substr(4 - RegExp.$1.length));
  }

  //获取其他
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
