<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-03 15:41:02
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-12 17:43:01
 * @description: 
 -->

<template>
  <div class="container">
    <p>{{10|roundPrice}}</p>
    <router-link :to="{path:'test',query:{id:'7okip71w'}}">{{' 测试     '|trim('AROUND')}}</router-link>
    <div class="test icon icon-car">

    </div>
    <a href="javascript:void(0)" class="css-item icon icon-car">CSS交互效果</a>
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
    async init() {
      this.$toast("提示信息");
      this.a = this.list.filter(item => item.id > 2);
      console.log(this.list.includes(item => item.id === 3));
      let res = await GetUserInfo({
        userName: "17625580369",
        password: "123456"
      });
    },
    imgMsg(val) {
      console.log(val);
    }
  },
  created() {
    this.init();
  }
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
.css-item:hover {
  opacity: 0.6;
}

.test {
  width: 60px;
  height: 60px;
}
</style>
