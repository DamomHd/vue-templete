<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-03 15:41:02
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-07-17 11:47:41
 * @description: 
 -->

<template>
  <div>
    <router-link :to="{path:'test'}">跳转测试</router-link>
    <nut-imagepicker @imgMsg="imgMsg" :imgList="imgList1">
    </nut-imagepicker>
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
      ]
    };
  },
  components: {},
  methods: {
    async init() {
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
<style lang="scss" scoped>
/deep/ .nut-imagepicker .img-list .img-item {
  width: 100px !important;
}
</style>
