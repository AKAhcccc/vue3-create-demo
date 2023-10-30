<template>
  <el-card>
    <!-- 页面头部功能部分 -->
    <el-row>
      <el-form>
        <el-row>
          <el-form-item :model="formParams" label="车站首字母:">
            <el-col :span="12">
              <el-select v-model="formParams.region" placeholder="全部">
                <el-option @click="handleSelect" label="A" value="A" />
                <el-option @click="handleSelect" label="B" value="B" />
                <el-option @click="handleSelect" label="C" value="C" />
                <el-option @click="handleSelect" label="D" value="D" />
                <el-option @click="handleSelect" label="E" value="E" />
                <el-option @click="handleSelect" label="F" value="F" />
                <el-option @click="handleSelect" label="G" value="G" />
                <el-option @click="handleSelect" label="H" value="H" />
                <el-option @click="handleSelect" label="I" value="I" />
                <el-option @click="handleSelect" label="J" value="J" />
                <el-option @click="handleSelect" label="K" value="K" />
                <el-option @click="handleSelect" label="L" value="L" />
                <el-option @click="handleSelect" label="M" value="M" />
                <el-option @click="handleSelect" label="N" value="N" />
                <el-option @click="handleSelect" label="O" value="O" />
                <el-option @click="handleSelect" label="P" value="P" />
                <el-option @click="handleSelect" label="Q" value="Q" />
                <el-option @click="handleSelect" label="R" value="R" />
                <el-option @click="handleSelect" label="S" value="S" />
                <el-option @click="handleSelect" label="T" value="T" />
                <el-option @click="handleSelect" label="U" value="U" />
                <el-option @click="handleSelect" label="V" value="V" />
                <el-option @click="handleSelect" label="W" value="W" />
                <el-option @click="handleSelect" label="X" value="X" />
                <el-option @click="handleSelect" label="Y" value="Y" />
                <el-option @click="handleSelect" label="Z" value="Z" />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="">
            <el-col :span="8">
              <el-checkbox @click="CheckOk" label="启用" name="type" />
            </el-col>
          </el-form-item>
          <el-form-item label="">
            <el-col :span="18">
              <el-input v-model="formParams.input" class="w-50 m-2" @keyup.enter="Searchs" placeholder="按下回车搜索 根据城市名搜索"
                :prefix-icon="Search" />
            </el-col>
          </el-form-item>
          <el-col :span="2">
            <el-button type="primary" icon="Plus" @click="addStop">
              新增车站
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </el-card>
  <!-- 页面主体部分 -->
  <el-card>
    <el-table :data="StopList" stripe height="526" style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="city" label="City" />
      <el-table-column prop="state" label="State">
        <template #="{ }">
          <el-switch v-model="state" />
        </template>
      </el-table-column>
      <el-table-column label="Address">
        <template #="{ row }">
          <el-button type="primary" size="small" icon="Edit" @click="EditStop(row)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="DelectList(row.id)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination v-show="flag" v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 7, 10, 12]"
      :background="true" layout="total, sizes ,->, prev, pager, next, jumper" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </el-card>
  <!-- 对话框 -->
  <el-dialog v-model="dialogVisible" :title="formParams.id ? '编辑车站' : '新增车站'" height="40%" width="30%">
    <el-form :model="StopParams">
      <el-form-item label="车站">
        <el-input v-model="StopParams.addData" placeholder="请输入车站名称"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="Submit">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { getStopList, getSelect, addStopList, EditStopList,DelectStopList } from '@/api/ticket/Stop/index'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
// 收集表单数据
let formParams = reactive({
  id: 0,
  region: '',
  input: '',
})
// 获取新增数据
let StopParams = reactive({
  addData: ''
})

// 起始页码
let pageNo = ref<number>(1)
// 一页几条数据
let pageSize = ref<number>(12)
// 总共多少条数据
let total = ref<number>(0)
// 对话框显示
let dialogVisible = ref<boolean>(false)

let flag = ref<boolean>(true)
// 首次加载展示数据
let state = ref<boolean>(false)

// 引入页面刷新仓库
import useLayOutSettingStore from '@/store/modules/setting'
let LayOutSetting = useLayOutSettingStore()
onMounted(() => {
  getStopItem()
})
let StopList = ref<string[]>([])

// 获取车站信息
const getStopItem = async () => {
  let obj = {
    pageNo: pageNo.value,
    pageSize: pageSize.value,
    keyword: 0
  }
  await getStopList(obj).then((result) => {
    if (result.code === 200) {
      StopList.value = result.data.goods;
      total.value = result.data.total
    } else {
    }
  })
}

// 点击页码与新增回调
const handleSizeChange = () => {
  getStopItem()
}
// 点击下拉菜单回调
const handleCurrentChange = () => {
  getStopItem()
}

// 根据首字母筛选数据
const handleSelect = async () => {
  console.log(formParams.region, "handleSelect");
  await getSelect(formParams.region).then(result => {
    if (result.code === 200) {
      console.log(result, "result");
      StopList.value = result.data;
      total.value = result.data.length
      if (total.value < 80) {
        flag.value = false
      } else {
        flag.value = true
      }
      ElMessage({ type: "success", message: "筛选成功" })
    } else {
      ElMessage({ type: "error", message: "筛选失败" })
    }
  })
}

// 启用按钮
const CheckOk = () => {
  state.value = !state.value
}

// 新增车站
const addStop = async () => {
  Object.assign(formParams, {
    id: 0,
    region: '',
    input: '',
  })
  dialogVisible.value = true
}

// 提交按钮
const Submit = async () => {
  if (formParams.id) {
    await EditStopList(formParams, StopParams.addData).then(result => {
      if (result.code === 200) {
        ElMessage({ type: "success", message: "数据新增成功" })
        LayOutSetting.refsh = !LayOutSetting.refsh
      } else {
        ElMessage({ type: "error", message: "数据新增成功" })
      }
    })
  } else {
    await addStopList(StopParams).then(result => {
      if (result.code === 200) {
        ElMessage({ type: "success", message: "数据新增成功" })
      } else {
        ElMessage({ type: "error", message: "数据新增成功" })
      }
    })
  }
  dialogVisible.value = false
}

// 搜索功能
const Searchs = async () => {
  let obj = {
    pageNo: pageNo.value,
    pageSize: pageSize.value,
    keyword: formParams.input
  }
  await getStopList(obj).then(result => {
    if (result.code === 200) {
      StopList.value = result.data.goods;
      total.value = result.data.total
      if (total.value < 80) {
        flag.value = false
      } else {
        flag.value = true
      }
      ElMessage({ type: "success", message: "查询成功" })
    } else {
      ElMessage({ type: "error", message: "查询失败" })
    }
  })
}

// 编辑功能
const EditStop = async (row: any) => {
  dialogVisible.value = true
  Object.assign(formParams, row)
}

// 删除功能
const DelectList = async (id:number) => {
  console.log(id,"id");
  await DelectStopList(id).then(result => {
    if (result.code === 200) {
        ElMessage({ type: "success", message: "删除成功" })
        LayOutSetting.refsh = !LayOutSetting.refsh
      } else {
        ElMessage({ type: "error", message: "删除成功" })
      }
    
  })
}
</script>

<style scoped></style>
