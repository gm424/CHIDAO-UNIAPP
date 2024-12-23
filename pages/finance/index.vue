<template>
  <view class="container">
    <!-- 未申请状态 -->
    <view v-if="financeStatus === 'none'" class="promo-section">
      <view class="banner animate-fadeIn">
        <image src="https://cdn-icons-png.flaticon.com/512/4021/4021708.png" mode="aspectFit" />
        <view class="banner-text">
          <text class="title">供应链金融服务</text>
          <text class="subtitle">专业金融服务 · 助力企业腾飞</text>
          <view class="stats">
            <view class="stat-item">
              <u-icon name="star-fill" color="#fff" size="28"></u-icon>
              <text class="number">10000+</text>
              <text class="label">服务企业</text>
            </view>
            <view class="stat-item">
              <u-icon name="checkmark-circle-fill" color="#fff" size="28"></u-icon>
              <text class="number">99%</text>
              <text class="label">审批通过率</text>
            </view>
          </view>
        </view>
      </view>

      <view class="feature-list">
        <view class="feature-item animate-fadeInUp delay-200">
          <view class="feature-icon">
            <u-icon name="clock-fill" color="#ffb200" size="32"></u-icon>
          </view>
          <text class="feature-title">快速审批</text>
          <text class="feature-desc">最快1个工作日完成审核</text>
        </view>
        <view class="feature-item animate-fadeInUp delay-400">
          <view class="feature-icon">
            <u-icon name="rmb-circle-fill" color="#ffb200" size="32"></u-icon>
          </view>
          <text class="feature-title">灵活额度</text>
          <text class="feature-desc">最高可贷1000万</text>
        </view>
        <view class="feature-item animate-fadeInUp delay-600">
          <view class="feature-icon">
            <u-icon name="gift-fill" color="#ffb200" size="32"></u-icon>
          </view>
          <text class="feature-title">优惠利率</text>
          <text class="feature-desc">年化利率低至4.35%</text>
        </view>
      </view>

      <view class="process-section">
        <text class="section-title">申请流程</text>
        <view class="process-list">
          <view class="process-item">
            <view class="process-icon">
              <u-icon name="edit-pen" size="24" color="#1677ff"></u-icon>
            </view>
            <text class="process-text">提交申请</text>
          </view>
          <view class="process-arrow">
            <u-icon name="arrow-right" size="20" color="#ddd"></u-icon>
          </view>
          <view class="process-item">
            <view class="process-icon">
              <u-icon name="file-text" size="24" color="#1677ff"></u-icon>
            </view>
            <text class="process-text">资料审核</text>
          </view>
          <view class="process-arrow">
            <u-icon name="arrow-right" size="20" color="#ddd"></u-icon>
          </view>
          <view class="process-item">
            <view class="process-icon">
              <u-icon name="star" size="24" color="#1677ff"></u-icon>
            </view>
            <text class="process-text">额度授信</text>
          </view>
        </view>
      </view>

      <view class="bottom-section animate-fadeInUp delay-800">
        <button class="apply-btn" @tap="navigateToApply">
          <text>立即申请</text>
          <u-icon name="arrow-right" color="#fff" size="20"></u-icon>
        </button>
        <text class="apply-tips">预计2分钟完成申请</text>
      </view>
    </view>

    <!-- 待审核状态 -->
    <view v-else-if="financeStatus === '1' || financeStatus === '2'" class="pending-section animate-fadeIn">
      <!-- 审核进度卡片 -->
      <view class="progress-card">
        <view class="progress-header">
          <text class="title">审核进度</text>
          <text class="time">预计完成时间：1-3个工作日</text>
        </view>

        <view class="progress-steps">
          <view class="step-item completed">
            <view class="step-icon">
              <u-icon name="checkmark-circle-fill" color="#ffb200" size="32"></u-icon>
            </view>
            <view class="step-info">
              <text class="step-title">提交申请</text>
              <text class="step-time">{{ submitTime }}</text>
            </view>
          </view>

          <view class="step-line">
            <view class="line-progress"></view>
          </view>

          <view class="step-item active">
            <view class="step-icon">
              <view class="loading-circle">
                <view class="loading-icon"></view>
              </view>
            </view>
            <view class="step-info">
              <text class="step-title">资料审核</text>
              <text class="step-desc">正在审核中...</text>
            </view>
          </view>

          <view class="step-line">
            <view class="line-wait"></view>
          </view>

          <view class="step-item">
            <view class="step-icon">
              <u-icon name="star" color="#ddd" size="32"></u-icon>
            </view>
            <view class="step-info">
              <text class="step-title">审核完成</text>
              <text class="step-desc">等待审核结果</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 提示卡片 -->
      <view class="tips-card animate-fadeInUp">
        <view class="tips-header">
          <u-icon name="info-circle" color="#ffb200" size="28"></u-icon>
          <text>温馨提示</text>
        </view>
        <view class="tips-content">
          <view class="tip-item">
            <u-icon name="checkmark" color="#ffb200" size="24"></u-icon>
            <text>审核结果将通过短信通知</text>
          </view>
          <view class="tip-item">
            <u-icon name="checkmark" color="#ffb200" size="24"></u-icon>
            <text>请确保手机保持通畅</text>
          </view>
          <view class="tip-item">
            <u-icon name="checkmark" color="#ffb200" size="24"></u-icon>
            <text>审核通过后即可使用授信额度</text>
          </view>
        </view>
      </view>

      <!-- 联系客服 -->
      <view class="contact-section animate-fadeInUp" style="animation-delay: 0.2s">
        <text class="contact-text">如有疑问，请联系客服</text>
        <button class="contact-btn" @tap="contactService">
          <u-icon name="server-man" color="#ffb200" size="24"></u-icon>
          <text>联系客服</text>
        </button>
      </view>
    </view>

    <!-- 审核未通过状态 -->
    <view v-else-if="financeStatus === 'rejected'" class="rejected-section">
      <view class="status-icon">
        <u-icon name="close-circle" color="#ff4d4f" size="80"></u-icon>
      </view>
      <text class="status-title">审核未通过</text>
      <text class="reject-reason">{{ rejectReason }}</text>
      <button class="reapply-btn" @tap="navigateToApply">重新申请</button>
    </view>

    <!-- 审核通过状态 -->
    <view v-else-if="financeStatus === '5'" class="approved-section">
      <!-- 授信卡片滑动区 -->
      <scroll-view scroll-x class="credit-cards" :show-scrollbar="false">
        <view class="credit-card animate-slideIn" v-for="(item, index) in customerSupplierRelList" :key="index">
          <view class="credit-header">
            <div class="label">
              <div>剩余额度</div>
              <div class="supplier">{{ item.supplierId_dictText }}</div>
            </div>
            <text class="amount">¥{{ item.creditLeft }}</text>
          </view>
          <view class="credit-info">
            <view class="info-item">
              <text class="label">总授信额度</text>
              <text class="value">¥{{ item.creditLimit }}</text>
            </view>
          </view>

          <view class="history-item">
            <text class="label">历史使用额度</text>
            <text class="value">¥{{ item.historyUsageCredit }}</text>
          </view>

          <view class="card-watermark">
            <u-icon name="rmb-circle" color="rgba(255,255,255,0.1)" size="120"></u-icon>
          </view>
        </view>
      </scroll-view>

      <!-- 功能卡片区 -->
      <view class="function-grid">
        <view class="grid-item" v-for="(item, index) in functionList" :key="index" @tap="navigateToDetail(item.type)">
          <view class="item-icon" :style="{ background: item.bgColor }">
            <u-icon :name="item.icon" size="28" :color="item.iconColor"></u-icon>
          </view>
          <text class="item-title">{{ item.title }}</text>
        </view>
      </view>

      <!-- 授信明细 -->
      <view class="detail-section">
        <view class="section-header">
          <text class="title">授信明细</text>
        </view>

        <view class="credit-list">
          <view
            v-for="(item, index) in creditList"
            :key="index"
            class="credit-card animate-fadeIn"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <view class="card-header">
              <text class="order-no">委采编号{{ item.entrustNo }}</text>
              <text class="status" :class="item.status">￥{{ item.credit ? item.credit : 0 }}</text>
            </view>
            <view class="card-content">
              <view class="info-row">
                <text class="label">{{ item.supplierId_dictText }}</text>
                <text class="value">起息日{{ item.interestStartDate }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 加载更多 -->
        <view class="loading-more" v-if="creditList.length > 0">
          <text v-if="loading">加载中...</text>
          <text v-else-if="!hasMore">没有更多了</text>
        </view>

        <!-- 空状态 -->
        <view class="empty-state" v-if="creditList.length === 0">
          <u-empty mode="order" text="暂无订单数据"></u-empty>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import { getAction } from '../../common/store/manage'
import { onShow } from '@dcloudio/uni-app'
const financeStatus = ref('none') // none, pending, rejected, approved
const rejectReason = ref('')

const loading = ref(false)
// 模拟数据
const creditDetails = ref([])
const loanRecords = ref([])
const purchaseOrders = ref([])
const redemptionOrders = ref([])
const customerSupplierRelList = ref([])
// 格式化提交时间
const submitTime = ref(formatDate(new Date()))

function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

// 联系客服
const contactService = () => {
  uni.showToast({
    title: '正在接入客服...',
    icon: 'none',
  })
}

onShow(() => {
  // 获取用户金融状态
  checkFinanceStatus()

  // 模拟数据
  creditDetails.value = [
    { id: 1, date: '2024-03-20', amount: '1,000,000', status: '已生效' },
    { id: 2, date: '2024-02-15', amount: '800,000', status: '已结清' },
  ]

  loanRecords.value = [
    { id: 1, date: '2024-03-21', type: '借款', amount: '200,000' },
    { id: 2, date: '2024-03-15', type: '还款', amount: '100,000' },
  ]

  purchaseOrders.value = [
    { id: 1, orderNo: 'PO20240321001', amount: '150,000', status: '已完成' },
    { id: 2, orderNo: 'PO20240320001', amount: '80,000', status: '进行中' },
  ]

  redemptionOrders.value = [
    { id: 1, orderNo: 'RO20240321001', amount: '100,000', status: '已完成' },
    { id: 2, orderNo: 'RO20240320001', amount: '50,000', status: '待处理' },
  ]
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  uni.$off('refreshFinanceStatus', checkFinanceStatus)
})

const checkFinanceStatus = () => {
  getAction('/fms/customerApply/queryByRole', { businessType: 'LOAN' }).then((res) => {
    if (res.success) {
      financeStatus.value = res.result ? res.result.status : 'none'
      if (financeStatus.value === '3' || financeStatus.value === '4') {
        uni.navigateTo({
          url: '/pages/finance/apply',
        })
      } else if (financeStatus.value === '5') {
        getCustomerSupplierRel()
      }
    }
  })
}

const navigateToApply = () => {
  uni.navigateTo({
    url: '/pages/finance/apply',
  })
}

// 跳转到详情页
const navigateToDetail = (type) => {
  const routes = {
    loan: '/pages/finance/loan-detail',
    purchase: '/pages/finance/purchase-detail',
    redeem: '/pages/finance/redeem-detail',
  }

  uni.navigateTo({
    url: routes[type],
  })
}

// 查看所有明细
const showAllDetails = () => {
  uni.navigateTo({
    url: '/pages/finance/credit-detail',
  })
}

//金融客户授信关系
const getCustomerSupplierRel = () => {
  getAction('/catalog/customerSupplierRel/list', { pageNo: 1, pageSize: 9999 }).then((res) => {
    if (res.success) {
      customerSupplierRelList.value = res.result.records
    }
  })
}

// 功能列表数据
const functionList = ref([
  {
    title: '借贷流水',
    desc: '查看借贷记录',
    icon: 'file-text',
    type: 'loan',
    count: '12笔',
    bgColor: 'rgba(43, 92, 255, 0.1)',
    iconColor: '#ffb715',
  },
  {
    title: '我的采购',
    desc: '查看采购订单',
    icon: 'shopping-cart',
    type: 'purchase',
    count: '8单',
    bgColor: 'rgba(54, 207, 201, 0.1)',
    iconColor: '#36cfc9',
  },
  {
    title: '我的赎货',
    desc: '查看赎货记录',
    icon: 'gift',
    type: 'redeem',
    count: '5单',
    bgColor: 'rgba(255, 77, 79, 0.1)',
    iconColor: '#ff4d4f',
  },
])

// 授信列表数据
const creditList = ref([])

// 分页相关参数
const pageNo = ref(1)
const pageSize = ref(10)
const hasMore = ref(true)
const total = ref(0)
const isRefreshing = ref(false)
// 获取授信列表数据

const getCreditList = async (type) => {
  loading.value = true
  try {
    const res = await getAction('/fms/creditUsage/list', {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      column: 'createTime',
      order: 'desc',
    })

    if (res.success) {
      if (type === 'refresh') {
        creditList.value = res.result.records || []
      } else {
        creditList.value = [...creditList.value, ...(res.result.records || [])]
      }
      total.value = res.result.total
      hasMore.value = creditList.value.length < total.value
    }
  } catch (error) {
    console.error('加载订单列表失败:', error)
  } finally {
    loading.value = false
    isRefreshing.value = false
  }
}
// 监听页面触底事件
onReachBottom(() => {
  if (!hasMore.value || loading.value) return
  pageNo.value++
  getCreditList()
})

// 添加下拉刷新处理
onPullDownRefresh(async () => {
  isRefreshing.value = true
  pageNo.value = 1
  await getCreditList('refresh')
  uni.stopPullDownRefresh()
})

// 初始化
onMounted(() => {
  getCreditList('refresh')
})
</script>

<style lang="scss" scoped>
@import '@/styles/animation.scss';

.container {
  min-height: 100vh;
  background: #fff;
  padding: 20rpx;
}

.promo-section {
  .banner {
    background: linear-gradient(135deg, #ffb715, #f7c248);
    border-radius: 20rpx;
    padding: 40rpx;
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;
    box-shadow: 0 4rpx 24rpx rgba(255, 198, 43, 0.15);
    transform: translateY(0);
    transition: transform 0.3s ease;

    &:active {
      transform: translateY(2rpx);
    }

    image {
      width: 160rpx;
      height: 160rpx;
      animation: float 3s ease-in-out infinite;
    }

    .banner-text {
      flex: 1;
      color: #fff;
      padding-left: 40rpx;

      .title {
        font-size: 40rpx;
        font-weight: bold;
        margin-bottom: 20rpx;
        display: block;
      }

      .subtitle {
        font-size: 28rpx;
        opacity: 0.9;
        margin-bottom: 30rpx;
      }

      .stats {
        display: flex;
        gap: 40rpx;
        margin-top: 30rpx;

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;

          .number {
            font-size: 32rpx;
            font-weight: bold;
            display: block;
            margin-bottom: 8rpx;
          }

          .label {
            font-size: 24rpx;
            opacity: 0.8;
          }
        }
      }
    }
  }

  .feature-list {
    display: flex;
    justify-content: space-between;
    margin-bottom: 60rpx;
    padding: 0 20rpx;

    .feature-item {
      flex: 1;
      text-align: center;
      padding: 30rpx 20rpx;
      background: #fff;
      border-radius: 16rpx;
      margin: 0 10rpx;
      box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at center, rgba(43, 92, 255, 0.1) 0%, transparent 70%);
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &:active {
        transform: scale(0.98);
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

        &::after {
          opacity: 1;
        }
      }

      .feature-icon {
        background: rgba(255, 193, 22, 0.1);
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20rpx;
        transition: transform 0.3s ease;
      }

      &:active .feature-icon {
        transform: scale(0.9);
      }

      .feature-title {
        font-size: 28rpx;
        color: #333;
        margin: 20rpx 0 10rpx;
        display: block;
        font-weight: 600;
      }

      .feature-desc {
        font-size: 24rpx;
        color: #666;
      }
    }
  }

  .process-section {
    padding: 40rpx 20rpx;
    margin-bottom: 40rpx;

    .section-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 30rpx;
      display: block;
      text-align: center;
    }

    .process-list {
      display: flex;
      align-items: center;
      justify-content: center;

      .process-item {
        text-align: center;

        .process-icon {
          width: 64rpx;
          height: 64rpx;
          background: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16rpx;
          box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

          &:active {
            transform: scale(0.95);
            background: rgba(43, 92, 255, 0.1);
          }
        }

        .process-text {
          font-size: 26rpx;
          color: #666;
        }
      }

      .process-arrow {
        margin: 0 30rpx;
        margin-top: -30rpx;
        opacity: 0.6;
        animation: arrowPulse 2s infinite;
      }
    }
  }

  .bottom-section {
    text-align: center;
    padding: 20rpx;

    .apply-btn {
      background: linear-gradient(135deg, #ffb715, #f3bf47);
      color: #fff;
      border-radius: 40rpx;
      padding: 24rpx 40rpx;
      font-size: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12rpx;
      width: 90%;
      box-shadow: 0 6rpx 20rpx rgba(255, 206, 43, 0.2);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transform: translateX(-100%);
      }

      &:active {
        transform: translateY(2rpx);
        &::after {
          transform: translateX(100%);
          transition: transform 0.5s ease;
        }
      }
    }

    .apply-tips {
      font-size: 24rpx;
      color: #999;
      margin-top: 20rpx;
      display: block;
    }
  }
}

