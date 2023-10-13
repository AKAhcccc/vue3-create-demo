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
          <el-form class="login_form">
            <h1>百步穿杨一发脑洞大开</h1>
            <h2>天女散花两枪心胸宽广</h2>
            <el-form-item>
              <el-input
                :prefix-icon="User"
                v-model="loginForm.username"
                placeholder="admin或者system"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                :prefix-icon="Lock"
                v-model="loginForm.password"
                placeholder="123456"
                show-password
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
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
import { reactive } from 'vue'
import { loadFull } from 'tsparticles'
import type { Engine } from 'tsparticles-engine'
import { User, Lock } from '@element-plus/icons-vue'
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
// 收集表单信息，用户名密码,reactive是响应式代理对象或数组
let loginForm = reactive({ username: 'admin', password: '123456' })
let useStore = useUserStore()
// 设置点击登录事件绑定
const login = () => {
  // 通知仓库菠萝发登录请求
  // 请求成功展示数据
  // 请求失败，弹出登录信息
  useStore.userLogin()
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
