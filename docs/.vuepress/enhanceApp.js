// function integrateGitalk(router) {
//   const linkGitalk = document.createElement('link');
//   linkGitalk.href = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css';
//   linkGitalk.rel = 'stylesheet';
//   document.body.appendChild(linkGitalk);
//   const scriptGitalk = document.createElement('script');
//   scriptGitalk.src = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js';
//   document.body.appendChild(scriptGitalk);

//   router.afterEach((to) => {
//     if (scriptGitalk.onload) {
//       loadGitalk(to);
//     } else {
//       scriptGitalk.onload = function () {
//         loadGitalk(to);
//       }
//     }
//   });

//   function loadGitalk(to) {
//     let commentsContainer = document.getElementById('gitalk-container');
//     if (commentsContainer) {

//       commentsContainer.parentNode.removeChild(commentsContainer);
//     }

//     if (!commentsContainer) {
//       commentsContainer = document.createElement('div');
//       commentsContainer.id = 'gitalk-container';
//       commentsContainer.classList.add('content');
//     }
//     const $page = document.querySelector('.page');
//     if ($page) {
//       $page.appendChild(commentsContainer);
//       if (typeof Gitalk !== 'undefined' && Gitalk instanceof Function) {
//         renderGitalk(to.fullPath);
//       }
//     }
//   }

//   function renderGitalk(fullPath) {
//     const gitalk = new Gitalk({
//       clientID: 'cafb285f82b3c637550b',
//       clientSecret: 'a437e56cdc9b6ec41ee6361940e2afe8eb1676f6',
//       repo: 'javascript-apis',
//       owner: 'YanceyOfficial',
//       admin: ['YanceyOfficial'],
//       // fullPath 其实就是 window.location.path
//       id: fullPath,
//       distractionFreeMode: false,
//       language: 'zh-CN',
//     });
//     gitalk.render('gitalk-container');
//   }
// }

// export default ({
//   Vue,
//   options,
//   router
// }) => {
//   try {
//     document && integrateGitalk(router)
//   } catch (e) {
//     console.error(e.message)
//   }
// }

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // todo
}