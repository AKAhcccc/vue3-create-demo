<template>
  <div class="box">
    <!-- 头部功能区域 -->
    <el-card>
      <el-form :model="form">
        <el-row>
          <el-form-item label="出发日期">
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
              <el-button type="primary" size="default" @click="timeSearch">
                搜索
              </el-button>
            </el-col>
          </el-form-item>
          <el-col style="margin-right: 9.375rem" :span="3">
            <el-form-item label="车次类型">
              <el-select v-model="form.region" placeholder="全部">
                <el-option @click="Selected" label="高铁" value="高铁" />
                <el-option @click="Selected" label="动车" value="动车" />
                <el-option @click="Selected" label="快速" value="快速" />
                <el-option @click="Selected" label="特快" value="特快" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="">
              <el-checkbox-group v-model="submit">
                <el-checkbox label="已提交" name="type" />
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="">
              <el-checkbox-group v-model="state">
                <el-checkbox @click="Checked" label="启用" name="type" />
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col style="margin-right: 1.25rem" :span="2">
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
            <template #="{}">
              <el-button
                type="primary"
                size="large"
                icon="Plus"
                @click="AddTicket()"
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
      <header
        style="
          width: 100%;
          height: 50px;
          font-size: 0.875rem;
          background-color: #d7dbe2;
          border-radius: 10px;
        "
      >
        <div style="width: 12%; text-align: center">出发日期</div>
        <div style="width: 8%; text-align: center">车次/类型</div>
        <div style="width: 8%; text-align: center">出发/到达站</div>
        <div style="width: 10%; text-align: center">出发/到达时间</div>
        <div style="width: 7%; margin-left: 0.625rem; text-align: center">
          历时
        </div>
        <div style="width: 20%; margin-left: 1.1875rem; text-align: center">
          坐席
        </div>
        <div style="width: 15%; text-align: center">提交状态</div>
        <div style="width: 15%; text-align: center">状态</div>
        <div style="width: 15%; text-align: center">操作</div>
      </header>
      <main
        style="
          width: 100%;
          height: 80%;
          margin-bottom: 20px;
          overflow: auto;
          border-bottom: 1px solid #ccc;
        "
      >
        <div class="LineList" v-for="(item, index) in LintList" :key="index">
          <div
            style="
              width: 10%;
              height: 100%;
              padding-top: 2.1875rem;
              text-align: center;
              border-right: 1px solid #ccc;
            "
          >
            {{ item.time }}
          </div>
          <div class="res1" style="width: 8%; height: 100%; text-align: center">
            <div class="tt" style="font-size: 16px; color: #00cba8">
              <span :class="{ fold: item.type2 === '特快' }">
                {{ item.type1 }}
              </span>
            </div>
            <div style="margin-top: 10px">
              {{ item.type2 }}
            </div>
          </div>
          <!-- 信息提示卡牌 -->
          <el-popover placement="right-start" :width="400" trigger="hover">
            <template #reference>
              <div
                class="addressA"
                @mouseenter="handleMouseEnter(item)"
                @mouseleave="handleMouseLeave"
                style="
                  display: flex;
                  width: 16%;
                  height: 100%;
                  font-size: 1rem;
                  text-align: center;
                "
              >
                <div class="address" style="width: 100%; height: 100%">
                  <div style="text-align: center">
                    <SvgIcon
                      style="top: 50; display: inline-block"
                      name="Begin"
                      color=""
                      width="15px"
                      height="15px"
                    ></SvgIcon>
                    {{ item.address1 }}
                  </div>
                  <div style="margin-top: 10px">
                    <SvgIcon
                      style="display: inline-block; margin-right: 6px"
                      name="End"
                      color=""
                      width="15px"
                      height="15px"
                    ></SvgIcon>
                    {{ item.address2 }}
                  </div>
                </div>

                <div
                  style="
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;
                    justify-content: center;
                    margin-top: -1.4375rem;
                    line-height: 0rem;
                  "
                >
                  <div class="address_1" style="">
                    {{ item.time1 }}
                  </div>
                  <div class="address_2" style="color: #ccc">
                    {{ item.time2 }}
                  </div>
                </div>
              </div>
            </template>
            <div
              class="TabList"
              v-for="(item, index) in Dlh"
              :key="index"
              style="width: 100%; height: 100%; padding: 10px"
            >
              <h1
                :v-model="title"
                style="
                  width: 100%;
                  height: 10%;
                  margin-bottom: 10px;
                  text-align: center;
                "
              >
                <span style="font-weight: 700; color: #00acbd">
                  {{ title.type1 }}&nbsp;{{ title.type2 }}
                </span>
                &emsp;
                <span style="color: #00acbd">
                  {{ title.address1 }} → {{ title.address2 }}
                </span>
              </h1>
              <div
                class="title"
                style="
                  display: flex;
                  width: 100%;
                  height: 10%;
                  background-color: #cceef1;
                  border-radius: 6px;
                "
              >
                <div style="width: 20%; height: 100%; text-align: center">
                  站序
                </div>
                <div style="width: 20%; height: 100%; text-align: center">
                  站名
                </div>
                <div style="width: 20%; height: 100%; text-align: center">
                  到站时间
                </div>
                <div style="width: 20%; height: 100%; text-align: center">
                  触发时间
                </div>
                <div style="width: 20%; height: 100%; text-align: center">
                  停留时间
                </div>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 16%;
                  border-bottom: 1px solid #ccc;
                "
              >
                <div
                  id="001"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  01
                </div>
                <div
                  id="002"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.stop1 }}
                </div>
                <div
                  id="003"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.arrive1 }}
                </div>
                <div
                  id="004"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.go1 }}
                </div>
                <div
                  id="004"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.remain1 }}
                </div>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 16%;
                  border-bottom: 1px solid #ccc;
                "
              >
                <div
                  id="001"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  02
                </div>
                <div
                  id="002"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.stop }}
                </div>
                <div
                  id="003"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.arrive7 }}
                </div>
                <div
                  id="004"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.go }}
                </div>
                <div
                  id="004"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.remain }}
                </div>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 16%;
                  border-bottom: 1px solid #ccc;
                "
              >
                <div
                  id="001"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  03
                </div>
                <div
                  id="002"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.stop2 }}
                </div>
                <div
                  id="003"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.arrive2 }}
                </div>
                <div
                  id="004"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.go2 }}
                </div>
                <div
                  id="004"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.remain2 }}
                </div>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 16%;
                  border-bottom: 1px solid #ccc;
                "
              >
                <div
                  id="001"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  04
                </div>
                <div
                  id="002"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.stop3 }}
                </div>
                <div
                  id="003"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.arrive3 }}
                </div>
                <div
                  id="004"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.go3 }}
                </div>
                <div
                  id="004"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.remain3 }}
                </div>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 16%;
                  border-bottom: 1px solid #ccc;
                "
              >
                <div
                  id="001"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  05
                </div>
                <div
                  id="002"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.stop4 }}
                </div>
                <div
                  id="003"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.arrive4 }}
                </div>
                <div
                  id="004"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.go4 }}
                </div>
                <div
                  id="004"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.remain4 }}
                </div>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 16%;
                  border-bottom: 1px solid #ccc;
                "
              >
                <div
                  id="001"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  06
                </div>
                <div
                  id="002"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.stop5 }}
                </div>
                <div
                  id="003"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.arrive6 }}
                </div>
                <div
                  id="004"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.go5 }}
                </div>
                <div
                  id="004"
                  style="width: 20%; height: 100%; text-align: center"
                >
                  {{ item.remain5 }}
                </div>
              </div>
            </div>
          </el-popover>
          <div
            style="
              display: flex;
              flex-direction: column;
              flex-flow: column;
              align-items: flex-start;
              justify-content: center;
              width: 10%;
              height: 100%;
              padding-left: 0.9375rem;
              line-height: 1.25rem;
              border-right: 0.0625rem #ccc solid;
            "
          >
            <div>
              {{ item.time3 }}
            </div>
            <div style="margin-top: 0.4063rem">
              {{ item.arrive }}
            </div>
          </div>
          <div
            class="type1"
            style="
              width: 15%;
              height: 100%;
              font-size: 0.875rem;
              text-align: center;
              border-right: 0.0625rem solid #ccc;
            "
          >
            <div
              style="
                display: flex;
                width: 100%;
                height: 25%;
                font-size: 0.75rem;
              "
            >
              <div style="width: 50%; height: 100%">
                软卧:
                <span :class="{ fold: item.type2 === '特快' }">
                  {{ item.num }}
                </span>
              </div>
              <div style="width: 50%; height: 100%">
                商务座:
                <span :class="{ fold: item.type2 === '特快' }">
                  {{ item.num1 }}
                </span>
              </div>
            </div>
            <div
              style="
                display: flex;
                width: 100%;
                height: 25%;
                font-size: 0.75rem;
              "
            >
              <div style="width: 50%; height: 100%">
                硬卧:
                <span :class="{ fold: item.type2 === '特快' }">
                  {{ item.num2 }}
                </span>
              </div>
              <div style="width: 50%; height: 100%">
                一等座:
                <span :class="{ fold: item.type2 === '特快' }">
                  {{ item.num3 }}
                </span>
              </div>
            </div>
            <div
              style="
                display: flex;
                width: 100%;
                height: 25%;
                font-size: 0.75rem;
              "
            >
              <div style="width: 50%; height: 100%">
                硬座:
                <span :class="{ fold: item.type2 === '特快' }">
                  {{ item.num4 }}
                </span>
              </div>
              <div style="width: 50%; height: 100%">
                二等座:
                <span :class="{ fold: item.type2 === '特快' }">
                  {{ item.num5 }}
                </span>
              </div>
            </div>
            <div
              style="
                display: flex;
                width: 100%;
                height: 25%;
                font-size: 0.75rem;
              "
            >
              <div
                style="width: 50%; height: 100%"
                :class="{ fold: item.type2 === '特快' }"
              >
                无座
              </div>
              <div
                style="width: 50%; height: 100%"
                :class="{ fold: item.type2 === '特快' }"
              ></div>
            </div>
          </div>
          <div
            class="date"
            style="width: 10%; height: 100%; text-align: center"
          >
            <div
              style="margin-top: 1.875rem; margin-left: 5.625rem"
              :class="{ fold: item.date === '未提交' }"
            >
              {{ item.date }}
            </div>
          </div>
          <div style="width: 15%; height: 100%">
            <div
              style="margin-top: 1.25rem; margin-left: 7.5rem; color: #00cba8"
            >
              <el-switch
                v-model="state"
                class="ml-2"
                style="
                  --el-switch-on-color: #00acbd;
                  --el-switch-off-color: #ff4949;
                "
              />
              启用
            </div>
          </div>
          <div
            style="
              display: flex;
              flex-flow: row nowrap;
              align-content: center;
              align-items: center;
              justify-content: flex-end;
              width: 15%;
              height: 100%;
              margin-left: -1.875rem;
            "
          >
            <el-button
              text="plain"
              icon="Edit"
              @click="TicketEdit(item)"
              circle
            ></el-button>
            <el-popconfirm
              :title="`你确定要删除?`"
              @confirm="TicketRemove(item.id)"
            >
              <template #reference>
                <el-button text="plain" icon="Delete" circle></el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </main>
      <el-pagination
        v-show="flag"
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 10]"
        :background="true"
        layout="total, sizes,->,prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 新增与修改抽屉 -->
    <el-drawer
      style="padding: 10px"
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
              <el-col :span="3">
                <el-form-item label="车次类型">
                  <el-select v-model="formParams2.region" placeholder="全部">
                    <el-option label="高铁" value="高铁" />
                    <el-option label="动车" value="动车" />
                    <el-option label="快车" value="快车" />
                    <el-option label="特快" value="特快" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="车次">
                  <el-input
                    v-model="formParams2.region1"
                    placeholder="请输入车次"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="出发日期">
                  <el-date-picker
                    v-model="formParams2.time"
                    type="date"
                    placeholder="开始"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="出发/到达站">
                  <el-col :span="8">
                    <el-select v-model="formParams2.go" placeholder="请选择">
                      <el-option label="北京西" value="北京西" />
                      <el-option label="昆明南" value="昆明南" />
                      <el-option label="上海站" value="上海站" />
                      <el-option label="狗熊岭" value="狗熊岭" />
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select v-model="formParams2.esc" placeholder="请选择">
                      <el-option label="呼和浩特" value="呼和浩特" />
                      <el-option label="西天极乐" value="西天极乐" />
                      <el-option label="济南" value="济南" />
                      <el-option label="尖沙咀" value="尖沙咀" />
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="出发/到达时间">
                  <el-col :span="12">
                    <el-time-select
                      v-model="formParams2.startTime"
                      :max-time="endTime"
                      class="mr-4"
                      placeholder="出发"
                      start="08:30"
                      step="00:15"
                      end="18:30"
                    />
                  </el-col>
                  <el-col :span="12">
                    <el-time-select
                      v-model="formParams2.endTime"
                      :min-time="startTime"
                      placeholder="到达"
                      start="08:30"
                      step="00:15"
                      end="18:30"
                    />
                  </el-col>
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
              <el-col :span="3" style="margin-right: 450px">
                <h1>无座位总数:{{ formParams2.seat }}</h1>
              </el-col>
              <el-col :span="5">
                <el-form-item label="每车限乘人数">
                  <el-button>-</el-button>
                  <el-input
                    style="width: 60px"
                    :value="formParams2.allStop"
                  ></el-input>
                  <el-button>+</el-button>
                </el-form-item>
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
            <el-table-column prop="xc" align="center" label="票价">
              <template #="{ row }">
                <el-input
                  style="width: 100px"
                  :value="row.xc"
                  class="w-50 m-2"
                  size="large"
                  placeholder="票价"
                  :prefix-icon="Ticket"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import tableData from '../../../../data/Data1.json'
