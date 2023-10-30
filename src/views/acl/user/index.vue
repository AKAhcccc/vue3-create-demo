<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名:">
        <el-input placeholder="请你输入搜索用户名" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
          :disabled="keyword ? false : true"
          @click="Search"
        >
          搜索
        </el-button>
        <el-button type="primary" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-button type="primary" size="default" @click="addUser" v-has="`btn.User.add`">
      添加用户
    </el-button>
    <el-button
      type="primary"
      size="default"
      :disabled="selectIdArr.length ? false : true"
      @click="deleteSelectUser"
      v-has="`btn.User.remove`"
    >
      批量删除
    </el-button>
    <!-- //table展示用户信息 -->
    <el-table
      @selection-change="selectChange"
      border
      style="margin: 10px 0px"
      :data="userArr"
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column
        label="ID"
        align="center"
        prop="id"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用户名"
        align="center"
        prop="username"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用户名称"
        align="center"
        prop="name"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用户角色"
        align="center"
        prop="roleName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="UserFilled"
            @click="setRole(row)"
            v-has="`btn.Role.assgin`"
          >
            分配角色
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="EditPen"
            @click="editUser(row)"
            v-has="`btn.User.update`"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定要删除${row.username}吗？`"
            @confirm="deleteUser(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="DeleteFilled" v-has="`btn.User.remove`">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="demo-pagination-block">
      <el-pagination
        @current-change="getHasUser"
        @size-change="handler"
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 7, 9, 12]"
        :background="true"
        layout=", prev, pager, next, jumper, -> ,sizes,total "
        :total="total"
      />
    </div>
  </el-card>
  <!-- 抽屉结构:完成添加新的用户账号|更新新的数据 -->
  <el-drawer v-model="drawer">
    <!-- 头部标题 -->
    <template #header>
      <h4>{{ userParams.id ? '编辑' : '添加用户' }}</h4>
    </template>
    <!-- 抽屉的身体部分 -->
    <template #default>
      <el-form v-model="userParams" ref="formRef">
        <el-form-item label="用户姓名" prop="username">
          <el-input
            placeholder="请您输入用户姓名"
            v-model="userParams.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input
            placeholder="请您输入用户昵称"
            v-model="userParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
          <el-input
            placeholder="请您输入用户密码"
            v-model="userParams.password"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirmOk">确定</el-button>
      </div>
    </template>
  </el-drawer>
  <!-- 分配角色 -->
  <el-drawer v-model="drawer2">
    <template #header>
      <h4>分配角色(职位)</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input v-model="userParams.username" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <br />
          <!-- 显示职位的复选框 -->
          <el-checkbox-group
            v-model="userRole"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox v-for="role in allRole" :key="role" :label="role">
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer2 = false">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqUserInfo,
  reqAddOrUpdateUser,
  reqAllRole,
  reqSetUserRole,
  reqDeleteUserRole,
  reqSelectUser,
} from '@/api/aci/user/index'
import {
  UserResponseData,
  Records,
  UserResponse,
  AllRoleResponseData,
  AllRole,
  SetRoleData,
} from '@/api/aci/user/type'
import { ElMessage } from 'element-plus'
// 默认页码
let pageNo = ref<number>(1)
// 一页展示几条数据
let pageSize = ref<number>(5)
// 用户总个数
let total = ref<number>(0)
// 存储全部用户数组
let userArr = ref<Records>([])
// 定义响应式数据控制抽屉的显示与隐藏
let drawer = ref<boolean>(false)
// 定义抽屉分配角色
let drawer2 = ref<boolean>(false)
// 全部数据
let allRole = ref<AllRole>([])
// 已有数据
let userRole = ref<AllRole>([])
// 收集用户信息的响应式数据
let userParams = reactive<UserResponse>({
  username: '',
  name: '',
  password: '',
})
// 存储批量删除数据
let selectIdArr = ref<UserResponse[]>([])
// 获取form表单实力
let formRef = ref()
// 定义响应式数据，收集输入框数据
let keyword = ref<string>('')
// 引入仓库setting
import useLayOutSettingStore from '@/store/modules/setting'
let SettingStore = useLayOutSettingStore()
console.log(formRef.value, 'formRef')

// 组件挂载完毕
onMounted(() => {
  getHasUser()
})
//获取全部已有的用户信息
const getHasUser = async (pager = 1) => {
  console.log(keyword)

  pageNo.value = pager
  let result: UserResponseData = await reqUserInfo(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
  console.log(result, 'result123')

  if (result.code === 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  } else {
  }
}
// 分页器下拉菜单自定义事件回调
const handler = () => {
  getHasUser()
}
// 添加用户按钮的回调
const addUser = () => {
  drawer.value = true
  // 情况数据
  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
  // 清除上一次错误提示信息
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}
// 更改数据
// row为已有账号信息
const editUser = (row: UserResponse) => {
  console.log(row)
  drawer.value = true
  // 收集表单数据
  Object.assign(userParams, row)
}
// 确认按钮同调
const confirmOk = async () => {
  // 点击保存按钮的时候，需要保证表单全部符合条件
  formRef.value.validate()
  // 保存按钮:添加新的用户 | 更新已有数据
  let result: any = await reqAddOrUpdateUser(userParams)
  // 添加或更改成功
  if (result.code === 200) {
    // 关闭抽屉
    drawer.value = false
    // 提示信息
    ElMessage({
      type: 'success',
      message: userParams.id ? '修改成功了' : '新增成功了',
    })
    // 获取最新的数据
    getHasUser(userParams.id ? pageNo.value : 1)
    // 浏览器自动刷新一次
    window.location.reload()
  } else {
    // 关闭抽屉
    drawer.value = false
    // 提示信息
    ElMessage({
      type: 'error',
      message: userParams.id ? '修改失败了' : '新增失败了',
    })
  }
}
// 取消按钮
const cancel = () => {
  drawer.value = false
}
// 检验用户名字回调函数
// const validatorUserName = (value: any, callBack: any) => {
//   console.log(value,'value');

//   if (value.trim().length >= 5) {
//     callBack()
//   } else {
//     callBack(new Error('用户名字至少五位'))
//   }
// }

// const validatorName = (value: any, callBack: any) => {
//   if (value.trim().length >= 5) {
//     callBack()
//   } else {
//     callBack(new Error('用户昵称至少五位'))
//   }
// }

// const validatorPassword = (value: any, callBack: any) => {
//   if (value.trim().length >= 5) {
//     callBack()
//   } else {
//     callBack(new Error('用户密码至少五位'))
//   }
// }

// // 表单校验规则
// const rules = {
//   username: [{ required: true, trigger: 'blur', validator: validatorUserName }],
//   name: [{ required: true, trigger: 'blur', validator: validatorName }],
//   password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
// }
// 抽屉的显示隐藏
const setRole = async (row: UserResponse) => {
  // 存储已有用户信息
  Object.assign(userParams, row)
  // 获取全部的职位数据与当前用户已有职位的数据
  console.log(userParams.id)
  let result: AllRoleResponseData = await reqAllRole(userParams.id as number)
  if (result.code === 200) {
    // 存储全部职位
    allRole.value = result.data.allRolesList
    // 存储当前用户已有的职位
    userRole.value = result.data.assignRoles
    // 抽屉显示
    drawer2.value = true
  }
}

// 测试复选框代码
// 全选复选框收集数据:是否选中
let checkAll = ref<boolean>(false)
//设置不确定状态，仅负责样式控制
let isIndeterminate = ref<boolean>(true)
// 监听复选框状态变化
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}
// 顶部全部的复选框的change事件
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  // 代表勾选上的项目个数与全部职位个数相等，顶部全选勾选
  checkAll.value = checkedCount === allRole.value.length
  // 不确定样式
  isIndeterminate.value = !(checkedCount === allRole.value.length)
}
// 确定按钮的回调(分配职务)
const confirmClick = async () => {
  // 收集参数
  let data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map((item) => {
      return item.id as number
    }),
  }
  // 分配用户职位
  let result = await reqSetUserRole(data)
  if (result.code === 200) {
    // 提示信息
    ElMessage({ type: 'success', message: '分配职位成功' })
    drawer2.value = false
    // 获取更新完毕的信息,更换完毕留在当前页
    getHasUser(pageNo.value)
  } else {
    ElMessage({ type: 'error', message: '分配职位失败' })
  }
}
// 删除某用户
const deleteUser = async (userId: number) => {
  let result: any = await reqDeleteUserRole(userId)
  if (result.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasUser(pageNo.value)
    location.reload()
  } else {
    ElMessage({ type: 'error', message: '删除失败' })
  }
}
// 删除选中的用户
const selectChange = (value: any) => {
  selectIdArr.value = value
}
// 删除按钮回调
const deleteSelectUser = async () => {
  // 整理批量删除的参数
  let idList: any = selectIdArr.value.map((item) => {
    return item.id
  })
  let result = await reqSelectUser(idList)
  if (result.code === 200) {
    ElMessage({ type: 'success', message: '批量删除成功' })
    getHasUser()
  } else {
    ElMessage({ type: 'error', message: '批量删除失败' })
  }
}
// 搜素按钮回调
const Search = () => {
  // 根据关键字获取相应数据
  getHasUser()
  keyword.value = ''
}
// 重置按钮
const reset = () => {
  SettingStore.refsh = !SettingStore.refsh
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
</style>
