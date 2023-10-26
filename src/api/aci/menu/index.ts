import request from "@/utils/request";
import type { MenuResponseList,MenuAddOrUpDataResponse } from './type';

enum API {
    // 获取菜单数据
    GETMENU_URL = '/admin/acl/permission',
    // 给某一级新增菜单接口
    ADDMENU_URL = '/admin/acl/permission/save',
    // 更新菜单的接口
    UPDATAMENU_URL = '/admin/acl/permission/update',
    // 删除菜单
    REMOVEMENU_URL = '/admin/acl/permission/remove/'
}

// 获取菜单数据
export const getMenuService = () => request.get<any,MenuResponseList>(API.GETMENU_URL)

export const getHsaResponse = (data:MenuAddOrUpDataResponse) => {
    if(data.id){
        return request.put<any,any>(API.UPDATAMENU_URL,data)
    }else {
        return request.post<any,any>(API.ADDMENU_URL,data)
    }
}
// 根据ID删除菜单
export const getRemoveMenu = (id:number) => request.delete<any,any>(API.REMOVEMENU_URL + id)