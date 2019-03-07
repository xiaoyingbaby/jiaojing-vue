const baseUrl = process.env.API_URL ? process.env.API_URL : '';
import http from './http'

export default{
    authLogin(param,callbak) {
        return http.post(`${baseUrl}/v1.0/auth/login`, param, callbak)
    }
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