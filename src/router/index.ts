// 通过vue-router插件实现模版路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'
// 创建路由器
/**
 * @description 创建路由器
 * @param {String} key Storage名称
 * @returns {String}
 */
const router = createRouter({
  // 模式的设置hash
  // 在创建路由器时，使用createWebHashHistory()函数来设置路由模式为哈希模式，即URL中使用#来表示路由。
  history: createWebHashHistory(),
  routes: constantRoute,
  // 滚动行为
  // 定义了一个scrollBehavior函数来设置路由切换时的滚动行为。
  // 在这个例子中，每次路由切换后，页面滚动位置会被重置到最顶部。
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
