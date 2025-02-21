// 路由拦截
const whiteList = [
  'pages/index/index',
  'pages/login/index',
  'pages/login/register',
  'pages/login/forgot',
  'pages/agreement/user',
  'pages/agreement/privacy',
  'pages/company/select', // 将企业选择页面加入白名单
]

function hasPermission(url) {
  const token = uni.getStorageSync('token')
  const currentCompany = uni.getStorageSync('currentCompany')

  // 如果有 Token 但没有企业信息，则返回特定状态
  if (!!token && currentCompany === '') {
    return 'noCompany' // 特殊标记，表示需要跳转到企业选择页面
  }

  // 在白名单中或有 token，则可以访问
  return !!token || whiteList.some((path) => url.indexOf(path) !== -1)
}

export function initPermission() {
  // 注册页面跳转拦截器
  const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
  list.forEach((item) => {
    uni.addInterceptor(item, {
      invoke(e) {
        const url = e.url.split('?')[0]

        const permission = hasPermission(url)
        if (permission === true) {
          // 正常访问
          return e
        } else if (permission === 'noCompany') {
          // 有 Token 但没有企业信息，跳转到企业选择页面
          if (url === '/pages/company/select') {
            // 避免重复跳转企业选择页面
            return e
          }
          console.log('跳转到企业选择页面')
          uni.reLaunch({
            url: '/pages/company/select',
          })
          return false
        } else {
          // 未登录，跳转到登录页面
          if (url === '/pages/login/index') {
            // 避免重复跳转登录页面
            return e
          }
          console.log('进来登录')
          uni.reLaunch({
            url: '/pages/login/index',
          })
          return false
        }
      },
      fail(err) {
        console.log(err)
      },
    })
  })
}
