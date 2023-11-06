<template>
  <div id="login">
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="options"
    />
    <div class="login_box">
      <el-row>
        <el-col :span="12" :xs="0"></el-col>
        <el-col :span="12" :xs="24">
          <el-form
            class="login_form"
            :model="loginForm"
            :rules="rules"
            ref="logins"
          >
            <h1>百步穿杨一发脑洞大开</h1>
            <h2>天女散花两枪心胸宽广</h2>
            <el-form-item prop="username">
              <el-input
                style="background-color: transparent"
                :prefix-icon="User"
                v-model="loginForm.username"
                placeholder="admin或者system"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                style="background-color: transparent"
                :prefix-icon="Lock"
                v-model="loginForm.password"
                placeholder="atguigu123"
                show-password
                type="password"
              ></el-input>
            </el-form-item>
            <div class="validate-code">
              <div style="display: flex">
                <el-form-item label="验证码：" prop="valicode">
                  <el-input
                    style="background-color: transparent"
                    v-model="loginForm.valicode"
                  />
                </el-form-item>
                <valicode ref="refresh" @getCode="getCode" width="150px" />
              </div>
            </div>
            <el-form-item>
              <el-button
                :loading="loading"
                class="login_button"
                type="primary"
                size="default"
                @click="login"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { loadFull } from 'tsparticles'
import type { Engine } from 'tsparticles-engine'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
// 引入获取时间戳的函数
import { getTime } from '@/utils/time'
// 引用用户相关的小仓库
import useUserStore from '@/store/modules/user'
const particlesInit = async (engine: Engine) => {
  await loadFull(engine)
}

const particlesLoaded = async (container: any) => {
  console.log('Particles container loaded', container)
}
const options = reactive({
  background: {
    color: {
      value: 'transparent', // 背景颜色
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push', // 可用的click模式有: "push", "remove", "repulse", "bubble"。
      },
      onHover: {
        enable: true,
        mode: 'grab', // 可用的hover模式有: "grab", "repulse", "bubble"。
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#ffffff',
    },
    links: {
      color: '#ffffff', // '#dedede'。线条颜色。
      distance: 100, // 线条长度
      enable: true, // 是否有线条
      opacity: 0.5, // 线条透明度。
      width: 1, // 线条宽度。
    },
    collisions: {
      enable: false,
    },
    move: {
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 2, // 粒子运动速度。
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 100, // 粒子数量。
    },
    opacity: {
      value: 0.4, // 粒子透明度。
    },
    shape: {
      type: 'triangle', // 可用的粒子外观类型有："circle","edge","triangle", "polygon","star"
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
})
// 获取el-form组件
let logins = ref()
// 获取路由器
let $router = useRouter()
// 定义变量控制登录按钮loading
let loading = ref(false)
// 获取路由对象
let $route = useRoute()

const code = ref('')
const getCode = (value: any) => {
  code.value = value
  console.log(value)
}

// 收集表单信息，用户名密码,reactive是响应式代理对象或数组
let loginForm = reactive({
  username: 'admin',
  password: 'atguigu123',
  valicode: '',
})
let useStore = useUserStore()

// 设置点击登录事件绑定
const login = async () => {
  // 保证全部表单校验通过在发起请求
  await logins.value.validate()
  loading.value = true
  // 通知仓库菠萝发登录请求
  // 请求成功展示数据
  // 请求失败，弹出登录信息
  try {
    // 保证登录成功
    await useStore.userLogin(loginForm)
    // 编程式导航跳转首页路由
    // 判断登录的时候，路由当前是否有query参数，如果有就往query跳转，如果没有跳转至首页
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })
    // 登录成功提示信息
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `Hi,${getTime()}好`,
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    //登录失败
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
// 自定义校验规则函数  //用户名
const validatorUserName = (rule: any, value: any, callback: any) => {
  // rule即为校验规则对象
  // value即为表单元素文本内容
  //callback 如果符合条件，放行通过
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少五位'))
  }
  console.log(rule)
  console.log(value)
  console.log(callback)
}
// 自定义校验规则函数  //密码
const validatorPasswords = (rule: any, value: any, callback: any) => {
  console.log(rule)
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少六位'))
  }
}
// 自定义校验规则函数 //验证码
const checkCode = (_rule: any, value: any, callback: any) => {
  console.log(code.value)
  if (!value) {
    return callback(new Error('请输入验证码'))
  }
  setTimeout(() => {
    if (value != code.value) {
      callback(new Error('验证码有误，请重新输入'))
    } else {
      callback()
    }
  }, 500)
}
// 定义表单对象校验对象
const rules = {
  //规则对象属性
  //required：代表这个字段务必要校验的
  //min:文本长度至少多少位
  //max:文本最多多少位
  //message:"错误信息"
  //trigger':触发表单时机
  // validator自定义校验规则
  username: [
    {
      trigger: 'change',
      validator: validatorUserName,
    },
  ],
  password: [
    {
      trigger: 'change',
      validator: validatorPasswords,
    },
  ],
  valicode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { validator: checkCode, trigger: 'blur' },
  ],
}
</script>

<style lang="scss">
/* //transparent */
html,
body,
#login {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background1.jpg') no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.login_box {
  width: 100%;
  height: 100%;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background-color: rgba(0, 0, 0, 0.352);
    padding: 40px;

    h1 {
      font-size: 30px;
      color: #fff;
    }

    h2 {
      font-size: 30px;
      color: #fff;
    }

    .login_button {
      width: 100%;
    }
  }
}
</style>
