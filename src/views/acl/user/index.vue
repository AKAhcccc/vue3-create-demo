<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名:">
        <el-input placeholder="请你输入搜索用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default">搜索</el-button>
        <el-button type="primary" size="default">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-button type="primary" size="default" @click="addUser">
      添加用户
    </el-button>
    <el-button type="primary" size="default">批量删除</el-button>
    <!-- //table展示用户信息 -->
    <el-table border style="margin: 10px 0px" :data="userArr">
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
          <el-button type="primary" size="small" icon="UserFilled">
            分配角色
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="EditPen"
            @click="editUser(row)"
          >
            编辑
          </el-button>
          <el-button type="primary" size="small" icon="DeleteFilled">
            删除
          </el-button>
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
      <h4>title</h4>
    </template>
    <!-- 抽屉的身体部分 -->
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input
            placeholder="请您输入用户姓名"
            v-model="userParams.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input
            placeholder="请您输入用户昵称"
            v-model="userParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
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
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { reqUserInfo, reqAddOrUpdateUser } from '@/api/aci/user/index'
import { UserResponseData, Records, UserResponse } from '@/api/aci/user/type'
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
// 收集用户信息的响应式数据
let userParams = reactive<UserResponse>({
  username: '',
  name: '',
  password: '',
})
// 组件挂载完毕
onMounted(() => {
  getHasUser()
})
//获取全部已有的用户信息
const getHasUser = async (pager = 1) => {
  pageNo.value = pager
  let result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value)
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
  Object.assign(userParams, {
    username: '',
    name: '',
    password: '',
  })
}
// 更改数据
// row为已有账号信息
const editUser = (row: UserResponse) => {
  console.log(row)

  drawer.value = true
}
// 确认按钮同调
const confirmOk = async () => {
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
    getHasUser()
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
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
</style>
