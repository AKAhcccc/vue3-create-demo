// 用户管理模块接口
import request from '@/utils/request'
// 引入类型
import type {
  UserResponseData,
  UserResponse,
  AllRoleResponseData,
  SetRoleData,
} from './type'
// 枚举定义对象
enum API {
  // 获取全部信息
  ALLUSER_URL = '/admin/acl/user/',
  // 添加用户信息
  ADDUSER_URL = '/admin/acl/user/save',
  // 修改用户信息
  UPDATAUSER_URL = '/admin/acl/user/update',
  // 获取全部职位，当前账号拥有的职位接口
  ALLROLES_URL = '/admin/acl/user/toAssign/',
  // 给已有的用户分配角色接口
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  // 删除某一个账号
  DELETEUSER_URL = '/admin/acl/user/remove/',
  // 批量删除的接口
  DELETEALLER_URL = '/admin/acl/user/batchRemove',
}
// 获取用户账号信息接口
export const reqUserInfo = (page: number, limit: number, username: string) =>
  request.get<any, UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}/?username=${username}`,
  )
// export const reqUserInfo = (page: number, limit: number, username: string) =>
//   request.get<any, UserResponseData>(
//     API.ALLUSER_URL + `${page}/${limit}/?username=${username}`,
//   )
// 添加用户与更新已有用户的接口
export const reqAddOrUpdateUser = (data: UserResponse) => {
  if (data.id) {
    return request.put(API.UPDATAUSER_URL, data)
  } else {
    return request.post(API.ADDUSER_URL, data)
  }
}
// 获取全部职位以及当前用户包含的已有职位
export const reqAllRole = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.ALLROLES_URL + userId)

// 分配职位
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.SETROLE_URL, data)

// 删除某一个账号的信息
export const reqDeleteUserRole = (userId: number) =>
  request.delete<any, any>(API.DELETEUSER_URL + userId)

// 批量删除接口
export const reqSelectUser = (idList: number[]) =>
  request.delete<any, any>(API.DELETEALLER_URL, { data: idList })
