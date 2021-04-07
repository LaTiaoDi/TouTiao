<template>
  <div class="comment-post">
    <van-field class="post-field"
               v-model.trim="message"
               rows="2"
               autosize
               type="textarea"
               maxlength="50"
               placeholder="优质评论将会被优先展示"
               show-word-limit />
    <van-button type="primary"
                plain
                class="post-btn"
                size="small"
                :disabled='!message'
                @click='addcomment'>发布</van-button>
  </div>
</template>

<script>
import { postAddComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  inject: {
    art_id: {
      type: [Number, String, Object],
      default: null
    }
  },
  components: {},
  props: {
    id: {
      type: [Object, String, Number],
      required: true
    }
  },
  data() {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async addcomment() {
      try {
        const { data } = await postAddComment({
          target: this.id,
          content: this.message,
          art_id: this.art_id ? this.art_id.toString() : null
        })
        this.$toast.success('发表评论成功')
        this.$emit('success', data)
        this.message = ''
      } catch (error) {
        console.log('发布失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  padding: 25px;
  align-items: center;
  .post-field {
    background: #f5f7f9;
  }
  .post-btn {
    width: 120px;
    border: none;
    padding: 0;
    color: #6ba3d8;
  }
}
</style>

