<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-10-29 14:47:09
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-26 17:52:06
 * @description: 
 -->
<template>
  <div>
    <div class="list-item" v-for="(item,key) in info" :key="key">
      <div class="list-item-nav">
        <div class="list-item-nav-left row row-between">
          <div class="user-item row">
            <img :src="item.userHeadImg" alt="买家头像" class="user-item-avatar">
            <div class="user-item-name col col-start">
              <p class="vc-line-block text-left">{{item.buyerName}}</p>
              <p class="list-item-nav-right text-left" v-if="showDate">{{item.createdAt|format('YYYY-MM-DD')}}</p>
            </div>
          </div>
          <div class="grade-item">
            <i class="grade-item-img icon icon-rate" v-for="(i,k) in item.star" :key="i+k"></i>
          </div>
        </div>
        <!-- <p class="list-item-nav-right" v-if="showDate">{{item.createdAt|format('YYYY-MM-DD')}}</p> -->
      </div>
      <p class="user-content">{{item.comment||'好评'}}</p>
      <div class="show-item row row-start">
        <img class="show-item-img" mode='aspectFill' :src="item.img1" v-if="item.img1" alt="" @click="previewImage(item,0)">
        <img class="show-item-img" mode='aspectFill' :src="item.img2" v-if="item.img2" alt="" @click="previewImage(item,1)">
        <img class="show-item-img" mode='aspectFill' :src="item.img3" v-if="item.img3" alt="" @click="previewImage(item,2)">
        <!-- <image class="show-item-img" v-for="(it,ke) in lists" :src="userIcon" @click="text" :key="ke"></image> -->
      </div>

      <div class="service-content" v-if="item.commentsAdds.length">
        <p class="service-title row"><i class="icon icon-service vc-line-block"></i> <span>客服回复</span> </p>
        <p class="service-des">
          {{item.commentsAdds[0].content}}
        </p>
      </div>

      <!-- 图片预览 -->
      <van-image-preview v-model="show" :images="imagePreviewList" @change="changePreviewImage" :show-indicators='true' :close-on-popstate='true'>
        <template v-slot:index>{{ imagePreviewIndex+1 }}/{{imagePreviewList.length}}</template>
        <!-- <template v-slot:cover></template> -->
      </van-image-preview>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    showDate: {
      type: Boolean,
      default: true
    },
    info: {
      type: Array,
      default: []
    }
  },
  components: {},
  data() {
    return {
      lists: [1, 2, 3, 4, 5],
      star: "",
      unStart: "",
      userIcon: "",
      show: false,
      imagePreviewList: [],
      imagePreviewIndex: 0
    };
  },
  methods: {
    changePreviewImage(index) {
      this.imagePreviewIndex = index;
    },
    previewImage(item, index) {
      let data = [];
      item.img1 && data.push(item.img1);
      item.img2 && data.push(item.img2);
      item.img3 && data.push(item.img3);
      this.imagePreviewList = data;
      this.show = true;
    }
  },
  created() {}
};
</script>

<style scoped lang='less'>
.list-item {
  background-color: #fff;
  border-bottom-color: @lineColor;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  padding: 20px;
  box-sizing: border-box;
  width: 750px;
  &-nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &-left {
      flex: 1;
      display: flex;
      flex-direction: row;
    }
    &-right {
      width: 200px;
      font-size: 24px;
      font-weight: 300;
      // text-align: right;
      //   color: @color-text-caption;
    }
  }
}
.user-item {
  box-sizing: border-box;
  font-size: 0;
  text-align: left;
  &-name {
    // color: @color-text-title;
    font-size: 28px;
    font-weight: bold;
    & > p {
      width: 100%;
      padding: 5px 0;
    }
  }
  &-avatar {
    display: inline-block;
    width: 64px;
    height: 64px;
    border-radius: 32px;
    object-fit: contain;
    margin-right: 10px;
  }
}
.grade-item {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  // flex: 1;

  &-img {
    width: 29px;
    height: 29px;
    margin-right: 20px;
  }
}

.user-content {
  font-size: 26px;
  color: @color-text-title;
  text-align: left;
  line-height: 39px;
  max-height: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  // /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  // /* autoprefixer: on */
  word-wrap: break-word;
}

.show-item {
  flex-direction: row;
  flex-wrap: wrap;
  padding-right: 20px;
  &-img {
    width: 150px;
    height: 150px;
    margin-top: 10px;
    object-fit: contain;
    margin-right: 10px;
  }
}

.service-content {
  background-color: @pageBgColor;
  border-radius: 8px;
  font-size: 24px;
  text-align: left;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 20px;
}
.service-title {
  font-weight: bolder;
  line-height: 50px;
}
.service-title > i {
  margin-right: 10px;
}
.service-des {
  line-height: 39px;
  max-height: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  // /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  // /* autoprefixer: on */
  word-wrap: break-word;
}
</style>
