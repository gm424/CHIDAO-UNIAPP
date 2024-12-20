import Http from './http.js';
import Api from './api.js';
import Validate from '../utils/validate';
import Constant from '../utils/constant';

/**
 * 获取分类列表
 */
const getFindClientCategory = (type, catId, callBack) => {
	
	if (!Validate.checkTokenAndValidity()) {
			uni.hideLoading();
			return;
		}

	Http.request(`${Api.get_find_client_category}${type}`, "GET", null, null)
		.then(res => {
			if (!Validate.isEmply(res.data) && Validate.isJson(res)) {
				callBack.success(res);
			} else {
				callBack.fail();
			}
		})
		.catch(error => {
			callBack.fail(error);
		});
}

/**
 * 获取对象互动详情
 */
const getClientInteractionInfo = (objId, callBack) => {
	
	if (!Validate.checkTokenAndValidity()) {
			uni.hideLoading();
			return;
		}

	Http.request(`${Api.get_client_interaction_info}?obj_id=${objId}`, "GET", null, null)
		.then(res => {
			if( res.code === 200 && !uni.$u.test.isEmpty(res.data) ) {
				callBack.success(res);
			} else {
				callBack.fail();
			}
		})
		.catch(error => {
			callBack.fail(error);
		});
}


/**
 * 用户点赞
 */
const postClientInteractionLike = (objId, method, callBack) => {
	if (!Validate.checkTokenAndValidity()) {
		uni.hideLoading();
		return;
	}

	Http.request(`${Api.post_client_interaction_like}?obj_id=${objId}`, method, "json", '')
		.then(res => {
			if (res.code === 200) {
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
 * 用户转发
 */
const postClientInteractionRetweet = (objId, callBack) => {
	if (!Validate.checkTokenAndValidity()) {
		uni.hideLoading();
		return;
	}

	Http.request(`${Api.post_client_interaction_retweet}?obj_id=${objId}`, 'POST', "json", '')
		.then(res => {
			if (res.code === 200) {
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
	getFindClientCategory,
	getClientInteractionInfo,
	postClientInteractionLike,
	postClientInteractionRetweet
}
