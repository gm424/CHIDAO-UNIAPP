// 路由拦截
const whiteList = [
  'pages/index/index',
  'pages/login/index',
  'pages/login/register',
  'pages/login/forgot',
  'pages/agreement/user',
  'pages/agreement/privacy',
]

function hasPermission(url) {
  const token = uni.getStorageSync('token')
  // 在白名单中或有token，则可以访问
  return !!token || whiteList.some((path) => url.indexOf(path) !== -1)
}

export function initPermission() {
  // 注册页面跳转拦截器
  const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
  list.forEach((item) => {
    uni.addInterceptor(item, {
      invoke(e) {
        const url = e.url.split('?')[0]
        if (!hasPermission(url)) {
          uni.reLaunch({
            url: '/pages/login/index',
          })
          return false
        }
        return e
      },
      fail(err) {
        console.log(err)
      },
    })
  })
}
