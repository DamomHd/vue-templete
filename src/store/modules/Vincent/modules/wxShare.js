/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-11-13 10:12:27
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-13 17:46:17
 * @description: 微信分享的相关信息
 */
import { wechatAuth } from "@/plugin/Vincent/wechatConfig.js";
export default {
    namespaced: true,
    state: {
        // +分享相关信息
        //   - title 必须 分享标题
        //   - link 分享链接
        //   - desc 分享描述
        //   - imgUrl 分享封面图片
        info: {
            title: '获德商城',
            link: 'http://check.gaindewo.com/shop',
            desc: '更多好礼，尽在获德',
            imgUrl: 'http://img.gaindewo.com/220x220_5f83f6e9-8622-4ff7-ab21-760750e0e524.png'
        }
    },
    getters: {
        /**
         * @description 返回现存 log (all) 的条数
         * @param {*} state vuex state
         */
    },
    actions: {
        /**
         * @description 修改分享信息
         * @param {String} param message {String} 信息
         * @param {String} param type {String} 类型
         * @param {Object} param meta {Object} 附带的信息
         */
        resetShareInfo({ state, dispatch }, info) {
            //微信内获取签名
            // if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
            for (let key in info) {
                state['info'][key] = info[key];
            }
            //获取分享签名 
            wechatAuth();
            // }

        },
    },
    mutations: {
        /**
         * @description 重置分享信息
         * @param {Object} state vuex state
         */
        // resetShareInfo(state, info) {
        //     console.log(1)
        //     for (let key in info) {
        //         state[key] = info[key]
        //     }
        // }
    }
}
