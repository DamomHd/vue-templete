<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-11-08 14:12:07
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-11 15:52:12
 * @description: 
 -->
<template>
  <van-dialog v-model="showDialog" title="" :show-confirm-button='false'>
    <div class="card-dialog">
      <div class="card-header"></div>
      <div class="card-content">
        <div class="quarter">
          <p class="row row-start"><i class="icon icon-card_money"></i> 季卡优惠</p>
          <div class="item row row-between" v-for="item in quarter">
            <span>{{item.money}}元</span>
            <span>立减{{item.discount}}元/件</span>
            <span>PV:{{item.pv}}</span>
          </div>
        </div>
        <div class="year">
          <p class="row row-start"><i class="icon icon-card_money"></i>年卡优惠</p>
          <div class="item row row-between" v-for="item in year">
            <span>{{item.money}}元</span>
            <span>立减{{item.discount}}元/件</span>
            <span>PV:{{item.pv}}</span>
          </div>
        </div>

        <a href="javascript:void(0)" class="card-buy-btn">购买储值卡</a>
      </div>
      <div class="card-footer"></div>
      <div class="icon icon-card_close" @click="$emit('close')"></div>
    </div>
  </van-dialog>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    info: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      showDialog: false
    };
  },
  computed: {
    quarter() {
      if (this.info && this.info.skuDepositCards) {
        return this.info.skuDepositCards.filter(
          item => item.cardType == "QUARTER"
        );
      }
      return [];
    },
    year() {
      if (this.info && this.info.skuDepositCards) {
        return this.info.skuDepositCards.filter(
          item => item.cardType == "YEAR"
        );
      }
      return [];
    }
  },
  components: {},
  watch: {
    show: function(nVal) {
      this.showDialog = nVal;
    }
  },
  methods: {},
  created() {}
};
</script>
<style scoped lang='less'>
.card-dialog {
  width: 560px;
  //   min-height: 600px;
  position: relative;
}
.van-dialog /deep/ {
  width: auto;
  overflow: visible;
}
.card-header {
  width: 700px;
  height: 320px;
  background: transparent url("../../assets/images/product/card_head.png")
    center/700px no-repeat;
  position: absolute;
  left: -70px;
  top: -150px;
}
.card-footer {
  width: 700px;
  height: 320px;
  background: transparent url("../../assets/images/product/card_footer.png")
    center/700px no-repeat;
  position: absolute;
  left: -70px;
  bottom: -100px;
  zoom: 1;
}

.card-content {
  padding: 100px 40px 160px;
  box-sizing: border-box;
}
.year {
  margin-top: 40px;
}
.quarter > div,
.year > div {
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  padding: 0 10px;
}
.quarter > p,
.year > p {
  font-size: 30px;
  color: #fb6c20;
  height: 60px;
  line-height: 60px;
  text-align: left;
}
.card-content .icon {
  display: inline-block;
}
.quarter > p {
  background-color: #fff1f1;
}
.year > p {
  background-color: #fff9f1;
}
.quarter > div:nth-child(2n) {
  background-color: #ffd8d8;
}
.quarter > div:nth-child(2n + 1) {
  background-color: #fff1f1;
}

.year > div:nth-child(2n) {
  background-color: #ffecd3;
}
.year > div:nth-child(2n + 1) {
  background-color: #fff9f1;
}
.item > span {
  flex: 1;
}
.item > span:nth-child(3n + 1) {
  color: #222;
  text-align: left;
}
.item > span:nth-child(3n + 2) {
  color: @themeColor;
  max-width: 200px;
  min-width: 150px;
  text-align: center;
}
.item > span:nth-child(3n) {
  color: #999999;
  text-align: right;
}
.card-buy-btn {
  display: inline-block;
  width: 480px;
  height: 88px;
  position: absolute;
  bottom: 40px;
  left: 40px;
  background-color: @themeColor;
  line-height: 88px;
  border-radius: 8px;
  color: #fff;
  font-size: 28px;
  z-index: 2019;
}
.icon-card_close {
  position: absolute;
  bottom: -120px;
  left: 236px;
}
</style>