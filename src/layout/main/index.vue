<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'
let LayOutSettingStore = useLayOutSettingStore()
// 是否销毁当前组件并且重建
let flag = ref(true)
// 监听仓库内部数据是否发生变化，如果发生变化，说明用户点击过刷新按钮
watch(
  () => LayOutSettingStore.refsh,
  () => {
    // 点击刷新按钮，路由组件需要销毁
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
