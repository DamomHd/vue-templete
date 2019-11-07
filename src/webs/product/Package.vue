<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-10-29 14:40:21
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-10-29 14:40:33
 * @description: 
 -->
<template>
  <!-- <div> -->
  <swiper class="swiper" :indicator-dots="indicatorDots" :indicator-active-color='themeColor' :autoplay="autoplay" :interval="interval" :duration="duration" :circular='circular' :style="{height:height+'px'}">
    <!-- v-for="(item,index) in images" :key="index" -->
    <block v-for="(item,index) in images" :key="index">
      <swiper-item>
        <div class="package_item" hover-class='hover' @click="target(item.id)">
          <div class="package_item-img col">
            <image :src="item.imgUrl" alt="" class="col-img"></image>
          </div>
          <div class="package_item-content">
            <p>{{item.name}}</p>
            <p>{{item.discount}}</p>
          </div>
        </div>
      </swiper-item>
    </block>
  </swiper>
  <!-- </div> -->
</template>
<script>
export default {
  props: {
    images: {
      type: Array,
      default: []
    },
    height: {
      type: [String, Number],
      default: 750
    }
  },
  data() {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      themeColor: "#d8354f",
      circular: true
    };
  },
  methods: {
    target(id) {
      //   wx.navigateTo({ url: "/pages/product/main?id=" + id });
    }
  },
  created() {}
};
</script>
<style scoped lang='less'>
// @import "~@/utils/common.less";
.swiper {
  width: 750px;
  height: 260px;
  position: relative;
  background-color: #fff;
}
.slide-image {
  width: 750px;
  height: 260px;
}

.package_item {
  display: flex;
  width: 100%;
  overflow-x: hidden;
  flex-direction: row;
  align-items: center;
  height: 280px;
  box-sizing: border-box;
  padding: 30px 20px;
}
.package_item > img {
  display: inline-block;
  width: 100%;
}
.package_item-img {
  width: 240px;
  height: 240px;
}
.package_item-content {
  flex: 1;
  display: flex;
  align-items: flex-start;
  text-align: left;
  max-width: 580px;
  padding-left: 20px;
  overflow: hidden;
  flex-direction: column;
}
.package_item-content > p:first-child {
  color: #333;
  font-size: 16px;
  width: 50vw;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.package_item-content > p:last-child {
  color: #d8354f;
  font-size: 16px;
}
</style>
