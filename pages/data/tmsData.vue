<template>
  <view style="position: absolute; top: 20vh; width: 100%; padding-bottom: 100rpx">
    <view class="card">
      <view class="title">物流单数量</view>
      <view class="header">
        <view class="header-order">{{ formatNumber(orderNum) }}</view>
      </view>
      <view class="content">
        <view class="content-item" style="border-right: 1px #e2e2e2 solid">
          <view class="content-title">计费重(KG)</view>
          <view class="content-count">{{ formatNumber(totalChargingWeightValue) }}</view>
        </view>
        <view class="content-item" style="border-right: 1px #f2f2f2 solid">
          <view class="content-title">方数(CBM)</view>
          <view class="content-count">{{ formatNumber(totalCubeValue) }}</view>
        </view>
        <view class="content-item">
          <view class="content-title">货值(万元)</view>
          <view class="content-count">{{ formatNumber(totalValue) }}</view>
        </view>
      </view>
    </view>
    <view style="background-color: #f5f5f5; padding-bottom: 40rpx">
      <view class="stat-container">
        <view class="title">
          <image
            src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/大数据科技数据流转_1734521664475.png"
            style="width: 40rpx; height: 40rpx; margin-right: 10rpx"
          ></image>
          <view>渠道数据</view>
        </view>
        <view class="stat-grid">
          <view
            v-for="(item, index) in statCards"
            :key="index"
            class="stat-card animate-fadeIn"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <view class="card-icon">
              <u-icon :name="item.icon" size="18" color="#ffb813"></u-icon>
              <text class="card-title">{{ item.title }}</text>
            </view>
            <view class="card-content">
              <view class="card-value">
                <text class="number">{{ item.value.toLocaleString() }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="chart-card">
        <view class="title">
          <image
            src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/下降趋势_1734664718481.png"
            style="width: 40rpx; height: 40rpx; margin-right: 10rpx"
          ></image>
          <view>物流单量趋势</view>
        </view>
        <view class="card-header">
          <view class="switch-group">
            <text class="switch-item" :class="{ active: chartType === 'total' }" @tap="switchChartType('total')"
              >总单量</text
            >
            <text class="switch-item" :class="{ active: chartType === 'channel' }" @tap="switchChartType('channel')"
              >渠道单量</text
            >
          </view>
        </view>
        <view class="chart-content-trend">
          <view style="height: 400rpx">
            <qiun-data-charts type="area" :opts="chartOpts" :chartData="currentChartData" />
          </view>
        </view>
      </view>

      <!-- 产品货值分布卡片 -->
      <view class="chart-card">
        <view class="title">
          <image
            src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/查库存_1734664689455.png"
            style="width: 40rpx; height: 40rpx; margin-right: 10rpx"
          ></image>
          <view>物流产品分析</view>
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

      <!-- 排行榜卡片 -->
      <view class="chart-card">
        <view class="title">
          <image
            src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/排行榜_1734664705135.png"
            style="width: 40rpx; height: 40rpx; margin-right: 10rpx"
          ></image>
          <view>排行榜</view>
          <text class="sub-title">TOP 10</text>
        </view>
        <view class="card-header">
          <view class="switch-group">
            <text class="switch-item" :class="{ active: rankType === 'country' }" @tap="switchRankType('country')"
              >国家分布</text
            >
            <text class="switch-item" :class="{ active: rankType === 'product' }" @tap="switchRankType('product')"
              >产品排行</text
            >
          </view>
        </view>

        <view class="rank-list">
          <!-- 表头 -->
          <view class="rank-header">
            <text class="col rank">排名</text>
            <text class="col name">{{ rankType === 'country' ? '收货国家' : '品名' }}</text>
            <text class="col count1">{{ rankType === 'country' ? '物流单量' : '产品货值' }}</text>

            <text class="col percent">占比</text>
          </view>

          <!-- 列表内容 -->
          <view
            class="rank-item"
            v-for="(item, index) in allocationDataSource"
            :key="index"
            v-if="rankType === 'country'"
          >
            <text class="col rank">
              <view class="rank-num" :class="{ 'top-3': index < 3 }">
                <text>{{ item.rankNum }}</text>
                <image v-if="index < 3" :src="imageList[index]" style="width: 70rpx; height: 40rpx"></image>
              </view>
            </text>
            <text class="col name">{{ item.dstCountry }}</text>
            <text class="col count">{{ item.orderCount }}</text>

            <text class="col percent">
              <text class="percent-value">{{ item.proportion }}</text>
              <text class="percent-symbol">%</text>
            </text>
          </view>

          <view class="rank-item" v-for="(item, index) in stockDataSource" :key="item.id" v-else>
            <text class="col rank">
              <view class="rank-num" :class="{ 'top-3': index < 3 }">
                <text>{{ item.rankNum }}</text>
                <image v-if="index < 3" :src="imageList[index]" style="width: 70rpx; height: 40rpx"></image>
              </view>
            </text>
            <text class="col name">{{ item.name }}</text>
            <text class="col count">{{ item.totalValue }}</text>

            <text class="col percent">
              <text class="percent-value">{{ item.proportion }}</text>
              <text class="percent-symbol">%</text>
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { getAction } from '@/common/store/manage'
import { onReady } from '@dcloudio/uni-app'
import _ from 'lodash'
const chartDataWms = ref({})
// 图表类型切换
const chartType = ref('total')

const chartOpts = ref({
  color: ['#ffb918', '#4cd575', '#FAC858', '#EE6666', '#73C0DE', '#3CA272'],
  padding: [15, 15, 15, -2],
  enableScroll: false,
  legend: {
    show: false,
    position: 'top',
    float: 'right',
    itemWidth: 15,
    itemGap: 20,
    padding: 10,
  },
  xAxis: {
    disableGrid: true,
    labelInterval: 6,
    labelCount: 4,
    // rotateLabel: true,
  },
  yAxis: {
    gridType: 'dash',
    dashLength: 8,
    formatter: (val) => val,
  },
  extra: {
    area: {
      type: 'straight',
      opacity: 0.45,
      addLine: true,
      width: 2,
      gradient: true,
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

const categories = ref([])
const seriesData = ref([])
const channelData = ref({})

// 当前显示图表数据
const currentChartData = computed(() => {
  console.log('加载图表数据', categories.value, seriesData.value)
  return {
    categories: categories.value,
    series: seriesData.value,
  }
})

// 切换图表类型
const switchChartType = (type) => {
  chartType.value = type
  if (type === 'channel') {
    loadTmsChannelChartData()
  } else {
    loadTmsTotalOrderData()
  }
}

// 格式化数字
const formatNumber = (num) => {
  if (num >= 10000 && num < 100000000) {
    return (num / 10000).toFixed(1) + '万'
  } else if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + '亿'
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
const seaCount = ref(0)
const airCount = ref(0)
const roadCount = ref(0)
const railCount = ref(0)
const dtdCount = ref(0)
const headCount = ref(0)
// 统计卡片数据
const statCards = computed(() => {
  return [
    {
      icon: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/0605-ship2-filled_1734597000934.png',
      title: '海运',
      value: formatNumber(seaCount.value),
      unit: '单',
      yearOnYear: -10.11,
    },
    {
      icon: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/出差_1734597027658.png',
      title: '空运',
      value: formatNumber(airCount.value),
      unit: '单',
      yearOnYear: 30.29,
    },
    {
      icon: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/卡车运输货物_1734597056487.png',
      title: '卡航',
      value: formatNumber(roadCount.value),
      unit: '单',
      yearOnYear: 6.29,
    },
    {
      icon: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/铁路_1734597041942.png',
      title: '铁路',
      value: formatNumber(railCount.value),
      unit: '单',
      yearOnYear: 12.62,
    },
    {
      icon: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/冰箱_1734597073488.png',
      title: '到门',
      value: formatNumber(dtdCount.value),
      unit: '单',
      yearOnYear: -6.89,
    },
    {
      icon: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/整柜出口_1734597090776.png',
      title: '到港',
      value: formatNumber(headCount.value),
      unit: '单',
      yearOnYear: 1.04,
    },
  ]
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

// 产品货值分布图配置
const valueDistOpts = ref({
  color: ['#79a2ff', '#ff9e8b', '#58b1ff', '#ffb200'],
  padding: [15, 5, 15, 5],
  dataLabel: false,
  legend: {
    show: true,
    position: 'bottom',
    lineHeight: 5,
  },
  title: {
    name: '货值',
    fontSize: 15,
    color: '#666666',
  },
  subtitle: {
    name: '',
    fontSize: 12,
    color: '#333',
  },
  extra: {
    ring: {
      ringWidth: 45,
      centerColor: '#FFFFFF',
      activeOpacity: 0.7,
      activeRadius: 10,
      offsetAngle: 0,
      border: true,
      borderWidth: 2,
      borderColor: '#FFFFFF',
      spaceBetween: 2,
      animation: true,
      animationDuration: 1000,
      animationType: 'scale',
      // linearType: 'custom',
    },
  },
})

// 分布类型切换
const distributionType = ref('value')

// 切换分布类型
const switchDistributionType = (type) => {
  distributionType.value = type
  loadGoodsValueOrType()
}

// 货值分布数据
const valueDistData = ref({})

// 当前显示的分布数据
const currentDistData = computed(() => {
  return valueDistData.value
})

// 排行榜类型
const rankType = ref('country')

// 国家分布排行数据
const countryRankList = ref([
  { name: '美国', count: '2,356', amount: '12,568', percent: 35.8, trend: 12.5 },
  { name: '英国', count: '1,865', amount: '8,965', percent: 28.3, trend: 8.6 },
  { name: '德国', count: '1,253', amount: '6,235', percent: 19.1, trend: -5.2 },
  { name: '法国', count: '986', amount: '4,568', percent: 15.0, trend: 3.8 },
  { name: '日本', count: '568', amount: '2,365', percent: 8.6, trend: 15.3 },
])

// 产品排行数据
const productRankList = ref([
  { name: '电子产品', count: '$568,235', amount: '25,632', percent: 32.5, trend: 15.8 },
  { name: '服装', count: '$425,865', amount: '18,965', percent: 24.3, trend: 9.2 },
  { name: '家居用品', count: '$325,568', amount: '15,236', percent: 18.6, trend: -3.5 },
  { name: '玩具', count: '$256,235', amount: '12,568', percent: 14.7, trend: 6.8 },
  { name: '化妆品', count: '$186,523', amount: '8,965', percent: 10.7, trend: 12.4 },
])

// 当前显示的排行榜数据
const currentRankList = computed(() => {
  return rankType.value === 'country' ? countryRankList.value : productRankList.value
})

// 切换排行榜类型
const switchRankType = (type) => {
  rankType.value = type
  if (type === 'country') {
    getAllocation()
  } else {
    getStockData()
  }
}

// 饼图颜色列表
let colorList = ['#30d6ab', '#3195ff', '#ffaf21', '#34b5f0']
const orderNum = ref(0)
const totalChargingWeightValue = ref(0)
const totalValue = ref(0)
const totalCubeValue = ref(0)

// 获取单量数据
const loadData = () => {
  getAction('/bi/tms/orderValueStatistics', { dateRange: 'TY' }).then((res) => {
    if (res.success) {
      orderNum.value = res.result.orderCount
      totalChargingWeightValue.value = res.result.chargingWeight
      totalValue.value = res.result.cubes
      totalCubeValue.value = res.result.totalValue
    }
  })
}

//获取渠道统计数据
const loadTmsChannelData = () => {
  getAction('/bi/tms/channelStatistics', { dateRange: 'TY' }).then((res) => {
    if (res.success) {
      seaCount.value = res.result.seaCount
      airCount.value = res.result.airCount
      roadCount.value = res.result.roadCount
      railCount.value = res.result.railCount
      dtdCount.value = res.result.dtdCount
      headCount.value = res.result.headCount
    }
  })
}
const stockDataSource = ref([])
const allocationDataSource = ref([])
const imageList = ref([
  'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/编组30_1734664613566.png',
  'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/编组30备份_1734664629802.png',
  'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/编组30备份2_1734664658738.png',
])
const loadTmsChannelChartData = () => {
  getAction('/bi/tms/channalOrderTrend', { dateRange: 'TY' }).then((res) => {
    if (res.success && res.result) {
      seriesData.value = []
      let grouped = []
      grouped = _.groupBy(res.result, (item) => item.dateStr.slice(0, 7))
      const result = Object.keys(grouped).map((month) => {
        // 空运
        const airCount = _.sumBy(grouped[month], 'airCount')
        // 铁路
        const railwayCount = _.sumBy(grouped[month], 'railwayCount')
        // 快递
        const expressCount = _.sumBy(grouped[month], 'expressCount')
        // 海运
        const shippingFclCount = _.sumBy(grouped[month], 'shippingFclCount')
        // 到门
        const dtdCount = _.sumBy(grouped[month], 'dtdCount')
        // 到港
        const headCount = _.sumBy(grouped[month], 'headCount')
        // 海外仓
        const owCount = _.sumBy(grouped[month], 'owCount')
        return { date: month, airCount, railwayCount, expressCount, shippingFclCount, dtdCount, headCount, owCount }
      })
      categories.value = result.map((item) => item.date)
      seriesData.value = [
        {
          type: 'line',
          name: '空运',
          data: result.map((item) => item.airCount),
        },
        {
          type: 'line',
          name: '海运',
          data: result.map((item) => item.shippingFclCount),
        },
        {
          type: 'line',
          name: '铁路',
          data: result.map((item) => item.railwayCount),
        },
        {
          type: 'line',
          name: '快递',
          data: result.map((item) => item.expressCount),
        },
        {
          type: 'line',
          name: '到门',
          data: result.map((item) => item.dtdCount),
        },
        {
          type: 'line',
          name: '到港',
          data: result.map((item) => item.headCount),
        },
      ]
      console.log('categories.value', categories.value, seriesData.value)
      channelData.value.categories = categories.value
      channelData.value.seriesData = seriesData.value
    } else {
      seriesData.value = []
    }
    // 初始化图表
  })
}
//产品货值和类型分析
const loadGoodsValueOrType = () => {
  let url = distributionType.value === 'value' ? '/bi/tms/productValueAnalysis' : '/bi/tms/productTypeAnalysis'
  getAction(url, { dateRange: 'TY' }).then((res) => {
    if (res.success) {
      valueDistData.value = {
        series: [
          {
            data: res.result.map((item, index) => {
              return {
                name: item.valueRange,
                value: parseInt(item.count),
              }
            }),
          },
        ],
      }
      valueDistOpts.value.subtitle.name = formatNumber(
        valueDistData.value.series[0].data.reduce((acc, item) => acc + item.value, 0)
      )
      console.log('valueDistData', valueDistData.value)
    }
  })
}

// 获取产品排行
const getStockData = () => {
  getAction('/bi/tms/productRanking', { dateRange: 'TY' }).then((res) => {
    if (res.success) {
      stockDataSource.value = res.result
    }
  })
}

// 获取国家分布
const getAllocation = () => {
  getAction('/bi/tms/orderAllocation', { dateRange: 'TY' }).then((res) => {
    if (res.success) {
      allocationDataSource.value = res.result
    }
  })
}

const loadTmsTotalOrderData = () => {
  getAction('/tms/statistics/transOrderStatisticsData', { dateRange: 'TY' }).then((res) => {
    if (res.success) {
      const grouped = _.groupBy(res.result, (item) => item.dateStr.slice(0, 7)) // 按年月分组

      const result = Object.keys(grouped).map((month) => {
        const totalOrderCount = _.sumBy(grouped[month], 'orderCount')

        return { date: month, orderCount: totalOrderCount }
      })
      categories.value = result.map((item) => item.date)

      seriesData.value = [
        {
          name: '总单量',
          data: result.map((item) => item.orderCount),
        },
      ]
    }
  })
}
onMounted(() => {
  loadData()
  loadTmsChannelData()
  loadGoodsValueOrType()
  getAllocation()
  loadTmsTotalOrderData()
})
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.stat-container {
  background-color: #fff;
  width: 90%;
  margin: 20rpx auto;
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
.count {
  color: #b6b4b4;
  font-size: 28rpx;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.stat-grid {
  display: grid;
  margin-top: 20rpx;
  grid-template-columns: repeat(2, 1fr);
  gap: 25rpx;

  .stat-card {
    display: flex;
    flex-direction: column;
    border-radius: 16rpx;
    padding: 20rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.07);

    .card-icon {
      border-radius: 16rpx;
      // background: rgba(43, 92, 255, 0.1);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-right: 20rpx;
      .card-title {
        font-size: 26rpx;
        font-weight: 500;
        color: #9e9c9c;
        flex: 1;
        margin-left: 8rpx;
      }
    }

    .card-content {
      flex: 1;
      margin-top: 20rpx;
      .card-value {
        padding: 12rpx 0;
        display: flex;
        align-items: baseline;
        // border-bottom: 2rpx solid #f9f9f9;
        .number {
          font-size: 40rpx;
          font-weight: 400;
          color: #333;
        }

        .unit {
          font-size: 24rpx;
          color: #999;
          margin-left: 4rpx;
        }
      }

      .card-compare {
        display: flex;
        gap: 16rpx;
        margin-top: 8rpx;
        align-items: center;
        padding: 10rpx 0;
        .compare-item {
          font-size: 24rpx;
          color: #4e4d4d;
          display: flex;

          align-items: center;
          &.up {
            color: #ff4d4f;
          }

          &.down {
            color: #52c41a;
          }
        }
      }
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
  // position: absolute;
  padding: 1%;
  // top: 20vh;
  // left: 2%;
  min-height: 25vh;
  .title {
    color: #949191;
    padding: 20rpx 20rpx;
    border-bottom: 1px dashed #e7e6e6;
    font-size: 30rpx;
    margin-left: 30rpx;
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
      font-size: 52rpx;
      margin-left: 30rpx;
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
      text-align: left;
      margin: 20rpx 0rpx;
      padding-left: 30rpx;
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

.chart-card {
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin: 20rpx;
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
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
    border: 2rpx solid $theme-color;
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
        color: $theme-color;
        // box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
      }
    }
  }
  .chart-content-trend {
    height: 400rpx;
    width: 100%;
  }
  .chart-content {
    height: 500rpx;
    width: 100%;
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
      width: 60rpx;
      text-align: center;
    }
    &.name {
      flex: 1.5;
      text-align: center;
    }
    &.count1 {
      flex: 1.5;
      text-align: center;
    }
    &.amount {
      flex: 1.5;
      text-align: center;
    }
    &.percent {
      width: 100rpx;
      text-align: center;
    }
    &.trend {
      width: 100rpx;
      text-align: center;

      &.up {
        color: #ff4d4f;
      }
      &.down {
        color: #52c41a;
      }
    }
  }

  .rank-num {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70rpx;
    height: 45rpx;
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

.tab-group {
  display: flex;
  background: #f5f5f5;
  border-radius: 32rpx;
  padding: 4rpx;

  .tab-item {
    padding: 12rpx 24rpx;
    font-size: 26rpx;
    color: #666;
    border-radius: 28rpx;

    &.active {
      background: #fff;
      color: $theme-color;
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
    }
  }
}

.total-value {
  margin-left: auto;
  text-align: right;

  .label {
    font-size: 24rpx;
    color: #999;
    margin-right: 8rpx;
  }

  .value {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
  }

  .unit {
    font-size: 24rpx;
    color: #666;
    margin-left: 4rpx;
  }
}

.chart-wrapper {
  height: 500rpx;
  width: 100%;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}

.legend-list {
  width: 40%;
  float: right;
  padding: 80rpx 0;
  padding-right: 40rpx;

  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: translateX(5rpx);
    }

    .legend-marker {
      width: 20rpx;
      height: 20rpx;
      border-radius: 50%;
      margin-right: 12rpx;
    }

    .legend-info {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .legend-name {
        font-size: 28rpx;
        color: #666;
      }

      .legend-value {
        font-size: 28rpx;
        color: #333;
        font-weight: 500;
      }
    }
  }
}

.sub-title {
  font-size: 24rpx;
  color: #999;
  margin-left: 12rpx;
  font-weight: normal;
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
</style>
