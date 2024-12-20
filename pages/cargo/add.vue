<template>
  <view class="container">
    <view class="section">
      <view class="section-title">货箱信息</view>
      <view class="cargo-form">
        <view class="form-item">
          <text class="label">货箱尺寸</text>
          <view class="size-inputs">
            <view class="input-wrapper">
              <input type="number" v-model="cargoInfo.length" placeholder="长" />
              <text class="unit">cm</text>
            </view>
            <text class="multiply">x</text>
            <view class="input-wrapper">
              <input type="number" v-model="cargoInfo.width" placeholder="宽" />
              <text class="unit">cm</text>
            </view>
            <text class="multiply">x</text>
            <view class="input-wrapper">
              <input type="number" v-model="cargoInfo.height" placeholder="高" />
              <text class="unit">cm</text>
            </view>
          </view>
        </view>
        <view class="form-item">
          <text class="label">重量</text>
          <view class="input-wrapper">
            <input type="number" v-model="cargoInfo.weight" placeholder="请输入重量" />
            <text class="unit">kg</text>
          </view>
        </view>
        <view class="form-item">
          <text class="label">数量</text>
          <view class="input-wrapper">
            <input type="number" v-model="cargoInfo.count" placeholder="请输入数量" />
            <text class="unit">件</text>
          </view>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-header">
        <view class="section-title">商品列表</view>
        <view class="add-goodInfo-btn" @click="addGoods">
          <text class="iconfont icon-plus"></text>
          <text>添加商品</text>
        </view>
      </view>

      <view class="goodInfo-list" v-if="goodsList.length > 0">
        <view v-for="(item, index) in goodsList" :key="index" class="goodInfo-card">
          <view class="goodInfo-header">
            <view class="goodInfo-title">
              <text class="name">{{ item.name }}</text>
              <text class="en-name">{{ item.enName }}</text>
            </view>
            <view class="delete-btn" @tap="deleteGoods(index)">
              <u-icon name="trash" size="20" color="#ff4d4f"></u-icon>
            </view>
          </view>
          <view class="goodInfo-body">
            <view class="info-item">
              <text class="label">海关编码</text>
              <text class="value">{{ item.hsCode }}</text>
            </view>
            <view class="info-item">
              <text class="label">单价</text>
              <text class="value">¥{{ item.price }}</text>
            </view>
            <view class="info-item">
              <text class="label">数量</text>
              <view class="count-control">
                <u-number-box
                  v-model="item.count"
                  :min="1"
                  :max="999"
                  @change="(value) => updateGoodsQuantity(index, value)"
                ></u-number-box>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-else class="empty-tip">
        <image src="https://cdn.uviewui.com/uview/empty/data.png" mode="aspectFit" class="empty-icon" />
      </view>
    </view>

    <view class="bottom-bar">
      <u-button class="submit-btn" @tap="saveCargo">添加</u-button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const mode = ref('add')
const cargoInfo = ref({
  length: '',
  width: '',
  height: '',
  weight: '',
  count: '',
})

const goodsList = ref([])

// 监听商品添加事件
const handleAddGoods = (goodInfo) => {
  // 合并新选择的商品，如果已存在则更新数量
  goodInfo.forEach((item) => {
    const existingIndex = goodsList.value.findIndex((g) => g.sku === item.sku)
    if (existingIndex > -1) {
      goodsList.value[existingIndex].count += item.count
    } else {
      goodsList.value.push(item)
    }
  })
}

onMounted(() => {
  // 监听添加商品事件
  uni.$on('addGoods', handleAddGoods)

  // 获取页面参数
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]
  mode.value = page.$page?.options?.mode || 'add'

  // 如果是编辑模式，获取缓存的货箱数据
  if (mode.value === 'edit') {
    const editData = uni.getStorageSync('editCargo')
    if (editData) {
      // 解析尺寸字符串为长宽高
      const [length, width, height] = editData.cargo.size.split('x')
      cargoInfo.value = {
        length,
        width,
        height,
        weight: editData.cargo.weight,
        count: editData.cargo.count,
      }
      goodsList.value = [...editData.cargo.goodInfo]
      // 清除缓存
      uni.removeStorageSync('editCargo')
    }
  }
})

// 页面卸载时移除事件监听
onUnmounted(() => {
  uni.$off('addGoods', handleAddGoods)
})