import { reactive, ref, onMounted } from 'vue'
import { Ticket, Search } from '@element-plus/icons-vue'
import {
  getTicketItem,
  getTicketJoint,
  getTicketSearch,
  getSelect,
  TicketDelete,
  addTicketList,
  upDataTicket,
} from '@/api/ticket/Ticket/index'
import { ElMessage } from 'element-plus'
// 起始页码
let pageNo = ref<number>(1)
// 一页显示几条;
let pageSize = ref<number>(10)
// 共计多少条数
let total = ref<number>(0)
// 启用状态
let state = ref<boolean>(true)
// 提交状态
let submit = ref<boolean>(false)
// 收集表单数据
let LintList = ref<any[]>([])
// 收集提示框信息
let Dlh = ref<any[]>([])
// 页码显示
let flag = ref<boolean>(true)
// 抽屉显示与隐藏
let drawer = ref<boolean>(false)
// 抽屉打开方向
let direction = ref('btt')

const startTime = ref('')
const endTime = ref('')
// 动态标题
let title = reactive({
  address1: '1',
  address2: '2',
  type1: '',
  type2: '',
})

// 头部表单数据收集
let form = reactive({
  date1: '',
  date2: '',
  input1: '',
  region: '',
})

// 新增与修改的数据收集
let formParams2 = reactive({
  id: 0,
  // 车次类型
  region: '',
  // 车次名称
  region1: '',
  // 出发时间
  time: '',
  //出发站
  go: '',
  // 结束站
  esc: '',
  // 开始时间
  startTime: '',
  // 结束时间
  endTime: '',
  // 席位总数
  nums: 584,
  // 车厢总数
  boxNum: 8,
  // 限乘人数
  limit: 646,
  // 无座人数
  seat: 60,
  // 每车限乘人数
  allStop: 95,
})

