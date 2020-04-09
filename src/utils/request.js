//axios封装
import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '../store'
import {getToken} from '@/utils/auth'
import NProgress from 'nprogress' //进度条
import 'nprogress/nprogress.css'
//创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 5000//超时时间
})
//request拦截器
service.interceptors.request.use(config => {
    //让每个请求携带token
    if (getToken()) {
        config.headers['Authorization'] = getToken();
    }
    NProgress.start()
    return config
}, error => {
    window.console.log(error)
    Promise.reject(eror)
});
//response拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非200是抛错 可结合自己业务进行修改
         */
        NProgress.done()
        const res = response.data
        if (res.code !== 200) {
            Message({
                message: res.message,
                type: 'error',
                duration: 3 * 1000
            })

            // 401:未登录;
            if (res.code === 401 || res.code === 403) {
                MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    /*store.dispatch('FedLogOut').then(() => {
                        location.reload()// 为了重新实例化vue-router对象 避免bug
                    })*/
                    this.$router.push({
                        path: 'login'
                    })
                })
            }
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        console.log('err' + error)// for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 3 * 1000
        })
        return Promise.reject(error)
    }
)
export default service
