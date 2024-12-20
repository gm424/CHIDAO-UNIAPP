/**
 * Http 请求队列
 */
import signMd5Utils from '@/utils/signMd5Utils'
let httpRequestList = []
/**
 * 获取 Token
 */
const getToken = () => {
  let token = uni.getStorageSync('token')
  return token
}

/**
 * 获取 语言
 */
const getApplicationLocale = () => {
  let applicationLocale = uni.getStorageSync('applicationLocale')
  return applicationLocale
}

/**
 * 获取 货币
 */
const getCurrency = () => {
  let currency = 'CNY'
  if (!uni.$u.test.isEmpty(uni.getStorageSync('currency'))) {
    currency = uni.getStorageSync('currency')
  }
  return currency
}

/**
 * 处理请求错误
 * @param {number} statusCode HTTP状态码
 * @param {object} data 响应数据
 */
const handleRequestError = (statusCode, data) => {
  console.log('statusCode', statusCode)
  switch (statusCode) {
    case 401:
      // 清除登录信息
      uni.removeStorageSync('token')
      // 跳转登录页面
      const currentPage = getCurrentPages()[getCurrentPages().length - 1].route
      const whiteList = [
        'pages/login/index',
        'pages/login/register',
        'pages/login/forgot',
        'pages/agreement/user',
        'pages/agreement/privacy',
      ]

      if (!whiteList.includes(currentPage)) {
        uni.showToast({
          title: '请重新登录',
          icon: 'none',
          duration: 2000,
        })

        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/login/index',
          })
        }, 1500)
      }
      break

    case 500:
      uni.showToast({
        title: '服务器错误',
        icon: 'none',
      })
      break

    default:
      if (data.message) {
        uni.showToast({
          title: data.message,
          icon: 'none',
        })
      }
  }
}

const request = (url, method, contentType, data, isBuffer) => {
  const startTime = new Date().getTime()
  let sign = signMd5Utils.getSign(url, data)
  if (httpRequestList.includes(url)) {
    return new Promise((resolve, reject) => {})
  } else {
    httpRequestList.push(url)
    return new Promise((resolve, reject) => {
      uni.request({
        url: url,
        method: method,
        data: data,
        timeout: 10 * 6000,
        header: {
          'X-Access-Token': getToken(),
          'X-Sign': sign,
          'Content-Type': contentType === 'json' ? 'application/json' : 'application/x-www-form-urlencoded',
          'Accept-Language': getApplicationLocale(),
          'X-TIMESTAMP': signMd5Utils.getDateTimeToString(),
          currency: getCurrency(),
        },
        responseType: isBuffer ? 'arraybuffer' : 'text',
        success(response) {
          // 处理HTTP状态码
          if (response.statusCode !== 200) {
            handleRequestError(response.statusCode, response.data)
            reject(response)
            return
          }

          // 处理业务状态码
          if (response.data && response.data.code === 401) {
            handleRequestError(401, response.data)
            reject(response.data)
            return
          }

          resolve(response.data)
        },
        fail(error) {
          // 处理网络错误
          uni.showToast({
            title: '网络请求失败',
            icon: 'none',
          })
          reject(error)
        },
        complete(res) {
          const endTime = new Date().getTime()
          const totalTime = endTime - startTime

          // 当请求大于3s
          if (totalTime > 3000 || res.statusCode !== 200) {
            console.log(`请求 ${url} 耗时 ${totalTime}ms`)
          }

          // 从请求队列中移除
          if (httpRequestList.indexOf(url) > -1) {
            httpRequestList.splice(httpRequestList.indexOf(url), 1)
          }
        },
      })
    })
  }
}

/**
 * 上传文件
 */
const upLoadFiles = (url, filePath, data) => {
  if (httpRequestList.includes(url)) {
    return new Promise((resolve, reject) => {})
  } else {
    httpRequestList.push(url)
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url: url,
        filePath: filePath,
        name: 'avatarfile',
        timeout: 10 * 1000,
        header: {
          Authorization: getToken(),
        },
        formData: data,
        success(request) {
          resolve(request.data)
        },
        fail(error) {
          reject(error)
        },
        complete(aaa) {
          // 加载完成
          if (httpRequestList.indexOf(url) > -1) {
            httpRequestList.splice(httpRequestList.indexOf(url), 1)
          }
        },
      })
    })
  }
}

Promise.prototype.finally = function (callback) {
  let Promise = this.constructor
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(function () {
        return value
      })
    },
    function (reason) {
      Promise.resolve(callback()).then(function () {
        throw reason
      })
    }
  )
}

const Http = {
  request,
  upLoadFiles,
}

export default Http
