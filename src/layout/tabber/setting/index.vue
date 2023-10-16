<template>
  <div class="tabber-right">
    <el-button
      size="small"
      icon="Refresh"
      @click="updateRefsh"
      circle
    ></el-button>
    <el-button
      size="small"
      icon="FullScreen"
      @click="fullScreen"
      circle
    ></el-button>
    <el-button size="small" icon="Setting" @click="" circle></el-button>
    <img
      :src="UserStore.avatar"
      alt=""
      style="width: 24px; height: 24px; border-radius: 50%; margin: 0 10px"
    />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ UserStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
// 引入函数
import { useRouter, useRoute } from 'vue-router'
// 获取用户相关的小仓库
import useUserStore from '../../../store/modules/user'
// 获取骨架的小仓库
import useLayoutOutSettingStore from '../../../store/modules/setting'
let LayoutOutSettingStore = useLayoutOutSettingStore()

let UserStore = useUserStore()
console.log(UserStore, 'UserStore')

// 获取路由器
let $router = useRouter()

let $route = useRoute()

// 刷新回调
const updateRefsh = () => {
  LayoutOutSettingStore.refsh = !LayoutOutSettingStore.refsh
}
// 全屏回调
const fullScreen = () => {
  // DOM对象的一个属性,可以用来判断当前页面是不是全屏状态【全屏：true，非全屏：null】
  let full = document.fullscreenElement
  // 切换为全屏模式
  if (!full) {
    // 利用文档根节点的方法requestFullscreen，实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏模式
    document.exitFullscreen()
  }
}
// 退出登录点击回调
const logout = () => {
  // 第一件事:需要向服务器发出请求[退出登录接口]
  // 第二件事:仓库中关于相关的数据清空掉[token]
  // 第三件事:跳转到登录页面
  UserStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped></style>
