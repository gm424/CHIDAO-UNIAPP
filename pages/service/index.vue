<template>
  <view class="container">
    <view class="service-section">
      <view class="service-header">
        <text class="title">在线客服</text>
        <text class="subtitle">工作时间：周一至周日 9:00-21:00</text>
      </view>

      <view class="service-list">
        <view class="service-item" @tap="contactService('phone')">
          <text class="iconfont icon-phone"></text>
          <view class="info">
            <text class="label">电话咨询</text>
            <text class="value">400-888-8888</text>
          </view>
          <text class="iconfont icon-arrow-right"></text>
        </view>

        <view class="service-item" @tap="contactService('wechat')">
          <text class="iconfont icon-wechat"></text>
          <view class="info">
            <text class="label">微信客服</text>
            <text class="value">点击添加客服微信</text>
          </view>
          <text class="iconfont icon-arrow-right"></text>
        </view>

        <view class="service-item" @tap="contactService('email')">
          <text class="iconfont icon-email"></text>
          <view class="info">
            <text class="label">邮件咨询</text>
            <text class="value">support@example.com</text>
          </view>
          <text class="iconfont icon-arrow-right"></text>
        </view>
      </view>
    </view>

    <view class="faq-section">
      <view class="section-title">常见问题</view>
      <view class="faq-list">
        <view class="faq-item" v-for="faq in faqList" :key="faq.id" @tap="viewFaq(faq)">
          <text class="question">{{ faq.question }}</text>
          <text class="iconfont icon-arrow-right"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 常见问题列表
const faqList = ref([
  {
    id: '1',
    question: '如何下单？',
    answer: '点击首页路线，选择合适的路线后点击立即下单即可。',
  },
  {
    id: '2',
    question: '如何查看订单状态？',
    answer: '在"我的订单"中可以查看所有订单的状态。',
  },
  {
    id: '3',
    question: '如何申请发票？',
    answer: '在"发票管理"中点击申请开票，填写相关信息即可。',
  },
]);

// 联系客服
const contactService = (type) => {
  switch (type) {
    case 'phone':
      uni.makePhoneCall({
        phoneNumber: '4008888888',
      });
      break;
    case 'wechat':
      // 复制微信号
      uni.setClipboardData({
        data: 'customer_service',
        success: () => {
          uni.showToast({
            title: '微信号已复制',
            icon: 'success',
          });
        },
      });
      break;
    case 'email':
      // 复制邮箱
      uni.setClipboardData({
        data: 'support@example.com',
        success: () => {
          uni.showToast({
            title: '邮箱已复制',
            icon: 'success',
          });
        },
      });
      break;
  }
};

// 查看常见问题
const viewFaq = (faq) => {
  uni.showModal({
    title: faq.question,
    content: faq.answer,
    showCancel: false,
  });
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
}

.service-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx 20rpx;
  margin-bottom: 20rpx;

  .service-header {
    text-align: center;
    margin-bottom: 30rpx;

    .title {
      font-size: 36rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
    }

    .subtitle {
      font-size: 24rpx;
      color: #666;
    }
  }
}

.service-list {
  .service-item {
    display: flex;
    align-items: center;
    padding: 30rpx 0;
    border-bottom: 1px solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }

    .iconfont {
      font-size: 48rpx;
      color: #007aff;
      margin-right: 20rpx;

      &.icon-arrow-right {
        font-size: 32rpx;
        color: #999;
        margin-right: 0;
      }
    }

    .info {
      flex: 1;

      .label {
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 6rpx;
      }

      .value {
        font-size: 24rpx;
        color: #666;
      }
    }
  }
}

.faq-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx 20rpx;

  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
  }
}

.faq-list {
  .faq-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx 0;
    border-bottom: 1px solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }

    .question {
      font-size: 28rpx;
      color: #333;
    }

    .iconfont {
      font-size: 32rpx;
      color: #999;
    }
  }
}
</style>
