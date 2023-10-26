// 账号信息TS类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 代表一个账号信息的ts类型
export interface UserResponse {
  id?: number
  createTime?: string
  updateTime?: string
  username?: string
  password?: string
  name?: string
  phone?: null
  roleName?: string
}

// 数组包含全部用户信息
export type Records = UserResponse[]

// 获取全部用户信息接口返回的数据TS类型
export interface UserResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}

// 代表一个职位的TS类型
export interface RoleData {
  id?:number,
  createTime?:string,
  updateTime?: string,
  roleName:string,
  remark:null
}
// 全部职位列表
export type AllRole = RoleData[];
// 获取全部职位的接口返回数据类型
export interface AllRoleResponseData extends ResponseData {
  data:{
    assignRoles:AllRole,
    allRolesList:AllRole
  }
}

// 给用户分配职位
export interface SetRoleData {
  roleIdList:number[],
  userId:number
}