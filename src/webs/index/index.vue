<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-03 15:41:02
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-12-18 11:50:36
 * @description: 
 -->

<template>
  <div class="container">
    <van-swipe width="375" :loop="false">
      <van-swipe-item v-for="(item,index) in images" :key="index" class="swiper-item">
        <img :src="item" alt="" class="swiper-image">
      </van-swipe-item>
    </van-swipe>
  </div>

</template>
<script>
import { GetUserInfo } from "@/api/login";
import { Swipe, SwipeItem } from "vant";
export default {
  name: "index",
  props: {},
  data() {
    return {
      images: [
        "http://img.gaindewo.com/96c7d1c9-290c-45f5-b1d5-c570a29ee3da.png",
        "http://img.gaindewo.com/39a54105-663b-41a9-bee6-0e7d1dd2c6e2.png",
        "http://img.gaindewo.com/b7f1ec86-d206-4fb9-a069-435aab50f6f3.jpg"
      ]
    };
  },
  components: {
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem
  },
  methods: {
    init() {
      console.log("初始化");
    }
  },
  watch: {
    $route: {
      handler: "init",
      immediate: true
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
.test {
  width: 60px;
  height: 60px;
}
.van-swipe /deep/ .van-swipe__track {
}
.swiper-item {
  box-sizing: border-box;
  background-color: aquamarine;
  margin: 0 25px;
}

.swiper-image {
  display: block;
  box-sizing: border-box;
  width: 100%;
  max-height: 750px;
  font-size: 0;
}
</style>
