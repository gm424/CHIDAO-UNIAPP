<template>
  <u-upload
    :fileList="fileList"
    @afterRead="handleAfterRead"
    :useBeforeRead="true"
    name="1"
    :maxCount="3"
    :deletable="false"
  />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { getAction } from '@/common/store/manage'
const props = defineProps({
  value: String,
})

const emit = defineEmits(['update:value'])

const timestamp = ref('')
const ossUploadUrl = ref('')
const dataObj = ref({
  policy: '',
  signature: '',
  key: '',
  ossAccessKeyId: '',
  dir: '',
  host: '',
})

const fileList = ref([])

// 新增图片
const handleAfterRead = async (event) => {
  const res = await beforeRead(event)
  if (res) {
    const file = fileList.value[0]
    fileList.value = [{ ...event.file, status: 'success', message: '上传中' }]

    const result = await uploadFilePromise(event.file.url)
    if (result.statusCode === 200) {
      fileList.value[0] = {
        status: 'success',
        message: '',
        url: `${dataObj.value.host}/${dataObj.value.key}`,
      }
      console.log('成功！', fileList.value)
      emit('update:value', fileList.value[0].url)
    } else {
      uni.$u.toast('上传失败，图片太大')
      fileList.value[0] = file
    }
  }
}

// oss
const beforeRead = (file) => {
  return new Promise((resolve, reject) => {
    console.log('file', file)
    getAction('/sys/common/getOssSignature', { fileName: file.file.name, fileType: 'other' }).then((response) => {
      console.log('response', response)
      timestamp.value = Math.floor(100000 + Math.random() * 900000)
      dataObj.value = {
        policy: response.policy,
        signature: response.signature,
        OSSAccessKeyId: response.accessKeyId,
        key: response.key,
        dir: response.dir,
        success_action_status: response.success_action_status,
        host: response.host,
      }
      console.log('成功！', dataObj.value, response)
      ossUploadUrl.value = response.host
      resolve(true)
    })
  })
}

const uploadFilePromise = (url) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: ossUploadUrl.value,
      filePath: url,
      name: 'file',
      formData: { ...dataObj.value, success_action_status: '200' },
      success: (res) => {
        console.log('res', res)
        resolve(res)
      },
      fail: (err) => {
        console.error('上传失败', err)
        reject(err)
      },
    })
  })
}
</script>

<style scoped></style>
