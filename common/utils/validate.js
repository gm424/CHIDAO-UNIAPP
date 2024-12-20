import Http from '../store/http.js';
import Api from '../store/api.js';
import Constant from './constant.js';
import AppUtil from '../utils/appUtil';

// 验证
const emailReg = new RegExp('^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,3}$');
const phoneReg = new RegExp('^0?(13[0-9]|15[0-9]|16[0-9]|18[0-9]|14[0-9]|17[0-9]|19[0-9])[0-9]{8}$');
const postalCodeReg = new RegExp('^[0-9]{6}$');
const idCardReg = new RegExp('^(\\d{6})(\\d{4})(\\d{2})(\\d{2})(\\d{3})([0-9]|X)$');
const websiteReg = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/);

/**
 * 网址校验
 */
const isPages = (val) => {
  if (val === '' || val === undefined || val === null) {
    return false;
  }
  const path = val.indexOf('/pages');
  if (path !== -1 && path === 0) {
    return true;
  } else {
    return false;
  }
};

/**
 * 网址校验
 */
const isWebsite = (val) => {
  if (val === '' || val === undefined || val === null) {
    return false;
  }
  return websiteReg.test(val);
};

/**
 * 邮箱验证
 */
const checkEmail = (email) => {
  if (email === '' || email === undefined || email === null) {
    return false;
  }
  return emailReg.test(email);
};

/**
 * 手机号验证
 */
const checkPhone = (phone) => {
  if (phone === '' || phone === undefined || phone === null) {
    return false;
  }

  return phoneReg.test(phone);
};

/**
 * 邮政编码验证
 */
const checkPostalCode = (postalCode) => {
  if (postalCode === '' || postalCode === undefined || postalCode === null) {
    return false;
  }

  return postalCodeReg.test(postalCode);
};

/**
 * 身份证号码验证
 */
const checkIdCard = (idCard) => {
  if (idCard === '' || idCard === undefined || idCard === null) {
    return false;
  }

  return idCardReg.test(idCard);
};

/**
 * 判断是否为无效的字段
 */
const isEmply = (data) => {
  if (
    (!data && typeof data != 'undefined' && data != 0) ||
    data === '' ||
    typeof data == 'undefined' ||
    data === NaN ||
    data == 'undefined'
  ) {
    return true;
  }

  return false;
};

/**
 * 判断是否为JSON
 */
const isJson = (data) => {
  if (isEmply(data)) {
    return false;
  }

  try {
    if (typeof data == 'object') {
      return true;
    }

    if (typeof data == 'string' && typeof JSON.parse(data) == 'object') {
      return true;
    }
  } catch (e) {}
  return false;
};

/**
 * 判断是否有 Token 值
 */
const checkToken = () => {
  return checkTokenAndValidity();
};

/**
 * token 有效期判断
 *
 * return true 为过期了
 *
 */
const isInExpirationForToken = () => {
  let expiration = uni.getStorageSync(constant.tokenExpiration);
  console.log('expiration', expiration);
  if (expiration === null) {
    return true;
  }
  let timestamp = Date.parse(new Date());
  // console.log('expiration < timestamp', expiration < timestamp)
  return expiration < timestamp;
};

/**
 * 检测是否有 token, token 是否过期
 */
const checkTokenAndValidity = (hasActivi) => {
  console.log('checkTokenAndValidity');
  let token = uni.getStorageSync(constant.token);
  // 如果没有 token , 进行登录
  if (isEmply(token)) {
    uni.redirectTo({
      url: '/pages/login/login',
    });
    return false;
  } else {
    if (isInExpirationForToken()) {
      uni.showToast({
        title: '登录状态已过期，请重新进行登录！',
        duration: 2500,
        icon: 'none',
      });

      uni.clearStorage();

      setTimeout(function () {
        uni.redirectTo({
          url: '/pages/login/login',
        });
      }, 1800);
      return false;
    } else {
      // 校验用户是否登录
      Http.request(Api.get_user_profile, 'GET', null, null)
        .then((res) => {
          if (isJson(res) && res.code == '200') {
            console.log('token还未过期');
          } else {
            console.log('token过期');
            AppUtil.refreshToken();
            // uni.showToast({
            //   title: '登录状态已过期，请重新进行登录！',
            //   duration: 2500,
            //   icon: 'none',
            // });
            // uni.clearStorage();
            // setTimeout(function () {
            //   uni.redirectTo({
            //     url: '/pages/login/login',
            //   });
            // }, 1800);
            // return false;
          }
        })
        .catch((error) => {
          console.log('token校验接口失败', error);
        });
    }
  }

  return true;
};

/**
 *  去除 string 前后空格
 */
