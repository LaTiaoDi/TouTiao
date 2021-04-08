<template>
  <div>
    <van-nav-bar title="设置昵称"
                 left-text="取消"
                 right-text="确定"
                 left-arrow
                 @click-left="onClickLeft"
                 @click-right="onClickRight" />
    <van-cell-group>
      <div class="warp">
        <van-field v-model="message"
                   rows="2"
                   autosize
                   type="textarea"
                   maxlength="7"
                   placeholder="请输入留言"
                   show-word-limit />
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import { patchUser } from '@/api/user'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return { message: this.value }
  },
  methods: {
    onClickLeft() {
      this.$emit('exit')
    },
    async onClickRight() {
      //修改昵称请求

      try {
        await patchUser({
          name: this.message
        })
        this.$toast.success('修改成功')
        this.onClickLeft()
        this.$emit('input', this.message)
      } catch (error) {
        console.log('修改用户名失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.warp {
  padding: 25px;
  background-color: #f5f7f9;
}
</style>