import Http from './http';
import Api from './api';
import Validate from '../utils/validate';
import AppUtil from '../utils/appUtil';
import Constant from '../utils/constant';

let that;
that = {};
/**
 * 初始化
 */
const init = (context) => {
  that = context;
};

/**
 * 获取我的子订单列表
 */
const getOrderList = (params, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  Http.request(Api.get_my_orderList, 'GET', null, params)
    .then((res) => {
      if (Validate.isJson(res) && res.code === 200) {
        callBack.success(res);
      } else {
        callBack.fail(res);
      }
    })
    .catch((error) => {
      callBack.fail(error);
    });
};
/**
 * 获取我的子订单详情页面
 */
const getOrderDetails = (id, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  Http.request(`${Api.get_my_orderDetails}${id}`, 'GET', null, null)
    .then((res) => {
      if (Validate.isJson(res) && res.code === 200) {
        callBack.success(res);
      } else {
        callBack.fail(res);
      }
    })
    .catch((error) => {
      callBack.fail(error);
    });
};

/**
 * 获取我的主订单列表
 */
const getMainOrderList = (params, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  Http.request(Api.get_my_mainOrderList, 'GET', null, params)
    .then((res) => {
      if (Validate.isJson(res) && res.code === 200) {
        callBack.success(res);
      } else {
        callBack.fail(res);
      }
    })
    .catch((error) => {
      callBack.fail(error);
    });
};
/**
 * 获取我的主订单详情页面
 */
const getMainOrderDetails = (id, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  Http.request(`${Api.get_my_mainOrderDetails}${id}`, 'GET', null, null)
    .then((res) => {
      if (Validate.isJson(res) && res.code === 200) {
        callBack.success(res);
      } else {
        callBack.fail(res);
      }
    })
    .catch((error) => {
      callBack.fail(error);
    });
};
/**
 * 立即下单
 */
const postMyOrder = (data, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }
  let dataStr = JSON.stringify(data);
  Http.request(Api.post_my_order, 'POST', 'json', dataStr)
    .then((res) => {
      if (Validate.isJson(res) && res.code === 200) {
        callBack.success(res);
      } else {
        callBack.fail(res);
      }
    })
    .catch((error) => {
      callBack.fail(error);
    });
};
/**
 * 线下支付提交审核
 */
const offLinePayment = (sn, data, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }
  let dataStr = JSON.stringify(data);
  Http.request(Api.post_offLinePayment_order.replace('{orderSn}', sn), 'POST', 'json', dataStr)
    .then((res) => {
      if (Validate.isJson(res) && res.code === 200) {
        callBack.success(res);
      } else {
        callBack.fail(res);
      }
    })
    .catch((error) => {
      callBack.fail(error);
    });
};

/**
 * 订单确认收货
 */

const completeOrder = (id, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  Http.request(Api.post_complete_order.replace('{id}', id), 'POST', null, null)
    .then((res) => {
      if (res.success) {
        callBack.success(res);
      } else {
        callBack.fail(res);
      }
    })
    .catch((error) => {
      callBack.fail(error);
    });
};
/**
 * 获取壹云汇支付所需参数
 */
const getPaymentConstants = (callBack) => {
  Http.request(`${Api.get_payment_constants}`, 'GET', null, null)
    .then((res) => {
      if (res.success) {
        console.log('callback', callBack, callBack.success(res));
        callBack.success(res);
      } else {
        callBack.fail(res);
      }
    })
    .catch((error) => {
      callBack.fail(error);
    })
    .finally(() => {
      console.log('请求完成'); // 请求完成信息
      // 清除回调函数引用，防止内存泄漏
      callBack.success = null;
      callBack.fail = null;
      callBack = null;
      console.log('回调函数已销毁');
    });
};

/**
 * 调起支付
 */
const payOrder = (sn, data, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  Http.request(`${Api.post_pay_order.replace('{order_sn}', sn)}`, 'POST', 'json', data)
    .then((res) => {
      if (res.code === 200) {
        callBack.success(res);
      } else {
        callBack.fail(res);
      }
    })
    .catch((error) => {
      callBack.fail(error);
    });
};
/**
 * 获取物流轨迹
 */
const getOrderTracking = (data, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  Http.request(`${Api.get_order_tracking}`, 'POST', 'json', data)
    .then((res) => {
      if (res.code === 200) {
        callBack.success(res);
      } else {
        callBack.fail(res);
      }
    })
    .catch((error) => {
      callBack.fail(error);
    });
};
module.exports = {
  init,
  getOrderList,
  postMyOrder,
  getOrderDetails,
  getMainOrderList,
  getMainOrderDetails,
  offLinePayment,
  completeOrder,
  getPaymentConstants,
  payOrder,
  getOrderTracking,
};
