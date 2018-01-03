// axios 的配置文件 axios本身不是vue的插件  不能使用vue.use()的方法使用  使用Vue.prototype.$http = service 全局注册 之后使用this.$http.get()....
import axios from 'axios'
import Vue from 'vue'
import { Message } from 'element-ui'
// https://www.npmjs.com/package/vue-axios这种方法更好
// 创建axios实例
const service = axios.create({
  timeout: 10000,
  headers: {Authorization: 'Bearer YXBpOnBhc3N3b3Jk'}
})
service.interceptors.request.use(config => {
  // Do something before request is sent
  config.headers['Authorization'] = getToken()
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
// 根据个人情况获取Authorization
function getToken () {
  return 'test'
}
// respone拦截器
service.interceptors.response.use(
  response => {
    // 响应状态码
    var status = response.status
    // ##
    // 200 ? 否: 统一记录console.error日志
    if (status !== 200) {
      console.log('Response:-------------------1')
      console.error(response)
      console.error('Status:' + status)
      console.error('Message:' + (response.body.message || response.statusText))
      console.log('Response:-------------------2')
    }
    // ##
    // 200 ? 是
    if (status === 200) {
      Message('请求成功')
    } else if (status === 401) {
      // 认证失败: 自动退出登录
      Message.error('认证失败：' + (response.body.message || response.statusText))
    } else if (status === 403) {
      // 没有权限访问: 比如: 家长访问教师的接口
      Message.error('没有权限!')
    } else if (status === 422) {
      // 请求参数错误: 后台接口Assert断言抛出的异常
      Message({
        message: (response.body.message || response.statusText),
        type: 'warning'
      })
    } else if (status === 504) {
      // 504 Gateway Timeout
      // 路由超时: 1.HAProxy本身路由问题(主备配置失效导致), 2.程序处理过程太长导致HAProxy路由网络请求超时
      Message({
        message: (response.body.message || response.statusText),
        type: 'warning'
      })
    } else if (status === 0) {
      // 网络断开
      Message.error('网络请求失败!')
    } else {
      // 其他情况异常
      // vue.$message.error((response.body.message || response.statusText))
      Message({
        message: (response.body.message || response.statusText),
        type: 'warning'
      })
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)
Vue.prototype.$http = service
