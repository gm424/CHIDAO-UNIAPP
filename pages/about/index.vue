<template>
  <view class="container">
    <view class="content">
      <view class="logo">
        <image src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/logo2_1721897398716.png" mode="aspectFit" />
      </view>
      <view class="app-info">
        <text class="name">赤道数智链</text>
        <text class="version">版本 1.0.0</text>
      </view>

      <view class="section">
        <view class="section-title">公司介绍</view>
        <view class="paragraph">
          我们是一家专注于供应链服务的科技公司，致力于为客户提供高效、便捷的物流运输解决方案。
        </view>
      </view>

      <view class="section">
        <view class="section-title">联系我们</view>
        <view class="contact-list">
          <view class="contact-item">
            <text class="label">电话：</text>
            <text class="value">0755-83207990</text>
          </view>
          <!-- <view class="contact-item">
            <text class="label">邮箱：</text>
            <text class="value">support@example.com</text>
          </view> -->
          <view class="contact-item">
            <text class="label">地址：</text>
            <text class="value">公司地址:深圳市龙华区民治街道民乐社区星河WORLD二期C栋1708</text>
          </view>
        </view>
      </view>
      <view class="section">
        <view class="section-title">隐私政策</view>
        <view class="paragraph">https://privacy.1ts.fun/product/<br />241229UZGvYt6IBzClHU</view>
      </view>
      <view class="copyright">
        <text>Copyright © 2024 All Rights Reserved</text>
      </view>
    </view>
  </view>
</template>

<script setup>
// 无需特殊逻辑
</script>

<style lang="scss" scoped>
.container {
  padding: 40rpx;
}

.content {
  background: #fff;
  border-radius: 16rpx;
  padding: 40rpx;
}

.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 30rpx;

  image {
    width: 160rpx;
    height: 160rpx;
  }
}

.app-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60rpx;

  .name {
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
  }

  .version {
    font-size: 24rpx;
    color: #666;
  }
}

.section {
  margin-bottom: 40rpx;

  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
  }

  .paragraph {
    font-size: 28rpx;
    color: #333;
    line-height: 1.6;
    text-align: justify;
  }
}

.contact-list {
  .contact-item {
    display: flex;
    margin-bottom: 20rpx;

    .label {
      width: 120rpx;
      font-size: 28rpx;
      color: #666;
    }

    .value {
      flex: 1;
      font-size: 28rpx;
      color: #333;
    }
  }
}

.copyright {
  text-align: center;
  font-size: 24rpx;
  color: #999;
  margin-top: 60rpx;
}
</style>
