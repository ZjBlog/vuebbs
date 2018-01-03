import {API_URL} from 'assets/conf'
import ls from 'local-storage'
import Auth from 'assets/auth'
const refreshUrl = `${API_URL}/auth/refresh`
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
let refresh = (context) => {
  return context.$http.get(refreshUrl).then((resp) => {
    console.info('刷新jwt')
    ls('nekot', resp.body.jwt)
    let now = new Date().getTime()
    ls.set('refresh_tiem', now)
  }, (resp) => {
    console.info('刷新jwt出错,重新登录')
    console.info(resp)
    ls.remove('nekot')
  })
}
// 自定义插件 方法
export default {
  install: (Vue, options) => {
    // 1 立即刷新 0 30分钟刷新一次
    Vue._jwt_refresh = (context, value) => {
      if (!Auth.checkAuth()) {
        ls.set('refresh_tiem', 0)
        console.info('没有登录,不需要检查jwt')
        return
      }
      if (value === '1') {
        console.info('3s后立即调用刷新方法')
        return sleep(3000).then(() => {
          return refresh(context)
        })
      } else {
        let time = ls.get('refresh_tiem') || '0'
        let old = parseInt(time)
        let now = new Date().getTime()
        if (now - old >= 30 * 60 * 1000) {
          console.info('时间超过30min调用刷新方法')
          return refresh(context)
        } else {
          console.info('不到30min')
        }
      }
    }
    Vue.prototype.$_jwt_refresh = Vue._jwt_refresh
  }
}
