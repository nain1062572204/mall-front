import request from '@/utils/request'

export function getList() {
    return request({
        url: '/member/address/list',
        method: 'GET'
    })

}

export function add(data) {
    return request({
        url: '/member/address/add',
        method: 'POST',
        data: data
    })

}

