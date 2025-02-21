<template>
  <view class="container">
    <view class="header">
      <view class="title-section">
        <text class="main-title">企业管理</text>
        <text class="sub-title">选择或创建您的企业</text>
        <!-- 快捷操作区 -->
        <view class="quick-actions" v-if="currentTab === 'select'">
          <view class="action-card" @tap="showJoinCompany">
            <u-icon name="plus-circle" size="30" color="#ffb715"></u-icon>
            <text>加入企业</text>
            <text class="desc">申请加入已有企业</text>
          </view>
          <view class="action-card" @tap="showCreateCompany">
            <u-icon name="file-text" size="30" color="#ffb715"></u-icon>
            <text>创建企业</text>
            <text class="desc">创建并管理新企业</text>
          </view>
        </view>
      </view>
    </view>

    <view class="content-section">
      <!-- 企业列表 -->
      <view class="company-list" v-if="currentTab === 'select'">
        <view class="section-title">我的企业</view>
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
        <button class="confirm-btn" :disabled="!selectedCompany" @click="handleEnterpriseClick()">确认进入</button>
      </view>
    </view>

    <u-popup :show="showJoinPopup" mode="center" @close="closeJoinPopup" round="10">
      <view class="popup-content">
        <view class="popup-header">
          <text class="title">加入企业</text>
          <u-icon name="close" size="20" color="#999" @tap="closeJoinPopup"></u-icon>
        </view>
        <view class="form-content">
          <u-form :model="joinForm" ref="joinFormRef">
            <u-form-item label="企业名称" required label-width="80">
              <u-input v-model="joinForm.enterpriseName" placeholder="请输入企业名称" :border="true"></u-input>
            </u-form-item>
          </u-form>
          <u-button @tap="submitJoinForm" style="background-color: #ffb815; color: #fff">提交申请</u-button>
        </view>
      </view>
    </u-popup>

    <u-popup :show="showCreatePopup" mode="center" @close="closeCreatePopup" round="10">
      <view class="popup-content">
        <view class="popup-header">
          <text class="title">创建企业</text>
          <u-icon name="close" size="20" color="#999" @tap="closeCreatePopup"></u-icon>
        </view>
        <view class="form-content">
          <u-form :model="createForm" ref="createFormRef">
            <u-form-item label="企业名称" required label-width="80">
              <u-input v-model="createForm.enterpriseName" placeholder="请输入企业名称" :border="true"></u-input>
            </u-form-item>
            <u-form-item label="角色" required label-width="50">
              <u-radio-group v-model="createForm.enterpriseType">
                <u-radio
                  v-for="(item, index) in roleOptions"
                  :key="index"
                  :label="item.label"
                  :name="item.value"
                  activeColor="#ffb815"
                >
                </u-radio>
              </u-radio-group>
            </u-form-item>
            <u-form-item label="营业执照" required label-width="80">
              <JwUpload v-model:value="createForm.certification"></JwUpload>
            </u-form-item>
          </u-form>
          <u-button @tap="submitCreateForm" style="background-color: #ffb815; color: #fff">提交申请</u-button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { putAction, getAction, postAction } from '@/common/store/manage'
import JwUpload from '@/components/JwUpload.vue'
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
  if (item.status !== '1') {
    uni.showToast({
      title: '该企业待审核中',
      icon: 'none',
    })
  } else {
    selectedCompany.value = item
  }
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

// 弹窗控制
const showJoinPopup = ref(false)
const showCreatePopup = ref(false)

// 加入企业表单
const joinForm = ref({
  enterpriseName: '',
})

// 创建企业表单
const createForm = ref({
  enterpriseName: '',
  enterpriseType: '1',
  certification: '',
  type: 0,
})

// 角色选项
const roleOptions = [
  { label: '客户', value: 'CUSTOMER' },
  { label: '供应商', value: 'SUPPLIER' },
]

// 显示加入企业弹窗
const showJoinCompany = () => {
  showJoinPopup.value = true
}

// 关闭加入企业弹窗
const closeJoinPopup = () => {
  showJoinPopup.value = false
  joinForm.value = { enterpriseName: '' }
}

// 显示创建企业弹窗
const showCreateCompany = () => {
  showCreatePopup.value = true
}

// 关闭创建企业弹窗
const closeCreatePopup = () => {
  showCreatePopup.value = false
  createForm.value = { enterpriseName: '', enterpriseType: '1', certification: '' }
}

// 选择营业执照
const chooseLicense = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      // 上传图片到服务器
      uploadLicense(res.tempFilePaths[0])
    },
  })
}

// 上传营业执照
const uploadLicense = (filePath) => {
  uni.uploadFile({
    url: '/your-upload-endpoint',
    filePath: filePath,
    name: 'file',
    success: (res) => {
      const data = JSON.parse(res.data)
      if (data.success) {
        createForm.value.certification = data.url
      }
    },
  })
}

// 移除营业执照
const removeLicense = () => {
  createForm.value.certification = ''
}

