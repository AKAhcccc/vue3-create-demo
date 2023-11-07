<template>
  <div class="box">
    <!-- 头部功能区域 -->
    <el-card>
      <el-form :model="formParam">
        <el-row>
          <el-col :span="10">
            <el-form-item label="预定时间">
              <el-col :span="7">
                <el-date-picker
                  v-model="formParam.date1"
                  type="date"
                  placeholder="开始"
                  style="width: 100%"
                />
              </el-col>
              <el-col :span="1" class="text-center">
                <span class="text-gray-500">至</span>
              </el-col>
              <el-col :span="7">
                <el-date-picker
                  v-model="formParam.date2"
                  placeholder="结束"
                  style="width: 100%"
                />
              </el-col>
              <el-button @click="OrderTimeSearch">搜索</el-button>
            </el-form-item>
          </el-col>
          <el-col style="margin-right: 2.5rem" :span="3">
            <el-form-item label="坐席类型">
              <el-select v-model="formParam.region" placeholder="全部">
                <el-option @click="Select1" label="商务座" value="商务座" />
                <el-option @click="Select1" label="一等座" value="一等座" />
                <el-option @click="Select1" label="二等座" value="二等座" />
                <el-option @click="Select1" label="下等座" value="下等座" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col style="margin-right: 1.875rem" :span="3">
            <el-form-item label="状态">
              <el-select v-model="formParam.region1" placeholder="全部">
                <el-option @click="Select2" label="已付款" value="已付款" />
                <el-option @click="Select2" label="已取票" value="已取消" />
                <el-option @click="Select2" label="已取消" value="已取消" />
                <el-option @click="Select2" label="代付款" value="代付款" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col style="margin-right: 1.25rem" :span="3">
            <el-form-item label="">
              <el-input
                v-model="formParam.input1"
                class="w-50 m-2"
                @keyup.enter="SearchEck"
                placeholder="搜索车次"
                :prefix-icon="Search"
              />
            </el-form-item>
          </el-col>
          <el-col style="margin-right: 1.25rem" :span="3">
            <el-form-item label="">
              <el-button type="success" icon="Delete">批量取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 身体数据部分 -->
    <div class="tables">
      <header
        style="
          display: flex;
          flex-flow: row wrap;
          align-content: center;
          justify-content: space-around;
          width: 100%;
          height: 3.125rem;
          font-size: 14px;
          border-radius: 0.625rem;
        "
      >
        <div>订单信息</div>
        <div>车次/类型</div>
        <div>出发/到达站</div>
        <div>出发/到达时间</div>
        <div>乘车人/出发日期</div>
        <div>票价/车厢座号/坐席类型</div>
        <div>状态</div>
        <div>操作</div>
      </header>
      <main style="width: 100%; height: 100%">
        <div
          class="list"
          style="display: flex; width: 100%; height: 7.5rem"
          v-for="(item, index) in OrderList"
          :key="index"
        >
          <div
            style="
              position: relative;
              display: flex;
              flex-flow: row wrap;
              align-content: center;
              align-items: center;
              justify-content: space-between;
              width: 11.875rem;
              height: 100%;
              border-right: 0.0625rem #ccc solid;
            "
          >
            <div>
              <input
                style="width: 0.9375rem; height: 0.9375rem"
                type="checkbox"
              />
            </div>
            <div style="line-height: 1.5625rem">
              <SvgIcon
                v-if="item.children"
                style="position: absolute; top: 10px; right: 0"
                name="DownFill"
                width="20px"
                height="20px"
              ></SvgIcon>
              <div>{{ item.info }}</div>
              <div>{{ item.name }} {{ item.phone }}</div>
              <div>
                {{
                  new Date(item.time)
                    .toISOString()
                    .slice(0, 19)
                    .replace('T', ' ')
                }}
              </div>
            </div>
          </div>
          <div style="width: 6.25rem; height: 100%">
            <div
              style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
              "
            >
              <div style="font-size: 1.125rem; color: #00abbe">
                {{ item.type1 }}
              </div>
              <div style="margin-top: 0.3125rem">{{ item.type2 }}</div>
            </div>
          </div>
          <div style="width: 14.375rem; height: 100%">
            <div
              style="
                display: flex;
                flex-flow: column wrap;
                align-content: center;
                justify-content: center;
                width: 100%;
                height: 100%;
              "
            >
              <div style="display: flex">
                <SvgIcon
                  name="shi"
                  width="0.9375rem"
                  height="0.9375rem"
                ></SvgIcon>
                <span>{{ item.address1 }}</span>
              </div>
              <div style="display: flex; margin-top: 0.625rem">
                <SvgIcon
                  name="guo"
                  width="0.9375rem"
                  height="0.9375rem"
                ></SvgIcon>
                <span>{{ item.address2 }}</span>
              </div>
            </div>
          </div>
          <div style="width: 10rem; height: 100%">
            <div
              style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                font-size: 1.125rem;
                line-height: 1.5625rem;
                border-right: 0.0625rem #ccc solid;
              "
            >
              <div>{{ item.time2 }}</div>
              <div style="color: #ccc">{{ item.time3 }}</div>
            </div>
          </div>
          <div style="width: 15rem; height: 100%; font-size: 1.25rem">
            <div
              style="
                display: flex;
                flex-flow: column wrap;
                align-content: center;
                justify-content: center;
                width: 100%;
                height: 100%;
              "
            >
              <div>{{ item.name1 }}</div>
              <div style="margin-top: 0.625rem; font-weight: 700">
                {{ item.time3 }}
              </div>
            </div>
          </div>
          <div
            style="
              width: 13.75rem;
              height: 100%;
              border-right: 0.0625rem #ccc solid;
            "
          >
            <div
              style="
                display: flex;
                flex-flow: column wrap;
                align-content: center;
                align-items: flex-start;
                justify-content: center;
                width: 100%;
                height: 100%;
                line-height: 1.5625rem;
              "
            >
              <div style="color: coral">￥{{ item.num }}</div>
              <div style="font-weight: 700">{{ item.attend }}</div>
              <div>{{ item.grade }}</div>
            </div>
          </div>
          <div style="width: 10rem; height: 100%">
            <div
              class="ys"
              style="
                display: flex;
                flex-wrap: wrap;
                align-content: center;
                justify-content: center;
                width: 100%;
                height: 100%;
              "
            >
              <div style="font-size: 1.25rem" :style="activation(item)">
                {{ item.state }}
              </div>
            </div>
          </div>
          <div style="width: 7.5rem; height: 100%">
            <div
              style="
                display: flex;
                flex-flow: row wrap;
                align-content: center;
                align-items: center;
                justify-content: space-around;
                width: 100%;
                height: 100%;
              "
            >
              <SvgIcon name="cha" width="1.875rem" height="1.875rem"></SvgIcon>
              <SvgIcon
                class="yy"
                :class="{ fold: item.state === '已取消' }"
                name="order"
                width="1.875rem"
                height="1.875rem"
              ></SvgIcon>
            </div>
          </div>
        </div>
      </main>
      <el-card>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5]"
          :background="true"
          layout="total, sizes,->,prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import {
  getOrderItem,
  OrderListSelect1,
  OrderListSelect2,
  getOrderTimeSearch,
} from '@/api/ticket/Order/index'
import { ElMessage } from 'element-plus'
let formParam = reactive({
  date1: '',
  date2: '',
  region: '',
  region1: '',
  input1: '',
})
// 起始页码
let pageNo = ref<number>(1)
// 一页几条
let pageSize = ref<number>(5)
// 总页码条数
let total = ref<number>(0)
// 收集列表数据
let OrderList = ref<any[]>([])

