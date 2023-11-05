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
  history: createWebHashHistory(),
  routes: constantRoute,
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
