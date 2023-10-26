import request from '@/utils/request'

import { RoleResponseData, RoleData } from './type'

enum API {
  // 获取全部的职位接口
  ALLROLE_URL = '/admin/acl/role/',
  // 新增岗位的接口地址
  ADDROLE_URL = '/admin/acl/role/save',
  // 更新已有的职位
  UPDATAROLE_URL = '/admin/acl/role/update',
  // 获取全部的全部菜单与按钮数据
  ALLPERMISSTION_URL = '/admin/acl/permission/toAssign/',
  // 给相应的职位分配权限
  SETPERMISSION_URL = '/admin/acl/permission/doAssign/?',
  // 删除角色
  REMOVEROLE_URL = '/admin/acl/role/remove/',
}

// 展示职位数据
export const reqRoleAllList = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleResponseData>(
    API.ALLROLE_URL + `${page} / ${limit} /?roleName=${roleName}`,
  )

// 新增 |更新 岗位接口
export const reqRoleAdd = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATAROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}

// 获取全部的全部菜单与按钮数据
export const reqAllTreeRoles = (roleId: number) =>
  request.get<any, any>(API.ALLPERMISSTION_URL + roleId)

// 给相应的职位下发权限
export const reqSetPermission = (roleId: number, permissionId: number[]) =>
  request.post(
    API.SETPERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`,
  )

//   删除角色接口
export const reqReoveRole = (Id: number) =>
  request.delete<any, any>(API.REMOVEROLE_URL + Id)
