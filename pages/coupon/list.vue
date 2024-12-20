<template>
  <view class="container">
    <!-- 优惠券类型切换 -->
    <view class="tab-bar">
      <view
        v-for="tab in tabs"
        :key="tab.value"
        :class="['tab-item', currentTab === tab.value ? 'active' : '']"
        @tap="switchTab(tab.value)"
      >
        <text>{{ tab.label }}</text>
      </view>
    </view>

    <!-- 优惠券列表 -->
    <view class="coupon-list">
      <view v-for="coupon in filteredCoupons" :key="coupon.id" class="coupon-item">
        <view class="coupon-left">
          <view class="amount">
            <text class="symbol">¥</text>
            <text class="value">{{ coupon.amount }}</text>
          </view>
          <view class="condition">满{{ coupon.condition }}可用</view>
        </view>
        <view class="coupon-right">
          <view class="info">
            <text class="title">{{ coupon.title }}</text>
            <text class="time">有效期至：{{ coupon.expireTime }}</text>
          </view>
          <view class="status" :class="coupon.status">
            {{ coupon.status === 'used' ? '已使用' : coupon.status === 'expired' ? '已过期' : '立即使用' }}
          </view>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="filteredCoupons.length === 0">
      <text>暂无优惠券</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';

// 标签页
const tabs = [
  { label: '未使用', value: 'unused' },
  { label: '已使用', value: 'used' },
  { label: '已过期', value: 'expired' },
];

// 当前标签
const currentTab = ref('unused');

// 优惠券列表
const couponList = ref([
  {
    id: '1',
    title: '新用户专享券',
    amount: '50',
    condition: '500',
    expireTime: '2024-04-15',
    status: 'unused',
  },
  {
    id: '2',
    title: '满减优惠券',
    amount: '100',
    condition: '1000',
    expireTime: '2024-03-20',
    status: 'used',
  },
  {
    id: '3',
    title: '节日特惠券',
    amount: '200',
    condition: '2000',
    expireTime: '2024-03-10',
    status: 'expired',
  },
]);

// 切换标签
const switchTab = (tab) => {
  currentTab.value = tab;
};

// 根据状态筛选优惠券
const filteredCoupons = computed(() => {
  return couponList.value.filter((coupon) => coupon.status === currentTab.value);
});
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
}

.tab-bar {
  display: flex;
  background: #fff;
  padding: 20rpx;
  margin: -20rpx -20rpx 20rpx;

  .tab-item {
    flex: 1;
    text-align: center;
    font-size: 28rpx;
    color: #666;
    position: relative;

    &.active {
      color: #007aff;
      font-weight: bold;

      &::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: -20rpx;
        transform: translateX(-50%);
        width: 40rpx;
        height: 4rpx;
        background: #007aff;
        border-radius: 2rpx;
      }
    }
  }
}

.coupon-list {
  .coupon-item {
    display: flex;
    background: #fff;
    border-radius: 16rpx;
    margin-bottom: 20rpx;
    overflow: hidden;

    .coupon-left {
      width: 200rpx;
      background: #007aff;
      color: #fff;
      padding: 30rpx 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .amount {
        margin-bottom: 10rpx;

        .symbol {
          font-size: 32rpx;
        }

        .value {
          font-size: 60rpx;
          font-weight: bold;
        }
      }

      .condition {
        font-size: 24rpx;
      }
    }

    .coupon-right {
      flex: 1;
      padding: 30rpx 20rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .info {
        .title {
          font-size: 32rpx;
          font-weight: bold;
          margin-bottom: 10rpx;
        }

        .time {
          font-size: 24rpx;
          color: #666;
        }
      }

      .status {
        align-self: flex-end;
        font-size: 24rpx;
        color: #007aff;

        &.used {
          color: #999;
        }

        &.expired {
          color: #ff4d4f;
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
</style>
