<template>
  <view class="container">
    <!-- 顶部用户信息卡片 -->
    <view class="user-card">
      <view class="user-info">
        <view class="avatar-wrapper">
          <image
            class="avatar"
            src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/头像示例(1)_1734429571211.png"
            mode="aspectFill"
          />
          <view class="vip-badge" v-if="userInfo.vipLevel">
            <u-icon name="star-fill" color="#FFD700" size="12"></u-icon>
            <text>VIP{{ userInfo.vipLevel }}</text>
          </view>
        </view>
        <view class="info-content">
          <view class="name-row">
            <text class="username">Hi {{ model.username || '未设置昵称' }}</text>
            <view class="auth-badge" v-if="userInfo.isVerified">
              <u-icon name="checkmark-circle" color="#2b5cff" size="14"></u-icon>
              <text>已认证</text>
            </view>
          </view>
          <text class="company">{{ model.enterprise ? model.enterprise.name : '' }}</text>
        </view>
      </view>
      <!-- <view class="user-stats">
        <view class="stat-item">
          <text class="value">{{ stats.orderCount }}</text>
          <text class="label">订单</text>
        </view>
        <view class="stat-item">
          <text class="value">{{ stats.creditScore }}</text>
          <text class="label">信用分</text>
        </view>
        <view class="stat-item">
          <text class="value">{{ stats.couponCount }}</text>
          <text class="label">优惠券</text>
        </view>
      </view> -->
    </view>

    <view class="section-contain">
      <!-- 订单管理 -->
      <view class="section-card">
        <view class="section-header">
          <view class="section-title">
            <text>订单管理</text>
          </view>
        </view>
        <view class="order-menu">
          <view class="order-item" v-for="item in orderTypes" :key="item.id" @tap="navigateTo(item.path)">
            <view class="icon-box">
              <u-icon :name="item.icon" color="#ffb713" size="26"></u-icon>
              <view class="count" v-if="item.count">{{ item.count }}</view>
            </view>
            <text class="order-text">{{ item.name }}</text>
          </view>
        </view>
      </view>
      <!-- 功能区块 -->

      <view class="section-card">
        <view class="list-menu">
          <view class="menu-item" v-for="item in services" :key="item.id" @tap="navigateTo(item.path)">
            <view class="item-left">
              <view class="icon-wrapper" :style="{ background: item.bgColor }">
                <u-icon :name="item.icon" :color="item.iconColor" size="20"></u-icon>
              </view>
              <text class="menu-text">{{ item.name }}</text>
            </view>
            <view class="item-right">
              <text class="desc-text" v-if="item.desc">{{ item.desc }}</text>
              <u-icon name="arrow-right" color="#999" size="14"></u-icon>
            </view>
          </view>
        </view>
      </view>

      <!-- 其他功能列表 -->
      <view class="section-card">
        <view class="list-menu">
          <view class="menu-item" v-for="item in otherMenus" :key="item.id" @tap="navigateTo(item.path)">
            <view class="item-left">
              <view class="icon-wrapper" :style="{ background: item.bgColor }">
                <u-icon :name="item.icon" :color="item.iconColor" size="20"></u-icon>
              </view>
              <text class="menu-text">{{ item.name }}</text>
            </view>
            <view class="item-right">
              <text class="desc-text" v-if="item.desc">{{ item.desc }}</text>
              <u-icon name="arrow-right" color="#999" size="14"></u-icon>
            </view>
          </view>
        </view>
      </view>

      <!-- 退出登录按钮 -->
      <view class="logout-section">
        <u-button class="logout-btn" @tap="handleLogout">退出登录</u-button>
        <u-button class="logout-btn" style="margin-top: 20rpx" @tap="handleQuit">注销账号</u-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAction } from '@/common/store/manage'
const model = ref({})
// 用户信息
const userInfo = ref({
  avatar: '',
  nickname: '张三',
  companyName: '某某科技有限公司',
  vipLevel: 2,
  isVerified: true,
})

// 统计数据
const stats = ref({
  orderCount: 128,
  creditScore: 750,
  couponCount: 3,
})

