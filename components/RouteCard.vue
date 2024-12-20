<template>
  <view class="route-card" @tap="$emit('tap')">
    <view v-if="route.isHot" class="hot-tag">
      <text>HOT</text>
    </view>

    <view class="route-number">
      <text class="number"
        >班次号 : {{ route.code ? (route.code.length > 15 ? route.code.slice(0, 15) + '...' : route.code) : '' }}</text
      >
      <view class="tags-container">
        <view class="channel-tag">
          <text>{{ route.channel_dictText }}</text>
        </view>
        <view class="door-tag">
          <text>到门</text>
        </view>
      </view>
    </view>

    <view class="route-main">
      <view class="route-locations">
        <view class="location">
          <text class="city">{{ route.routeInfo ? route.routeInfo.srcPortDict : '' }}</text>
          <text class="country-code">{{ route.routeInfo ? route.routeInfo.srcPort : '' }}</text>
        </view>
        <view class="route-arrow">
          <image
            class="arrow-icon"
            src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/箭头_切换左_1734333007078.png"
            mode="aspectFit"
          />
          <text class="arrow-time">{{ route.routeInfo ? route.routeInfo.referenceTimeCost : '' }}</text>
        </view>
        <view class="location">
          <text class="city">{{ route.routeInfo ? route.routeInfo.dstPortDict : '' }}</text>
          <text class="country-code">{{ route.routeInfo ? route.routeInfo.dstPort : '' }}</text>
        </view>
      </view>

      <view class="route-times">
        <view>
          <view class="time-item">
            <view class="time-label">发车时间: </view>
            <view class="time-value">{{ route.departureTime }}</view>
          </view>
          <view class="time-item">
            <view class="time-label">截止时间:</view>
            <view class="time-value">{{ route.deadlineTime }}</view>
          </view>
        </view>
        <view style="display: flex; align-items: end">
          <text class="price"
            >¥{{ route.lowPrice }}<text style="font-size: 24rpx; color: rgba(0, 0, 0, 0.5)">/KG 起</text></text
          >
        </view>
      </view>

      <view class="route-times">
        <view class="time-item">
          <view class="time-label">剩余容量: </view>
          <view class="time-value"
            >{{ route.containers[0] ? route.containers[0].containerVolume - route.containers[0].volume : 0 }}CBM</view
          >
        </view>
      </view>

      <view class="capacity-progress">
        <view class="progress-bar">
          <view class="progress-track">
            <view
              class="progress-fill"
              :style="{
                width: `${
                  ((route.containers[0] ? route.containers[0].containerVolume - route.containers[0].volume : 0) /
                  route.containers[0]
                    ? route.containers[0].containerVolume
                    : 1) * 100
                }%`,
              }"
            >
              <view class="stripes"></view>
            </view>
          </view>
          <view
            class="progress-marker"
            :style="{
              left: `${
                ((route.containers[0] ? route.containers[0].containerVolume - route.containers[0].volume : 0) /
                route.containers[0]
                  ? route.containers[0].containerVolume
                  : 1) * 100
              }%`,
            }"
          >
            <view class="marker-arrow"></view>
            <text class="marker-text"
              >{{
                ((route.containers[0] ? route.containers[0].containerVolume - route.containers[0].volume : 0) /
                route.containers[0]
                  ? route.containers[0].containerVolume
                  : 1) * 100
              }}%</text
            >
          </view>
        </view>
      </view>

      <!-- 拼柜动态 -->
      <view class="join-dynamics">
        <swiper
          class="dynamics-swiper"
          vertical
          circular
          autoplay
          interval="3000"
          duration="500"
          @change="onSwiperChange"
        >
          <swiper-item v-for="(item, index) in joinList" :key="item.id">
            <view class="dynamic-item">
              <image class="user-avatar" :src="item.avatar || '/static/default-avatar.png'" mode="aspectFill" />
              <view class="dynamic-content">
                <text class="username">{{ item.username }}</text>
                <text class="action-text">刚刚参与拼柜</text>
              </view>
              <view class="time_item">
                <image
                  style="width: 110rpx; height: 25rpx"
                  src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/刚刚抢到_1734426146798.png"
                ></image>
                <text class="time">{{ item.time }}</text>
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 定义 updateTimer
const updateTimer = ref(null)