// 初始化页面
onMounted(() => {
  getTicketList()
})
// 定义获取数据方法
const getTicketList = async () => {
  let obj = {
    pageNo: pageNo.value,
    pageSize: pageSize.value,
  }
  await getTicketItem(obj).then((result) => {
    console.log(result, 'result')
    if (result.code === 200) {
      LintList.value = result.data
      total.value = result.total
    }
  })
}
// 反选
const Checked = () => {
  state.value = !state.value
}
// 页码下拉事件
const handleSizeChange = () => {
  getTicketList()
}
// 页码点击事件
const handleCurrentChange = () => {
  getTicketList()
}

// 鼠标进入事件绑定
const handleMouseEnter = async (item: any) => {
  // 收集动态标题
  Object.assign(title, {
    address1: item.address1,
    address2: item.address2,
    type1: item.type1,
    type2: item.type2,
  })
  let id = item.id
  await getTicketJoint(id).then((result) => {
    if (result.code === 200) {
      Dlh.value = result.data
    } else {
    }
  })
}
// 鼠标离开事件绑定
const handleMouseLeave = () => {
  Dlh.value = []
}

// 执行搜索事件
const Searchs = async () => {
  console.log(form.input1)
  const obj = {
    pageNo: pageNo.value,
    pageSize: pageSize.value,
    keyword: form.input1,
  }
  await getTicketItem(obj).then((result) => {
    if (result.code === 200) {
      LintList.value = result.data
      total.value = result.data.length
    } else {
      ElMessage({ type: 'error', message: '搜索失败' })
    }
  })
}
// 根据日期筛选
const timeSearch = async () => {
  await getTicketSearch(Date.parse(form.date1), Date.parse(form.date2)).then(
    (result) => {
      console.log(result, 'result')
      if (result.code === 200) {
        LintList.value = result.data
        total.value = result.data.length
        ElMessage({ type: 'success', message: '日期筛选成功' })
      } else {
        ElMessage({ type: 'error', message: '日期筛选失败' })
      }
    },
  )
}

