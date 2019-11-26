<!--
 * @Author: shenxsh
 * @Date: 2019-05-31 10:21:03
 * @LastEditTime: 2019-11-26 15:33:20
 * @LastEditors: vincent_Huanghd@126.com
 * @Description: 常用的swiper移动端效果
 -->
<template>
  <div class="package-container">
    <swiper class="box-container" :options="swiperOption" ref="mySwiper" v-if="info.length">
      <swiper-slide v-for="(item, index) in info" :key="index" class="swiper-item">
        <img :src="item.imgUrl" alt="" @click.stop="$emit('goPackage',item.id)">
      </swiper-slide>
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      <div class="swiper-button-prev swiper-button-white swiper-button-item" slot="button-prev" @click.stop="prev"></div>
      <div class="swiper-button-next swiper-button-white swiper-button-item" slot="button-next" @click.stop="next"></div>
      <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
    </swiper>
    <div v-if="info.length">
      <p class="pageage-title">{{info[activeIndex]['name']}}</p>
      <p class="pageage-content">最多省&yen;{{info[activeIndex]['discount']}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "package",
  props: {
    info: {
      default: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    let _this = this;
    return {
      activeIndex: 0,
      swiperOption: {
        // notNextTick: true,
        autoplay: {
          // 自动播放
          delay: 1000,
          // stopOnLastSlide: false,
          disableOnInteraction: false
        },
        slidesPerView: "auto",
        init: false,
        centeredSlides: true,
        // spaceBetween: 20,
        loop: true, // 循环
        directionType: "horizontal", // 方向
        // pagination: {
        //   // 分页器
        //   el: ".swiper-pagination",
        //   type: "bullets",
        //   clickable: true
        // },
        //小手掌抓取滑动
        grabCursor: true,

        navigation: {
          // 左右按钮
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        observer: true, // 启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
        observeParents: true, // 将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。
        setWrapperSize: true // Swiper使用flexbox布局(display: flex)，
        // 开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
      }
    };
  },
  mounted() {
    this.initSwiper();
  },
  methods: {
    prev() {
      this.mySwiper.slidePrev();
      this.activeIndex = this.mySwiper.realIndex;
    },
    next() {
      this.mySwiper.slideNext();
      this.activeIndex = this.mySwiper.realIndex;
    },
    initSwiper() {
      this.$nextTick(async () => {
        await this.mySwiper.init(); // 现在才初始化
        await this.mySwiper.slideTo(this.activeIndex);
      });
    }
  },
  computed: {
    mySwiper() {
      return this.$refs.mySwiper.swiper;
    }
  }
};
</script>
<style lang="less" scoped>
.swiper-image {
  width: 100%;
  height: 270px;
}
/deep/ .swiper-slide.swiper-item {
  width: 660px !important;
  margin: 0 10px !important;
}
.swiper-slide.swiper-item img {
  display: inline-block;
  width: 100%;
  max-height: 240px;
  object-fit: contain;
  cursor: pointer;
}
/deep/ .swiper-button-prev.swiper-button-item,
/deep/.swiper-button-next.swiper-button-item {
  background-color: rgba(000, 000, 000, 0.5);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-size: 20px;
}
/deep/ .swiper-button-prev.swiper-button-item {
  left: 50px;
}
/deep/.swiper-button-next.swiper-button-item {
  right: 50px;
}
.package-container {
  background-color: #fff;
  padding-bottom: 20px;
}
.pageage-title {
  font-size: 30px;
  font-weight: 500;
  color: rgba(85, 85, 85, 1);
}
.pageage-content {
  font-size: 24px;
  font-weight: 500;
  color: @themeColor;
  line-height: 50px;
}
</style>
