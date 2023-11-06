<template>
  <div>
    <!-- svg外层容器节点，内部需要结合use标签使用 -->
    <svg :style="{ width, height }">
      <!-- xlink: href执行哪一个图标，属性值务必# icon-图标名字 -->
      <!-- : fill可以设置图标颜色 -->
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
// 接受父组件传递过来的参数
defineProps({
  // :xlink:href属性值前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  // 提供使用的名称
  name: String,
  // 接受父组件传递的颜色
  color: {
    type: String,
    default: '',
  },
  // 接受父组件传递图标的宽高
  width: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: '',
  },
})
</script>

<style scoped></style>
