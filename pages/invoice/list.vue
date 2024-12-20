<template>
  <view class="container">
    <view class="empty-state" v-if="invoiceList.length === 0">
      <text>暂无发票记录</text>
    </view>
    <view class="invoice-list" v-else>
      <view v-for="invoice in invoiceList" :key="invoice.id" class="invoice-item">
        <view class="invoice-header">
          <text class="title">{{ invoice.title }}</text>
          <text class="status">{{ invoice.status }}</text>
        </view>
        <view class="invoice-info">
          <view class="info-item">
            <text class="label">发票金额</text>
            <text class="value">¥{{ invoice.amount }}</text>
          </view>
          <view class="info-item">
            <text class="label">申请时间</text>
            <text class="value">{{ invoice.time }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="bottom-bar">
      <button class="submit-btn" @tap="applyInvoice">申请开票</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 发票列表
const invoiceList = ref([
  {
    id: '1',
    title: '某某物流有限公司',
    status: '已开票',
    amount: '2000.00',
    time: '2024-03-15 14:30:00',
  },
  {
    id: '2',
    title: '某某物流有限公司',
    status: '开票中',
    amount: '1500.00',
    time: '2024-03-14 10:20:00',
  },
]);

// 申请开票
const applyInvoice = () => {
  uni.navigateTo({
    url: '/pages/invoice/apply',
  });
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
  padding-bottom: 120rpx;
}

.invoice-list {
  .invoice-item {
    background: #fff;
    border-radius: 16rpx;
    padding: 20rpx;
    margin-bottom: 20rpx;

    .invoice-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20rpx;

      .title {
        font-size: 32rpx;
        font-weight: bold;
      }

      .status {
        color: #007aff;
      }
    }

    .invoice-info {
      .info-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10rpx;

        .label {
          color: #666;
          font-size: 28rpx;
        }

        .value {
          color: #333;
          font-size: 28rpx;
        }
      }
    }
  }
}

.empty-state {
  text-align: center;
  padding: 100rpx 0;
  color: #999;
  font-size: 28rpx;
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
