export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  try {
    document && toggleSidebar(router)
  } catch (e) {
    console.error(e.message)
  }
}

function toggleSidebar(router){
  router.afterEach((to) => {
    const containerDOM = document.getElementsByClassName('theme-container')[0];
    if (containerDOM) {
      if (to.path === '/about.html') {
        containerDOM.classList.add('no-sidebar');
      } else {
        containerDOM.classList.remove('no-sidebar');
      }
    }
  });
}