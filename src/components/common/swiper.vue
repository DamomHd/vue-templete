<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-10-29 10:44:05
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-22 17:36:50
 * @description: 
 -->
<!-- The ref attr used to find the swiper instance -->
<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="item in info" :key="item.imgUrl">
      <div class="carousel_img-box" :class="parent+'_height'">
        <div @click="jump(item.targetUrl)" class="row row-center">
          <img :src="item.imgUrl" alt="" class="carousel_img">
        </div>
      </div>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
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
        autoplay: true, //可选选项，自动滑动
        // loop : true,
        // autoplayDisableOnInteraction: false,
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
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
    jump(url) {
      if (url) {
        window.location.href = url;
      }
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
.swiper-pagination.swiper-pagination-fraction {
  font-size: 24px;
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
