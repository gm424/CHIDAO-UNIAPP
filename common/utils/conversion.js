// 转换工具


/**
 * 货币(分转元)
 */
const feng2Yuan = (feng) => {
	if (feng == null || feng === undefined || feng === "") {
		return 0;
	}

	let number = Number.parseFloat(feng);

	if (typeof number !== "number" || isNaN(number)) {
		return 0;
	}

	return (number / 100);
};

/**
 * 货币(元转分)
 */
const yuan2Feng = (yuan) => {
	if (typeof yuan !== "number" || isNaN(yuan) || yuan == null || yuan === undefined || yuan === "") {
		return 0;
	}

	return (yuan * 100);
};

/**
 * 限制字数,在最后加上 ...
 * @param {*} limitLen 限制字数的长度
 */
const limitTextLength = (limitLen, content) => {
	if (content == null || content == undefined || content === "") {
		return "";
	}

	if (limitLen >= content.length) {
		return content;
	} else {
		let contentNew = content.substr(0, limitLen) + "...";
		return contentNew;
	}
};

/**
 * 限制字数,在最后加上自定义后缀
 * @param {*} limitLen 限制字数的长度
 */
const limitTextLengthForSuffix = (limitLen, content, suffix) => {
	if (content == null || content == undefined || content === "") {
		return "";
	}

	if (limitLen >= content.length) {
		return content;
	} else {
		let contentNew = content.substr(0, limitLen) + suffix;
		return contentNew;
	}
};

/**
 * 百分比转换成数字
 */
const percent2Int = (percent) => {
	if (percent == null || percent == undefined || percent === "") {
		return 0;
	}

	return parseInt(percent) * 100;
};

/**
 * 数字转换成百分比
 */
const int2Percent = (number) => {
	if (typeof number !== "number" || isNaN(number) || number == null || number === undefined || number === "") {
		return 0;
	}

	return number / 100;
};

/**
 * 去除 HTML 标签
 * 
 * @param {*} str 
 */
const clearHtmlTag = (str) => {
	if (str === null || str === undefined || str === "") {
		return '';
	}

	let msg = escape2Html(str).replace(/<[^>]+>|&[^>]+;/g, '').trim();

	return msg;
};

/**
 * 反转义 HTML
 * 
 * @param {*} str 
 */
const escape2Html = (str) => {
	if (str === null || str === undefined || str === "") {
		return '';
	}

	let arrEntities = {
		'lt': '<',
		'gt': '>',
		'nbsp': ' ',
		'amp': '&',
		'quot': '"'
	};
	return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(str, t) {
		return arrEntities[t];
	});
};

/**
 * pt 转 px
 * @param {*} pt 
 */
const pt2Px = (pt) => {
	if (pt === null || pt === undefined || pt === "") {
		return 0;
	}

	let ptNum = Number.parseFloat(pt);

	return (ptNum * 2).toFixed(2);
};

/**
 * px 转 rpx
 * (以 iphone 6 为标准)
 * @param {*} px
 */
const px2Rpx = (px) => {
	if (px === null || px === undefined || px === "") {
		return 0;
	}

	let pxNum = Number.parseFloat(px);

	return (pxNum * 2).toFixed(2);
};

/**
 * rpx 转 px
 * (以 iphone 6 为标准)
 * @param {*} rpx
 */
const rpx2Px = (rpx) => {
	if (rpx === null || rpx === undefined || rpx === "") {
		return 0;
	}

	let rpxNum = Number.parseFloat(rpx);

	return rpxNum / 2;
};

/**
 * 隐藏手机号码中间四位
 */
const formatPhoneNumber = (num) => {
	if (num === null || num === undefined || num === "") {
		return '';
	}

	if (num.length < 11) {
		return '';
	}

	let numStr = String(num);

	let numBefore = numStr.substring(0, 3);
	let numAfter = numStr.substring(7, numStr.length);
	let placeHoder = "****";

	return numBefore + placeHoder + numAfter;
};

/**
 * 格式化隐藏后面几位
 */
const formatString = (str) => {
	if (str === null || str === undefined || str === "") {
		return '';
	}

	let strBefore = '';
	let strAfter = '';
	let strStr = String(str);

	if (strStr.length == 2) {
		strBefore = strStr.substring(0, 1);
		return strBefore + '*';
	}

	if (strStr.length > 2) {
		strBefore = strStr.substring(0, 2);
		strafter = strStr.substring(2, strStr.length);
		strStr = strafter.split('').map((value, index) => {
			return '*';
		});
		return strBefore + strStr.join('').toString();
	}

	return strStr;
};



/**  返回两个时间戳的间隔
 * @return 'd-h-m'
 */
const interval = (stime, etime) => {
	let usedTime = etime - stime //两个时间戳相差的毫秒数
	let days = Math.floor(usedTime / (24 * 3600 * 1000))
	//计算出小时数
	let leave1 = usedTime % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
	let hours = Math.floor(leave1 / (3600 * 1000))
	//计算相差分钟数
	let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
	let minutes = Math.floor(leave2 / (60 * 1000))
	let time = `${days}天 ${hours}时 ${minutes}分`
	return time
};


/** 将毫秒转换成 hh:mm:ss 
* @param {seconds} 时间戳
* @return 'hh:mm:ss'  小于10的会以 01 的格式显示  
*/
const timeFilterHourMinSeconds = (seconds) => {
 // console.log('s::', seconds)

	// console.log("res is --",seconds)
	
	let res = seconds / 1000 
	let hh = parseInt(res / 60 / 60); //时
	let mm = parseInt(res / 60 % 60); //分
	let ss = parseInt(res % 60); //秒
	
	if(ss<0) ss = 0
	if(mm<0) mm = 0
	if(hh<0) hh = 0
	
	ss = ss < 10 ? `0${ss}` : ss
	mm = mm < 10 ? `0${mm}` : mm
	hh = hh < 10 ? `0${hh}` : hh
	
	let result = `${hh}:${mm}:${ss}`
	return result
}

module.exports = {
	feng2Yuan,
	yuan2Feng,
	limitTextLength,
	limitTextLengthForSuffix,
	percent2Int,
	int2Percent,
	clearHtmlTag,
	escape2Html,
	pt2Px,
	px2Rpx,
	rpx2Px,
	formatPhoneNumber,
	formatString,
	interval,
	timeFilterHourMinSeconds
};
