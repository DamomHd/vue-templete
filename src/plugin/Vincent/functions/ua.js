/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-12-24 18:21:18
 * @LastEditors  : vincent_Huanghd@126.com
 * @LastEditTime : 2019-12-26 10:28:26
 * @description: 
 */
const u = navigator.userAgent;
//是否安卓
export const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
//是否ios
export const isIos = u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1;
//是否微信
export const isWeixin = u.toLowerCase().match(/MicroMessenger/i) == "micromessenger"
//是否来源于获德APP
export const isFromApp = u.indexOf("healthsource-b2b-app") != -1

export const isIosApp = isFromApp && isIos;
export const isAndroidApp = isFromApp && isAndroid;