<template>
  <!-- 页面头部部分 -->
  <el-card>
    <el-form :model="formParams">
      <el-row>
        <el-col :span="10">
          <el-form-item label="创建时间">
            <el-col :span="5">
              <el-date-picker
                v-model="formParams.date1"
                type="date"
                placeholder="开始"
                style="width: 100%"
              />
            </el-col>
            <el-col :span="0.1" class="text-center">
              <span class="text-gray-500">至</span>
            </el-col>
            <el-col :span="5">
              <el-date-picker
                v-model="formParams.date2"
                type="date"
                placeholder="结束"
                style="width: 100%"
              />
            </el-col>
            <el-col :span="5">
              <el-button type="primary" size="default" @click="handleTime">
                搜索
              </el-button>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="车次类型">
            <el-select
              v-model="formParams.region"
              style="width: 100px"
              placeholder="全部"
            >
              <el-option @click="SelectTi" label="火车" value="火车" />
              <el-option @click="SelectTi" label="高铁" value="高铁" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="启用" prop="type">
            <el-checkbox-group v-model="formParams.type">
              <el-checkbox @click="CheckOK" label="" name="type" />
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-input
            v-model="formParams.input"
            class="w-50 m-2"
            @keyup.enter="submit"
            placeholder="按下回车搜索 根据车长搜索"
            :prefix-icon="Search"
          />
        </el-col>
        <el-col :span="5">
          <el-button
            @click="AddOrUpDataTicket"
            type="primary"
            size="default"
            icon="Plus"
          >
            新增车次
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <!-- 身体表格部分 -->
  <el-card style="margin-top: 20px">
    <el-table :data="TicketList" stripe style="width: 100%" height="526" border>
      <el-table-column
        fixed
        prop="id"
        show-overflow-tooltip
        align="center"
        label="ID"
      />
      <el-table-column
        prop="trips"
        show-overflow-tooltip
        align="center"
        label="车次"
      />
      <el-table-column
        prop="type"
        show-overflow-tooltip
        align="center"
        label="类型"
      />
      <el-table-column
        prop="conductor"
        show-overflow-tooltip
        align="center"
        label="车长"
      />
      <el-table-column
        prop="num"
        show-overflow-tooltip
        align="center"
        label="总座位数"
      />
      <el-table-column
        prop="carriage"
        show-overflow-tooltip
        align="center"
        label="车厢数量"
      />
      <el-table-column
        prop="max"
        show-overflow-tooltip
        align="center"
        label="限乘人数"
      />
      <el-table-column
        prop="time"
        show-overflow-tooltip
        align="center"
        label="创建时间"
      />
      <el-table-column
        prop="switch"
        show-overflow-tooltip
        align="center"
        label="状态"
      >
        <template #="{ row }">
          <el-switch v-model="row.switch" />
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        width="220"
        label="操作"
      >
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="UpDataList(row)"
          >
            编辑
          </el-button>
          <el-popconfirm title="你真的要删除啊？" @confirm="DelectList(row.id)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-show="flag"
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 7, 3]"
      :background="true"
      layout="total, sizes ,->, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getTicket"
    />
  </el-card>
  <!-- 新增与修改抽屉 -->
  <el-drawer
    style="padding: 10px; background-color: rgb(247 247 247)"
    size="80%"
    v-model="drawer"
    :direction="direction"
  >
    <template #header>
      <el-card>
        <div class="base_add">
          <h1>{{ formParams2.id ? '编辑车次' : '新增车次' }}</h1>
          <div>
            <el-button @click="Esc">返回</el-button>
            <el-button type="primary" @click="Submit()">提交</el-button>
          </div>
        </div>
      </el-card>
    </template>
    <template #default>
      <!-- 抽屉内部的头部 -->
      <el-card>
        <el-form :model="formParams2">
          <el-row>
            <el-col :span="5">
              <el-form-item label="车次类型">
                <el-select v-model="formParams2.region" placeholder="全部">
                  <el-option label="火车" value="火车" />
                  <el-option label="高铁" value="高铁" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="车次">
                <el-select
                  v-model="formParams2.region1"
                  placeholder="请输入车次"
                >
                  <el-option label="FZK90" value="FZK90" />
                  <el-option label="JPK67" value="JPK67" />
                  <el-option label="QZA66" value="QZA66" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="车长">
                <el-select
                  v-model="formParams2.region2"
                  placeholder="请输入姓名"
                >
                  <el-option label="张三" value="张三" />
                  <el-option label="李四" value="李四" />
                  <el-option label="王五" value="王五" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <h1>席位总数:{{ formParams2.nums }}</h1>
            </el-col>
            <el-col :span="3">
              <h1>车厢总数:{{ formParams2.boxNum }}</h1>
            </el-col>
            <el-col :span="3">
              <h1>限乘人数:{{ formParams2.limit }}</h1>
            </el-col>
            <el-col :span="3">
              <h1>无座位总数:{{ formParams2.seat }}</h1>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <!-- 抽屉内部的身体部分 -->
      <el-card>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="name" align="center" label="席位类别" />
          <el-table-column prop="nums" align="center" label="车箱数">
            <template #="{ row }">
              <el-button>-</el-button>
              <el-input style="width: 60px" :value="row.nums"></el-input>
              <el-button>+</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="ps" align="center" label="每车排数">
            <template #="{ row }">
              <el-button>-</el-button>
              <el-input style="width: 60px" :value="row.ps"></el-input>
              <el-button>+</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="xw" align="center" label="每车席位" />
          <el-table-column prop="xc" align="center" label="每车限乘人数">
            <template #="{ row }">
              <el-button>-</el-button>
              <el-input style="width: 60px" :value="row.xc"></el-input>
              <el-button>+</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="wz" align="center" label="每车无座人数" />
        </el-table>
      </el-card>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import tableData from '../../../../data/Data.json'
