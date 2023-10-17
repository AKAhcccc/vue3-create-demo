<template>
  <el-card class="box-card">
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" size="default" icon="Plus" @click="AddTrademark">添加品牌</el-button>
    <!-- 表格组件 -->
    <el-table border style="margin:15px 0px;" :data="trademarkArr">
      <el-table-column type="index" prop="date" label="序号" width="80px" align="center" />
      <el-table-column label="品牌名称" width="180px" align="center">
        <template #="{ row }">
          <pre style="color: rgb(113, 27, 27);">{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="品牌logo" align="center">
        <template #="{ row }">
          <img :src="row.logoUrl ? row.logoUrl : error404" style="width: 100px; height: 100px;" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template #="{ }">
          <el-button @click="updateTrademark" type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件 -->
    <div class="demo-pagination-block">
      <el-pagination @size-change="sizeChange" @current-change="changePageNo" v-model:current-page="pageNo"
        v-model:page-size="limit" :page-sizes="[3, 5, 10, 15]" :background="true"
        layout="prev, pager, next, jumper,->,total, sizes," :total="total" />
    </div>
  </el-card>
  <!-- 对话框组件 在添加品牌与修改品牌 业务时使用 -->
  <!-- v-model: 属性用于控制对话框显示隐藏 -->
  <!-- title：标题 -->
  <el-dialog v-model="dialogFormVisible" title="添加品牌">
    <!-- 表单项 -->
    <el-form style="width: 80%;">
      <el-form-item label="品牌名称" label-width="80px">
        <el-input placeholder="请输入品牌名称">

        </el-input>
      </el-form-item>
      <el-form-item label="LOGO图片" label-width="80px">
        <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <!-- 按钮具名插槽 -->
    <template #footer>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-button type="primary" size="default" @click="formOk">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark/index.ts'
import { Records, TradeMarkRecordsData } from '@/api/product/trademark/type'
// 裂图
let error404 = 'https://cn.bing.com/images/search?view=detailV2&ccid=%2f72%2bF33v&id=E1F5D15F5DF9B0762EA01EBA626D366C6DBBEA07&thid=OIP._72-F33vIgtzDjIofUxFqgHaHa&mediaurl=https%3a%2f%2fbpic.588ku.com%2felement_pic%2f20%2f07%2f01%2f990bd59b97c18ef5b6561197c97f9f89.jpg&exph=521&expw=520&q=%e5%9b%be%e7%89%87%e4%b8%a2%e5%a4%b1%e5%9b%be%e7%89%87&simid=608000909625750066&FORM=IRPRST&ck=B8D9FC3456DB7ACCDE7BD45B88F9B4A8&selectedIndex=0'
// 当前页码
let pageNo = ref<number>(1);
// 定义每一页展示多少条
let limit = ref<number>(3);
// 存储已有品牌数据的总数
let total = ref<number>(0);
// 控制对话框的显示与隐藏
let dialogFormVisible = ref<boolean>(false);
// 存储已有品牌的数据
let trademarkArr = ref<Records>([]);
// 获取已有品牌的接口封装为一个函数：在任何情况下获取数据，调用函数即可
const getHasTrademark = async () => {
  // pageNo.value = pager
  let result: TradeMarkRecordsData = await reqHasTrademark(pageNo.value, limit.value);
  console.log(result);
  if (result.code === 200) {
    // 存储已有品牌的总数量
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
  }
}
// 组件挂载完毕的钩子 -- 发一次请求，获取第一页，一页三个已有品牌的数据
onMounted(() => {
  getHasTrademark()
})
// 分页器当前页码发生变化的时候会触发
const changePageNo = () => {
  console.log(123);
  // 当前页码发生变化的时候，再次发起请求获取对应数据
  getHasTrademark()
}
// 分页器当前下拉菜单发生变化的时候会触发
const sizeChange = () => {
  pageNo.value = 1
  // 当前下拉菜单发生变化的时候，再次发起请求获取对应数据
  getHasTrademark()
}
// 添加按钮回调
const AddTrademark = () => {
  // 对话框显示
  dialogFormVisible.value = true
}
// 修改按钮回调
const updateTrademark = () => {
  // 对话框显示
  dialogFormVisible.value = true
}
// 对话框底部取消按钮
const cancel = () => {
  dialogFormVisible.value = false
}
const formOk = () => {
  dialogFormVisible.value = false
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
