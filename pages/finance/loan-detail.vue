<template>
  <view class="container">
    <!-- 添加搜索区域 -->
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

    <!-- 统计卡片 -->
    <!-- <view class="stat-cards">
      <view class="stat-card">
        <text class="label">累计借款</text>
        <text class="value">¥1,280,000</text>
        <view class="trend up">
          <u-icon name="arrow-up" size="12"></u-icon>
          <text>12.5%</text>
        </view>
      </view>
      <view class="stat-card">
        <text class="label">待还金额</text>
        <text class="value">¥356,000</text>
        <view class="trend down">
          <u-icon name="arrow-down" size="12"></u-icon>
          <text>8.3%</text>
        </view>
      </view>
    </view> -->

    <!-- 流水记录 -->
    <view class="records-section">
      <view class="section-header">
        <text class="title">借贷记录</text>
        <view class="filter-group">
          <view
            v-for="(item, index) in filterOptions"
            :key="index"
            class="filter-item"
            :class="{ active: currentFilter === item.value }"
            @tap="handleFilterChange(item.value)"
            >{{ item.label }}</view
          >
        </view>
      </view>

      <view class="record-list">
        <view v-for="(item, index) in recordsList" :key="index" class="record-item">
          <view class="record-header">
            <view class="left">
              <text class="type" :class="item.type">{{
                item.description.length > 15 ? item.description.slice(0, 15) + '...' : item.description
              }}</text>
            </view>
            <text class="amount" :class="item.type" :style="{ color: item.credit >= 0 ? '#FA5151' : '#00B578' }">{{
              item.credit >= 0 ? '+' + item.credit : item.credit
            }}</text>
          </view>
          <view class="record-content">
            <view class="info-item">
              <text class="value">{{ item.supplierId_dictText }}</text>
            </view>
            <view class="info-item">
              <text class="label">{{ item.createTime }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 加载更多 -->
      <view class="loading-more" v-if="recordsList.length > 0">
        <text v-if="loading">加载中...</text>
        <text v-else-if="!hasMore">没有更多了</text>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-if="recordsList.length === 0">
        <u-empty mode="order" text="暂无订单数据"></u-empty>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import { getAction } from '@/common/store/manage'
const currentFilter = ref('all')
const recordsList = ref([])
const filterOptions = [
  { label: '全部', value: 'all' },
  // { label: '借款', value: 'loan' },
  // { label: '还款', value: 'repayment' },
]
const pageNo = ref(1)
const pageSize = ref(10)
const total = ref(0)
const hasMore = ref(false)
const isRefreshing = ref(false)
const loading = ref(false)
const searchKeyword = ref('')
const searchTimer = ref(null)

const getRecordList = async (type) => {
  loading.value = true
  try {
    const res = await getAction('/wms/creditRecord/list', {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      column: 'createTime',
      order: 'desc',
      description: '*' + searchKeyword.value + '*',
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
  } catch (error) {
    console.error('加载订单列表失败:', error)
  } finally {
    loading.value = false
    isRefreshing.value = false
  }
}
const handleFilterChange = (value) => {
  currentFilter.value = value
  // TODO: 根据筛选加载数据
}

// 监听页面触底事件
onReachBottom(() => {
  if (!hasMore.value || loading.value) return
  pageNo.value++
  getRecordList()
})

// 添加下拉刷新处理
onPullDownRefresh(async () => {
  isRefreshing.value = true
  pageNo.value = 1
  await getRecordList('refresh')
  uni.stopPullDownRefresh()
})

// 初始化
onMounted(() => {
  getRecordList('refresh')
})

// 处理搜索
const handleSearch = () => {
  // 防抖处理
  if (searchTimer.value) {
    clearTimeout(searchTimer.value)
  }
  searchTimer.value = setTimeout(() => {
    pageNo.value = 1
    recordsList.value = []
    getRecordList('refresh')
  }, 300)
}

// 清空搜索
const handleClear = () => {
  searchKeyword.value = ''
  pageNo.value = 1
  recordsList.value = []
  getRecordList('refresh')
}

// 监听搜索关键词变化
watch(searchKeyword, (newVal) => {
  if (!newVal) {
    handleClear()
  }
})

// 组件卸载时清理定时器
onUnmounted(() => {
  if (searchTimer.value) {
    clearTimeout(searchTimer.value)
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.container {
  padding: 20rpx;
}

.stat-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  margin-bottom: 30rpx;

  .stat-card {
    background: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

    .label {
      font-size: 26rpx;
      color: #666;
      display: block;
      margin-bottom: 12rpx;
    }

    .value {
      font-size: 36rpx;
      color: #333;
      font-weight: bold;
      display: block;
      margin-bottom: 12rpx;
    }

    .trend {
      display: inline-flex;
      align-items: center;
      font-size: 24rpx;
      padding: 4rpx 12rpx;
      border-radius: 20rpx;

      &.up {
        color: #ff4d4f;
        background: rgba(255, 77, 79, 0.1);
      }

      &.down {
        color: #52c41a;
        background: rgba(82, 196, 26, 0.1);
      }
    }
  }
}

.records-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;

    .title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
    }

    .filter-group {
      display: flex;
      background: #f5f5f5;
      border-radius: 8rpx;
      padding: 4rpx;

      .filter-item {
        padding: 8rpx 20rpx;
        font-size: 24rpx;
        color: #666;
        border-radius: 6rpx;
        transition: all 0.3s;

        &.active {
          background: #fff;
          color: #2b5cff;
          box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
        }
      }
    }
  }

  .record-list {
    .record-item {
      padding: 20rpx 0;
      border-bottom: 2rpx solid #f5f5f5;

      &:last-child {
        border-bottom: none;
      }

      .record-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16rpx;

        .left {
          display: flex;
          align-items: center;
          gap: 12rpx;

          .type {
            font-size: 30rpx;
            color: #181818;
            border-radius: 6rpx;
            font-weight: 500;
            &.loan {
              color: #2b5cff;
              background: rgba(43, 92, 255, 0.1);
            }

            &.repayment {
              color: #52c41a;
              background: rgba(82, 196, 26, 0.1);
            }
          }

          .time {
            font-size: 24rpx;
            color: #999;
          }
        }

        .amount {
          font-size: 32rpx;
          font-weight: 550;

          &.loan {
            color: #2b5cff;
          }

          &.repayment {
            color: #52c41a;
          }
        }
      }

      .record-content {
        display: flex;
        flex-direction: row;

        justify-content: space-between;
        .info-item {
          .label {
            font-size: 24rpx;
            color: #999;
          }

          .value {
            margin-right: 10rpx;
            font-size: 26rpx;
            color: #8f92a1;
          }
        }
      }
    }
  }
}

// 添加搜索区域样式
.search-section {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  padding: 20rpx 30rpx;
  margin-bottom: 20rpx;

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

    :deep(.u-search__action) {
      font-size: 28rpx;
      color: $theme-color;
    }
  }
}

// 调整列表区域的上边距，为搜索框留出空间
.order-list {
  margin-top: calc(88rpx + 120rpx);
}
</style>
