<template>
  <!-- 该页面主要实现了根据传入的菜单数据动态生成导航菜单，支持多级嵌套菜单，并通过事件绑定实现了点击菜单项进行路由跳转的功能。 -->
  <div>
    <!-- 首先，通过v-for指令对menuList进行循环遍历，每个遍历项使用item作为别名。 -->
    <template v-for="item in menuList" :key="item.path">
      <!-- 使用v-if指令判断当前遍历到的菜单项是否有子路由。如果没有子路由，则生成一个单独的菜单项。 -->
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
      <!-- 对于没有子路由的菜单项，使用el-menu-item组件进行渲染。
        其中，v-if="!item.meta.hidden"用于判断菜单项是否需要隐藏。
        index属性设置菜单项的索引，用于在点击时触发相应的路由跳转。
        @click监听点击事件，并调用goRoute方法进行路由跳转。
        菜单项的图标使用component动态绑定，item.meta.icon指定了图标的组件名称，通过:is属性进行渲染。
        菜单项的标题使用插槽#title进行渲染。 -->
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
      <!-- 如果菜单项有多个子路由，则生成一个包含子菜单的菜单项。
        使用el-sub-menu组件进行渲染，通过:index属性设置菜单项的索引。
        菜单项的图标、标题的渲染方式和之前相同。在子菜单中，通过递归调用自身的<Menu :menuList="item.children"></Menu>来生成子菜单的内容。 -->
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
