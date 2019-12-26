<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-12-25 15:02:57
 * @LastEditors  : vincent_Huanghd@126.com
 * @LastEditTime : 2019-12-25 15:10:11
 * @description: 
 -->
<template>
  <van-swipe :autoplay="3000" indicator-color="white">
    <van-swipe-item>1</van-swipe-item>
    <van-swipe-item>2</van-swipe-item>
    <van-swipe-item>3</van-swipe-item>
    <van-swipe-item>4</van-swipe-item>
  </van-swipe>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";

Vue.use(Swipe).use(SwipeItem);
export default {
  props: {},
  data() {
    return {};
  },
  //   components: {
  //     "van-swipe": Swipe,
  //     "van-swipe-item": SwipeItem
  //   },
  methods: {},
  created() {}
};
</script>
<style scoped lang='less'>
</style>