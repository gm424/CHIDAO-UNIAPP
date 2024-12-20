<template>
  <view class="container">
    <view class="content">
      <view class="title">用户协议</view>
      <view class="section">
        <view class="section-title">1. 服务内容</view>
        <view class="paragraph">
          1.1 本平台为用户提供供应链服务，包括但不限于物流运输、仓储管理、订单跟踪等服务。
        </view>
        <view class="paragraph"> 1.2 用户在使用本平台服务时，须遵守中华人民共和国相关法律法规及本协议的约定。 </view>
      </view>

      <view class="section">
        <view class="section-title">2. 用户注册</view>
        <view class="paragraph">
          2.1 用户注册时应当提供真实、准确、完整的信息，并保证这些信息的真实性、准确性和完整性。
        </view>
        <view class="paragraph"> 2.2 用户应妥善保管账号和密码，因账号和密码保管不善造成的损失由用户自行承担。 </view>
      </view>

      <view class="section">
        <view class="section-title">3. 服务费用</view>
        <view class="paragraph"> 3.1 用户使用本平台的部分服务需要支付相应的费用，具体收费标准以平台公示为准。 </view>
        <view class="paragraph"> 3.2 平台保留调整服务费用的权利，调整前将通过适当方式通知用户。 </view>
      </view>

      <view class="section">
        <view class="section-title">4. 用户责任</view>
        <view class="paragraph"> 4.1 用户应确保托运货物的合法性，不得托运国家禁止运输的物品。 </view>
        <view class="paragraph"> 4.2 用户应如实申报货物信息，因申报不实造成的损失由用户承担。 </view>
      </view>

      <view class="section">
        <view class="section-title">5. 平台责任</view>
        <view class="paragraph"> 5.1 平台承诺为用户提供安全、可靠的服务，但因不可抗力造成的损失除外。 </view>
        <view class="paragraph"> 5.2 平台将采取合理措施保护用户的个人信息和数据安全。 </view>
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
