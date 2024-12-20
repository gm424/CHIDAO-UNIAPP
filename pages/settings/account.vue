<template>
  <view class="container">
    <!-- 账户安全 -->
    <view class="section">
      <view class="section-title">账户安全</view>
      <view class="menu-list">
        <view class="menu-item" @tap="modifyPassword">
          <view class="menu-left">
            <text class="iconfont icon-lock"></text>
            <text class="label">修改密码</text>
          </view>
          <text class="iconfont icon-arrow-right"></text>
        </view>
        <view class="menu-item" @tap="bindPhone">
          <view class="menu-left">
            <text class="iconfont icon-phone"></text>
            <text class="label">手机绑定</text>
          </view>
          <view class="menu-right">
            <text class="value">{{ userInfo.phone }}</text>
            <text class="iconfont icon-arrow-right"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 通知设置 -->
    <view class="section">
      <view class="section-title">通知设置</view>
      <view class="menu-list">
        <view class="menu-item">
          <view class="menu-left">
            <text class="iconfont icon-notification"></text>
            <text class="label">订单通知</text>
          </view>
          <switch :checked="settings.orderNotify" @change="toggleOrderNotify" color="#007aff" />
        </view>
        <view class="menu-item">
          <view class="menu-left">
            <text class="iconfont icon-message"></text>
            <text class="label">消息推送</text>
          </view>
          <switch :checked="settings.messagePush" @change="toggleMessagePush" color="#007aff" />
        </view>
      </view>
    </view>

    <!-- 其他设置 -->
    <view class="section">
      <view class="section-title">其他设置</view>
      <view class="menu-list">
        <view class="menu-item" @tap="clearCache">
          <view class="menu-left">
            <text class="iconfont icon-clear"></text>
            <text class="label">清除缓存</text>
          </view>
          <text class="value">{{ cacheSize }}</text>
        </view>
        <view class="menu-item">
          <view class="menu-left">
            <text class="iconfont icon-version"></text>
            <text class="label">当前版本</text>
          </view>
          <text class="value">{{ version }}</text>
        </view>
      </view>
    </view>

    <!-- ���出登录 -->
    <view class="logout-btn" @tap="handleLogout">退出登录</view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 用户信息
const userInfo = ref({
  phone: '138****8000',
});

// 设置项
const settings = ref({
  orderNotify: true,
  messagePush: true,
});

// 缓存大小
const cacheSize = ref('2.5MB');
// 版本号
const version = ref('1.0.0');

// 修改密码
const modifyPassword = () => {
  uni.navigateTo({
    url: '/pages/settings/password',
  });
};

// 绑定手机
const bindPhone = () => {
  uni.navigateTo({
    url: '/pages/settings/phone',
  });
};

// 切换订单通知
const toggleOrderNotify = (e) => {
  settings.value.orderNotify = e.detail.value;
};

// 切换消息推送
const toggleMessagePush = (e) => {
  settings.value.messagePush = e.detail.value;
};

// 清除缓存
const clearCache = () => {
  uni.showModal({
    title: '提示',
    content: '确定要清除缓存吗？',
    success: (res) => {
      if (res.confirm) {
        uni.showLoading({
          title: '清理中',
        });
        setTimeout(() => {
          uni.hideLoading();
          cacheSize.value = '0B';
          uni.showToast({
            title: '清理成功',
            icon: 'success',
          });
        }, 1000);
      }
    },
  });
};

// 退出登录
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // TODO: 调用退出登录API
        uni.reLaunch({
          url: '/pages/login/index',
        });
      }
    },
  });
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
}

.section {
  margin-bottom: 30rpx;

  .section-title {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 10rpx;
    padding: 0 10rpx;
  }
}

.menu-list {
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;

  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx 20rpx;
    border-bottom: 1px solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }

    .menu-left {
      display: flex;
      align-items: center;

      .iconfont {
        font-size: 40rpx;
        color: #007aff;
        margin-right: 20rpx;
      }

      .label {
        font-size: 28rpx;
        color: #333;
      }
    }

    .menu-right {
      display: flex;
      align-items: center;

      .value {
        font-size: 28rpx;
        color: #666;
        margin-right: 10rpx;
      }
    }

    .value {
      font-size: 28rpx;
      color: #666;
    }

    .iconfont {
      color: #999;
    }
  }
}

.logout-btn {
  margin-top: 60rpx;
  text-align: center;
  padding: 30rpx 0;
  background: #fff;
  border-radius: 16rpx;
  color: #ff4d4f;
  font-size: 32rpx;
}
</style>