import { Search } from '@element-plus/icons-vue'
import { onMounted, ref, reactive } from 'vue'
// 获取接口
import {
  reqTicket,
  filterTime,
  SelectTicket,
  handleOK,
  SearchTicket,
  AddTicket,
  DelectTiain,
} from '@/api/ticket/Trips/index'
// 引入数据类型
import { TicketResponse } from '@/api/ticket/Trips/type'
import { ElMessage } from 'element-plus'
// 存储菜单数据
let TicketList = ref<TicketResponse>([])
// 引入仓库
// import useTicketStore  from '@/store/modules/ticket'
// let TicketStore = useTicketStore()
// 起始页码
let pageNo = ref<number>(1)
// 一页几条数据
let pageSize = ref<number>(10)
// 总共多少条数据
let total = ref<number>(0)
// 页脚是否显示
let flag = ref<boolean>(true)
// 抽屉显示与隐藏
let drawer = ref<boolean>(false)
// 抽屉打开方向
let direction = ref('btt')

// 表单数据收集
let formParams = reactive({
  id: 0,
  date1: '',
  date2: '',
  region: '',
  input: '',
  type: false,
})

// 新增与修改的数据收集
let formParams2 = reactive({
  id: 0,
  // 车次类型
  region: '',
  // 车次名称
  region1: '',
  // 车长
  region2: '',
  // 席位总数
  nums: 584,
  // 车厢总数
  boxNum: 8,
  // 限乘人数
  limit: 646,
  // 无座人数
  seat: 60,
})

// 页面初始化加载
onMounted(() => {
  getTicket()
})

const Esc = () => {
  drawer.value = false
}

// 点击页码回调
const getTicket = async (pager = 1) => {
  pageNo.value = pager
  let result: any = await reqTicket(pageNo.value, pageSize.value)
  if (result.code === 200) {
    TicketList.value = result.data.data
    pageNo.value = result.data.limit
    total.value = result.data.total
  }
}
// 点击下拉菜单回调
const handleSizeChange = () => {
  getTicket()
}

