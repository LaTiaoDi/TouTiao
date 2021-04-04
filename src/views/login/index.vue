<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 title="登录"
                 left-arrow
                 @click-left="$router.back()" />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form ref="form"
              @submit="onSubmit"
              :show-error='false'>
      <van-field name="mobile"
                 clickable
                 :rules='formRules.mobile'
                 v-model="userinfo.mobile"
                 placeholder="请输入手机号">
        <i slot="left-icon"
           class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field type="text"
                 :rules='formRules.code'
                 v-model="userinfo.code"
                 name="code"
                 placeholder="请输入验证码">
        <i slot="left-icon"
           class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button v-if="isBtnShow"
                      class="send-sms-btn"
                      round
                      native-type="button"
                      size="small"
                      type="default"
                      @click='sendCode'>发送验证码</van-button>
          <van-count-down v-else
                          format="ss s"
                          :time="time"
                          @finish='isBtnShow = true' />
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn"
                    block
                    type="info"
                    native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {
      userinfo: {
        mobile: '17342065909',
        code: '246810'
      },
      formRules: {
        mobile: [
          { required: true, message: '请填写用户名' },
          {
            pattern: /^1(?:70\d|(?:9[89]|8[0-24-9]|7[135-8]|66|5[0-35-9])\d|3(?:4[0-8]|[0-35-9]\d))\d{7}$/,
            message: '手机号格式不正确'
          }
        ],
        code: [{ required: true, message: '请填写验证码' }]
      },
      isBtnShow: true,
      time: 5 * 1000
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //登陆提交请求
    async onSubmit(values) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const { data: res } = await login(values)
        console.log(res.data)
        this.$toast.success('登陆成功')
        this.$store.commit('setUser', res.data)
        const url = this.$route.query.url
        this.$router.replace(url || '/my')
      } catch (error) {
        console.dir(error)
        this.$toast.fail('登陆失败')
      }
    },
    async sendCode() {
      this.isBtnShow = false

      try {
        // 验证手机号是否正确
        await this.$refs.form.validate('mobile')
      } catch (error) {
        this.isBtnShow = true

        return this.$toast.fail(error.message)
      }
      try {
        await getSmsCode(this.userinfo.mobile)
        this.$toast.success('发送成功')
      } catch (error) {
        console.dir(error)
        this.$toast.fail('发送失败，请稍后再试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>