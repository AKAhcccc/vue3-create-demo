<template>
    <el-card>
        <el-form :model="formParams">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="创建时间">
                        <el-col :span="5">
                            <el-date-picker v-model="formParams.date1" type="date" placeholder="开始" style="width: 100%" />
                        </el-col>
                        <el-col :span="0.1" class="text-center">
                            <span class="text-gray-500">至</span>
                        </el-col>
                        <el-col :span="5">
                            <el-date-picker v-model="formParams.date2" type="date" placeholder="结束" style="width: 100%" />
                        </el-col>
                        <el-col :span="5">
                            <el-button type="primary" size="default" @click="handleTime">搜索</el-button>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label="车次类型">
                        <el-select v-model="formParams.region" style="width: 100px;" placeholder="全部">
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
                    <el-input v-model="formParams.input" class="w-50 m-2" placeholder="Type something"
                        :prefix-icon="Search" />
                </el-col>
                <el-col :span="5">
                    <el-button type="primary" size="default" icon="Plus">新增车次</el-button>
                </el-col>
            </el-row>
        </el-form>
    </el-card>
    <!-- 身体表格部分 -->
    <el-card>
        <el-table :data="TicketList" stripe style="width: 100%" border>
            <el-table-column prop="id" show-overflow-tooltip align="center" label="ID" />
            <el-table-column prop="trips" show-overflow-tooltip align="center" label="车次" />
            <el-table-column prop="type" show-overflow-tooltip align="center" label="类型" />
            <el-table-column prop="conductor" show-overflow-tooltip align="center" label="车长" />
            <el-table-column prop="num" show-overflow-tooltip align="center" label="总座位数" />
            <el-table-column prop="carriage" show-overflow-tooltip align="center" label="车厢数量" />
            <el-table-column prop="max" show-overflow-tooltip align="center" label="限乘人数" />
            <el-table-column prop="time" show-overflow-tooltip align="center" label="创建时间" />
            <el-table-column prop="switch" show-overflow-tooltip align="center" label="状态">
                <template #="{ row }">
                    <el-switch v-model="row.switch" />
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="center" width="220" label="操作">
                <template #="{ }">
                    <el-button type="primary" size="small" icon="Edit">编辑</el-button>
                    <el-button type="primary" size="small" icon="Delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 7, 3]"
            :background="true" layout="total, sizes ,->, prev, pager, next, jumper" :total="total"
            @size-change="handleSizeChange" @current-change="getTicket" />
    </el-card>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { onMounted, ref, reactive } from 'vue'
// 获取接口
import { reqTicket, filterTime,SelectTicket } from '@/api/ticket/index'
// 引入数据类型
import { TicketResponse } from '@/api/ticket/type'
// 存储菜单数据
let TicketList = ref<TicketResponse>([])

// 起始页码
let pageNo = ref<number>(1)
// 一页几条数据
let pageSize = ref<number>(10)
// 总共多少条数据
let total = ref<number>(0)

let formParams = reactive({
    date1: '',
    date2: '',
    region: '',
    input: '',
    type: false
})

onMounted(() => {
    getTicket()
})
// 点击页码回调
const getTicket = async (pager = 1) => {
    pageNo.value = pager
    let result: any = await reqTicket(pageNo.value, pageSize.value);
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
const CheckOK = () => {
    formParams.type = !formParams.type
}
// 获取日期区间值
const handleTime = async () => {
    let result = await filterTime(formParams.date1, formParams.date2);
    console.log(result);
}

// 筛选下拉菜单
const SelectTi = async (pager = 1) => {
    pageNo.value = pager;
    await SelectTicket(formParams.region)
    getTicket()
}

</script>

<style scoped lang="scss"></style>