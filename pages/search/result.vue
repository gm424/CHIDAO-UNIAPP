<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <view class="custom-navbar">
      <view class="navbar-left" @tap="goBack">
        <u-icon name="arrow-left" color="#333" size="20"></u-icon>
      </view>
      <view class="route-info" @tap="showLocationSelect">
        <text class="city">{{ selectedOrigin.name }}</text>
        <!-- <image
          class="double-arrow"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNDAgMjRMMzIgMTZNNDAgMjRMMzIgMzJNNDAgMjRIOE04IDI0TDE2IDE2TTggMjRMMTYgMzIiIHN0cm9rZT0iIzY2NiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1kYXNoYXJyYXk9IjQgNCIvPjwvc3ZnPg=="
          mode="aspectFit"
        /> -->
        <text style="margin: 0 5rpx"> - </text>
        <text class="city">{{ selectedDest.name }}</text>
        <text class="iconfont icon-down"></text>
      </view>
      <view class="navbar-right"></view>
    </view>

    <!-- 搜索条件展示和修改区 -->
    <view class="search-header">
      <view class="search-info">
        <view class="date-selector">
          <view class="date-header">
            <scroll-view scroll-x class="date-scroll" :scroll-into-view="'date-' + searchParams.date">
              <view class="date-list">
                <view
                  v-for="date in dateList"
                  :key="date.value"
                  :id="'date-' + date.value"
                  :class="['date-item', date.value === searchParams.date ? 'active' : '']"
                  @tap="switchDate(date.value)"
                >
                  <text class="date">{{ date.month }}-{{ date.day }}</text>
                  <text class="weekday">{{ date.weekday }}</text>
                  <text class="full-date">￥{{ date.amount === 0 ? '--' : date.amount }}</text>
                </view>
              </view>
            </scroll-view>
            <view class="calendar-icon" @tap="showDateSelect">
              <image
                class="calendar-img"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCA0NEg0NEg0Wk00IDEwSDQ0SDRaTTQgNFY0NEg0NFY0SDRaTTM4IDRWMTBWNFpNMTAgNFYxMFY0Wk00IDE4SDQ0SDRaTTE2IDI0SDMySDI2VjQwSDE2VjI0WiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg=="
                mode="aspectFit"
              />
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 地点选择弹窗 -->
    <u-popup :show="showLocationPopup" @close="closeLocationSelect" mode="top">
      <view class="location-popup">
        <view class="popup-header">
          <text>修改地点</text>
          <text class="close-btn" @tap="closeLocationSelect">关闭</text>
        </view>
        <!-- 添加渠道切换组件 -->
        <view class="channel-selector">
          <view
            v-for="(item, index) in channelOptions"
            :key="index"
            class="channel-item"
            :class="{ active: searchParams.channel === item.value }"
            @tap="handleChannelChange(item.value)"
          >
            <u-icon
              :name="item.icon"
              size="24"
              :color="searchParams.channel === item.value ? '#ffb715' : '#666'"
            ></u-icon>
            <text>{{ item.label }}</text>
          </view>
        </view>
        <view class="location-form">
          <view class="form-item">
            <text class="label">起始地</text>
            <view class="input" @tap="showCountrySelect('origin')">
              <text>{{ selectedOrigin.name || '请选择' }}</text>
              <text class="iconfont icon-right"></text>
            </view>
          </view>
          <view class="form-item">
            <text class="label">目的地</text>
            <view class="input" @tap="showCountrySelect('dest')">
              <text>{{ selectedDest.name || '请选择' }}</text>
              <text class="iconfont icon-right"></text>
            </view>
          </view>
          <button class="confirm-btn" @tap="confirmLocationSelect">确认</button>
        </view>
      </view>
    </u-popup>

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

    <!-- 搜索结果列表 -->
    <view class="result-list">
      <route-card
        v-for="route in searchResults"
        :key="route.id"
        :route="route"
        :show-actions="true"
        @tap="viewRouteDetail(route)"
      />
    </view>

    <!-- 无数据提示 -->
    <view v-if="searchResults.length === 0" class="empty-state">
      <text>暂无符合条件的路线</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import RouteCard from '@/components/RouteCard.vue'
