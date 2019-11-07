<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-05 11:39:40
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-10-29 16:58:15
 * @description: 
 -->
<template>
  <div class="card">
    <vc-swiper></vc-swiper>
    <div class="test"></div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  created() {
    this.$toast("测试");
  }
};
</script>
<style  lang='less'>
/*
 * Variables
 */

/* 
 * Demo Stuff
 */
body {
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>