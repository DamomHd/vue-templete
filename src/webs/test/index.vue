<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-05 11:39:40
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-15 18:14:03
 * @description: 
 -->
<template>
  <div class="skeleton">
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
.skeleton {
  width: 750px;
}

//各个占位元素的位置
@skeleton-position: 570px 30px, 650px 30px, 20px 130px, 20px 200px;
@skeleton-size: 60px 60px, 60px 60px, 406px 40px, 702px 40px;
.skeleton:empty {
  height: calc(100vh - 100px);
  background-repeat: no-repeat;
  background-image: linear-gradient(
      90deg,
      rgba(
          @skeleton-theme-color-r,
          @skeleton-theme-color-g,
          @skeleton-theme-color-b,
          0
        )
        0,
      rgba(
          @skeleton-theme-color-r,
          @skeleton-theme-color-g,
          @skeleton-theme-color-b,
          0.5
        )
        50%,
      rgba(
          @skeleton-theme-color-r,
          @skeleton-theme-color-g,
          @skeleton-theme-color-b,
          0
        )
        100%
    ),
    radial-gradient(
      circle 30px at center,
      @skeleton-fill-color 99%,
      transparent 0
    ),
    //头像
      radial-gradient(
        circle 30px at center,
        @skeleton-fill-color 99%,
        transparent 0
      ),
    //头像
      linear-gradient(@skeleton-fill-color 40px, transparent 0),
    //标题
      linear-gradient(@skeleton-fill-color 40px, transparent 0),
    //标题
      linear-gradient(@skeleton-theme-color 100%, transparent 0);
  //填充块大小
  background-size: 200px 300px, @skeleton-size, 100% 100%;
  //填充块位置
  background-position: -200% 0, @skeleton-position, 0 0;
  -webkit-animation: loading 1.5s linear infinite alternate;
  animation: loading 1.5s linear infinite alternate;
  box-shadow: 0 10px 45px rgba(0, 0, 0, 0.1);
}

@keyframes loading {
  to {
    background-position: 200% 100%, @skeleton-position, 0 0;
    opacity: 0.5;
  }
}

// @-webkit-keyframes loading {
//   to {
//     background-position: 200% 100%, @skeleton-position;
//     opacity: 0.5;
//   }
// }
</style>