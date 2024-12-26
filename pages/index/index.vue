<template>
  <view class="container">
    <!-- 搜索栏 -->
    <view class="search-section" :style="{ height: searchHeight }">
      <!-- 背景轮播图 -->
      <swiper
        class="banner-swiper"
        circular
        autoplay
        interval="5000"
        duration="500"
        :indicator-dots="true"
        indicator-color="rgba(255, 255, 255, 0.6)"
        indicator-active-color="#fff"
      >
        <swiper-item v-for="banner in banners" :key="banner.id">
          <image :src="banner.image" mode="aspectFill" class="banner-image" @load="onImageLoad" @error="onImageError" />
          <view class="banner-tip">
            <view class="tip1">贴心的服务</view>
            <view class="tip2">一流的品质</view>
          </view>
          <view class="banner-title">{{ banner.title }}</view>
        </swiper-item>
      </swiper>

      <!-- 搜索卡片 -->
      <view class="search-bar">
        <!-- 渠道选择 tabs -->
        <view class="channel-container">
          <view class="channel-tabs">
            <view
              v-for="channel in channels.filter((c) => c !== '全部')"
              :key="channel.value"
              :class="['tab-item', selectedChannel === channel.value ? 'active' : '']"
              @tap="onChannelSelect(channel)"
            >
              <text class="tab-text">{{ channel.name }}</text>
              <view class="tab-bg"></view>
            </view>
          </view>
        </view>
        <view
          style="
            width: 100%;
            background-color: #fff;
            padding: 20px 0px;
            border-bottom-left-radius: 20rpx;
            border-bottom-right-radius: 20rpx;
          "
        >
          <!-- 起始地和目的地 -->
          <view class="location-row">
            <view class="location" @tap="showCountrySelect('origin')">
              <text>起始地 {{ selectedOrigin.name }}</text>
            </view>

            <text class="divider">|</text>

            <view class="location" @tap="showCountrySelect('dest')">
              <text>目的地 {{ selectedDest.name }}</text>
            </view>
          </view>

          <!-- 发运时间 -->
          <view class="location-row">
            <view class="location" @tap="showDateSelect">
              <text>日期 {{ selectedDate }}</text>
            </view>
          </view>

          <u-button class="search-btn" @tap="handleSearch">搜索班次</u-button>
        </view>
      </view>
    </view>

    <view style="width: 92%; height: 100rpx; margin: 0rpx auto 30rpx" @tap="viewRouteWebview()" v-if="show">
      <image
        src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/胶囊banner_1734608340378.png"
        style="width: 100%; height: 100rpx"
      ></image>
    </view>

    <!-- 热门路线 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">热门路线</text>
      </view>
      <view class="route-scroll">
        <view class="route-cards">
          <route-card v-for="route in hotRoutes" :key="route.id" :route="route" @tap="viewRouteDetail(route)" />
        </view>
      </view>
    </view>

    <!-- 渠道路线 -->
    <!-- <view class="section">
      <view class="section-header">
        <text class="section-title">渠道路线</text>
      </view>
      <view class="channel-tabs">
        <view
          v-for="channel in channels"
          :key="channel.value"
          :class="['tab-item', currentChannel === channel.value ? 'active' : '']"
          @tap="switchChannel(channel)"
        >
          {{ channel.name }}
        </view>
      </view>
      <view class="route-list">
        <route-card
          v-for="route in channelRoutes"
          :key="route.id"
          :route="route"
          :show-actions="true"
          @tap="viewRouteDetail(route)"
        />
      </view>
    </view> -->

    <!-- 添加国家选择弹窗 -->
    <u-popup :show="showCountryPopup" @close="closeCountrySelect" mode="bottom" round="10">
      <view class="country-popup">
        <view class="popup-header">
          <text>选择国家</text>
          <text class="close-btn" @tap="closeCountrySelect">关闭</text>
        </view>

        <!-- 添加搜索框 -->
        <view class="search-box">
          <u-search
            v-model="searchKeyword"
            placeholder="搜索国家"
            :show-action="false"
            @change="onSearchChange"
            :clearabled="true"
          ></u-search>
        </view>

        <!-- 修改国家列表显示逻辑 -->
        <scroll-view scroll-y class="country-list">
          <template v-if="searchKeyword">
            <!-- 搜索结果列表 -->
            <u-cell-group>
              <u-cell
                v-for="item in filteredCountries"
                :key="item.isoCode"
                :title="item.name"
                :label="item.isoCode"
                @click="selectCountry(item)"
              />
            </u-cell-group>
          </template>
          <template v-else>
            <!-- 原有的分组列表 -->

            <u-cell
              v-for="item in countryListRef"
              :key="item.isoCode"
              :title="item.name"
              :label="item.isoCode"
              @click="selectCountry(item)"
            />
          </template>
        </scroll-view>
      </view>
    </u-popup>

    <!-- 添加日期选择弹窗 -->
    <u-popup :show="showDatePopup" @close="closeDateSelect" mode="bottom" round="10">
      <view class="date-popup">
        <view class="popup-header">
          <text>选择日期</text>
          <text class="close-btn" @tap="closeDateSelect">关闭</text>
        </view>
        <view class="calendar-wrapper">
          <view class="month-selector">
            <text class="arrow" @tap="prevMonth">&lt;</text>
            <text class="current-month">{{ currentYear }}年{{ currentMonth + 1 }}月</text>
            <text class="arrow" @tap="nextMonth">&gt;</text>
          </view>
          <view class="week-header">
            <text v-for="day in weekDays" :key="day">{{ day }}</text>
          </view>
          <view class="days-grid">
            <view
              v-for="(day, index) in calendarDays"
              :key="index"
              :class="[
                'day-cell',
                {
                  'other-month': day.otherMonth,
                  selected: isSelectedDate(day.date),
                  today: isToday(day.date),
                },
              ]"
              @tap="selectDate(day)"
            >
              <text class="date">{{ day.dayOfMonth }}</text>
              <text class="price">{{ day.price && day.price !== '0.0' ? '' + '￥' + day.price : '' }}</text>
            </view>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import RouteCard from '@/components/RouteCard.vue'