// 启用按钮回调
const CheckOK = async () => {
  formParams.type = !formParams.type
  let result: any = await handleOK(formParams.type)
  if (result.code === 200) {
    total.value = result.data.length
    if (total.value < 80) {
      flag.value = false
    } else {
      flag.value = true
    }
    TicketList.value = result.data
    ElMessage({ type: 'success', message: '状态获取成功' })
  } else {
    ElMessage({ type: 'error', message: '状态获取失败' })
  }
}
// 获取日期区间值
const handleTime = async () => {
  let result = await filterTime(formParams.date1, formParams.date2)
  if (result.code === 200) {
    total.value = result.data.length
    if (total.value < 80) {
      flag.value = false
    } else {
      flag.value = true
    }
    TicketList.value = result.data
    ElMessage({ type: 'success', message: '依据日期筛选成功' })
  } else {
    ElMessage({ type: 'error', message: '依据日期筛选失败' })
  }
}

// 筛选下拉菜单
const SelectTi = async (pager = 1) => {
  pageNo.value = pager
  let result: any = await SelectTicket(formParams.region)
  if (result.code === 200) {
    total.value = result.data.length
    if (total.value < 80) {
      flag.value = false
    } else {
      flag.value = true
    }
    TicketList.value = result.data
    ElMessage({ type: 'success', message: '根据类型筛选成功' })
    // getTicket()
  } else {
    ElMessage({ type: 'error', message: '根据类型筛选失败' })
  }
}

// 搜索事件回调
const submit = async () => {
  let result: any = await SearchTicket(formParams.input)
  console.log(result, 'result')
  if (result.code === 200) {
    total.value = result.data.length
    if (total.value < 80) {
      flag.value = false
    } else {
      flag.value = true
    }
    TicketList.value = result.data
    ElMessage({ type: 'success', message: '搜索成功' })
    // getTicket()
  } else {
    ElMessage({ type: 'success', message: '搜索失败' })
  }
}

// 新增与修改
const AddOrUpDataTicket = () => {
  Object.assign(formParams2, {
    id: 0,
    region: '',
    region1: '',
    region2: '',
    nums: 584,
    boxNum: 8,
    limit: 646,
    seat: 60,
  })
  // 清空数据
  drawer.value = true
}
// 更新数据
const UpDataList = async (row: any) => {
  drawer.value = true
  Object.assign(formParams2, row)
}

// 提交按钮
const Submit = async () => {
  if (formParams2.id) {
    let result = await AddTicket(formParams2)
    if (result.code === 200) {
      TicketList.value.find((item) => {
        if (item.id === result.data.id) {
          item.trips = result.data.trips
          item.type = result.data.type
          item.conductor = result.data.conductor
          item.num = result.data.num
          item.max = result.data.max
          item.time = result.data.time
          item.switch = result.data.switch
        }
      })
      drawer.value = false
      ElMessage({ type: 'success', message: '新增修改成功' })
    } else {
      drawer.value = false
      ElMessage({ type: 'success', message: '新增修改失败' })
    }
  } else {
    let result: any = await AddTicket(formParams2)
    console.log(result, 'result')
    if (result.code === 200) {
      total.value = result.data.length
      if (total.value > 100) {
        flag.value = false
      } else {
        flag.value = true
      }
      TicketList.value = result.data
      drawer.value = false
      ElMessage({ type: 'success', message: '新增数据成功' })
    } else {
      drawer.value = false
      ElMessage({ type: 'error', message: '新增数据失败' })
    }
  }
}

// 删除按钮
const DelectList = async (id: string) => {
  let result: any = await DelectTiain(id)
  if (result.code === 200) {
    total.value = result.data.length
    if (total.value < 1) {
      flag.value = false
    } else {
      flag.value = true
    }
    TicketList.value = result.data
    ElMessage({ type: 'success', message: '删除成功' })
    // getTicket()
  } else {
    ElMessage({ type: 'success', message: '删除失败' })
  }
}
</script>

<style scoped lang="scss">
.base_add {
  display: flex;
  flex-flow: row nowrap;
  align-content: center;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 24px;
    color: rgb(21 210 147);
  }
}
</style>
