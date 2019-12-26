<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-10-29 14:03:29
 * @LastEditors  : vincent_Huanghd@126.com
 * @LastEditTime : 2019-12-26 13:53:13
 * @description: 商品详情页
 -->
<template>
  <div class="container">
    <van-pull-refresh class="container-refresh" v-model="isLoading" @refresh="onRefresh" :disabled="isDisabledFresh">
      <!-- <transition name="fade"> -->
      <div class="skeleton" v-show='isIniting'></div>
      <!-- </transition> -->
      <div class="detail-box" v-show="!isIniting">
        <div class="nav-content row row-center " :class="[headerActive?'':'active']">
          <!-- jumpHome -->
          <a class="icon icon-home" href="javascript:void(0)" @click="jumpHome"></a>
          <a class="icon icon-share" href="javascript:void(0)" @click="sharePd"></a>
          <nav class="nav-item row row-around" v-show="!headerActive">
            <!-- <input type="radio" :value='item.value' v-model="headerTabVal" /> -->
            <label class="nav-link " :class="[headerTabVal == item.value?'active':'hide']" v-for="(item,index) in headerInfo" :key="index" @click="goAssignBlock(item.value)"><input type="radio" :value='item.value' v-model="headerTabVal" /> {{item.name}}</label>
          </nav>
        </div>

        <!-- 轮播-->
        <vc-swiper :info='swiperList' ref="PRODUCT"></vc-swiper>
        <v-head v-if="promotion" :type='promotion.type' :info='product' :isTwitter='isTwitter'></v-head>
        <!--  -->

        <div class="pro-hd">
          <div class="pro-hd-title presell-pay-time" v-if="promotion&&promotion.type=='PRESELL'&&product.presellVO.restStartAt!=null">
            <p>尾款支付时间：{{promotion.resetStart|format('YYYY/MM/DD HH:mm:ss')}} - {{promotion.resetEnd|format('YYYY/MM/DD HH:mm:ss')}}</p>
          </div>
          <div class="pro-hd-top" v-if="!promotion">
            <span class="pro-hd-top-flog">&yen;</span>
            <span class="pro-hd-top-price">{{product.marketPrice|moneyInt}}.<span class="pro-hd-top-flog">{{product.marketPrice|moneyFloat}}</span></span>
            <span class="pro-hd-top-pv text-left">{{isTwitter?'PV:'+product.pv+'':''}}</span>
          </div>
          <div class="pro-hd-title">
            <span class="pro-hd-title-content">{{product.name}}</span>
          </div>
          <div class="row row-start">
            <span v-if="promotion&&promotion.type=='PRESELL'" class="pro-hd-presell-date">{{promotion.shipMonth}}月{{promotion.shipDay}}号发货</span>
          </div>

          <div class="pro-hd-bom row row-between" v-if="!promotion">
            <span class="pro-hd-bom-stock">库存：{{product.amount}}</span>
            <span class="pro-hd-bom-sales">销量：{{product.sales}}</span>
          </div>
          <div class="pro-hd-bom row row-between" v-else-if="promotion&&promotion.type=='LIMITBUY'">
            <span class="pro-hd-bom-stock">库存：{{promotionVo.stock}}</span>
            <span class="pro-hd-bom-sales">销量：{{promotionVo.sales}}</span>
          </div>
          <div class="pro-hd-bom row row-between" v-else-if="promotion&&promotion.type=='PRESELL'">
            <span class="pro-hd-bom-stock">库存：{{product.amount}}</span>
            <span class="pro-hd-bom-sales">销量：{{product.sales}}</span>
          </div>
          <div class="pro-hd-bom row row-between" v-else>
            <span class="pro-hd-bom-stock">库存：{{promotionVo.amount}}</span>
            <span class="pro-hd-bom-sales">销量：{{promotionVo.sales}}</span>
          </div>
          <!-- 储值卡广告 -->
          <a v-if="productAd" class="product-advertising" :href="productAd.productUrl">
            <img :src="productAd.imgUrl" alt="" class="row-img">
          </a>
        </div>
        <!-- 团团赚 -->
        <v-ttz v-if="ttzPromotion" :info="ttzPromotion" :level='ttzVipLevel' @show='sharePd'></v-ttz>
        <!-- 促销标记 -->
        <div class="detail-item activity row row-start" v-if="promotion||ttzPromotion||fullReduces">
          <span class="activity_title">促销</span>
          <span class="activity_des text-center">{{promotion?promotionTitle:fullReduces?fullReduces['FULLCUT']?'满减':'满件':'团团赚'}}</span>
          <span class="activity_text">{{promotion?(promotion.type!='LIMITBUY'? promotionDes:`每人限购${promotionVo.amount}盒`):fullReduces?fullReduces['FULLCUT']?fullReduces['FULLCUT'][0]['title']:fullReduces['FULLPIECES'][0]['title']:'分享赚取补贴'}}</span>
        </div>
        <!-- 砍价记录 -->
        <div class="bargain-record-box" v-if="promotion&&promotion.type=='BARGAIN'">
          <div class="detail-item bargain-record row row-between">
            <div class="vc-font-bold">砍价记录</div>
            <div v-if='!promotionVo.histories||((promotionVo.histories.length||0) != promotionVo.maxTimes)'>
              <span class="bargain-residue">剩余砍价次数：{{promotionVo.maxTimes - (promotionVo.histories&&promotionVo.histories.length||0)}}</span>
              <a href="javascript:void(0)" class="bargain-invite-btn vc-font-bold" @click="inviteBargainShareUrl">邀请好友砍价</a>
            </div>
            <div v-else>
              <span class="bargain-residue">砍价次数已用完</span>
            </div>
          </div>
          <div class="" v-if="promotionVo.histories">
            <p class="bargain-record_empty text-center row row-center" v-if="!promotionVo.histories.length"> <i class="icon icon-empty_cut vc-line-block"></i><label>还没有砍价记录</label></p>
            <template v-else>
              <div class="bargin-record-item row row-between" v-for="item in promotionVo.histories" :key='item.id'>
                <span class="vc-text-hidden">
                  您的好友{{item.userName}}帮您 <span class="bargain-discount">砍价{{item.discount}}元</span>
                </span>
                <span class="bargain-residue">{{item.createdAt|format('YYYY.MM.DD HH:mm:ss')}}</span>
              </div>
            </template>
          </div>
          <div v-else class="evaluate-item row row-center">
            <i class="icon icon-empty_cut vc-line-block"></i><span class="empty-evaluate">还没有砍价记录</span>
          </div>
        </div>

        <!-- 拼团 -->
        <div class="groupon-box" v-if="promotion&&promotion.type=='GROUPON'&&promotionVo.users">
          <div class="detail-item groupon-item row row-between">
            <div class="vc-font-bold">我的拼团</div>
            <div>
              <span class="bargain-residue">{{promotionVo.needNumbers==0?'拼团成功':`惊喜${promotionVo.numbers}人团`}}</span>
              <a v-if="promotionVo.needNumbers" href="javascript:void(0)" class="groupon-invite-btn vc-font-bold" @click="sharePd">邀请拼团</a>
            </div>
          </div>
          <div class="groupon-invite-map">
            <div class="groupon-invite-header" :class="[index===0?'active':'other']" :style="{backgroundImage:`url(${item.avatar})`,backgroundSize:'cover'}" v-for="(item,index) in promotionVo.users" :key="item.id"></div>
            <div class="groupon-invite-header" v-for="item in promotionVo.needNumbers" :key="'need'+item"></div>
          </div>
        </div>

        <!-- 选择规格  -->
        <div class="recommend-box" v-show="skusList.length" @click="showSkuPopup">
          <div class="recommend-nav row row-between">
            <span class="vc-font-bold">规格</span>
            <div class="row row-end">
              <span class="vc-text-hidden sku-current-title vc-line-block">{{skusList.length&&skusList[selectSkuIndex].spec||'请选择规格'}} </span>
              <i class="icon icon-more vc-line-block"></i>
            </div>
          </div>
        </div>
        <!-- 套餐搭配 -->
        <div class="recommend-box" v-if="collocationList.length">
          <p class="recommend-nav  row row-between vc-font-bold">套餐搭配({{collocationList.length}})</p>
          <v-package v-if="collocationList.length" :info='collocationList' height='260' @goPackage="goPackage"></v-package>
        </div>
        <!-- 评价 -->
        <div class="recommend-box" ref="EVALUATE">
          <div class="recommend-nav row row-between">
            <span class="vc-font-bold">宝贝评价</span>
            <span class="row row-center" v-if="product.totalCommentsRecord" @click="showAllEvaluate">共有{{product.totalCommentsRecord}}条评论 <i class="icon icon-more"></i> </span>
          </div>
          <div v-if="product.totalCommentsRecord">
            <v-evaluate :info='commentsRecords'></v-evaluate>
            <!-- <p class="show-evaluate" @click="showAllEvaluate">查看全部</p> -->
          </div>
          <div v-else class="evaluate-item row row-center">
            <i class="icon icon-empty_evaluate vc-line-block"></i><span class="empty-evaluate">还没有评价哦</span>
          </div>
        </div>

        <!-- 产品详情 -->
        <div class="detail-item" ref="DETAIL">
          <p class="text-left detail-item-title vc-font-bold ">产品详情</p>
          <div v-if="videoList">
            <video v-for="e in videoList" :key="e" class="video-item" :src="e" controls object-fit='cover'></video>
          </div>
          <lazy-component>
            <div v-html="article" class="detail-content">
            </div>
          </lazy-component>
        </div>
        <lazy-component>
          <div class="recommend-box" v-if="recommendList.length">
            <p class="recommend-nav  row row-between vc-font-bold">大家都在看</p>
            <div class="recommend-container">
              <div class="recommend-item" hover-class='hover' @click="goNewPage(d.productId)" v-for="(d,i) in recommendList" :key="i">
                <div class="recommend-img row row-center"> <img alt="" v-lazy="d.img" class="img" /></div>
                <span class="recommend-title">{{d.name}}</span>
                <div class="row row-between"><span class="recommend-price">&yen;{{d.price|moneyTwo}}</span><span class="recommend-amount">库存{{d.amount}}件</span></div>
              </div>
            </div>
          </div>
        </lazy-component>
        <!-- 选择规格 -->
        <van-popup v-model="showDrawer" position="bottom" @closed='isHandleSkuFromItem=false'>
          <!--  v-if="mask"  -->
          <div class="i-drawer-close col col-center"><i class="icon icon-delete" @click="closeDrawer"></i></div>

          <div class="i-drawer-container">
            <div class="container-product" v-if="skusList.length">
              <div class="container-product-header">
                <div class="pro-sku-img" @click="previewImage">
                  <img :src="skusList[selectSkuIndex]['imgUrl']" alt="" />
                </div>
                <div class="pro-info">
                  <div class="pro-name">{{product.name}}</div>
                  <div>
                    <span class="pro-presell" v-if="promotion&&promotion.presellType =='NORMAL'">&yen;{{skusList[selectSkuIndex]['presellPrice']}}(预售价)</span>
                    <span class="pro-presell" v-else-if="promotion&&promotion.presellType =='DEPOSIT'">定金&nbsp;&yen;{{skusList[selectSkuIndex]['advancePrice']|moneyTwo}}&nbsp;&nbsp; 尾款&nbsp;&yen;{{skusList[selectSkuIndex]['restPrice']|moneyTwo}}</span>
                  </div>
                  <div>
                    <span class="pro-money" v-if="!promotion||promotion.type!='PRESELL'">&yen;{{skusList[selectSkuIndex]['showPrice']}}</span>
                    <span class="pro-sku text-line-through" v-if="promotion">&yen;{{product.marketPrice|moneyTwo}}</span>
                    <span class="pro-sku" v-if="isTwitter">&nbsp;&nbsp;PV: {{skusList[selectSkuIndex]['showPv']}}</span>
                  </div>
                  <div v-if="limitAmount"> <span class="pro-limit-title">{{'限购' + limitAmount + '件(已购' + (countBuy) + '件)'}}</span></div>
                  <div v-if="isAnyTtzVip && ttzVipLevel" class="row row-start">
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
                  <div v-if="skusList[selectSkuIndex]['skuDepositCards'].length">
                    <p class="icon icon-show_card_btn" @click="showSkuDeposit"></p>
                  </div>
                </div>
              </div>
              <div class="container-product-sku">
                <div class="pro-amount-title" v-if="skusList.length>1">
                  规格
                </div>
              </div>
              <!-- <div > -->
              <div class="container-product-sku" v-if="skusList.length>1">
                <span class="sku-item text-left" :class="[selectSkuIndex==skuIndex?'sku-item-active':'',skuItem.amount==0?'sku-item-empty':'']" v-for="(skuItem,skuIndex) in skusList" :key="skuIndex" @click="selectSku(skuIndex,skuItem.amount)">{{skuItem.spec}}</span>
                <!-- </div> -->
              </div>

              <div class="container-product-amount" v-if="skusList.length">
                <div class="pro-amount-title">
                  购买数量
                  <span>(库存：{{skusList[selectSkuIndex]['amount']}}件)</span>
                </div>
                <div class="pro-amount-content">
                  <van-stepper v-model="buyNumber" @change="setNumber" :min="1" :max="skusList[selectSkuIndex]['amount']" :disable-plus="buyNumber>=skusList[selectSkuIndex]['amount']" />
                  <!-- <input-number @changeNumber='setNumber' :max="skusList[selectSkuIndex]['amount']" :value="buyNumber" :min="1"></input-number> -->
                </div>
              </div>
              <div class="container-product-btn" v-show="!isHandleSkuFromItem">
                <!-- <div>确定</div> -->
                <van-button :loading="isAddLoading" text="确定" round type="info" color="#BF272D" @click="addProduct" />
              </div>
              <div class="container-product-confirm-btn row" v-show="isHandleSkuFromItem">
                <van-button :loading="isAddLoading" text="加入购物车" type="info" color="#000" @click="submitSkuPopup(1)" />
                <van-button text="立即购买" type="info" color="#BF272D" @click="submitSkuPopup(0)" />
              </div>
            </div>
          </div>
        </van-popup>
      </div>
    </van-pull-refresh>
    <van-goods-action safe-area-inset-bottom>
      <van-goods-action-icon icon-class='icon icon-car' text="购物车" @click.native="jumpCart" :info="cartCount||''" id="buycar" />
      <van-goods-action-icon :icon-class="isCollection?'icon icon-collect':'icon icon-collect_dis'" text="收藏" @click.native="updateCollectStatus" />
      <div class='sellout-btn row row-center hover' v-if='isSellOut'>
        <span>已售罄</span>
      </div>
      <template v-else-if="promotion&&promotion.type=='GROUPON'">
        <van-goods-action-button type="warning" color='#BF272D' text="原价购买" @click.native="wantBuy({isBuyForMarketPrice:true})" />
        <van-goods-action-button v-if="!promotionVo.users" type="danger" color='#FF6F63' :text="activityGrouponId?'参与':'发起拼团'" @click.native="wantBuy" />
      </template>
      <template v-else>
        <van-goods-action-button type="warning" color='#000000' text="加入购物车" @click.native="addCart" />
        <van-goods-action-button type="danger" color='#BF272D' text="立即购买" @click.native="wantBuy" />
      </template>

    </van-goods-action>
    <!-- 团团赚协议 -->
    <v-ttzArgeement :show='showTtzAgreement' @createVipUser='createVipUser' @close='showTtzAgreement=false'></v-ttzArgeement>
    <v-cardDialog :show='showCardDialog' :info="skusList[selectSkuIndex]" :url='cardProductUrl' @close='showCardDialog=false'></v-cardDialog>
    <!-- 分享操作弹窗 -->
    <van-popup v-model="showShare" position="bottom" :overlay-class="isAndroid?'share-overlay blod':'share-overlay'">
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
          <div class="share-btn col col-center" @click.stop="copyUrl">
            <div class="icon icon-share_url"></div>
            <span>复制链接</span>
          </div>
        </div>
        <div class="share-close-btn row row-center">
          <i class="icon icon-share_close" @click="showShare=false"></i>
        </div>
      </div>
    </van-popup>
    <!-- 分享弹窗引导图 -->
    <van-popup v-model="showGuideShare" position="top" overlay-class='share-overlay'>
      <div @click="showGuideShare=false">
        <img :src="shareGuideImg[!promotion?'normal':promotion.type=='BARGAIN'?'bargain':'groupon']" alt="" class="share_guide_img">
      </div>
    </van-popup>
    <!-- 销售协议 -->
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

    <!-- 加入购物车特效 -->
    <transition appear @after-appear='afterEnter' @before-appear="beforeEnter" v-for="(item,index) in showMoveDot" :key="index.id">
      <div class="move_dot" ref="ball" v-if="item">
        <!-- 小球图片 -->
        <img src="http://img.gaindewo.com/110e7832-5074-46bd-bdf3-faace0f668a5.jpg" alt="">
      </div>
    </transition>
    <!-- 图片预览 -->
    <van-image-preview v-model="showImagePreview" :images="imagePreviewList" @change="changePreviewImage" :show-indicators='true' :close-on-popstate='true'>
      <template v-slot:index>{{ imagePreviewIndex+1 }}/{{imagePreviewList.length}}</template>
    </van-image-preview>

    <!-- 购买储值卡提示 -->
  </div>
</template>
<script>
import proJs from "./index";
export default proJs;
</script>
<style scoped lang='less'>
@import "./index.less";
@import "./skeleton.less";
@import "~@/assets/style/vant/index.less";
.move_dot {
  position: fixed;
  z-index: 100;
  top: 50%;
  // top: 50%;
  // left: 50%;
  top: 1rem;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  img {
    animation: 0.88s mymove ease-in-out;
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
}

#buycar.moveToCart {
  animation: carmove 0.5s ease-in-out;
}
@keyframes carmove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(0.6);
  }
  75% {
    transform: scale(0.4);
  }
  100% {
    transform: scale(0.2);
  }
}
</style>