<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 fixed>
      <van-button class="search-btn"
                  slot="title"
                  type="info"
                  size="small"
                  round
                  icon="search"
                  to="search">搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 频道列表 -->
    <!-- 
      animated 滑动的动画
      border 底边框线
      swipeable 开启左右手势滑动
     -->
    <van-tabs class="channel-tabs"
              v-model="active"
              swipeable
              animated
              border>
      <!-- active选中的索引 -->
      <van-tab :title="item.name"
               v-for="item in channels"
               :key='item.id'>
        <article-list :channel='item'></article-list>
      </van-tab>
      <!-- 右侧自定义内容 -->
      <!-- 占位元素 -->
      <div slot="nav-right"
           class="placeholder"></div>
      <!-- 右侧按钮 -->
      <div slot="nav-right"
           @click='isChannelsEditShow = true'
           class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
      <div class="nav-right-placeholder"
           slot="nav-right"></div>
    </van-tabs>
    <!-- /频道列表 -->
    <!-- 弹出层 -->
    <van-popup v-model="isChannelsEditShow"
               closeable
               close-icon-position="top-left"
               position="bottom"
               :style="{ height: '100%' }">

      <channel-edit :myChannels='channels'
                    @gada='gada'
                    :active='active'></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},

  data() {
    return {
      active: 0,
      channels: [], //频道数据
      isChannelsEditShow: false //弹出层变量
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {
    this.getChannels()
  },
  mounted() {},
  methods: {
    // 获取频道列表
    async getChannels() {
      let channels = []
      if (this.user) {
        // 登陆发请求
        try {
          const { data: res } = await getUserChannels()
          channels = res.data.channels
        } catch (error) {
          console.log(error)
        }
      } else {
        if (getItem('CHANNEL')) {
          channels = getItem('CHANNEL')
        } else {
          const { data: res } = await getUserChannels()
          channels = res.data.channels
        }
      }

      this.channels = channels
    },
    gada(index, isChannelsEditShow = true) {
      this.active = index
      this.isChannelsEditShow = isChannelsEditShow
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-bottom: 192px;
  // 深度选择器问题
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
  /deep/ .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
  }
  /deep/ .van-tabs__line {
    width: 32px;
    height: 6px;
    background-color: #3296fa;
    bottom: 40px;
  }

  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 33px;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>
