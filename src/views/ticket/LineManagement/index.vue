<template>
  <div class="box">
    <!-- 头部功能区域 -->
    <el-card>
      <el-form :model="form">
        <el-row>
          <el-form-item label="创建时间">
            <el-col :span="5">
              <el-date-picker
                v-model="form.date1"
                type="date"
                placeholder="开始"
                style="width: 100%"
              />
            </el-col>
            <el-col :span="1" class="text-center">
              <span class="text-gray-500">至</span>
            </el-col>
            <el-col :span="5">
              <el-date-picker
                v-model="form.date2"
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
          <el-col style="margin-right: 250px" :span="4">
            <el-form-item label="车次类型">
              <el-select v-model="form.region" placeholder="全部">
                <el-option @click="Selected" label="高铁" value="高铁" />
                <el-option @click="Selected" label="火车" value="火车" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="">
              <el-checkbox-group v-model="state">
                <el-checkbox @click="Checked" label="启用" name="type" />
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col style="margin-right: 20px" :span="2">
            <el-input
              v-model="form.input1"
              class="w-50 m-2"
              size="large"
              @keyup.prevent="Searchs"
              placeholder="按下回车搜索 根据线车次搜索"
              :prefix-icon="Search"
            />
          </el-col>
          <el-col :span="2">
            <template #="{ row }">
              <el-button
                type="primary"
                size="large"
                icon="Plus"
                @click="addLine(row)"
              >
                新增线路
              </el-button>
            </template>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 主题数据部分 -->
    <div class="tables">
      <header style="width: 100%; height: 3.125rem; border-radius: 0.625rem">
        <div style="width: 10%; text-align: center">ID</div>
        <div style="width: 10%; text-align: center">车次/类型</div>
        <div style="width: 40%; text-align: center">线路</div>
        <div style="width: 15%; text-align: center">创建时间</div>
        <div style="width: 15%; text-align: center">状态</div>
        <div style="width: 15%; text-align: center">操作</div>
      </header>
      <main
        style="
          width: 100%;
          height: 80%;
          overflow: auto;
          margin-bottom: 1.25rem;
          border-bottom: 0.0625rem solid #ccc;
        "
      >
        <div class="LineList" v-for="(item, index) in LintList" :key="index">
          <div style="width: 10%; text-align: center">{{ item.id }}</div>
          <div
            class="res1"
            style="
              width: 10%;
              text-align: center;
              height: 100%;
              border-right: 0.0625rem solid #ccc;
            "
          >
            <div style="font-size: 1.25rem; color: #00cba8">
              {{ item.type1 }}
            </div>
            <div style="margin-top: 0.625rem">
              {{ item.type2 }}
            </div>
          </div>
          <div
            style="
              width: 40%;
              height: 100%;
              text-align: center;
              display: flex;
              border-right: 0.0625rem solid #ccc;
            "
          >
            <div class="address" style="width: 40%; height: 100%">
              <div style="text-align: center">
                <SvgIcon
                  style="display: inline-block; top: 50; margin-right: 0.375rem"
                  name="Begin"
                  color=""
                  width="0.9375rem"
                  height="0.9375rem"
                ></SvgIcon>
                {{ item.address1 }}
              </div>
              <div style="margin-top: 0.625rem">
                <SvgIcon
                  style="display: inline-block; margin-right: 0.375rem"
                  name="End"
                  color=""
                  width="0.9375rem"
                  height="0.9375rem"
                ></SvgIcon>
                {{ item.address2 }}
              </div>
            </div>
            <div
              class="address_1"
              style="width: 60%; height: 100%; line-height: 1.5625rem"
            >
              {{ item.Line }}
            </div>
          </div>
          <div style="width: 15%; text-align: center">
            {{ item.time }}
          </div>
          <div style="width: 15%; text-align: center">
            <el-switch v-model="state" />
          </div>
          <div style="width: 15%; text-align: center">
            <el-button
              text="plain"
              icon="Edit"
              @click="handleEdit(item)"
            ></el-button>
            <el-popconfirm title="确定删除吗？" @confirm="handleBtn(item.id)">
              <template #reference>
                <el-button text="plain" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </main>
      <el-pagination
        v-show="flag"
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 8, 10]"
        :background="true"
        layout="total, sizes,->,prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 新增编辑区域 -->
    <el-dialog
      v-model="dialogVisible"
      :title="formParam.id ? '更新线路' : '新增线路'"
      width="40%"
    >
      <el-form :model="formParam">
        <el-row>
          <el-col :span="12">
            <el-form-item label="车辆类型">
              <el-select v-model="formParam.type2" placeholder="全部">
                <el-option label="高铁" value="高铁" />
                <el-option label="火车" value="火车" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车次">
              <el-input v-model="formParam.type1" placeholder="请输入车次" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="车辆线路:">
            <el-input v-model="formParam.input2" type="textarea" />
          </el-form-item>
          <el-row>
            <div style="display: flex; position: relative; margin-left: 70px">
              <div
                style="
                  width: 200px;
                  height: 400px;
                  margin-right: 50px;
                  border: 1px solid #ccc;
                "
              >
                <h5
                  style="background-color: #d7dbe2; height: 30px; width: 100%"
                >
                  <el-checkbox
                    v-model="checkAll"
                    :indeterminate="isIndeterminate"
                    @change="handleCheckAllChange"
                  >
                    车站
                  </el-checkbox>
                  &emsp;&emsp; &emsp;&emsp;
                  <span>总数:{{ cities.length }}</span>
                </h5>
                <el-input
                  class="w-50 m-2"
                  size="large"
                  placeholder="搜索站名"
                  :prefix-icon="Search"
                />
                <div>
                  <el-checkbox-group
                    v-model="checkedCities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="city in cities"
                      :key="city"
                      :label="city"
                    >
                      {{ city }}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <div>
                <SvgIcon
                  style="position: absolute; top: 45%; left: 44.5%"
                  name="switch"
                  width="50px"
                  height="50px"
                ></SvgIcon>
              </div>
              <div style="width: 200px; height: 400px; border: 1px solid #ccc">
                <h5
                  style="background-color: #d7dbe2; height: 30px; width: 100%"
                >
                  <el-checkbox
                    v-model="checkAll1"
                    :indeterminate="isIndeterminate1"
                    @change="handleCheckAllChange1"
                  >
                    车站数据
                  </el-checkbox>
                  &emsp;&emsp; &emsp;&emsp;
                  <span>总数:{{ cities1.length }}</span>
                </h5>
                <el-input
                  class="w-50 m-2"
                  size="large"
                  placeholder="搜索站名"
                  :prefix-icon="Search"
                />
                <div>
                  <el-checkbox-group
                    v-model="checkedCities1"
                    @change="handleCheckedCitiesChange1"
                  >
                    <el-checkbox
                      v-for="city in cities1"
                      :key="city"
                      :label="city"
                    >
                      {{ city }}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
          </el-row>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="Submit">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
