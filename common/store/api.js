import { DEVELOP_HOST, PRODUCT_HOST, isDevelopModel } from '@/config/index.js';

/**
 * 资源站(小程序图标等用到的 host)
 *
 * 正式：
 */
// const source_host = IMG_URL;

// API 使用
const API_HOST = isDevelopModel ? DEVELOP_HOST : PRODUCT_HOST;
const API_HOST_TRACK = isDevelopModel ? 'http://47.119.132.63:8091' : 'http://erp.api.jiwangyun.com';

const Api = {
  // 是否启用debug
  isDebug: isDevelopModel,

  //-------------------------------------------------------- 登录模块 -----------------------------------------------------------------

  /*刷新Token */
  get_user_refreshToken: API_HOST + '/api/token/refresh',

  /**
   * 账号密码登录
   *
   * Method: GET
   *
   */
  // get_auth_login: API_HOST + '/auth/login',
  get_auth_login: API_HOST + '/api/member/login',
  /**
   * 用户邮箱手机号注册
   *
   * Method: POST
   */
  // user_register: API_HOST + '/system/user/register',
  user_register: API_HOST + '/api/member/register',

  /**
   * 用户退出登录
   *
   * Method: POST
   */
  // user_register: API_HOST + '/system/user/register',
  user_logout: API_HOST + '/api/member/logout',
  /**
   * 下发邮件短信验证码
   *
   * Method: POST
   */
  // sms_code: API_HOST + '/system/sms/code',
  sms_code: API_HOST + '/api/verify/sendEmail',
  /**
   * 找回密码
   *
   * Method: PUT
   */
  resetPwd: API_HOST + '/system/user/profile/resetPwd',

  //-------------------------------------------------------- 用户信息 -----------------------------------------------------------------

  /**
   * 获取用户信息
   *
   * Method: GET
   */
  // get_user_profile: API_HOST + '/system/user/profile',
  get_user_profile: API_HOST + '/api/member/info',

  //-------------------------------------------------------- 首页模块 -----------------------------------------------------------------

  /**
   * 获取内容列表
   *
   * Method: GET
   */
  get_home_content: API_HOST + '/system/client/content/',

  /**
   * 获取热卖推荐商品列表
   *
   * Method: GET
   */
  get_marketing_recommend: API_HOST + '/gs/client/marketing/recommend',

  /**
   * 获取内容列表
   *
   * Method: GET
   */
  get_store_list: API_HOST + '/system/client/store/getList',

  /**
   * 提交询盘问价
   *
   * Method: POST
   */
  client_inquiry: API_HOST + '/gs/client/inquiry',

  /**
   * 获取分类列表
   *
   * Method: GET
   */
  // get_client_category: API_HOST + '/gs/client/category',
  get_client_category: API_HOST + '/api/category/list',
  /**
   * 获取特价商品列表
   *
   * Method: GET
   */
  get_client_marketing_special: API_HOST + '/gs/client/marketing/special',

  /**
   * 获取商品列表
   *
   * Method: GET
   */
  // get_client_goods: API_HOST + '/gs/client/goods/',
  get_client_goods: API_HOST + '/api/products/list',

  /**
   * 获取商品详情
   *
   * Method: GET
   */
  get_client_goodsDetail: API_HOST + '/api/products/detail',
  /**
   * 新增我的收藏
   *
   * Method: POST
   */
  user_collection: API_HOST + '/api/products/{id}/collect',

  /**
   * 获取我的收藏列表
   *
   * Method: POST
   */
  get_user_collection: API_HOST + '/api/products/collections',
  /**
   * 删除我的收藏（根据收藏对象）
   *
   * Method: POST
   */
  user_collection_del: API_HOST + '/api/products/{id}/collect',
  /**
   * 获取购物车列表
   *
   * Method: GET
   */
  user_cartList: API_HOST + '/iscms/sku/queryByJsin',

  /**
   * 获取店铺列表
   *
   * Method: POST
   */
  store_list: API_HOST + '/system/client/store/getList',

  /**
   * 获取店铺详情
   *
   * Method: GET
   */
  get_store_info: API_HOST + '/system/client/store/get/StoreInfo',

  /**
   * 获取指定店铺下分类列表
   *
   * Method: GET
   */
  // get_store_category: API_HOST + '/gs/client/category/',
  get_store_category: API_HOST + '/api/category/list',

  /**
   * 获取行业信息
   *
   * Method: GET
   */
  get_client_industry: API_HOST + '/system/client/industry',

  //-------------------------------------------------------- 我的模块 -----------------------------------------------------------------

  /**
   * 用户头像上传
   *
   * Method: GET
   */
  user_profile_avatar: API_HOST + '/system/user/profile/avatar',

  /**
   * 修改用户信息
   *
   * Method: PUT
   */
  user_profile: API_HOST + '/system/user/profile',

  /**
   * 提交企业入驻申请
   *
   * Method: POST
   */
  tenantapply_insert: API_HOST + '/system/client/tenantapply/insert',

  /**
   * 提交企业入驻申请修改
   *
   * Method: POST
   */
  tenantapply_current: API_HOST + '/system/client/tenantapply/current',

  /**
   * 用户反馈
   *
   * Method: POST
   */
  client_feedback: API_HOST + '/system/client/feedback',

  /**
   * 获取企业信息
   *
   * Method: GET
   */
  get_tenantapply_info: API_HOST + '/system/client/tenantapply/getInfo',

  /**
   * 获取我提交的询盘列表
   *
   * Method: GET
   */
  get_client_inquiry: API_HOST + '/gs/client/inquiry',

  /**
   * 获取我的询盘详情
   *
   * Method: GET
   */
  get_client_inquiry_details: API_HOST + '/gs/client/inquiry/',

  /**
   * 获取我开通店铺状态
   *
   * Method: GET
   */
  get_store_status: API_HOST + '/system/client/store/getStoreStatus',

  /**
   * 提交开店申请
   *
   * Method: POST
   */
  store_add: API_HOST + '/system/client/store/add',

  /**
   * 获取平台支持国家列表
   *
   * Method: GET
   */
  get_client_country: API_HOST + '/system/client/country',

  //-------------------------------------------------------- 发现模块 -----------------------------------------------------------------

  /**
   * 获取话题分类
   *
   * Method: GET
   */
  get_find_client_category: API_HOST + '/system/client/category/',

  /**
   * 获取对象互动详情
   *
   * Method: GET
   */
  get_client_interaction_info: API_HOST + '/system/client/interaction/info',

  /**
   * 用户点赞
   *
   * Method: POST
   */
  post_client_interaction_like: API_HOST + '/system/client/interaction/like',

  /**
   * 用户转发
   *
   * Method: POST
   */
  post_client_interaction_retweet: API_HOST + '/system/client/interaction/retweet',

  //-------------------------------------------------------- 通知模块 -----------------------------------------------------------------

  /**
   * 获取最新一条询盘通知
   *
   * Method: GET
   */
  get_notices_last: API_HOST + '/gs/client/inquiry/notices/last',

  /**
   * 获取询盘通知（标记已读）
   *
   * Method: GET
   */
  get_notices_id: API_HOST + '/gs/client/inquiry/notices',

  /**
   * 获取询盘通知列表
   *
   * Method: GET
   */
  get_inquiry_notices: API_HOST + '/gs/client/inquiry/notices',

  //-------------------------------------------------------- 我的订单模块 -----------------------------------------------------------------

  /**
   * 获取我的子订单列表
   *
   * Method: GET
   */
  get_my_orderList: API_HOST + '/api/orders',

  get_my_orderDetails: API_HOST + '/api/orders/',

  /**
   * 获取我的主订单列表
   *
   * Method: GET
   */
  get_my_mainOrderList: API_HOST + '/api/mainOrder',

  get_my_mainOrderDetails: API_HOST + '/api/mainOrder/',

  /**
   * 立即下单
   *
   * Method: POST
   */
  post_my_order: API_HOST + '/api/mainOrder/order',

  /**
   * 线下支付
   *
   * Method: POST
   */
  post_offLinePayment_order: API_HOST + '/api/payment/{orderSn}/offlinePayment',
  /**
   * 线上支付
   *
   * Method: POST
   */

  post_pay_order: API_HOST + '/api/payment/{order_sn}/pay',
  /**
   * 确认收货
   *
   * Method: POST
   */
  post_complete_order: API_HOST + '/api/admin/orders/{id}/complete',

  /**
   * 获取我的积分流水列表
   *
   * Method: GET
   */

  get_my_rewardsList: API_HOST + '/api/rewards/records',

  /**
   * 查询物流轨迹
   *
   * Method: GET
   */

  get_order_tracking: API_HOST_TRACK + '/generic/expressRouter/getRouteInfoByTrackingNo',

  /**
   * 获取支付的参数model
   *
   * Method: GET
   */

  get_payment_constants: API_HOST + '/api/payment/constants',
  /**
   * 获取我的积分
   *
   * Method: GET
   */
  get_my_points: API_HOST + '/api/rewards',
  /**
   * 获取我的积分商城商品列表
   *
   * Method: GET
   */
  get_points_mall: API_HOST + '/api/products/rewards/list',
  /**
   * 获取我的oss
   *
   * Method: GET
   */
  get_oss_signature: API_HOST + '/api/sys/upload/signature',

  /**
   * 获取物流轨迹
   *
   * Method: GET
   */

  get_logistics_tracking: 'https://erp.api.jiwangyun.com/tms/tracking/getTracking',
};

export default Api;
