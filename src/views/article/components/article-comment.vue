<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <!-- 评论列表 -->
    <van-list v-model="articleComment.loading"
              :finished="articleComment.finished"
              finished-text="没有更多了"
              @load="onLoad">
      <van-cell v-for="(item,index) in list"
                :key="index">
        <van-image slot="icon"
                   round
                   width="30"
                   height="30"
                   style="margin-right: 10px;"
                   :src="item.aut_photo" />
        <span style="color: #466b9d;"
              slot="title">{{ item.aut_name }}</span>
        <div slot="label">

          <p style="color: #363636;">{{ item.content }}</p>
          <p>

            <span style="margin-right: 10px;">{{ item.pubdate | relativeTime }}</span>
            <van-button size="mini"
                        type="default"
                        @click="$emit('replyUser',item)">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon"
                  :name="item.is_liking ? 'like' :'like-o'"
                  :class="{
                    likeColor:item.is_liking
                  }"
                  @click="likes(item)" />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->
    <!-- 评论列表 -->
  </div>
</template>

<script>
import { getComments, addCommentLike } from '@/api/comment'
export default {
  name: 'CommentList',
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  data() {
    return {
      articleComment: {
        // 文章评论相关数据

        loading: false,
        finished: false,
        offset: null, // 请求下一页数据的页码
        totalCount: 0 // 总数据条数
      }
    }
  },

  methods: {
    async onLoad() {
      const articleComment = this.articleComment
      // 1. 请求获取数据
      const { data } = await getComments({
        type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.articleId.toString(), // 源id，文章id或评论id
        offset: articleComment.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: 10 // 每页大小
      })

      // 2. 将数据添加到列表中
      const { results } = data.data

      this.list.push(...results)
      this.$emit('onload', data.data)

      // 更新总数据条数
      articleComment.totalCount = data.data.total_count

      // 3. 将加载更多的 loading 设置为 false
      articleComment.loading = false

      // 4. 判断是否还有数据
      if (results.length) {
        articleComment.offset = data.data.last_id // 更新获取下一页数据的页码
      } else {
        articleComment.finished = true // 没有数据了，关闭加载更多
      }
    },
    async likes(id) {
      try {
        id.is_liking = !id.is_liking
        await addCommentLike(id.com_id)
      } catch (error) {
        console.log('点赞失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
.likeColor {
  color: red;
}
</style>