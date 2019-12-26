<!--
 * @Author: shenxsh
 * @Date: 2019-05-31 10:21:03
 * @LastEditTime : 2019-12-25 16:59:12
 * @LastEditors  : vincent_Huanghd@126.com
 * @Description: 常用的swiper移动端效果
 -->
<template>
  <div class="package-container">
    <van-swipe class="box-container" :loop="false" :width="width" :stop-propagation='false' :show-indicators='false' @change='changeSwiper' ref="packageSwiper">
      <van-swipe-item v-for="(item,index) in info" :key="index" class="swiper-item" @click="handleClick">
        <!-- <div>
          
        </div> -->
        <img alt="" :src="item.imgUrl" class="swiper-image">
        <!-- <div>{{index}}</div> -->
      </van-swipe-item>
    </van-swipe>
    <div class="package-info">
      <p class="package-title">{{info[activeIndex]['name']}}</p>
      <p class="package-content">最多省&yen;{{info[activeIndex]['discount']}}</p>
    </div>
    <i class="icon icon-left swiper-prev" @click="prev" v-show="info.length>1"></i>
    <i class="icon icon-right swiper-next" @click="next" v-show="info.length>1"></i>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
export default {
  name: "proPackage",
  props: {
    info: {
      type: Array,
      default: () => {
        return [];
      }
    },
    height: {
      type: [Number, String],
      default: 750
    }
  },
  components: {
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem
  },
  data() {
    let _this = this;
    return {
      activeIndex: 0,
      width: 0
    };
  },

  watch: {
    // "mySwiper.activeIndex": "test"
  },
  methods: {
    changeSwiper(index) {
      this.activeIndex = index;
    },
    prev() {
      let { activeIndex } = this;
      this.$refs.packageSwiper.swipeTo(++activeIndex);
    },
    next() {
      let { activeIndex } = this;
      this.$refs.packageSwiper.swipeTo(--activeIndex);
    },
    handleItem(e) {
      console.log(e);
    },
    handleClick(e) {
      let { activeIndex } = this;
      this.$emit("goPackage", this.info[activeIndex].id);
    }
  },
  computed: {},
  created() {
    this.width = document.body.clientWidth;
  }
};
</script>
<style lang="less" scoped>
.package-container {
  position: relative;
  width: 750px;
}
// .package-container /deep/ .van-swipe-item {
//   width: 750px;
// }
// .package-swiper {
//   width: 750px;
// }
.box-container {
  background-color: #fff;
}
.swiper-item {
  box-sizing: border-box;
  // padding: 0 25px;
}

.swiper-image {
  display: inline-block;
  box-sizing: border-box;
  width: 700px;
  height: 240px;
  margin-left: 25px;
  object-fit: contain;
  font-size: 0;
}
.package-info {
  padding: 20px 0;
  background-color: #fff;
  width: 750px;
}
.package-title {
  font-size: 30px;
  font-weight: 500;
  color: #555555;
}

.package-content {
  font-size: 24px;
  font-weight: 500;
  color: @themeColor;
  margin-top: 10px;
}
.swiper-prev {
  position: absolute;
  left: 50px;
  top: 120px;
  transform: translateY(-50%);
}
.swiper-next {
  position: absolute;
  right: 50px;
  top: 120px;
  transform: translateY(-50%);
}
</style>
