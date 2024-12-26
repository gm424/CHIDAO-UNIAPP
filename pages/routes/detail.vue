<template>
  <view class="container">
    <!-- 路线基本信息卡片 -->
    <view class="route-card">
      <view class="route-number">
        <text class="channel-isoCode"> {{ route.code }}</text>
        <text class="channel-tag">{{ route.channel_dictText }}</text>
      </view>
      <view class="route-locations">
        <view class="location">
          <text class="city">{{ route.routeInfo.srcPortDict }}</text>
          <text class="country-isoCode">{{ route.routeInfo.srcPort }}</text>
        </view>
        <view class="route-arrow">
          <image
            class="arrow-icon"
            src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/箭头_切换左_1734333007078.png"
            mode="aspectFit"
          />
          <text class="transit-time">{{ route.routeInfo.referenceTimeCost }}</text>
        </view>
        <view class="location">
          <text class="city">{{ route.routeInfo.dstPortDict }}</text>
          <text class="country-isoCode">{{ route.routeInfo.dstPortDict }}</text>
        </view>
      </view>
    </view>
    <!-- 拼柜详情 -->
    <view class="section-volumn">
      <view class="section-title">
        <view class="title"></view>
        <view class="value"
          >{{
            route.containerContext.height *
            route.containerContext.width *
            route.containerContext.maxWeight *
            route.remainingVolumeRate
          }}<text class="unit">CBM</text></view
        >
      </view>
      <view class="pinning-details">
        <!-- 容量图表 -->
        <view class="capacity-chart" style="position: relative; width: 90%; margin: 20rpx auto">
          <img
            src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/编组10_1734664443312.png"
            mode="aspectFit"
            style="width: 550rpx; height: 180rpx"
          />
          <img
            v-for="(i, index) in percent"
            src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/黄_1734663675042.png"
            style="position: absolute; bottom: 10rpx; width: 50rpx; height: 120rpx"
            :style="{ left: index * 50 + 50 + 'rpx' }"
          />
          <img
            v-for="(i, index) in 10 - percent"
            src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/灰_1734663695058.png"
            style="position: absolute; bottom: 10rpx; width: 50rpx; height: 120rpx"
            :style="{ left: (percent + index) * 50 + 50 + 'rpx' }"
          />
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

        <view class="percent">{{ (1 - route.remainingVolumeRate) * 100 }}%</view>
      </view>
    </view>

    <!-- 阶梯报价 -->
    <view class="section">
      <view class="section-title">阶梯报价</view>
      <view class="price-table" v-if="route.routeInfo.chargingType !== '4'">
        <view class="table-header">
          <view class="th">阶梯</view>
          <view class="th">重量上线(KG)</view>
          <view class="th">公布价</view>
        </view>
        <view class="table-row" v-for="(item, index) in dataSource" :key="index">
          <view class="td">{{ item._key }}</view>
          <view class="td">{{ item.weightMax }}</view>
          <view class="td">{{ item.unitPrice }}</view>
        </view>
      </view>

      <view class="price-table" v-else>
        <view class="table-header">
          <view class="th" v-for="(it, index) in cloumns" :key="index">{{
            it === 'weightMax' ? '重量上限(KG)/密度' : it
          }}</view>
        </view>
        <view class="table-row" v-for="(item, index) in dataSource" :key="index">
          <view class="td" v-for="(col, colIndex) in cloumns" :key="colIndex">
            {{ item[col.key] }}
          </view>
        </view>
      </view>
    </view>

    <!-- 价格说明 -->
    <view class="section" v-if="priceInfo.length > 0">
      <view class="section-title">附加费说明</view>
      <view class="price-list">
        <view class="price-item" v-for="(item, index) in priceInfo" :key="index">
          <text class="label">{{ item.feeItem_dictText }}({{ item.chargeCondition }})</text>
          <text class="value">¥{{ item.unitPrice }}/KG</text>
        </view>
      </view>
    </view>

    <!-- 服务信息 -->
    <view class="section">
      <view class="section-title">服务说明</view>
      <view class="service-list">
        <view class="service-item" v-for="service in services" :key="service.name">
          <text class="iconfont" :class="'icon-' + service.icon"></text>
          <view class="service-info">
            <div class="name">{{ service.name }}</div>
            <div class="desc">{{ service.description }}</div>
          </view>
        </view>
      </view>
    </view>

    <!-- 限制信息 -->
    <view class="section">
      <view class="section-title">限制说明</view>
      <view class="restrictions">
        <view class="limit-item">
          <text class="label">重量限制</text>
          <text class="value">{{ restrictions.weight.min }}-{{ restrictions.weight.max }}KG</text>
        </view>
        <view class="limit-item">
          <text class="label">尺寸限制</text>
          <text class="value"
            >{{ restrictions.size.length }}x{{ restrictions.size.width }}x{{ restrictions.size.height }}cm</text
          >
        </view>
        <view class="prohibited">
          <text class="label">禁运物品</text>
          <view class="prohibited-list">
            <text v-for="item in restrictions.prohibited" :key="item" class="prohibited-item">{{ item }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <u-button class="btn-order" @tap="createOrder">立即下单</u-button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getAction } from '../../common/store/manage'

