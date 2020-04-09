window.addEventListener('load', function () {
  const gitalkDOMId = 'gitalk-container'

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
})