// 引入接口
import {
  getLintList,
  getSelect,
  filterTime,
  lineDatale,
  lineSearch,
  addLineList,
  upDataLineList,
} from '@/api/ticket/Line/index'
// 引入响应式API
import { ref, onMounted, reactive } from 'vue'
let state = ref<boolean>(true)
// 引入页面刷新仓库
import useLayOutSettingStore from '@/store/modules/setting'
let LayOutSettingStore = useLayOutSettingStore()

let LintList = ref<any[]>([])

// 表头数据收集
let form = reactive({
  date1: '',
  date2: '',
  region: '',
  type: false,
  input1: '',
})

// 对话框数据
let formParam = reactive({
  id: 0,
  type1: '',
  type2: '',
  line: '',
  input2:
    '①北京西 → ②石家庄 → ③郑州东 → ④武汉 → ⑤长沙南 → ⑥怀化南 → ⑦贵阳北 → ⑧昆明南',
  checked: true,
})

// 起始页码
let pageNo = ref<number>(1)
// 一页显示几条;
let pageSize = ref<number>(8)
// 共计多少条数
let total = ref<number>(0)

let event = ref<boolean>(true)

let flag = ref<boolean>(true)

let dialogVisible = ref<boolean>(false)

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref(['北京西'])
const cities = [
  '北京西',
  '北京南',
  '北京东',
  '北京北',
  '东北西',
  '东北东',
  '东北南',
  '东北北',
]
// 左侧复选框事件
const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}
// 右侧复选框事件
const checkAll1 = ref(false)
const isIndeterminate1 = ref(true)
const checkedCities1 = ref([
  '湖北',
  '河南',
  '河北',
  '湖南',
  '黑龙江',
  '辽宁',
  '吉林',
  '北京',
  '海淀',
  '上海',
  '昌平',
])
const cities1 = [
  '湖北',
  '河南',
  '河北',
  '湖南',
  '黑龙江',
  '辽宁',
  '吉林',
  '北京',
  '海淀',
  '上海',
  '昌平',
]

const handleCheckAllChange1 = (val: boolean) => {
  checkedCities1.value = val ? cities1 : []
  isIndeterminate1.value = false
}
const handleCheckedCitiesChange1 = (value: string[]) => {
  const checkedCount = value.length
  checkAll1.value = checkedCount === cities1.length
  isIndeterminate1.value = checkedCount > 0 && checkedCount < cities1.length
}

