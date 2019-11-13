/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-15 11:16:53
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-13 11:33:22
 * @description: 
 */

import request from '@/plugin/axios'

/**
 * @description: 登录接口
 * @param {type} 
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 
 * @return: 
 * @Date: 2019-07-17 11:15:16
 */
export function GetUserInfo(data) {
    return request({
        url: '/v2/openapi/user/loginForSmallProgram',
        method: 'post',
        data
    })
}
/**
 * @description: 获取微信分享签名
 * @param {type} 
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 
 * @return: 
 * @Date: 2019-07-17 11:15:16
 */
export function getJsapiSignature(data) {
    return request({
        url: '/wechat/getJsapiSignature',
        method: 'get',
        data
    })
}