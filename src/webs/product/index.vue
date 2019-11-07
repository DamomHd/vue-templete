<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-10-29 14:03:29
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-07 19:06:50
 * @description: 商品详情页
 -->
<template>
  <van-pull-refresh class="container-refresh" v-model="isLoading" @refresh="onRefresh">
    <div class="detail-box">
      <!-- 轮播 v-if="swiperList.length"-->
      <vc-swiper :images='swiperList' height='750'></vc-swiper>
      <v-head v-if="promotion" :type='promotion.type' :info='product'></v-head>
      <!--  -->
      <div class="pro-hd">
        <div class="pro-hd-title presell-pay-time" v-if="promotion&&promotion.type=='PRESELL'&&product.presellVO.restStartAt!=null">
          <p>尾款支付时间：{{promotion.resetStart|format('YYYY/MM/DD HH:mm:ss')}} - {{promotion.resetEnd|format('YYYY/MM/DD HH:mm:ss')}}</p>
        </div>
        <div class="pro-hd-title">
          <span class="pro-hd-title-content">{{productObj.name}}<span v-if="promotion&&promotion.type=='PRESELL'" class="pro-hd-presell-date">{{promotion.shipMonth}}月{{promotion.shipDay}}号发货</span></span>
        </div>
        <div class="pro-hd-top">
          <span class="pro-hd-top-flog">&yen;</span>
          <span class="pro-hd-top-price" v-if="!promotion">{{productObj.marketPrice}}</span>
          <span class="pro-hd-top-price" v-if="promotion&&promotion.type=='LIMITBUY'">{{product.limitBuyVO.price|moneyTwo}}</span>
          <span class="pro-hd-top-price" v-if="promotion&&promotion.type=='FLASHSALE'">{{product.flashsaleVO.discount|moneyTwo}}</span>
          <span class="pro-hd-top-price" v-if="promotion&&promotion.type=='PRESELL'">{{productObj.marketPrice|moneyTwo}}</span>
          <span class="pro-hd-top-price" v-if="promotion&&promotion.type=='BARGAIN'">{{productObj.bargainVO.maxDiscount|moneyTwo}}</span>
          <span class="pro-hd-top-pv">{{isTwitter?'(PV'+productObj.pv+')':''}}</span>
        </div>

        <div class="pro-hd-bom row row-between">
          <span class="pro-hd-bom-stock">库存：&nbsp;&nbsp;{{productObj.amount}}件</span>
          <span class="pro-hd-bom-sales">销量：&nbsp;&nbsp;{{productObj.sales}}件</span>
        </div>
      </div>

      <!-- 评价 -->
      <div class="recommend-box" v-if="product.totalCommentsRecord">
        <p class="recommend-nav">评价</p>
        <div v-if="product.totalCommentsRecord">
          <v-evaluate :info='commentsRecords'></v-evaluate>
          <p class="show-evaluate" @click="showAllEvaluate">查看全部{{product.totalCommentsRecord}}条评论</p>
        </div>
      </div>
      <!-- 套餐搭配 -->
      <div class="recommend-box" v-if="collocationList.length">
        <p class="recommend-nav">套餐搭配</p>
        <v-package :images='collocationList' height='260'></v-package>
      </div>

      <!-- 产品详情 -->
      <div class="detail-item">
        <span class="detail-item-title">产品详情</span>
        <div v-if="videoList">
          <video v-for="e in videoList" :key="e" class="video-item" :src="e" controls object-fit='cover'></video>
        </div>
        <div v-html="article" class="detail-content">

        </div>
        <!-- <wxParse :content="article" @preview="preview" @navigate="navigate" /> -->
      </div>

      <div class="recommend-box" v-if="recommendList.length">
        <p class="recommend-nav">别人还在看</p>
        <div class="recommend-container">
          <div class="recommend-item" hover-class='hover' @click="goNewPage(d.productId)" v-for="(d,i) in recommendList" :key="i">
            <img class="recommend-img" :src="d.img" alt="" mode='aspectFit' />
            <span class="recommend-title">{{d.name}}</span>
            <div><span class="recommend-price">&yen;{{d.price}}</span><span class="recommend-amount">库存{{d.amount}}件</span></div>
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
      <van-goods-action safe-area-inset-bottom>
        <van-goods-action-icon icon-class='icon icon-car' text="购物车" @click="goCart" />
        <van-goods-action-icon :icon-class="isCollection?'icon icon-collect':'icon icon-collect_dis'" :text="isCollection?'已收藏':'收藏'" @click="updateCollectStatus" />
        <van-goods-action-button type="warning" color='#000000' text="加入购物车" @click="addCart" />
        <van-goods-action-button type="danger" color='#BF272D' text="立即购买" @click="wantBuy" />
      </van-goods-action>

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
                  <span class="pro-money" v-if="!promotion||promotion.type!='PRESELL'">￥{{skusList[selectSkuIndex]['showPrice']}}</span>
                  <span class="pro-money" v-else-if="promotion.presellType =='NORMAL'">￥{{skusList[selectSkuIndex]['presellPrice']}}(预售价)</span>
                  <span class="pro-money" v-else-if="promotion.presellType =='DEPOSIT'">￥{{skusList[selectSkuIndex]['advancePrice']}}（定金）￥{{skusList[selectSkuIndex]['restPrice']}} （尾款）</span>

                </div>
                <div v-if="limitAmount"> <span class="pro-money">{{'限购' + limitAmount + '件(已购' + (countBuy) + '件)'}}</span></div>
                <div v-if="isTwitter">
                  <span class="pro-sku">&nbsp;(PV {{skusList[selectSkuIndex]['showPv']}})</span>
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
</template>
<script>
import proJs from "./index";
export default proJs;
</script>
<style scoped lang='less'>
@import "./index.less";
</style>