// 生命周期初始化
onMounted(() => {
  getLintItem()
})
// 获取数据渲染
const getLintItem = async () => {
  event.value = true
  let obj = {
    pageNo: pageNo.value,
    pageSize: pageSize.value,
  }
  await getLintList(obj).then((result) => {
    if (result.code === 200) {
      LintList.value = result.data
      total.value = result.total
    }
  })
}

// 页码下拉事件
const handleSizeChange = () => {
  getLintItem()
}

// 页码点击事件
const handleCurrentChange = () => {
  if (event.value) {
    getLintItem()
  }
}

// 搜索事件
const Searchs = async () => {
  event.value = false
  await lineSearch(form.input1).then((result: any) => {
    if (result.code === 200) {
      console.log(result, 'result: ')
      LintList.value = result.data
      total.value = result.data.total
      if (total.value < 50) {
        flag.value = false
      } else {
        flag.value = true
      }
      ElMessage({ type: 'error', message: '成功' })
    } else {
    }
  })
}

// 启用按钮
const Checked = () => {
  state.value = !state.value
}

// 下拉筛选
const Selected = async () => {
  await getSelect(form.region).then((result) => {
    console.log(result, 'result')
    if (result.code === 200) {
      console.log(result, 'result')
      LintList.value = result.data
      total.value = result.data.length
      if (total.value < 80) {
        flag.value = false
      } else {
        flag.value = true
      }
      ElMessage({ type: 'success', message: '筛选成功' })
    } else {
      ElMessage({ type: 'error', message: '筛选失败' })
    }
  })
}

// 获取日期区间值
const handleTime = async () => {
  let result = await filterTime(Date.parse(form.date1), Date.parse(form.date2))
  if (result.code === 200) {
    total.value = result.data.length
    if (total.value < 50) {
      flag.value = false
    } else {
      flag.value = true
    }
    LintList.value = result.data
    ElMessage({ type: 'success', message: '依据日期筛选成功' })
  } else {
    ElMessage({ type: 'error', message: '依据日期筛选失败' })
  }
}
// 新增按钮
const addLine = async (row: any) => {
  Object.assign(formParam, {
    id: 0,
    type1: '',
    type2: '',
    line: '',
    input2:
      '①北京西 → ②石家庄 → ③郑州东 → ④武汉 → ⑤长沙南 → ⑥怀化南 → ⑦贵阳北 → ⑧昆明南',
    checked: true,
  })
  console.log(row)
  dialogVisible.value = true
}

// 编辑按钮
const handleEdit = async (item: any) => {
  Object.assign(formParam, item)
  dialogVisible.value = true
}

console.log()

// 删除按钮
const handleBtn = async (id: number) => {
  console.log(id, 'id')
  await lineDatale(id).then((result) => {
    console.log(result, 'result')
    if (result.code === 200) {
      ElMessage({ type: 'success', message: '删除成功' })
      LayOutSettingStore.refsh = !LayOutSettingStore.refsh
    } else {
      ElMessage({ type: 'error', message: '删除失败' })
    }
  })
}

// 提交按钮
const Submit = async () => {
  dialogVisible.value = false
  if (formParam.id) {
    await upDataLineList(formParam).then((result) => {
      if (result.code === 200) {
        LayOutSettingStore.refsh = !LayOutSettingStore.refsh
        ElMessage({ type: 'success', message: '修改成功' })
      } else {
        ElMessage({ type: 'error', message: '修改失败' })
      }
    })
  } else {
    let obj = {
      stop: formParam.type1,
      line: formParam.type2,
      text: formParam.input2,
    }
    await addLineList(obj).then((result) => {
      if (result.code === 200) {
        ElMessage({ type: 'success', message: '新增成功' })
        LayOutSettingStore.refsh = !LayOutSettingStore.refsh
      } else {
        ElMessage({ type: 'error', message: '新增失败' })
      }
    })
  }
}
</script>

<style scoped lang="scss">
@mixin flex($direction, $content) {
  display: flex;
  flex-direction: $direction;
  justify-content: $content;
}

.pagination {
  margin: 3rem auto;
  display: flex;
  justify-content: center;
}

.box {
  width: 100%;
  height: 100%;

  .tables {
    width: 100%;
    height: 84%;

    header {
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: flex-start;
    }

    main {
      .LineList {
        width: 100%;
        height: 15%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: center;
        align-items: center;

        .res1 {
          @include flex(column, center);
        }

        .address {
          @include flex(column, center);
        }

        .address_1 {
          padding: 1.875rem;
          @include flex(column, center);
        }
      }
    }
  }
}
</style>
