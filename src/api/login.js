/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-15 11:16:53
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-07 15:58:43
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
        url: '/v2/signin_check',
        method: 'get',
        data
    })
}