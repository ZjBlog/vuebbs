/* eslint-disable no-multi-spaces */
/* eslint-disable no-unneeded-ternary */
import { API_URL } from 'assets/conf'
import ls from 'local-storage'
const SESSION_URL = `${API_URL}/auth/sessions`
const CURRENT_USER_URL = `${API_URL}/auth/userinfo`
export default {
  user: {
    authenticated: ls('nekot') ? true : false,
    username: ''
  },
  login (context, creds, redirect) {
    context.$http.post(SESSION_URL, creds)
      .then((resp) => {
        ls('nekot', resp.body.jwt)
        this.user.authenticated = true
        context.$message({
          message: '登录成功!',
          type: 'success',
          duration: 500,
          onClose () { window.location.replace(redirect || '/') }
        })
        this.currentUser(context)
        window._czc.push(['_trackEvent', '系统', '登录', '成功', 1])
      }, (resp) => {
        context.error = resp
        window._czc.push(['_trackEvent', '系统', '登录', '失败', 1])
      })
  },
  logout (context, options) {
    ls.clear()
    context.user = {}
    this.user.authenticated = false
    window.location.replace('/module/auth/login.html')
    context.$message({
      message: '退出登录成功!',
      type: 'success',
      duration: 500,
      onClose () {
        // 跳转到登录页面
        window.location.replace('/module/auth/login.html')
      }
    })
  },
  currentUser (context) {
    if (this.user.authenticated) {
      let currentUser = ls('current_user')
      if (currentUser !== null) {
        // 60分钟未刷新页面清除登录信息
        var currTime = new Date().getTime()
        var resule = currTime - currentUser.loginDateTime
        if (resule >= 1000 * 60 * 60) {
          ls.clear()
          window.location.reload()
        }
      }
      context.$http.get(CURRENT_USER_URL)
        .then((resp) => {
          context.user = resp.body
          ls('current_user', resp.body)
          // AuthCheck.checkLoginDateTime(resp.body.loginDateTime)
          // 检测用户当前页面访问权限
        }, (resp) => {
          // 获取用户信息异常,暂时自动清理全部数据,防止BUG
          // ls.clear() // 暂时暂时屏蔽,请求频繁,导致自动清除了登录状态
          if (resp.status === 0) {
            this.$message.error('未知错误!')
          } else if (resp.status === 403) {
            this.$message.error('没有权限!')
          }
        })
    } else {
      context.user = {}
      // 检测用户当前页面访问权限
    }
  },
  checkAuth () {
    var jwt = ls('nekot')
    this.user.authenticated = jwt ? true : false
    return this.user.authenticated
  },
  getAuthToken () {
    return ls('nekot')
  },
  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + ls('nekot')
    }
  }
}