// 删除事件
const TicketRemove = async (id: string) => {
  await TicketDelete(id).then((result) => {
    if (result.code === 200) {
      ;(LintList.value = result.data),
        (total.value = result.data.length),
        ElMessage({ type: 'success', message: '删除成功' })
    } else {
      ElMessage({ type: 'error', message: '删除失败' })
    }
  })
}

// 下拉筛选
const Selected = async () => {
  await getSelect(form.region).then((result) => {
    console.log(result, 'result')
    if (result.code === 200) {
      LintList.value = result.data
      total.value = result.data.length
      ElMessage({ type: 'success', message: '筛选成功' })
    } else {
      ElMessage({ type: 'error', message: '筛选失败' })
    }
  })
}

// 新增按钮
const AddTicket = () => {
  Object.assign(formParams2, {
    id: 0,
    // 车次类型
    region: '',
    // 车次名称
    region1: '',
    // 出发时间
    time: '',
    //出发站
    go: '',
    // 结束站
    esc: '',
    // 开始时间
    startTime: '',
    // 结束时间
    endTime: '',
    // 席位总数
    nums: 584,
    // 车厢总数
    boxNum: 8,
    // 限乘人数
    limit: 646,
    // 无座人数
    seat: 60,
    // 每车限乘人数
    allStop: 95,
  })
  drawer.value = true
}
// 修改按钮事件
const TicketEdit = (obj: any) => {
  console.log(obj, 'obj')

  Object.assign(formParams2, obj)
  drawer.value = true
}
// 返回按钮
const Esc = () => {
  drawer.value = false
}
// 提交按钮
const Submit = async () => {
  if (formParams2.id) {
    await upDataTicket(formParams2).then((result) => {
      if (result.code === 200) {
        getTicketList()
        ElMessage({ type: 'success', message: '更新成功' })
      } else {
        ElMessage({ type: 'error', message: '更新失败' })
      }
    })
  } else {
    await addTicketList(formParams2).then((result) => {
      if (result.code === 200) {
        getTicketList()
        ElMessage({ type: 'success', message: '新增成功' })
      } else {
        ElMessage({ type: 'error', message: '新增失败' })
      }
    })
  }
  drawer.value = false
}
</script>

<style scoped lang="scss">
.highlight {
  background-color: #00cba8;
}

@mixin flex($direction, $content) {
  display: flex;
  flex-direction: $direction;
  justify-content: $content;
}

.pagination {
  display: flex;
  justify-content: center;
  margin: 48px auto;
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
        display: flex;
        flex-flow: row nowrap;
        align-content: center;
        align-items: center;
        width: 100%;
        height: 15%;

        .type1 {
          div {
            span {
              color: orange;

              &.fold {
                color: black;
              }
            }
          }
        }

        .date {
          color: #00cba8;

          div {
            &.fold {
              color: rgb(217 63 63);
            }
          }
        }

        .res1 {
          @include flex(column, center);

          .tt {
            span {
              &.fold {
                font-weight: 700;
                color: black;
              }
            }
          }
        }

        .address {
          @include flex(column, center);
        }

        .address_1 {
          padding: 30px;
          @include flex(column, center);
        }
      }
    }
  }
}
</style>
