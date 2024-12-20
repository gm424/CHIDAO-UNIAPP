<template>
  <view class="container">
    <web-view :src="url" @message="handleMessage"></web-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const url = ref('https://www.pingpongx.com/zh')

// 获取页面参数
onLoad((options) => {
  if (options.url) {
    // 解码URL
    url.value = decodeURIComponent(options.url)
  }
})

// 处理web-view消息
const handleMessage = (event) => {
  console.log('接收到消息:', event.detail)
}

// 移除可能导致错误的DOM操作
onMounted(() => {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]
  if (page && page.$scope) {
    // 这里的代码可能导致错误
  }
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
}
</style>
``
