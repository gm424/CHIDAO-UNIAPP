<template>
  <view class="container">
    <!-- 第一部分：基本信息 -->

    <view class="route-info">
      <view class="route-basic">
        <view class="route-header">
          <view class="route-number">
            <text class="value">{{ routeInfo.code }}</text>
          </view>

          <view class="route-type">
            <text class="label">{{ routeInfo.channel_dictText }}</text>
            <text class="label-2">{{ routeInfo.transType_dictText }}</text>
          </view>
        </view>

        <view class="route-main">
          <view class="location origin">
            <view class="location-info">
              <text class="city">{{ routeInfo.routeInfo.srcPortDict }}</text>
              <text class="country-code">{{ routeInfo.routeInfo.srcPort }}</text>
            </view>
          </view>
          <view class="route-arrow">
            <image
              class="arrow-icon"
              src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/箭头_切换左_1734333007078.png"
              mode="aspectFit"
            />
            <text class="transit-time">{{ routeInfo.routeInfo.referenceTimeCost }}</text>
          </view>
          <view class="location destination">
            <view class="location-info">
              <text class="city">{{ routeInfo.routeInfo.dstPortDict }}</text>
              <text class="country-code">{{ routeInfo.routeInfo.dstPort }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 第二部分：收发地址 -->
    <view class="section">
      <!-- 发货地址 -->
      <view class="address-card" :class="{ empty: !shipAddress.contactName }" @tap="selectShipAddress">
        <view class="address-type">发</view>
        <view v-if="shipAddress.contactName" class="address-content">
          <view class="contact-info">
            <text class="name">{{ shipAddress.contactName }}</text>
            <text class="phone">{{ shipAddress.contactPhone }}</text>
          </view>
          <view class="address-detail">{{ shipAddress.country_dictText }} {{ shipAddress.detailAddr }}</view>
        </view>
        <view v-else class="empty-tip">添加发货地址</view>
        <text class="iconfont icon-right"></text>
      </view>

      <!-- 收货地址 -->
      <view class="address-card" :class="{ empty: !receiveAddress.contactName }" @tap="selectReceiveAddress">
        <view class="address-type" style="background-color: #fa5151">收</view>
        <view v-if="receiveAddress.contactName" class="address-content">
          <view class="contact-info">
            <text class="name">{{ receiveAddress.contactName }}</text>
            <text class="phone">{{ receiveAddress.contactPhone }}</text>
          </view>
          <view class="address-detail">{{ receiveAddress.country_dictText }} {{ receiveAddress.detailAddr }}</view>
        </view>
        <view v-else class="empty-tip">添加收货地址</view>
        <text class="iconfont icon-right"></text>
      </view>
    </view>

    <!-- 第三部分：货物信息 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">货物信息</text>
        <view class="add-cargo" @tap="addCargo">
          <text>添加货箱</text>
          <text class="iconfont icon-right"></text>
        </view>
      </view>
      <view class="cargo-list">
        <view v-for="(cargo, index) in cargoList" :key="index" class="cargo-item" @tap="editCargo(index)">
          <view class="cargo-header">
            <text class="title">货箱 {{ index + 1 }}</text>
            <view class="delete" @tap.stop="deleteCargoItem(index)">
              <u-icon name="trash" size="20" color="#ff4d4f"></u-icon>
            </view>
          </view>
          <view class="cargo-info">
            <view class="info-item">
              <view class="info-item-col">
                <text class="label">尺寸</text>
                <text class="value">{{ cargo.length }}cm * {{ cargo.width }}cm * {{ cargo.height }}cm</text>
              </view>
              <view class="info-item-col">
                <text class="label">重量</text>
                <text class="value">{{ cargo.weight }}KG</text>
              </view>
              <view class="info-item-col">
                <text class="label">箱数</text>
                <text class="value">X{{ cargo.count }}</text>
              </view>
            </view>
          </view>
          <view class="goodInfo-title">货物信息</view>
          <scroll-view class="goodInfo-list" scroll-x>
            <view v-for="(item, gIndex) in cargo.goodInfo" :key="gIndex" class="goodInfo-card">
              <text class="delete-icon" @tap.stop="deleteGoodsItem(index, gIndex)">×</text>
              <view class="goodInfo-main">
                <view class="goodInfo-name">
                  <text class="cn-name">{{ item.name }}</text>
                </view>
                <view class="goodInfo-info">
                  <text class="hs-code">编码: {{ item.hsCode }}</text>
                  <text class="count">数量：{{ item.count }}Pcs</text>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <view class="price-info">
        <text class="label">预估费用</text>
        <text class="price">¥{{ estimatedPrice }}</text>
      </view>

      <u-button class="submit-btn" @tap="submitOrder">立即下单</u-button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { mockChannelRoutes, mockRouteDetail } from '@/utils/mock'
import { postAction } from '@/common/store/manage'
const totalPrice = ref('0.0')
const routeInfo = ref({
  routeInfo: {},
})
const dynamicValidateForm = ref({})
const shipAddress = ref({})
const receiveAddress = ref({})
const cargoList = ref([])

// 监听事件
const handleAddCargo = (cargo) => {
  cargoList.value.push(cargo)
}

// 监听地址选择事件
const handleSelectAddress = ({ type, address }) => {
  if (type === '1') {
    shipAddress.value = address
  } else if (type === '2') {
    receiveAddress.value = address
  }
}

// 更新货箱
const handleCargoUpdate = ({ index, cargo }) => {
  cargoList.value.splice(index, 1, cargo)
}

onMounted(() => {
  // 获取路线信息
  const query = uni.getStorageSync('routeId')
  console.log('receiveAddress', receiveAddress.value)
  routeInfo.value = uni.getStorageSync('routeInfo')
  console.log('routeInfo', routeInfo.value)
  // 监听事件
  uni.$on('addCargo', handleAddCargo)
  uni.$on('updateCargo', handleCargoUpdate)
  uni.$on('selectAddress', handleSelectAddress)

  // 获取缓存的地址
  const cachedShipAddress = uni.getStorageSync('shipAddress')
  const cachedReceiveAddress = uni.getStorageSync('receiveAddress')
  if (cachedShipAddress) {
    shipAddress.value = JSON.parse(cachedShipAddress)
  }
  if (cachedReceiveAddress) {
    receiveAddress.value = JSON.parse(cachedReceiveAddress)
  }
})

onUnmounted(() => {
  uni.$off('addCargo', handleAddCargo)
  uni.$off('updateCargo', handleCargoUpdate)
  uni.$off('selectAddress', handleSelectAddress)
})

// 预估费用
const estimatedPrice = computed(() => {
  calcAmount()
  return totalPrice.value
})

// 选择发货地址
const selectShipAddress = () => {
  uni.navigateTo({
    url: '/pages/address/list?type=1',
  })
}

// 选择收货地址
const selectReceiveAddress = () => {
  uni.navigateTo({
    url: '/pages/address/list?type=2',
  })
}

// 添加货箱
const addCargo = () => {
  uni.navigateTo({
    url: '/pages/cargo/add',
  })
}

// 编辑货箱
const editCargo = (index) => {
  // 将当前货箱数据存入缓存
  uni.setStorageSync('editCargo', {
    index,
    cargo: { ...cargoList.value[index] },
  })

  // 跳转到编辑页面
  uni.navigateTo({
    url: '/pages/cargo/add?mode=edit',
  })
}

// 删除货箱
const deleteCargoItem = (index) => {
  cargoList.value.splice(index, 1)
}

// 删除商品
const deleteGoodsItem = (cargoIndex, goodsIndex) => {
  cargoList.value[cargoIndex].goodInfo.splice(goodsIndex, 1)
  // 如果货箱中没有商品了，自动删除货箱
  if (cargoList.value[cargoIndex].goodInfo.length === 0) {
    cargoList.value.splice(cargoIndex, 1)
  }
}

const calcAmount = () => {
  return new Promise((resolve, reject) => {
    dynamicValidateForm.value = {}
    cargoList.value.map((item) => {
      item.goodInfo.forEach((it) => {
        it.value = it.price
      })
      return { ...item }
    })
    dynamicValidateForm.value.boxSpecs = cargoList.value
    shipAddress.value = shipAddress.value ? shipAddress.value : {}
    receiveAddress.value = receiveAddress.value ? receiveAddress.value : {}
    dynamicValidateForm.value.dtdTransInfo = {
      pickupCity: shipAddress.value.city,
      pickupCompany: shipAddress.value.company,
      pickupProvince: shipAddress.value.province,
      pickupCountry: shipAddress.value.country,
      pickupContactName: shipAddress.value.contactName,
      pickupContactPhone: shipAddress.value.contactPhone,
      pickupDetailAddr: shipAddress.value.detailAddr,
      pickupDistrict: shipAddress.value.district,
      pickupPostcode: shipAddress.value.postcode,
      recvCity: receiveAddress.value.city,
      recvCompany: receiveAddress.value.company,
      recvProvince: receiveAddress.value.province,
      recvCountry: receiveAddress.value.country,
      recvContactName: receiveAddress.value.contactName,
      recvContactPhone: receiveAddress.value.contactPhone,
      recvDetailAddr: receiveAddress.value.detailAddr,
      recvDistrict: receiveAddress.value.district,
      recvPostcode: receiveAddress.value.postcode,
    }
    dynamicValidateForm.value.dstPort = routeInfo.value.routeInfo.dstPort
    dynamicValidateForm.value.srcPort = routeInfo.value.routeInfo.srcPort
    dynamicValidateForm.value.routeId = routeInfo.value.routeInfo.routeId

    postAction('/oms/quoteSchemeRoute/calcAmount', dynamicValidateForm.value).then((res) => {
      if (res.success) {
        totalPrice.value = res.result.totalAmount
        resolve(res.result.totalAmount)
      } else {
        reject()
      }
    })
  })
}

// 提交订单
const submitOrder = () => {
  if (!shipAddress.value) {
    uni.showToast({
      title: '请选择发货地址',
      icon: 'none',
    })
    return
  }
  if (!receiveAddress.value) {
    uni.showToast({
      title: '请选择收货地址',
      icon: 'none',
    })
    return
  }
  if (cargoList.value.length === 0) {
    uni.showToast({
      title: '请添加货箱信息',
      icon: 'none',
    })
    return
  }
  // TODO: 提交订单
  postAction('/oms/quoteSchemeRoute/submitOrder', dynamicValidateForm.value).then((res) => {
    if (res.success) {
      uni.showLoading({
        title: '提交中',
      })
      uni.setStorageSync('orderId', res.result)
      setTimeout(() => {
        uni.hideLoading()
        uni.redirectTo({
          url: '/pages/order/detail',
        })
      }, 1000)
    } else {
      uni.showLoading({
        title: res.message,
      })
      uni.hideLoading()
    }
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20rpx 20rpx 120rpx;
}

.section {
  background: #fff;
  border-radius: 26rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200rpx;
    height: 200rpx;
    // background: radial-gradient(
    //   circle at 0 0,
    //   rgba(0, 122, 255, 0.12) 0%,
    //   rgba(0, 122, 255, 0.05) 35%,
    //   rgba(0, 122, 255, 0.02) 60%,
    //   rgba(0, 122, 255, 0) 100%
    // );
    pointer-events: none;
    z-index: 1;
  }
  .section-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10rpx;
    border-bottom: 2rpx solid #f8f7f7;
  }

  .section-title {
    position: relative;
    z-index: 2;
    font-family: YouSheBiaoTiHei;

    line-height: 62rpx;
    font-weight: bold;
  }
}

// 路线信息样式
.route-info {
  position: relative;
  background: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
  border-radius: 26rpx;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200rpx;
    height: 200rpx;
    background: radial-gradient(
      circle at 0 0,
      rgba(0, 122, 255, 0.08) 0%,
      rgba(0, 122, 255, 0.03) 35%,
      rgba(0, 122, 255, 0.01) 60%,
      rgba(0, 122, 255, 0) 100%
    );
    pointer-events: none;
  }

  .route-basic {
    margin-bottom: 20rpx;
    position: relative;
    z-index: 1;
  }

  .route-header {
    display: flex;
    gap: 40rpx;
    justify-content: space-between;
    margin-bottom: 10rpx;
    .route-type,
    .route-number {
      display: flex;
      align-items: center;
      gap: 16rpx;

      .label {
        font-size: 24rpx;
        color: #fff;
        background: #69cbae;
        padding: 4rpx 12rpx;
        border-radius: 4rpx;
      }

      .label-2 {
        font-size: 24rpx;
        color: #fff;
        background: #e49e57;
        padding: 4rpx 12rpx;
        border-radius: 4rpx;
      }

      .value {
        font-size: 24rpx;
        font-weight: 500;
        color: #aaa7a7;
      }
    }
  }

  .route-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    padding: 20rpx 20rpx 10rpx;

    .location {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12rpx;

      .location-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8rpx;

        .city {
          font-size: 36rpx;
          font-weight: bold;
          color: #333;
        }

        .country-code {
          font-size: 30rpx;
          color: #a09e9e;

          padding: 4rpx 12rpx;
          border-radius: 4rpx;
        }
      }

      .label {
        font-size: 24rpx;
        color: #666;
      }

      &.origin {
        .city {
          color: #333;
        }
      }

      &.destination {
        .city {
          color: #333;
        }
      }
    }

    .route-arrow {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 40rpx;

      .arrow-icon {
        width: 100%;
        height: 48rpx;
        margin-bottom: 8rpx;
      }

      .transit-time {
        font-size: 24rpx;
        color: #666;
      }
    }
  }
}

