import { defineStore } from 'pinia'

const useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //控制菜单折叠还是收起的控制
      refsh: false, // 此属性用来控制刷新按钮
    }
  },
})

export default useLayOutSettingStore
