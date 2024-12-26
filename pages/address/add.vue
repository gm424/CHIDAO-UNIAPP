<template>
  <view class="container">
    <view class="form-section">
      <!-- 联系人信息 -->
      <view class="form-group">
        <view class="form-item">
          <text class="label">公司名称</text>
          <input v-model="formData.company" type="text" placeholder="请输入公司名称" class="input" />
        </view>
        <view class="form-item">
          <text class="label">地址名称</text>
          <input v-model="formData.name" placeholder="请输入地址名称" class="input" />
        </view>
        <view class="form-item">
          <text class="label">联系人</text>
          <input v-model="formData.contactName" type="text" placeholder="请输入联系人姓名" class="input" />
        </view>
        <view class="form-item">
          <text class="label">联系人号码</text>
          <input v-model="formData.contactPhone" type="number" placeholder="请输入手机号码" class="input" />
        </view>
      </view>

      <!-- 地址信息 -->
      <view class="form-group">
        <view class="form-item">
          <text class="label">国家</text>
          <input v-model="formData.country_dictText" placeholder="请输入国家" class="input" @focus="show = true" />
        </view>

        <view class="form-item">
          <text class="label">州/省</text>
          <input v-model="formData.province" placeholder="请输入州/省" class="input" />
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <input v-model="formData.city" placeholder="请输入城市" class="input" />
        </view>

        <view class="form-item">
          <text class="label">区/县</text>
          <input v-model="formData.district" placeholder="请输入区/县" class="input" />
        </view>

        <view class="form-item">
          <text class="label">门牌号</text>
          <input v-model="formData.streetNum" placeholder="请输入门牌号" class="input" />
        </view>
        <view class="form-item">
          <text class="label">邮政编码</text>
          <input v-model="formData.postcode" placeholder="请输入邮政编码" class="input" />
        </view>
        <view class="form-item">
          <text class="label">详细地址</text>
          <textarea v-model="formData.detailAddr" placeholder="请输入详细地址" class="textarea" />
        </view>
      </view>

      <!-- 地址类型 -->
      <view class="form-group">
        <view class="form-item">
          <text class="label">地址类型</text>
          <radio-group @change="onTypeChange">
            <label class="radio-item" v-for="type in addressTypes" :key="type.value">
              <radio :value="type.value" :checked="formData.type === type.value" color="#ffb200" />
              <text>{{ type.label }}</text>
            </label>
          </radio-group>
        </view>
      </view>
    </view>

    <view class="btn-group">
      <button class="submit-btn" @tap="handleSubmit">保存</button>
    </view>
    <!-- 添加国家选择弹窗 -->
    <u-popup :show="show" @close="closeCountrySelect" mode="bottom" round="10">
      <view class="country-popup">
        <view class="popup-header">
          <text>选择国家</text>
          <text class="close-btn" @tap="closeCountrySelect">关闭</text>
        </view>

        <!-- 添加搜索框 -->
        <view class="search-box">
          <u-search
            v-model="searchKeyword"
            placeholder="搜索国家"
            :show-action="false"
            @change="onSearchChange"
            :clearabled="true"
          ></u-search>
        </view>

        <!-- 修改国家列表显示逻辑 -->
        <scroll-view scroll-y class="country-list">
          <template v-if="searchKeyword">
            <!-- 搜索结果列表 -->
            <u-cell-group>
              <u-cell
                v-for="item in filteredCountries"
                :key="item.code"
                :title="item.name"
                :label="item.code"
                @click="selectCountry(item)"
              />
            </u-cell-group>
          </template>
          <template v-else>
            <!-- 原有的分组列表 -->
            <view v-for="group in countryListRef" :key="group.letter">
              <u-index-anchor :index="group.letter" />
              <u-cell
                v-for="item in group.countries"
                :key="item.code"
                :title="item.name"
                :label="item.code"
                @click="selectCountry(item)"
              />
            </view>
          </template>
        </scroll-view>
      </view>
    </u-popup>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { postAction } from '@/common/store/manage'
import { countries } from '@/utils/countries'

// 国家/地区列表
const searchKeyword = ref('')
// 国家数据
const countryListRef = ref(countries)
// 关闭选择器 (合并两个closeCountrySelect函数的功能)
const closeCountrySelect = () => {
  show.value = false
  searchKeyword.value = '' // 清空搜索关键词
}
const onSearchChange = (value) => {
  searchKeyword.value = value
}
// 搜索结果列表
const filteredCountries = computed(() => {
  if (!searchKeyword.value) return []

  const keyword = searchKeyword.value.toLowerCase()
  const results = []

  // 遍历所有国家进行搜索
  countryListRef.value.forEach((group) => {
    group.countries.forEach((country) => {
      if (country.name.toLowerCase().includes(keyword) || country.code.toLowerCase().includes(keyword)) {
        results.push(country)
      }
    })
  })

  return results
})
// 选择国家
const selectCountry = (country) => {
  formData.value.country = country.code
  formData.value.country_dictText = country.name
  closeCountrySelect()
}

