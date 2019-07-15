<template>
  <div>
    <div v-for="item in a ">
      {{item}}
    </div>
    <router-link :to="{path:'test'}">跳转测试</router-link>
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
      list: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
    };
  },
  components: {},
  methods: {
    async init() {
      this.a = this.list.filter(item => item.id > 2);

      let res = await GetUserInfo();
    }
  },
  created() {
    this.init();
  }
};
</script>
