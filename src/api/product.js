/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-10-29 13:20:49
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-21 14:09:37
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

/**
 * @description:查询我的团团转会员 
 * @param {type} 
 * @LastEditTime: 
 * @return: 
 * @LastEditors: vincent_Huanghd@126.com
 * @Date: 2019-10-29 15:24:07
 */
export function queryMyTtzVip(data) {
    return request({
        url: '/v2/ttzvip/myVip',
        method: 'get',
        data
    })
}

/**
 * @description:查询是否加入会员 
 * @param {type} 
 * @LastEditTime: 
 * @return: 
 * @LastEditors: vincent_Huanghd@126.com
 * @Date: 2019-10-29 15:24:07
 */
export function queryIsTtzVip(data) {
    return request({
        url: '/v2/ttzvip/isAnyVip',
        method: 'get',
        data
    })
}

/**
 * @description:默认加入普通会员 
 * @param {type} 
 * @LastEditTime: 
 * @return: 
 * @LastEditors: vincent_Huanghd@126.com
 * @Date: 2019-10-29 15:24:07
 */
export function createVipUser(data) {
    return request({
        url: '/v2/ttzvip/createVipUser',
        method: 'post',
        data
    })
}


/**
 * @description:查询商品销售协议 
 * @param {type} 
 * @LastEditTime: 
 * @return: 
 * @LastEditors: vincent_Huanghd@126.com
 * @Date: 2019-10-29 15:24:07
 */
export function querySalesAgreement(data) {
    return request({
        url: '/v2/agreement/selectByType',
        method: 'get',
        data
    })
}
/**
 * @description:同意商品销售协议 
 * @param {type} 
 * @LastEditTime: 
 * @return: 
 * @LastEditors: vincent_Huanghd@126.com
 * @Date: 2019-10-29 15:24:07
 */
export function agreeSalesAgreement(data) {
    return request({
        url: '/v2/userAgreement/insert',
        method: 'post',
        data
    })
}
/**
 * @description:获取邀请分享地址 
 * @param {productId} 
 * @LastEditTime: 
 * @return: 
 * @LastEditors: vincent_Huanghd@126.com
 * @Date: 2019-10-29 15:24:07
 */
export function getBarainShareUrl(data) {
    return request({
        url: '/v2/promotionBargain/start',
        method: 'post',
        data
    })
}