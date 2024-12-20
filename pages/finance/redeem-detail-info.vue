<template>
  <view class="container">
    <!-- 基本信息 -->
    <view class="info-section card">
      <view class="section-title">
        <text>基本信息</text>
      </view>
      <view class="info-grid">
        <view class="info-item">
          <text class="label">赎货单编号</text>
          <text class="value">{{ detail.sn }}</text>
        </view>
        <view class="info-item">
          <text class="label">来源单据</text>
          <text class="value">{{ detail.sourceOrder }}</text>
        </view>
        <view class="info-item">
          <text class="label">资金方</text>
          <text class="value">{{ detail.supplierId_dictText }}</text>
        </view>

        <view class="info-item">
          <text class="label">结息日</text>
          <text class="value">{{ detail.interestEndDate }}</text>
        </view>
        <view class="info-item">
          <text class="label">利息总额</text>
          <text class="value">{{ detail.interestAmount }}</text>
        </view>
        <view class="info-item">
          <text class="label">总借贷</text>
          <text class="value">{{ detail.totalLoan }}</text>
        </view>
        <view class="info-item">
          <text class="label">总赎货数</text>
          <text class="value">{{ detail.totalRedeem }}</text>
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
            <view class="th">SKU</view>
            <view class="th">JSIN</view>
            <view class="th">品名</view>
            <view class="th">英文品名</view>
            <view class="th">委采编号</view>
            <view class="th">单位保证金(USD)</view>
            <view class="th">总保证金(USD)</view>
            <view class="th">单位借贷(USD)</view>
            <view class="th">总借贷(USD)</view>
            <view class="th">赎货数</view>
          </view>
          <view class="table-body">
            <view v-for="item in skuList" :key="item.id" class="tr">
              <view class="td">{{ item.sku }}</view>
              <view class="td">{{ item.jsin }}</view>
              <view class="td">{{ item.name }}</view>
              <view class="td">{{ item.enName }}</view>
              <view class="td">{{ item.entrustNo }}</view>
              <view class="td">{{ item.unitDeposit }}</view>
              <view class="td">{{ item.totalDeposit }}</view>
              <view class="td">{{ item.unitLoan }}</view>
              <view class="td">{{ item.totalLoan }}</view>
              <view class="td">{{ item.redeemCount }}</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getAction } from '../../common/store/manage'
const orderId = ref('')
const skuList = ref([])
const detail = ref()

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}
const loadData = () => {
  getAction('/fms/redeemGoodsOrder/queryById', { id: orderId.value }).then((res) => {
    if (res.success) {
      detail.value = res.result
    }
  })
}
const loadSkuDetail = () => {
  getAction('/fms/redeemGoodsOrderDetail/list', {
    pageNo: 1,
    pageSize: 9999,
    order: 'desc',
    column: 'createTime',
    orderId: orderId.value,
  }).then((res) => {
    if (res.success) {
      skuList.value = res.result.records
    }
  })
}

onLoad((options) => {
  orderId.value = options.id
  console.log('options', orderId.value)
  loadData()
  loadSkuDetail()
})
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20rpx 20rpx;
}

.custom-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 88rpx;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  z-index: 100;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

  .navbar-title {
    flex: 1;
    text-align: center;
    font-size: 32rpx;
    font-weight: 500;
  }
}

.card {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-top: 20rpx;
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
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10rpx;
    .label {
      font-size: 26rpx;
      color: #666;
      margin-bottom: 8rpx;
      display: block;
    }

    .value {
      font-size: 28rpx;
      color: #333;
      font-weight: 500;

      &.price {
        color: $price-color;
      }
    }
  }
}

.table-container {
  // width: 100%;
  overflow-x: auto;

  .table {
    min-width: 550%;
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
        min-width: 160rpx;
      }
    }

    .table-body {
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
          min-width: 160rpx;
        }
      }
    }
  }
}
</style>
