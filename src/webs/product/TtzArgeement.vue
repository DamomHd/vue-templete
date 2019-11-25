<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-11-08 14:12:07
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-15 14:05:22
 * @description: 
 -->
<template>
  <van-dialog v-model="showDialog" title="" :show-confirm-button='false'>
    <div class="dialog-item col col-between">
      <i class="close-btn icon icon-delete" @click="$emit('close')"></i>
      <p class="agreement-title row row-center">
        <img src="../../assets/images/product/product_header_bg.png" alt="" />
      </p>
      <div class="agreenment-content col col-between">
        <div class="agreement-content-item row row-center normal selected" data-type="normal" @click="selectIndex=0">
          <a href="javascript:void(0)" class="icon" :class="[selectIndex==0?'icon-select_square_active':'icon-select_square']"></a>
          <img src="../../assets/images/product/card_normal.png" alt="" />
        </div>
        <div class="agreement-content-item row row-center sliver" data-type="silver" @click="selectIndex=1">
          <a href="javascript:void(0)" class="icon" :class="[selectIndex==1?'icon-select_square_active':'icon-select_square']"></a>
          <img src="../../assets/images/product/card_sliver.png" alt="" />
        </div>
        <div class="agreement-content-item row row-center gold " data-type="gold" @click="selectIndex=2">
          <a href="javascript:void(0)" class="icon" :class="[selectIndex==2?'icon-select_square_active':'icon-select_square']"></a>
          <img src="../../assets/images/product/card_gold.png" alt="" />
        </div>
      </div>
      <div class="agreement-checkbox row row-center" @click="isAgreement=!isAgreement">
        <a href="javascript:void(0)" class="icon" :class="[isAgreement?'icon-select_square_active':'icon-select_square']"></a>
        我已阅读会员【<a href="javascript:void(0)" @click.prevent="goAgreement">用户须知协议</a>】
      </div>
      <div class="agreement-box" @click="handleAgreement">
        <a href="javascript:void(0)" class="agreement-btn">确&nbsp;认</a>
      </div>
    </div>
  </van-dialog>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectIndex: 0,
      isAgreement: false,
      showDialog: false
    };
  },
  components: {},
  watch: {
    show: function(nVal) {
      this.showDialog = nVal;
    }
  },
  methods: {
    handleAgreement() {
      let { isAgreement } = this;

      let map = ["normal", "silver", "gold"];
      if (!isAgreement) {
        this.$toast("请先阅读并同意协议");
        return;
      }

      this.$emit("createVipUser", map[this.selectIndex]);
    },
    goAgreement() {
      window.location.href = "/ttz/agreement";
    }
  },
  created() {}
};
</script>
<style scoped lang='less'>
.dialog-item {
  width: 660px;
  height: 900px;

  //   background-color: #fff;
  //   border-radius: 20px;
  //   position: relative;
  //   text-align: center;
  padding: 40px;
  background: url("../../assets/images/product/agreement_bg.png") center/cover
    no-repeat;
  box-sizing: border-box;
}
.van-dialog /deep/ {
  width: auto;
}

.close-btn {
  display: inline-block;
  position: absolute;
  right: 20px;
  top: 20px;
}
.agreement-title > img {
  display: inline-block;
  width: 358px;
}
.agreement-content-item {
  margin-bottom: 30px;
}
.agreement-content-item > img {
  display: inline-block;
  width: 300px;
  margin-left: 40px;
  cursor: pointer;
}
.agreement-checkbox > a {
  display: inline-block;
  font-size: 26px;
}
.agreement-checkbox > a:first-child {
  margin-right: 20px;
}
.agreement-btn {
  display: inline-block;
  width: 600px;
  height: 80px;
  color: #fff;
  font-size: 28px;
  vertical-align: middle;
  line-height: 80px;
  text-align: center;
  background-color: @themeColor;
}
</style>