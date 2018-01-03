 // 公共配置文件 那里需要那里引用
const { SCHEME, HOSTNAME } =
process.env.NODE_ENV === 'production'
? {SCHEME: 'http', HOSTNAME: window.location.hostname + (window.location.port ? ':' + window.location.port : '')}
: {SCHEME: 'http', HOSTNAME: window.location.hostname + (window.location.port ? ':' + window.location.port : '')}

const API_URL_COMP = `${SCHEME}://${HOSTNAME}/api_comp_2.0`

const DOMAIN = window.location.hostname

// ##
// 公共配置
var Rxports = {
  DOMAIN: DOMAIN,
  API_URL: API_URL_COMP,
  appname: '云校-综合项目管理平台',
  copyright: '<p style="font-size:14px;margin-bottom: 15px;">&copy;2016-2017 云校-综合项目管理平台</p><p style="font-size:14px;margin-top: 8px;">客服电话: 400-686-1391</p><p style="font-size:14px;margin-top: 8px;">技术支持：云校（北京）科技有限公司</p>'
}
module.exports = Rxports