import { mockChannelRoutes } from '@/utils/mock'
import { countries as countryList } from '@/utils/countries'
import { getAction } from '@/common/store/manage'
import { object } from 'uview-plus/libs/function/test'
// 搜索参数
const searchParams = ref({
  channel: '',
  srcPort: '',
  dstPort: '',
  date: '',
})

// 地点选择相关
const showLocationPopup = ref(false)
const showCountryPopup = ref(false)
const selectedOrigin = ref({})
const selectedDest = ref({})
const selectType = ref('')
const datePrices = ref([])
const dateList = ref([])
// 国家列表
const countryListRef = ref(countryList)
// 搜索相关
const searchKeyword = ref('')
// 生成日期列表
const generateDateList = async (centerDate) => {
  const date = new Date(centerDate)
  const dateListArr = []

  // 向前3天
  for (let i = 3; i > 0; i--) {
    const d = new Date(date)
    d.setDate(d.getDate() - i)

    dateListArr.push(await formatDateObj(d))
  }
  // 当天

  dateListArr.push(await formatDateObj(date))

  // 向后3天
  for (let i = 1; i <= 3; i++) {
    const d = new Date(date)
    d.setDate(d.getDate() + i)

    dateListArr.push(await formatDateObj(d))
  }

  dateList.value = dateListArr
  getRouteList()
  console.log('dateList', dateList.value)
}
const formatDateObj = async (date3) => {
  const year = date3.getFullYear()
  const month = String(date3.getMonth() + 1).padStart(2, '0')
  const day = String(date3.getDate()).padStart(2, '0')
  const weekDays2 = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const weekday = weekDays2[date3.getDay()]
  const amount = await loadDatesPrice(`${year}-${month}-${day}`)
  console.log('计算', date3, amount)
  return {
    weekday,
    month,
    day,
    amount,
    value: `${year}-${month}-${day}`,
  }
}
// 日期选择列表

// 搜索结果
const searchResults = ref([])

// 切换日期
const switchDate = (date) => {
  searchParams.value.date = date
  // 重新搜索
  getRouteList()
}
const loadDatesPrice = async (date) => {
  let params = {
    date: date,
    channel: searchParams.value.channel,
    srcPort: selectedOrigin.value.isoCode,
    dstPort: selectedDest.value.isoCode,
  }
  let minPrice = ''
  let priceList = await getAction('/tms/shift/getByDate', params)
  let arr = priceList.result.map((item) => item.lowPrice)
  minPrice = arr.length > 0 ? Math.min(...arr) : 0
  console.log('priceList', priceList, minPrice)
  return minPrice
}
// 显示地点选择
const showLocationSelect = () => {
  showLocationPopup.value = true
}

// 关闭地点选择
const closeLocationSelect = () => {
  showLocationPopup.value = false
}

// 显示国家选择
const showCountrySelect = (type) => {
  selectType.value = type
  getSrcAndDstList()
  showCountryPopup.value = true
}

// 关闭国家选择
const closeCountrySelect = () => {
  showCountryPopup.value = false
  searchKeyword.value = ''
}

