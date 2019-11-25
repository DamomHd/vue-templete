/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-11-13 10:30:55
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-21 14:22:48
 * @description: 
 */
import { getJsapiSignature } from '@/api/login'
import store from '@/store'
//引入微信分享SDK
import wx from "weixin-js-sdk";
export const wechatAuth = async () => {
    let shareConfig = { ...store.state.Vincent.wxShare.info } //分享参数 
    let entryUrl = store.state.Vincent.wxShare.entryUrl; //第一次进入的地址
    let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    // let shareUrl = isiOS ? entryUrl : location.href
    let authRes = await getJsapiSignature({ url: location.href })

    if (authRes.errorCode == 200 && authRes.data) {
        wx.config({
            // debug: true,
            appId: authRes.data.appId,
            timestamp: authRes.data.timestamp,
            nonceStr: authRes.data.nonceStr,
            signature: authRes.data.signature,
            jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"] //"updateAppMessageShareData", "updateTimelineShareData", 
        });

        wx.ready(() => {
            // wx.updateAppMessageShareData({
            //     title: shareConfig.title,
            //     desc: shareConfig.desc,
            //     link: shareConfig.link,
            //     imgUrl: shareConfig.imgUrl,
            //     success: function () {//设置成功
            //         //shareSuccessCallback();
            //     }
            // });
            // wx.updateTimelineShareData({
            //     title: shareConfig.title,
            //     link: shareConfig.link,
            //     imgUrl: shareConfig.imgUrl,
            //     success: function () {//设置成功
            //         //shareSuccessCallback();
            //     }
            // });
            //分享到朋友圈
            wx.onMenuShareTimeline({
                title: shareConfig.title,
                link: shareConfig.link,
                imgUrl: shareConfig.imgUrl,
                success: function () {
                    shareSuccessCallback();
                }
            });
            //分享给朋友
            wx.onMenuShareAppMessage({
                title: shareConfig.title,
                desc: shareConfig.desc,
                link: shareConfig.link,
                imgUrl: shareConfig.imgUrl,
                success: function () {
                    shareSuccessCallback();
                }
            });
        });
    }
};

function shareSuccessCallback() {
    console.log('分享成功')
}