const dataSource = ref([])
const route = ref({
  routeInfo: {},
})

const priceInfo = ref([])

// 服务信息
const services = [
  {
    icon: 'truck',
    name: '上门取件',
    description: '提供深圳市区范围内',
  },
  {
    icon: 'box',
    name: '包装服务',
    description: '专业物流包装，确保货物安全',
  },
  {
    icon: 'shield',
    name: '保价服务',
    description: '可选保价服务，货物更有保障',
  },
  {
    icon: 'clock',
    name: '准时达',
    description: '保证准时到达，延误赔付',
  },
]

// 限制信息
const restrictions = {
  weight: {
    min: '0.1', // 最小重量（kg）
    max: '1000', // 最大重量（kg）
  },
  size: {
    length: '300', // 最大长度（cm）
    width: '200', // 最大宽度（cm）
    height: '200', // 最大高度（cm）
  },
  prohibited: [
    // 禁运物品
    '易燃易爆物品',
    '危险化学品',
    '活体动物',
  ],
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
// 定义 updateTimer
const percent = ref(4)
const updateTimer = ref(null)
const scrollIndex = ref(null)
// 生成随机头像URL
const getRandomAvatar = () => {
  const style = avatarStyles[Math.floor(Math.random() * avatarStyles.length)]
  const seed = Math.random().toString(36).substring(7)
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`
}
const columns = ref([])
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
    time: '10分钟前',
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

const getFeeData = () => {
  getAction('/oms/transQuoteScheme/queryAdditinalList', { schemeId: route.value.routeInfo.quoteSchemeId }).then(
    (res) => {
      if (res.success) {
        priceInfo.value = res.result
      }
    }
  )
}

// 添加轮播切换事件处理
const onSwiperChange = (e) => {
  scrollIndex.value = e.detail.current
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
  route.value = uni.getStorageSync('routeInfo')
  console.log('routeInfo', route.value)

  percent.value = Math.round((1 - route.value.remainingVolumeRate) * 10)

  if (!route.value.id) {
    // 获取路线详情
    uni.showToast({
      title: '路线不存在',
      icon: 'none',
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  } else {
    dataSource.value = []
    if (route.value.routeInfo.quoteRangeInfo != null) {
      var quoteRangeInfo = JSON.parse(JSON.stringify(route.value.routeInfo.quoteRangeInfo))
      if (route.value.routeInfo.chargingType === '4') {
        quoteRangeInfo.value.map((item) => {
          const obj = { weightMax: item.maxRange === -1 ? '∞' : item.maxRange, _key: _.uniqueId('new_') }
          console.log('obj', obj)
          for (const subItem of item.densityRangeInfos) {
            console.log('subItem', subItem)
            obj[subItem.maxRange.toString() === '-1' ? '∞' : subItem.maxRange.toString()] = subItem['unitPrice']
          }
          console.log('return', obj)
          dataSource.value.push(obj)
          console.log('dataSource', dataSource.value)
        })
        handleColumns()
      } else {
        quoteRangeInfo.forEach((item, index) => {
          dataSource.value.push(
            Object.assign(
              { _key: index + 1 },
              { weightMax: item.maxRange === -1 ? '∞' : item.maxRange },
              {
                unitPrice: item.unitPrice,
              }
            )
          )
        })
      }
    }
  }
  getFeeData()
})
const handleColumns = () => {
  const allKeys = new Set()
  dataSource.value.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key !== '_key') {
        allKeys.add(key)
      }
    })
  })

  // 转换为数组并排序
  columns.value = Array.from(allKeys).sort((a, b) => {
    // 特殊处理 'weightMax' 和 '∞'
    if (a === 'weightMax') return -1
    if (b === 'weightMax') return 1
    if (a === '∞') return 1
    if (b === '∞') return -1

    // 转换为数字比较
    return parseInt(a) - parseInt(b)
  })
  console.log('columns', columns.value)
}
const createOrder = () => {
  uni.navigateTo({
    url: `/pages/order/create?routeId=${route.value.id}`,
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 40rpx 20rpx 160rpx;
}

.route-card {
  background: #fff;
  border-radius: 26rpx;
  margin-bottom: 20rpx;
  .route-number {
    display: flex;
    background-image: url('http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/编组6_1733911834858.png');
    background-size: cover; /* 背景图片填充整个容器，可能会裁剪部分内容 */
    background-repeat: no-repeat;
    background-position: center;
    align-items: center;
    margin-bottom: 20rpx;
    padding: 8rpx 20rpx;
    justify-content: space-between;
    .channel-isoCode {
      color: #fff;
      font-size: 24rpx;
    }
    .channel-tag {
      margin-left: 20rpx;

      color: #292727;
      padding: 4rpx 16rpx;
      border-radius: 4rpx;
      font-size: 24rpx;
    }
  }

  .route-locations {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30rpx;
    .location {
      display: flex;
      flex-direction: column;
      align-items: center;

      .city {
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 8rpx;
      }

      .country-isoCode {
        font-size: 24rpx;
        color: #666;
      }
    }

    .route-arrow {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .arrow-icon {
        width: 120rpx;
        height: 40rpx;
        margin-bottom: 8rpx;
      }

      .transit-time {
        font-size: 24rpx;
        color: #666;
      }
    }
  }
}

.section {
  background: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
  border-radius: 26rpx;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200rpx;
    height: 200rpx;
    background: radial-gradient(
      circle at 0 0,
      rgba(238, 199, 27, 0.12) 0%,
      rgba(238, 199, 27, 0.05) 35%,
      rgba(238, 199, 27, 0.02) 60%,
      rgba(238, 199, 27, 0) 100%
    );
    pointer-events: none;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 0 0, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 60%);
    transform: rotate(45deg);
    pointer-events: none;
    z-index: 0;
  }
  .pinning-details {
    background: #fff;
    border-radius: 16rpx;
    padding: 20rpx;
    position: relative;
    .capacity-chart {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 20rpx;

      img {
        width: 80%;
        height: 140rpx;
      }
    }
    .percent {
      position: absolute;
      top: 100rpx;
      right: 100rpx;
      color: #a2f7a2;
    }
  }
  .section-title {
    position: relative;
    z-index: 2;
    font-weight: bold;
    margin-bottom: 20rpx;
    font-family: YouSheBiaoTiHei;
    font-size: 34rpx;
    color: $theme-color;
    line-height: 62rpx;
    text-align: left;
    font-style: normal;
    display: flex;
    justify-content: space-between;

    .value {
      font-size: 36rpx;
      color: #181818;
    }
  }

  .price-table,
  .price-list,
  .service-list,
  .restrictions {
    position: relative;
    z-index: 2;
  }
}
.section-volumn {
  background-image: url('http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/编组22备份3(1)_1734578211054.png');
  // padding: 20rpx 0rpx 20rpx 0rpx;
  background-size: cover; /* 背景图片填充整个容器，可能会裁剪部分内容 */
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 20rpx;

  border-radius: 26rpx;
  border-top-right-radius: 40rpx;
  position: relative;
  overflow: hidden;
  // box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200rpx;
    height: 200rpx;
    // background: radial-gradient(
    //   circle at 0 0,
    //   rgba(238, 199, 27, 0.12) 0%,
    //   rgba(238, 199, 27, 0.05) 35%,
    //   rgba(238, 199, 27, 0.02) 60%,
    //   rgba(238, 199, 27, 0) 100%
    // );
    pointer-events: none;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 0 0, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 60%);
    transform: rotate(45deg);
    pointer-events: none;
    z-index: 0;
  }
  .pinning-details {
    border-radius: 16rpx;
    padding: 20rpx;
    position: relative;
    margin: 0 auto;
    .capacity-chart {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 20rpx;

      img {
        width: 80%;
        height: 140rpx;
      }
    }
    .percent {
      position: absolute;
      top: 120rpx;
      right: 100rpx;
      color: #8dd394;
      font-weight: 600;
      font-size: 30rpx;
    }
  }
  .section-title {
    width: 95%;
    position: relative;
    z-index: 2;
    font-weight: bold;
    margin-top: 25rpx;
    font-family: YouSheBiaoTiHei;
    font-size: 36rpx;

    color: $theme-color;
    line-height: 62rpx;
    text-align: left;
    font-style: normal;
    display: flex;
    justify-content: space-between;

    .value {
      font-size: 32rpx;
      color: #181818;
      margin-top: 10rpx;
      .unit {
        color: #8c8c8d;
        font-size: 28rpx;
        font-weight: 500;
        margin-left: 10rpx;
      }
    }
  }

  .price-table,
  .price-list,
  .service-list,
  .restrictions {
    position: relative;
    z-index: 2;
  }
}
.price-list {
  .ladder-prices {
    margin-bottom: 30rpx;

    .ladder-header {
      display: flex;
      justify-content: space-between;
      padding: 20rpx 0;
      border-bottom: 2rpx solid #f5f5f5;
      font-size: 28rpx;
      color: #666;
      font-weight: bold;
    }

    .ladder-item {
      display: flex;
      justify-content: space-between;
      padding: 20rpx 0;
      border-bottom: 1rpx solid #f5f5f5;

      &:last-child {
        border-bottom: none;
      }

      .weight {
        font-size: 28rpx;
        color: #333;
      }

      .price {
        font-size: 28rpx;
        color: #ff4d4f;
        font-weight: bold;
      }
    }
  }

  .divider {
    height: 20rpx;
    background: #f5f5f5;
    margin: 0 -30rpx;
    margin-bottom: 20rpx;
  }

  .price-item {
    display: flex;
    justify-content: space-between;
    padding: 20rpx 0;
    border-bottom: 1px solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }

    .label {
      color: #666;
      font-size: 28rpx;
    }

    .value {
      color: #ff4d4f;
      font-size: 28rpx;
    }
  }
}

.service-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;

  .service-item {
    display: flex;
    align-items: flex-start;
    padding: 20rpx;
    background: #f8f8f8;
    border-radius: 8rpx;

    .iconfont {
      font-size: 40rpx;
      color: #007aff;
      margin-right: 16rpx;
    }

    .service-info {
      flex: 1;

      .name {
        font-size: 28rpx;
        font-weight: bold;
        margin-bottom: 8rpx;
      }

      .desc {
        font-size: 24rpx;
        color: #666;
      }
    }
  }
}

.restrictions {
  .limit-item {
    display: flex;
    justify-content: space-between;
    padding: 20rpx 0;
    border-bottom: 1px solid #f5f5f5;

    .label {
      color: #666;
      font-size: 28rpx;
    }

    .value {
      color: #333;
      font-size: 28rpx;
    }
  }

  .prohibited {
    padding: 20rpx 0;

    .label {
      color: #666;
      font-size: 28rpx;
      margin-bottom: 16rpx;
    }

    .prohibited-list {
      display: flex;
      flex-wrap: wrap;
      gap: 16rpx;

      .prohibited-item {
        background: #fff2f0;
        color: #ff4d4f;
        padding: 8rpx 20rpx;
        border-radius: 4rpx;
        font-size: 24rpx;
      }
    }
  }
}

.timeline {
  position: relative;
  padding-left: 30rpx;

  &::before {
    content: '';
    position: absolute;
    left: 8rpx;
    top: 0;
    bottom: 0;
    width: 2rpx;
    background: #e8e8e8;
  }

  .timeline-item {
    position: relative;
    padding-bottom: 30rpx;

    .timeline-point {
      position: absolute;
      left: -30rpx;
      width: 16rpx;
      height: 16rpx;
      background: #007aff;
      border-radius: 50%;
    }

    .timeline-content {
      .location {
        font-size: 28rpx;
        font-weight: bold;
        margin-bottom: 8rpx;
      }

      .time {
        font-size: 24rpx;
        color: #666;
        margin-bottom: 4rpx;
      }

      .status {
        font-size: 24rpx;
        color: #007aff;
      }
    }
  }
}

.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  padding: 20rpx 10rpx;
  display: flex;

  justify-content: flex-end;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  z-index: 999;
  .price-info {
    display: flex;
    align-items: baseline;

    .label {
      font-size: 28rpx;
      color: #666;
      margin-right: 16rpx;
    }

    .price {
      font-size: 40rpx;
      color: #ff4d4f;
      font-weight: bold;
    }

    .unit {
      font-size: 24rpx;
      color: #666;
      margin-left: 4rpx;
    }
  }

  .btn-order {
    width: 40%;

    background: linear-gradient(90deg, #ffce5e 0%, #ffb200 100%);
    border-radius: 48px;

    // background: $theme-color;
    color: #fff;
    right: -200rpx;

    border-radius: 40rpx;
    font-size: 28rpx;
    display: flex;

    text-align: center;
  }
}

.price-table {
  // border: 1rpx solid #eee;
  border-radius: 8rpx;
  overflow: hidden;

  .table-header {
    display: flex;

    .th {
      flex: 1;
      padding: 20rpx;
      text-align: center;
      font-size: 28rpx;
      color: #333;
      font-weight: bold;

      &:first-child {
        // border-right: 1rpx solid #eee;
      }
    }
  }

  .table-row {
    display: flex;
    border-top: 1rpx solid #eee;

    .td {
      flex: 1;
      padding: 20rpx;
      text-align: center;
      font-size: 28rpx;
      color: #333;

      &:first-child {
        // border-right: 1rpx solid #eee;
      }

      &.price {
        color: #ff4d4f;
        font-weight: bold;
      }
    }

    &:hover {
      background: #f8f8f8;
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
</style>
