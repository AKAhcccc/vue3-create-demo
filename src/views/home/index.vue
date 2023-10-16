<template>
  <div>home</div>
</template>

<script setup lang="ts">
// 引入组合式API函数 生命周期函数
import { onMounted } from 'vue'
// 获取仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()

// 目前首页挂载完毕发请求获取用户信息
onMounted(() => {
  userStore.userInfo()
})
</script>

<style scoped></style>
