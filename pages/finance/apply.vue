<template>
  <view class="container">
    <u-steps :list="stepList" :current="currentStep" mode="number"></u-steps>

    <!-- 第一步：基本信息 -->
    <view v-if="currentStep === 0" class="step-content">
      <u-form :model="formData" ref="form" :rules="rules">
        <view class="form-section">
          <view class="section-title">
            <text class="title">企业基本信息</text>
          </view>

          <u-form-item label="公司名称" prop="companyName" required label-width="120">
            <u--input v-model="formData.companyName" placeholder="请输入公司名称" border="none" />
          </u-form-item>

          <u-form-item label="联系人" prop="contactName" required label-width="120">
            <u--input v-model="formData.contactName" placeholder="请输入联系人姓名" border="none" />
          </u-form-item>
        </view>

        <view class="form-section">
          <view class="section-title">
            <text class="title">业务信息</text>
          </view>

          <u-form-item label="月均流水" prop="monthlyFlow" required label-width="120">
            <u--input v-model="formData.monthlyFlow" type="number" border="none" placeholder="请输入月均流水(万元)" />
          </u-form-item>

          <u-form-item label="主营产品" prop="product" required label-width="120">
            <u--input v-model="formData.product" placeholder="请输入主营产品" border="none" />
          </u-form-item>

          <u-form-item label="品牌名称" prop="brand" required label-width="120">
            <u--input v-model="formData.brand" placeholder="请输入品牌名称" border="none" />
          </u-form-item>

          <u-form-item label="平台模式" prop="companyMode" required label-width="120">
            <u--input v-model="formData.companyMode" placeholder="请输入平台模式" border="none" />
          </u-form-item>
        </view>

        <view class="form-section">
          <view class="section-title">
            <text class="title">申请信息</text>
          </view>

          <u-form-item label="申请额度" prop="applyAmount" required label-width="120">
            <u--input v-model="formData.applyAmount" type="number" border="none" placeholder="请输入申请额度(万元)" />
          </u-form-item>

          <u-form-item label="申请原因" prop="applyReason" required label-width="120">
            <u-textarea
              v-model="formData.applyReason"
              placeholder="请详细说明申请原因"
              :maxlength="200"
              border="none"
            />
          </u-form-item>
        </view>
      </u-form>

      <view class="step-buttons">
        <button class="next-btn" @tap="nextStep">下一步</button>
      </view>
    </view>

    <!-- 第二步：审核资料 -->
    <view v-else class="step-content">
      <view class="form-section">
        <view class="section-title">
          <text class="title">企业资质文件</text>
          <text class="subtitle">请上传清晰完整的照片或扫描件</text>
        </view>

        <view class="upload-list">
          <view v-for="(item, index) in dataSource" :key="index" class="upload-item">
            <text class="upload-label">{{ item.fileName }}<text class="required">*</text></text>
            <JwUpload v-model:value="item.url"></JwUpload>
          </view>
        </view>
      </view>

      <view class="step-buttons">
        <button class="prev-btn" @tap="prevStep">上一步</button>
        <button class="submit-btn" @tap="submitApplication">提交申请</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAction, postAction } from '../../common/store/manage'
import JwUpload from '../../components/JwUpload.vue'
const currentStep = ref(0)
const stepList = [{ title: '基本信息' }, { title: '审核资料' }]

const form = ref(null)
const formData = ref({
  companyName: '',
  contactName: '',
  monthlyFlow: '',
  product: '',
  brand: '',
  companyMode: '',
  applyAmount: '',
  applyReason: '',
  attachments: {},
})
const dataSource = ref([])
const uploadItems = [
  { label: '企业营业执照', key: 'businessLicense' },
  { label: '税务登记证', key: 'taxCertificate' },
  { label: '组织机构代码证', key: 'orgCode' },
  { label: '法定代表人身份证', key: 'legalIdCard' },
  { label: '公司章程', key: 'companyCharter' },
  { label: '近三年财务报表', key: 'financialStatements' },
  { label: '近期银行对账单', key: 'bankStatement' },
  { label: '相同业务合同', key: 'businessContract' },
  { label: '企业信用报告', key: 'creditReport' },
]

