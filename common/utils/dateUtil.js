/**
 * 格式化：yy-mm-dd hh:mm:ss
 */
const formatTime = date => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

/**
 * 格式化：yy/mm/dd hh:mm:ss
 * 
 * 兼容 ios
 */
const formatTime2 = date => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

// 获取年
const getYear = date => {
  let year = date.getFullYear();
  return year;
};

// 获取月
const getMonth = date => {
  let month = date.getMonth() + 1;
  return month;
};

// 获取日
const getDay = date => {
  let day = date.getDate();
  return day;
};

// 格式化 yy/mm
const formatYYMM = date => {
  if (date === -1) {
    return "";
  }

  let year = date.getFullYear();
  let month = date.getMonth() + 1;

  return [year, month].map(formatNumber).join('/');
};

/**
 * 格式化：yy/mm/dd
 */
const formatYYMMDD = date => {
  if (date === -1) {
    return "";
  }

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return [year, month, day].map(formatNumber).join('/');
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

/**
 * 根据时间戳转化成标准时间
 */
const formatTimestamp = (timestamp) => {
  return new Date(timestamp);
};

/**
 * 获取时间戳
 * 
 * @param {*} dataStr 
 */
const getTimestamp = (dataStr) => {
  if (dataStr === null || dataStr === "" || dataStr === undefined) {
    return 0;
  }

  return new Date(dataStr).getTime();
};

/**
 * 格式化成标准时间
 */
const formatUTC = (t) => {
  if (t === null || t === "" || t === undefined) {
    return -1
  }

  if (t.indexOf('T') != -1) {
    let y; //年份
    let h; //时间
    let regH = /(T| )(\d\d:\d\d:\d\d)(\.\d+)?/; // 校验时间格式
    h = t.match(regH);
    h = h && h[2]; //拿到时分秒
    y = t.slice(0, t.indexOf('T') + 1).replace(/\-/g, '/'); //截取年月日
    let timestamp = new Date(Date.parse(y.slice(0, -1) + ' ' + h)).getTime() / 1000;
    let off = new Date().getTimezoneOffset() / 60; //当前时差
    timestamp -= off * 60 * 60;
    return new Date(parseInt(timestamp) * 1000);
  }
  return new Date(t.replace(/\-/g, '/'));
};

/**
 * 北京时间转世界标准时间
 */
const dateStr2UTC = (dateStr) => {
  if (dateStr === null || dateStr === "" || dateStr === undefined) {
    return 0;
  }

  let date = new Date(dateStr);
  return date.toISOString();
};

/**
 * 计算年龄
 * 
 * 参数：birthDay 出生日期（格式：1930-10）
 */
const calculateAge = (birthDay) => {
  let age = 0;

  let currentDate = new Date();
  let nowYear = currentDate.getFullYear();
  let nowMonth = currentDate.getMonth() + 1;

  let birthdayArr = birthDay.split("/");
  let birthYear = birthdayArr[0];
  let birthMonth = birthdayArr[1];

  if (nowYear == birthYear) {
    // 同年 则为0岁
    age = 0;
  } else {
    //年之差
    let ageDiff = nowYear - birthYear;
    if (ageDiff > 0) {
      if (nowMonth != birthMonth) {
        //月之差
        let monthDiff = nowMonth - birthMonth;
        if (monthDiff < 0) {
          age = ageDiff - 1;
        } else {
          age = ageDiff;
        }
      } else {
        age = ageDiff;
      }
    } else {
      age = -1; //返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return age;
};

/**
 * 格式化原有的时间，为指定的时间格式 YYYY/MM/DD HH:MM:SS
 * @param {*} str 
 * @param {*} format 
 */
const formatDateStr = (str) => {
  if (typeof str !== "string" || str == null || str === undefined || str === "") {
    return '';
  }

  return new Date(str.replace(/-/g, '/'));
};

/**
 * 格式化原有的时间，为指定的时间格式 YYYY/MM/DD HH:MM:SS
 * @param {*} str 
 * @param {*} format 
 */
const replaceDateStr = (str) => {
  if (typeof str !== "string" || str == null || str === undefined || str === "") {
    return '';
  }

  return str.replace(/\//g, '-');
};

/**
 * 分钟转小时
 * @param {*} minute 
 */
const minute2Hour = (minute) => {
  if (typeof minute !== "number" || isNaN(minute) || minute == null || minute === undefined || minute === "") {
    return 0;
  }

  return (minute / 60).toFixed(1);
};

/**
 * 小时转分钟
 * @param {*} hour
 */
const hour2Minute = (hour) => {
  if (typeof hour !== "number" || isNaN(hour) || hour == null || hour === undefined || hour === "") {
    return 0;
  }

  return hour * 60;
};

/**
 * 未来距离现在还剩下多少个小时
 * 
 * @param {*} time 
 */
const calculateTime = (dateStr) => {
  if (typeof dateStr !== "string" || dateStr == null || dateStr === undefined || dateStr === "") {
    return 0;
  }

  let nowTimestamp = new Date().getTime();
  let fromTimestamp = getTimestamp(dateStr);
  let distanceTimestamp = fromTimestamp - nowTimestamp;

  if (distanceTimestamp <= 0) {
    return 0;
  }

  let hour = (distanceTimestamp / 1000 / 60 / 60).toFixed(1);

  return hour;
};

/**
 * 过去距离现在有多少个小时
 * 
 * @param {*} time 
 */
const calculateTimeForElapse = (dateStr) => {
  if (typeof dateStr !== "string" || dateStr == null || dateStr === undefined || dateStr === "") {
    return 0;
  }

  let nowTimestamp = new Date().getTime();
  let fromTimestamp = getTimestamp(dateStr);
  let distanceTimestamp = nowTimestamp - fromTimestamp;
  if (distanceTimestamp <= 0) {
    return 0;
  }

  let hour = (distanceTimestamp / 1000 / 60 / 60).toFixed(1);

  return hour;
};

module.exports = {
  formatTime,
  formatUTC,
  formatYYMM,
  formatYYMMDD,
  formatTimestamp,
  calculateAge,
  getYear,
  getMonth,
  getDay,
  minute2Hour,
  hour2Minute,
  formatTime2,
  formatDateStr,
  replaceDateStr,
  getTimestamp,
  dateStr2UTC,
  calculateTime,
  calculateTimeForElapse
}