// 定义 props
defineProps({
  route: {
    type: Object,
    default: () => ({
      usagePercent: 20,
    }),
  },
  showActions: {
    type: Boolean,
    default: false,
  },
})

const createOrder = () => {
  uni.setStorageSync('routeId', props.route.id)
  uni.navigateTo({
    url: `/pages/order/create?routeId=${props.route.id}`,
  })
}
// 头像样式列表
const avatarStyles = [
  'adventurer',
  'adventurer-neutral',
  'avataaars',
  'big-ears',
  'big-ears-neutral',
  'bottts',
  'croodles',
  'fun-emoji',
  'icons',
  'identicon',
  'micah',
  'miniavs',
  'personas',
  'pixel-art',
]

// 生成随机头像URL
const getRandomAvatar = () => {
  const style = avatarStyles[Math.floor(Math.random() * avatarStyles.length)]
  const seed = Math.random().toString(36).substring(7)
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`
}
// 模拟拼柜数据 - 使用随机头像
const joinList = ref([
  {
    id: 1,
    username: '张**',
    avatar: getRandomAvatar(),
    time: '1分钟前',
  },
  {
    id: 2,
    username: '李**',
    avatar: getRandomAvatar(),
    time: '3分钟前',
  },
  {
    id: 3,
    username: '王**',
    avatar: getRandomAvatar(),
    time: '5分钟前',
  },
  {
    id: 4,
    username: '赵**',
    avatar: getRandomAvatar(),
    time: '8分钟前',
  },
  {
    id: 5,
    username: '陈**',
    avatar: getRandomAvatar(),
    time: '10分���前',
  },
])

// 定时更新头像和数据
const updateDynamicData = () => {
  const newUser = {
    id: Date.now(),
    username: `用户${Math.floor(Math.random() * 1000)}**`,
    avatar: getRandomAvatar(),
    time: '刚刚',
  }

  // 更新时间显示
  joinList.value.forEach((item) => {
    if (item.time === '刚刚') {
      item.time = '1分钟前'
    } else if (item.time.includes('分钟')) {
      const minutes = parseInt(item.time) + 1
      if (minutes >= 60) {
        item.time = '1小时前'
      } else {
        item.time = `${minutes}分钟前`
      }
    }
  })

  // 添加新用户并保持列表长度
  joinList.value.unshift(newUser)
  if (joinList.value.length > 5) {
    joinList.value.pop()
  }
}

onUnmounted(() => {
  if (updateTimer.value) {
    clearInterval(updateTimer.value)
  }
})

onMounted(() => {
  // 获取路由参数
  // 每30秒更新一次数据
  updateTimer.value = setInterval(updateDynamicData, 30000)
})
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.route-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 35rpx;
  position: relative;

  box-sizing: border-box;

  .route-number {
    font-size: 28rpx;
    color: #b3b1b1;
    margin: 20rpx 0;
    justify-content: space-between;
    display: flex;
    align-items: center;

    .number {
      font-weight: bold;
      font-size: 26rpx;
    }
    .tags-container {
      display: flex;
      gap: 10rpx;

      .channel-tag {
        background: #46c254;
        padding: 4rpx 12rpx;
        border-radius: 8rpx;
        align-items: center;
        display: flex;
        text {
          color: #fff;
          font-size: 22rpx;
          font-weight: bold;
        }
      }

      .door-tag {
        background: $theme-color;
        padding: 4rpx 12rpx;
        border-radius: 8rpx;
        align-items: center;
        display: flex;
        text {
          color: #fff;
          font-size: 22rpx;
          font-weight: bold;
        }
      }
    }
  }

  .route-main {
    margin-top: 20rpx;
    .route-locations {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20rpx;
      padding: 0 20rpx;
      .location {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8rpx;

        .city {
          font-size: 18px;
          font-weight: bold;
        }

        .country-code {
          font-size: 24rpx;
          color: #666;
        }
      }

      .route-arrow {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 20rpx;
        width: 450rpx;
        .arrow-icon {
          width: 100rpx;
          height: 52rpx;
        }
        .arrow-time {
          font-size: 22rpx;
        }
      }
    }

    .route-times {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 20rpx;
      flex-direction: row;
      .time-item {
        display: flex;
        flex-direction: row;
        align-items: center;

        margin-top: 10rpx;
        .time-label {
          color: #9c9b9b;
          font-size: 26rpx;
        }

        .time-value {
          color: rgba(0, 0, 0, 0.6);
          font-size: 26rpx;
          margin-left: 10rpx;
        }
      }
      .price {
        color: #ff4d4f;
        font-size: 36rpx;
        font-weight: bold;
        margin-top: 50rpx;
      }
    }
  }

  .route-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20rpx;
    padding: 20rpx 0;
    border-top: 1px solid #f5f5f5;
  }

  .actions {
    margin-top: 20rpx;
    display: flex;
    justify-content: flex-end;

    .btn-order {
      font-size: 24rpx;
      padding: 10rpx 30rpx;
      border-radius: 30rpx;
      background: #007aff;
      color: #fff;
    }
  }

  .hot-tag {
    position: absolute;
    top: -25rpx;
    right: 5rpx;
    background: linear-gradient(45deg, #ff4d4f, #ff7875);
    padding: 6rpx 16rpx;
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    box-shadow: 0 2rpx 8rpx rgba(255, 77, 79, 0.3);
    z-index: 3;
    animation: pulse 2s infinite;

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      right: 24rpx;
      border-left: 8rpx solid transparent;
      border-right: 8rpx solid transparent;
      border-top: 8rpx solid #ff7875;
    }

    .hot-icon {
      width: 32rpx;
      height: 32rpx;
      margin-right: 4rpx;
      filter: brightness(0) invert(1);
      animation: shake 2s infinite;
    }

    text {
      color: #fff;
      font-size: 24rpx;
      font-weight: bold;
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
}

.capacity-progress {
  margin-top: 20rpx;
  padding: 20rpx 0;

  .progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rpx;

    .label {
      font-size: 24rpx;
      color: #666;
    }

    .value {
      font-size: 24rpx;
      color: #333;
      font-weight: 500;
    }
  }

  .progress-bar {
    position: relative;
    height: 30rpx;

    .progress-track {
      height: 100%;
      background: #f5f5f5;
      border-radius: 15rpx;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: $theme-gradient;
      border-radius: 15rpx;
      position: relative;
      transition: width 0.3s ease;
      overflow: hidden;

      .stripes {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: linear-gradient(
          -45deg,
          rgba(255, 255, 255, 0.2) 25%,
          transparent 25%,
          transparent 50%,
          rgba(255, 255, 255, 0.2) 50%,
          rgba(255, 255, 255, 0.2) 75%,
          transparent 75%,
          transparent
        );
        background-size: 30rpx 30rpx;
        animation: move 1s linear infinite;
      }
    }

    .progress-marker {
      position: absolute;
      top: -16rpx;
      transform: translateX(-50%);

      .marker-arrow {
        width: 0;
        height: 0;
        border-left: 10rpx solid transparent;
        border-right: 10rpx solid transparent;
        border-top: 10rpx solid $theme-color;
        margin: 0 auto;
      }

      .marker-text {
        position: absolute;
        top: -65rpx;
        left: 50%;
        transform: translateX(-50%);
        font-size: 20rpx;
        color: #fff;
        background-image: url('http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/圆_1734424137913.png');
        background-size: cover; /* 背景图片填充整个容器，可能会裁剪部分内容 */
        background-repeat: no-repeat;
        background-position: center;
        width: 60rpx;
        height: 60rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
.join-dynamics {
  background: linear-gradient(180deg, #ffdfc8 20%, #ffffff 100%);
  border-radius: 16rpx;
  padding: 10rpx;

  .dynamics-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rpx;

    .title {
      font-size: 28rpx;
      font-weight: 500;
      color: #333;
    }

    .count {
      font-size: 24rpx;
      color: #666;
    }
  }

  // 修改轮播样式
  .dynamics-swiper {
    height: 64rpx;

    .dynamic-item {
      height: 64rpx;
      display: flex;
      align-items: center;
      padding: 0 16rpx;

      .user-avatar {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        margin-right: 16rpx;
      }

      .dynamic-content {
        flex: 1;
        display: flex;
        align-items: center;

        .username {
          font-size: 24rpx;
          color: #333;
          margin-right: 8rpx;
        }

        .action-text {
          font-size: 24rpx;
          color: #666;
        }
      }
      .time_item {
        display: flex;
        flex-direction: column;
        .time {
          font-size: 22rpx;
          color: #999;
          margin-left: 16rpx;
        }
      }
    }
  }
}

// 添加渐变动画
.dynamic-item {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 30rpx 30rpx;
  }
}
</style>
