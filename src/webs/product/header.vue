<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-10-29 14:09:29
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-14 16:37:26
 * @description: 
 -->
<template>
  <div class="hd row row-center" :class="colorClass">
    <div class="hd-item-lt col col-center">
      <div class="hd-lt-item">
        <p class="hd-txt text-center">{{title}}</p>
      </div>
      <div class="hd-lt-item row row-start">
        <span class="price-tag">&yen;</span>
        <span class="price-int">{{info.marketPrice|moneyInt}}.</span>
        <span class="price-float">{{info.marketPrice|moneyFloat}}</span>
        <div class="price-des col col-center">
          <p class="price-discount" :class="colorClass">省99元</p>
          <p class="price-old">&yen;120.0</p>
        </div>

        <span class="pv">PV:100</span>
      </div>

    </div>
    <div class="hd-item-rt row row-center">
      <span class="tag tag-limit" v-if="type=='LIMITBUY'">限购{{list.amount}}件</span>
      <!-- <span class="tag tag-limit" v-else-if="type=='BARGAIN'">邀请好友帮我砍价</span> -->
      <span class="tag tag-limit" v-else-if="type=='GROUPON'">2人拼</span>
      <div v-else-if="type=='FLASHSALE'||type == 'BARGAIN'">
        <p class="hd-rt-des">距结束还剩</p>
        <count-down :isProductDetail='true' :endTime='list.validTo'></count-down>
      </div>
      <count-down :isProductDetail='true' :endTime='list.presellEndAt' v-else-if="type=='PRESELL'"></count-down>
    </div>
    <!-- <div class="hd-item row row-center">
      <span class="hd-txt">{{title}}</span>
        <span class="hd-dep" v-if="type=='LIMITBUY'">&yen;{{info.marketPrice|moneyTwo}}</span>
        <span class="hd-dep" v-else-if="type=='GROUPON'">&yen;{{info.marketPrice|moneyTwo}}</span>
        <span class="hd-dep" v-else-if="type=='BARGAIN'">&yen;{{info.marketPrice|moneyTwo}}</span>
        <span class="hd-dep" v-else-if="type=='FLASHSALE'">&yen;{{info.marketPrice|moneyTwo}}</span>
      </div>
      <div class="hd-item hd-item-presell col col-center">
        <span class="tag tag-presell col col-center" v-if="type=='PRESELL'">{{list.presellDescription}}</span>
      </div>
      <div class="hd-item row row-center">
        <span class="tag tag-limit" v-if="type=='LIMITBUY'">限购{{list.amount}}件</span>
        <span class="tag tag-limit" v-else-if="type=='BARGAIN'">邀请好友帮我砍价</span>
        <span class="tag tag-limit" v-else-if="type=='GROUPON'">2人拼</span>
        <count-down :isProductDetail='true' :endTime='list.validTo' v-else-if="type=='FLASHSALE'"></count-down>
        <count-down :isProductDetail='true' :endTime='list.presellEndAt' v-else-if="type=='PRESELL'"></count-down>
      </div> -->
  </div>
</template>
<script>
import countDown from "@/components/common/Countdown.vue";
export default {
  props: ["info", "type"],
  data() {
    return {};
  },
  computed: {
    title() {
      let { type } = this;
      let map = {
        GROUPON: "火拼团购",
        BARGAIN: "疯狂砍价",
        FLASHSALE: "限时秒杀",
        LIMITBUY: "限量抢购",
        PRESELL: "定金预售"
      };
      return map[type] || "";
    },
    //活动头部相关数据
    list() {
      let { type } = this;
      let map = {
        GROUPON: "grouponVO",
        BARGAIN: "bargainVO",
        FLASHSALE: "flashsaleVO",
        LIMITBUY: "limitBuyVO",
        PRESELL: "presellVO"
      };
      let info = this.info[map[type]];
      return info;
    },
    colorClass() {
      let { type } = this;
      let map = {
        GROUPON: "groupon",
        BARGAIN: "bargain",
        FLASHSALE: "flashsale",
        LIMITBUY: "limitBuy",
        PRESELL: "presell"
      };
      return map[type] || "";
    }
  },
  mounted() {},
  components: {
    countDown
  },
  created() {}
};
</script>

<style scoped lang='less'>
.hd {
  width: 750px;
  height: 128px;
  background: @themeColor;
  border-radius: 24px 24px 0px 0px;
  padding: 9px 40px;
  box-sizing: border-box;
  &-item-lt {
    flex: 1;
    height: 100%;
  }
  &-item-rt {
    width: 170px;
    height: 100%;
  }
  &-txt {
    width: 150px;
    // padding: 2px 10px;

    box-sizing: border-box;
    border: 2px solid #fff;
    border-radius: 15px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    line-height: 30px;
    display: inline-block;
  }
}
.flashsale {
  background-color: @themeColor;
  color: @themeColor;
}
.groupon {
  background-color: #ff6f63;
  color: #ff6f63;
}
.bargain {
  background-color: @orderColor;
  color: @orderColor;
}
.limitBuy {
  background-color: #e42347;
  color: #e42347;
}
.presell {
  background-color: @themeColor;
  color: @themeColor;
}
.hd-lt-item {
  height: 50px;
  width: 100%;
  text-align: left;
  color: #fff;
  font-size: 0;
}
.price-tag,
.price-float {
  font-size: 32px;
}
.price-int {
  font-size: 64px;
}
.price-des {
  // display: inline-block;
  // height: 70px;
  font-size: 20px;
  min-width: 150px;
  margin-bottom: 10px;
}
.price-discount {
  padding: 2px 10px;
  color: @themeColor;
  text-align: center;
  height: 24px;
  line-height: 26px;
  border-radius: 12px;
  background-color: #fff;
}
.price-old {
  width: 105px;
  height: 19px;
  font-size: 24px;
  font-weight: 500;
  text-decoration: line-through;
  color: #fff;
  opacity: 0.5;
  margin-top: 10px;
  text-align: center;
}
.pv {
  font-size: 24px;
  font-weight: 500;
  color: #fff;
  margin-top: 10px;
}

.tag {
  color: #fff;
}
.tag-limit {
  padding: 10px;
  font-size: 26px;
  border: 1px solid #fff;
}
.tag-presell {
  font-size: 26px;
  // height: 80rpx;
  // line-height: 40rpx;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
}
.hd-rt-des {
  height: 23px;
  font-size: 24px;
  text-align: center;
  font-weight: 500;
  color: #fff;
}
</style>
