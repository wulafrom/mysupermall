import axios from 'axios'
import {baseUrl} from './baseUrl'

export function request(config) {
  //1.创建 AxiosStatic 对象
  const instance = axios.create({
    baseURL: baseUrl(),
    timeout: 3500
  })

  //2.interpreter请求拦截器
  instance.interceptors.request.use(
    config => {
      console.log('interpreter请求拦截器')
      //console.log(config)
      //2.1 比如config中的一些不符合服务器要求的信息

      //2.2每次发送请求的时候，都希望在页面显示请求的图标

      //2.3 某些特殊的请求，需要携带token

      return config
    },
    error => {
      console.log(error);
    }
  )

  //3.响应拦截
  instance.interceptors.response.use(
    response => {
      console.log('interpreter响应拦截器')
      //console.log(response);
      return response.data
    },
    error => {
      console.log('interpreter响应拦截器')
      console.log(error);
    }
  )

  //4.调用构造方法 返回AxiosPromise对象
  return instance(config)
}
