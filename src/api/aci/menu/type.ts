export interface MenuData {
  code: number
  message: string
  ok: boolean
}

export interface MenuItem {
  id?: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children?: MenuList
  select: boolean
}

export type MenuList = MenuItem[]

// 菜单接口返回数据的类型
export interface MenuResponseList extends MenuData {
  data: MenuList
}

// 添加与修改菜单携带参数的属性
export interface MenuAddOrUpDataResponse {
  id?: number //Id
  code: string // 权限数据
  level: number //几级菜单
  name: string // 菜单名称
  pid: number //菜单ID
}
