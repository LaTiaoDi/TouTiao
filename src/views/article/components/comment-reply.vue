<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar title="条回复">
      <van-icon slot="left"
                name="cross"
                @click="$emit('click-close')" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <van-cell>
      <van-image slot="icon"
                 round
                 width="30"
                 height="30"
                 style="margin-right: 10px;"
                 :src="comment.aut_photo" />
      <span style="color: #466b9d;"
            slot="title">{{ comment.aut_name }}</span>
      <div slot="label">

        <p style="color: #363636;">{{ comment.content }}</p>
        <p>

          <span style="margin-right: 10px;">{{ comment.pubdate | relativeTime }}</span>
        </p>
      </div>
    </van-cell>
    <!-- /当前评论项 -->

    <van-cell title="所有回复" />

    <!-- 评论的回复列表 -->
    <comment-article :articleId="comment.com_id"
                     type='c'
                     :list='commentList' />
    <!-- /评论的回复列表 -->

    <!-- 底部 -->
    <div class="post-wrap">
      <van-button type="default"
                  size="small"
                  class="post-btn"
                  @click="ispostShow = true">写评论</van-button>
    </div>
    <!-- /底部 -->
    <!-- 发表评论弹出 -->
    <van-popup v-model="ispostShow"
               position="bottom">

      <comment-post :id='comment.com_id'
                    @success="addGada" />

    </van-popup>
    <!-- 发表评论弹出 end -->
  </div>

</template>

<script>
import commentPost from './comment-post'
import commentArticle from './article-comment'
export default {
  name: 'CommentReply',
  components: {
    commentArticle,
    commentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ispostShow: false,
      commentList: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    addGada(data) {
      console.log(data.data.new_obj)
      this.ispostShow = false
      this.commentList.unshift(data.data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1.17333rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 0.01333rem solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>

