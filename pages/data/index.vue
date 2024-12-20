<template>
  <view class="container">
    <!-- 顶部数据卡片 -->
    <view class="stat-banner">
      <view class="banner-content">
        <view class="banner-title">数据分析</view>
        <view class="tab-group">
          <text class="tab-item" :class="{ active: currentTab === 'logistics' }" @tap="switchTab('logistics')"
            >物流</text
          >
          <text class="tab-item" :class="{ active: currentTab === 'warehouse' }" @tap="switchTab('warehouse')"
            >仓储</text
          >
        </view>
      </view>
    </view>

    <view v-if="currentTab === 'logistics'">
      <tmsData></tmsData>
    </view>

    <view v-if="currentTab === 'warehouse'">
      <wmsData></wmsData>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { getAction } from '@/common/store/manage'
import { onReady } from '@dcloudio/uni-app'
import tmsData from './tmsData.vue'
import wmsData from './wmsData.vue'
const chartDataWms = ref({})

// 添加tab切换状态
const currentTab = ref('logistics')

// 切换tab
const switchTab = (tab) => {
  currentTab.value = tab
}

onReady(() => {
  getServerData()
})

const getServerData = () => {
  //模拟从服务器获取数据时的延时
  setTimeout(() => {
    //模拟服务器返回数据，如果据格式和标准格式不同，需自行按下面的格式拼接
    let res = {
      series: [
        {
          data: [
            { name: '库龄0~30', value: 254000, labelShow: false },
            { name: '库龄31~180', value: 78000, labelShow: false },
            { name: '库龄180+', value: 35500, labelShow: false },
          ],
        },
      ],
    }
    chartDataWms.value = JSON.parse(JSON.stringify(res))
  }, 500)
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 50rpx;
}
.stat-banner {
  height: 20vh;
  color: #fff;
  background-size: cover; /* 背景图片填充整个容器，可能会裁剪部分内容 */
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/banner_1734520009332.png');
  display: flex;
  align-items: flex-start;
  padding-top: 120rpx;

  .banner-content {
    width: 100%;
    padding: 0 40rpx;

    .banner-title {
      font-size: 36rpx;
      font-weight: 500;
      margin-bottom: 30rpx;
    }

    .tab-group {
      display: inline-flex;

      border-radius: 12rpx;
      z-index: 9;
      border: 1px solid #fff;
      .tab-item {
        padding: 12rpx 50rpx;
        font-size: 28rpx;
        // border-radius: 10rpx;
        transition: all 0.3s;

        &.active {
          background: #fff;
          color: $theme-color;
        }
      }
    }
  }
}

.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 30rpx;
  font-weight: 600;
  margin: 20rpx 0rpx;
}

// 动画类
.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
