<template>
  <view class="container">
    <!-- 状态筛选 -->
    <view class="filter-section">
      <scroll-view scroll-x class="tab-scroll" :show-scrollbar="false">
        <view class="tab-list">
          <view
            v-for="(tab, index) in tabList"
            :key="index"
            class="tab-item"
            :class="{ active: currentTab === tab.value }"
            @tap="handleTabChange(tab.value)"
          >
            <text class="tab-text">{{ tab.label }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 订单列表 -->
    <view class="order-list">
      <view v-for="(order, index) in orders" :key="index" class="order-card" @tap="viewOrderDetail(order)">
        <view class="order-header">
          <view class="left">
            <text class="order-no">委采编号{{ order.entrustNo }}</text>
          </view>
          <text class="order-status" :class="order.status_dictText">{{ order.status_dictText }}</text>
        </view>

        <view class="order-content">
          <text class="order-time">{{ order.supplierId_dictText }}</text>
          <view class="total-info">
            <text class="total-label">$</text>
            <text class="total-value">{{ order.totalLoan ? order.totalLoan : 0 }}</text>
            <text class="total-label">(总借贷)</text>
          </view>
        </view>

        <view class="order-footer">
          <div class="order-item">
            <div class="label">订单号:</div>
            {{ order.sn }}
          </div>
          <div class="order-item">
            <div class="label">入库仓库：</div>
            {{ order.warehouseId_dictText }}
          </div>
          <div class="order-item">
            <div class="label">起息日：</div>
            {{ order.interestStartDate }}
          </div>
          <div class="order-item">
            <div class="label">创建时间：</div>
            {{ order.createTime }}
          </div>
        </view>
      </view>

      <!-- 加载状态 -->
      <view class="loading-more" v-if="loading">
        <u-loading-icon></u-loading-icon>
        <text>加载中...</text>
      </view>
      <view class="no-more" v-if="!hasMore && orders.length > 0">
        <text>没有更多数据了</text>
      </view>

      <!-- 空状态 -->
      <view v-if="orders.length === 0 && !loading" class="empty-state">
        <u-empty mode="order" text="暂无订单数据"></u-empty>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import { getAction } from '@/common/store/manage'

// 状态标签
const tabList = ref([
  { label: '全部', value: '', count: 0 },
  { label: '新创建', value: '1', count: 0 },
  { label: '待审核', value: '2', count: 0 },
  { label: '待结算', value: '3', count: 0 },
  { label: '已结算', value: '4', count: 0 },
  { label: '已驳回', value: '9', count: 0 },
])

const currentTab = ref('')
const orders = ref([])
const pageNo = ref(1)
const pageSize = ref(10)
const total = ref(0)
const hasMore = ref(true)
const isRefreshing = ref(false)
const loading = ref(false)

// 切换标签
const handleTabChange = (value) => {
  currentTab.value = value
  pageNo.value = 1
  orders.value = []
  getOrderList('refresh')
}

// 获取订单列表
const getOrderList = async (type = 'more') => {
  loading.value = true
  try {
    const res = await getAction('/fms/purchaseOrder/list', {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      column: 'createTime',
      order: 'desc',
      status: currentTab.value === '' ? '' : currentTab.value,
    })

    if (res.success) {
      if (type === 'refresh') {
        orders.value = res.result.records || []
      } else {
        orders.value = [...orders.value, ...(res.result.records || [])]
      }
      total.value = res.result.total
      hasMore.value = orders.value.length < total.value
    }
  } finally {
    loading.value = false
    isRefreshing.value = false
  }
}

// 下拉刷新
const onRefresh = () => {
  isRefreshing.value = true
  pageNo.value = 1
  getOrderList('refresh')
}

// 上拉加载更多
const onLoadMore = () => {
  if (hasMore.value && !loading.value) {
    pageNo.value++
    getOrderList('more')
  }
}

// 查看订单详情
const viewOrderDetail = (order) => {
  uni.navigateTo({
    url: `/pages/finance/purchase-detail-info?id=${order.id}`,
  })
}

// 确认订单
const confirmOrder = (order) => {
  // 实现确认订单逻辑
}

// 支付订单
const payOrder = (order) => {
  // 实现支付订单逻辑
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}
// 监听页面触底事件
onReachBottom(() => {
  onLoadMore()
})

// 添加下拉刷新处理
onPullDownRefresh(async () => {
  onRefresh()
})
onMounted(() => {
  getOrderList('refresh')
})
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.filter-section {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background: #fff;
  border-bottom: 1px solid #eee;

  .tab-scroll {
    white-space: nowrap;
    padding: 0 20rpx;

    .tab-list {
      display: inline-flex;
      padding: 20rpx 0;

      .tab-item {
        min-width: 120rpx;
        padding: 0 30rpx;
        position: relative;
        text-align: center;
        &.active {
          color: $theme-color;
          font-weight: 500;

          &::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: -20rpx;
            transform: translateX(-50%);
            width: 60rpx;
            height: 4rpx;
            background: $theme-color;
            border-radius: 2rpx;
          }
        }

        .tab-text {
          font-size: 28rpx;
        }

        .tab-count {
          font-size: 24rpx;
          color: #999;
          margin-left: 4rpx;
        }
      }
    }
  }
}

.order-list {
  margin: 0rpx auto;
  width: 96%;
  padding: 100rpx 0rpx;
}

.order-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rpx;

    .left {
      .order-no {
        font-size: 28rpx;
        font-weight: 550;
        color: #181818;
      }
    }

    .order-status {
      font-size: 24rpx;

      &.新创建 {
        padding: 10rpx 15rpx;
        border-radius: 5rpx;
        background-color: #edf4ff;
        color: #7aacff;
      }

      &.待审核 {
        padding: 10rpx 15rpx;
        border-radius: 5rpx;
        background-color: #fff5eb;
        color: #ffb153;
      }

      &.待结算 {
        padding: 10rpx 15rpx;
        border-radius: 5rpx;
        background-color: #f0cfc7;
        color: #bb340b;
      }

      &.已结算 {
        padding: 10rpx 15rpx;
        border-radius: 5rpx;
        background-color: #e5f6ee;
        color: #0fb362;
      }
      &.已驳回 {
        padding: 10rpx 15rpx;
        border-radius: 5rpx;
        background-color: #f0efed;
        color: #999;
      }
    }
  }

  .order-content {
    padding: 0rpx 0 10rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .order-time {
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.8);
    }
    .goods-info {
      .goods-item {
        display: flex;
        align-items: center;
        margin-bottom: 16rpx;

        &:last-child {
          margin-bottom: 0;
        }

        .goods-name {
          flex: 1;
          font-size: 28rpx;
          color: #333;
        }

        .goods-quantity {
          font-size: 26rpx;
          color: #666;
          margin: 0 20rpx;
        }

        .goods-price {
          font-size: 28rpx;
          color: #ff6b6b;
        }
      }
    }

    .total-info {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 20rpx;

      .total-label {
        font-size: 26rpx;
        color: #666;
      }

      .total-value {
        font-size: 36rpx;
        color: #ff6b6b;
        font-weight: 500;
        margin-left: 10rpx;
      }
    }
  }

  .order-footer {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    color: rgba(0, 0, 0, 0.8);
    font-size: 24rpx;
    .order-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 10rpx;
      .label {
        color: rgba(0, 0, 0, 0.5);
      }
    }
    .action-buttons {
      :deep(.u-button) {
        margin-left: 20rpx;
      }

      :deep(.u-button--mini) {
        padding: 0 30rpx;
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
