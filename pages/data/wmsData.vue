<template>
  <view>
    <view class="card">
      <view class="title">库存总数</view>
      <view class="header">
        <view class="header-order">36.75万</view>
        <view class="count">
          <text>同比: </text>
          <image
            src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/上升_1734596204748.png"
            style="width: 28rpx; height: 28rpx"
          ></image>
          <text style="color: #333">1.29%</text>
        </view>
        <view class="count">
          <text>环比: </text>
          <image
            src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/上升_1734596204748.png"
            style="width: 28rpx; height: 28rpx"
          ></image>
          <text style="color: #333">6.29%</text>
        </view>
      </view>
      <view class="content">
        <view class="content-item" style="border-right: 1px #e2e2e2 solid">
          <view class="content-title">在途数量(件)</view>
          <view class="content-count">1.23万</view>
        </view>
        <view class="content-item" style="border-right: 1px #f2f2f2 solid">
          <view class="content-title">锁定数量(件)</view>
          <view class="content-count">0.82万</view>
        </view>
        <view class="content-item">
          <view class="content-title">离仓数量(件)</view>
          <view class="content-count">120.01万</view>
        </view>
      </view>
    </view>

    <!-- <view class="stat-container">
      <view class="title">
        <image
          src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/大数据科技数据流转_1734521664475.png"
          style="width: 40rpx; height: 40rpx"
        ></image>
        <view>库存周转分析</view>
      </view>

      <view class="tab">库存周转率</view>

      <view class="header">
        <view class="header-order">86.88%</view>
        <view class="count">同比:2.12%</view>
        <view class="count">环比:1.31%</view>
      </view>

      <view class="description">
        <view class="tab">平均在仓时间</view>
        <view class="time">21天</view>
      </view>

      <view class="charts-box">
        <qiun-data-charts type="ring" :opts="optsWms" :chartData="chartDataWms" />
      </view>
    </view> -->

    <!-- 产品货值分布卡片 -->
    <view class="chart-card">
      <view class="title">
        <image
          src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/大数据科技数据流转_1734521664475.png"
          style="width: 40rpx; height: 40rpx"
        ></image>
        <view>产品货值分布</view>
      </view>
      <view class="card-header">
        <view class="switch-group">
          <text
            class="switch-item"
            :class="{ active: distributionType === 'value' }"
            @tap="switchDistributionType('value')"
            >货值分布</text
          >
          <text
            class="switch-item"
            :class="{ active: distributionType === 'type' }"
            @tap="switchDistributionType('type')"
            >类型分布</text
          >
        </view>
      </view>
      <view class="chart-content">
        <view class="chart-wrapper">
          <qiun-data-charts type="ring" :opts="valueDistOpts" :chartData="currentDistData" />
        </view>
      </view>
    </view>

    <view class="chart-card-range">
      <view class="title">
        <image
          src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/下降趋势_1734664718481.png"
          style="width: 40rpx; height: 40rpx"
        ></image>
        <view>库存单量趋势</view>
      </view>

      <view class="switch-group">
        <text class="switch-item" :class="{ active: warehouseType === '6' }" @tap="switchWarehouseType('6')"
          >入库单</text
        >
        <text class="switch-item" :class="{ active: warehouseType === '7' }" @tap="switchWarehouseType('7')"
          >出库单</text
        >
        <text class="switch-item" :class="{ active: warehouseType === '8' }" @tap="switchWarehouseType('8')"
          >调拨单</text
        >
      </view>

      <view class="status-cardlist">
        <view class="status-card" style="border-right: 3rpx solid #e9e7e7">
          <view class="status-icon new"> </view>
          <view class="status-content">
            <text class="status-label">新订单</text>
            <text class="status-value">{{ formatNumber(newCreatedCount) }}</text>
          </view>
        </view>
        <view class="status-card" style="border-right: 3rpx solid #e9e7e7">
          <view class="status-icon processing"> </view>
          <view class="status-content">
            <text class="status-label">执行中</text>
            <text class="status-value">{{ formatNumber(pendingExecutionCount) }}</text>
          </view>
        </view>
        <view class="status-card">
          <view class="status-icon completed"> </view>
          <view class="status-content">
            <text class="status-label">已完成</text>
            <text class="status-value">{{ formatNumber(completedCount) }}</text>
          </view>
        </view>
      </view>

      <view class="status-cards">
        <view class="status-card" :class="{ active: currentMetric === 'order' }" @tap="switchMetric('order')">
          <view class="status-content">
            <text class="status-label">订单数量</text>
            <text class="status-value">{{ formatNumber(orderCount) }}</text>
          </view>
        </view>
        <view class="status-card" :class="{ active: currentMetric === 'value' }" @tap="switchMetric('value')">
          <view class="status-content">
            <text class="status-label">货值</text>
            <text class="status-value">{{ formatNumber(amount) }}</text>
          </view>
        </view>
        <view class="status-card" :class="{ active: currentMetric === 'quantity' }" @tap="switchMetric('quantity')">
          <view class="status-content">
            <text class="status-label">货物数量</text>
            <text class="status-value">{{ formatNumber(pcs) }}</text>
          </view>
        </view>
      </view>
      <view class="chart-content">
        <qiun-data-charts type="area" :opts="chartOpts" :chartData="currentWarehouseData" />
      </view>
    </view>

    <!-- 库存排行榜卡片 -->
    <view class="chart-card-range">
      <view class="card-header">
        <view class="title">
          <image
            src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/排行榜_1734664705135.png"
            style="width: 40rpx; height: 40rpx"
          ></image>
          <view>库存排行TOP 10</view>
        </view>
        <view class="warehouse-select" @tap="showSelect">
          <view class="selected-warehouse">
            <text>{{ selectedWarehouseLabel }}</text>
            <u-icon :name="showWarehouseSelect ? 'arrow-up' : 'arrow-down'" size="14" color="#666"></u-icon>
          </view>
          <!-- 下拉选项 -->
          <view class="warehouse-options" v-if="showWarehouseSelect">
            <view
              class="option-item"
              v-for="item in warehouseOptions"
              :key="item.value"
              :class="{ active: selectedWarehouse === item.value }"
              @click.stop="selectWarehouse(item)"
            >
              <text>{{ item.label }}</text>

              <u-icon v-if="selectedWarehouse === item.value" name="checkmark" size="14" color="#2b5cff"></u-icon>
            </view>
          </view>
        </view>
      </view>

      <view class="rank-list">
        <!-- 表头 -->
        <view class="rank-header">
          <text class="col rank">排名</text>
          <text class="col name">品名</text>
          <text class="col type">产品类型</text>
          <text class="col value">产品货值</text>
          <text class="col stock">库存数量</text>
        </view>

        <!-- 列表内容 -->
        <view class="rank-item" v-for="(item, index) in inventoryRankList" :key="index">
          <text class="col rank">
            <view class="rank-num" :class="{ 'top-3': index < 3 }">
              <text>{{ index + 1 }}</text>
              <image v-if="index < 3" :src="imageList[index]" style="width: 70rpx; height: 40rpx"></image>
            </view>
          </text>
          <text class="col name">{{ item.name }}</text>
          <text class="col type">{{ item.type }}</text>
          <text class="col value">${{ formatNumber(item.value) }}</text>
          <text class="col stock">{{ formatNumber(item.stock) }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { getAction } from '@/common/store/manage'
import { onReady } from '@dcloudio/uni-app'
const chartDataWms = ref({})

const chartOpts = ref({
  color: ['#FAC858', '#91CB74', '#EE6666', '#73C0DE', '#3CA272'],
  padding: [15, 15, 0, 15],
  enableScroll: false,
  legend: {
    show: true,
    position: 'top',
    float: 'right',
    itemWidth: 15,
    itemGap: 20,
    padding: 10,
  },
  xAxis: {
    disableGrid: true,
    labelCount: 4,
  },
  yAxis: {
    gridType: 'dash',
    dashLength: 2,
    formatter: (val) => val,
  },
  extra: {
    area: {
      type: 'straight',
      opacity: 0.15,
      addLine: true,
      width: 2,
      gradient: false,
      activeType: 'none',
    },
    line: {
      type: 'straight',
      width: 2,
    },
  },
  dataLabel: false,
  dataPointShape: true,
  enableMarkLine: false,
})
// 下拉框显示状态
const showWarehouseSelect = ref(false)
const showSelect = () => {
  showWarehouseSelect.value = !showWarehouseSelect.value
  console.log('显示', showWarehouseSelect.value)
}
const newCreatedCount = ref(0)
const pendingExecutionCount = ref(0)
const completedCount = ref(0)

const orderCount = ref(0)
const amount = ref(0)
const pcs = ref(0)
const optsWms = ref({
  rotate: false,
  rotateLock: false,
  color: ['#1890FF', '#91CB74', '#FAC858'],
  padding: [5, 5, 5, 5],
  dataLabel: true,
  enableScroll: false,
  legend: {
    show: true,
    position: 'right',
    lineHeight: 25,
  },
  title: {
    fontSize: 15,
    color: '#666666',
  },
  subtitle: {
    name: '36.75万',
    fontSize: 25,
    color: '#7cb5ec',
  },
  extra: {
    ring: {
      ringWidth: 40,
      activeOpacity: 0.5,
      offsetAngle: 0,
      labelWidth: 15,
      border: true,
      borderWidth: 3,
      borderColor: '#FFFFFF',
      centerText: {
        content: '45%',
        fontSize: 30,
        color: '#1890FF',
      },
    },
  },
})

onReady(() => {
  getServerData()
})

const getServerData = () => {
  //模拟从服务器获取数据时的延时
  setTimeout(() => {
    //模拟服务器返回数据，如果据格式和标准格式不同，需自行按下面的格式拼接
    let res = {
      series: [
        {
          data: [
            { name: '库龄0~30', value: 254000, labelShow: false },
            { name: '库龄31~180', value: 78000, labelShow: false },
            { name: '库龄180+', value: 35500, labelShow: false },
          ],
        },
      ],
    }
    chartDataWms.value = JSON.parse(JSON.stringify(res))
  }, 500)
}

// 仓储数据类型
const warehouseType = ref('6') // inbound-入库 outbound-出库 transfer-调拨

// 当前选中的指标类型
const currentMetric = ref('order') // 默认显示订单数量
// 分布类型切换
const distributionType = ref('value')

// 切换分布类型
const switchDistributionType = (type) => {
  distributionType.value = type
}
// 产品货值分布图配置
const valueDistOpts = ref({
  padding: [5, 5, 5, 5],
  dataLabel: false,
  legend: {
    show: true,
    position: 'bottom',
    lineHeight: 5,
  },
  extra: {
    ring: {
      ringWidth: 60,
      centerColor: '#FFFFFF',
      activeOpacity: 0.7,
      activeRadius: 10,
      offsetAngle: 0,
      border: false,
      borderWidth: 3,
      borderColor: '#FFFFFF',
      spaceBetween: 2,
      animation: true,
      animationDuration: 1000,
      animationType: 'scale',
    },
  },
})
// 货值分布数据
const valueDistData = ref({
  series: [
    {
      data: [
        { name: '0-1000元', value: 2500 },
        { name: '1000-5000元', value: 3500 },
        { name: '5000-10000元', value: 1800 },
        { name: '10000-50000元', value: 1200 },
        { name: '50000元以上', value: 500 },
      ],
    },
  ],
})

const typeDistData = ref({
  series: [
    {
      data: [
        { name: '3C', value: 4500 },
        { name: '电子烟', value: 3500 },
        { name: '小米', value: 1800 },
      ],
    },
  ],
})

// 当前显示的分布数据
const currentDistData = computed(() => {
  return distributionType.value === 'value' ? valueDistData.value : typeDistData.value
})
const categories = ref([])
const seriesData = ref([])

// 当前显示的图表数据
const currentWarehouseData = computed(() => {
  console.log('加载图表数据WMS', categories.value, seriesData.value)
  return {
    categories: categories.value,
    series: seriesData.value,
  }
})

// 切换仓储数据类型
const switchWarehouseType = (type) => {
  warehouseType.value = type

  loadWmsData()
  loadWmsOrderData()
}

// 切换指标类型
const switchMetric = (metric) => {
  currentMetric.value = metric

  loadWmsOrderData()
}

// 订单状态数据
const orderStatus = {
  inbound: {
    new: 160,
    processing: 42,
    completed: 103,
  },
  outbound: {
    new: 10,
    processing: 3306,
    completed: 2152,
  },
  transfer: {
    new: 1,
    processing: 0,
    completed: 106,
  },
}

// 仓库选择相关
const selectedWarehouse = ref('all')
const warehouseOptions = ref([])

const selectedWarehouseLabel = computed(() => {
  const selected = warehouseOptions.value.find((item) => item.value === selectedWarehouse.value)
  return selected ? selected.label : '全部仓库'
})

// 格式化数字显示
const formatNumber = (num) => {
  if (!num) return '0'
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }
  // 添加千位分隔符
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
const imageList = ref([
  'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/编组30_1734664613566.png',
  'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/编组30备份_1734664629802.png',
  'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/编组30备份2_1734664658738.png',
])
// 库存排行数据
const inventoryRankList = ref([
  {
    name: '电子手表',
    type: '电子产品',
    value: 125600.0,
    stock: 1256,
  },
  {
    name: '蓝牙耳机',
    type: '电子产品',
    value: 98500.0,
    stock: 985,
  },
  {
    name: '运动鞋',
    type: '服装鞋帽',
    value: 85600.0,
    stock: 856,
  },
  {
    name: '充电宝',
    type: '电子产品',
    value: 75600.0,
    stock: 756,
  },
  {
    name: '休闲裤',
    type: '服装鞋帽',
    value: 68500.0,
    stock: 685,
  },
  // ... 更多数据
])

// 监听仓库选择变化
watch(selectedWarehouse, async (newVal) => {
  // 这里可以调用API获取对应仓库的排行数据
  try {
    const res = await getAction('/warehouse/inventory/rank', {
      warehouseId: newVal,
      pageSize: 10,
    })
    if (res.success) {
      inventoryRankList.value = res.result
    }
  } catch (error) {
    console.error('获取库存排行数据失败:', error)
  }
})

// 选择仓库
const selectWarehouse = (item) => {
  selectedWarehouse.value = item.value
  showWarehouseSelect.value = false
}
const loadWmsData = () => {
  getAction('/wms/statistics/getOrderSummary', { orderType: warehouseType.value, dateRange: 'L30DS' }).then((res) => {
    if (res.success) {
      newCreatedCount.value = res.result.newCreatedCount
      pendingExecutionCount.value = res.result.pendingExecutionCount
      completedCount.value = res.result.completedCount
    }
  })
}
const loadWmsOrderData = () => {
  getAction('/wms/statistics/getOrderDataByType', { orderType: warehouseType.value, dateRange: 'L30DS' }).then(
    (res) => {
      if (res.success) {
        orderCount.value = res.result.orderCount
        amount.value = res.result.amount
        pcs.value = res.result.unControlPcs + res.result.controlPcs
        categories.value = res.result.dataList.map((item) => {
          return item.orderDate
        })
        if (currentMetric.value === 'order') {
          seriesData.value = [
            {
              name: '单量',
              data: res.result.dataList.map((it) => {
                return it.orderCount
              }),
            },
          ]
        } else if (currentMetric.value === 'value') {
          seriesData.value = [
            {
              name: '单量',
              data: res.result.dataList.map((it) => {
                return it.amount
              }),
            },
          ]
        } else {
          seriesData.value = [
            {
              name: '单量',
              data: res.result.dataList.map((it) => {
                return it.controlPcs + it.unControlPcs
              }),
            },
          ]
        }
      }
    }
  )
}

const getWarehouseList = () => {
  getAction('/sys/dict/getDictItems/scms_warehouse,name,id,logic_del=0').then((res) => {
    if (res.success) {
      warehouseOptions.value = res.result.map((item) => {
        return {
          label: item.label,
          value: item.value,
        }
      })
    }
  })
}
onMounted(() => {
  loadWmsData()
  loadWmsOrderData()
  getWarehouseList()
})
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.stat-container {
  background-color: #fff;
  width: 90%;
  margin: 0rpx auto;
  margin-top: 20vh;
  border-radius: 20rpx;
  padding: 20rpx;
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 30rpx;
    font-weight: 600;
    margin: 20rpx 0rpx 30rpx;
  }
  .tab {
    color: #c7c5c5;
  }
  .header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 20rpx 0rpx;
    padding: 0 20rpx;

    .header-order {
      color: #000;
      font-size: 50rpx;
      flex: 1;
    }
    .count {
      flex: 1;
    }
  }
  .description {
    background-color: #f8f9fb;
    padding: 15rpx;
    font-size: 26rpx;
    border-radius: 10rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .tab {
      color: #d6d7d8;
    }
    .time {
      color: #45be46;
    }
  }
}

