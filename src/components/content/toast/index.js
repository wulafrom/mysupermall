import Toast from "@/components/content/toast/Toast";

const obj = {};

obj.install = function (Vue) {
  //使用当前插件的Vue组件中添加dom元素 dom元素在最后加载，当前拿不到
  //document.body.appendChild(Toast.$el);

  //1.组件的构造器
  const toastConstructor = Vue.extend(Toast)

  //2.new 的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor()

  //3.将组件对象手动挂载到某一个元素上 将组件写在一个div里
  toast.$mount(document.createElement('div'))

  //4.toast.$el 对应的就是div
  document.body.appendChild(toast.$el)

  //全局静态属性
  Vue.prototype.$toast = toast
}

export default obj