import { mockHotRoutes, mockChannelRoutes, mockBanners } from '@/utils/mock'
import { countries } from '@/utils/countries'
import { getAction } from '@/common/store/manage'
import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
// 数据定义
const show = ref(false)
const channels = [
  { value: '1', name: '海运' },
  { value: '2', name: '空运' },
  { value: '3', name: '铁路' },
  { value: '4', name: '卡航' },
]
const currentChannel = ref('全部')
const selectedChannel = ref('1')

// 日期相关
const selectedDate = ref('')
const showDatePopup = ref(false)
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth())
const weekDays = ['日', '一', '二', '三', '四', '五', '六']
const datePrices = ref([]) // 存储日期价格数据

// 其他数据定义
const hotRoutes = ref([])
const channelRoutes = ref([])
const banners = ref(mockBanners)
const searchHeight = '60vh'

const getSrcAndDstList = () => {
  getAction('/tms/shift/getSrcAndDstList', {
    dstPort: selectedDest.value.isoCode,
    srcPort: selectedOrigin.value.isoCode,
  }).then((res) => {
    if (res.success) {
      if (selectType.value === 'origin') {
        countryListRef.value = res.result.srcPortList
      } else {
        countryListRef.value = res.result.dstPortList
      }
    }
  })
}

// 获取日期价格
const getDatePrice = () => {
  // 构建查询的年月
  const date = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}`

  getAction('/tms/shift/getByDateRange', {
    date: date,
    channel: selectedChannel.value,
    srcPort: selectedOrigin.value.isoCode,
    dstPort: selectedDest.value.isoCode,
  }).then((res) => {
    if (res.success) {
      datePrices.value = res.result || []
      console.log('价格列表', datePrices.value)
    }
  })
}
// 下拉刷新
onPullDownRefresh(() => {
  loadHot()
})
// 计算日历天数
const calendarDays = computed(() => {
  const days = []
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)

  // 添加上月剩余天数
  const firstDayWeek = firstDay.getDay()
  if (firstDayWeek > 0) {
    const prevLastDay = new Date(currentYear.value, currentMonth.value, 0)
    for (let i = firstDayWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(currentYear.value, currentMonth.value - 1, prevLastDay.getDate() - i),
        dayOfMonth: prevLastDay.getDate() - i,
        otherMonth: true,
      })
    }
  }

  // 添加本月天数
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const currentDate = new Date(currentYear.value, currentMonth.value, i)
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0') // 补零
    const day = String(currentDate.getDate()).padStart(2, '0') // 补零
    const dateString = `${year}-${month}-${day}`
    const priceData = datePrices.value.find((item) => item.date === dateString)
    days.push({
      date: currentDate,
      dayOfMonth: i,
      otherMonth: false,
      price: priceData?.price || null,
      channelDict: priceData?.channelDict,
      srcPortDict: priceData?.srcPortDict,
      dstPortDict: priceData?.dstPortDict,
    })
  }

  // 添加下月开始天数
  const remainingDays = 42 - days.length // 保持6行日历
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: new Date(currentYear.value, currentMonth.value + 1, i),
      dayOfMonth: i,
      otherMonth: true,
    })
  }

  return days
})

// 日期相关方法
const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentYear.value--
    currentMonth.value = 11
  } else {
    currentMonth.value--
  }
  getDatePrice()
}

const getShowImage = () => {
  getAction('/app/auth/checkValid').then((res) => {
    if (res.success) {
      show.value = res.result
    }
  })
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentYear.value++
    currentMonth.value = 0
  } else {
    currentMonth.value++
  }
  getDatePrice()
}

const selectDate = (day) => {
  if (!day.otherMonth) {
    selectedDate.value = (() => {
      const date = day.date
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0') // 补零
      const dayOfMonth = String(date.getDate()).padStart(2, '0') // 补零

      return `${year}-${month}-${dayOfMonth}`
    })()
    showDatePopup.value = false
  }
}

const closeDateSelect = () => {
  showDatePopup.value = false
}

// 日期工具方法
const isToday = (date) => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

const isSelectedDate = (date) => {
  return date.toISOString().split('T')[0] === selectedDate.value
}

const handleSearch = () => {
  console.log('查询参数', selectedOrigin.value, selectedDest.value, selectedDate.value)
  if (!selectedOrigin.value.isoCode) {
    uni.showToast({
      title: '请选择起始地',
      duration: 1000,
      icon: 'none',
    })
    return
  } else if (!selectedDest.value.isoCode) {
    uni.showToast({
      title: '请选择目的地',
      duration: 1000,
      icon: 'none',
    })
    return
  } else if (!selectedDate.value) {
    uni.showToast({
      title: '请选择日期',
      duration: 1000,
      icon: 'none',
    })
    return
  }

  // 保存搜索参数到缓存
  uni.setStorageSync('searchOrigin', selectedOrigin.value)
  uni.setStorageSync('searchDestination', selectedDest.value)
  uni.setStorageSync('searchDate', selectedDate.value)
  uni.setStorageSync('searchChannel', selectedChannel.value)
  // 跳转到搜索结果页
  uni.navigateTo({
    url: '/pages/search/result',
  })
}

const viewAllHotRoutes = () => {
  uni.navigateTo({
    url: '/pages/routes/hot',
  })
}

const viewRouteDetail = (route) => {
  uni.setStorageSync('routeInfo', route)
  uni.navigateTo({
    url: `/pages/routes/detail`,
  })
}

const viewRouteWebview = () => {
  uni.navigateTo({
    url: `/pages/index/webview`,
  })
}

const switchChannel = (channel) => {
  currentChannel.value = channel.value
  channelRoutes.value = mockChannelRoutes[channel.name]
}

// 图片加载成功
const onImageLoad = (e) => {
  console.log('图片加载成功')
}

// 图片加载失败
const onImageError = (e) => {
  console.error('图片加载失败', e)
  // 可以在里设置一默认
}

const loadHot = () => {
  getAction('/tms/shift/getHot').then((res) => {
    if (res.success) {
      hotRoutes.value = res.result
      setTimeout(() => {
        uni.stopPullDownRefresh()
      }, 1000)
    }
  })
}

// 生命周期
onMounted(() => {
  // 加载热门路线

  // 加载默认渠道路线（全部）
  channelRoutes.value = mockChannelRoutes['全部']

  loadHot()

  getDatePrice()

  getShowImage()
})

const onChannelSelect = (channel) => {
  selectedChannel.value = channel.value
}

// 国家数据
const countryListRef = ref(countries)

// 选择器状态
const showCountryPopup = ref(false)
const selectType = ref('origin') // 'origin' 或 'dest'
const scrollTop = ref(0)

// 选中的国家
const selectedOrigin = ref({})
const selectedDest = ref({})

// 搜索相关
const searchKeyword = ref('')

// 显示选择器
const showCountrySelect = (type) => {
  selectType.value = type
  getSrcAndDstList()
  showCountryPopup.value = true
}

// 关闭选择器 (合并两个closeCountrySelect函数的功能)
const closeCountrySelect = () => {
  showCountryPopup.value = false
  searchKeyword.value = '' // 清空搜索关键词
}

// 选择国家
const selectCountry = (country) => {
  if (selectType.value === 'origin') {
    selectedOrigin.value = country
  } else {
    selectedDest.value = country
  }
  closeCountrySelect()
}

// 搜索结果列表
const filteredCountries = computed(() => {
  if (!searchKeyword.value) return []

  const keyword = searchKeyword.value.toLowerCase()
  const results = []

  // 遍历所有国家进行搜索

  countryListRef.value.forEach((country) => {
    if (country.name.toLowerCase().includes(keyword) || country.isoCode.toLowerCase().includes(keyword)) {
      results.push(country)
    }
  })

  return results
})

// 搜索框变化处理
const onSearchChange = (value) => {
  searchKeyword.value = value
}

// 监听起始地和目的地的变化
watch([selectedOrigin, selectedDest], () => {
  getDatePrice()
})

// 显示日期选择器
const showDateSelect = () => {
  showDatePopup.value = true
}

// 格式化日期，避免非法选择器
const formatDate = (date) => {
  if (typeof date === 'string') {
    date = new Date(date)
  }
  return date.toISOString().split('T')[0]
}

// 使用时
const scrollToDate = (date) => {
  const formattedDate = formatDate(date)
  uni.pageScrollTo({
    selector: `#date-${formattedDate}`,
    duration: 300,
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.container {
  background-color: #f6f6f6;
  padding: 0rpx 0rpx;
  min-height: 100vh;
  overflow-x: hidden;
}