// 提交加入企业申请
const submitJoinForm = async () => {
  if (!joinForm.value.enterpriseName) {
    uni.showToast({
      title: '请输入企业名称',
      icon: 'none',
    })
    return
  }

  try {
    const res = await postAction('/auth/apply/join', Object.assign(joinForm.value, { type: 1 }))
    if (res.success) {
      uni.showToast({
        title: '申请已提交',
        icon: 'success',
      })
      closeJoinPopup()
      requestEnterpriseList()
    } else {
      uni.showToast({
        title: res.message,
        icon: 'error',
      })
      closeJoinPopup()
    }
  } catch (error) {
    console.error('提交失败:', error)
  }
}

// 提交创建企业申请
const submitCreateForm = async () => {
  if (!createForm.value.enterpriseName) {
    uni.showToast({
      title: '请输入企业名称',
      icon: 'none',
    })
    return
  }
  if (!createForm.value.certification) {
    uni.showToast({
      title: '请上传营业执照',
      icon: 'none',
    })
    return
  }

  try {
    createForm.value.certification = createForm.value.certification.split(',')
    const res = await postAction('/auth/apply/create', createForm.value)
    if (res.success) {
      uni.showToast({
        title: '申请已提交',
        icon: 'success',
      })
      closeCreatePopup()
      requestEnterpriseList()
    } else {
      uni.showToast({
        title: res.message,
        icon: 'error',
      })
      closeCreatePopup()
    }
  } catch (error) {
    console.error('提交失败:', error)
  }
}

// 添加当前选项卡状态
const currentTab = ref('select')

// 切换选项卡
const switchTab = (tab) => {
  currentTab.value = tab
}

// 添加标签页配置
const tabs = [
  { label: '企业列表', value: 'select', icon: 'home' },
  { label: '加入企业', value: 'join', icon: 'plus-circle' },
  { label: '创建企业', value: 'create', icon: 'file-text' },
]

// 处理标签点击
const handleTabClick = (tab) => {
  if (tab.value === 'join') {
    showJoinCompany()
  } else if (tab.value === 'create') {
    showCreateCompany()
  } else {
    switchTab(tab.value)
  }
}

onMounted(() => {
  console.log('进来了选企业')
  requestEnterpriseList()
})
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.container {
  min-height: 100vh;
  background: #f5f6fa;
  padding: 30rpx;
}

.header {
  padding: 60rpx 10rpx 0rpx;

  .title-section {
    margin-bottom: 40rpx;

    .main-title {
      font-size: 40rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 8rpx;
      display: block;
    }

    .sub-title {
      font-size: 26rpx;
      color: #999;
    }
  }

  .tab-header {
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding: 20rpx 0;
    margin-bottom: 20rpx;

    .tab-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16rpx 0;
      flex: 1;

      u-icon {
        margin-bottom: 8rpx;
      }

      text {
        font-size: 28rpx;
        color: #666;
      }

      &.active {
        text {
          color: $theme-color;
          font-weight: 500;
        }
      }
    }
  }
}

.content-section {
  padding: 0rpx 10rpx;
}

.company-list {
  .section-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
    margin-bottom: 20rpx;
    padding-left: 20rpx;
    border-left: 4rpx solid $theme-color;
  }

  .company-item {
    background: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    transition: all 0.3s;

    &.active {
      border: 2rpx solid $theme-color;
      background: rgba(255, 216, 43, 0.05);
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
          background: rgba(255, 216, 43, 0.1);
          color: $theme-color;
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

.quick-actions {
  margin-top: 40rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;

  .action-card {
    background: #fff;
    border-radius: 16rpx;
    padding: 10rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s;

    text {
      margin-top: 16rpx;
      font-size: 28rpx;
      color: #333;
      font-weight: 500;
    }

    .desc {
      margin-top: 8rpx;
      font-size: 24rpx;
      color: #999;
      font-weight: normal;
    }

    &:active {
      transform: scale(0.98);
      opacity: 0.9;
    }
  }
}

.confirm-btn {
  margin-top: 40rpx;
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background: $theme-color;
  color: #fff;
  font-size: 32rpx;
  text-align: center;
  // border-radius: 44rpx;

  &:disabled {
    background: #ccc;
  }
}

.bottom-actions {
  display: none;
}

.popup-content {
  width: 600rpx;
  background: #fff;
  border-radius: 20rpx;
  overflow: hidden;

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #eee;

    .title {
      font-size: 32rpx;
      font-weight: 500;
    }
  }

  .form-content {
    padding: 30rpx;

    .upload-section {
      .upload-preview {
        width: 200rpx;
        height: 200rpx;
        position: relative;

        image {
          width: 100%;
          height: 100%;
          border-radius: 8rpx;
        }

        .delete-btn {
          position: absolute;
          top: -10rpx;
          right: -10rpx;
          width: 40rpx;
          height: 40rpx;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .upload-btn {
        width: 200rpx;
        height: 200rpx;
        border: 2rpx dashed #ddd;
        border-radius: 8rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        text {
          font-size: 24rpx;
          color: #999;
          margin-top: 10rpx;
        }

        &:active {
          background: #f5f5f5;
        }
      }
    }

    .u-button {
      margin-top: 40rpx;
    }
  }
}
</style>
