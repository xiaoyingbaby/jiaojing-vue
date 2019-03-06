import axios from 'axios';
let base = '/';
import { get, post } from './request'

// 获取所有文章
export const authLogin = params => {
    console.log(params,'params')
    return post(`${base}/v1.0/auth/login`, params);
}

// 上传图片
// export const uploadImg = params => {
//     // return axios.post(`${base}/article/editorUpload`,params);
//     return axios({
//         url: `${base}/article/editorUpload`,
//         method: 'post',
//         data: params,
//         headers: { 'Content-Type': 'multipart/form-data' }
//     })
// }