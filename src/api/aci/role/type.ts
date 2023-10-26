// 表格数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 获取数据类型
export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}

export type Records = RoleData[]

export interface RoleResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    orders: string[]
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

// Tree部分数据类型
export interface TreeData {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children?: TreeList[]
  select: boolean
}

export type TreeList = TreeData[]

export interface MenuResponseData extends ResponseData {
  data: TreeList
}
