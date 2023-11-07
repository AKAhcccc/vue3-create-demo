import pinia from '@/store'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore(pinia);

// 该函数接受一个Vue应用实例
export const isHasButton = (app: any) => {
  //获取对应的用户仓库
  //全局自定义指令:实现按钮的权限
  // app.directive方法的第一个参数是指令名称，第二个参数是一个对象，包含指令的生命周期钩子函数。
  app.directive('has', {
    //代表使用这个全局自定义指令的DOM|组件挂载完毕的时候会执行一次
    // 在mounted钩子函数中，获取了全局自定义指令所在的DOM元素el和指令右侧的数值options。
    mounted(el: any, options: any) {
      // el是全局自定义指令的DOM元素
      console.log(el, 'el')
      // options是全局自定义指令右侧的数值
      console.log(options, 'options')
      console.log(userStore.buttons, 'buttons')
      // 判断userStore.buttons数组是否包含options.value，如果不包含，则从DOM树中移除el元素，即移除对应的按钮。
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el)
      }
    },
  })
}
