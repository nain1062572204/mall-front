import request from "@/utils/request"

export function simpleSearch(params) {
    return request({
        url: '/esProduct/search/simple',
        method: 'GET',
        params: params
    })
}

export function getRelate(params) {
    return request({
        url: '/esProduct/search/relate',
        method: 'GET',
        params: params
    })
}

export function getRecommendProduct(id, params) {
    return request({
        url: '/esProduct/recommend/' + id,
        method: 'GET',
        params: params
    })
}