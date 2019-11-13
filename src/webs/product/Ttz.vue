<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-11-08 11:03:03
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-12 14:01:51
 * @description: 
 -->
<template>
  <div class="ttz-info">
    <div class="pd_item row row-around pd_card_info" v-if="info">
      <div class="pd_item_ttz_card col col-center gold_show icon" :class="level=='GOLD'?'icon-gold_active':'icon-gold_show'" @click="jump('gold')">
        <p v-if="level=='GOLD'">您的专享价</p>
        <p>专享价 ¥{{info.minGoldPrice|moneyTwo}} </p>
      </div>
      <div class="pd_item_ttz_card col col-center silver_show icon" @click="jump('silver')" :class="[level?'':'icon-silver_show',level=='SILVER'?'icon-silver_active':level=='GOLD'?'icon-silver_disabled':'icon-silver_show']">
        <p v-if="level=='SILVER'">您的专享价</p>
        <p>专享价 ¥{{info.minSilverPrice|moneyTwo}} </p>
      </div>
      <div class="pd_item_ttz_card col col-center ordinary_active icon " @click="jump('ordinary')" :class="[level?'':'icon-ordinary_show',level=='ORDINARY'?'icon-ordinary_active':'icon-ordinary_disabled']">
        <p v-if="level=='ORDINARY'">您的专享价</p>
        <p>专享价 ¥{{info.minOrdinaryPrice|moneyTwo}} </p>
      </div>
    </div>
    <div class="pd_item share_card_box row row-start">
      <span>
        分享给好友还可赚【会员差额】和【包裹补贴】
      </span>
      <span class="ttz_share_btn" @click="$emit('show')">点击查看</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default: null
    },
    level: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    jump(level) {
      var url = "";
      if (this.level == "ORDINARY") {
        //点击银卡  跳转升级选中银卡
        if (level == "ordinary") {
          return;
        } else if (level == "silver") {
          url = "/ttz/confirm?status=upgrade&grade=silver";
        }
        //点击金卡 跳转升级选中金卡
        else {
          url = "/ttz/confirm?status=upgrade&grade=gold";
        }
        location.href = url;
      } else if (this.level == "SILVER") {
        //点击金卡 跳转升级选中金卡
        if (level == "gold") {
          url = "/ttz/confirm?status=upgrade&grade=";
          location.href = url;
        }
      }
    }
  },
  created() {}
};
</script>
<style scoped lang='less'>
.pd_item {
  padding: 0 15px;
  font-size: 24px;
}
.pd_item_ttz_card {
  width: 240px;
  height: 140px;
}
.pd_item_ttz_card p {
  color: @themeColor;
  font-size: 20px;
  font-weight: bold;
}
.share_card_box {
  text-align: left;
  font-size: 24px;
}
.share_card_box::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 16px;
  background: @second-theme-color;
  border-radius: 100%;
  margin-right: 20px;
}
.ttz_share_btn {
  background: @second-theme-color;
  box-shadow: 0px 6px 12px 0px rgba(223, 54, 54, 0.33);
  border-radius: 18px;
  color: #fff;
  padding: 3px 15px;
}
</style>