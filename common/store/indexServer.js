import Http from './http.js';
import Api from './api.js';
import Validate from '../utils/validate';
import AppUtil from '../utils/appUtil';
import Constant from '../utils/constant';

const App = getApp();

/**
 * 获取内容列表
 */
const getHomeContent = (param, type, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  Http.request(`${Api.get_home_content}${type}`, 'GET', null, param)
    .then((res) => {
      // console.log("res", res)
      if (!Validate.isEmply(res.data) && Validate.isJson(res)) {
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
 * 获取热卖推荐商品列表
 */
const getMarketingRecommend = (param, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  Http.request(Api.get_marketing_recommend, 'GET', null, param)
    .then((res) => {
      if (!Validate.isEmply(res.data) && Validate.isJson(res)) {
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
 * 获取内容详情
 */
const getContent = (type, cid, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  Http.request(`${Api.get_home_content}${type}/${cid}`, 'GET', null, null)
    .then((res) => {
      if (!Validate.isEmply(res.data) && Validate.isJson(res)) {
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
 * 获取内容列表
 */
const getStoreList = (param, callBack) => {
  console.log(param);

  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  Http.request(Api.get_store_list, 'GET', null, param)
    .then((res) => {
      // console.log("res", res)
      if (!Validate.isEmply(res.data) && Validate.isJson(res)) {
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
 * 提交询盘问价
 */
const clientInquiry = (params, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  let paramsStr = JSON.stringify(params);

  Http.request(Api.client_inquiry, 'POST', 'json', paramsStr)
    .then((res) => {
      if (Validate.isJson(res) && res.code === 200) {
        callBack.success(res);
      } else {
        callBack.fail(res.msg);
      }
    })
    .catch((error) => {
      console.log(error);
      callBack.fail(error);
    });
};

/**
 * 获取分类列表
 */
const getClientCategory = (params, callBack) => {
  // if (!Validate.checkTokenAndValidity()) {
  //   uni.hideLoading();
  //   return;
  // }

  Http.request(Api.get_client_category, 'GET', null, params)
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
 * 获取特价商品列表
 */
const getClientMarketingSpecial = (param, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  Http.request(Api.get_client_marketing_special, 'GET', null, param)
    .then((res) => {
      if (uni.$u.test.array(res.data) && Validate.isJson(res)) {
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
 * 获取商品列表
 */
const getClientGoods = (goodsId, params, callBack) => {
  // if (!Validate.checkTokenAndValidity()) {
  //   uni.hideLoading();
  //   return;
  // }
  Http.request(`${Api.get_client_goods}${goodsId}`, 'GET', null, params)
    .then((res) => {
      if (!Validate.isEmply(res.data) && Validate.isJson(res)) {
        callBack.success(res);
      } else {
        callBack.fail(res.msg);
      }
    })
    .catch((error) => {
      console.log(error);
      callBack.fail(error);
    });
};

/**
 * 获取商品详情
 */
const getClientGoodsDetail = (goodsId, params, callBack) => {
  // if (!Validate.checkTokenAndValidity()) {
  //   uni.hideLoading();
  //   return;
  // }

  Http.request(`${Api.get_client_goodsDetail}`, 'GET', null, params)
    .then((res) => {
      if (!Validate.isEmply(res.data) && Validate.isJson(res)) {
        callBack.success(res);
      } else {
        callBack.fail(res.msg);
      }
    })
    .catch((error) => {
      console.log(error);
      callBack.fail(error);
    });
};

/**
 * 获取我的购物车
 */
const getUserCart = (param, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }
  console.log('params', param);
  Http.request(Api.user_cartList, 'GET', null, param)
    .then((res) => {
      if (uni.$u.test.array(res.data) && Validate.isJson(res)) {
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
 * 获取我的收藏
 */
const getUserCollection = (param, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  Http.request(Api.get_user_collection, 'GET', null, param)
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
 * 新增我的收藏
 */
const userCollection = (id, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  Http.request(Api.user_collection.replace('{id}', id), 'POST', null, null)
    .then((res) => {
      if (res.success) {
        callBack.success(res);
      } else {
        callBack.fail(res.msg);
      }
    })
    .catch((error) => {
      console.log(error);
      callBack.fail(error);
    });
};

/**
 * 删除我的收藏（根据收藏对象）
 */
const userCollectionDel = (params, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  let paramsStr = JSON.stringify(params);

  Http.request(Api.user_collection_del, 'POST', 'json', paramsStr)
    .then((res) => {
      if (Validate.isJson(res) && res.code === 200) {
        callBack.success(res);
      } else {
        callBack.fail(res.msg);
      }
    })
    .catch((error) => {
      callBack.fail(error);
    });
};

/**
 * 获取店铺列表
 */
const storeList = (params, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  let paramsStr = JSON.stringify(params);

  Http.request(Api.store_list, 'POST', 'json', paramsStr)
    .then((res) => {
      if (Validate.isJson(res) && res.code === 200) {
        callBack.success(res);
      } else {
        callBack.fail(res.msg);
      }
    })
    .catch((error) => {
      callBack.fail(error);
    });
};

/**
 * 获取店铺详情
 */
const getStoreInfo = (params, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  Http.request(Api.get_store_info, 'GET', null, params)
    .then((res) => {
      if (Validate.isJson(res) && res.code === 200) {
        callBack.success(res);
      } else {
        callBack.fail(res.msg);
      }
    })
    .catch((error) => {
      callBack.fail(error);
    });
};

/**
 * 获取指定店铺下分类列表
 */
const getStoreCategory = (type, callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  Http.request(`${Api.get_store_category}${type}`, 'GET', null, null)
    .then((res) => {
      if (uni.$u.test.array(res.data) && Validate.isJson(res)) {
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
 * 获取行业信息
 */
const getClientIndustry = (callBack) => {
  if (!Validate.checkTokenAndValidity()) {
    uni.hideLoading();
    return;
  }

  Http.request(Api.get_client_industry, 'GET', null, null)
    .then((res) => {
      if (uni.$u.test.array(res.data) && Validate.isJson(res)) {
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
 * 获取OSS信息
 */

const getOssSignature = (callBack) => {
  Http.request(Api.get_oss_signature, 'GET', null, null)
    .then((res) => {
      if (res.success) {
        callBack.success(res);
      }
    })
    .catch((error) => {
      callBack.fail(error);
    });
};
/**
 * 获取物流轨迹的信息
 */

const getWLTracking = (params, callBack) => {
  Http.request(Api.get_logistics_tracking, 'GET', null, params)
    .then((res) => {
      if (res) {
        callBack.success(res);
      }
    })
    .catch((error) => {
      callBack.fail(error);
    });
};
module.exports = {
  getHomeContent,
  getContent,
  getMarketingRecommend,
  getStoreList,
  clientInquiry,
  getClientCategory,
  getClientMarketingSpecial,
  getClientGoods,
  getClientGoodsDetail,
  userCollection,
  userCollectionDel,
  storeList,
  getStoreInfo,
  getStoreCategory,
  getClientIndustry,
  getUserCollection,
  getUserCart,
  getOssSignature,
  getWLTracking,
};
