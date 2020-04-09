import {getToken, setToken, removeToken} from '@/utils/auth'
import {login} from "@/api/login";
import router from '@/router/index';

const member = {
    state: {
        token: getToken(),
        name: 'member',
        avatar: ''
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
    },
    actions: {
        //登录
        Login({commit}, member) {
            return new Promise((resolve, reject) => {
                const username = member.username.trim()
                login(username, member.password).then((response) => {
                    const data = response.data
                    const tokenStr = data.tokenHead + data.token
                    setToken(tokenStr)
                    commit('SET_TOKEN', tokenStr)
                    //resolve()
                    router.push({
                        name:'home'
                    })
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }

}
export default member