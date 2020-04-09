import request from '@/utils/request'

export function login(username, password) {
    return request({
        url: '/sso/login',
        method: 'POST',
        params: {
            username: username,
            password: password
        }
    })

}

