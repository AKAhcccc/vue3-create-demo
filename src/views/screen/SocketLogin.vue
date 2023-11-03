<template>
  <div class="container">
    <div class="chat-content">
      <!-- 模版语法通过ID判断是哪个用户 -->
      <template v-if="chatList && chatList.length">
        <div
          v-for="(chat, index) in chatList"
          class="message-box"
          :class="{ 'right-message': chat.user.id === userInfo.user.id }"
          :key="index"
        >
          <div v-if="chat.user.id !== userInfo.user.id" class="user">
            <el-avatar class="avatar" :src="chat.user.avatar"></el-avatar>
            <div class="info">
              <div class="name">{{ chat.user.name }}</div>
              <div class="time">{{ chat.createTime }}</div>
            </div>
          </div>
          <div v-else class="user">
            <div class="info">
              <div class="time">{{ chat.createTime }}</div>
              <div class="name">{{ chat.user.name }}</div>
            </div>
            <el-avatar class="avatar" :src="chat.user.avatar"></el-avatar>
          </div>
          <div class="message">
            <div class="block">{{ chat.message }}</div>
          </div>
        </div>
      </template>
      <!-- 空信息显示 -->
      <div v-else class="empty">没有消息</div>
    </div>
    <!-- 下方输入框部分 -->
    <div class="chat-bottom">
      <el-input v-model="chatMsg" class="chat-input" placeholder="请输入内容" />
      <el-button class="chat-btn" type="primary" @click="sendMsg">
        发送
      </el-button>
    </div>
    <div style="margin-top: 10px">
      当前用户：
      <el-select
        v-model="userInfo.user"
        value-key="id"
        @change="selectUser"
        placeholder="Select"
      >
        <el-option
          v-for="item in userList"
          :key="item.id"
          :label="item.name"
          :value="item"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入通信模块
import { ElMessage } from 'element-plus'
import io from 'socket.io-client'
const avatar =
  'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
import { ref, reactive, onMounted } from 'vue'
// 用于存储聊天消息列表
const chatList = ref<any>([])
// 聊天框内容
const chatMsg = ref('')
// 用户列表数据
const userList = [
  { name: '舔狗', id: 0, avatar },
  { name: '女神', id: 1, avatar },
]
// 当前选中的用户信息
const userInfo = reactive({ user: userList[0] })
let socket: any = null
onMounted(() => {
  socket = io('http://localhost:8001')
  socket.on('connect', () => {
    console.log(socket.id, '监听客户端连接成功-connect')
  })
  socket.on('fresh-message', (data: any) => {
    chatList.value = data
  })
})
// 切换当前选中的用户
const selectUser = (user: any) => {
  userInfo.user = user
}
// 当点击发送按钮,发送信息至后端，并且清空输入框
const sendMsg = () => {
  if (chatMsg.value.length > 0) {
    let UserInfo = userInfo.user
    let Info = chatMsg.value
    socket.emit('send-message', { UserInfo, Info })
    chatMsg.value = ''
    ElMessage({ type: 'success', message: '信息发送成功' })
  } else {
    ElMessage({ type: 'error', message: '输入框信息不能为空' })
  }
}
</script>

<style lang="scss" scoped>
// Mixin函数传入不同参数实现不同的弹性盒布局
@mixin flex($align) {
  display: flex;
  align-items: $align;
}

.container {
  width: 600px;
  height: 300px;
  padding: 24px;
}

.chat-bottom {
  @include flex(center);
}

.chat-content {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-bottom: none;
  box-sizing: border-box;

  .message-box {
    margin-bottom: 10px;

    .message {
      margin-left: 42px;
      border-radius: 4px;
      box-sizing: border-box;
      margin-top: 5px;
      width: 100%;

      .block {
        display: inline-block;
        font-size: 14px;
        line-height: 1.5;
        border-radius: 4px;
        padding: 8px;
        background-color: #eee;
      }
    }

    .user {
      .avatar {
        width: 32px;
        height: 32px;
        margin-right: 10px;
      }

      @include flex(center);
    }

    .info {
      @include flex(center);
      font-size: 12px;
      color: #999;

      .name {
        margin-right: 10px;
      }
    }

    &.right-message {
      text-align: right;

      .message {
        padding-right: 42px;
        margin-left: auto;
      }

      .user {
        .name {
          margin-right: 0px;
          margin-left: 10px;
        }

        justify-content: flex-end;
      }

      .avatar {
        margin-right: 0px;
        margin-left: 10px;
      }
    }
  }
}

.empty {
  font-size: 14px;
  padding: 50px 0;
  text-align: center;
}

.chat-input {
  &:deep(.el-input__inner) {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.chat-btn {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
