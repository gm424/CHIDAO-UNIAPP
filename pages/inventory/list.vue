<template>
  <view class="container">
    <!-- 搜索区域 -->
    <view class="search-section">
      <view class="search-box">
        <u-search
          v-model="searchKeyword"
          placeholder="搜索商品名称"
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

    <!-- 库存列表 -->
    <view class="inventory-list">
      <view v-for="item in inventoryList" :key="item.id" class="inventory-card" @tap="viewDetail(item)">
        <view class="card-header">
          <view class="left">
            <text class="sku">{{ item.name.length > 15 ? item.name.slice(0, 15) + '...' : item.name }}</text>
          </view>
          <div>
            <text class="warehouse">{{ item.warehouseId_dictText }}</text>
            <text class="controlled">{{ item.controlled === 'Y' ? '控货' : '非控货' }}</text>
          </div>
        </view>

        <view class="card-content">
          <view class="goods-info">
            <div class="goods-info-item">
              <image
                src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/海关编码_1734489867388.png"
                style="width: 30rpx; height: 30rpx"
              ></image>
              <text class="name">{{ item.sku }}</text>
              <image
                src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/公司查询_1734511357124.png"
                style="width: 30rpx; height: 30rpx"
              ></image>
              <text class="name">{{ item.investorId_dictText }}</text>
            </div>

            <div class="en-name">批次编号：{{ item.batchNo }}</div>
            <div class="en-name">委采编号{{ item.entrustNo }}</div>
            <div class="en-name">良品数量：{{ item.usableCount }}Pcs</div>
          </view>
          <!-- <view class="stock-info">
            <view class="stock-item">
              <text class="label">可用库存</text>
              <text class="value">{{ item.usableCount }}</text>
            </view>
            <view class="stock-item">
              <text class="label">锁定库存</text>
              <text class="value">{{ item.lockCount }}</text>
            </view>
            <view class="stock-item">
              <text class="label">在途库存</text>
              <text class="value">{{ item.transInCount - item.transOutCount }}</text>
            </view>
          </view> -->
        </view>

        <!-- <view class="card-footer">
          <view class="price-info">
            <text class="label">单价</text>
            <text class="value">${{ item.price }}</text>
          </view>
          <view class="total-info">
            <text class="label">总货值</text>
            <text class="value">${{ item.totalValue }}</text>
          </view>
        </view> -->
      </view>

      <!-- 加载状态 -->
      <view class="loading-more" v-if="loading">
        <u-loading-icon></u-loading-icon>
        <text>加载中...</text>
      </view>
      <view class="no-more" v-if="!hasMore && inventoryList.length > 0">
        <text>没有更多数据了</text>
      </view>

      <!-- 空状态 -->
      <view v-if="inventoryList.length === 0 && !loading" class="empty-state">
        <u-empty mode="data" text="暂无库存数据"></u-empty>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import { getAction } from '@/common/store/manage'
import { image } from 'uview-plus/libs/function/test'

const searchKeyword = ref('')
const inventoryList = ref([])
const pageNo = ref(1)
const pageSize = ref(10)
const total = ref(0)
const hasMore = ref(true)
const loading = ref(false)
const searchTimer = ref(null)

// 获取库存列表
const getInventoryList = async (type = 'more') => {
  loading.value = true
  try {
    const res = await getAction('/wms/stock/list', {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      column: 'createTime',
      order: 'desc',
      name: searchKeyword.value ? '*' + searchKeyword.value + '*' : '',
    })

    if (res.success) {
      if (type === 'refresh') {
        inventoryList.value = res.result.records || []
      } else {
        inventoryList.value = [...inventoryList.value, ...(res.result.records || [])]
      }
      total.value = res.result.total
      hasMore.value = inventoryList.value.length < total.value
    }
  } finally {
    loading.value = false
    if (type === 'refresh') {
      uni.stopPullDownRefresh()
    }
  }
}

// 查看详情
const viewDetail = (item) => {
  uni.navigateTo({
    url: `/pages/inventory/detail?id=${item.id}`,
  })
}

// 处理搜索
const handleSearch = () => {
  if (searchTimer.value) {
    clearTimeout(searchTimer.value)
  }
  searchTimer.value = setTimeout(() => {
    pageNo.value = 1
    getInventoryList('refresh')
  }, 300)
}

// 清空搜索
const handleClear = () => {
  searchKeyword.value = ''
  pageNo.value = 1
  getInventoryList('refresh')
}

// 上拉加载
onReachBottom(() => {
  if (!hasMore.value || loading.value) return
  pageNo.value++
  getInventoryList()
})

// 下拉刷新
onPullDownRefresh(() => {
  pageNo.value = 1
  getInventoryList('refresh')
})

onMounted(() => {
  getInventoryList('refresh')
})
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 20rpx;
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

.inventory-list {
  padding: 20rpx;

  .inventory-card {
    background: #fff;
    border-radius: 30rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;

      .left {
        .sku {
          font-size: 30rpx;
          font-weight: 600;
          color: #333;
          margin-right: 16rpx;
        }

        .batch-no {
          font-size: 24rpx;
          color: #666;
        }
      }

      .warehouse {
        font-size: 24rpx;
        color: #fff;
        background: #1677ff;
        padding: 4rpx 12rpx;
        border-radius: 8rpx;
        margin-right: 10rpx;
      }
      .controlled {
        font-size: 24rpx;
        color: #fff;
        background: #46c254;
        padding: 4rpx 12rpx;
        border-radius: 8rpx;
      }
    }

    .card-content {
      .goods-info {
        margin-bottom: 20rpx;
        .goods-info-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          .name {
            font-size: 26rpx;
            color: #333;

            display: block;
            margin-right: 20rpx;
          }
        }
        .en-name {
          margin-top: 20rpx;
          font-size: 26rpx;
          color: #999;
        }
      }

      .stock-info {
        display: flex;
        justify-content: space-between;
        background: #f8f9fa;
        padding: 20rpx;
        border-radius: 12rpx;

        .stock-item {
          text-align: center;

          .label {
            font-size: 24rpx;
            color: #666;
            margin-bottom: 8rpx;
            display: block;
          }

          .value {
            font-size: 32rpx;
            color: #333;
            font-weight: 600;
          }
        }
      }
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      margin-top: 20rpx;
      padding-top: 20rpx;
      border-top: 2rpx solid #f5f5f5;

      .price-info,
      .total-info {
        .label {
          font-size: 24rpx;
          color: #666;
          margin-right: 8rpx;
        }

        .value {
          font-size: 28rpx;
          color: $price-color;
          font-weight: 600;
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
