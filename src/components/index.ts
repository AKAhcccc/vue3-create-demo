// 从项目2中引入全局组件
import SvgIcon from './SvgIcon/index.vue'

const allGlobalComponent = { SvgIcon }

//对外暴漏插件对象
export default {
  install(app: { component: (arg0: string, arg1: any) => void }) {
    // 通过object.keys将对象转换为数组，并且通过foreach循环遍历，有多少个Key就添加多少个
    Object.keys(allGlobalComponent).forEach((key: any) => {
      app.component(key, allGlobalComponent[key])
    })
  },
}
