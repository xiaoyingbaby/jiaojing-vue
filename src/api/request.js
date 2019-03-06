import axios from "axios";
import qs from "qs";

axios.defaults.timeout = 5000;
axios.defaults.baseURL ='/';

import { Message } from 'element-ui';

//http request 拦截器
axios.interceptors.request.use(
    config => {
        // console.log(config)
        // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        // config.data = JSON.stringify(config.data);
        // config.headers = {
        //     'Content-Type':'application/x-www-form-urlencoded'
        // }
        // if(token){
        //   config.params = {'token':token}
        // }
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);

//http response 拦截器
axios.interceptors.response.use(
    response => {
        if(response.data.errCode == 2 ){
            router.push({
                path:"/login",
                querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
            })
        }
        return response;
    },
    error => {
        alert(1)
        return Promise.reject(error)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(err)
        })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        console.log(data,'data')
        axios.post(url,data)
            .then(response => {
                console.log(response,'ss')
                resolve(response.data);
            },err => {
                reject(err)
            })
        })
        
 }