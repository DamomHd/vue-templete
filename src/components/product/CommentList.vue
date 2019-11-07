<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-10-29 14:47:09
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-07 16:10:49
 * @description: 
 -->
<template>
  <div>
    <div class="list-item" v-for="(item,key) in info" :key="key">
      <div class="list-item-nav">
        <div class="list-item-nav-left">
          <div class="user-item">
            <p class="user-item-name">{{item.buyerName}}</p>
          </div>
          <div class="grade-item">
            <!-- <img :src="star" class="grade-item-img" v-for="(i,k) in lists" :key="k" /> -->
            <van-rate v-model="item.star" />
          </div>
        </div>
        <p class="list-item-nav-right" v-if="showDate">{{item.createdAt|format('YYYY-MM-DD')}}</p>
      </div>
      <p class="user-content">{{item.comment||'好评'}}</p>
      <div class="show-item row row-start">
        <img class="show-item-img" mode='aspectFill' :src="item.img1" v-if="item.img1" alt="" @click="previewImage(item,0)">
        <img class="show-item-img" mode='aspectFill' :src="item.img2" v-if="item.img2" alt="" @click="previewImage(item,1)">
        <img class="show-item-img" mode='aspectFill' :src="item.img3" v-if="item.img3" alt="" @click="previewImage(item,2)">
        <!-- <image class="show-item-img" v-for="(it,ke) in lists" :src="userIcon" @click="text" :key="ke"></image> -->
      </div>
    </div>
  </div>
</template>
<script>
// import { STARGRADE_ICON, STARUNGRADE_ICON, USER_ICON } from "@/utils/iconImg";

import { Rate, ImagePreview } from "vant";
export default {
  props: {
    showDate: {
      type: Boolean,
      default: true
    },
    info: {
      type: Array,
      default: []
    }
  },
  components: {
    "van-rate": Rate
  },
  data() {
    return {
      lists: [1, 2, 3, 4, 5],
      star: "",
      unStart: "",
      userIcon: ""
    };
  },
  methods: {
    text() {},
    previewImage(item, index) {
      let data = [];
      item.img1 && data.push(item.img1);
      item.img2 && data.push(item.img2);
      item.img3 && data.push(item.img3);
      ImagePreview({
        images: data,
        startPosition: index,
        onClose() {
          // do something
        }
      });
    }
  },
  created() {}
};
</script>

<style scoped lang='less'>
.list-item {
  background-color: #fff;
  border-bottom-color: @lineColor;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  padding-bottom: 30px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  width: 750px;
  &-nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &-left {
      flex: 1;
      display: flex;
      flex-direction: row;
    }
    &-right {
      width: 200px;
      font-size: 24px;
      text-align: right;
      //   color: @color-text-caption;
    }
  }
}
.user-item {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  &-name {
    // color: @color-text-title;
    font-size: 24px;
  }
}
.grade-item {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  flex: 1;

  &-img {
    width: 29px;
    height: 29px;
    margin-right: 20px;
  }
}

.user-content {
  font-size: 26px;
  color: @color-text-title;
  text-align: left;
  line-height: 40px;
}

.show-item {
  flex-direction: row;
  flex-wrap: wrap;
  padding-right: 20px;
  &-img {
    width: 150px;
    height: 150px;
    margin-top: 10px;
    object-fit: contain;
  }
}
</style>