// 我的服务
const services = [
  {
    id: 3,
    name: '库存明细',
    icon: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/库存_1734589527874.png',
    path: '/pages/inventory/list',
    bgColor: '#fff',
    iconColor: '#373737',
  },
  {
    id: 4,
    name: '库存流水',
    icon: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/库存流水_1734924302208.png',
    path: '/pages/inventory/flow',
    bgColor: '#fff',
    iconColor: '#373737',
  },
  {
    id: 2,
    name: '商品管理',
    icon: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/商品_1734589546543.png',
    path: '/pages/goods/manage',
    bgColor: '#fff',
    iconColor: '#373737',
  },
  {
    id: 1,
    name: '地址管理',
    icon: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/服务协议_1734589559881.png',
    path: '/pages/address/manage',
    bgColor: '#fff',
    iconColor: '#373737',
  },

  // {
  //   id: 3,
  //   name: '发票管理',
  //   icon: 'file-text',
  //   path: '/pages/invoice/list',
  //   bgColor: '#fff',
  //   iconColor: '#373737',
  // },
  // {
  //   id: 4,
  //   name: '优惠券',
  //   icon: 'gift',
  //   path: '/pages/coupon/list',
  //   bgColor: '#fff',
  //   iconColor: '#373737',
  // },
]

// 订单类型
const orderTypes = [
  {
    id: 1,
    name: '全部',
    icon: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/形状_1734588692367.png',
    path: '/pages/order/list?status=all',
    // count: 2,
  },
  {
    id: 2,
    name: '新创建',
    icon: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/形状(1)_1734588718124.png',
    path: '/pages/order/list?status=6',
    // count: 1,
  },
  {
    id: 3,
    name: '执行中',
    icon: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/编组16_1734588745536.png',
    path: '/pages/order/list?status=1,2,3,7,8',
  },
  {
    id: 4,
    name: '已完成',
    icon: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/已完成_1734924416506.png',
    path: '/pages/order/list?status=4',
  },
]

// 其他菜单
const otherMenus = [
  {
    id: 1,
    name: '企业信息',
    icon: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/隐私政策_1734589575250.png',
    path: '/pages/profile/company-info',
    bgColor: '#fff',
    iconColor: '#373737',
    desc: '已认证',
  },
  // {
  //   id: 2,
  //   name: '设置',
  //   icon: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/设置_1734589587248.png',
  //   path: '/pages/setting/account',
  //   bgColor: '#fff',
  //   iconColor: '#373737',
  // },
  {
    id: 3,
    name: '关于我们',
    icon: 'info-circle',
    path: '/pages/about/index',
    bgColor: '#fff',
    iconColor: '#373737',
  },
]

// 页面方法
const navigateTo = (path) => {
  uni.navigateTo({ url: path })
}

const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        uni.clearStorageSync()
        uni.reLaunch({
          url: '/pages/login/index',
        })
      }
    },
  })
}
const handleQuit = () => {
  uni.showModal({
    title: '提示',
    content: '确定要注销该用户吗？',
    success: (res) => {
      if (res.confirm) {
        uni.clearStorageSync()
        uni.reLaunch({
          url: '/pages/login/index',
        })
      }
    },
  })
}

const getUserInfo = () => {
  getAction('/auth/accountInfo').then((res) => {
    model.value = res.result
    uni.setStorageSync('enterprise', res.result.enterprise)
    console.log('model', model.value)
  })
}
onMounted(() => {
  getUserInfo()
})

