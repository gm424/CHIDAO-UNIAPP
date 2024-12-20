<template>
  <view class="container">
    <!-- 搜索栏优化 -->
    <view class="search-bar">
      <view class="search-input">
        <u-icon name="search" size="28" color="#666"></u-icon>
        <input type="text" v-model="searchKey" placeholder="搜索商品名称/SKU" />
        <u-icon v-if="searchKey" name="close-circle-fill" size="28" color="#999" @click="searchKey = ''"></u-icon>
      </view>
    </view>

    <!-- 空状态展示 -->
    <view class="empty-state" v-if="goodsList.length === 0 && !loading">
      <image src="https://cdn-icons-png.flaticon.com/512/7486/7486831.png" mode="aspectFit"></image>
      <text>暂无相关商品</text>
    </view>

    <!-- 商品列表优化 -->
    <view class="goods-list">
      <view
        v-for="item in goodsList"
        :key="item.sku"
        class="goods-item"
        :class="{ selected: selectedGoods[item.sku] }"
        @tap="handleCardClick(item)"
      >
        <view
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 94%;
            border-bottom: 1px dashed #f2f2f2;
            align-items: center;
            padding: 20rpx;
          "
        >
          <view class="goods-info">
            <view class="goods-main">
              <view class="name-section">
                <text class="goods-name">{{ item.name }}</text>
                <!-- <u-tag v-if="item.stock < 10" text="库存紧张" type="warning" size="mini"></u-tag> -->
              </view>
            </view>
          </view>
          <view class="goods-select" @tap.stop>
            <u-checkbox-group>
              <u-checkbox
                :model-value="isSelected(item.sku)"
                @change="(value) => handleSelect(item, value)"
                shape="circle"
                activeColor="#fbc02d"
              ></u-checkbox>
            </u-checkbox-group>
          </view>
        </view>
        <view
          style="display: flex; flex-direction: row; justify-content: space-between; width: 100%; align-items: center"
        >
          <view class="goods-info-section">
            <view class="sku-section">
              <text class="goods-sku">SKU: {{ item.sku }}</text>
            </view>
            <view class="goods-sub">
              <view class="hs-code">
                <text>海关编码：{{ item.hsCode }}</text>
              </view>
            </view>
            <view class="goods-sub">
              <view class="price-section">
                <text
                  >申报单价：<text class="price">{{ item.price }}</text></text
                >
              </view>
            </view>
          </view>

          <view class="goods-count" @tap.stop v-if="selectedGoods[item.sku]">
            <u-number-box
              v-model="selectedGoods[item.sku].count"
              @change="(value) => handleQuantityChange(item, value)"
              :min="1"
              :max="item.stock"
              :step="1"
              :buttonSize="28"
            ></u-number-box>
          </view>
        </view>
      </view>
    </view>

    <!-- 加载状态 -->
    <view class="loading-more" v-if="loading">
      <u-loading-icon></u-loading-icon>
      <text>加载中...</text>
    </view>
    <view class="no-more" v-if="!hasMore && goodsList.length > 0">
      <text>没有更多数据了</text>
    </view>

    <!-- 底部操作栏优化 -->
    <view class="bottom-bar" v-if="Object.keys(selectedGoods).length > 0">
      <view class="selected-info">
        <u-icon name="shopping-cart-fill" size="32" color="#fbc02d"></u-icon>
        <view class="info-text">
          <text class="count">已选 {{ Object.keys(selectedGoods).length }} 种商品</text>
          <text class="total">共 {{ totalQuantity }} 件</text>
        </view>
      </view>
      <u-button
        @tap="confirmSelect"
        text="确定"
        :customStyle="{
          width: '180rpx',
          height: '80rpx',
          borderRadius: '40rpx',
          color: '#fff',
          backgroundColor: '#fbc02d',
        }"
      ></u-button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { getAction } from '@/common/store/manage'
import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'

// 分页参数
const pageNo = ref(1)
const pageSize = ref(10)
const total = ref(0)
const hasMore = ref(true)
const loading = ref(false)

// 数据列表
const goodsList = ref([])
const searchKey = ref('')
const selectedGoods = ref({})

// 搜索过滤
// const filteredGoods = computed(() => {
//   getGoodsList()
//   return goodsList.value
// })

// 获取商品列表
const getGoodsList = async (isRefresh = false) => {
  if (loading.value) return
  loading.value = true

  const res = await getAction('/merch/sku/list', {
    pageNo: pageNo.value,
    pageSize: pageSize.value,
    sku: searchKey.value,
    column: 'creatTime',
    order: 'desc',
  })

  if (res.success) {
    const records = res.result.records
    total.value = res.result.total

    // 判断是刷新还是加载更多
    if (isRefresh) {
      goodsList.value = records
    } else {
      goodsList.value = [...goodsList.value, ...records]
    }
    loading.value = false
    console.log('商品列表', goodsList.value)
    // 判断是否还有更多数据
    hasMore.value = goodsList.value.length < total.value
  }
}

