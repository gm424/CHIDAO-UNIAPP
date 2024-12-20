<template>
  <view class="container">
    <!-- 下拉刷新 -->
    <scroll-view
      scroll-y
      class="scroll-container"
      :refresher-enabled="true"
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onRefresh"
      @scrolltolower="onLoadMore"
    >
      <!-- 顶部搜索栏 -->
      <view class="search-header">
        <u-search
          v-model="searchKeyword"
          placeholder="搜索商品名称/编码"
          :show-action="false"
          :clearabled="true"
          @change="onSearch"
        ></u-search>
      </view>

      <!-- 商品列表 -->
      <view class="goods-list">
        <u-swipe-action-item
          v-for="item in goodsList"
          :key="item.id"
          :options="swipeOptions"
          @click="handleSwipeClick($event, item)"
        >
          <view class="goods-card" @tap="editGoods(item)">
            <view class="goods-main">
              <view class="goods-info">
                <text class="goods-name">{{ item.name }}</text>

                <div class="goods-en">
                  <image
                    src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/海关编码_1734489867388.png"
                    style="width: 30rpx; height: 30rpx; margin-right: 10rpx"
                  ></image>
                  <text>{{ item.sku }}</text>
                </div>
              </view>
              <view class="goods-actions">
                <view
                  >$<text style="color: #fa5252; font-size: 38rpx">{{ item.price }}</text></view
                >
                <!-- <u-icon name="edit-pen" size="20" color="#ffc848" @click="editGoods(item)"></u-icon>
                <u-icon name="trash" size="20" color="#ff4d4f" @click="deleteGoods(item)"></u-icon> -->
              </view>
            </view>

            <view class="goods-details">
              <view class="detail-row">
                <view class="detail-item">
                  <text class="label">英文名称:</text>
                  <text class="value">{{ item.enName }}</text>
                </view>
              </view>
              <view class="detail-row">
                <view class="detail-item">
                  <text class="label">材质:</text>
                  <text class="value">{{ item.material }}</text>
                </view>
              </view>
              <view class="detail-row">
                <view class="detail-item">
                  <text class="label">海关编码:</text>
                  <text class="value">{{ item.hsCode }}</text>
                </view>
              </view>
            </view>
          </view>
        </u-swipe-action-item>
      </view>

      <!-- 加载更多 -->
      <view class="loading-more" v-if="goodsList.length > 0">
        <text v-if="loading">加载中...</text>
        <text v-else-if="!hasMore">没有更多了</text>
      </view>

      <!-- 底部添加按钮 -->
      <view class="add-button" @tap="addGoods">
        <u-icon name="plus" color="#fff" size="24"></u-icon>
        <text>新增商品</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAction, postAction, deleteAction } from '@/common/store/manage'
import { onShow } from '@dcloudio/uni-app'
const searchKeyword = ref('')
const goodsList = ref([])

const editingGoods = ref({})

// 分页相关
const pageNo = ref(1)
const pageSize = ref(10)
const total = ref(0)
const hasMore = ref(true)
const loading = ref(false)
const isRefreshing = ref(false)

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
      height: '180rpx',
    },
  },
])

// 加载商品列表
const loadGoodsList = async (type = 'add') => {
  loading.value = true
  try {
    const res = await getAction('/merch/sku/list', {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      sku: searchKeyword.value,
      column: 'createTime',
      order: 'desc',
    })

    if (res.success) {
      if (type === 'refresh') {
        goodsList.value = res.result.records || []
      } else {
        goodsList.value = [...goodsList.value, ...(res.result.records || [])]
      }
      total.value = res.result.total
      hasMore.value = goodsList.value.length < total.value
    }
  } catch (error) {
    console.error('加载商品列表失败:', error)
  } finally {
    loading.value = false
    isRefreshing.value = false
  }
}

// 搜索
const onSearch = () => {
  pageNo.value = 1
  goodsList.value = []
  hasMore.value = true
  loadGoodsList('refresh')
}

// 下拉刷新
const onRefresh = async () => {
  isRefreshing.value = true
  pageNo.value = 1
  await loadGoodsList('refresh')
}

// 上拉加载更多
const onLoadMore = async () => {
  if (!hasMore.value || loading.value) return
  pageNo.value++
  await loadGoodsList()
}

// 编辑商品
const editGoods = (goods) => {
  uni.setStorageSync('goods', goods)
  uni.navigateTo({
    url: `/pages/goods/edit?id=${goods.id}`,
  })
}

// 新增商品
const addGoods = () => {
  uni.navigateTo({
    url: '/pages/goods/add',
  })
}

// 删除商品
const deleteGoods = async (goods) => {
  uni.showModal({
    title: '提示',
    content: '确定要删除该商品吗？',
    success: async (res) => {
      if (res.confirm) {
        console.log('delete id', goods.id)
        const result = await deleteAction(`/merch/sku/delete?id=${goods.id}`)
        if (result.success) {
          uni.showToast({
            title: '删除成功',
            icon: 'success',
          })
          goodsList.value = []
          loadGoodsList()
        }
      }
    },
  })
}

// 处理滑动按钮点击
const handleSwipeClick = (e, goods) => {
  if (e.index === 0) {
    // 点击删除按钮
    deleteGoods(goods)
  }
}

onMounted(() => {
  loadGoodsList('refresh')
})
onShow(() => {
  loadGoodsList('refresh')
})
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.container {
  height: 100vh;
  background: #f5f7fa;
  display: flex;

  flex-direction: column;
}

.scroll-container {
  flex: 1;
  height: 0;
}

.search-header {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 20rpx;
  background: #fff;
}

.goods-list {
  width: 95%;
  margin: 0 auto;
  .goods-card {
    background: #fff;
    border-radius: 30rpx;
    padding: 24rpx;
    margin-top: 25rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.09);
    position: relative;
    z-index: 1;
    height: 250rpx;

    .goods-main {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10rpx;

      .goods-info {
        flex: 1;

        .goods-name {
          font-size: 32rpx;
          font-weight: 530;
          color: #333;
          margin-bottom: 20rpx;
          display: block;
        }

        .goods-en {
          font-size: 24rpx;
          color: #525151;
          margin-bottom: 12rpx;
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .goods-tags {
          display: flex;
          gap: 12rpx;
        }
      }

      .goods-actions {
        display: flex;
        gap: 24rpx;
        align-items: flex-start;
      }
    }

    .goods-details {
      background: #fff;
      border-radius: 12rpx;
      .detail-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8rpx;

        &:last-child {
          margin-bottom: 0;
        }

        .detail-item {
          flex: 1;

          .label {
            font-size: 24rpx;
            color: #a09d9d;
            margin-right: 12rpx;
          }

          .value {
            font-size: 24rpx;
            color: #747272;

            &.price {
              color: #ff4d4f;
              font-weight: 500;
            }
          }
        }
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

  text {
    font-size: 28rpx;
  }
}

.edit-popup {
  background: #fff;
  border-radius: 24rpx 24rpx 0 0;

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #eee;

    .title {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
    }
  }

  .popup-content {
    padding: 30rpx;
    max-height: 60vh;
    overflow-y: auto;
  }

  .popup-footer {
    padding: 20rpx 30rpx;
    border-top: 1rpx solid #eee;
    display: flex;
    gap: 20rpx;

    .u-button {
      flex: 1;
    }
  }
}

.loading-more {
  text-align: center;
  padding: 20rpx 0;
  color: #999;
  font-size: 24rpx;
}

// 添加滑动按钮样式覆盖
:deep(.u-swipe-action-item__content) {
  background-color: #f5f7fa !important;
  border-radius: 20rpx !important;
}
</style>