const show = ref(false)
// 表单数据
const addressId = ref('')
const formData = ref({
  companyName: '', // 公司名称
  contactName: '', // 联系人
  contactPhone: '', // 联系电话
  country: 'CN', // 国家代码
  country_dictText: '', // 国家名称
  province: '', // 省份
  city: '', // 城市
  district: '', // 区县
  detailAddr: '', // 详细地址
  isDefault: '0', // 是否默认地址
  type: '1', // 地址类型：1-发货地址，2-收货地址
})

// 地址类型选项
const addressTypes = [
  { label: '发货地址', value: '1' },
  { label: '收货地址', value: '2' },
]

// 选择地址类型
const onTypeChange = (e) => {
  formData.value.type = e.detail.value
}

// 表单验证
const validateForm = () => {
  if (!formData.value.company) {
    uni.showToast({
      title: '请输入公司名称',
      icon: 'none',
    })
    return false
  }
  if (!formData.value.contactName) {
    uni.showToast({
      title: '请输入联系人姓名',
      icon: 'none',
    })
    return false
  }
  if (!formData.value.contactPhone) {
    uni.showToast({
      title: '请输入手机号码',
      icon: 'none',
    })
    return false
  }
  if (!formData.value.province || !formData.value.city || !formData.value.district) {
    uni.showToast({
      title: '请选择所在地区',
      icon: 'none',
    })
    return false
  }
  if (!formData.value.detailAddr) {
    uni.showToast({
      title: '请输入详细地址',
      icon: 'none',
    })
    return false
  }
  return true
}

// 提交表单
const handleSubmit = () => {
  if (!validateForm()) return

  const url = '/catalog/customerAddr/add'

  postAction(url, formData.value).then((res) => {
    if (res.success) {
      uni.showToast({
        title: '保存成功',
        icon: 'success',
      })
      // 触发保存事件，更新列表
      uni.$emit('saveAddress', formData.value)
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    } else {
      uni.showToast({
        title: res.message,
      })
    }
  })
}

onMounted(() => {})
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.container {
  min-height: 100vh;
  background: #f5f6fa;
  padding: 20rpx;
}

.form-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 0 30rpx;
}

.form-group {
  padding: 30rpx 0;
  border-bottom: 1px solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }
}

.form-item {
  margin-bottom: 30rpx;

  &:last-child {
    margin-bottom: 0;
  }

  .label {
    font-size: 28rpx;
    color: #333;
    margin-bottom: 20rpx;
    display: block;
  }

  .input {
    height: 88rpx;
    background: #f8f8f8;
    border-radius: 44rpx;
    padding: 0 30rpx;
    font-size: 28rpx;
  }

  .textarea {
    width: 94%;
    height: 160rpx;
    background: #f8f8f8;
    border-radius: 16rpx;
    padding: 20rpx;
    font-size: 28rpx;
  }

  .picker {
    height: 88rpx;
    background: #f8f8f8;
    border-radius: 44rpx;
    padding: 0 30rpx;
    font-size: 28rpx;
    line-height: 88rpx;
    color: #333;
  }

  &.switch-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10rpx;

  .tag {
    margin: 10rpx;
    padding: 10rpx 30rpx;
    background: #f8f8f8;
    border-radius: 32rpx;
    font-size: 24rpx;
    color: #666;

    &.active {
      background: $theme-color;
      color: #fff;
    }
  }
}

.btn-group {
  margin-top: 60rpx;
  padding: 0 30rpx;

  .submit-btn {
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
    background: $theme-color;
    color: #fff;
    border-radius: 44rpx;
    font-size: 32rpx;
    margin-bottom: 30rpx;
  }

  .delete-btn {
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
    background: #fff;
    color: #ff5733;
    border-radius: 44rpx;
    font-size: 32rpx;
    border: 1px solid #ff5733;
  }
}

// 添加单选框样式
.radio-item {
  display: inline-flex;
  align-items: center;
  margin-right: 40rpx;

  text {
    margin-left: 8rpx;
    font-size: 28rpx;
    color: #333;
  }
}
.country-popup {
  height: 80vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1px solid #eee;

    text {
      font-size: 32rpx;
    }

    .close-btn {
      color: #666;
    }
  }

  .search-box {
    padding: 20rpx 30rpx;
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .country-list {
    flex: 1;
    height: 0; // 配合flex:1实现滚动
    overflow-y: auto;
  }
}
</style>
