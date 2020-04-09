import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' //进度条
import 'nprogress/nprogress.css'
import {getToken} from "@/utils/auth"

const whiteList = ['/login', '/register'] // 不重定向白名单
router.beforeEach((to, from, next) => {
    //NProgress.start()
    next()
})

router.afterEach(() => {
    //NProgress.done()
})
