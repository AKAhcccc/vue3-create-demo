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