.pending-section,
.rejected-section {
  text-align: center;
  padding: 100rpx 40rpx;

  .status-title {
    font-size: 36rpx;
    color: #333;
    margin: 40rpx 0 20rpx;
    display: block;
  }

  .status-desc,
  .tips {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 20rpx;
    display: block;
  }
}

.rejected-section {
  .reject-reason {
    font-size: 28rpx;
    color: #ff4d4f;
    margin: 20rpx 0 40rpx;
    display: block;
  }

  .reapply-btn {
    background: #1677ff;
    color: #fff;
    border-radius: 40rpx;
    padding: 20rpx;
    font-size: 32rpx;
    width: 90%;
    margin: 0 auto;
  }
}

.approved-section {
  padding: 20rpx;

  .credit-cards {
    white-space: nowrap;
    margin: 0 -20rpx;
    padding: 20rpx;

    .credit-card {
      display: inline-block;
      width: 80%;
      padding: 30rpx;
      border-radius: 20rpx;
      color: #fff;
      margin-right: 20rpx;
      position: relative;
      overflow: hidden;
      background-image: url('http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/Mocard12备份_1734432502097.png');
      background-size: cover; /* 背景图片填充整个容器，可能会裁剪部分内容 */
      background-repeat: no-repeat;
      background-position: center;
      .credit-header {
        margin-bottom: 10rpx;

        .label {
          font-size: 28rpx;
          opacity: 0.9;
          display: block;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10rpx;
          .supplier {
            background-color: rgba(255, 255, 255, 0.2);
            padding: 15rpx 30rpx;
            border-radius: 20rpx;
          }
        }

        .amount {
          font-size: 38rpx;
          font-weight: bold;
          margin-top: 20rpx;
        }
      }

      .credit-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20rpx;
        .info-item {
          .label {
            font-size: 26rpx;
            opacity: 0.8;
          }

          .value {
            font-size: 26rpx;
            font-weight: 500;
            margin-top: 20rpx;
            display: block;
          }
        }
      }
      .history-item {
        padding-top: 20rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 20rpx;
        justify-content: space-between;
        border-top: 1rpx solid rgba(255, 255, 255, 0.2);
        .label {
          font-size: 24rpx;
          opacity: 0.8;
        }

        .value {
          font-size: 24rpx;
          font-weight: 500;

          display: block;
        }
      }
      .card-watermark {
        position: absolute;
        right: -20rpx;
        bottom: -20rpx;
        opacity: 0.1;
        transform: rotate(-15deg);
      }
    }
  }

  .function-grid {
    margin-top: 30rpx;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20rpx;
    padding: 0 10rpx;

    .grid-item {
      background: #fff;
      border-radius: 16rpx;
      padding: 20rpx;
      margin-bottom: 20rpx;
      text-align: center;
      box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
      transition: all 0.3s;

      &:active {
        transform: scale(0.98);
      }

      .item-icon {
        width: 64rpx;
        height: 64rpx;
        border-radius: 40rpx;
        background: rgba(255, 216, 43, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 12rpx;
      }

      .item-title {
        font-size: 26rpx;
        color: #333;
        display: block;
        margin-bottom: 8rpx;
      }

      .item-count {
        font-size: 24rpx;
        color: #999;
        display: block;
      }
    }
  }

  .detail-section {
    background: #f8f8f8;
    border-top-left-radius: 30rpx;
    border-top-right-radius: 30rpx;
    padding: 5%;
    margin-top: 30rpx;
    position: absolute;
    width: 90%;
    left: 0;
    padding-bottom: 120rpx;
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;

      .title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
      }

      .header-right {
        display: flex;
        align-items: center;
        gap: 16rpx;

        .pagination-mini {
          display: flex;
          align-items: center;
          background: #f5f5f5;
          border-radius: 8rpx;
          padding: 4rpx;

          .page-btn {
            width: 44rpx;
            height: 44rpx;
            padding: 0;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            border: none;

            &:disabled {
              opacity: 0.5;
            }
          }

          .page-text {
            font-size: 24rpx;
            color: #666;
            margin: 0 12rpx;
          }
        }

        .more {
          font-size: 24rpx;
          color: #ffb715;
          padding: 8rpx 16rpx;
          background: rgba(255, 206, 43, 0.1);
          border-radius: 6rpx;
        }
      }
    }

    .credit-list {
      .credit-card {
        background: #fff;
        border-radius: 20rpx;
        margin-bottom: 20rpx;
        padding: 40rpx;
        box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20rpx;

          .order-no {
            font-size: 28rpx;
            color: #404148;
            font-weight: 600;
          }

          .status {
            font-size: 28rpx;
            color: #404148;
            font-weight: 600;

            &.active {
              color: #52c41a;
              background: rgba(82, 196, 26, 0.1);
            }

            &.pending {
              color: #faad14;
              background: rgba(250, 173, 20, 0.1);
            }
          }
        }

        .card-content {
          .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12rpx;

            &:last-child {
              margin-bottom: 0;
            }

            .label {
              font-size: 26rpx;
              color: #666;
            }

            .value {
              font-size: 26rpx;
              color: #46c254;

              &.amount {
                font-size: 32rpx;
                color: #ffb715;
                font-weight: 500;
              }
            }
          }
        }
      }
    }
  }
}

