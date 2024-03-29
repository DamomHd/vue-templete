/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-15 10:40:11
 * @LastEditors  : vincent_Huanghd@126.com
 * @LastEditTime : 2019-12-26 13:32:14
 * @description: 
 */
import store from '@/store'
import axios from 'axios'
import util from '@/libs/util'
import qs from 'querystring'
import Router from '@/router'
// 创建一个错误
function errorCreate(msg) {
    const error = new Error(msg)
    errorLog(error)
    throw error
}

// 记录和显示错误
function errorLog(error) {
    // 添加到日志
    store.dispatch('Vincent/log/push', {
        message: '数据请求异常',
        type: 'danger',
        meta: {
            error
        }
    })
    // 打印到控制台
    if (process.env.NODE_ENV === 'development') {
        util.log.danger('>>>>>> Error >>>>>>')
        console.log(error)

    }
    Router.replace({
        path: '/error',
        query: {
            fromUrl: location.href
        }
    })
    // 显示提示
    // Message({
    //     message: error.message,
    //     type: 'error',
    //     duration: 5 * 1000
    // })
    // util.toast(error.message, {
    //     duration: 20 * 1000,
    // })
}

// 创建一个 axios 实例
const service = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? '' : process.env.VUE_APP_API,
    withCredentials: false,//设置避免set-cookie隐藏
    responseType: 'json',   // 响应数据格式
    responseEncoding: 'utf8',  // 响应数据编码
    timeout: 30000 // 请求超时时间
})


// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在请求发送之前做一些处理
        // form
        if (!config.isJson && !config.isFile) {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            config.data = qs.stringify(config.data)
        }
        // file
        if (config.isFile) {
            config.headers['Content-Type'] = 'multipart/form-data'
        }
        // json
        if (config.isJson) {
            config.headers['Content-Type'] = 'application/json;charset=utf-8'
        }
        if (config.url.indexOf('/wechat/getJsapiSignature') != -1) {
            config.headers['Content-Type'] = 'application/json;charset=utf-8'
            // config.data = qs.parse(config.data)
        }
        // console.log(config)

        let requestURL = config.url



        /**
         * @description get请求 拼接url参数
         */
        if (config.method === 'get' && config.data) {
            config.url += `?${config.data}`
        }

        return config
    },
    error => {
        // 发送失败
        console.log(error)
        Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data
        // 这个状态码是和后端约定的
        const { errorCode: code } = dataAxios
        // 根据 code 进行判断
        if (code === undefined) {
            // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
            return dataAxios
        } else {
            // 有 code 代表这是一个后端接口 可以进行进一步的判断
            switch (code) {
                case 0:
                    // [ 示例 ] code === 0 代表没有错误
                    return dataAxios.data


                case 200:
                    return dataAxios;
                case 302:
                    return dataAxios;
                //未登录
                case 401:
                    util.toast('请您先登录', {
                        duration: 3000,
                    })
                    var goUrl = window.location.href;
                    window.location.href = '/multiPlatLogin/toMultiPlatLogin?fromUrl=' + encodeURIComponent(goUrl);
                    return dataAxios;

                case 100200:
                    // [ 示例 ] code === 0 代表没有错误
                    return dataAxios.data
                case 100401:
                    errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`)
                    //注销用户
                    store.dispatch('d2admin/account/logout')
                    break;
                case 'xxx':
                    // [ 示例 ] 其它和后台约定的 code
                    errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`)
                    break
                default:
                    dataAxios.moreInfo && util.toast(dataAxios.moreInfo)
                    // 不是正确的 code
                    // errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`)
                    return dataAxios;
            }
        }
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400: error.message = '请求错误'; break
                case 401: error.message = '未授权，请登录';
                    //注销用户
                    store.dispatch('d2admin/account/logout')
                    break
                case 403: error.message = '拒绝访问'; break
                case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
                case 408: error.message = '请求超时'; break
                case 500: error.message = '服务器内部错误'; break
                case 501: error.message = '服务未实现'; break
                case 502: error.message = '网关错误'; break
                case 503: error.message = '服务不可用'; break
                case 504: error.message = '网关超时'; break
                case 505: error.message = 'HTTP版本不受支持'; break
                default: break
            }
        }
        errorLog(error)

        return Promise.reject(error)
    }
)

export default service
