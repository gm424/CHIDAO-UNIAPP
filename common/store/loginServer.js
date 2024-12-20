import Http from '@/common/store/http'
import Constant from '@/common/utils/constant'
import Validate from '@/common/utils/validate'
import Api from '@/common/store/api'
import { DEVELOP_HOST, PRODUCT_HOST, isDevelopModel } from '@/config/index.js'

const API_HOST = isDevelopModel ? DEVELOP_HOST : PRODUCT_HOST
let that = {}
/**
 * 初始化
 */
let currdatetime = new Date().getTime()
const init = (context) => {
  that = context
}

/**
 * 账号密码登录
 */

const login = (params, callBack) => {
  let queryParams = Object.assign(params, { checkKey: currdatetime }, { visitorId: 'a9fb93c525b95036e6999882a872c7fb' })
  let loginInfoStr = JSON.stringify(queryParams)

  Http.request(API_HOST + '/login' + '?finger=a9fb93c525b95036e6999882a872c7fb', 'POST', 'json', loginInfoStr)
    .then((res) => {
      if (res.success) {
        console.log('登录成功！', res)
        uni.setStorageSync('token', res.result.token)
        callBack.success(res)
      } else {
        uni.showToast({
          title: res.message,
          duration: 2500,
          icon: 'none',
        })
        callBack.fail()
      }
    })
    .catch((error) => {
      console.log('error', error)

      uni.showToast({
        title: '登录失败',
        duration: 2500,
        icon: 'none',
      })
      callBack.fail(error)
    })
}

/*
刷新Token
*/
const refreshToken = (params, callBack) => {
  console.log('刷新token', params)
  Http.request(Api.get_user_refreshToken, 'POST', 'json', params).then((res) => {
    if (res.refresh) {
      callBack.success(res)
    } else {
      callBack.fail(res)
    }
  })
}

/**
 * 获取用户信息
 */
const getUserProfile = (callBack) => {
  if (!that.globalData.isNetConnected) {
    uni.showToast({
      title: Constant.networkError,
      icon: 'none',
      duration: 2500,
    })
    return
  }

  Http.request(Api.get_user_profile, 'GET', null, null)
    .then((res) => {
      if (res.success) {
        uni.setStorageSync(Constant.userInfo, JSON.stringify(res.data))
        callBack.success(res.data)
      } else {
        uni.clearStorageSync()
        that.globalData.isLogin = false
        callBack.fail(res.msg)
      }
    })
    .catch((error) => {
      console.log('获取用户信息', error)
      callBack.fail(error)
    })
}

/**
 * 修改用户信息
 */
const putUserProfile = (params, callBack) => {
  if (!that.globalData.isNetConnected) {
    uni.showToast({
      title: Constant.networkError,
      icon: 'none',
      duration: 2500,
    })
    return
  }

  let paramsStr = JSON.stringify(params)

  Http.request(Api.get_user_profile, 'PUT', 'json', paramsStr)
    .then((res) => {
      if (Validate.isJson(res) && res.code == '200') {
        callBack.success(res)
      } else {
        callBack.fail(res.msg)
      }
    })
    .catch((error) => {
      callBack.fail(error)
    })
}

/**
 * 注册
 */
const registerUser = (params, callBack) => {
  // if (!that.globalData.isNetConnected) {
  //   uni.showToast({
  //     title: Constant.networkError,
  //     icon: 'none',
  //     duration: 2500,
  //   });
  //   return;
  // }

  let paramsStr = JSON.stringify(params)

  Http.request(Api.user_register, 'POST', 'json', paramsStr)
    .then((res) => {
      if (res.code === 200) {
        callBack.success(res)
      } else {
        callBack.fail(res.msg)
      }
    })
    .catch((error) => {})
}
/**
 * 注册
 */
const logoutUser = (params, callBack) => {
  let paramsStr = JSON.stringify(params)
  Http.request(Api.user_logout, 'POST', null, null)
    .then((res) => {
      if (res.code === 200) {
        callBack.success(res)
      } else {
        callBack.fail(res.msg)
      }
    })
    .catch((error) => {})
}
/**
 * 下邮件短信验证码
 */
const getCaptchCode = (callBack) => {
  Http.request(`${API_HOST}/sys/randomImage/${currdatetime}`, 'GET', null, null)
    .then((res) => {
      console.log('验证码bode', res, res.success, res.result)
      if (res.success) {
        callBack.success(res.result)
      } else {
        callBack.fail(res.message)
      }
    })
    .catch((error) => {
      console.log(error)
      callBack.fail(error)
    })
}

/**
 * 联系客服
 */
const contactSupport = (params, callBack) => {
  if (!that.globalData.isNetConnected) {
    uni.showToast({
      title: Constant.networkError,
      icon: 'none',
      duration: 2500,
    })
    return
  }

  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading()
    return
  }

  let paramsStr = JSON.stringify(params)

  Http.request(Api.contact_support, 'POST', 'json', paramsStr)
    .then((res) => {
      // Validate.isEmply(res.msg)
      if (res.code === 200) {
        callBack.success(res)
        console.log(res)
      } else {
        console.log(res)
        callBack.fail(res.msg)
      }
    })
    .catch((error) => {
      console.log(error)
      callBack.fail(error)
    })
}

/**
 * 找回密码
 */
const resetPwd = (params, callBack) => {
  if (!that.globalData.isNetConnected) {
    uni.showToast({
      title: Constant.networkError,
      icon: 'none',
      duration: 2500,
    })
    return
  }

  let paramsStr = JSON.stringify(params)

  Http.request(Api.resetPwd, 'PUT', 'json', paramsStr)
    .then((res) => {
      if (Validate.isJson(res) && Validate.isEmply(res.msg)) {
        callBack.success(res)
      } else {
        callBack.fail(res.msg)
      }
    })
    .catch((error) => {
      console.log(error)
      callBack.fail(error)
    })
}

const LoginServer = {
  init,
  login,
  getUserProfile,
  registerUser,
  getCaptchCode,
  putUserProfile,
  contactSupport,
  resetPwd,
  refreshToken,
  logoutUser,
}

export default LoginServer