// 页面初始化加载
onMounted(() => {
  getOrderList()
})

const getOrderList = async () => {
  let obj = {
    pageNo: pageNo.value,
    pageSize: pageSize.value,
    keyword: formParam.input1,
  }
  await getOrderItem(obj).then((result) => {
    console.log(result, 'result')
    if (result.code === 200) {
      OrderList.value = result.data
      total.value = result.total
    }
  })
}
// 动态添加字体颜色
const activation = (item: any) => {
  if (item.state === '已付款') {
    return { color: '#50CF95' }
  } else if (item.state === '已取票') {
    return { color: '#000000' }
  } else if (item.state === '已取消') {
    return { color: '#CCCCCC' }
  } else if (item.state === '代付款') {
    return { color: 'red' }
  }
}

// 下拉菜单事件
const handleSizeChange = () => {
  getOrderList()
}

// 页码点击事件
const handleCurrentChange = () => {
  getOrderList()
}

// 搜索事件
const SearchEck = () => {
  getOrderList()
}

// 下拉事件一
const Select1 = async () => {
  await OrderListSelect1(formParam.region).then((result) => {
    console.log(result, 'result')
    if (result.code === 200) {
      OrderList.value = result.data
      total.value = result.data.length
      ElMessage({ type: 'success', message: '筛选成功了' })
    } else {
      ElMessage({ type: 'error', message: '筛选失败了' })
    }
  })
}
// 下拉事件二
const Select2 = async () => {
  await OrderListSelect2(formParam.region1).then((result) => {
    if (result.code === 200) {
      OrderList.value = result.data
      total.value = result.data.length
      ElMessage({ type: 'success', message: '筛选成功了' })
    } else {
      ElMessage({ type: 'error', message: '筛选失败了' })
    }
  })
}

// 根据时间筛选
const OrderTimeSearch = async () => {
  await getOrderTimeSearch(
    Date.parse(formParam.date1),
    Date.parse(formParam.date2),
  ).then((result) => {
    console.log(result, 'result')
    if (result.code === 200) {
      OrderList.value = result.data
      total.value = result.data.length
      ElMessage({ type: 'success', message: '日期筛选成功' })
    } else {
      ElMessage({ type: 'error', message: '日期筛选失败' })
    }
  })
}
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;

  main {
    .list {
      .yy {
        &.fold {
          display: none;
        }
      }
    }
  }
}
</style>