const rules = {
  companyName: { required: true, message: '请输入公司名称' },
  contactName: { required: true, message: '请输入联系人' },

  monthlyFlow: { required: true, message: '请输入月均流水' },
  product: { required: true, message: '请输入主营产品' },
  brand: { required: true, message: '请输入品牌名称' },
  companyMode: { required: true, message: '请选择平台模式' },
  applyAmount: { required: true, message: '请输入申请额度' },
  applyReason: { required: true, message: '请输入申请原因' },
}
const handleDataSource = () => {
  const keys = Object.keys(formData.value.attachments)
  Object.keys(formData.value.attachments).sort((a, b) => a - b)
  const sorted = {}
  // 遍历排序后的key赋值
  keys.forEach((key) => {
    sorted[key] = formData.value.attachments[key]
  })
  formData.value.attachments = sorted
  dataSource.value = Object.values(formData.value.attachments).map((item) => {
    return item
  })
  console.log('dataSource', dataSource.value)
  initSupplement()
}
const initSupplement = () => {
  const defaultMaterials = [
    {
      fileName: '企业营业执照',
      url: '',
      required: '',
      showClient: true,
      showOperator: true,
      fileType: 'doc',
      scence: 'edit',
      editable: false,
    },
    {
      fileName: '税务登记证',
      url: '',
      required: '',
      showClient: true,
      showOperator: true,
      fileType: 'doc',
      scence: 'edit',
      editable: false,
    },
    {
      fileName: '组织机构代码证',
      url: '',
      required: '',
      showClient: true,
      showOperator: true,
      fileType: 'doc',
      scence: 'edit',
      editable: false,
    },
    {
      fileName: '法定代表人身份证明',
      url: '',
      required: '',
      showClient: true,
      showOperator: true,
      fileType: 'doc',
      scence: 'edit',
      editable: false,
    },
    {
      fileName: '公司章程',
      url: '',
      required: '',
      showClient: true,
      showOperator: true,
      fileType: 'doc',
      scence: 'edit',
      editable: false,
    },
    {
      fileName: '近三年财务报表',
      url: '',
      required: '（资产负债表、利润表、现金流量表）',
      showClient: true,
      showOperator: true,
      fileType: 'doc',
      scence: 'edit',
      editable: false,
    },
    {
      fileName: '近期银行对账单',
      url: '',
      required: '',
      showClient: true,
      showOperator: true,
      fileType: 'doc',
      scence: 'edit',
      editable: false,
    },
    {
      fileName: '相关业务合同',
      url: '',
      required: '（如采购合同、项目合同等）',
      showClient: true,
      showOperator: true,
      fileType: 'doc',
      scence: 'edit',
      editable: false,
    },
    {
      fileName: '企业信用报告',
      url: '',
      required: '',
      showClient: true,
      showOperator: true,
      fileType: 'doc',
      scence: 'edit',
      editable: false,
    },
  ]
  const isDefaultMaterialsExist = defaultMaterials.every((material) =>
    dataSource.value.some((item) => item.fileName === material.fileName)
  )
  if (!isDefaultMaterialsExist) {
    dataSource.value.push(...defaultMaterials)
  }
  dataSource.value = dataSource.value.map((item, index) => {
    return {
      ...item,
      key: index + 1,
    }
  })
  console.log('initSupplement', dataSource.value, formData.value)
}
const nextStep = async () => {
  try {
    await form.value.validate()
    currentStep.value = 1
  } catch (error) {
    uni.showToast({
      title: error.message || '请完善表单信息',
      icon: 'none',
    })
  }
}

const prevStep = () => {
  currentStep.value = 0
}

