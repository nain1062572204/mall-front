import request from "@/utils/request"

export function getProductDetail(id) {
    return request({
        url: '/product/detail/' + id,
        method: 'GET',
    })
}