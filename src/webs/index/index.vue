<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-03 15:41:02
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-20 21:57:56
 * @description: 
 -->

<template>
  <div class="container">
    <p>{{10|roundPrice}}</p>
    <!-- <router-link :to="{path:'/',query:{id:'7okip71w'}}">{{' 测试     '|trim('AROUND')}}</router-link> -->

    <p class="css-item hover">CSS交互效果</p>

  </div>

</template>
<script>
import { GetUserInfo } from "@/api/login";

export default {
  name: "index",
  props: {},
  data() {
    return {
      a: [],
      list: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      imgList1: [
        {
          id: 1,
          src:
            "//img1.360buyimg.com/da/jfs/t1/4436/26/9691/78074/5bad0668E7ce89ec6/c234b749ae9e7332.jpg"
        }
      ],
      number: 4
    };
  },
  components: {},
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
/deep/ .nut-imagepicker .img-list .img-item {
  width: 100px !important;
}
.container {
  padding-top: 50px;
}
.css-item {
  display: inline-block;
  width: 750px;
  height: 100px;
  background: @themeColor;
  color: #fff;
  line-height: 100px;
  margin-top: 100px;
}
.css-item:active {
  background-color: #fff;
  color: @themeColor;
}

.test {
  width: 60px;
  height: 60px;
}
</style>
