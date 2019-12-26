<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-10-29 14:09:29
 * @LastEditors  : vincent_Huanghd@126.com
 * @LastEditTime : 2019-12-26 13:50:32
 * @description: 
 -->
<template>
  <div class="hd row row-center" :class="colorClass">
    <div class="hd-item-lt col col-center">
      <div class="hd-lt-item">
        <p class="hd-txt text-center col col-center">
          <span>{{title}}</span>
        </p>
      </div>
      <div class="hd-lt-item row row-start">
        <span class="price-tag"><span class="bargain-title">{{type == 'BARGAIN'&&list.histories?'已砍至 ':''}}</span>&yen;&nbsp;</span>
        <template v-if="type == 'BARGAIN'">

          <span class="price-int vc-font-bold">{{list.histories?bargainReduce:info.marketPrice|moneyInt}}.</span>
          <span class="price-float vc-font-bold">{{list.histories?bargainReduce:info.marketPrice|moneyFloat}}</span>
        </template>
        <template v-else-if="type == 'LIMITBUY'">
          <span class="price-int vc-font-bold">{{list.price|moneyInt}}.</span>
          <span class="price-float vc-font-bold">{{list.price|moneyFloat}}</span>
        </template>
        <template v-else-if="type == 'FLASHSALE'||type == 'GROUPON'">
          <span class="price-int vc-font-bold">{{list.discount|moneyInt}}.</span>
          <span class="price-float vc-font-bold">{{list.discount|moneyFloat}}</span>
        </template>
        <template v-else-if="type == 'PRESELL'">
          <span class="price-int vc-font-bold">{{list.presellPrice|moneyInt}}.</span>
          <span class="price-float vc-font-bold">{{list.presellPrice|moneyFloat}}</span>
        </template>
        <template v-else>
          <span class="price-int vc-font-bold">{{info.marketPrice|moneyInt}}.</span>
          <span class="price-float vc-font-bold">{{info.marketPrice|moneyFloat}}</span>
        </template>

        <div class="price-des col col-center">
          <!-- <p class="price-discount" :class="colorClass">省99元</p> -->
          <p class="price-bargain-max" v-if="type == 'BARGAIN'&&!list.histories">最低&yen;{{list.maxDiscount|moneyTwo}}</p>
          <p class="price-old" v-else>&yen;{{info.marketPrice|moneyTwo}}</p>
        </div>

        <span class="pv" v-if="isTwitter">PV:{{info.pv}}</span>
      </div>

    </div>
    <div class="hd-item-rt row row-center">
      <span class="tag tag-limit" v-if="type=='LIMITBUY'">限购{{list.amount}}件</span>
      <div v-else>
        <p class="hd-rt-des">距结束还剩</p>
        <count-down :isProductDetail='true' :endTime="type=='PRESELL'?list.presellEndAt:list.validTo"></count-down>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>
<script>
import countDown from "@/components/common/Countdown.vue";
export default {
  props: ["info", "type", "isTwitter"],
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
    },
    bargainReduce() {
      let { type, info, list } = this;
      if (type == "BARGAIN" && list.histories) {
        return (
          info.marketPrice -
          list.histories.reduce((total, item) => {
            return total + item.discount;
          }, 0)
        );
      }
      return 0;
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
    // width: 120px;
    box-sizing: border-box;
    border: 2px solid #fff;
    width: 120px;
    height: 36px;
    border-radius: 18px;
    & > span {
      font-size: 20px;
      color: #fff;
    }
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
  background-color: #bf27b2;
  color: #fff;
}
.price-bargain-max {
  color: #fff600;
  font-size: 24px;
  margin-top: 10px;
}
.hd-lt-item {
  height: 50px;
  width: 100%;
  text-align: left;
  color: #fff;
  font-size: 0;
  align-items: flex-end;
}
.price-tag,
.price-float {
  font-size: 32px;
  font-weight: bold;
}
.bargain-title {
  font-size: 24px;
  font-weight: bold;
}
.price-int {
  font-size: 56px;
  transform: translateY(5px);
}
.price-des {
  // display: inline-block;
  // height: 70px;
  font-size: 20px;
  min-width: 150px;
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
