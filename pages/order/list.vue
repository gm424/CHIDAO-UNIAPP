<template>
  <view class="container">
    <!-- 顶部搜索和筛选 -->
    <view class="header">
      <view class="search-bar">
        <u-search
          v-model="searchKeyword"
          placeholder="搜索订单号/入仓号"
          :show-action="false"
          @change="onSearch"
        ></u-search>
      </view>

      <!-- 状态筛选标签 -->
      <scroll-view scroll-x class="filter-tabs">
        <view
          v-for="item in statusList"
          :key="item.value"
          class="tab-item"
          :class="{ active: currentStatus === item.value }"
          @tap="switchStatus(item.value)"
        >
          {{ item.label }}
        </view>
      </scroll-view>
    </view>

    <!-- 订单列表 -->
    <view class="order-list">
      <view class="order-item" v-for="item in orderList" :key="item.id" @tap="goToDetail(item)">
        <!-- 订单头部 -->
        <view class="order-header">
          <view class="left">
            <text class="order-no">{{ item.sn }}</text>
            <text class="channel-tag">{{ item.channel_dictText }}</text>
          </view>
          <text class="status" :class="getStatusClass(item.status)">{{ item.status_dictText }}</text>
        </view>

        <!-- 订单信息 -->
        <view class="route-main">
          <view class="route-locations">
            <view class="location">
              <text class="city">{{ item.srcCountry_dictText }}</text>
              <text class="country-code">{{ item.srcCountry }}</text>
            </view>
            <view class="route-arrow">
              <image
                class="arrow-icon"
                src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/箭头_切换左_1734333007078.png"
                mode="aspectFit"
              />
              <text class="arrow-time">{{ item.referenceTimeCost }}</text>
            </view>
            <view class="location">
              <text class="city">{{ item.dstCountry_dictText }}</text>
              <text class="country-code">{{ item.dstCountry }}</text>
            </view>
          </view>
        </view>

        <view class="order-header">
          <view class="">
            <text class="entry-no" v-if="item.entryNo">入仓号：{{ item.entryNo }}</text>
            <text class="entry-no" v-if="item.entryNo">计费重(KG)：{{ item.chargingWeight }}</text>
          </view>
        </view>

        <!-- 订单底部 -->
        <view class="order-footer">
          <view class="time">{{ formatTime(item.createTime) }}</view>
          <view class="total"
            >总价：<text class="price">${{ item.totalValue }}</text></view
          >
        </view>
      </view>

      <!-- 加载更多 -->
      <view class="loading-more" v-if="orderList.length > 0">
        <text v-if="loading">加载中...</text>
        <text v-else-if="!hasMore">没有更多了</text>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-if="orderList.length === 0">
        <u-empty mode="order" text="暂无订单数据"></u-empty>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAction } from '@/common/store/manage'
import dayjs from 'dayjs'
import { onLoad } from '@dcloudio/uni-app'
import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
// 状态列表
const statusList = [
  { label: '全部', value: 'all' },
  { label: '新创建', value: '6' },
  { label: '执行中', value: '1,2,3,7,8' },
  { label: '已完成', value: '4' },
]

// 列表数据
const orderList = ref([])
const currentStatus = ref('6')
const searchKeyword = ref('')
const pageNo = ref(1)
const pageSize = ref(10)
const total = ref(0)
const hasMore = ref(true)
const loading = ref(false)
const isRefreshing = ref(false)
onLoad((options) => {
  currentStatus.value = options.status
  loadOrderList()
})
// 获取新创建订单列表
const loadOrderList = async (type = 'add') => {
  loading.value = true
  let url =
    currentStatus.value === '6' || currentStatus.value === 'all'
      ? '/tms/transOrder/listInquiryList'
      : '/tms/transOrder/list'

  try {
    const res = await getAction(
      url,
      Object.assign(
        {
          pageNo: pageNo.value,
          pageSize: pageSize.value,

          keyword: searchKeyword.value,
        },
        currentStatus.value === 'all' ? {} : { statusList: currentStatus.value }
      )
    )

    if (res.success) {
      if (type === 'refresh') {
        orderList.value = res.result.records || []
      } else {
        orderList.value = [...orderList.value, ...(res.result.records || [])]
      }
      total.value = res.result.total
      hasMore.value = orderList.value.length < total.value
    }
  } catch (error) {
    console.error('加载订单列表失败:', error)
  } finally {
    loading.value = false
    isRefreshing.value = false
  }
}

