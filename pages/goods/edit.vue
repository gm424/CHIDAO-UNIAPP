<template>
  <view class="container">
    <view class="form-wrapper">
      <!-- 表单标题 -->
      <view class="form-header">
        <text class="title">商品信息</text>
        <text class="subtitle">请填写商品详细信息</text>
      </view>

      <!-- 表单内容 -->
      <u--form :model="formData" ref="uForm" :rules="rules" labelWidth="160">
        <!-- 基本信息 -->
        <view class="form-section">
          <view class="section-title">基本信息</view>
          <u-form-item label="sku" prop="sku" required borderBottom>
            <u--input v-model="formData.sku" placeholder="请输入商品编码" border="none" />
          </u-form-item>

          <u-form-item label="商品名称" prop="name" required borderBottom>
            <u--input v-model="formData.name" placeholder="请输入商品名称" border="none" />
          </u-form-item>

          <u-form-item label="英文名称" prop="enName" borderBottom>
            <u--input v-model="formData.enName" placeholder="请输入英文名称" border="none" />
          </u-form-item>
        </view>

        <!-- 规格信息 -->
        <view class="form-section">
          <view class="section-title">规格信息</view>
          <u-form-item label="品牌" prop="brand" borderBottom>
            <u--input v-model="formData.brand" placeholder="请输入品牌" border="none" />
          </u-form-item>
          <u-form-item label="用途" prop="purpose" borderBottom>
            <u--input v-model="formData.purpose" placeholder="请输入用途" border="none" />
          </u-form-item>

          <u-form-item label="颜色" prop="color" borderBottom>
            <u--input v-model="formData.color" placeholder="请输入颜色" border="none" />
          </u-form-item>

          <u-form-item label="单位" prop="unit" required borderBottom>
            <u--input v-model="formData.unit" placeholder="请输入单位" border="none" />
          </u-form-item>

          <u-form-item label="材质" prop="material" borderBottom>
            <u--input v-model="formData.material" placeholder="请输入材质" border="none" />
          </u-form-item>

          <u-form-item label="型号" prop="model" borderBottom>
            <u--input v-model="formData.model" placeholder="请输入型号" border="none" />
          </u-form-item>

          <u-form-item label="产品条形码" prop="barcode" borderBottom>
            <u--input v-model="formData.barcode" placeholder="请输入产品条形码" border="none" />
          </u-form-item>

          <u-form-item label="海关编码" prop="hsCode" borderBottom>
            <u--input v-model="formData.hsCode" placeholder="请输入海关编码" border="none" />
          </u-form-item>

          <u-form-item label="销售链接" prop="saleLink" borderBottom>
            <u--input v-model="formData.saleLink" placeholder="请输入销售链接" border="none" />
          </u-form-item>
        </view>

        <!-- 尺寸重量 -->
        <view class="form-section">
          <view class="section-title">尺寸重量</view>
          <u-form-item label="尺寸" required borderBottom>
            <view class="input-group">
              <view class="input-item">
                <u--input v-model="formData.length" type="number" placeholder="长" border="none" />
                <text class="unit-text">cm</text>
              </view>
              <view class="input-item">
                <u--input v-model="formData.width" type="number" placeholder="宽" border="none" />
                <text class="unit-text">cm</text>
              </view>
              <view class="input-item">
                <u--input v-model="formData.height" type="number" placeholder="高" border="none" />
                <text class="unit-text">cm</text>
              </view>
            </view>
          </u-form-item>

          <u-form-item label="重量" required borderBottom>
            <view class="input-group">
              <view class="input-item">
                <u--input v-model="formData.grossWeight" type="number" placeholder="毛重" border="none" />
                <text class="unit-text">KG </text>
              </view>
              <view class="input-item">
                <u--input v-model="formData.throwWeight" type="number" placeholder="泡重" border="none" />
                <text class="unit-text">KG</text>
              </view>
            </view>
          </u-form-item>
        </view>

        <!-- 价格信息 -->
        <view class="form-section">
          <view class="section-title">价格信息</view>
          <u-form-item label="价格" required borderBottom>
            <u--input v-model="formData.price" type="number" placeholder="价格" border="none" />
          </u-form-item>
          <u-form-item label="申报币种" required borderBottom>
            <u--input
              v-model="formData.declareCurrency"
              type="number"
              placeholder="请输入申报币种"
              border="none"
              @click="showCurrencyPicker = true"
            />
          </u-form-item>
          <u-form-item label="申报价值" required borderBottom>
            <u--input v-model="formData.declareValue" type="number" placeholder="请输入申报价值" border="none" />
          </u-form-item>
        </view>

        <!-- 备注信息 -->
        <view class="form-section">
          <view class="section-title">备注信息</view>
          <u-form-item borderBottom>
            <u--textarea
              v-model="formData.remark"
              placeholder="请输入备注信息"
              :maxlength="200"
              height="120"
              border="none"
            />
          </u-form-item>
        </view>
      </u--form>
    </view>

    <!-- 币种选择器 -->
    <u-picker
      :show="showCurrencyPicker"
      :columns="[currencyOptions]"
      @confirm="onCurrencyConfirm"
      @cancel="showCurrencyPicker = false"
    ></u-picker>

    <!-- 底部按钮 -->
    <view class="bottom-bar">
      <u-button type="info" @click="goBack" :plain="true" text="取消"></u-button>
      <u-button @click="handleSubmit" text="提交" style="background-color: #ffb917; color: #fff"></u-button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAction, putAction } from '@/common/store/manage'
