import request from '@/utils/request'

export function addItem(data) {
    return request({
        url: '/cart/add',
        method: 'POST',
        data: data
    })
}

export function list() {
    return request({
        url: '/cart/list',
        method: 'GET'
    })
}
export function updateQuantity(params) {
    return request({
        url:'/cart/update/quantity',
        method:'PUT',
        params:params
    })
}