// 搜索
const onSearch = () => {
  pageNo.value = 1
  orderList.value = []
  hasMore.value = true
  loadOrderList('refresh')
}

// 切换状态
const switchStatus = (status) => {
  currentStatus.value = status
  pageNo.value = 1
  orderList.value = []
  hasMore.value = true
  loadOrderList('refresh')
}

// 下拉刷新
const onRefresh = async () => {
  isRefreshing.value = true
  pageNo.value = 1
  await loadOrderList('refresh')
}

// 上拉加载更多
const onLoadMore = async () => {
  if (!hasMore.value || loading.value) return
  pageNo.value++
  await loadOrderList()
}
// 监听页面触底事件
onReachBottom(() => {
  onLoadMore()
})

// 添加下拉刷新处理
onPullDownRefresh(async () => {
  onRefresh()
})
// 跳转详情
const goToDetail = (order) => {
  uni.setStorageSync('orderId', order.id)
  uni.navigateTo({
    url: `/pages/order/detail?id=${order.id}`,
  })
}

// 格式化时间
const formatTime = (time) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm')
}

// 获取状态样式
const getStatusClass = (status) => {
  const statusMap = {
    6: 'status-new',
    1: 'status-unpaid',
    2: 'status-paid',
    3: 'status-shipped',
    4: 'status-completed',
    5: 'status-cancelled',
  }
  return statusMap[status] || ''
}

onMounted(() => {
  loadOrderList('refresh')
})
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.container {
  min-height: 100vh;
  background: #f5f7fa;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #fff;
}

.search-bar {
  padding: 20rpx;
}

.filter-tabs {
  white-space: nowrap;
  padding: 0 20rpx;
  border-bottom: 1rpx solid #eee;
  display: flex;
  .tab-item {
    display: inline-block;
    padding: 20rpx 30rpx;
    font-size: 28rpx;
    color: #666;
    position: relative;
    width: 15%;
    &.active {
      color: $theme-color;
      font-weight: 500;

      &::after {
        content: '';
        position: absolute;
        left: 12%;
        bottom: 0;
        // transform: translateX(-50%);
        width: 90rpx;
        height: 4rpx;
        background: $theme-color;
        border-radius: 2rpx;
      }
    }
  }
}

.order-list {
  padding-top: 180rpx;
}

.order-item {
  margin: 20rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
}
.entry-no {
  font-size: 24rpx;
  color: #999;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 10rpx;
}
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;

  .left {
    display: flex;
    align-items: center;
    flex-direction: row;
    .order-no {
      font-size: 28rpx;
      font-weight: 500;
      color: #777676;
      margin-right: 20rpx;
      display: flex;
      align-items: center;
    }

    .channel-tag {
      background: #46c254;
      padding: 4rpx 12rpx;
      border-radius: 8rpx;
      align-items: center;
      display: flex;
      color: #fff;
      font-size: 22rpx;
      font-weight: bold;
    }
  }

  .status {
    font-size: 26rpx;

    border-radius: 20rpx;

    &.status-new {
      color: $theme-color;
      // background: rgba(43, 92, 255, 0.1);
    }

    &.status-unpaid {
      color: #52c41a;
      // background: rgba(255, 77, 79, 0.1);
    }

    &.status-paid {
      color: #1f8cd4;
      // background: rgba(82, 196, 26, 0.1);
    }

    &.status-shipped {
      color: #722ed1;
      // background: rgba(114, 46, 209, 0.1);
    }

    &.status-completed {
      color: #13c2c2;
      // background: rgba(19, 194, 194, 0.1);
    }

    &.status-cancelled {
      color: #999;
      // background: rgba(0, 0, 0, 0.05);
    }
  }
}

.order-info {
  background: #f8f9fa;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;

  .info-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16rpx;

    &:last-child {
      margin-bottom: 0;
    }

    .label {
      font-size: 26rpx;
      color: #666;
    }

    .value {
      font-size: 26rpx;
      color: #333;
    }
  }
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20rpx;
  border-top: 1rpx solid #f5f5f5;

  .time {
    font-size: 24rpx;
    color: #999;
  }

  .total {
    font-size: 26rpx;
    color: #666;

    .price {
      font-size: 32rpx;
      font-weight: 500;
      color: #ff4d4f;
    }
  }
}

.loading-more {
  text-align: center;
  padding: 30rpx;
  color: #999;
  font-size: 24rpx;
}

.empty-state {
  padding: 120rpx 0;
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
        font-size: 32rpx;
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
</style>