import { validateHsCode } from '@/common/utils/validate.js'
import { onLoad } from '@dcloudio/uni-app'
const formData = ref({
  name: '',
  enName: '',
  material: '',
  hsCode: '',
  declareUnitPrice: '',
  images: [],
  description: '',
  status: '1',
})

const rules = {
  name: [{ required: true, message: '请输入商品名称', trigger: ['blur', 'change'] }],
  hsCode: [{ required: true, message: '请输入海关编码', trigger: ['blur', 'change'] }],
  declareUnitPrice: [{ required: true, message: '请输入申报单价', trigger: ['blur', 'change'] }],
}

const uForm = ref(null)

// 获取商品详情
const loadGoodsDetail = async (id) => {
  ;(formData.value = uni.getStorageSync('goods')), console.log('formData', formData.value)
}

// 提交表单
const handleSubmit = async () => {
  await uForm.value.validate()

  putAction('/merch/sku/edit', formData.value).then((res) => {
    if (res.success) {
      uni.showToast({
        title: '保存成功',
        icon: 'success',
      })
      setTimeout(() => {
        goBack()
      }, 1500)
    }
  })
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}
onLoad((options) => {
  if (options.id) {
    loadGoodsDetail(options.id)
  }
})
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f5f7fa;
  padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
}

.form-wrapper {
  padding: 20rpx;
}

.form-header {
  padding: 30rpx 20rpx;
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;

  .title {
    font-size: 36rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 8rpx;
    display: block;
  }

  .subtitle {
    font-size: 24rpx;
    color: #999;
  }
}

.form-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;

  .section-title {
    font-size: 28rpx;
    font-weight: 500;
    color: #333;
    padding: 20rpx 0;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 20rpx;
  }
}

.input-group {
  display: flex;
  gap: 20rpx;
  width: 100%;

  .input-item {
    flex: 1;
    position: relative;

    &.flex-2 {
      flex: 2;
    }

    .unit-text {
      position: absolute;
      right: 20rpx;
      top: 50%;
      transform: translateY(-50%);
      font-size: 24rpx;
      color: #999;
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

.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20rpx;
  background: #fff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 20rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));

  .u-button {
    flex: 1;
    border-radius: 8rpx;
    height: 80rpx;
    font-size: 28rpx;
  }
}
</style>
