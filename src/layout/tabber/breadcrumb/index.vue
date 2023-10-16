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
