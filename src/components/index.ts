// 从项目中引入全局组件
// 通过import语句引入了两个全局组件：SvgIcon和valicode。
import SvgIcon from './SvgIcon/index.vue'
// 通过import * as ElementPlusIconsVue将@element-plus/icons-vue库中的所有图标组件导入
import valicode from './valicode/valicode.vue'
// 注册全局Icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 定义了一个allGlobalComponent对象，包含了引入的全局组件。
const allGlobalComponent = { SvgIcon, valicode }

//对外暴漏插件对象
export default {
  // 在install方法中，通过Object.keys()将allGlobalComponent对象的所有键（即组件名）转换为数组，并使用forEach循环遍历数组。
  install(app: { component: (arg0: string, arg1: any) => void }) {
    // 通过object.keys将对象转换为数组，并且通过foreach循环遍历，有多少个Key就添加多少个
    Object.keys(allGlobalComponent).forEach((key: any) => {
      // 对于每个键，使用app.component()方法将对应的组件注册为全局组件。
      app.component(key, allGlobalComponent[key])
    })
    // 将element-plus提供的图标全局注册
    // 通过for循环遍历ElementPlusIconsVue对象的键值对，将每个图标组件也注册为全局组件。
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
