import Vue from 'vue';
import router from "./router";
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueLazyload from "vue-lazyload";
import VueCookie from 'vue-cookie';
import {Message} from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import App from './App.vue';

// import env from './env';

// mock 开关
const mock = false;
if(mock) {
    require('./mock/api')
}

// 根据前端的跨域方式做调整
axios.defaults.baseURL = '/api'; //接口代理 vue.config.js
// axios.defaults.baseURL = env.baseURL; // 根据环境变量获取不同的请求地址
axios.defaults.timeout = 15000;

axios.interceptors.response.use(function (response) {
    let res = response.data;
    if (res.status === 0) {
        return res.data;
    } else if (res.status === 10) {
        window.location.href = '/#/login';
        return Promise.reject(res)
    } else {
        Message.warning(res.msg);
        return Promise.reject(res);
    }
}, (error) => {
    let res = error.response;
    Message.error(res.data.message);
    return Promise.reject(error);
})

Vue.use(VueAxios, axios);
Vue.use(VueLazyload, {
    loading:'/imgs/loading-svg/loading-bars.svg'
});
Vue.prototype.$message = Message;
Vue.use(VueCookie);
Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
