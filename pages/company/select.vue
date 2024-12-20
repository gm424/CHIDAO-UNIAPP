<template>
  <view class="container">
    <view class="header">
      <text class="title">选择企业</text>
      <text class="subtitle">请选择要进入的企业</text>
    </view>

    <view class="company-list">
      <view
        v-for="item in companyList"
        :key="item.id"
        class="company-item"
        :class="{ active: selectedCompany?.id === item.id }"
        @tap="select(item)"
      >
        <view class="company-info">
          <view class="name-row">
            <text class="name">{{ item.departName }}</text>
            <text class="code">{{ item.orgCode }}</text>
          </view>
          <view class="role-tag" :class="item.orgRole.toLowerCase()">{{ getRoleText(item.orgRole) }}</view>
        </view>
        <view class="status-row">
          <text class="status" :class="{ active: item.status === '1' }">
            {{ item.status_dictText }}
          </text>
        </view>
      </view>
    </view>

    <button class="confirm-btn" :disabled="!selectedCompany" @click="handleEnterpriseClick()">确认进入</button>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { putAction, getAction } from '@/common/store/manage'

const companyList = ref([])
const selectedCompany = ref(null)
// 获取角色文本
const getRoleText = (role) => {
  const roleMap = {
    ADMIN: '管理员',
    CUSTOMER: '客户',
    SUPPLIER: '供应商',
  }
  return roleMap[role] || role
}

const requestEnterpriseList = async () => {
  getAction('/sys/user/userEnterpriseList').then((res) => {
    companyList.value = res.result
  })
}
const select = (item) => {
  selectedCompany.value = item
}
// 确认选择
const handleEnterpriseClick = () => {
  if (selectedCompany.value.status !== '1') {
    return
  }

  putAction('/auth/{orgCode}/switchEnterprise'.replace('{orgCode}', selectedCompany.value.orgCode)).then((res) => {
    if (res.success) {
      // 保存选中的企业信息
      uni.setStorageSync('currentCompany', selectedCompany.value)
      // 跳转到首页
      uni.reLaunch({
        url: '/pages/index/index',
      })
    }
  })
}
onMounted(() => {
  requestEnterpriseList()
})
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f5f6fa;
  padding: 30rpx;
}

.header {
  padding: 40rpx 0;
  text-align: center;

  .title {
    font-size: 40rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
  }

  .subtitle {
    font-size: 28rpx;
    color: #666;
  }
}

.company-list {
  margin-top: 40rpx;

  .company-item {
    background: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    transition: all 0.3s;

    &.active {
      border: 2rpx solid #2b5cff;
      background: rgba(43, 92, 255, 0.05);
    }

    .company-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;

      .name-row {
        .name {
          font-size: 32rpx;
          font-weight: 500;
          color: #333;
          margin-right: 20rpx;
        }

        .code {
          font-size: 24rpx;
          color: #999;
        }
      }

      .role-tag {
        padding: 4rpx 16rpx;
        border-radius: 8rpx;
        font-size: 24rpx;

        &.admin {
          background: rgba(255, 87, 51, 0.1);
          color: #ff5733;
        }

        &.customer {
          background: rgba(43, 92, 255, 0.1);
          color: #2b5cff;
        }

        &.supplier {
          background: rgba(82, 196, 26, 0.1);
          color: #52c41a;
        }
      }
    }

    .status-row {
      .status {
        font-size: 24rpx;
        color: #999;

        &.active {
          color: #52c41a;
        }
      }
    }
  }
}

.confirm-btn {
  position: fixed;
  left: 40rpx;
  right: 40rpx;
  bottom: 40rpx;
  height: 88rpx;
  line-height: 88rpx;
  background: #2b5cff;
  color: #fff;
  border-radius: 44rpx;
  font-size: 32rpx;
  text-align: center;

  &:disabled {
    background: #ccc;
  }
}
</style>
