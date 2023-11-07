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

    <!-- 主题颜色区块 -->
    <el-popover
      placement="bottom"
      title="主题设置"
      :width="300"
      trigger="hover"
    >
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker
            @change="setColor"
            v-model="color"
            show-alpha
            :predefine="predefineColors"
          />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            @change="changeDark"
            v-model="dark"
            inline-prompt
            :active-icon="Sunny"
            :inactive-icon="Moon"
          />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button size="small" icon="Setting" circle></el-button>
      </template>
    </el-popover>
    <img
      :src="UserStore.avatar"
      alt=""
      style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
    />
    <!-- 下拉菜单 -->
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
import { ref } from 'vue'
// 引入函数
import { useRouter, useRoute } from 'vue-router'
// 获取用户相关的小仓库
import useUserStore from '../../../store/modules/user'
// 获取骨架的小仓库
import useLayoutOutSettingStore from '../../../store/modules/setting'
import { Moon, Sunny } from '@element-plus/icons-vue'
let LayoutOutSettingStore = useLayoutOutSettingStore()

let UserStore = useUserStore()
const dark = ref(false)

// 获取路由器设置路由
let $router = useRouter()
// 获取路由信息
let $route = useRoute()
// 颜色组件需要的数据
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

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
const logout = async () => {
  // 第一件事:需要向服务器发出请求[退出登录接口]
  // 第二件事:仓库中关于相关的数据清空掉[token]
  // 第三件事:跳转到登录页面
  await UserStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}

// Switch开关的chang事件进行暗黑模式切换
const changeDark = () => {
  // 获取html的根节点
  let html = document.documentElement
  // 判断html标签是否有dark类名
  dark.value ? (html.className = 'dark') : (html.className = '')
}

// 主题颜色设置
const setColor = () => {
  //通过js修改根节点的样式对象的属性与属性值
  const html = document.documentElement
  html.style.setProperty(`--el-color-primary`, color.value)
}
</script>

<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped></style>
