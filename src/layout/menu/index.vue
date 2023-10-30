<template>
  <div>
    <template v-for="item in menuList" :key="item.path">
      <!-- 没有子路由 -->
      <template v-if="!item.children">
        <el-menu-item
          v-if="!item.meta.hidden"
          :index="item.path"
          @click="goRoute"
        >
          <el-icon>
            <component
              style="width: 1em; height: 1em; margin-right: 8px"
              :is="item.meta.icon"
            ></component>
          </el-icon>
          <template #title>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!-- 有子路由但是只有一个 -->
      <template v-if="item.children && item.children.length == 1">
        <el-menu-item
          v-if="!item.children[0].meta.hidden"
          :index="item.children[0].path"
          @click="goRoute"
        >
          <el-icon>
            <component
              style="width: 1em; height: 1em; margin-right: 8px"
              :is="item.children[0].meta.icon"
            ></component>
          </el-icon>
          <template #title>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!-- 有子路由且个数大于一个 -->
      <template v-if="item.children && item.children.length > 1">
        <el-sub-menu :index="item.path">
          <template #title>
            <el-icon>
              <component
                style="width: 1em; height: 1em; margin-right: 8px"
                :is="item.meta.icon"
              ></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <!-- 递归渲染路由 -->
          <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
// 获取路由器
import { useRouter } from 'vue-router'
const $router = useRouter()
// 获取父组件传递过来的全部路由
defineProps(['menuList'])

// 点击菜单的回调
const goRoute = (vc: any) => {
  console.log(vc)
  // 路由跳转
  $router.push(vc.index)
}
</script>

<!-- 递归组件必须有name名字属性值 -->
<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<style scoped></style>
