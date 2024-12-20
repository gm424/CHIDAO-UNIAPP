<template>
  <view class="container">
    <!-- 基本信息 -->
    <view class="info-section card">
      <view class="section-title">
        <text>基本信息</text>
      </view>
      <view class="info-grid">
        <view class="info-item">
          <text class="label">SKU</text>
          <text class="value">{{ detail.sku }}</text>
        </view>
        <view class="info-item">
          <text class="label">商品名称</text>
          <text class="value">{{ detail.merchName }}</text>
        </view>
        <view class="info-item">
          <text class="label">英文名称</text>
          <text class="value">{{ detail.enName }}</text>
        </view>
        <view class="info-item">
          <text class="label">批次号</text>
          <text class="value">{{ detail.batchNo }}</text>
        </view>
        <view class="info-item">
          <text class="label">委采编号</text>
          <text class="value">{{ detail.entrustNo }}</text>
        </view>
        <view class="info-item">
          <text class="label">仓库</text>
          <text class="value">{{ detail.warehouseId_dictText }}</text>
        </view>
      </view>
    </view>
    <!-- 商品信息 -->
    <view class="goods-section card">
      <view class="section-title">
        <text>商品信息</text>
      </view>
      <scroll-view scroll-x class="table-container">
        <view class="table">
          <view class="table-header">
            <view class="th">入库批次</view>
            <view class="th">库龄</view>
            <view class="th">库存数量</view>
            <view class="th">良品数量</view>
            <view class="th">次品数量</view>
            <view class="th">锁定数量</view>
            <view class="th">待收在途数量</view>
            <view class="th">离仓在途数量</view>
            <view class="th">离仓数量</view>
            <view class="th">仓租起始日</view>
          </view>
          <view class="table-body">
            <view v-for="item in stockList" :key="item.id" class="tr">
              <view class="td">{{ item.batchNo }}</view>
              <view class="td">6天</view>
              <view class="td">{{ item.name }}</view>
              <view class="td">{{ item.enName }}</view>
              <view class="td">{{ item.usableCount }}</view>
              <view class="td">{{ item.usableCount }}</view>
              <view class="td">{{ item.defectiveCount }}</view>
              <view class="td">{{ item.lockCount }}</view>
              <view class="td">{{ item.transInCount }}</view>
              <view class="td">{{ item.transOutCount }}</view>
              <view class="td">{{ item.outboundCount }}</view>
              <view class="td">{{ item.rentalDate }}</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getAction } from '@/common/store/manage'

const detail = ref({})
const stockList = ref([])
// 获取详情
const getDetail = async (id) => {
  const res = await getAction('/wms/stock/queryById', { id })
  if (res.success) {
    detail.value = res.result
  }
}
const getStockDetail = (id) => {
  getAction('/cwms/stockBatch/list', { pageNo: 1, pageSize: 99999, stockId: id }).then((res) => {
    if (res.success) {
      stockList.value = res.result.records
    }
  })
}
onLoad((options) => {
  if (options.id) {
    getDetail(options.id)
    getStockDetail(options.id)
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20rpx;
}

.card {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 24rpx;
  position: relative;
  padding-left: 20rpx;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6rpx;
    height: 24rpx;
    background: $theme-color;
    border-radius: 3rpx;
  }
}

.info-grid,
.finance-grid {
  display: flex;
  flex-direction: column;

  .info-item,
  .finance-item {
    display: flex;
    justify-content: space-between;
    padding: 16rpx 0;
    border-bottom: 2rpx solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }

    .label {
      color: #666;
      font-size: 28rpx;
    }

    .value {
      color: #333;
      font-size: 28rpx;
      font-weight: 500;

      &.price {
        color: $price-color;
      }
    }
  }
}

.stock-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;

  .stock-item {
    background: #f8f9fa;
    padding: 20rpx;
    border-radius: 12rpx;
    text-align: center;

    .label {
      font-size: 26rpx;
      color: #666;
      margin-bottom: 8rpx;
      display: block;
    }

    .value {
      font-size: 36rpx;
      color: #333;
      font-weight: 600;
    }
  }
}
.table-container {
  // width: 100%;
  overflow-x: auto;

  .table {
    min-width: 4100rpx;
    border: 1rpx solid #eee;
    border-radius: 8rpx;

    .table-header {
      display: flex;

      .th {
        background: #f8f9fa;
        flex: 1;
        padding: 20rpx;
        font-size: 26rpx;
        color: #666;
        font-weight: 500;
        text-align: center;
        min-width: 300rpx;
      }
    }

    .table-body {
      display: flex;
      .tr {
        display: flex;
        border-top: 1rpx solid #eee;

        &:hover {
          // background: #f8f9fa;
        }

        .td {
          flex: 1;
          padding: 20rpx;
          font-size: 26rpx;
          color: #333;
          text-align: center;
          min-width: 300rpx;
        }
      }
    }
  }
}
</style>
