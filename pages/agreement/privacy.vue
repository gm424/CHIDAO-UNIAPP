<template>
  <view class="container">
    <view class="content">
      <view class="title">隐私政策</view>
      <view class="section">
        <view class="section-title">1. 信息收集</view>
        <view class="paragraph"> 1.1 我们收集的信息包括但不限于：用户注册信息、设备信息、位置信息、操作日志等。 </view>
        <view class="paragraph"> 1.2 我们承诺只收集必要的信息，用于提供和改进我们的服务。 </view>
      </view>

      <view class="section">
        <view class="section-title">2. 信息使用</view>
        <view class="paragraph"> 2.1 我们使用收集的信息用于：提供服务、改进产品、发送通知、防止欺诈等。 </view>
        <view class="paragraph"> 2.2 未经用户同意，我们不会将用户信息用于其他目的。 </view>
      </view>

      <view class="section">
        <view class="section-title">3. 信息保护</view>
        <view class="paragraph"> 3.1 我们采用业界标准的安全技术和程序来保护用户的个人信息。 </view>
        <view class="paragraph"> 3.2 我们定期审查信息收集、存储和处理实践，以防止未经授权的访问。 </view>
      </view>

      <view class="section">
        <view class="section-title">4. 信息共享</view>
        <view class="paragraph"> 4.1 除法律法规规定或用户同意外，我们不会与第三方共享用户个人信息。 </view>
        <view class="paragraph"> 4.2 我们可能与合作伙伴共享必要的信息，以提供更好的服务。 </view>
      </view>

      <view class="section">
        <view class="section-title">5. 用户权利</view>
        <view class="paragraph"> 5.1 用户有权访问、更正或删除其个人信息。 </view>
        <view class="paragraph"> 5.2 用户可以选择是否接受某些可选信息的收集。 </view>
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

.title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 60rpx;
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
    margin-bottom: 20rpx;
    text-align: justify;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
