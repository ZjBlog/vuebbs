'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const glob = require('glob')
const MyPlugin = require('./MyPlugin')
var startTime = new Date().getTime()
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// let htmls = glob.sync('./src/pages/**/*.html').map(function (item) {
//   return new HtmlWebpackPlugin({
//       filename: './' + item.slice(6),
//       template: item,
//       inject: true,
//       chunks:[item.slice(2, -5)]
//   });
// });
module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new MyPlugin({
      paths: [
        // '/api_yx/main.js?timestamp=' + new Date().getTime(),
        '/static/js/main.js?timestamp=' + new Date().getTime()
      ]
    }),
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // 编译进度插件
    new webpack.ProgressPlugin(function handler (percentage, msg) {
      var currentTime = new Date().getTime()
      console.log('Progress:[' + (percentage * 100).toFixed(2) + '%], ' + msg + ', 用时:' + ((currentTime - startTime) / 1000) + '秒')
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    //  根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小，该模块推荐使用
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // friendly-errors-webpack-plugin用于更友好地输出webpack的警告、错误等信息
    new FriendlyErrorsPlugin()
    // 报错但不退出webpack进程
    // new webpack.NoErrorsPlugin()
  ]
})
var pages = utils.getEntry('./src/pages/**/*.html')
// ##
// 网站首页
// pages['index'] = 'index.html';
pages['index'] = './src/pages/index/index.html'
for (var pathname in pages) {
  // ##
  // 配置生成的html文件，定义路径等
  var conf = {
    // 页面路径 /pages/admin.html
    filename: pathname + '.html',
    // 模板路径
    template: pages[pathname],
    minify: {
      //传递 html-minifier 选项给 minify 输出
      removeComments: false
    },
    // js插入位置 和true一样效果
    inject: 'body',
    // 每个html引用的js模块，也可以在这里加上vendor等公用模块
    chunks: [pathname, 'vendor', 'manifest']
  }
  // ##
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  module.exports.plugins.push(new HtmlWebpackPlugin(conf))
}