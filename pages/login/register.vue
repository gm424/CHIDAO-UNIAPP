<template>
  <view class="container">
    <!-- 顶部背景 -->
    <view class="header">
      <image
        class="logo"
        src="http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/logo2_1721897398716.png"
        mode="aspectFit"
      />

      <text class="title">赤道金融服务平台</text>
      <text class="subtitle">专业物流服务提供商</text>
    </view>

    <!-- 手机号登录 -->
    <view class="form-section">
      <view class="form-item">
        <view class="phone-prefix" @tap="showAreaPicker = true">
          <text>+{{ selectedArea.code }}</text>
          <text class="iconfont icon-arrow-down"></text>
        </view>
        <input
          v-model="formData.phone"
          type="number"
          placeholder="请输入手机号"
          class="input phone-input"
          maxlength="11"
        />
      </view>

      <view class="form-item">
        <text class="iconfont icon-safe"></text>
        <input v-model="formData.verifyCode" placeholder="请输入验证码" class="input" />
        <view class="sms-btn" :class="{ disabled: counting }" @tap="getVerifyCode">
          {{ countText }}
        </view>
      </view>
      <view class="form-item">
        <text class="iconfont icon-safe"></text>
        <input v-model="formData.password" type="password" placeholder="请输入密码" class="input" />
      </view>
      <view class="form-item">
        <text class="iconfont icon-safe"></text>
        <input v-model="formData.confirmPassword" type="password" placeholder="请确定密码" class="input" />
      </view>

      <button class="submit-btn" @tap="handlePhoneLogin">注册</button>

      <view class="action-links">
        <text class="link" @tap="goToLogin">返回登录</text>
      </view>
    </view>

    <!-- 区号选择器 -->
    <u-picker
      :show="showAreaPicker"
      :columns="[areaList]"
      @confirm="onAreaConfirm"
      @cancel="showAreaPicker = false"
      title="选择国家/地区"
    ></u-picker>

    <!-- 底部协议 -->
    <view class="agreement">
      <checkbox :checked="agreed" @tap="toggleAgreement" color="#ffb200" />
      <text class="text">
        登录即代表您已同意
        <text class="link" @tap="viewAgreement('user')">《用户协议》</text>
        和
        <text class="link" @tap="viewAgreement('privacy')">《隐私政策》</text>
      </text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import LoginServer from '@/common/store/loginServer.js'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { getAction, postAction } from '../../common/store/manage'
// 表单数据
const formData = ref({
  phone: '',
  password: '',
  areaCode: '',
  verifyCode: '',
  confirmPassword: '',
  mode: 'PHONE',
})

const createFingerprint = async () => {
  const fp = await FingerprintJS.load()
  const res = await fp.get()
  formData.value.visitorId = res.visitorId
}
// 是否同意协议
const agreed = ref(false)

// 验证码URL
const captchaUrl = ref('')

// 表单验证
const isFormValid = computed(() => {
  return formData.value.username && formData.value.password && formData.value.captcha && agreed.value
})

// 刷新验证码
const refreshCaptcha = () => {
  LoginServer.getCaptchCode({
    success(res) {
      captchaUrl.value = res
    },
    fail(error) {
      console.log('error', error)
    },
  })
}
// 去登录
const goToLogin = () => {
  uni.navigateTo({
    url: '/pages/login/index',
  })
}

// 切换协议同意状态
const toggleAgreement = () => {
  agreed.value = !agreed.value
}

// 查看协议
const viewAgreement = (type) => {
  uni.navigateTo({
    url: `/pages/agreement/${type}`,
  })
}

// 区号选择
const showAreaPicker = ref(false)
const selectedArea = ref({ code: '86', name: '中国' })
const areaList = [
  { text: '中国 +86', value: { code: '86', name: '中国' } },
  { text: '香港 +852', value: { code: '852', name: '香港' } },
  { text: '澳门 +853', value: { code: '853', name: '澳门' } },
  { text: '台湾 +886', value: { code: '886', name: '台湾' } },
  // 可以继续添加其他国家/地区
]

const onAreaConfirm = (e) => {
  console.log('e', e)

  selectedArea.value = e.value[0].value
  showAreaPicker.value = false
}

