<template>
  <view class="container">
    <!-- 物流状态卡片 -->
    <!-- <view class="status-card">
      <view class="status-header">
        <view class="status-info">
          <text class="status">{{ logisticsInfo.status }}</text>
        </view>
 
      </view>
      <view class="delivery-info">
        <view class="info-item">
          <text class="label">物流单号</text>
          <text class="value">{{ transNo }}</text>
          <text class="copy-btn" @tap="copyTrackingNo">复制</text>
        </view>
        <view class="info-item">
          <text class="label">承运商</text>
          <text class="value">{{ logisticsInfo.carrier }}</text>
        </view>
      </view>
    </view> -->

    <!-- 物流轨迹时间线 -->
    <view v-if="routeList && routeList.length > 0" class="timeline-section">
      <view class="delivery-info">
        <view class="info-item">
          <text class="label">物流单号:</text>
          <text class="value">{{ transNo }}</text>
          <text class="copy-btn" @tap="copyTrackingNo">复制</text>
        </view>
      </view>
      <view v-for="(item, index) in routeList" :key="index" class="timeline-item" :class="{ active: index === 0 }">
        <view class="time-point">
          <view class="point"></view>
          <view class="line" v-if="index !== routeList.length - 1"></view>
        </view>
        <view class="content">
          <view class="status">{{ item.status_dictText }}</view>
          <view class="desc">{{ item.log }}</view>
          <view class="time">{{ item.businessTime }}</view>
          <view class="location" v-if="item.location">{{ item.location }}</view>
        </view>
      </view>
    </view>

    <!-- 空状态提示 -->
    <view v-else class="empty-state">
      <image
        class="empty-image"
        src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/PixPin_2024-12-18_16-00-02_1734508838046.png"
        mode="aspectFit"
      ></image>
      <text class="empty-text">暂无物流信息</text>
      <text class="empty-desc">物流信息更新后会第一时间通知您</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getAction } from '../../common/store/manage'
const transNo = ref('')
const routeList = ref([])
const logisticsInfo = ref({
  status: '运输中',
  statusDesc: '货物正在运输途中',
  statusIcon: 'http://example.com/status-icon.png',
  trackingNo: 'SF1234567890',
  carrier: '顺丰速运',
  tracks: [
    {
      status: '运输中',
      description: '货物正在运输途中',
      time: '2024-03-15 14:30:00',
      location: '广州市白云区',
    },
    {
      status: '已发货',
      description: '货物已从仓库发出',
      time: '2024-03-15 10:00:00',
      location: '深圳市宝安区',
    },
    {
      status: '已揽收',
      description: '快递员已揽收货物',
      time: '2024-03-15 09:30:00',
      location: '深圳市宝安区',
    },
  ],
})

// 复制物流单号
const copyTrackingNo = () => {
  uni.setClipboardData({
    data: logisticsInfo.value.trackingNo,
    success: () => {
      uni.showToast({
        title: '复制成功',
        icon: 'none',
      })
    },
  })
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 获取物流信息
const getLogisticsInfo = async () => {
  getAction('/tms/tracking/getByTransNo', {
    pageNo: 1,
    pageSize: 9999,
    transNo: transNo.value,
  }).then((res) => {
    if (res.success) {
      routeList.value = res.result
    }
  })
}

onLoad((options) => {
  transNo.value = options.sn
  getLogisticsInfo()
})
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20rpx 10rpx;
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
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

  .navbar-title {
    flex: 1;
    text-align: center;
    font-size: 32rpx;
    font-weight: 500;
  }
}

.status-card {
  margin: 20rpx 20rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

  .status-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;

    .status-info {
      .status {
        font-size: 36rpx;
        font-weight: bold;
        color: $theme-color;
        margin-bottom: 8rpx;
        display: block;
      }

      .desc {
        font-size: 26rpx;
        color: #666;
      }
    }

    .status-icon {
      width: 80rpx;
      height: 80rpx;
    }
  }
}
.delivery-info {
  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 16rpx;

    .label {
      font-size: 26rpx;
      color: #666;
      width: 120rpx;
    }

    .value {
      flex: 1;
      font-size: 28rpx;
      color: #333;
    }

    .copy-btn {
      font-size: 24rpx;
      color: $theme-color;
      padding: 4rpx 16rpx;
      border: 1rpx solid $theme-color;
      border-radius: 20rpx;
    }
  }
}
.timeline-section {
  margin: 0 20rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;

  .timeline-item {
    display: flex;
    position: relative;
    padding-bottom: 40rpx;

    &.active {
      .time-point .point {
        background: $theme-color;
        border-color: rgba($theme-color, 0.2);
      }

      .content {
        .status {
          color: $theme-color;
        }
      }
    }

    .time-point {
      width: 30rpx;
      margin-right: 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;

      .point {
        width: 16rpx;
        height: 16rpx;
        border-radius: 50%;
        background: #ddd;
        border: 4rpx solid rgba(#ddd, 0.2);
      }

      .line {
        width: 2rpx;
        height: 100%;
        background: #eee;
        margin-top: 4rpx;
      }
    }

    .content {
      flex: 1;

      .status {
        font-size: 28rpx;
        color: #333;
        font-weight: 500;
        margin-bottom: 8rpx;
      }

      .desc {
        font-size: 26rpx;
        color: #666;
        margin-bottom: 8rpx;
      }

      .time {
        font-size: 24rpx;
        color: #999;
      }

      .location {
        font-size: 24rpx;
        color: #999;
        margin-top: 4rpx;
      }
    }
  }
}

// 添加空状态样式
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 40rpx;
  background: #fff;
  border-radius: 16rpx;
  margin: 0 20rpx;

  .empty-image {
    width: 240rpx;
    height: 240rpx;
    margin-bottom: 40rpx;
  }

  .empty-text {
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
    margin-bottom: 16rpx;
  }

  .empty-desc {
    font-size: 26rpx;
    color: #999;
  }
}
</style>
