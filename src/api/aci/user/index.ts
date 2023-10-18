// 用户管理模块接口
import request from '@/utils/request';
// 引入类型
import type { UserResponseData,UserResponse } from './type'
// 枚举定义对象
enum API {
    // 获取全部信息
    ALLUSER_URL = '/admin/acl/user/',
    // 添加用户信息
    ADDUSER_URL = '/admin/acl/user/save',
    // 修改用户信息
    UPDATAUSER_URL = '/admin/acl/user/update',
}
// 获取用户账号信息接口
export const reqUserInfo = (page: number, limit: number) => request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}`)

// 添加用户与更新已有用户的接口
export const reqAddOrUpdateUser = (data: UserResponse) => {
    if(data.id){
        return request.put(API.UPDATAUSER_URL,data)
    }else {
        return request.post(API.ADDUSER_URL,data)
    }
}