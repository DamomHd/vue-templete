<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-11-18 20:44:11
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-18 20:55:44
 * @description: 
 -->
<template>
  <ul>

  </ul>
</template>
<script>
export default {
  data() {
    return {
      users: {}
    };
  },
  methods: {
    click() {
      console.log("前端公虾米");
    }
  },
  created() {
    addEventListener("click", this.click, false);
  },
  beforeDestroy() {
    removeEventListener("click", this.click, false);
  }
};
</script>