// 刷新数据
const refreshList = () => {
  pageNo.value = 1
  hasMore.value = true
  getGoodsList(true)
}

// 加载更多
const loadMore = () => {
  if (!hasMore.value || loading.value) return
  pageNo.value++
  getGoodsList()
}

// 监听搜索关键词变化
watch(searchKey, () => {
  refreshList()
})

// 下拉刷新
onPullDownRefresh(() => {
  refreshList()
})

// 上拉加载
onReachBottom(() => {
  loadMore()
})

// 初始化
onMounted(() => {
  getGoodsList()
})

// 添加判断商品是否选中的方法
const isSelected = (sku) => {
  return !!selectedGoods.value[sku]
}

// 选择商品
const handleSelect = (goods, checked) => {
  if (checked) {
    selectedGoods.value[goods.sku] = {
      ...goods,
      count: 1,
    }
  } else {
    delete selectedGoods.value[goods.sku]
  }
}

// 更新数量
const handleQuantityChange = (goods, value) => {
  if (value <= 0) {
    delete selectedGoods.value[goods.sku]
  } else {
    selectedGoods.value[goods.sku].count = value
  }
}

// 计算总数量
const totalQuantity = computed(() => {
  return Object.values(selectedGoods.value).reduce((sum, item) => sum + item.count, 0)
})

// 确认选择
const confirmSelect = () => {
  // 将选中的商品数据转换为数组
  const selectedList = Object.values(selectedGoods.value).map((item) => item)

  // 触发事件，传递选中的商品数据
  uni.$emit('addGoods', selectedList)
  uni.navigateBack()
}

// 添加卡片点击处理函数
const handleCardClick = (goods) => {
  if (selectedGoods.value[goods.sku]) {
    delete selectedGoods.value[goods.sku]
  } else {
    selectedGoods.value[goods.sku] = {
      ...goods,
      count: 1,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.container {
  min-height: 100vh;

  padding-bottom: 120rpx;
}

.search-bar {
  background: #fff;
  padding: 20rpx;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

  .search-input {
    display: flex;
    align-items: center;
    background: #f5f5f5;
    border-radius: 36rpx;
    padding: 0 24rpx;
    height: 72rpx;
    transition: all 0.3s;

    &:focus-within {
      background: #eef5ff;
    }

    :deep(.u-icon) {
      margin-right: 12rpx;
    }

    input {
      flex: 1;
      font-size: 28rpx;
      color: #333;
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120rpx 0;

  image {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 20rpx;
  }

  text {
    color: #999;
    font-size: 28rpx;
  }
}

.goods-list {
  padding: 30rpx;

  .goods-item {
    background: #fff;
    border-radius: 16rpx;
    // padding: 20rpx;
    margin-bottom: 26rpx;
    display: flex;
    flex-direction: column;
    border: 1px solid #ebe9e9;
    align-items: flex-start;
    // box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
    transition: all 0.3s;
    cursor: pointer;
    min-height: 160rpx;
    position: relative;

    &.selected {
      background: #fcfaf2;
      border: 2rpx solid $theme-color;
    }

    .goods-select {
    }

    .goods-info {
      flex: 1;
      display: flex;
      align-items: center;

      .goods-main {
        .name-section {
          display: flex;
          align-items: center;
          gap: 12rpx;
          margin-bottom: 8rpx;
        }

        .goods-name {
          font-size: 30rpx;
          color: #333;
          font-weight: 600;
        }

        .goods-en-name {
          font-size: 24rpx;
          color: #666;
          display: block;
          margin: 8rpx 0;
        }
      }
    }

    .goods-count {
      // min-width: 180rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-right: 20rpx;
      .stock-info {
        font-size: 22rpx;
        color: #999;
      }
    }
  }
}
.goods-info-section {
  width: 94%;
  border-bottom: 1px dashed #f2f2f2;
  align-items: center;
  padding: 20rpx;
}
.sku-section {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-top: 10rpx;

  .goods-sku {
    font-size: 26rpx;
    color: #8d8b8b;
  }
}
.goods-sub {
  font-size: 26rpx;
  color: #8d8b8b;
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  margin-top: 20rpx;
  .hs-code,
  .price-section {
    display: flex;
    align-items: center;
    gap: 8rpx;
  }

  .price {
    color: #ff4d4f;
    font-weight: 600;
    font-size: 26rpx;
  }
}
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  padding: 20rpx 32rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);

  .selected-info {
    display: flex;
    align-items: center;
    gap: 16rpx;
    flex: 1;
    .info-text {
      display: flex;
      flex-direction: column;
      gap: 4rpx;

      .count {
        font-size: 28rpx;
        color: #333;
        font-weight: 500;
      }

      .total {
        font-size: 24rpx;
        color: #ff4d4f;
      }
    }
  }
}

.loading-more {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30rpx 0;
  color: #999;
  font-size: 24rpx;

  :deep(.u-loading-icon) {
    margin-right: 12rpx;
  }
}

.no-more {
  text-align: center;
  padding: 30rpx 0;
  color: #999;
  font-size: 24rpx;
}
</style>