// 地址卡片样式
.address-card {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  background: rgb(248, 248, 248, 0.8);
  border-radius: 12rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;

  &.empty {
    background: #fff;
    border: 2rpx dashed #ddd;
  }

  .address-type {
    width: 48rpx;
    height: 48rpx;
    line-height: 48rpx;
    text-align: center;
    background: $theme-color;
    color: #fff;
    border-radius: 50%;
    font-size: 24rpx;
    margin-right: 20rpx;
  }

  .address-content {
    flex: 1;

    .contact-info {
      margin-bottom: 8rpx;

      .name {
        font-size: 28rpx;
        font-weight: bold;
        margin-right: 20rpx;
      }

      .phone {
        color: #666;
      }
    }

    .address-detail {
      font-size: 26rpx;
      color: #333;
    }
  }

  .empty-tip {
    flex: 1;
    color: #999;
    font-size: 28rpx;
  }

  .icon-right {
    color: #999;
    font-size: 32rpx;
  }
}

// 货物信息样式
.cargo-list {
  margin-top: 10rpx;
  .cargo-item {
    border-radius: 18rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border: 1px solid rgba(226, 226, 226, 0.5);
    position: relative;
    background: #fff;
    transition: all 0.2s ease;

    &:active {
      background: #f9f9f9;
    }

    .cargo-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16rpx;

      .title {
        font-size: 28rpx;
        font-weight: bold;
        color: #333;
      }

      .delete {
        color: #ff4d4f;
        font-size: 24rpx;
      }
    }

    .cargo-info {
      margin-bottom: 16rpx;

      .info-item {
        padding: 20rpx 10rpx;
        display: flex;
        flex-direction: column;
        margin-bottom: 8rpx;
        border: 1px solid #f5f4f4;
        border-radius: 12rpx;
        color: rgba(0, 0, 0, 0.2);
        .info-item-col {
          margin-right: 10rpx;
          // border-right: 1px solid #a2a2a2;
          .label {
            color: #afafaf;
            font-size: 26rpx;
            margin-right: 16rpx;
          }

          .value {
            color: #afafaf;
            font-size: 26rpx;
          }
        }
      }
    }

    .goodInfo-title {
      font-size: 26rpx;
      font-weight: 600;
      color: #555454;
      margin: 20rpx 0 16rpx;
    }

    .goodInfo-list {
      white-space: nowrap;
      padding: 10rpx;
      margin: 0 -20rpx;

      .goodInfo-card {
        display: inline-block;
        vertical-align: top;
        width: 400rpx;
        position: relative;
        background: #fff;
        border-radius: 8rpx;
        padding: 16rpx 20rpx;
        background-color: #f9f9f9;
        margin: 0 10rpx;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);

        .delete-icon {
          position: absolute;
          top: 12rpx;
          right: 16rpx;
          font-size: 32rpx;
          color: #999;
          width: 40rpx;
          height: 40rpx;
          line-height: 40rpx;
          text-align: center;
        }

        .goodInfo-main {
          padding-right: 40rpx;
          white-space: normal;
        }

        .goodInfo-name {
          margin-bottom: 8rpx;

          .cn-name {
            font-size: 28rpx;
            color: #807e7e;
            font-weight: 500;
            margin-right: 12rpx;
          }

          .en-name {
            font-size: 24rpx;
            color: #666;
            display: block;
          }
        }

        .goodInfo-info {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 16rpx;
          font-size: 26rpx;
          color: #a3a1a1;

          .hs-code {
            color: #a5a3a3;
          }

          .size {
            color: #666;
          }

          .count {
            color: #b4b2b2;
          }
        }
      }
    }
  }
}

.add-cargo {
  color: $theme-color;
  font-size: 28rpx;
}

// 底部操作栏
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  padding: 20rpx 30rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  z-index: 999;

  .price-info {
    display: flex;
    align-items: baseline;
    flex: 1;
    .label {
      font-size: 28rpx;
      color: #666;
      margin-right: 16rpx;
    }

    .price {
      font-size: 40rpx;
      color: #ff4d4f;
      font-weight: bold;
    }
  }

  .submit-btn {
    width: 40%;
    background: linear-gradient(
      to right,
      rgba(255, 184, 19, 0.5),
      rgba(255, 184, 19, 0.6) 30%,
      rgba(255, 184, 19, 0.9)
    );
    color: #fff;
    padding: 8rpx 60rpx;
    border-radius: 40rpx;
    font-size: 28rpx;
  }
}
</style>