const checkStringSpace = (string) => {
  if (isEmply(string)) {
    return '';
  }

  return string.replace(/^\s+|\s+$/g, '');
};

/**
 * 是否是视频
 *
 * @param {*} ext
 */
const isVideo = (ext) => {
  return ['mp4', 'flv', 'rmvb', 'mvb'].indexOf(ext.toLowerCase()) !== -1;
};

/**
 * 是否是文档文件
 *
 * @param {*} ext
 */
const isDocument = (ext) => {
  return ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'md', 'pdf'].indexOf(ext.toLowerCase()) !== -1;
};

/**
 * 是否是图片
 */
const isImage = (ext) => {
  return ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].indexOf(ext.toLowerCase()) !== -1;
};

/**
 * 是否需要刷新全局的列表
 */
const isLoginOperation = (page) => {
  let loginOperation = '';

  switch (page) {
    case 'combo':
      loginOperation = uni.getStorageSync(constant.userLoginOperation.combo);
      break;

    case 'knowledge':
      loginOperation = uni.getStorageSync(constant.userLoginOperation.knowledge);
      break;

    case 'mine':
      loginOperation = uni.getStorageSync(constant.userLoginOperation.mine);
      break;

    default:
      break;
  }

  if (!isEmply(loginOperation)) {
    if (loginOperation) {
      switch (page) {
        case 'combo':
          uni.setStorageSync(constant.userLoginOperation.combo, false);
          break;

        case 'knowledge':
          uni.setStorageSync(constant.userLoginOperation.knowledge, false);
          break;

        case 'mine':
          uni.setStorageSync(constant.userLoginOperation.mine, false);
          break;

        default:
          return false;
      }
      return true;
    }
  }

  return false;
};

/**
 * 数据类型
 */
const DATA_TYPE = {
  BOOLEAN: 1,
  STRING: 2,
  ARRAY: 3,
  NUMBER: 4,
  OBJECT: 5,
};

/**
 * 处理异常数据转换成对于��型数据
 *
 * @param {*} data
 * @param {*} dataType
 */
function conversionEmptypData(data, dataType) {
  switch (dataType) {
    case DATA_TYPE.BOOLEAN:
      return isEmply(data) ? false : data;

    case DATA_TYPE.STRING:
      return isEmply(data) ? '' : data;

    case DATA_TYPE.ARRAY:
      return isEmply(data) ? [] : data;

    case DATA_TYPE.NUMBER:
      return isEmply(data) ? 0 : data;

    case DATA_TYPE.OBJECT:
      return isEmply(data) ? {} : data;

    default:
      throw 'no match data type';
  }
}

/**
 * 获取 UUId
 */
const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * [isDuringDate 比较当前时间是否在指定日期范围内]
 * @author dongsir
 * @DateTime 2020-03-22
 * @version  1.0
 * @param    date   [beginDateStr] [开始日期]
 * @param    date   [endDateStr]   [结束日期]
 * @return   Boolean
 */
const isDuringDate = (beginDateStr, endDateStr) => {
  var curDate = new Date(),
    beginDate = new Date(beginDateStr),
    endDate = new Date(endDateStr);
  if (curDate >= beginDate && curDate <= endDate) {
    return true;
  }
  return false;
};

/*
	获取系统设置语言
*/
const getAppLanguage = () => {
  // let systemInfo = uni.getSystemInfoSync();
  // let systemLocale = systemInfo.appLanguage;
  let applicationLocale = uni.getLocale();
  uni.setStorageSync('applicationLocale', applicationLocale);
  return uni.getStorageSync('applicationLocale');
};

/**
 * 验证海关编码
 * @param {string} hsCode 海关编码
 * @returns {boolean} 是否通过验证
 */
export const validateHsCode = (rule, value, callback) => {
  // HS编码规则：
  // 1. 长度为6-10位
  // 2. 只能包含数字
  const hsCodeRegex = /^\d{6,10}$/;

  if (!value) {
    callback(new Error('请输入海关编码'));
    return false;
  }

  if (!hsCodeRegex.test(value)) {
    callback(new Error('海关编码格式不正确，应为6-10位数字'));
    return false;
  }

  callback();
  return true;
};

const Validate = {
  isPages,
  isWebsite,
  checkEmail,
  checkPhone,
  checkIdCard,
  isEmply,
  isJson,
  checkToken,
  isInExpirationForToken,
  checkPostalCode,
  checkStringSpace,
  checkTokenAndValidity,
  isVideo,
  isDocument,
  isImage,
  isLoginOperation,
  conversionEmptypData,
  uuidv4,
  getAppLanguage,
  validateHsCode,
};

export default Validate;
