<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <view class="custom-navbar">
      <view class="navbar-left" @tap="goBack">
        <u-icon name="arrow-left" color="#333" size="20"></u-icon>
      </view>
      <view class="navbar-title">企业信息</view>
      <view class="navbar-right"></view>
    </view>

    <!-- 企业信息表单 -->
    <view class="info-form">
      <view class="form-item">
        <text class="label">企业名称</text>
        <text class="value">{{ enterprise.name }}</text>
      </view>

      <view class="form-item">
        <text class="label">企业角色</text>
        <text class="value">{{ enterprise.role }}</text>
      </view>

      <view class="form-item">
        <text class="label">企业code</text>
        <text class="value">{{ enterprise.code }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const enterprise = ref({})
// 企业信息数据
const companyInfo = ref({
  name: '赤道科技有限公司',
  nickname: '赤道科技',
  email: 'contact@chidao.com',
  wechat: 'ChidaoTech',
})

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 处理编辑
onMounted(() => {
  enterprise.value = uni.getStorageSync('enterprise')
})
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 88rpx 20rpx 0;
  border-radius: 40rpx;
}

.custom-navbar {
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  height: 88rpx;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  z-index: 100;

  .navbar-left {
    width: 80rpx;
  }

  .navbar-title {
    flex: 1;
    text-align: center;
    font-size: 32rpx;
    font-weight: 500;
  }

  .navbar-right {
    width: 80rpx;
  }
}

.info-form {
  border-radius: 40rpx;
  margin-top: 20rpx;
  background: #fff;
  padding: 0 30rpx;

  .form-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 100rpx;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }

    .label {
      color: #333;
      font-size: 28rpx;
    }

    .value {
      color: #666;
      font-size: 28rpx;
    }
  }
}

.button-group {
  margin: 60rpx 30rpx;
}
</style>
