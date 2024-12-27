<template>
  <view class="container">
    <!-- 订单状态 -->
    <view class="status-section">
      <view class="status-info">
        <image
          src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/等待_1734494564986.png"
          style="width: 50rpx; height: 50rpx; margin-right: 10rpx"
        ></image>
        <text class="desc">{{ orderDetail.status_dictText }}</text>
      </view>
      <view class="info-item">
        <text class="label">订单编号</text>
        <text class="value">{{ orderDetail.sn }}</text>
      </view>
      <view class="info-item">
        <text class="label">下单时间</text>
        <text class="value">{{ orderDetail.createTime }}</text>
      </view>
    </view>

    <!-- 路线信息 -->
    <view class="route-info card">
      <view class="route-header">
        <text class="channel-tag">{{ orderDetail.channel_dictText }}</text>
      </view>
      <view class="route-main">
        <view class="route-locations">
          <view class="location">
            <text class="city">{{ orderDetail.srcCountry_dictText }}</text>
            <text class="country-code">{{ orderDetail.srcCountry }}</text>
          </view>
          <view class="route-arrow">
            <image
              class="arrow-icon"
              src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/箭头_切换左_1734333007078.png"
              mode="aspectFit"
            />
            <text class="arrow-time">{{ orderDetail.referenceTimeCost }}</text>
          </view>
          <view class="location">
            <text class="city">{{ orderDetail.dstCountry_dictText }}</text>
            <text class="country-code">{{ orderDetail.dstCountry }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 地址信息 -->
    <view class="address-section card">
      <!-- <view class="section-title">发货地址</view>
      <view class="address-card">
        <view class="contact-info">
          <text class="name">{{ orderDetail.pickupContactName }}</text>
          <text class="phone">{{ orderDetail.pickupContactPhone }}</text>
        </view>
        <view class="address-detail">
          <text>{{ orderDetail.pickupCountry }} {{ orderDetail.pickupDetailAddr }}</text>
        </view>
      </view> -->

      <view class="section-title">收货地址</view>
      <view class="address-card">
        <view class="contact-info">
          <text class="name">{{ orderDetail.recvContactName }}</text>
          <text class="phone">{{ orderDetail.recvContactPhone }}</text>
        </view>
        <view class="address-detail">
          <text>{{ orderDetail.recvCountry }} {{ orderDetail.recvDetailAddr }}</text>
        </view>
      </view>
    </view>

    <!-- 货物信息 -->
    <view class="cargo-container card">
      <view class="cargo-header">
        <text class="section-title">货箱信息</text>
        <text class="box-count">共{{ boxList.length }}箱</text>
      </view>

      <view class="box-list">
        <view v-for="box in boxList" :key="box.id" class="box-wrapper">
          <view class="box-header">
            <view class="box-title">
              <text class="box-number">箱号 {{ box.boxNo }}</text>
              <text class="box-sn">{{ box.boxSn }}</text>
            </view>
            <view class="box-status" :class="box.status === '1' ? 'status-pending' : 'status-confirmed'">
              {{ box.status_dictText }}
            </view>
          </view>

          <view class="box-dimensions">
            <view class="dimension-item">
              <text class="value">尺寸{{ box.lengthInput }}cm*{{ box.widthInput }}cm*{{ box.heightInput }}cm</text>
            </view>
            <view class="dimension-item">
              <text class="value">体积{{ box.cubeInput }}cm³</text>
              <text class="value">毛重{{ box.grossWeightInput }}kg</text>
              <text class="value">泡重{{ box.throwWeightInput }}kg</text>
            </view>
          </view>

          <!-- 货物列表 -->
          <view class="goods-container">
            <view class="goods-header">
              <!-- <u-icon name="gift-fill" size="24" color="#a2a2a2"></u-icon> -->
              <text class="goods-title">货物信息</text>
            </view>

            <view class="goods-list">
              <view v-for="item in box.goods" :key="item.id" class="goods-item">
                <view class="goods-details">
                  <view class="detail-item">
                    <text class="label">名称: </text>
                    <text class="value">{{ item.name }}</text>
                  </view>
                  <view class="detail-item">
                    <text class="label">数量: </text>
                    <text class="value">x{{ item.count }}</text>
                  </view>
                  <view class="detail-item">
                    <text class="label">材质: </text>
                    <text class="value">{{ item.material }}</text>
                  </view>
                  <view class="detail-item">
                    <text class="label">海关编码: </text>
                    <text class="value">{{ item.hsCode }}</text>
                  </view>
                  <!-- <view class="detail-item">
                    <text class="label">申报单价: </text>
                    <text class="value price">${{ item.declareUnitPrice }}</text>
                  </view>
                  <view class="detail-item">
                    <text class="label">申报总价: </text>
                    <text class="value price">${{ item.totalDeclarePrice }}</text>
                  </view> -->
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部固定按钮 -->
    <view class="bottom-bar" v-if="orderDetail.status !== '6'">
      <view class="logistics-btn" @tap="viewLogistics">
        <u-icon name="map" color="#f8a406" size="20"></u-icon>
        <text>查看物流轨迹</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { getAction } from '@/common/store/manage'
import { image } from 'uview-plus/libs/function/test'
// 订单详情数据
const orderDetail = ref({})
const boxList = ref([])
const loadDetail = () => {
  getAction('/tms/transOrder/queryById', { id: uni.getStorageSync('orderId') }).then((res) => {
    if (res.success) {
      orderDetail.value = res.result
    }
  })
}
const getTransBoxDetail = () => {
  getAction('/tms/transOrderBox/list', { orderId: uni.getStorageSync('orderId'), pageSize: 9999, pageNo: 1 }).then(
    (res) => {
      if (res.success) {
        boxList.value = res.result
      }
    }
  )
}
// 页面加载
onMounted(() => {
  loadDetail()
  getTransBoxDetail()
})

// 查看物流轨迹
const viewLogistics = () => {
  uni.navigateTo({
    url: `/pages/order/logistics?sn=${orderDetail.value.sn}`,
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.container {
  min-height: 100vh;
  background: #fafafa;
  padding: 20rpx;
  padding-bottom: 220rpx;
}

.card {
  background: #fff;
  border-radius: 24rpx;
  padding: 30rpx;
  margin-top: 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

// 订单状态样式
.status-section {
  // background: linear-gradient(135deg, $theme-color 0%, $theme-color-light 100%);
  padding: 0 20rpx;
  .status-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20rpx 0;

    .status {
      font-size: 40rpx;
      font-weight: 600;
      color: #5a5a5a;
      margin-bottom: 12rpx;
    }

    .desc {
      font-size: 32rpx;
      font-weight: 600;
      color: #5a5a5a;
    }
  }
}

// 路线信息样式
.route-info {
  .route-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24rpx;

    .route-type {
      color: $theme-color;
      font-weight: 600;
      font-size: 32rpx;
    }

    .route-number {
      color: #666;
      font-size: 28rpx;
    }
  }
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
// 地址信息样式
.address-section {
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

  .address-card {
    background: #f9f9f9;
    border-radius: 16rpx;
    padding: 24rpx;
    margin-bottom: 24rpx;

    .contact-info {
      margin-bottom: 16rpx;
      display: flex;
      align-items: center;

      .name {
        font-size: 32rpx;
        font-weight: 600;
        color: #333;
        margin-right: 20rpx;
      }

      .phone {
        color: #666;
        font-size: 28rpx;
      }
    }

    .address-detail {
      font-size: 28rpx;
      color: #7c7b7b;
      line-height: 1.5;
    }
  }
}

// 货物信息样式
.cargo-container {
  .cargo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;

    .section-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #333;
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

    .box-count {
      font-size: 28rpx;
      color: #666;
    }
  }
}

.box-wrapper {
  background: #fff;
  border: 1px solid #f0efef;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 24rpx;

  .box-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;

    .box-title {
      .box-number {
        font-size: 32rpx;
        font-weight: 600;
        color: #333;
        margin-right: 16rpx;
      }

      .box-sn {
        font-size: 26rpx;
        color: #666;
      }
    }

    .box-status {
      padding: 6rpx 20rpx;
      border-radius: 20rpx;
      font-size: 24rpx;
      font-weight: 500;

      &.status-pending {
        background: rgba($warning-color, 0.1);
        color: $warning-color;
      }

      &.status-confirmed {
        background: rgba($success-color, 0.1);
        color: $success-color;
      }
    }
  }

  .box-dimensions {
    display: flex;
    flex-direction: column;
    color: #e2e2e2;
    .dimension-item {
      background: #fff;
      padding: 20rpx;
      border: 1px solid #f7f4f4;
      border-radius: 16rpx;
      margin-top: 10rpx;
      color: #e2e2e2;

      .value {
        font-size: 26rpx;
        color: #cccbcb;
        font-weight: 500;
        padding-right: 10rpx;
        border-right: 1px solid #dbd9d9;
        margin-right: 10rpx;
      }
    }
  }
}

.goods-container {
  background: #fff;
  border-radius: 16rpx;

  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);

  .goods-header {
    display: flex;
    align-items: center;
    gap: 12rpx;
    margin-top: 20rpx;
    .goods-title {
      font-size: 28rpx;
      font-weight: 600;
      color: #777575;
    }
  }

  .goods-list {
    .goods-item {
      border-bottom: 2rpx solid #f5f5f5;
      padding: 24rpx 0;

      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }

      .goods-main {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 20rpx;

        .goods-info {
          .goods-name {
            font-size: 30rpx;
            color: #333;
            font-weight: 500;
            margin-bottom: 8rpx;
            display: block;
          }

          .goods-en {
            font-size: 24rpx;
            color: #666;
          }
        }

        .goods-quantity {
          .quantity {
            font-size: 30rpx;
            color: $theme-color;
            font-weight: 600;
          }
        }
      }

      .goods-details {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20rpx;
        background: #f9f9f9;
        padding: 16rpx;
        border-radius: 12rpx;

        .detail-item {
          display: flex;

          align-items: center;

          .label {
            font-size: 24rpx;
            color: #666;
          }

          .value {
            font-size: 26rpx;
            color: #868585;

            &.price {
              color: $price-color;
              font-weight: 600;
            }
          }
        }
      }
    }
  }
}

// 订单信息样式
.order-section {
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
.info-item {
  display: flex;
  justify-content: space-between;
  padding: 8rpx 0;
  border-bottom: 2rpx solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }

  .label {
    color: #666;
    font-size: 28rpx;
  }

  .value {
    color: #686666;
    font-size: 28rpx;
    font-weight: 500;
  }
}

// 底部固定按钮样式
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 40rpx 40rpx;
  background: #fff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: flex-end;
  .logistics-btn {
    width: 40%;
    height: 78rpx;
    border: 1px solid $theme-color;
    border-radius: 44rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $theme-color;
    font-size: 30rpx;
    .u-icon {
      margin-right: 12rpx;
    }
  }
}
</style>
