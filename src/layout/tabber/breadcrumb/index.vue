<template>
  <div class="tabber_left">
    <!-- 左侧静态 -->
    <el-icon style="margin-right: 10px" @click="changeIcon">
      <component
        :is="LayoutOutSettingStore.fold ? 'Expand' : 'Fold'"
      ></component>
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <!-- 通过v-for指令遍历$route.matched数组，生成对应的面包屑项。
        每个面包屑项由一个<el-breadcrumb-item>标签表示，其中包含一个图标和标题。
          图标使用了动态组件，根据item.meta.icon的值来决定展示哪个组件。 -->
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        v-show="item.meta.title"
        :to="item.path"
      >
        <!-- 图标 -->
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <!-- 面包屑匹配路由的标题 -->
        <span style="margin: 0 5px">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '../../../store/modules/setting'
import { useRoute } from 'vue-router'
let LayoutOutSettingStore = useLayOutSettingStore()
let $route = useRoute()
//用于控制菜单的折叠
// 点击图标的方法
const changeIcon = () => {
  console.log(1)
  LayoutOutSettingStore.fold = !LayoutOutSettingStore.fold
}
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style scoped></style>
