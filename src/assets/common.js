// ##
// 公共类 那调用那里引用
var Rxports = {}
/* no-extend-native */
// 日期格式化
var DateFormat = function (date, fmt) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/* no-extend-native */
// date1 是否在 date2 之后
var DateIsAfter = function (date1, date2) {
  if (!date1) {
    date1 = new Date()
  }
  if (!date2) {
    date2 = new Date()
  }
  // console.log(Date.parse(date1) > Date.parse(date2))
  return Date.parse(date1) > Date.parse(date2)
}

Rxports.DateFormat = DateFormat

// Rxports.DateIsBefore = DateIsBefore

Rxports.DateIsAfter = DateIsAfter

module.exports = Rxports
