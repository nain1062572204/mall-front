import request from "@/utils/request"

export function content(params) {
    return request({
        url: '/home/content',
        method: 'GET',
        params: params
    })
}

export function topBarContent(params) {
    return request({
        url: '/home/topBar',
        method: 'GET',
        params: params
    })

}