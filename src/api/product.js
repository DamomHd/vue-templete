/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-10-29 13:20:49
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-07 14:30:11
 * @description: 
 */
import request from '@/plugin/axios'

/**
 * @description:  获取商品详情 '/api/p'
 * @param {type} 
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 
 * @return: 
 * @Date: 2019-07-17 11:15:16
 */
export function getProduct(id, data) {
    return request({
        url: `/api/p/${id}`,
        method: 'get',
        data
    })
}

/**
 * @description:  获取商品详情重定向查询 '/api/p'
 * @param {type} 
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 
 * @return: 
 * @Date: 2019-07-17 11:15:16
 */
export function redirectProduct(url, data) {
    return request({
        url: `${url}`,
        method: 'get',
        data
    })
}


/**
 * @description: 查询商品详情是否有推荐商品
 * @param {type} 
 * @LastEditTime: 
 * @return: 
 * @LastEditors: vincent_Huanghd@126.com
 * @Date: 2019-10-29 15:24:07
 */
export function getRecommend(data) {
    return request({
        url: `/v2/recommendation`,
        method: 'get',
        data
    })
}

/**
 * @description:查询商品详情是否有推荐商品
 * @param {type} 
 * @LastEditTime: 
 * @return: 
 * @LastEditors: vincent_Huanghd@126.com
 * @Date: 2019-10-29 15:24:07
 */
export function getCollocation(data) {
    return request({
        url: `/v2/listCollocation`,
        method: 'get',
        data
    })
}

/**
 * @description:加入购物车 
 * @param {type} 
 * @LastEditTime: 
 * @return: 
 * @LastEditors: vincent_Huanghd@126.com
 * @Date: 2019-10-29 15:24:07
 */
export function addCart(data) {
    return request({
        url: `/v2/cart/add`,
        method: 'post',
        data
    })
}

/**
 * @description:商品收藏 
 * @param {type} 
 * @LastEditTime: 
 * @return: 
 * @LastEditors: vincent_Huanghd@126.com
 * @Date: 2019-10-29 15:24:07
 */
export function updateCollectProduct(type, data) {
    return request({
        url: `/v2/productCollection/${type}`,
        method: 'post',
        data
    })
}