<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-10-29 14:03:29
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-14 16:19:32
 * @description: 商品详情页
 -->
<template>
  <div class="container">
    <van-pull-refresh class="container-refresh" v-model="isLoading" @refresh="onRefresh">
      <div class="detail-box">
        <div class="top-btn row row-end">
          <a class="icon icon-home" href="javascript:void(0)" @click="jumpHome"></a>
          <a class="icon icon-share" href="javascript:void(0)" @click="sharePd"></a>
        </div>
        <!-- 轮播 v-if="swiperList.length"-->
        <vc-swiper :images='swiperList' height='750'></vc-swiper>
        <v-head v-if="promotion" :type='promotion.type' :info='product'></v-head>
        <!--  -->
        <v-ttz v-if="ttzPromotion" :info="ttzPromotion" :level='ttzVipLevel' @show='sharePd'></v-ttz>
        <div class="pro-hd">
          <div class="pro-hd-title presell-pay-time" v-if="promotion&&promotion.type=='PRESELL'&&product.presellVO.restStartAt!=null">
            <p>尾款支付时间：{{promotion.resetStart|format('YYYY/MM/DD HH:mm:ss')}} - {{promotion.resetEnd|format('YYYY/MM/DD HH:mm:ss')}}</p>
          </div>

          <div class="pro-hd-top">
            <span class="pro-hd-top-flog">&yen;</span>
            <span class="pro-hd-top-price" v-if="!promotion">{{productObj.marketPrice|moneyInt}}.<span class="pro-hd-top-flog">{{productObj.marketPrice|moneyFloat}}</span></span>
            <span class="pro-hd-top-price" v-if="promotion&&promotion.type=='LIMITBUY'">{{product.limitBuyVO.price|moneyTwo}}</span>
            <span class="pro-hd-top-price" v-if="promotion&&promotion.type=='FLASHSALE'">{{product.flashsaleVO.discount|moneyTwo}}</span>
            <span class="pro-hd-top-price" v-if="promotion&&promotion.type=='PRESELL'">{{productObj.marketPrice|moneyTwo}}</span>
            <span class="pro-hd-top-price" v-if="promotion&&promotion.type=='BARGAIN'">{{productObj.bargainVO.maxDiscount|moneyTwo}}</span>
            <span class="pro-hd-top-pv">{{isTwitter?'(PV'+productObj.pv+')':''}}</span>
          </div>
          <div class="pro-hd-title">
            <span class="pro-hd-title-content">{{productObj.name}}<span v-if="promotion&&promotion.type=='PRESELL'" class="pro-hd-presell-date">{{promotion.shipMonth}}月{{promotion.shipDay}}号发货</span></span>
          </div>

          <div class="pro-hd-bom row row-between">
            <span class="pro-hd-bom-stock">库存：&nbsp;&nbsp;{{productObj.amount}}件</span>
            <span class="pro-hd-bom-sales">销量：&nbsp;&nbsp;{{productObj.sales}}件</span>
          </div>

          <a v-if="productAd" class="product-advertising" :href="productAd.productUrl">
            <img :src="productAd.imgUrl" alt="" class="row-img">
          </a>
        </div>

        <div class="detail-item activity row row-start" v-if="promotion">
          <span class="activity_title">促销</span>
          <span class="activity_des text-center">{{promotionTitle}}</span>
          <span class="activity_text">{{promotion.type!='LIMITBUY'? promotionDes:`每人限购${product.limitBuyVO.amount}盒`}}</span>
        </div>

        <div class="bargain-record-box" v-if="promotion&&promotion.type=='BARGAIN'">
          <div class="detail-item bargain-record row row-between">
            <div class="vc-font-bold">砍价记录</div>
            <div v-if='product.bargainVO.histories.length != product.bargainVO.maxTimes'>
              <span class="bargain-residue">剩余砍价次数：{{product.bargainVO.maxTimes - product.bargainVO.histories.length}}</span>
              <a href="javascript:void(0)" class="bargain-invite-btn vc-font-bold" @click="showGuideShare=true">邀请好友砍价</a>
            </div>
            <div v-else>
              <span class="bargain-residue">砍价次数已用完</span>
            </div>
          </div>

          <div class="">
            <p class="bargain-record_empty text-center" v-if="!product.bargainVO.histories.length">还没有砍价记录</p>
            <template v-else>
              <div class="bargin-record-item row row-between" v-for="item in product.bargainVO.histories" :key='item.id'>
                <span class="vc-text-hidden">
                  您的好友{{item.userName}}帮您 <span class="bargain-discount">砍价{{item.discount}}元</span>
                </span>
                <span class="bargain-residue">{{item.createdAt|format}}</span>
              </div>
            </template>

          </div>
        </div>

        <!-- 评价 -->
        <div class="recommend-box" v-if="product.totalCommentsRecord">
          <div class="recommend-nav row row-between">
            <span class="vc-font-bold">宝贝评价</span>
            <span class="row row-center" @click="showAllEvaluate">共有{{product.totalCommentsRecord}}条评论 <i class="icon icon-more"></i> </span>
          </div>
          <div v-if="product.totalCommentsRecord">
            <v-evaluate :info='commentsRecords'></v-evaluate>
            <p class="show-evaluate" @click="showAllEvaluate">查看全部{{product.totalCommentsRecord}}条评论</p>
          </div>
        </div>
        <!-- 套餐搭配 -->
        <!-- <div class="recommend-box" v-if="collocationList.length">
          <p class="recommend-nav  row row-between vc-font-bold">套餐搭配</p>
          <v-package :images='collocationList' height='260'></v-package>
        </div> -->

        <!-- 产品详情 -->
        <div class="detail-item">
          <span class="detail-item-title vc-font-bold">产品详情</span>
          <div v-if="videoList">
            <video v-for="e in videoList" :key="e" class="video-item" :src="e" controls object-fit='cover'></video>
          </div>
          <div v-html="article" class="detail-content">

          </div>
          <!-- <wxParse :content="article" @preview="preview" @navigate="navigate" /> -->
        </div>

        <div class="recommend-box" v-if="recommendList.length">
          <p class="recommend-nav  row row-between vc-font-bold">别人还在看</p>
          <div class="recommend-container">
            <div class="recommend-item" hover-class='hover' @click="goNewPage(d.productId)" v-for="(d,i) in recommendList" :key="i">
              <img class="recommend-img" :src="d.img" alt="" mode='aspectFit' />
              <span class="recommend-title">{{d.name}}</span>
              <div class="row row-between"><span class="recommend-price">&yen;{{d.price|moneyTwo}}</span><span class="recommend-amount">库存{{d.amount}}件</span></div>
            </div>
          </div>
        </div>
        <!-- 底部菜单 -->
        <!-- <div class="bom-item">
        <div class="bom-item-item" @click="goHome">
          <img :src="iconList.home" class="icon">
          <p class="icon-title">首页</p>
        </div>
        <div class="bom-item-item" @click="addCart">
          <img :src="iconList.cart" class="icon">
          <p class="icon-title">加入购物车</p>
        </div>
        <div class="bom-item-item share-btn bom-title hover">
          产品分享
        </div>
        <div class="bom-item-item buy-btn bom-title " @click="wantBuy">
          想买
        </div>
      </div> -->

        <!-- 选择规格 -->
        <van-popup v-model="showDrawer" position="bottom">
          <!--  v-if="mask"  -->
          <i class="i-drawer-close icon icon-delete" @click="closeDrawer"></i>
          <div class="i-drawer-container">
            <div class="container-product" v-if="skusList.length">
              <div class="container-product-header">
                <div class="pro-sku-img" @click="previewImage">
                  <img :src="skusList[selectSkuIndex]['imgUrl']" alt="" />
                </div>
                <div class="pro-info">
                  <div class="pro-name">{{productObj.name}}</div>
                  <div>
                    <span class="pro-money" v-if="!promotion||promotion.type!='PRESELL'">&yen;{{skusList[selectSkuIndex]['showPrice']}}</span>
                    <span class="pro-money" v-else-if="promotion.presellType =='NORMAL'">&yen;{{skusList[selectSkuIndex]['presellPrice']}}(预售价)</span>
                    <span class="pro-money" v-else-if="promotion.presellType =='DEPOSIT'">&yen;{{skusList[selectSkuIndex]['advancePrice']}}(定金) &yen;{{skusList[selectSkuIndex]['restPrice']}}(尾款)</span>

                  </div>
                  <div v-if="limitAmount"> <span class="pro-money">{{'限购' + limitAmount + '件(已购' + (countBuy) + '件)'}}</span></div>
                  <div v-if="isAnyTtzVip && ttzVipLevel">
                    <span class="ttz-dep">专享价</span>
                    <template v-if="ttzVipLevel=='ORDINARY'">
                      <span class="pro-money">{{(skusList[selectSkuIndex]['price'] - skusList[selectSkuIndex]['ordinaryCardRebate'])|moneyTwo}}</span><span class="ttz-card-name">普卡</span>
                    </template>
                    <template v-else-if="ttzVipLevel=='SILVER'">
                      <span class="pro-money"> {{(skusList[selectSkuIndex]['price'] - skusList[selectSkuIndex]['silverCardRebate'])|moneyTwo}}</span><span class="ttz-card-name">银卡</span>
                    </template>
                    <template v-else>
                      <span class="pro-money">{{(skusList[selectSkuIndex]['price'] - skusList[selectSkuIndex]['goldCardRebate'])|moneyTwo}}</span><span class="ttz-card-name">金卡</span>
                    </template>
                  </div>
                  <div v-if="isTwitter">
                    <span class="pro-sku">&nbsp;(PV {{skusList[selectSkuIndex]['showPv']}})</span>
                  </div>
                  <div v-if="skusList[selectSkuIndex]['skuDepositCards'].length">
                    <p class="icon icon-show_card_btn" @click="showCardDialog=true"></p>
                  </div>
                </div>
              </div>
              <!-- <div > -->
              <div class="container-product-sku" v-if="skusList.length>1">
                <span class="sku-item" :class="[selectSkuIndex==skuIndex?'sku-item-active':'']" v-for="(skuItem,skuIndex) in skusList" :key="skuIndex" @click="selectSku(skuIndex)">{{skuItem.spec}}</span>
                <!-- </div> -->
              </div>

              <div class="container-product-amount" v-if="skusList.length">
                <div class="pro-amount-title">
                  数量
                  <span>(库存：{{skusList[selectSkuIndex]['amount']}}件)</span>
                </div>
                <div class="pro-amount-content">
                  <input-number @changeNumber='setNumber' :max="skusList[selectSkuIndex]['amount']" :value="buyNumber" :min="1"></input-number>
                </div>
              </div>
              <div class="container-product-btn" @click="addProduct">
                <div>确定</div>
              </div>
            </div>
          </div>
        </van-popup>
      </div>
    </van-pull-refresh>
    <van-goods-action safe-area-inset-bottom>
      <van-goods-action-icon icon-class='icon icon-car' text="购物车" @click.native="jumpCart" />
      <van-goods-action-icon :icon-class="isCollection?'icon icon-collect':'icon icon-collect_dis'" :text="isCollection?'已收藏':'收藏'" @click.native="updateCollectStatus" />
      <van-goods-action-button type="warning" color='#000000' text="加入购物车" @click.native="addCart" />
      <van-goods-action-button type="danger" color='#BF272D' text="立即购买" @click.native="wantBuy" />
    </van-goods-action>

    <v-ttzArgeement :show='showTtzAgreement' @createVipUser='createVipUser' @close='showTtzAgreement=false'></v-ttzArgeement>
    <v-cardDialog :show='showCardDialog' :info="skusList[selectSkuIndex]" @close='showCardDialog=false'></v-cardDialog>

    <van-popup v-model="showShare" position="bottom" overlay-class='share-overlay'>
      <div class="share-popup">
        <p class="share-title">分享至</p>
        <p class="share-content">好友通过您分享的链接可购买此商品</p>
        <div v-if="productPackageRebates.length">
          <p class="share-content">
            累计购买您可以获得补贴哦！
          </p>
          <div class="share-ttz-package">
            <div class="row row-center">
              <p class="share-ttz-package-title">累计购买</p>
              <p class="share-ttz-package-title">包裹补贴</p>
            </div>
            <div class="row row-center" v-for="item in productPackageRebates" :key='item.id'>
              <p class="">{{item.minNum}}-{{item.maxNum}}件</p>
              <p class="">&yen;{{item.packageRebate|moneyTwo}}/件</p>
            </div>
          </div>
        </div>
        <div class="row row-around" @click="sharingChannels">
          <div class="share-btn col col-center">
            <div class="icon icon-share_wx"></div>
            <span>微信好友</span>
          </div>
          <div class="share-btn col col-center">
            <div class="icon icon-share_fd"></div>
            <span>朋友圈</span>
          </div>
          <div class="share-btn col col-center">
            <div class="icon icon-share_qq"></div>
            <span>QQ好友</span>
          </div>
          <div class="share-btn col col-center">
            <div class="icon icon-share_qz"></div>
            <span>QQ空间</span>
          </div>
          <div class="share-btn col col-center ">
            <div class="icon icon-share_url"></div>
            <span>复制链接</span>
          </div>
        </div>
        <div class="share-close-btn row row-center">
          <i class="icon icon-share_close" @click="showShare=false"></i>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showGuideShare" position="top" overlay-class='share-overlay'>
      <div @click="showGuideShare=false">
        <img v-if="!promotion" src="../../assets/images/product/share_guide.png" alt="" class="share_guide_img">
        <img src="../../assets/images/product/share_bargain.png" alt="" class="share_guide_img" v-else>
      </div>
    </van-popup>
    <van-dialog overlay-class='sales-dialog' v-model="showSales" title="" :show-confirm-button='false'>
      <div class="sales-dialog-content">
        <i class="close-btn icon icon-delete" @click="showSales=false"></i>
        <p class="sales-dialog-title">《销售协议》</p>
        <div class="sales-agreement-content" v-if="salesAgreementInfo">
          <div>
            <p>甲方：深圳德沃时尚电子商务有限公司</p>
            <p>乙方：深圳玄空网络科技有限公司</p>
            <p>丙方：{{salesAgreementInfo.huodeId}}(获德ID)</p>
          </div>
          <div v-html="salesAgreementInfo.agreement.agreement"></div>
        </div>
        <a href="javascript:void(0)" class="sales-agree-btn" @click="agreeSales">已阅读，同意遵守协议规范</a>
        <a href="javascript:void(0)" class="sales-cancel-btn" @click="showSales=false">我再考虑一下</a>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import proJs from "./index";
export default proJs;
</script>
<style scoped lang='less'>
@import "./index.less";
</style>