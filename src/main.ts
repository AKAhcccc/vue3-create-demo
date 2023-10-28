import { createApp } from 'vue'
// 全局引入ECharts
import ECharts from 'vue-echarts'
import 'echarts'
import App from './App.vue'
// 配置svg矢量图代码
import 'virtual:svg-icons-register'
// 粒子背景效果
import Particles from 'particles.vue3'
// 挂载全局默认样式
import '@/styles/index.scss'
// 全局挂载组件
import globalComponent from '@/components/index'
// 引用element插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 配置国际化,因内置无TS声明文件，单行忽略
//@ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入路由
import router from './router'
// 引入仓库
import pinia from '@/store'
// 引入路由鉴权文件
import permission from './permission'
// 实例化getCurrentInstance
// 挂载ECharts
const app = createApp(App).component('ECharts',ECharts)
// 安装仓库
app.use(pinia)
// 安装自定义插件
app.use(globalComponent)
// 安装全局守卫
app.use(permission)
// 集成粒子背景效果
app.use(Particles)
// 获取应用的实例对象
// 安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn, //国际化配置
})
// 注册模版路由
app.use(router)

app.mount('#app')
