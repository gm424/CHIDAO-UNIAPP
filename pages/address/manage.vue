<template>
  <view class="container">
    <!-- 地址列表 -->
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

    <view
      class="address-list"
      :refresher-enabled="true"
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onRefresh"
      @scrolltolower="onLoadMore"
    >
      <u-swipe-action-item
        v-for="(address, index) in addressList"
        :key="index"
        :options="swipeOptions"
        @click="handleSwipeClick($event, address)"
      >
        <view class="address-card" :class="{ 'default-address': address.isDefault === '1' }">
          <view class="card-content">
            <view class="user-info">
              <text class="name">{{ address.contactName }}</text>
              <text class="phone">{{ address.contactPhone }}</text>
            </view>

            <view class="address-info">
              <view class="location">
                <text class="region">{{ address.country_dictText }} {{ address.province }} {{ address.city }}</text>
                <text class="detail">{{ address.address }}</text>
              </view>
            </view>
          </view>
          <view style="padding: 0 20rpx">
            <image
              src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/编辑_1735206337868.png"
              style="width: 30rpx; height: 30rpx; margin-right: 10rpx"
              @tap="editAddress(address)"
            ></image>
          </view>
        </view>
      </u-swipe-action-item>

      <!-- 加载状态 -->
      <view class="loading-more" v-if="loading">
        <u-loading-icon></u-loading-icon>
        <text>加载中...</text>
      </view>

      <!-- 无数据提示 -->
      <view v-if="addressList.length === 0 && !loading" class="empty-state">
        <u-empty mode="address" text="暂无地址"></u-empty>
      </view>
    </view>

    <!-- 添加地址按钮 -->
    <view class="add-button" @tap="addAddress">
      <u-icon name="plus" color="#fff" size="20"></u-icon>
      <text>新增地址</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { mockAddressList } from '@/utils/mock'
import { onShow } from '@dcloudio/uni-app'
import { getAction, deleteAction } from '@/common/store/manage'
import { load } from '@fingerprintjs/fingerprintjs'
// 地址列表数据
// 状态列表
const statusList = [
  { label: '发件地址', value: '1' },
  { label: '收货地址', value: '2' },
]
const currentStatus = ref('1')
const addressList = ref([])
const loading = ref(false)
onShow(() => {
  getAddressList()
})

// 页面卸载时移除事件监听
onUnmounted(() => {
  uni.$off('saveAddress')
})
// 切换状态
const switchStatus = (status) => {
  currentStatus.value = status

  addressList.value = []
  getAddressList()
}

// 编辑地址
const editAddress = (address) => {
  uni.navigateTo({
    url: `/pages/address/edit?id=${address.id}`,
  })
}

// 删除地址
const deleteAddress = (address) => {
  uni.showModal({
    title: '提示',
    content: '确定要删除该地址吗？',
    success: (res) => {
      if (res.confirm) {
        deleteAction(`/catalog/customerAddr/delete?id=${address.id}`).then((res) => {
          if (res.success) {
            uni.showToast({
              title: '删除成功',
              icon: 'success',
            })
            getAddressList()
          } else {
            uni.showToast({
              title: res.message,
            })
          }
        })
      }
    },
  })
}

// 新增地址
const addAddress = () => {
  uni.navigateTo({
    url: '/pages/address/add',
  })
}

//获取地址列表
const getAddressList = () => {
  loading.value = true
  getAction('/catalog/customerAddr/list', {
    pageNo: 1,
    pageSize: 9999,
    type: currentStatus.value,
    column: 'createTime',
    order: 'desc',
  }).then((res) => {
    if (res.success) {
      addressList.value = res.result.records
      loading.value = false
      // 获取地址列表
      uni.$on('saveAddress', (address) => {
        const index = addressList.value.findIndex((item) => item.id === address.id)
        if (index > -1) {
          // 更新现有地址
          addressList.value[index] = address
        } else {
          // 添加新地址
          address.id = String(addressList.value.length + 1)
          addressList.value.push(address)
        }
      })
    } else {
      loading.value = false
    }
  })
}

// 添加滑动按钮配置
const swipeOptions = ref([
  {
    text: '删除',
    style: {
      backgroundColor: '#ff6c6c',
      color: '#fff',
      padding: '0rpx 20rpx',
      marginLeft: '10rpx',
      borderRadius: '20rpx',
      height: '200rpx',
    },
  },
])

// 处理滑动按钮点击
const handleSwipeClick = (e, address) => {
  if (e.index === 0) {
    // 点击删除按钮
    deleteAddress(address)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.container {
  min-height: 100vh;
  background: #fafafa;
  padding-bottom: 120rpx;
}

.address-list {
  padding: 100rpx 30rpx;
}

.address-card {
  background: #fff;
  border-radius: 20rpx;
  margin-bottom: 25rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  transition: all 0.3s;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1;
  height: 200rpx;
  &.default-address {
    border: 2rpx solid $theme-color;

    .card-content {
      flex: 1;
      background: rgba($theme-color, 0.02);
    }
  }

  .card-content {
    padding: 30rpx;
  }

  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 16rpx;

    .name {
      font-size: 30rpx;
      font-weight: 600;
      color: #333;
      margin-right: 20rpx;
    }

    .phone {
      font-size: 28rpx;
      color: #666;
    }

    .default-tag {
      margin-left: auto;
      background: $theme-color;
      border-radius: 24rpx;
      padding: 4rpx 16rpx;
      display: flex;
      align-items: center;

      text {
        color: #fff;
        font-size: 22rpx;
        margin-left: 4rpx;
      }
    }
  }

  .address-info {
    .location {
      margin-bottom: 8rpx;

      .region {
        font-size: 26rpx;
        color: #929191;
        margin-right: 8rpx;
      }

      .detail {
        font-size: 28rpx;
        color: #929191;
      }
    }

    .postcode {
      font-size: 24rpx;
      color: #999;

      .label {
        margin-right: 8rpx;
      }
    }
  }
}

.add-button {
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  background: $theme-color;
  color: #fff;
  height: 96rpx;
  padding: 0 40rpx;
  border-radius: 48rpx;
  display: flex;
  align-items: center;
  gap: 12rpx;
  box-shadow: 0 4rpx 16rpx rgba(22, 119, 255, 0.2);
  width: 80%;
  justify-content: center;
  text {
    font-size: 28rpx;
  }
}
.loading-more {
  text-align: center;
  padding: 30rpx 0;
  color: #999;
  font-size: 24rpx;
}

.empty-state {
  padding-top: 200rpx;
}

.filter-tabs {
  background-color: #fff;
  white-space: nowrap;
  position: fixed;
  z-index: 99;
  border-bottom: 1rpx solid #eee;
  display: flex;
  .tab-item {
    display: inline-block;
    padding: 20rpx 30rpx;
    font-size: 28rpx;
    color: #666;
    position: relative;
    width: 20%;
    &.active {
      color: $theme-color;
      font-weight: 500;

      &::after {
        content: '';
        position: absolute;
        left: 12%;
        bottom: 0;
        // transform: translateX(-50%);
        width: 120rpx;
        height: 4rpx;
        background: $theme-color;
        border-radius: 2rpx;
      }
    }
  }
}
:deep(.u-swipe-action-item__right__button) {
  display: block !important;
}
// 添加滑动按钮样式覆盖
:deep(.u-swipe-action-item__content) {
  background-color: #f5f7fa !important;
  border-radius: 20rpx !important;
}
</style>
