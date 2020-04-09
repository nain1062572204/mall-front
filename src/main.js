import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//引入字体图标
import './icons'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入通用样式
import './styles/common-styles.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import './permission'//权限控制

Vue.config.productionTip = false
Vue.use(ElementUI, {locale});

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});

