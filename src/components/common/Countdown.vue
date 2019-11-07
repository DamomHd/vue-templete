<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-10-29 14:10:13
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-07 18:32:20
 * @description: 
 -->
<template>
  <div class="rtb-count row " :style="{justifyContent:isCenter?'center':'flex-start'}">

    <span class="count-title" v-if="!isProductDetail" :style="color">{{title}}</span>

    <div class="count-item count-number row row-center" v-if="count.day1||count.day0">{{count.day0}}{{count.day1}}</div>

    <span class="count-unit-text count-item " v-if="count.day1||count.day0">天</span>

    <div class="count-item count-number row row-center" :style="{width:count.hour0?'66px':'44px'}">{{count.hour0||''}}{{count.hour1}}{{count.hour2}}</div>

    <span class="count-item count-unit-text">时</span>

    <div class="count-item count-number row row-center">{{count.minute0}}{{count.minute1}}</div>

    <span class="count-item count-unit-text">分</span>

    <div class="count-item count-number row row-center">{{count.second0}}{{count.second1}}</div>

    <span class="count-unit-text count-item ">秒</span>
  </div>

</template>
<script>
/* eslint-disable no-new */

export default {
  name: "countDown",
  props: {
    endTime: {
      type: [String, Number],
      default: ""
    },
    title: {
      type: String,
      default: "获德秒杀"
    },
    //水平对齐方式
    isCenter: {
      type: Boolean,
      default: false
    },
    isProductDetail: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "#333"
    }
  },
  data() {
    return {
      deadLine: 0
    };
  },
  methods: {
    subOne() {
      const t = setTimeout(() => {
        clearTimeout(t);
        const deadLine = this.endTime - new Date().getTime();
        if (deadLine > 0) {
          this.deadLine = deadLine;
          this.subOne();
        }
      }, 1000);
    }
  },
  mounted() {},
  computed: {
    count() {
      const s = parseInt(this.deadLine / 1000);
      const days = Math.floor(s / 3600 / 24);
      const hours = Math.floor((s / 3600) % 24);
      const min = Math.floor((s % 3600) / 60);
      const seconds = s % 60;
      return {
        day0: Math.floor(days / 10),
        day1: Math.floor(days % 10),
        hour0: Math.floor(hours / 100),
        hour1: Math.floor((hours % 100) / 10),
        hour2: Math.floor(hours % 10),
        minute0: Math.floor(min / 10),
        minute1: Math.floor(min % 10),
        second0: Math.floor(seconds / 10),
        second1: Math.floor(seconds % 10)
      };
    }
  },
  watch: {},
  components: {},
  created() {
    this.deadLine = Math.max(0, this.endTime - new Date().getTime());
    this.subOne();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rtb-count {
  /*flex: 1 1;*/
  /* height: .13px; */
  padding: 13px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.count-title {
  font-size: 30px;
  color: #333333;
  font-weight: bold;
  margin-right: 15px;
  padding-left: 20px;
}
.count-unit-text {
  color: #666;
}
.count-item {
  margin: 0 0.015px;
  /* line-height: 1; */
  font-size: 20px;
  color: #fc5a4f;
}
.count-number {
  box-sizing: border-box;
  min-width: 44px;
  line-height: 44px;
  text-align: center;
  height: 44px;
  border-radius: 4px;
  /* border: 1px solid #ccc; */
  color: #fff;
  background-color: #fc5a4f;
  font-size: 30px;
}
</style>
