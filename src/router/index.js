import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
    {
        path: '',
        component: Layout,
        redirect: 'home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/home/index')
            },
            {
                path: 'search',
                name: 'search',
                component: () => import('@/views/search/index')
            },
            {
                path: 'product',
                name: 'product',
                component: () => import('@/views/product/index')
            },
            {
                path: 'buySuccess',
                name: 'buySuccess',
                component: () => import('@/views/buySuccess/index')
            },
            {
                path: 'cartItem',
                name: 'cartItem',
                component: () => import('@/views/cartItem/index')
            },
            {
                path: 'checkOrder',
                name: 'checkOrder',
                component: () => import('@/views/checkOrder/index')
            },
            {
                path: 'pay/:orderSn',
                name: 'pay',
                component: () => import('@/views/pay/index')
            },
            {
                path: 'user',
                name: 'user',
                component: () => import ('@/views/user/Layout'),
                redirect: '/user/order',
                children: [
                    {
                        path: 'order',
                        name: 'order',
                        component: () => import('@/views/user/component/order/index')
                    }
                ]
            }
        ]
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/register/index')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index')
    }
]

export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})