const uploadFile = (key) => {
  uni.chooseImage({
    count: 3 - formData.value.files[key].length,
    success: (res) => {
      formData.value.files[key].push(...res.tempFilePaths)
    },
  })
}

const deleteFile = (key, index) => {
  formData.value.files[key].splice(index, 1)
}

const save = () => {
  return new Promise((resolve, reject) => {
    postAction('/fms/customerApply/saveOrEdit', { ...formData.value, businessType: 'LOAN' }).then((res) => {
      if (res.success) {
        resolve(res.result)
        uni.showToast({
          title: '提交成功',
          icon: 'success',
        })
        loadData()
      } else {
        uni.showToast({
          title: res.message,
        })
      }
    })
  })
}

const submitApplication = async () => {
  try {
    dataSource.value.forEach((item, index) => {
      formData.value.attachments[index + 1] = item
    })
    uni.showLoading({
      title: '提交中',
    })

    console.log('提交', formData.value, dataSource.value)
    save().then((ID) => {
      console.log('ID', ID)
      postAction(`/fms/customerApply/apply?id=${ID}`).then((res) => {
        if (res.success) {
          uni.showToast({
            title: '提交成功',
            icon: 'success',
          })
          loadData()
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/finance/index',
              success: () => {
                uni.$emit('refreshFinanceStatus')
              },
            })
          }, 1500)
        } else {
          uni.showToast({
            title: res.message,
          })
        }
      })
    })
  } catch (error) {
    uni.showToast({
      title: error.message || '请完善所有资料',
      icon: 'none',
    })
  }
}
const loadData = () => {
  getAction('/fms/customerApply/queryByRole', {
    businessType: 'LOAN',
  }).then((res) => {
    if (res.success && res.result) {
      formData.value = res.result
      formData.value.businessType = 'LOAN'
    }
  })
}
onMounted(() => {
  loadData()
  handleDataSource()
})
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20rpx;
}

.step-content {
  margin-top: 40rpx;
}

.form-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;

  .section-title {
    margin-bottom: 30rpx;

    .title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      display: block;
    }

    .subtitle {
      font-size: 24rpx;
      color: #999;
      margin-top: 8rpx;
      display: block;
    }
  }
}

.upload-list {
  .upload-item {
    margin-bottom: 30rpx;

    .upload-label {
      font-size: 28rpx;
      color: #333;
      margin-bottom: 16rpx;
      display: block;

      .required {
        color: #ff4d4f;
        margin-left: 4rpx;
      }
    }

    .upload-content {
      display: flex;
      flex-wrap: wrap;
      gap: 20rpx;
    }

    .upload-preview {
      width: 200rpx;
      height: 200rpx;
      border-radius: 12rpx;
      overflow: hidden;
      position: relative;

      image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .delete-btn {
        position: absolute;
        top: 8rpx;
        right: 8rpx;
        width: 40rpx;
        height: 40rpx;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .upload-add {
      width: 200rpx;
      height: 200rpx;
      border: 2rpx dashed #ddd;
      border-radius: 12rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #999;

      text {
        font-size: 24rpx;
        margin-top: 8rpx;

        &.tip {
          font-size: 20rpx;
          color: #ccc;
        }
      }
    }
  }
}
:deep(.u-form-item) {
  padding: 20rpx 0;

  .u-form-item__body {
    padding: 0;
  }

  .u-form-item__body__left {
    font-size: 28rpx;
    color: #666;
  }

  .u-form-item__body__right {
    flex: 1;
  }
}
.step-buttons {
  display: flex;
  gap: 20rpx;
  padding: 40rpx 20rpx;

  button {
    flex: 1;
    height: 88rpx;
    border-radius: 44rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;

    &.prev-btn {
      background: #fff;
      color: #666;
      border: 2rpx solid #ddd;
    }

    &.next-btn,
    &.submit-btn {
      background: linear-gradient(135deg, #ffb200, #ebc160);
      color: #fff;
    }
  }
}
</style>
