<template>
  <div class="article-list">
    <van-pull-refresh v-model="isLoading"
                      @refresh="onRefresh"
                      success-text="刷新成功">

      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                :error.sync="error"
                error-text="请求失败，点击重新加载">
        <!-- <van-cell v-for="item in list"
                  :key="item.art_id"
                  :title="item.aut_name" /> -->

        <article-item v-for="(item,index) in list"
                      :key="index"
                      :article='item'></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'
import { getArticles } from '@/api/artcle'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        // if (Math.random() > 0.5) {
        //   JSON.parse('asdffasdf')
        // }  //测试请求失败
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        const { results } = data.data

        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
        console.log(error)
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        this.list.unshift(...data.data.results)
        this.$toast('刷新成功')
      } catch (error) {
        this.$toast('请稍再试')
      }
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  // overflow-y: auto;
  height: 100%;
}
.van-tabs__wrap {
  position: fixed;
  top: 92px;
  z-index: 1;
  left: 0;
  right: 0;
  height: 82px;
}
</style>