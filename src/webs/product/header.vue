<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-10-29 14:09:29
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-07 15:21:05
 * @description: 
 -->
<template>
  <div class="hd row row-center">
    <div class="hd-item row row-center">
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
    </div>
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
        GROUPON: "团购产品",
        BARGAIN: "砍价产品",
        FLASHSALE: "秒杀产品",
        LIMITBUY: "限量产品",
        PRESELL: "预售"
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
// @import "~@/utils/common.less";
.hd {
  width: 750px;
  height: 80px;
  background-color: @orderColor;
  padding: 0 40px;
  box-sizing: border-box;
  &-item {
    flex: 5;
    height: 80px;
    &-presell {
      flex: 2;
    }
  }
  &-txt {
    font-size: 30px;
    color: #fff;
    flex: 1;
  }
  &-dep {
    font-size: 30px;
    flex: 1;
    color: #fff;
    text-decoration: line-through;
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
}
</style>
