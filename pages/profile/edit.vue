<template>
  <view class="container">
    <view class="form-section">
      <!-- 头像 -->
      <view class="avatar-item">
        <text class="label">头像</text>
        <view class="avatar-wrapper" @tap="chooseAvatar">
          <image class="avatar" :src="formData.avatar" mode="aspectFill" />
          <text class="tip">点击更换头像</text>
        </view>
      </view>

      <!-- 基本信息 -->
      <view class="form-item">
        <text class="label">姓名</text>
        <input v-model="formData.name" placeholder="请输入姓名" class="input" />
      </view>

      <view class="form-item">
        <text class="label">公司</text>
        <input v-model="formData.company" placeholder="请输入公司名称" class="input" />
      </view>

      <view class="form-item">
        <text class="label">职位</text>
        <input v-model="formData.position" placeholder="请输入职位" class="input" />
      </view>

      <view class="form-item">
        <text class="label">手机号</text>
        <input v-model="formData.phone" type="number" placeholder="请输入手机号" class="input" />
      </view>

      <view class="form-item">
        <text class="label">邮箱</text>
        <input v-model="formData.email" type="text" placeholder="请输入邮箱" class="input" />
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="bottom-bar">
      <button class="submit-btn" @tap="handleSubmit">保存</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 表单数据
const formData = ref({
  avatar: '/static/avatar.png',
  name: '张三',
  company: '某某物流有限公司',
  position: '经理',
  phone: '13800138000',
  email: 'zhangsan@example.com',
});

// 选择头像
const chooseAvatar = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      formData.value.avatar = res.tempFilePaths[0];
    },
  });
};

// 提交表单
const handleSubmit = () => {
  // 表单验证
  if (!formData.value.name) {
    uni.showToast({
      title: '请输入姓名',
      icon: 'none',
    });
    return;
  }
  if (!formData.value.phone) {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none',
    });
    return;
  }

  // TODO: 调用保存API
  uni.showLoading({
    title: '保存中',
  });

  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title: '保存成功',
      icon: 'success',
    });
    // 返回上一页
    uni.navigateBack();
  }, 1000);
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
  padding-bottom: 120rpx;
}

.form-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 0 20rpx;
}

.avatar-item {
  display: flex;
  align-items: flex-start;
  padding: 30rpx 0;
  border-bottom: 1px solid #f5f5f5;

  .label {
    width: 160rpx;
    font-size: 28rpx;
    color: #333;
    padding-top: 20rpx;
  }

  .avatar-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    .avatar {
      width: 160rpx;
      height: 160rpx;
      border-radius: 80rpx;
      margin-bottom: 10rpx;
    }

    .tip {
      font-size: 24rpx;
      color: #666;
    }
  }
}

.form-item {
  display: flex;
  align-items: center;
  min-height: 88rpx;
  border-bottom: 1px solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }

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
}

.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20rpx;
  background: #fff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);

  .submit-btn {
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
    background: #007aff;
    color: #fff;
    border-radius: 44rpx;
    font-size: 32rpx;
  }
}
</style>
