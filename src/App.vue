<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-02 11:46:02
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-13 14:02:14
 * @description: 
 -->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  mounted() {},
  //移动端追加active效果
  created() {
    document.body.addEventListener("touchstart", () => {});
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}
</style>
