<template>
  <view class="container">
    <view class="form-section">
      <!-- 手机号 -->
      <view class="form-item">
        <text class="label">手机号</text>
        <input v-model="formData.phone" type="number" placeholder="请输入手机号" class="input" />
      </view>

      <!-- 验证码 -->
      <view class="form-item">
        <text class="label">验证码</text>
        <input v-model="formData.code" type="number" placeholder="请输入验证码" class="input" />
        <button class="code-btn" :disabled="counting > 0" @tap="sendCode">
          {{ counting > 0 ? `${counting}s后重新获取` : '获取验证码' }}
        </button>
      </view>

      <!-- 新密码 -->
      <view class="form-item">
        <text class="label">新密码</text>
        <input v-model="formData.password" type="password" placeholder="请输入新密码" class="input" />
      </view>

      <view class="form-item">
        <text class="label">确认密码</text>
        <input v-model="formData.confirmPassword" type="password" placeholder="请再次输入密码" class="input" />
      </view>
    </view>

    <!-- 提交按钮 -->
    <button class="submit-btn" @tap="handleSubmit">重置密码</button>

    <!-- 返回登录 -->
    <view class="back-link">
      <text class="link" @tap="goToLogin">返回登录</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';

// 表单数据
const formData = ref({
  phone: '',
  code: '',
  password: '',
  confirmPassword: '',
});

// 验证码倒计时
const counting = ref(0);
let timer = null;

// 发送验证码
const sendCode = () => {
  if (counting.value > 0) return;
  if (!formData.value.phone) {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none',
    });
    return;
  }

  // TODO: 调用发送验证码API
  counting.value = 60;
  timer = setInterval(() => {
    if (counting.value > 0) {
      counting.value--;
    } else {
      clearInterval(timer);
    }
  }, 1000);
};

// 提交表单
const handleSubmit = () => {
  // 表单验证
  if (!formData.value.phone) {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none',
    });
    return;
  }
  if (!formData.value.code) {
    uni.showToast({
      title: '请输入验证码',
      icon: 'none',
    });
    return;
  }
  if (!formData.value.password) {
    uni.showToast({
      title: '请输入新密码',
      icon: 'none',
    });
    return;
  }
  if (formData.value.password !== formData.value.confirmPassword) {
    uni.showToast({
      title: '两次输入的密码不一致',
      icon: 'none',
    });
    return;
  }

  // TODO: 调用重置密码API
  uni.showLoading({
    title: '提交中',
  });

  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title: '密码重置成功',
      icon: 'success',
    });
    // 返回登录页
    uni.navigateBack();
  }, 1500);
};

// 返回登录
const goToLogin = () => {
  uni.navigateBack();
};

// 页面卸载时清除定时器
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style lang="scss" scoped>
.container {
  padding: 40rpx;
}

.form-section {
  margin-bottom: 60rpx;
}

.form-item {
  display: flex;
  align-items: center;
  min-height: 88rpx;
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 30rpx;

  .label {
    width: 160rpx;
    font-size: 28rpx;
    color: #333;
  }

  .input {
    flex: 1;
    height: 88rpx;
    font-size: 28rpx;
  }

  .code-btn {
    width: 200rpx;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 24rpx;
    color: #007aff;
    background: #f5f5f5;
    border-radius: 30rpx;
    padding: 0;
    margin-left: 20rpx;

    &[disabled] {
      color: #999;
    }
  }
}

.submit-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background: #007aff;
  color: #fff;
  border-radius: 44rpx;
  font-size: 32rpx;
  margin-bottom: 30rpx;
}

.back-link {
  text-align: center;
  font-size: 28rpx;

  .link {
    color: #007aff;
  }
}
</style>
