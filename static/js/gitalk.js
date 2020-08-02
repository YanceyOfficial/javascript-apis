function ramdomStr() {
  return Math.random().toString(32)
}

function registerGitalk() {
  const gitalkDOMId = `gitalk-wrapper_${ramdomStr()}`

  const prevnextDOM = document.querySelector('.pagination-nav')
  const gitalkDOMStr = `<section id=${gitalkDOMId}></section>`

  prevnextDOM.insertAdjacentHTML('beforebegin', gitalkDOMStr)

  const gitalk = new Gitalk({
    clientID: 'cafb285f82b3c637550b',
    clientSecret: 'a437e56cdc9b6ec41ee6361940e2afe8eb1676f6',
    repo: 'javascript-apis',
    owner: 'YanceyOfficial',
    admin: ['YanceyOfficial'],
    id: location.pathname,
    distractionFreeMode: false,
  })

  gitalk.render(gitalkDOMId)
}

// 自定义事件
// 学习一下
function registerHistoryEvent() {
  var _wr = function (type) {
    var orig = history[type]
    return function () {
      var rv = orig.apply(this, arguments)
      var e = new Event(type)
      e.arguments = arguments
      window.dispatchEvent(e)
      return rv
    }
  }
  history.pushState = _wr('pushState')
  history.replaceState = _wr('replaceState')
}

registerHistoryEvent()

window.addEventListener('load', function () {
  registerGitalk()
})

window.addEventListener('pushState', function () {
  registerGitalk()
})
