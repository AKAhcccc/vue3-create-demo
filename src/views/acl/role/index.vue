<template>
  <div>
    <!-- 头部添加部分 -->
    <el-cart>
      <el-form :inline="true" :model="format" class="form">
        <el-form-item label="职位搜索">
          <el-input
            placeholder="请你输入搜索的关键字"
            v-model="keyword"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" size="default" @click="Search">
            搜索
          </el-button>
          <el-button type="primary" size="default" @click="refsh">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-cart>
    <!-- 身体table展示数据部分 -->
    <el-cart>
      <el-button type="primary" size="default" icon="Plus" @click="addRole" v-has="`btn.Role.add`">
        添加职位
      </el-button>
      <el-table border style="margin: 10px 0" :data="allRole">
        <el-table-column
          label="#"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="ID" align="center" prop="id"></el-table-column>
        <el-table-column
          label="职位名称"
          align="center"
          show-overflow-tooltip
          prop="roleName"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          show-overflow-tooltip
          prop="createTime"
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          show-overflow-tooltip
          prop="updateTime"
        ></el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <!-- row代表当前职位对象 -->
          <template #="{ row }">
            <div>
              <el-button
                type="primary"
                size="small"
                icon="UserFilled"
                @click="setPermission(row)"
                v-has="`btn.Role.assgin`"
              >
                分配权限
              </el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="EditRole(row)"
                v-has="`btn.Role.update`"
              >
                编辑
              </el-button>
              <el-popconfirm
                :title="`你确定要删除${row.roleName}吗？`"
                @confirm="DeleteRole(row.id)"
              >
                <template #reference>
                  <el-button type="primary" size="small" icon="Delete" v-has="`btn.Role.remove`">
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 10]"
        :background="true"
        layout="prev, pager, next, jumper, -> ,sizes, total "
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getRoleList"
      />
    </el-cart>
    <!-- 添加职位部分，对话框 -->
    <el-dialog
      :title="RoleParams.id ? '更新职位' : '新增职位'"
      v-model="dialogVisited"
      ref="form"
    >
      <el-form v-model="RoleParams">
        <el-form-item>
          <el-input
            placeholder="请你输入职位名称"
            v-model="RoleParams.roleName"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="primary"
            size="default"
            @click="dialogVisited = false"
          >
            取消
          </el-button>
          <el-button type="primary" size="default" @click="save">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 树形控件:分配用户的菜单权限与按钮的权限 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配菜单权限</h4>
      </template>
      <template #default>
        <el-tree
          ref="tree"
          :data="menuArr"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="SelectArr"
          :props="defaultProps"
        />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import {
  reqRoleAllList,
  reqRoleAdd,
  reqAllTreeRoles,
  reqSetPermission,
  reqReoveRole,
} from '@/api/aci/role/index'
import type {
  RoleResponseData,
  Records,
  RoleData,
  MenuResponseData,
  TreeList,
} from '@/api/aci/role/type'
// 当前页码
let pageNo = ref<number>(1)
// 一页几条数据
let pageSize = ref<number>(10)
// 定义响应式搜索数据
let keyword = ref<string>('')
// 存储已有的全部职位
let allRole = ref<Records>([])
// 职位总个数
let total = ref<number>(0)
// 重置数据仓库
import useLayOutSettingStore from '@/store/modules/setting'
import { ElMessage } from 'element-plus'
let SettingStore = useLayOutSettingStore()
// 控制对话框显示隐藏
let dialogVisited = ref<boolean>(false)
// 获取表单数据
let form = ref<any>()
// 收集新增数据
let RoleParams = reactive<RoleData>({
  roleName: '',
})
let format = ''
// 抽屉组件显示隐藏
let drawer = ref<boolean>(false)
// 定义数组存储用户权限的数据
let menuArr = ref<TreeList>([])
// 定义响应式树形控件
let tree = ref<any>()
// 树形控件的测试数据
const defaultProps = {
  children: 'children',
  label: 'name',
}
// 数组用来存储勾选节点的ID（过滤四级节点）
let SelectArr = ref<number[]>([])
// 组件挂载完毕
onMounted(() => {
  getRoleList()
})
// 获取全部角色权限信息 | 分页器当前页码的回调
const getRoleList = async (pager = 1) => {
  pageNo.value = pager
  let result: RoleResponseData = await reqRoleAllList(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )

  if (result.code === 200) {
    total.value = result.data.total
    allRole.value = result.data.records
  } else {
  }
}
// 下拉菜单的回调
const handleSizeChange = () => {
  getRoleList()
}
// 搜索框事件
const Search = () => {
  // 再次发起请求，搜索对应数据
  getRoleList()
  keyword.value = ''
}
// 重置事件
const refsh = () => {
  SettingStore.refsh = !SettingStore.refsh
}

// <!-- 添加职位按钮的回调 -->
const addRole = () => {
  // 显示对话框
  dialogVisited.value = true
  // 清空数据
  Object.assign(RoleParams, {
    roleName: '',
    id: 0,
  })
}

// 更新已有数据
const EditRole = (row: RoleData) => {
  dialogVisited.value = true

  Object.assign(RoleParams, row)
}
// 确定按钮
const save = async () => {
  let result: RoleResponseData = await reqRoleAdd(RoleParams)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: RoleParams.id ? '更新数据成功' : '新增数据成功',
    })
    dialogVisited.value = false
    // 更新完毕，再次获取数据
    getRoleList(RoleParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'success',
      message: RoleParams.id ? '更新数据失败' : '新增数据失败',
    })
  }
}

// 分配用户权限
// 已有的职位数据
const setPermission = async (row: RoleData) => {
  // 抽屉显示出来
  drawer.value = true
  // 收集当前分类的职位的数据
  Object.assign(RoleParams, row)
  // 根据职位获取权限的数据
  let result: MenuResponseData = await reqAllTreeRoles(RoleParams.id as number)

  if (result.code === 200) {
    menuArr.value = result.data
    SelectArr.value = filterSelectArr(menuArr.value, [])
  }
}
// 递归筛选
const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}

// 抽屉取消按钮
const cancelClick = () => {
  drawer.value = false
}

// 抽屉确定按钮
const confirmClick = async () => {
  //职位的ID
  const roleId = RoleParams.id as number
  // 选中节点的ID
  let arr = tree.value.getCheckedKeys()
  // 半选中的ID
  let arr1 = tree.value.getHalfCheckedKeys()
  let permissionId = arr.concat(arr1)
  // 下发相应的权限
  let result: any = await reqSetPermission(roleId, permissionId)
  if (result.code === 200) {
    drawer.value = false
    ElMessage({ type: 'success', message: '更改权限成功' })
    window.location.reload()
  } else {
    ElMessage({ type: 'error', message: '更改权限失败' })
  }
}

// 删除角色按钮
const DeleteRole = async (id: number) => {
  let result: any = await reqReoveRole(id)
  if (result.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getRoleList(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({ type: 'error', message: '删除失败' })
  }
}
// 自定义校验规则回调
// const validatorRoleName = (value:any,callback:any) => {
//   if(value.length >= 2){
//     callback()
//   }else {
//     callback(new Error('职位名称至少两位'))
//   }
// }

// 职位校验规则
// const rules = {
//   roleName:[
//     {
//       required:true,
//       trigger:'blur',
//       validator:validatorRoleName,
//     }
//   ]
// }
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
</style>