// 选择国家
const selectCountry = (country) => {
  if (selectType.value === 'origin') {
    selectedOrigin.value = country
  } else {
    selectedDest.value = country
  }
  console.log('选择', selectType.value, country, searchParams.value)
  closeCountrySelect()
}
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
// 确认地点选择
const confirmLocationSelect = () => {
  searchParams.value.srcPort = selectedOrigin.value.isoCode
  searchParams.value.dstPort = selectedDest.value.isoCode

  console.log('确定', searchParams.value, selectedOrigin.value, selectedDest.value)
  closeLocationSelect()
  generateDateList(searchParams.value.date)
  getRouteList()
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
// 查看路线详情
const viewRouteDetail = (route) => {
  uni.setStorageSync('routeInfo', route)
  uni.navigateTo({
    url: `/pages/routes/detail`,
  })
}

const getRouteList = () => {
  getAction('/tms/shift/getByDate', searchParams.value).then((res) => {
    console.log('加载路线')
    if (res.success) {
      searchResults.value = res.result
      searchResults.value = Object.assign(searchResults.value, res.result)
    }
  })
}

// 日期选择相关
const showDatePopup = ref(false)
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth())
const weekDays = ['日', '一', '二', '三', '四', '五', '六']

// 显示日期选择
const showDateSelect = () => {
  showDatePopup.value = true
  getDatePrice()
}

// 关闭日期选择
const closeDateSelect = () => {
  showDatePopup.value = false
}

const getDatePrice = () => {
  // 构建查询的年月
  const date = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}`

  getAction('/tms/shift/getByDateRange', {
    date: date,
    channel: searchParams.value.channel,
    srcPort: selectedOrigin.value.isoCode,
    dstPort: selectedDest.value.isoCode,
  }).then((res) => {
    if (res.success) {
      datePrices.value = res.result || []
      console.log('价格列表', datePrices.value)
    }
  })
}

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

// 切换月份
const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentYear.value--
    currentMonth.value = 11
  } else {
    currentMonth.value--
  }
  getDatePrice()
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

// 日期选择
const selectDate = (day) => {
  if (!day.otherMonth) {
    const date = formatDate(day.date)
    searchParams.value.date = date
    closeDateSelect()
    generateDateList(date)
    switchDate(date)
  }
}

// 格式化日期
const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 判断是否是选中日期
const isSelectedDate = (date) => {
  return formatDate(date) === searchParams.value.date
}

// 判断是否是今天
const isToday = (date) => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 渠道选项
const channelOptions = [
  { label: '海运', value: '1', icon: 'car' },
  { label: '空运', value: '2', icon: 'car' },
  { label: '铁路', value: '3', icon: 'car' },
  { label: '卡航', value: '4', icon: 'car' },
]

// 处理渠道切换
const handleChannelChange = (value) => {
  searchParams.value.channel = value
}

onMounted(() => {
  // 从缓存获取搜索参数
  const srcPort = uni.getStorageSync('searchOrigin')
  const dstPort = uni.getStorageSync('searchDestination')
  const date = uni.getStorageSync('searchDate')
  const channel = uni.getStorageSync('searchChannel')
  // 保存搜索参数到缓存

  if (srcPort && dstPort && date) {
    searchParams.value.srcPort = srcPort.isoCode
    searchParams.value.dstPort = dstPort.isoCode

    searchParams.value.date = date
    searchParams.value.channel = channel

    // 初始化选中的地点
    selectedOrigin.value = { isoCode: srcPort.isoCode, name: srcPort.name }
    selectedDest.value = { isoCode: dstPort.isoCode, name: dstPort.name }

    // 生成日期列表并自动滚动到选中日期
    generateDateList(date)
    nextTick(() => {
      uni
        .createSelectorQuery()
        .select(`#date-${date}`)
        .boundingClientRect((rect) => {
          if (rect) {
            const scrollView = uni.createSelectorQuery().select('.date-scroll')
            scrollView.scrollOffset({
              scrollLeft: rect.left - 100,
              duration: 300,
            })
          }
        })
        .exec()
    })
  }
  console.log('参数', searchParams.value, srcPort)
  // 执行搜索
  getRouteList()
  getDatePrice()
})
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.container {
  padding-top: 430rpx;
  background-color: #f9f9f9;
  min-height: 100vh;

  position: relative;
}

