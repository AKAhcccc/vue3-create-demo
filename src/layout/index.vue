<template>
  <div class="layout_context">
    <!-- 左侧菜单 -->
    <div
      class="layout_slider"
    >
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          :collapse="LayoutOutSettingStore.fold ? true : false"
          background-color="#001529"
          text-color="white"
          active-text-color="#Ffd700"
          :default-active="$router.path"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: LayoutOutSettingStore.fold ? true : false }"
    >
      <!-- layout组件Tabber组件 -->
      <Tabber></Tabber>
    </div>
    <!-- 内容展示区 -->
    <div
      class="layout_main"
      :class="{ fold: LayoutOutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<script setup lang="ts">
import { useRoute } from 'vue-router'
// 引入左侧菜单logo子组件
import Logo from './logo/index.vue'
// 引入菜单
import Menu from './menu/index.vue'
// 引入用户相关小仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
// 引入router-viwe路由组件
import Main from './main/index.vue'
// 引入路由组件
let $router = useRoute()
// 引入tabber组件
import Tabber from './tabber/index.vue'
// 引入动画效果 并且 配置仓库
import useLayOutSettingStore from '@/store/modules/setting'
let LayoutOutSettingStore = useLayOutSettingStore()
</script>

<style scoped lang="scss">
.layout_context {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    width: calc(100% - $base-menu-width);
    height: $base-tabber-top;
    background-color: cyan;
    position: fixed;
    top: 0;
    left: $base-menu-width;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
      transition: all 0.3s;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabber-top);
    background-color: #fff;
    left: $base-menu-width;
    top: $base-tabber-top;
    padding: 20px;
    overflow: auto;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
      transition: all 0.3s;
    }
  }
}
</style>
