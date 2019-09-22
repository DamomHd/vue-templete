<template>
  <div class="container">
    <div class="list-item row row-between">
      <p class="form-title">注册账号</p>
      <input type="number" placeholder="请输入手机号" v-model.trim="phone" class="form-input" />
    </div>
    <div class="list-item row row-between">
      <p class="form-title">验证码</p>
      <input type="number" placeholder="请输入验证码" class="form-input" v-model.trim="code" />
      <a href="javascript:void(0)" class="form-code" :class="[isGettingCode?'disabled':'']" @click="getCode">{{codeTitle}}</a>
    </div>
    <div class="form-ft">
      <a href="javascript:void(0)" class="hover submit-btn" :class="[isValidate?'':'disabled']" @click="submit">确&nbsp;&nbsp;定</a>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      isGettingCode: false,
      phone: "176123456",
      code: "",
      codeTitle: "获取验证码"
    };
  },
  computed: {
    isValidate() {
      let { code, pwd, chkPwd, phone } = this;
      return (
        /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(phone) && /^[0-9]{6}$/.test(code)
      );
    }
  },
  components: {},
  methods: {
    getCode() {
      let { phone, isGettingCode } = this;
      if (!isGettingCode) {
        // 先发送验证码
        this.isGettingCode = true;
        this.countdownTimer();
      } else {
      }
    },
    //倒计时
    countdownTimer(bool, downTime = 60) {
      if (downTime == 0) {
        this.isGettingCode = false;
        this.codeTitle = "获取验证码";
        clearTimeout(meter);
      } else {
        this.codeTitle = downTime + "s";
        downTime--;
      }
      let meter = setTimeout(
        event => this.countdownTimer(bool, downTime),
        1000
      );
    },

    submit() {
      let { phone, code, pwd, chkPwd } = this;
      if (!phone) {
        alert("手机号不能为空");
        return;
      }

      //发送注册请求

      //注册成功跳转登录页
      this.$route.push({ path: "/login" });
    }
  },
  created() {}
};
</script>
<style scoped >
.container {
  width: 100%;
  font-size: 18px;
}
/* .list-item {
  height: 0.4rem;
  border-bottom: 1px solid #eceff1;
  padding: 0 0.1rem;
  background-color: #fff;
}
.form-title {
  width: 0.65rem;
  color: #999;
  height: 0.4rem;
  line-height: 4rem;
}
.form-input {
  flex: 1;
  background-color: transparent;
  border: none;
  display: inline-block;
  height: 0.4rem;
  color: #333;
}
.form-code {
  display: inline-block;
  width: 0.8rem;
  height: 0.35rem;
  line-height: 0.35rem;
  background-color: #fc4f4f;
  color: #fff;
  text-align: center;
}
.form-code.disabled {
  background-color: #ccc;
  color: #fff;
}
.form-ft {
  padding: 0.1rem;
  margin-top: 0.2rem;
}
.submit-btn {
  display: inline-block;
  width: 100%;
  height: 0.45rem;
  color: #fff;
  background-color: #fc4f4f;
  text-align: center;
  line-height: 0.45rem;
}
.submit-btn.disabled {
  background-color: #ccc;
} */

.submit-btn {
  display: inline-block;
  width: 100%;

  color: #fff;
  background-color: #fc4f4f;
  text-align: center;
}
.submit-btn.disabled {
  background-color: #ccc;
}
</style>