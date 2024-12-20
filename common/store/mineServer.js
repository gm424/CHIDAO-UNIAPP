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

// 上传用户头像
const userProfileAvatar = (filePath, callBack) => {
	if (!that.globalData.isNetConnected) {
		uni.showToast({
			title: Constant.networkError,
			icon: 'none',
			duration: 2500
		})
		return;
	}

	if (!Validate.checkTokenAndValidity()) {
		uni.hideLoading();
		return;
	}

	Http.upLoadFiles(Api.user_profile_avatar, filePath, {})
		.then(res => {

			if (Validate.isJson(res) && res.error == null) {
				callBack.success(JSON.parse(res));
			} else {
				callBack.fail(res);
			}
		})
		.catch(error => {
			callBack.fail(error);
		});
};

// 修改用户信息

const userProfile = (params, callBack) => {
	if (!that.globalData.isNetConnected) {
		uni.showToast({
			title: Constant.networkError,
			icon: 'none',
			duration: 2500
		});
		return;
	}

	let loginInfoStr = JSON.stringify(params);

	Http.request(Api.user_profile, "PUT", "json", loginInfoStr)
		.then(res => {
			if (Validate.isJson(res) && Validate.isEmply(res.msg)) {
				callBack.success(res);
			} else {
				callBack.fail();
			}
		})
		.catch(error => {
			console.log('error', error);
			callBack.fail(error);
		});
};

// 提交企业入驻申请

const tenantapplyInsert = (params, callBack) => {
	if (!that.globalData.isNetConnected) {
		uni.showToast({
			title: Constant.networkError,
			icon: 'none',
			duration: 2500
		});
		return;
	}

	let paramsStr = JSON.stringify(params);

	Http.request(Api.tenantapply_insert, "POST", "json", paramsStr)
		.then(res => {
			if (Validate.isJson(res) && res.code === 200) {
				callBack.success(res);
			} else {
				callBack.fail(res.msg);
			}
		})
		.catch(error => {
			console.log('error', error);
			callBack.fail(error);
		});
};

// 提交企业入驻申请

const tenantapplyCurrent = (params, callBack) => {
	if (!that.globalData.isNetConnected) {
		uni.showToast({
			title: Constant.networkError,
			icon: 'none',
			duration: 2500
		});
		return;
	}

	let paramsStr = JSON.stringify(params);

	Http.request(Api.tenantapply_current, "POST", "json", paramsStr)
		.then(res => {
			if (Validate.isJson(res) && res.code === 200) {
				callBack.success(res);
			} else {
				callBack.fail(res.msg);
			}
		})
		.catch(error => {
			console.log('error', error);
			callBack.fail(error);
		});
};

/**
 * 获取企业信息
 */
const getTenantapplyInfo = (callBack) => {

	if (!Validate.checkTokenAndValidity()) {
		uni.hideLoading();
		return;
	}

	Http.request(Api.get_tenantapply_info, "GET", null, null)
		.then(res => {
			if (Validate.isJson(res) && res.code === 200) {
				callBack.success(res);
			} else {
				callBack.fail(res);
			}
		})
		.catch(error => {
			callBack.fail(error);
		});
}

// 用户反馈

const clientFeedback = (params, callBack) => {
	if (!that.globalData.isNetConnected) {
		uni.showToast({
			title: Constant.networkError,
			icon: 'none',
			duration: 2500
		});
		return;
	}

	let paramsStr = JSON.stringify(params);

	Http.request(Api.client_feedback, "POST", "json", paramsStr)
		.then(res => {
			if (Validate.isJson(res) && res.code === 200) {
				callBack.success(res);
			} else {
				callBack.fail(res.msg);
			}
		})
		.catch(error => {
			console.log('error', error);
			callBack.fail(error);
		});
};

/**
 * 获取我提交的询盘列表
 */
const getClientInquiry = (params, callBack) => {

	if (!Validate.checkTokenAndValidity()) {
		uni.hideLoading();
		return;
	}

	Http.request(Api.get_client_inquiry, "GET", null, params)
		.then(res => {
			if (Validate.isJson(res) && res.code === 200) {
				callBack.success(res);
			} else {
				callBack.fail(res);
			}
		})
		.catch(error => {
			callBack.fail(error);
		});
}

/**
 * 获取我提交的询盘详情
 */
const getClientInquiryDetails = (id, callBack) => {
	if (!Validate.checkTokenAndValidity()) {
		uni.hideLoading();
		return;
	}
	Http.request(`${Api.get_client_inquiry_details}${id}`, "GET", null, null)
		.then(res => {
			if (Validate.isJson(res) && res.code === 200) {
				callBack.success(res);
			} else {
				callBack.fail(res);
			}
		})
		.catch(error => {
			callBack.fail(error);
		});
}

/**
 * 获取平台支持国家列表
 */
const getClientCountry = (callBack) => {

	if (!Validate.checkTokenAndValidity()) {
		uni.hideLoading();
		return;
	}

	Http.request(Api.get_client_country, "GET", null, null)
		.then(res => {
			if (uni.$u.test.array(res.data) && Validate.isJson(res)) {
				callBack.success(res);
			} else {
				callBack.fail(res);
			}
		})
		.catch(error => {
			callBack.fail(error);
		});
}

/**
 * 获取我开通店铺状态
 */
const getStoreStatus = (callBack) => {

	if (!Validate.checkTokenAndValidity()) {
		uni.hideLoading();
		return;
	}

	Http.request(Api.get_store_status, "GET", null, null)
		.then(res => {
			if ( Validate.isJson(res)) {
				callBack.success(res);
			} else {
				callBack.fail(res);
			}
		})
		.catch(error => {
			callBack.fail(error);
		});
}

/**
 * 【用户端】提交开店申请
 */
const storeAdd = (callBack) => {

	if (!Validate.checkTokenAndValidity()) {
		uni.hideLoading();
		return;
	}

	Http.request(Api.store_add, "POST", null, null)
		.then(res => {
			if (Validate.isJson(res)) {
				callBack.success(res);
			} else {
				callBack.fail(res);
			}
		})
		.catch(error => {
			callBack.fail(error);
		});
}



module.exports = {
	init,
	userProfileAvatar,
	userProfile,
	tenantapplyInsert,
	tenantapplyCurrent,
	getTenantapplyInfo,
	clientFeedback,
	getClientInquiry,
	getClientInquiryDetails,
	getClientCountry,
	getStoreStatus,
	storeAdd
}