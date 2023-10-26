export interface ResponseData {
    code: number;
    message: string;
    data: TicketResponse;
    pageNum:number
}

// 列车数据
export interface ResponseItem {
    "id": string,
    "trips": string,
    "type": string
    "conductor": string
    "num": number
    "carriage": number
    "max": string
    "time": string
    "switch": boolean
}

export type TicketResponse = ResponseItem[]

