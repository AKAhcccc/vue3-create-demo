<template>
  <div>
    <el-card>
      <!-- 页面头部功能部分 -->
      <el-row>
        <el-form>
          <el-row>
            <el-form-item :model="formParams" label="车站首字母:">
              <el-col :span="12">
                <el-select v-model="formParams.region" placeholder="全部">
                  <el-option label="Zone one" value="shanghai" />
                  <el-option label="Zone two" value="beijing" />
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="8"><el-checkbox label="启用" name="type" /></el-col>
            </el-form-item>
            <el-form-item label="">
              <el-col :span="18">
                <el-input :prefix-icon="Search" placeholder="搜索车站" v-model="formParams.input" />
              </el-col>
            </el-form-item>
            <el-col :span="2">
              <el-button type="primary" icon="Plus" @click="">新增车站</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <!-- 页面主体部分 -->
      <el-row>
        <el-table :data="StopList" stripe style="width: 100%">
          <el-table-column prop="id" label="ID" />
          <el-table-column prop="city" label="City" />
          <el-table-column prop="state" label="State" />
          <el-table-column label="Address">
            <template #="{ }">
              <el-button type="primary" size="small">编辑</el-button>
              <el-button type="primary" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 10]"
          :background="true" layout="total, sizes ,->, prev, pager, next, jumper" :total="total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { getStopList } from '@/api/ticket/Stop/index'
import { Search } from '@element-plus/icons-vue'

// 收集表单数据
let formParams = reactive({
  region: '',
  input: '',
})

// 起始页码
let pageNo = ref<number>(1)
// 一页几条数据
let pageSize = ref<number>(10)
// 总共多少条数据
let total = ref<number>(100)

// 首次加载展示数据
onMounted(() => {
  getStopItem()
})
let StopList = ref<string[]>([])


// 获取车站信息
const getStopItem = async () => {
  let obj = {
    pageNo: pageNo.value,
    pageSize: pageSize.value,
  }
  await getStopList(obj).then(result => {
    console.log(result, "stop");
    if (result.code === 200) {
      StopList.value = result.data.goods
    } else {

    }
  })
}

// 点击页码与新增回调
const handleSizeChange = () => {

}
// 点击下拉菜单回调
const handleCurrentChange = () => {
  
}

</script>

<style scoped></style>
