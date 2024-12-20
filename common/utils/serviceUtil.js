const Validate = require('./validate.js');
const Constant = require('./constant.js');
const Api = require('../store/api.js');

/**
 * 在商品详情页中的商户客服
 */
const openServiceFromGoodsDetailContact = (goods) => {
  //判断登录授权后才向下执行
  // code...

  if (!Validate.checkTokenAndValidity()) {
    return;
  }

  // uni.setStorageSync('vkefuPage', {
  //   url: 'pages/index_module/product_detail?id=' + goods.offerId, //商品详情页?id=商品ID
  //   type: 'goods', //固定值 类型为goods
  //   id: goods.offerId, // 商品ID
  //   title: goods.offerName, //商品标题
  //   cover: goods.imgUrl, // 封面图片url完整地址
  //   amount: goods.salesPrice, // 商品价格,
  // });


  uni.setStorageSync('vkefuInit', {
    shop_id: goods.storeId, //店铺ID
    // shop_id: 0, //店铺ID
    type: "text",
    source_type: 2
  });

  uni.navigateTo({
    url: '/pages/service_module/customer_service/customer_service'
  });
}

module.exports = {
  openServiceFromGoodsDetailContact
}