// 动画类
.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  background-color: #fff;
  border-radius: 20rpx;
  width: 94%;
  margin: 0 auto;
  position: absolute;
  padding: 1%;
  top: 20vh;
  left: 2%;
  height: 25vh;
  .title {
    color: #949191;
    padding: 20rpx 20rpx;
    border-bottom: 1px dashed #e7e6e6;
    font-size: 30rpx;
  }
  .header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 20rpx 0rpx;
    padding: 0 30rpx;

    .header-order {
      color: #000;
      font-size: 48rpx;
      font-weight: 600;
      flex: 1;
    }
  }
  .content {
    padding: 0 30rpx;
    flex-direction: row;
    display: flex;
    margin-bottom: 10rpx;
    .content-item {
      flex: 1;
      text-align: center;
      margin: 20rpx 0rpx;
      border-right: #eeebeb;
      .content-title {
        color: #aaa8a8;
        margin-bottom: 15rpx;
        font-size: 28rpx;
      }
      .content-count {
        color: #000;
        margin-bottom: 15rpx;
        font-size: 38rpx;
        font-weight: 600;
      }
    }
  }
}
.count {
  color: #b6b4b4;
  font-size: 28rpx;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.chart-card {
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin: 20rpx;
  margin-top: 20vh;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 30rpx;
    font-weight: 600;
    margin: 20rpx 0rpx 30rpx;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;

    .title {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
    }
  }
  .switch-group {
    display: flex;
    background: #fff;
    border-radius: 8rpx;
    padding: 4rpx;
    border: 1px solid #f7c34c;
    margin-bottom: 20rpx;
    .switch-item {
      min-width: 150rpx;
      padding: 12rpx 14rpx;
      font-size: 26rpx;
      flex: 1;
      color: #666;
      text-align: center;
      border-radius: 6rpx;
      transition: all 0.3s;
      cursor: pointer;

      &.active {
        background: #fffbf1;
        color: #ffb917;
      }
    }
  }
  .chart-content {
    height: 500rpx;
    width: 100%;
  }

  .status-cards {
    display: flex;
    justify-content: space-between;
    gap: 20rpx;
    margin: 40rpx 0;

    .status-card {
      flex: 1;
      background: #f8f9fb;
      border-radius: 12rpx;
      padding: 20rpx;
      display: flex;

      gap: 16rpx;
      flex-direction: column;
      .status-icon {
        width: 40rpx;
        height: 20rpx;
        border-radius: 20rpx;
        display: flex;

        &.new {
          background: #1890ff;
        }

        &.processing {
          background: #faad14;
        }

        &.completed {
          background: #52c41a;
        }
      }

      .status-content {
        display: flex;
        flex-direction: column;
        gap: 8rpx;

        .status-label {
          font-size: 26rpx;
          color: #b8b6b6;
        }

        .status-value {
          font-size: 36rpx;
          font-weight: bold;
          color: #333;
          margin-top: 60rpx;
        }
      }

      transition: all 0.3s ease;
      cursor: pointer;

      &.active {
        background: #fff7e5;
        transform: translateY(-2rpx);
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
        border: 2rpx solid $theme-color;
        .status-icon {
          &.new {
            background: #1890ff;
          }

          &.processing {
            background: #faad14;
          }

          &.completed {
            background: #52c41a;
          }
        }
      }

      &:active {
        transform: translateY(0);
      }
    }
  }

  .status-cardlist {
    display: flex;
    justify-content: space-between;
    gap: 20rpx;
    padding: 20rpx 0;
    margin: 40rpx 0;
    background: #fcfcfd;
    .status-card {
      flex: 1;
      background: #fcfcfd;

      padding: 20rpx 40rpx;
      display: flex;

      gap: 16rpx;
      flex-direction: column;
      .status-icon {
        width: 40rpx;
        height: 20rpx;
        border-radius: 20rpx;
        display: flex;

        &.new {
          background: #1890ff;
        }

        &.processing {
          background: #faad14;
        }

        &.completed {
          background: #52c41a;
        }
      }

      .status-content {
        display: flex;
        flex-direction: column;
        gap: 8rpx;

        .status-label {
          font-size: 28rpx;
          margin-top: 10rpx;
          color: #a8a6a6;
        }

        .status-value {
          font-size: 32rpx;
          margin-top: 10rpx;
          font-weight: bold;
          color: #333;
        }
      }

      transition: all 0.3s ease;
      cursor: pointer;

      &.active {
        background: #fff;
        transform: translateY(-2rpx);
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);

        .status-content {
          .status-label {
            color: $theme-color;
          }

          .status-value {
            color: $theme-color;
          }
        }

        .status-icon {
          &.new {
            background: #1890ff;
          }

          &.processing {
            background: #faad14;
          }

          &.completed {
            background: #52c41a;
          }
        }
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
}
.chart-card-range {
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin: 20rpx;
  margin-top: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 30rpx;
    font-weight: 600;
    margin: 20rpx 0rpx 30rpx;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;

    .title {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
    }
  }
  .switch-group {
    display: flex;
    background: #fff;
    border-radius: 8rpx;
    padding: 4rpx;
    border: 1px solid #f7c34c;
    margin-bottom: 20rpx;
    .switch-item {
      min-width: 150rpx;
      padding: 12rpx 14rpx;
      font-size: 26rpx;
      flex: 1;
      color: #666;
      text-align: center;
      border-radius: 6rpx;
      transition: all 0.3s;
      cursor: pointer;

      &.active {
        background: #fffbf1;
        color: #ffb917;
      }
    }
  }
  .chart-content {
    height: 500rpx;
    width: 100%;
  }

  .status-cards {
    display: flex;
    justify-content: space-between;
    gap: 20rpx;
    margin: 40rpx 0;

    .status-card {
      flex: 1;
      background: #f8f9fb;
      border-radius: 12rpx;
      padding: 20rpx;
      display: flex;

      gap: 16rpx;
      flex-direction: column;
      .status-icon {
        width: 40rpx;
        height: 20rpx;
        border-radius: 20rpx;
        display: flex;

        &.new {
          background: #1890ff;
        }

        &.processing {
          background: #faad14;
        }

        &.completed {
          background: #52c41a;
        }
      }

      .status-content {
        display: flex;
        flex-direction: column;
        gap: 8rpx;

        .status-label {
          font-size: 26rpx;
          color: #b8b6b6;
        }

        .status-value {
          font-size: 36rpx;
          font-weight: bold;
          color: #333;
          margin-top: 60rpx;
        }
      }

      transition: all 0.3s ease;
      cursor: pointer;

      &.active {
        background: #fff7e5;
        transform: translateY(-2rpx);
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
        border: 2rpx solid $theme-color;
        .status-icon {
          &.new {
            background: #1890ff;
          }

          &.processing {
            background: #faad14;
          }

          &.completed {
            background: #52c41a;
          }
        }
      }

      &:active {
        transform: translateY(0);
      }
    }
  }

  .status-cardlist {
    display: flex;
    justify-content: space-between;
    gap: 20rpx;
    padding: 20rpx 0;
    margin: 40rpx 0;
    background: #fcfcfd;
    .status-card {
      flex: 1;
      background: #fcfcfd;

      padding: 20rpx 40rpx;
      display: flex;

      gap: 16rpx;
      flex-direction: column;
      .status-icon {
        width: 40rpx;
        height: 20rpx;
        border-radius: 20rpx;
        display: flex;

        &.new {
          background: #1890ff;
        }

        &.processing {
          background: #faad14;
        }

        &.completed {
          background: #52c41a;
        }
      }

      .status-content {
        display: flex;
        flex-direction: column;
        gap: 8rpx;

        .status-label {
          font-size: 28rpx;
          margin-top: 10rpx;
          color: #a8a6a6;
        }

        .status-value {
          font-size: 32rpx;
          margin-top: 10rpx;
          font-weight: bold;
          color: #333;
        }
      }

      transition: all 0.3s ease;
      cursor: pointer;

      &.active {
        background: #fff;
        transform: translateY(-2rpx);
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);

        .status-content {
          .status-label {
            color: $theme-color;
          }

          .status-value {
            color: $theme-color;
          }
        }

        .status-icon {
          &.new {
            background: #1890ff;
          }

          &.processing {
            background: #faad14;
          }

          &.completed {
            background: #52c41a;
          }
        }
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
}
.charts-box {
  height: 400rpx;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.warehouse-select {
  margin-left: auto;
  position: relative;

  .selected-warehouse {
    display: flex;
    align-items: center;
    gap: 8rpx;
    background: #f5f5f5;
    padding: 12rpx 24rpx;
    border-radius: 8rpx;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #f0f0f0;
    }

    text {
      font-size: 26rpx;
      color: #666;
    }
  }

  .warehouse-options {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 8rpx;
    background: #fff;
    border-radius: 8rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
    z-index: 100;

    .option-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 24rpx;
      min-width: 200rpx;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: #f5f5f5;
      }

      &.active {
        color: $theme-color;
        background: #f0f7ff;
      }

      text {
        font-size: 26rpx;
      }
    }
  }
}

.rank-list {
  padding: 20rpx;

  .rank-header {
    display: flex;
    padding: 20rpx 0;
    border-bottom: 1px solid #f0f0f0;
    font-size: 24rpx;
    color: #999;
  }

  .rank-item {
    display: flex;
    padding: 24rpx 0;
    border-bottom: 1px solid #f5f5f5;
    font-size: 26rpx;
    color: #333;

    &:last-child {
      border-bottom: none;
    }
  }

  .col {
    &.rank {
      width: 80rpx;
      text-align: center;
    }
    &.name {
      flex: 1.2;
    }
    &.type {
      flex: 1;
    }
    &.value {
      flex: 1;
      text-align: right;
      color: #ff6b6b;
      font-weight: 500;
    }
    &.stock {
      flex: 1;
      text-align: right;
      color: #2b5cff;
      font-weight: 500;
    }
  }

  .rank-num {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70rpx;
    height: 50rpx;
    border-radius: 50%;
    position: relative;

    &.top-3 {
      // background: $theme-color;
      color: #fff;

      .u-icon {
        position: absolute;
        top: -12rpx;
        right: -8rpx;
        transform: scale(0.8);
      }
    }
  }
}
</style>
