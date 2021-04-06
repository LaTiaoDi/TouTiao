<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 left-arrow
                 @click-left="onClickLeft"
                 title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap"
           v-if="loading">
        <van-loading color="#3296fa"
                     vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail"
           v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info"
                  center
                  :border="false">
          <van-image class="avatar"
                     slot="icon"
                     round
                     fit="cover"
                     :src="article.aut_photo" />
          <div slot="title"
               class="user-name">{{article.aut_name}}</div>
          <div slot="label"
               class="publish-date">{{article.pubdate | relativeTime}}</div>

          <follow-user :is-followed='article.is_followed'
                       :aut_id='article.aut_id' />
          <!-- <van-button v-if="!article.is_followed"
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
                      @click='btnFollow'>已关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body"
             ref="articleCt"
             v-html="article.content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论功能 -->
        <comment-article :articleId="articleId"
                         @onload='EventCommentList'
                         :list='commentList' />
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn"
                      type="default"
                      round
                      size="small"
                      @click='ispostShow = true'>写评论</van-button>
          <van-icon name="comment-o"
                    :info="commentCount"
                    color="#777" />
          <!-- <van-icon color="#777"
                    name="star-o" /> -->
          <collect-article v-model="article.is_collected"
                           :id='article.art_id' />
          <!-- <van-icon color="#777"
                    name="good-job-o" /> -->
          <like-artcle v-model="article.attitude"
                       :id='article.art_id' />
          <van-icon name="share"
                    color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap"
           v-else-if="status ==404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap"
           v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn"
                    @click='getXx'>点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <van-popup v-model="ispostShow"
               position="bottom">

      <post-comment :id='article.art_id'
                    @success='onPostSuccess' />
    </van-popup>
  </div>
</template>

<script>
import postComment from './components/comment-post'
import commentArticle from './components/article-comment'
import collectArticle from '@//components/collect-article'
import followUser from '@/components/follow-user'
import likeArtcle from '@//components/like-article'
import { getDetail } from '@/api/artcle'
import { ImagePreview } from 'vant'
export default {
  name: 'ArticleIndex',
  components: {
    followUser,
    collectArticle,
    likeArtcle,
    commentArticle,
    postComment
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      article: {}, //文章详细
      loading: true,
      status: 'gada',
      BtnLoading: false,
      commentCount: 0,
      ispostShow: false, //评论列表控件
      commentList: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getXx()
  },
  mounted() {},
  methods: {
    // 获取文章详细函数
    async getXx() {
      this.loading = true
      this.status = ''
      try {
        //发送请求文章数据
        const { data } = await getDetail(this.articleId)

        this.article = data.data //赋值给变量，让vant渲染页面
        setTimeout(() => {
          // 获取数据到渲染页面有延迟，用定时器延迟获取
          this.perviewImage()
        }, 0)
        this.loading = false
      } catch (error) {
        console.dir(error)
        if (error.response.status === 404) {
          this.status = 404
        }
        ;(this.loading = false), console.log('获取文章详细失败')
      }
    },
    onPostSuccess(data) {
      // 评论添加组件发送请求
      this.ispostShow = false
      //评论列表头部添加评论内容
      this.commentList.unshift(data.data.new_obj) //
    },
    onClickLeft() {
      this.$router.back()
    },
    perviewImage() {
      //图片切换插件
      const ac = this.$refs.articleCt
      const img = ac.querySelectorAll('img')
      const images = []
      img.forEach((element, index) => {
        images.push(element.dataset.src)
        element.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    EventCommentList(data) {
      this.commentList = data.results
      this.commentCount = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>

