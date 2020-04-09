import request from "@/utils/request"

export function generateConfirmOrder(params) {
    return request({
        url: '/order/generateConfirmOrder',
        method: 'GET',
        params: params
    });
}

export function generateOrder(data) {
    return request({
        url: '/order/generateOrder',
        method: 'POST',
        data: data
    })
}

export function getOrderInfoByOrderSn(orderSn) {
    return request({
        url: '/order/' + orderSn,
        method: 'GET'
    })
}

export function getOrderList(keyword) {
    return request({
        url: '/order/list',
        method: 'GET',
        params: keyword
    })
}