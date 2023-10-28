import request from "@/utils/request";

enum API {
    GETSTOPLIST_URL='http://localhost:8888/api/ticket/stop',
}

export const getStopList = (obj:any) => {
    console.log(obj,"data");
    return request.post<any,any>(API.GETSTOPLIST_URL,{
        body: {
            obj:obj
        }
    })
}