// 添加动画
@keyframes slideIn {
  from {
    transform: translateX(100rpx);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slideIn {
  animation: slideIn 0.6s ease-out forwards;
}

@keyframes lineProgress {
  0% {
    height: 0;
  }
  50% {
    height: 100%;
  }
  100% {
    height: 0;
  }
}

.loading-circle {
  width: 40rpx;
  height: 40rpx;
  border: 3rpx solid rgba(255, 216, 43, 0.2);
  border-top-color: #ffb715;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10rpx);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes arrowPulse {
  0% {
    transform: translateX(0);
    opacity: 0.6;
  }
  50% {
    transform: translateX(4rpx);
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 0.6;
  }
}

// 待审核状态样式
.pending-section {
  padding: 40rpx 20rpx;

  .progress-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40rpx;

      .title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
      }

      .time {
        font-size: 24rpx;
        color: #666;
      }
    }

    .progress-steps {
      .step-item {
        display: flex;
        align-items: flex-start;
        position: relative;
        padding-bottom: 40rpx;

        .step-icon {
          width: 64rpx;
          height: 64rpx;
          margin-right: 20rpx;
          position: relative;
          z-index: 1;

          .loading-circle {
            width: 100%;
            height: 100%;
            border: 3rpx solid #ffb715;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            .loading-icon {
              width: 32rpx;
              height: 32rpx;
              border: 3rpx solid #ffb715;
              border-top-color: transparent;
              border-radius: 50%;
              animation: loading 1s linear infinite;
            }
          }
        }

        .step-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          .step-title {
            font-size: 28rpx;
            color: #333;
            font-weight: 500;
            margin-bottom: 8rpx;
          }

          .step-desc {
            font-size: 24rpx;
            color: #666;
          }

          .step-time {
            font-size: 24rpx;
            color: #999;
          }
        }

        &.completed {
          .step-icon {
            color: #ffb715;
          }
        }

        &.active {
          .step-title {
            color: #ffb715;
          }
        }
      }

      .step-line {
        width: 2rpx;
        height: 60rpx;
        background: #eee;
        margin-left: 31rpx;
        position: relative;

        .line-progress {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: #ffb715;
        }

        .line-wait {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: #eee;
        }
      }
    }
  }

  .tips-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;

    .tips-header {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;

      text {
        font-size: 28rpx;
        font-weight: 500;
        color: #333;
        margin-left: 12rpx;
      }
    }

    .tips-content {
      .tip-item {
        display: flex;
        align-items: center;
        margin-bottom: 16rpx;

        text {
          font-size: 26rpx;
          color: #666;
          margin-left: 12rpx;
        }
      }
    }
  }

  .contact-section {
    text-align: center;
    margin-top: 60rpx;

    .contact-text {
      font-size: 26rpx;
      color: #999;
      margin-bottom: 20rpx;
      display: block;
    }

    .contact-btn {
      display: inline-flex;
      align-items: center;
      padding: 16rpx 40rpx;
      background: rgba(255, 206, 43, 0.1);
      border-radius: 40rpx;

      text {
        font-size: 28rpx;
        color: #ffb715;
        margin-left: 8rpx;
      }
    }
  }
}
.loading-more {
  text-align: center;
  padding: 30rpx;
  color: #999;
  font-size: 24rpx;
}
.empty-state {
  padding: 120rpx 0;
}
// 添加加载动画
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
