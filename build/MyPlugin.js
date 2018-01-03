const fs = require('fs')
const path = require('path')

// ##
// SEO优化
let title = 'Demo'
let seoBodyContent = '云校是一个智慧教育云平台，包括教学、学习、考评与管理等各类应用，服务于K12领域，面向教育机构、学校、老师、家长及学生，提供便捷、全面的信息化解决方案，实现以数据为基础、以应用为驱动的教育新生态。同时利用自身的教学资源整合优势，打造一所没有围墙的学校，达到人人皆学、时时可学、处处能学的目标。'
let seoMetaKeywords = '云校,云学校,云教育,教育云平台,云校教育云,智慧教育,教育大数据,智慧课堂,智慧校园,教学资源,在线备课,智能组卷,家校互动,家校沟通,班班通,人人通,电子书包,教学助手,网校，K12，在线教育'
let seoMetaDescription = '云校是一个智慧教育云平台，包括教学、学习、考评与管理等各类应用，服务于K12领域，面向教育机构、学校、老师、家长及学生，提供便捷、全面的信息化解决方案，实现以数据为基础、以应用为驱动的教育新生态。同时利用自身的教学资源整合优势，打造一所没有围墙的学校，达到人人皆学、时时可学、处处能学的目标。'


/**
 * 自定义插件 options 插件参数  complier 编译器 包含webpack插件信息和自己配置config 信息
 * compilation，它继承于compiler，所以能拿到一切compiler的内容（所以你也会看到webpack的options），而且也有plugin函数来接入任务点
 */
function MyPlugin (options) {
  this.options = options
}

// ##apply方法是必须要有的，因为当我们使用一个插件时（new somePlugins({})），webpack会去寻找插件的apply方法并执行
MyPlugin.prototype.apply = function (compiler) {

  // ##
  // 加载动画
  let loadingSnippet = ''
  loadingSnippet += fs.readFileSync(path.resolve(__dirname, '../static/pages/loading/loading02.html'), 'utf-8')
  // ##
  // 浏览器升级:页面内容
  let updateSnippet = ''
  updateSnippet += fs.readFileSync(path.resolve(__dirname, '../static/pages/update/index.html'), 'utf-8')
  // 浏览器升级:页面内容:压缩
  let minify = require('html-minifier').minify
  updateSnippet = minify(updateSnippet, {
    minifyJS: true,
    minifyCSS: true,
    removeComments: true,
    useShortDoctype: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true
  })
  // 浏览器升级:页面内容:DOM
  let jsdom = require('jsdom')
  const { JSDOM } = jsdom
  // 返回dom
  let updateSnippetDocument = new JSDOM(updateSnippet)

  // ##
  // CNZZ 网站统计
  let cnzzSnippet = ''
  cnzzSnippet += fs.readFileSync(path.resolve(__dirname, '../static/pages/cnzz/index.html'), 'utf-8')

  //
  // let title = this.options.title
  let paths = this.options.paths
  let timestamp = new Date().getTime()
  // compile（'编译器'对'开始编译'这个事件的监听） 可以监听不同的事件
  compiler.plugin('compile', function (params) {
    console.log("The compiler is starting to compile...")
  })
  // compilation 编译ing事件
  compiler.plugin('compilation', function (compilation, options) {
    // compilation可以拿到webpack插件信息 监听html-webpack-plugin-before-html-processing 事件 组装html之前
    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
      // ##
      // 自定义JS 每个页面都需要的js
      for (let i = paths.length - 1; i >= 0; i--) {
        // assets.js html js集合 之后会在script标签中生成
        htmlPluginData.assets.js.unshift(paths[i])
      }

      // console.log(htmlPluginData);
      let env = require('jsdom/lib/old-api.js').env
      let html = htmlPluginData.html
      // first argument can be html string, filename, or url
      env(html, function (errors, window) {
        if (errors) {
          console.log(errors)
        }
        // ##
        // 引入jQuery
        let $ = require('jquery')(window)
        // ##
        // 设置标题
        // var title = htmlPluginData.plugin.options.title?htmlPluginData.plugin.options.title:'云校教育云:2017';
        // let title = '教育云'
        $('title').html(title)
        // ##
        // 设置META
        let metaKeywords = '<meta name="keywords" content="' + seoMetaKeywords + '" />'
        let metaDescription = '<meta name="description" content="' + seoMetaDescription + '" />'
        let metra2 = '<meta http-equiv="X-UA-Compatible" content="IE=edge">'
        let metra = '<meta name="viewport" content="width=device-width,user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">'
        let metra1 = '<meta name="apple-mobile-web-app-capable" content="yes" />'
        $(metra2).appendTo('head')
        $(metra1).appendTo('head')
        $(metra).appendTo('head')
        $(metaKeywords).appendTo('head')
        $(metaDescription).appendTo('head')
        // ##
        // 设置Body#app.html()
        if (seoBodyContent) {
          $('#app').html(seoBodyContent)
        }
        // CSS
        let linkes = [
          '/static/css/main.css',
          '/static/css/normalize.css'
        ]
        linkes.forEach(function (href) {
          $('<link>').attr({
            'rel': 'stylesheet',
            'href': href + '?v=' + timestamp
          }).appendTo('head')
        })
        
        // ##
        // favicon
        let linkicon = $('<link>')
        linkicon.attr({
          'rel': 'icon',
          'type': 'image/png',
          'href': '/static/favicon/hrb.png?v=' + timestamp
        })
        $('head').append(linkicon)
        // ##
        // JS
        $('<div>').html(loadingSnippet).prependTo('#app')
        // ##
        // meta viewport
        // $('meta[name="viewport"]').remove()
        //
        // ##
        // update
        updateSnippet = $(updateSnippetDocument).find('body').html()
        updateSnippet = updateSnippet + '<style>#app{display:none;}</style>'
        updateSnippet = updateSnippet + '<style>body{background-color:#b5b5b5!important;}</style>'
        updateSnippet = '<!--[if lt IE 9]>' + updateSnippet + '<![endif]-->'
        $('<div>').html(updateSnippet).prependTo('body')

        // ##
        // CNZZ 统计
        $('body').append(cnzzSnippet)

        // ...
        // ...
        // ##
        // 修改HTML内容
        htmlPluginData.html = '<!DOCTYPE html>' + $('html').prop('outerHTML')
        // ##
        // HWP回调
        callback(null, htmlPluginData)
      })
    })
  })
}

module.exports = MyPlugin
