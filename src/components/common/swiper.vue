<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-10-29 10:44:05
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-10-29 17:34:07
 * @description: 
 -->
<!-- The ref attr used to find the swiper instance -->
<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <!-- <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">I'm Slide {{ slide }}</swiper-slide> -->
    <swiper-slide v-for="item in swiperSlides" :key="item.imgUrl" @ontap="tap">
      <div class="carousel_img-box" :class="parent+'_height'">
        <div @click="jump(item.targetUrl)" class="row row-center hover">
          <img :src="item.imgUrl" alt="" class="carousel_img">
        </div>
      </div>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";

// require styles
import "swiper/dist/css/swiper.css";

Vue.use(VueAwesomeSwiper /* { default global options } */);
export default {
  name: "carrousel",
  props: {
    info: {
      type: Array,
      default: () => {
        [];
      }
    },
    parent: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        pagination: {
          el: ".swiper-pagination"
        }
      },
      swiperSlides: [
        {
          imgUrl:
            "http://img.gaindewo.com/220x220_5f83f6e9-8622-4ff7-ab21-760750e0e524.png",
          targetUrl: "https://www.baidu.com"
        },
        {
          imgUrl:
            "http://img.gaindewo.com/220x220_41dd1ffb-f0f6-405a-bf8c-f81f582f5153.jpg",
          targetUrl: "https://www.baidu.com"
        }
      ]
    };
  },

  methods: {
    callback(e) {
      console.log(e);
    },
    tap() {
      var tapTarget = event.target;
      console.log(swiperTest.activeIndex);
      //   if (swiperTest.activeIndex == 0 && tapTarget.tagName == "IMG") {
      //     swiperTest.autoplay.stop();
      //     $(".swiper-test")
      //       .find(".video-item")
      //       .toggle();
      //     $(".swiper-test")
      //       .find(".video-item")
      //       .parent()
      //       .find(".img-responsive")
      //       .toggle();
      //     var video = document.getElementById(".swiper-wrapper video");
      //     // video.play(); //播放控制
      //   } else if (swiperTest.activeIndex == 0 && tapTarget.tagName == "VIDEO") {
      //     // $('.swiper-test').find('.video-item').toggle();
      //     // $('.swiper-test').find('.video-item').parent().find('.img-responsive').toggle()
      //   } else {
      //     if (swiperTest.autoplay.running) {
      //       swiperTest.autoplay.stop();
      //     } else {
      //       swiperTest.autoplay.start();
      //     }
      //   }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
  }
};
</script>
<style scoped>
.swiper-box {
  /* margin-top: 0.44rem; */
  position: relative;
  height: 2rem;
}

.home_height {
  height: 2rem;
}
.integral_height {
  height: 1.2rem;
}
.carousel_img-box {
  width: 100%;
  overflow: hidden;
}
.carousel_img {
  display: block;
  /* height: 2rem; */
  width: 100%;
}
.carousel_point-container {
}
</style>
<style lang='less'>
.carousel_point {
  width: 0.05rem;
  height: 0.05rem;
  background-color: #f8fafb;
  border-radius: 100%;
  margin: 0 0.04rem;
}
.carousel_point-active {
  //   background-color: @themeColor;
}
</style>
