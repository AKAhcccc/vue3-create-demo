<template>
  <!-- 路由组件出口的位置 -->
  <!-- <router-view v-slot="{ Component }">：
    这是Vue Router提供的路由组件出口，用于显示匹配到的路由组件。
    通过v-slot指令，我们将Component作为插槽的值传递给父组件。 -->
  <router-view v-slot="{ Component }">
    <!-- <transition name="fade">：这是Vue提供的过渡组件，用于实现动画效果。name="fade"是过渡效果的名称。 -->
    <transition name="fade">
      <!-- Vue组件提供的component全局组件，可以直接使用 -->
      <!-- <component :is="Component" v-if="flag" />：
        Vue的动态组件，:is="Component"根据Component的值来动态渲染不同的组件。
        v-if="flag"用于判断是否显示该组件。 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick, } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'
let LayOutSettingStore = useLayOutSettingStore()
// 是否销毁当前组件并且重建
let flag = ref(true)
// 监听仓库内部数据是否发生变化，如果发生变化，说明用户点击过刷新按钮
// 可以监听一个或多个数据的变化，在数据发生变化时执行相应的逻辑操作
watch(
  () => LayOutSettingStore.refsh,
  () => {
    // 点击刷新按钮，路由组件需要销毁
    flag.value = false
    // 在单次事件循环中，Vue.js 引擎会先执行所有同步任务，然后才执行异步任务。
    // 因此，如果我们想要获取更新后的 DOM 信息，就需要把操作放到下一个事件循环中。
    // 等待 DOM 更新完成后执行回调函数，确保获取到正确的 DOM 信息。把该回调函数延迟到下一个事件循环中执行，避免阻塞当前渲染。
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
