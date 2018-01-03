// 使用path-to-regexp匹配路径检查用户是否有角色 js 类的新写法
import Auth from 'assets/auth'
import {DEFAULT_REDIRECT_URL} from 'assets/conf'
import pathToRegexp from 'path-to-regexp'
import AuthFuncs from 'assets/auth/checkFuncs'
class AuthRole {
  constructor (path, roleId) {
    this.path = path
    this.roleId = roleId
  }

  match (context) {
    var pathname = window.location.pathname
    var keys = []
    var re = pathToRegexp(this.path, keys)
    var res = re.exec(pathname)
    if (res) {
      // ##
      // 1.检测是否已登录
      if (this.roleId[0] === 'AUTHENTICATED' && Auth.checkAuth()) {
        return true
      }
      // ##
      // 2.检测具体角色ID
      var currentUserRoleId = Auth.currentUserRoleId()
      if (this.roleId.indexOf(currentUserRoleId) === -1) {
        if (context) {
          window.location.replace(DEFAULT_REDIRECT_URL[currentUserRoleId] || '/')
        }
      } else {
        console.info('检测用户有没有这个功能')
        AuthFuncs.check(context)
      }
      return true
    } else {
      return false
    }
  }
}

var roles = []
roles.push(new AuthRole('/module/manage/stu/mystudy/*', ['ROLE_STUDENT', 'ROLE_PARENTS']))
roles.push(new AuthRole('/module/manage/par/*', ['ROLE_PARENTS']))
roles.push(new AuthRole('/module/home/activity/apply/*', ['ROLE_TEACHER']))
roles.push(new AuthRole('/module/manage/tea/*', ['ROLE_TEACHER']))
roles.push(new AuthRole('/module/manage/stu/myclass/*', ['ROLE_STUDENT', 'ROLE_PARENTS']))
roles.push(new AuthRole('/module/manage/edu/*', ['ROLE_EDU_ADMIN']))
roles.push(new AuthRole('/module/manage/sch/*', ['ROLE_SCH_ADMIN']))
roles.push(new AuthRole('/module/home/resource/upload.html', ['ROLE_TEACHER']))
// 去掉限制 活动结束在加上
// roles.push(new AuthRole('/module/home/weikecheng/detail.html', ['AUTHENTICATED'])) // AUTHENTICATED 代表已登录
var check = function (context) {
  for (var role of roles) {
    if (role.match(context)) {
      break
    }
  }
}

export default {
  check: check
}