// 保存货箱信息
const saveCargo = () => {
  if (
    !cargoInfo.value.length ||
    !cargoInfo.value.width ||
    !cargoInfo.value.height ||
    !cargoInfo.value.weight ||
    !cargoInfo.value.count
  ) {
    uni.showToast({
      title: '请完善货箱信息',
      icon: 'none',
    })
    return
  }

  if (goodsList.value.length === 0) {
    uni.showToast({
      title: '请添加商品信息',
      icon: 'none',
    })
    return
  }

  // 构建货箱数据
  const cargoData = {
    ...cargoInfo.value,
    size: `${cargoInfo.value.length}x${cargoInfo.value.width}x${cargoInfo.value.height}`,
    goodInfo: [...goodsList.value],
  }

  // 根据模式触发不同的事件
  if (mode.value === 'edit') {
    const editData = uni.getStorageSync('editCargo')
    uni.$emit('updateCargo', {
      index: editData.index,
      cargo: cargoData,
    })
    // 编辑完成后再清除缓存
    uni.removeStorageSync('editCargo')
  } else {
    uni.$emit('addCargo', cargoData)
  }

  uni.navigateBack()
}

// 添加商品
const addGoods = () => {
  uni.navigateTo({
    url: '/pages/goods/list',
  })
}

// 删除商品
const deleteGoods = (index) => {
  goodsList.value.splice(index, 1)
}

// 更新商品数量
const updateGoodsQuantity = (index, value) => {
  if (value <= 0) {
    goodsList.value.splice(index, 1)
  } else {
    goodsList.value[index].count = value
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 80rpx;
  // padding: 20rpx 20rpx 120rpx;
}

.section {
  background: #fff;
  // border-radius: 26rpx;
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
    //   rgba(207, 139, 13, 0.12) 0%,
    //   rgba(226, 178, 88, 0.05) 35%,
    //   rgba(226, 178, 88, 0.02) 60%,
    //   rgba(226, 178, 88, 0) 100%
    // );
    pointer-events: none;
    z-index: 1;
  }
  .section-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .section-title {
    position: relative;
    z-index: 2;
    font-family: YouSheBiaoTiHei;
    color: #424141;
    line-height: 62rpx;
    font-weight: bold;
  }
}

// 货箱表单样式
.cargo-form {
  position: relative;
  z-index: 2;

  .form-item {
    display: flex;
    align-items: center;
    margin: 30rpx 0;

    .label {
      width: 160rpx;
      font-size: 28rpx;
      color: #333;
    }

    .size-inputs {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 12rpx;

      .input-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        background: #f9fafb;
        border-radius: 8rpx;
        padding: 0 20rpx;

        input {
          flex: 1;
          height: 72rpx;
          font-size: 28rpx;
          text-align: center;
        }
      }

      .multiply {
        color: #666;
        font-size: 24rpx;
      }
    }

    .input-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      background: #f9fafb;
      border-radius: 8rpx;
      padding: 0 20rpx;

      input {
        flex: 1;
        height: 72rpx;
        font-size: 28rpx;
      }

      .unit {
        font-size: 24rpx;
        color: #666;
        margin-left: 10rpx;
      }
    }
  }
}

// 商品列表样式
.goodInfo-list {
  position: relative;
  z-index: 2;
}

.goodInfo-card {
  border: 1px solid #f5f4f4;
  border-radius: 15rpx;
  padding: 30rpx;
  margin-top: 20rpx;

  .goodInfo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rpx;
    padding-bottom: 16rpx;
    border-bottom: 2rpx dashed #eee;

    .goodInfo-title {
      .name {
        font-size: 28rpx;
        font-weight: bold;
        color: #6d6c6c;
        margin-right: 12rpx;
      }

      .en-name {
        font-size: 24rpx;
        color: #666;
      }
    }

    .delete-btn {
      padding: 10rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      &:active {
        opacity: 0.8;
      }
    }
  }

  .goodInfo-body {
    .info-item {
      display: flex;
      margin-top: 30rpx;
      align-items: center;
      .label {
        width: 120rpx;
        font-size: 26rpx;
        color: #c7c5c5;
      }

      .value {
        flex: 1;
        font-size: 26rpx;
        color: #575555;
      }

      .count-control {
        flex: 1;
        display: flex;
        align-items: center;
      }
    }
  }
}

.empty-tip {
  text-align: center;
  padding: 60rpx 0;
  color: #999;
  font-size: 28rpx;

  .empty-icon {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 20rpx;
  }
}

.add-goodInfo-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid $theme-color;
  padding: 10rpx 15rpx;
  border-radius: 30rpx;
  display: flex;
  align-items: center;
  color: $theme-color;
  font-size: 28rpx;
  .icon-plus {
    margin-right: 8rpx;
    font-size: 32rpx;
  }
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
  justify-content: center;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  z-index: 999;

  .submit-btn {
    width: 90%;
    height: 80rpx;
    line-height: 80rpx;
    background: linear-gradient(
      to right,
      rgba(255, 184, 19, 0.6),
      rgba(255, 184, 19, 0.7) 30%,
      rgba(255, 184, 19, 0.9)
    );
    color: #fff;
    border-radius: 40rpx;
    font-size: 28rpx;
  }
}
</style>
