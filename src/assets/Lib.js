// ## 公共配置
// Common JS,Conf
import 'assets/http'
// import Auth from 'assets/auth'
import Refreshsh from 'assets/plugin/refresh'
import * as filters from 'assets/filters'
// ##
// Common CSS
import 'assets/css.css'
// http://fontawesome.io/ 图标css文件
import 'node_modules/font-awesome/css/font-awesome.css'
// element-ui 的css文件
import 'node_modules/element-ui/lib/theme-chalk/index.css'
import 'node_modules/element-ui/lib/theme-chalk/display.css'
// ##
import Vue from 'vue'
import Element from 'element-ui'
Vue.use(Element)

// ##
// 自定义插件
Vue.use(Refreshsh)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
