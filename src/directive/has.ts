import pinia from '@/store'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore(pinia)
export const isHasButton = (app: any) => {
  //获取对应的用户仓库
  //全局自定义指令:实现按钮的权限
  app.directive('has', {
    //代表使用这个全局自定义指令的DOM|组件挂载完毕的时候会执行一次
    mounted(el: any, options: any) {
      // el是全局自定义指令的DOM元素
      console.log(el, 'el')
      // options是全局自定义指令右侧的数值
      console.log(options, 'options')

      console.log(userStore.buttons, 'buttons')
      //自定义指令右侧的数值:如果在用户信息buttons数组当中没有
      //从DOM树上清除
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el)
      }
    },
  })
}
