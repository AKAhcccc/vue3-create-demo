<template>
  <div>
    <el-table :data="menuList" style="width: 100%; margin-bottom: 20px;" row-key="id" border>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="权限值" prop="code"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作">
        <template #="{ row }">
          <div>
            <el-button type="primary" @click="addMenuItem(row)" size="small" :disabled="row.level == 4 ? true : false">{{
              row.level == 3 ? '添加功能' :
              '添加菜单' }}</el-button>
            <el-button type="primary" @click="upDataMenuItem(row)" size="small"
              :disabled="row.level == 1 ? true : false">编辑</el-button>

            <el-popconfirm :title="`你确定要删除${row.name}`" @confirm="remove(row.id)">
              <template #reference>
                <el-button type="primary" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框组件:添加或者更新已有的菜单的数据结构 -->
    <el-dialog v-model="dialogVisible" :title="menuData.id ? '更新菜单' : '添加菜单'">
      <!-- 表单组件:收集新增与编辑的数据 -->
      <el-form>
        <el-form-item label="名称">
          <el-input v-model="menuData.name" placeholder="请你输入菜单的名称"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-input v-model="menuData.code" placeholder="请你输入相应的权限值"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
// 引入接口API
import { getMenuService, getHsaResponse, getRemoveMenu } from '@/api/aci/menu/index'
// 引入TS类型
import { MenuResponseList, MenuList, MenuAddOrUpDataResponse } from '@/api/aci/menu/type'
import { ElMessage } from 'element-plus';
// 控制显示框显示与隐藏
let dialogVisible = ref<boolean>(false)
// 存储菜单数据
let menuList = ref<MenuList>([])
// 携带的阐述
let menuData = reactive<MenuAddOrUpDataResponse>({
  code: '',
  level: 0,
  name: '',
  pid: 0,
})
// 组件挂载完毕加载数据
onMounted(() => {
  getHasMenuService()
})

// 获取菜单的方法
const getHasMenuService = async () => {
  let result: MenuResponseList = await getMenuService();
  if (result.code === 200) {
    menuList.value = result.data
  }
}
console.log(menuList, 'menuList');

// 添加菜单
const addMenuItem = (row: MenuAddOrUpDataResponse) => {
  // 清空数据
  Object.assign(menuData, {
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })
  // 对话框显示
  dialogVisible.value = true
  // 收集新增的菜单level数值
  menuData.level = row.level + 1
  // 给谁新增子菜单
  menuData.pid = row.id as number

}
// 编辑已有的菜单
const upDataMenuItem = (row: MenuAddOrUpDataResponse) => {
  dialogVisible.value = true
  // 更新数据
  Object.assign(menuData, row)

}

// 确认按钮的回调
const save = async () => {
  // 发起请求:新增子菜单|更新某一个已有的菜单数据
  let result: any = await getHsaResponse(menuData);
  if (result.code === 200) {
    dialogVisible.value = false
    ElMessage({ type: "success", message: menuData.id ? "更新成功" : '新增成功' })
    getHasMenuService()
  } else {
    ElMessage({ type: "error", message: menuData.id ? "更新成功" : '新增成功' })
  }
}

// 删除按钮回调 
const remove = async (id: number) => {
  let result: any = await getRemoveMenu(id);
  console.log(result);
  if (result.code === 200) {
    // 提示信息
    ElMessage({ type: "success", message: '数据删除成功' });
    // 重新渲染数据
    getHasMenuService()
    // 刷新页面
    window.location.reload();
  } else {
    ElMessage({ type: "error", message: '数据删除失败' })
  }
}

</script>

<style scoped></style>