.custom-navbar {
  position: fixed;
  padding-top: 60rpx;
  top: 0;
  left: 0;
  right: 0;
  height: 160rpx;
  background: #fff;
  display: flex;
  align-items: center;
  z-index: 100;

  .navbar-left {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .navbar-title {
    flex: 1;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }

  .navbar-right {
    width: 44px;
    height: 44px;
  }
}

// 内容区域需要下移,避免被导航栏遮挡
.content {
  margin-top: 44px;
}
.route-info {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  position: relative;
  padding: 20rpx;

  .city {
    font-size: 32rpx;
    font-weight: bold;
  }

  .double-arrow {
    width: 48rpx;
    height: 32rpx;
    margin: 0 30rpx;
  }

  .icon-down {
    font-size: 24rpx;
    color: #666;
    margin-left: 10rpx;
  }
}
.search-header {
  background: #f9f9f9;
  padding: 20rpx;
  position: fixed;
  top: 220rpx;
  border-radius: 16rpx;
  width: 95%;
  z-index: 999;

  .search-info {
    background: #fff;
    border-radius: 20rpx;
    padding: 20rpx 0 20rpx 20rpx;
    .date-selector {
      .date-header {
        display: flex;
        align-items: center;

        .date-scroll {
          flex: 1;
          width: 0;
          padding-right: 20rpx;
          border-right: 1px solid #f2f2f2;
          .date-list {
            display: flex;

            .date-item {
              min-width: 100rpx;
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 10rpx 0rpx;
              margin: 0 5rpx;
              border-radius: 8rpx;

              &.active {
                background: $theme-color;
                .weekday,
                .date {
                  color: #fff;
                }
                .full-date {
                  color: #fff;
                }
              }

              .weekday {
                font-size: 28rpx;
                color: #333;
              }

              .date {
                font-size: 24rpx;
                color: #666;
              }
            }
          }
        }

        .calendar-icon {
          flex-shrink: 0;
          width: 80rpx;
          text-align: center;
          height: 50rpx;
          .calendar-img {
            width: 40rpx;
            height: 40rpx;
            margin: 3rpx auto;
          }
        }
      }
    }
  }
}

.location-popup {
  background: #fff;
  padding: 60rpx 30rpx;

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;

    text {
      font-size: 32rpx;
    }

    .close-btn {
      color: #666;
    }
  }

  .location-form {
    .form-item {
      margin-bottom: 20rpx;

      .label {
        font-size: 28rpx;
        color: #333;
        margin-bottom: 10rpx;
        display: block;
      }

      .input {
        background: #f5f5f5;
        padding: 20rpx;
        border-radius: 8rpx;
        font-size: 28rpx;
      }
    }

    .confirm-btn {
      margin-top: 30rpx;
      background: #007aff;
      color: #fff;
      border-radius: 8rpx;
    }
  }
}

.result-list {
  padding: 30rpx 20rpx;
  margin: 0rpx auto;

  .route-card {
    margin-bottom: 20rpx;
  }
}

.empty-state {
  text-align: center;
  // padding: 100rpx 0;
  color: #999;
  font-size: 28rpx;
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

.channel-selector {
  background: #fff;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
  display: flex;
  width: 100%;

  .channel-item {
    flex: 1;
    display: inline-flex;
    align-items: center;
    padding: 6rpx 10rpx;
    margin-right: 10rpx;
    border-radius: 30rpx;
    background: #f8f8f8;
    transition: all 0.3s;
    justify-content: center;
    display: flex;
    &:last-child {
      margin-right: 0;
    }

    text {
      font-size: 26rpx;
      color: #666;
      margin-left: 8rpx;
    }

    &.active {
      background: rgba(255, 183, 21, 0.1);

      text {
        color: #ffb715;
        font-weight: 500;
      }
    }
  }
}

// 修改原有样式以适应新增的渠道选择器
.search-result {
  padding-top: 180rpx; // 增加顶部内边距，为渠道选择器留出空间
}
</style>
