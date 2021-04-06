<template>
  <van-button v-if="!followed"
              class="follow-btn"
              type="info"
              color="#3296fa"
              round
              size="small"
              icon="plus"
              :loading='BtnLoading'
              @click='btnFollow'>关注</van-button>
  <van-button v-else
              class="follow-btn"
              round
              size="small"
              :loading='BtnLoading'
              @click='btnFollow'>已关注</van-button>
</template>

<script>
import { addFollow, unFollow } from '@/api/user'
export default {
  name: 'follow',
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    aut_id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      BtnLoading: false,
      followed: false
    }
  },
  methods: {
    async btnFollow() {
      //如果为true则触发取消关注
      this.BtnLoading = true
      if (this.followed) {
        try {
          await unFollow(this.aut_id)
          this.BtnLoading = false
        } catch (error) {
          console.log('取消关注失败')
          this.BtnLoading = false

          this.followed = !this.followed
        }
      } else {
        try {
          await addFollow(this.aut_id)
          this.BtnLoading = false
        } catch (error) {
          console.log('关注失败')
          this.BtnLoading = false

          this.followed = !this.followed
        }
      }
      this.followed = !this.followed
    }
  },
  created() {
    this.followed = this.isFollowed
  }
}
</script>

<style>
</style>