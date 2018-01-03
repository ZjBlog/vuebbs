var jss = [
  // '/static/js/plugins.js'
]
for (var i = 0; i < jss.length; i++) {
  try {
    var e = document.createElement('script')
    e.src = jss[i]
    document.body.appendChild(e)
  } catch (e) {
    console.log(e)
  }
}
