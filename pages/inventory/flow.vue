<template>
  <view class="container">
    <!-- 日期选择区域 -->
    <view class="date-picker-section">
      <view class="date-display" @tap="showCalendar">
        <text class="selected-date">{{ formatDate(selectedDate) }}</text>
        <u-icon name="calendar" size="24" color="#666"></u-icon>
      </view>
    </view>

    <!-- 搜索区域 -->
    <view class="search-section">
      <view class="search-box">
        <u-search
          v-model="searchKeyword"
          placeholder="搜索流水描述"
          :show-action="false"
          :clearabled="true"
          @change="handleSearch"
          @clear="handleClear"
        >
          <template #prefix>
            <u-icon name="search" size="30" color="#909399"></u-icon>
          </template>
        </u-search>
      </view>
    </view>

    <!-- 日历选择弹窗 -->
    <u-datetime-picker
      :show="showDatePicker"
      v-model="selectedDate"
      mode="year-month"
      :min-date="minDate.getTime()"
      :max-date="maxDate.getTime()"
      @confirm="onDateConfirm"
      @cancel="showDatePicker = false"
    ></u-datetime-picker>

    <!-- 流水记录 -->
    <view class="records-section">
      <!-- <view class="section-header">
        <text class="title">库存流水</text>
        <view class="filter-group">
          <view
            v-for="(item, index) in filterOptions"
            :key="index"
            class="filter-item"
            :class="{ active: currentFilter === item.value }"
            @tap="handleFilterChange(item.value)"
          >
            {{ item.label }}
          </view>
        </view>
      </view> -->

      <view class="record-list">
        <view v-for="(item, index) in recordsList" :key="index" class="record-item">
          <view class="record-header">
            <view class="left">
              <text class="type" :class="item.type">{{ item.sku }}</text>
            </view>
            <text class="amount" :class="item.type" :style="{ color: item.usableCount >= 0 ? '#00B578' : ' #FA5151' }">
              <text style="font-size: 26rpx">良品变动</text
              >{{ item.usableCount >= 0 ? '+' + item.usableCount : item.usableCount }}
            </text>
          </view>
          <view class="record-content">
            <view class="info-item">
              <text class="value">{{ item.batchNo }}</text>
            </view>
            <view class="info-item">
              <text class="value">{{ item.createTime }}</text>
            </view>
          </view>
          <view class="record-content">
            <view class="info-item">
              <text class="value">{{ item.description }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 加载状态 -->
      <view class="loading-more" v-if="loading">
        <u-loading-icon></u-loading-icon>
        <text>加载中...</text>
      </view>
      <view class="no-more" v-if="!hasMore && recordsList.length > 0">
        <text>没有更多数据了</text>
      </view>

      <!-- 空状态 -->
      <view v-if="recordsList.length === 0 && !loading" class="empty-state">
        <u-empty mode="data" text="无流水记录"></u-empty>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import { getAction } from '@/common/store/manage'

const searchKeyword = ref('')
const recordsList = ref([])
const currentFilter = ref('Y')
const filterOptions = [
  { label: '控货', value: 'Y' },
  { label: '非控货', value: 'N' },
]
const pageNo = ref(1)
const pageSize = ref(10)
const total = ref(0)
const hasMore = ref(true)
const loading = ref(false)
const searchTimer = ref(null)

// 日期选择相关
const showDatePicker = ref(false)
const selectedDate = ref(Date.now())
const minDate = new Date('2020-01-01')
const maxDate = new Date()

// 获取流水列表
const getRecordList = async (type = 'more') => {
  loading.value = true
  try {
    const date = new Date(selectedDate.value)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const days = new Date(year, month, 0).getDate()
    const res = await getAction('/wms/stockRecord/list', {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      column: 'createTime',
      order: 'desc',
      description: searchKeyword.value ? '*' + searchKeyword.value + '*' : '',
      createTimeBegin: year + '-' + month + '-' + '01',
      createTimeEnd: year + '-' + month + '-' + days,
    })

    if (res.success) {
      if (type === 'refresh') {
        recordsList.value = res.result.records || []
      } else {
        recordsList.value = [...recordsList.value, ...(res.result.records || [])]
      }
      total.value = res.result.total
      hasMore.value = recordsList.value.length < total.value
    }
  } finally {
    loading.value = false
    if (type === 'refresh') {
      uni.stopPullDownRefresh()
    }
  }
}

// 处理筛选
const handleFilterChange = (value) => {
  currentFilter.value = value
  pageNo.value = 1
  getRecordList('refresh')
}

// 处理搜索
const handleSearch = () => {
  if (searchTimer.value) {
    clearTimeout(searchTimer.value)
  }
  searchTimer.value = setTimeout(() => {
    pageNo.value = 1
    getRecordList('refresh')
  }, 300)
}

// 清空搜索
const handleClear = () => {
  searchKeyword.value = ''
  pageNo.value = 1
  getRecordList('refresh')
}

// 上拉加载
onReachBottom(() => {
  if (!hasMore.value || loading.value) return
  pageNo.value++
  getRecordList()
})

// 下拉刷新
onPullDownRefresh(() => {
  pageNo.value = 1
  getRecordList('refresh')
})

// 显示日历选择器
const showCalendar = () => {
  showDatePicker.value = true
}

// 格式化日期显示
const formatDate = (timestamp) => {
  if (!timestamp) {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  }

  try {
    const date = new Date(Number(timestamp))
    if (isNaN(date.getTime())) {
      const now = new Date()
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    }
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${year}-${month}`
  } catch (error) {
    console.error('日期格式化错误:', error)
    const now = new Date()

    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  }
}

// 日期选择确认
const onDateConfirm = (e) => {
  selectedDate.value = Number(e.value)
  console.log('选择的时间戳:', selectedDate.value, e, formatDate(selectedDate.value))
  showDatePicker.value = false
  pageNo.value = 1
  getRecordList('refresh')
}

onMounted(() => {
  getRecordList('refresh')
})
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.container {
  min-height: 100vh;
  padding-bottom: 20rpx;
}

.date-picker-section {
  padding: 20rpx;
  background: #fff;

  .date-display {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80rpx;
    // background: #f5f7fa;
    border-radius: 12rpx;
    gap: 12rpx;

    .selected-date {
      font-size: 28rpx;
      color: #333;
      font-weight: 500;
    }

    &:active {
      opacity: 0.8;
    }
  }
}

.search-header {
  padding: 20rpx;
  background: #fff;
  border-top: 1rpx solid #eee;
}

.search-section {
  background: #fff;
  padding: 20rpx 30rpx;
  position: sticky;
  top: 0;
  z-index: 100;

  .search-box {
    :deep(.u-search) {
      padding: 10rpx;
      background: #f5f5f5;
      border-radius: 40rpx;
    }

    :deep(.u-search__content) {
      background: #f5f5f5;
      border-radius: 40rpx;
    }

    :deep(.u-search__input) {
      color: #333;
      font-size: 28rpx;
    }
  }
}

.records-section {
  padding: 20rpx;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;

    .title {
      font-size: 32rpx;
      font-weight: 600;
      color: #333;
    }

    .filter-group {
      display: flex;
      background: #f5f5f5;
      border-radius: 32rpx;
      padding: 4rpx;

      .filter-item {
        padding: 12rpx 24rpx;
        font-size: 26rpx;
        color: #666;
        border-radius: 28rpx;

        &.active {
          background: #fff;
          color: $theme-color;
          box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
        }
      }
    }
  }

  .record-list {
    .record-item {
      background: #fff;
      border-radius: 16rpx;
      padding: 30rpx;
      border-bottom: 1px #f2f2f2 solid;
      margin-bottom: 20rpx;
      // box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

      .record-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16rpx;

        .type {
          font-size: 28rpx;
          color: #333;
          font-weight: 500;

          &.in {
            color: #00b578;
          }

          &.out {
            color: #fa5151;
          }
        }

        .amount {
          font-size: 32rpx;
          font-weight: 600;
        }
      }

      .record-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10rpx;
        .info-item {
          .value {
            font-size: 26rpx;
            color: #b1b0b0;
          }

          .label {
            font-size: 24rpx;
            color: #999;
          }
        }
      }
    }
  }
}

.loading-more,
.no-more {
  text-align: center;
  padding: 30rpx 0;
  color: #999;
  font-size: 24rpx;
}

.empty-state {
  padding-top: 200rpx;
}
</style>