.search-section {
  position: relative;
  margin: -20rpx -20rpx 0;
  overflow: hidden;

  .banner-swiper {
    width: 100%;
    height: 65%;

    .banner-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      // transform: scale(1.1);
      // transition: opacity 0.3s ease;
      &.loading {
        opacity: 0;
      }
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 50%;
        // background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3) 30%, rgba(0, 0, 0, 0.7));
      }
    }
    .banner-tip {
      position: absolute;
      left: 60rpx;
      color: #fff;
      top: 7vh;
      display: flex;
      flex-direction: row;
      .tip1 {
        padding: 0rpx 20rpx;
        border-right: 1px solid rgba(255, 255, 255, 0.6);
      }
      .tip2 {
        padding: 0rpx 20rpx;
      }
    }
    .banner-title {
      text-align: center;
      font-style: normal;

      font-family: 'CustomFont';
      position: absolute;
      left: 60rpx;
      top: 11vh;
      color: #fff;
      font-size: 56rpx;
      // font-weight: bold;
      text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
      z-index: 1;
      opacity: 0;
      transform: translateY(20rpx);
      animation: fadeInUp 0.5s forwards;
      padding: 10rpx 0rpx;
      border-top: 1px solid rgba(255, 255, 255, 0.6);
      border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    }
  }

  .channel-container {
    position: relative;
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;
    justify-content: space-between;
    z-index: 2;
    pointer-events: auto;
    height: 120rpx;
    .channel-tabs {
      position: absolute;
      background-color: #f8f9f8;
      border-top-left-radius: 20rpx;
      border-top-right-radius: 20rpx;
      left: 0rpx;
      right: 0rpx;
      bottom: 0rpx;
      display: flex;
      width: 100%;
      // justify-content: space-between;
      z-index: 2;
      pointer-events: auto;
      height: 100rpx;
      .tab-item {
        position: relative;
        flex: 1;
        height: 100rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        // transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        .tab-text {
          position: relative;
          z-index: 2;
          color: rgba(0, 0, 0, 0.8);
          font-size: 30rpx;
          transition: all 0.3s ease;
        }

        .tab-bg {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          flex: 1;
          height: 100%;
          // background: rgba(255, 255, 255, 0.2);
          border-top-left-radius: 20rpx;
          border-top-right-radius: 20rpx;
          // box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
          transform-origin: bottom;
          // transform: scaleY(0);
          // transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        // &.active {
        //   flex-grow: 2; /* 选中的tab变宽 */
        //   background-image: url('http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/海运卡航选中_1734419031377.png');
        //   background-size: contain; /* 背景图片填充整个容器，可能会裁剪部分内容 */
        //   background-repeat: no-repeat;
        //   background-position: center;
        //   height: 160rpx;
        //   bottom: 20px;
        //   .tab-text {
        //     color: #181818;
        //     font-weight: bold;
        //     font-size: 32rpx;
        //   }

        // }
      }
    }
  }
  .channel-container .channel-tabs .tab-item.active {
    flex-grow: 1.8;
    background-image: url('http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/海运卡航选中_1734419031377.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 160rpx;
    bottom: 20px;
    .tab-text {
      color: $theme-color;
      font-weight: bold;
      font-size: 32rpx;
    }
  }

  .channel-container .channel-tabs .tab-item:first-child.active {
    flex-grow: 1.5;
    background-image: url('http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/空运选中_1734937528784.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 160rpx;
    bottom: 20px;
    .tab-text {
      color: $theme-color;
      font-weight: bold;
      font-size: 32rpx;
    }
  }
  .channel-container .channel-tabs .tab-item:nth-child(4).active {
    flex-grow: 1.5;
    background-image: url('http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/铁路选中_1734937737303.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 160rpx;
    bottom: 20px;
    .tab-text {
      color: $theme-color;
      font-weight: bold;
      font-size: 32rpx;
    }
  }
  .search-bar {
    position: absolute;
    left: 20rpx;
    right: 20rpx;
    top: 25vh;
    border-radius: 16rpx;
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    // box-shadow: 0rpx 4rpx rgba(0, 0, 0, 0.1);
    margin-top: 40rpx;
    height: 30vh;
  }
}
.location-row {
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 20rpx;
  width: 80%;
  border: 1px #e4e4e4 solid;
  border-radius: 20rpx;
  padding: 20rpx;

  .location {
    flex: 1;
    font-size: 28rpx;
    color: rgba(0, 0, 0, 0.8);
    padding: 10rpx 20rpx;
  }

  .divider {
    font-size: 20px;
    color: #e4e4e4;
    margin: 0 20rpx;
  }
}

.date-row {
  margin-bottom: 30rpx;
  text-align: center;

  .date {
    font-size: 28rpx;
    color: #666;
  }
}

.search-btn {
  width: 80%;
  height: 88rpx;
  line-height: 88rpx;

  background: linear-gradient(90deg, #ffce5e 0%, #ffb200 100%);

  color: #fff;
  border-radius: 44rpx;
  font-size: 32rpx;
}
.section {
  margin-top: 30rpx;
  width: 92%;
  margin: 0 auto;
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;

    .section-title {
      font-size: 32rpx;
      font-weight: bold;
    }

    .more {
      color: #666;
      font-size: 28rpx;
    }
  }
}

// .route-scroll {
//   white-space: nowrap;

//   .route-cards {
//     display: inline-flex;

//     padding-top: 30rpx;
//     .route-card {
//       margin-right: 20rpx;
//     }
//   }
// }

.channel-tabs {
  display: flex;

  .tab-item {
  }
}

.route-list {
  display: flex;
  flex-direction: column;
  .route-card {
    margin-bottom: 20rpx;
  }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.country-popup {
  height: 80vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1px solid #eee;

    text {
      font-size: 32rpx;
    }

    .close-btn {
      color: #666;
    }
  }

  .search-box {
    padding: 20rpx 30rpx;
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .country-list {
    flex: 1;
    height: 0; // 配合flex:1实现滚动
    overflow-y: auto;
  }
}

.date-popup {
  background-color: #fff;
  padding-bottom: 40rpx;

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1px solid #eee;

    text {
      font-size: 32rpx;
    }

    .close-btn {
      color: #666;
    }
  }

  .calendar-wrapper {
    padding: 20rpx 0rpx;

    .month-selector {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 40rpx;

      .current-month {
        font-size: 32rpx;
        font-weight: bold;
      }

      .arrow {
        font-size: 36rpx;
        color: #666;
        padding: 10rpx 20rpx;
      }
    }

    .week-header {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      padding: 20rpx 0;
      border-bottom: 1px solid #eee;

      text {
        font-size: 28rpx;
        color: #999;
      }
    }

    .days-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2rpx;
      background-color: #f8f8f8;

      .day-cell {
        aspect-ratio: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        padding: 10rpx;

        &.other-month {
          color: #ccc;
          .price {
            color: #ddd;
          }
        }

        &.selected {
          background-color: #007aff;
          color: #fff;
          .price {
            color: #fff;
          }
        }

        &.today {
          .date {
            color: #007aff;
            font-weight: bold;
          }
        }

        .date {
          font-size: 28rpx;
          margin-bottom: 6rpx;
        }

        .price {
          font-size: 24rpx;
          color: #ff6b6b;
        }
      }
    }
  }
}
@font-face {
  font-family: 'CustomFont'; /* 给字体起一个名字 */
  src: url('/styles/YouSheBiaoTiHei-2.ttf') format('truetype'); /* 引入 .ttf 文件 */
  font-weight: normal; /* 设置字体权重（可选） */
  font-style: normal; /* 设置字体样式（可选） */
}
</style>
