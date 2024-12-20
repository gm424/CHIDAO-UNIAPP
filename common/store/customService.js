import Http from './http'
import Api from './api'
import Validate from '../utils/validate'

import Constant from '../utils/constant'

const App = getApp()

/**
 * 联系客服
 */
const contactSupport = (params, callBack) => {
  if (!App.globalData.isNetConnected) {
    uni.showToast({
      title: Constant.networkError,
      icon: 'none',
      duration: 2500,
    })
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
 * 聊天列表
 */
const contactSupportList = (callBack) => {
  if (!App.globalData.isNetConnected) {
    uni.showToast({
      title: Constant.networkError,
      icon: 'none',
      duration: 2500,
    })
    return
  }

  Http.request(Api.contact_support_list, 'GET', null, null)
    .then((res) => {
      // Validate.isEmply(res.msg)
      if (res.code === 200) {
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
 * 获取最新一条询盘通知
 */
const getNoticesLast = (callBack) => {
  if (!App.globalData.isNetConnected) {
    uni.showToast({
      title: Constant.networkError,
      icon: 'none',
      duration: 2500,
    })
    return
  }

  Http.request(Api.get_notices_last, 'GET', null, null)
    .then((res) => {
      if (res.code === 200) {
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
 * 获取询盘通知（标记已读）
 */
const getNoticesId = (id, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading()
    return
  }

  Http.request(`${Api.get_notices_id}/${id}`, 'GET', null, null)
    .then((res) => {
      if (res.code === 200) {
        callBack.success(res)
      } else {
        callBack.fail(res)
      }
    })
    .catch((error) => {
      callBack.fail(error)
    })
}

/**
 * 获取询盘通知列表
 */
const getInquiryNotices = (callBack) => {
  if (!App.globalData.isNetConnected) {
    uni.showToast({
      title: Constant.networkError,
      icon: 'none',
      duration: 2500,
    })
    return
  }

  Http.request(Api.get_inquiry_notices, 'GET', null, null)
    .then((res) => {
      if (res.code === 200) {
        callBack.success(res)
      } else {
        callBack.fail(res.msg)
      }
    })
    .catch((error) => {
      callBack.fail(error)
    })
}

module.exports = {
  contactSupport,
  contactSupportList,
  getNoticesLast,
  getNoticesId,
  getInquiryNotices,
}