// 跳转到企业信息页面
const goToCompanyInfo = () => {
  uni.navigateTo({
    url: '/pages/profile/company-info',
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.container {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  position: relative;
}

.user-card {
  position: absolute;
  padding: 100rpx 0rpx;
  margin-bottom: 20rpx;
  top: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  background-image: url('http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/编组4_1734429598380.png');
  background-size: cover; /* 背景图片填充整个容器，可能会裁剪部分内容 */
  background-repeat: no-repeat;
  background-position: center;
  .user-info {
    display: flex;
    align-items: center;
    width: 90%;
    margin: 50rpx auto;
    // margin-bottom: 10rpx;

    .avatar-wrapper {
      position: relative;
      margin-right: 20rpx;

      .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 60rpx;
        border: 4rpx solid #fff;
        box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
      }

      .vip-badge {
        position: absolute;
        bottom: -6rpx;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #ffd700, #ffa500);
        border-radius: 20rpx;
        padding: 4rpx 12rpx;
        display: flex;
        align-items: center;

        text {
          color: #fff;
          font-size: 20rpx;
          margin-left: 4rpx;
        }
      }
    }

    .info-content {
      flex: 1;

      .name-row {
        display: flex;
        align-items: center;
        margin-bottom: 8rpx;

        .username {
          font-size: 32rpx;
          font-weight: bold;
          color: #333;
          margin-right: 12rpx;
        }

        .auth-badge {
          display: flex;
          align-items: center;
          background: rgba(43, 92, 255, 0.1);
          border-radius: 20rpx;
          padding: 4rpx 12rpx;

          text {
            color: #2b5cff;
            font-size: 20rpx;
            margin-left: 4rpx;
          }
        }
      }

      .company {
        font-size: 26rpx;
        color: #666;
      }
    }
  }

  .user-stats {
    display: flex;
    justify-content: space-around;
    padding-top: 20rpx;
    border-top: 1rpx solid #f5f5f5;

    .stat-item {
      text-align: center;

      .value {
        font-size: 36rpx;
        font-weight: bold;
        color: #333;
        display: block;
      }

      .label {
        font-size: 24rpx;
        color: #999;
        margin-top: 4rpx;
      }
    }
  }
}

.section-contain {
  position: absolute;
  top: 22vh;
  left: 0;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 100rpx;
}

.section-card {
  background: #fff;
  border-radius: 20rpx;
  width: 86%;
  padding: 25rpx;
  margin: 20rpx auto 20rpx;

  box-shadow: 0rpx 12rpx 24rpx 0rpx rgba(17, 25, 30, 0.05);
  border-radius: 32rpx;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
  }

  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
  }

  .more {
    display: flex;
    align-items: center;

    text {
      font-size: 26rpx;
      color: #999;
      margin-right: 4rpx;
    }
  }
}

.grid-menu {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16rpx;

  .menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    flex: 1;
    .icon-wrapper {
      width: 72rpx;
      height: 72rpx;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12rpx;
    }

    .menu-text {
      font-size: 22rpx;
      color: #333;
    }

    .badge {
      position: absolute;
      top: -6rpx;
      right: 15%;
      background: #ff4d4f;
      color: #fff;
      font-size: 20rpx;
      padding: 2rpx 8rpx;
      border-radius: 16rpx;
      border: 2rpx solid #fff;
    }
  }
}

.order-menu {
  display: flex;
  padding: 0 30rpx;
  justify-content: space-between;

  .order-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon-box {
      position: relative;
      margin-bottom: 12rpx;

      .count {
        position: absolute;
        top: -10rpx;
        right: -10rpx;
        background: #ff4d4f;
        color: #fff;
        font-size: 16rpx;
        min-width: 32rpx;
        height: 32rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .order-text {
      font-size: 24rpx;
      color: #333;
    }
  }
}

.list-menu {
  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }

    .item-left {
      display: flex;
      align-items: center;

      .icon-wrapper {
        width: 64rpx;
        height: 64rpx;
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20rpx;
      }

      .menu-text {
        font-size: 28rpx;
        color: #333;
      }
    }

    .item-right {
      display: flex;
      align-items: center;

      .desc-text {
        font-size: 24rpx;
        color: #999;
        margin-right: 8rpx;
      }
    }
  }
}

.logout-section {
  margin: 60rpx 0;
  padding: 0 40rpx;

  .logout-btn {
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
    background: #fff;
    color: #555353;
    border-radius: 44rpx;
    font-size: 32rpx;
    // box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
  }
}

.menu-item {
  .icon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 20rpx;
  }
}
</style>