// 短信验证码
const counting = ref(false)
const countDown = ref(60)
const countText = computed(() => {
  return counting.value ? `${countDown.value}s后重新获取` : '获取验证码'
})

// 表单验证
const isPhoneFormValid = computed(() => {
  return formData.value.phone && formData.value.verifyCode && agreed.value && formData.value.password
})

// 获取验证码
const getVerifyCode = async () => {
  if (counting.value) return

  counting.value = true
  countDown.value = 60

  const res = await getAction('/auth/sms', {
    phone: selectedArea.value.code + formData.value.phone,
  })

  if (res.success) {
    uni.showToast({
      title: '验证码已发送',
      icon: 'success',
    })

    const timer = setInterval(() => {
      if (countDown.value > 0) {
        countDown.value--
      } else {
        counting.value = false
        clearInterval(timer)
      }
    }, 1000)
  }
}

// 手机号登录
const handlePhoneLogin = async () => {
  uni.showLoading({ title: '注册中' })
  if (!isPhoneFormValid.value) {
    uni.showToast({
      title: '请完善注册信息',
      icon: 'none',
    })
    return
  }
  formData.value.areaCode = selectedArea.value.code
  postAction('/register/udf', formData.value).then((res) => {
    if (res.success) {
      uni.hideLoading()
      uni.reLaunch({
        url: '/pages/login/index',
      })
    } else {
      uni.hideLoading()
      uni.showToast({
        title: res.message,
        icon: 'none',
      })
    }
  })
}

onMounted(() => {
  refreshCaptcha()
})
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.container {
  min-height: 100vh;
  background: #fff;
  padding: 0 40rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100rpx;
  margin-bottom: 80rpx;

  .logo {
    width: 160rpx;
    height: 160rpx;
    margin-bottom: 30rpx;
  }

  .title {
    font-size: 40rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 10rpx;
  }

  .subtitle {
    font-size: 28rpx;
    color: #666;
  }
}

.form-section {
  margin-bottom: 60rpx;

  .form-item {
    display: flex;
    align-items: center;
    height: 100rpx;
    background: #f8f8f8;
    border-radius: 50rpx;
    padding: 0 40rpx;
    margin-bottom: 30rpx;

    .iconfont {
      font-size: 40rpx;
      color: #999;
      margin-right: 20rpx;
    }

    .input {
      flex: 1;
      height: 100%;
      font-size: 32rpx;
    }

    &.captcha-item {
      .input {
        flex: 0.6;
      }

      .captcha-img {
        width: 200rpx;
        height: 60rpx;
        margin-left: 20rpx;
      }
    }
  }

  .submit-btn {
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
    background: $theme-color;
    color: #fff;
    border-radius: 44rpx;
    font-size: 32rpx;
    margin: 60rpx 0 30rpx;

    &:disabled {
      background: #ccc;
    }
  }

  .action-links {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;

    .link {
      color: $theme-color;
    }

    .divider {
      color: #ddd;
      margin: 0 20rpx;
    }
  }
}

.agreement {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 60rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 40rpx;

  .text {
    font-size: 24rpx;
    color: #666;
    margin-left: 10rpx;
  }

  .link {
    color: $theme-color;
  }
}

.login-type {
  display: flex;
  justify-content: center;
  margin-bottom: 50rpx;
  position: relative;

  .type-item {
    position: relative;
    padding: 20rpx 40rpx;
    font-size: 32rpx;
    color: #666;

    &.active {
      color: $theme-color;
      font-weight: 500;
    }

    .active-bar {
      position: absolute;
      left: 50%;
      bottom: -4rpx;
      transform: translateX(-50%);
      width: 40rpx;
      height: 4rpx;
      background: $theme-color;
      border-radius: 2rpx;
    }
  }
}

.phone-prefix {
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  font-size: 32rpx;
  color: #333;
  border-right: 1px solid #eee;

  .icon-arrow-down {
    font-size: 24rpx;
    margin-left: 8rpx;
    color: #999;
  }
}

.phone-input {
  padding-left: 20rpx;
}

.sms-btn {
  min-width: 180rpx;
  padding: 0 20rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  border-radius: 30rpx;
  background: $theme-color;
  color: #fff;
  font-size: 26rpx;

  &.disabled {
    background: #ccc;
  }
}
</style>
