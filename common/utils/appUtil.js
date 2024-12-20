import Constant from './constant.js';
import LoginServer from '../store/loginServer.js';

let app = {};

/**
 * 初始化
 */
const init = (context) => {
  app = context;
};

/**
 * 初次加载判断网络情况
 */
const checkNetwork = () => {
  uni.getNetworkType({
    success(res) {
      const networkType = res.networkType;
      if (networkType === 'none') {
        app.globalData.isNetConnected = false;
        uni.showToast({
          title: '当前无网络',
          icon: 'loading',
          duration: 2000,
        });
      }
    },
  });
};

/**
 * 监听网络状态变化
 */
const checkNetworkStatus = () => {
  uni.onNetworkStatusChange(function (res) {
    if (!res.isConnected) {
      app.globalData.isNetConnected = false;
      uni.showToast({
        title: '网络已断开',
        icon: 'loading',
        duration: 2000,
        complete: function () {},
      });
    } else {
      app.globalData.isNetConnected = true;
      uni.hideToast();
    }
  });
};

/**
 * 打开文档
 */
const openDocument = (url) => {
  uni.showLoading({
    title: '正在下载...',
  });
  uni.downloadFile({
    url: url,
    success: function (res) {
      const filePath = res.tempFilePath;
      uni.openDocument({
        filePath: filePath,
        success: function (res) {
          uni.hideLoading();
        },
        fail: function (error) {
          uni.hideLoading();
          uni.showToast({
            title: '文档打开失败！',
            icon: 'none',
          });
        },
      });
    },
    fail: function () {
      uni.hideLoading();
      uni.showToast({
        title: '下载失败！',
        icon: 'none',
      });
    },
  });
};

/**
 * 预览图片
 */
const previewImage = (url) => {
  uni.showLoading({
    title: '正在打开图片...',
  });

  let urlList = [url];

  uni.previewImage({
    urls: urlList,
    success: function () {
      uni.hideLoading();
    },
    fail: function () {
      uni.hideLoading();
      uni.showToast({
        title: '图片打开失败',
        icon: 'none',
      });
    },
  });
};

/**
 * 清理缓存
 */
const clearStorage = (callBack) => {
  uni.showModal({
    title: '提示',
    content: '清理缓存需要重新登录，是否继续',
    confirmColor: '#F9301B',
    success(res) {
      if (res.confirm) {
        uni.clearStorage({
          success() {
            uni.showToast({
              title: '清理完成',
            });
            callBack.success();
          },
          fail: function (error) {
            callBack.fail();
          },
        });
      }
    },
  });
};

/**
 * 拨打电话
 */
const callPhone = (number) => {
  if (number == null || number == '' || number == undefined) {
    return;
  }

  let phoneNumber = String(number);

  uni.makePhoneCall({
    phoneNumber: phoneNumber,
    fail(error) {},
  });
};

/**
 * 刷新token
 */
const refreshToken = () => {
  let token = uni.getStorageSync(Constant.token);
  let oldRefreshToken = uni.getStorageSync(Constant.refreshToken);

  let timestamp = Date.parse(new Date());
  let expiration = uni.getStorageSync(Constant.tokenExpiration);
  console.log('进入appUtil refreshToken', oldRefreshToken);

  let params = {
    refresh: oldRefreshToken,
  };
  LoginServer.refreshToken(params, {
    success(res) {
      console.log('res data', res);
      uni.setStorageSync(Constant.token, res.access);
      uni.setStorageSync(Constant.refreshToken, res.refresh);
    },
    fail(error) {},
  });
};

const AppUtil = {
  init,
  checkNetwork,
  checkNetworkStatus,
  openDocument,
  previewImage,
  clearStorage,
  callPhone,
  refreshToken,
};

export default AppUtil;
