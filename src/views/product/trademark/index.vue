<template>
  <el-card class="box-card">
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button
      type="primary"
      size="default"
      icon="Plus"
      @click="AddTrademark"
      v-has="`btn.Trademark.add`"
    >
      添加品牌
    </el-button>
    <!-- 表格组件 -->
    <el-table border style="margin: 15px 0" :data="trademarkArr">
      <el-table-column
        type="index"
        prop="date"
        label="序号"
        width="80px"
        align="center"
      />
      <el-table-column label="品牌名称" width="180px" align="center">
        <template #="{ row }">
          <pre style="color: rgb(113 27 27)">{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="品牌logo" align="center">
        <template #="{ row }">
          <img
            :src="row.logoUrl ? row.logoUrl : error404"
            style="width: 100px; height: 100px"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template #="{ row }">
          <el-button
            @click="updateTrademark(row)"
            type="primary"
            size="small"
            icon="Edit"
            v-has="`btn.Trademark.update`"
          ></el-button>
          <el-popconfirm
            :title="`您确定要删除${row.tmName}?`"
            style="width: 250px"
            icon="Delete"
            @confirm="deleteTrademark(row.id)"
          >
            <template #reference>
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                v-has="`btn.Trademark.remove`"
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件 -->
    <div class="demo-pagination-block">
      <el-pagination
        @size-change="sizeChange"
        @current-change="changePageNo"
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 10, 15]"
        :background="true"
        layout="prev, pager, next, jumper,->,total, sizes,"
        :total="total"
      />
    </div>
  </el-card>
  <!-- 对话框组件 在添加品牌与修改品牌 业务时使用 -->
  <!-- v-model: 属性用于控制对话框显示隐藏 -->
  <!-- title：标题 -->
  <el-dialog
    v-model="dialogFormVisible"
    :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
  >
    <!-- 表单项 -->
    <el-form
      style="width: 80%"
      :model="trademarkParams"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="品牌名称" label-width="80px" prop="tmName">
        <el-input
          placeholder="请输入品牌名称"
          v-model="trademarkParams.tmName"
        ></el-input>
      </el-form-item>
      <el-form-item label="LOGO图片" label-width="80px" prop="logoUrl">
        <!-- action图片上传路径书写/api，代理服务器不发送这次post -->
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
          />
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
import { nextTick, onMounted, reactive, ref } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark/index.ts'
import {
  Records,
  TradeMarkRecordsData,
  TradeMark,
} from '@/api/product/trademark/type'
import { ElMessage, UploadProps } from 'element-plus'
// 裂图
let error404 =
  'https://cn.bing.com/images/search?view=detailV2&ccid=%2f72%2bF33v&id=E1F5D15F5DF9B0762EA01EBA626D366C6DBBEA07&thid=OIP._72-F33vIgtzDjIofUxFqgHaHa&mediaurl=https%3a%2f%2fbpic.588ku.com%2felement_pic%2f20%2f07%2f01%2f990bd59b97c18ef5b6561197c97f9f89.jpg&exph=521&expw=520&q=%e5%9b%be%e7%89%87%e4%b8%a2%e5%a4%b1%e5%9b%be%e7%89%87&simid=608000909625750066&FORM=IRPRST&ck=B8D9FC3456DB7ACCDE7BD45B88F9B4A8&selectedIndex=0'
// 当前页码
let pageNo = ref<number>(1)
// 定义每一页展示多少条
let limit = ref<number>(3)
// 存储已有品牌数据的总数
let total = ref<number>(0)
// 获取EL-form组件实例
let formRef = ref()
// 控制对话框的显示与隐藏
let dialogFormVisible = ref<boolean>(false)
// 存储已有品牌的数据
let trademarkArr = ref<Records>([])
// 定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
// 获取已有品牌的接口封装为一个函数：在任何情况下获取数据，调用函数即可
const getHasTrademark = async (pager = 1) => {
  // pageNo.value = pager
  console.log(pager)
  let result: TradeMarkRecordsData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  console.log(result)
  if (result.code === 200) {
    // 存储已有品牌的总数量
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
// 组件挂载完毕的钩子 -- 发一次请求，获取第一页，一页三个已有品牌的数据
onMounted(() => {
  getHasTrademark()
})
// 分页器当前页码发生变化的时候会触发
const changePageNo = () => {
  console.log(123)
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
  // 清空组件内的数据
  ;(trademarkParams.id = 0),
    (trademarkParams.tmName = ''),
    (trademarkParams.logoUrl = ''),
    // 第一种方法:清除表单校验数据
    // formRef.value?.clearValidate('tmName')
    // formRef.value?.clearValidate('logoUrl')
    nextTick(() => {
      formRef.value.clearValidate('tmName')
      formRef.value.clearValidate('logoUrl')
    })
}
// 修改按钮回调
const updateTrademark = (row: TradeMark) => {
  // 对话框显示
  dialogFormVisible.value = true
  // ES6语法合并
  Object.assign(trademarkParams, row)
}
// 对话框底部取消按钮
const cancel = () => {
  dialogFormVisible.value = false
}
// 确认按钮方法
const formOk = async () => {
  // 在你发起请求之前，对表单内容进行校验
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  console.log(result)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    dialogFormVisible.value = false
    // 再次发起请求，获取数据
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
    dialogFormVisible.value = false
  }
}
// 品牌校验自定义方法
const validatorTmName = (value: any, callBack: any) => {
  // 自定义文本校验
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error(`品牌名称数大于等于两位`))
  }
}
// 品牌logo图片的自定义校验
const validatorLogoUrl = (value: any, callBack: any) => {
  // 如果图片上传
  if (value) {
    callBack()
  } else {
    callBack(new Error('Logo图片务必上传'))
  }
}

// 图片上传之前触发的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  // 限制文件上传类型 与 大小
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传大小需要小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必是 png | jpeg | gif',
    })
    return false
  }
}

// 图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response: any) => {
  trademarkParams.logoUrl = response.data
  // 图片上传成功清除对应的校验数据
  formRef.value.clearValidate('logoUrl')
}

// 定义表单属性校验值
const rules = {
  tmName: [
    // required次字段必须校验,前缀出现五角星
    // trigger触发校验规则时机

    { required: true, trigger: 'blur', validator: validatorTmName },
  ],
  logoUrl: [{ required: true, trigger: 'change', validator: validatorLogoUrl }],
}

// 气泡删除方法
const deleteTrademark = async (id: number) => {
  console.log(id, 'id')
  let result = await reqDeleteTrademark(id)
  if (result.code === 200) {
    // 删除成功提示信息
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    // 删除失败
    ElMessage({
      type: 'error',
      message: '删除品牌成功',
    })
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  display: block;
  width: 178px;
  height: 178px;
}
</style>

<style>
.avatar-uploader .el-upload {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  width: 178px;
  height: 178px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>
