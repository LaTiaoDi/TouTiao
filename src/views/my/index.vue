<template>
  <div class="my-container">
    <div class="header">
      <!-- 未登录 -->
      <div class="no-loign"
           v-if="!user">
        <img class="mobile-img"
             src="~@/assets/mobile.png"
             @click="$router.push('/login')" />
        <p>登录&nbsp;/&nbsp;注册</p>
      </div>
      <!-- 已登录 -->
      <div class="has-login"
           v-else>
        <!-- 用户信息 -->
        <div class="user-info">
          <div class="icon">
            <van-image class="img"
                       round
                       fit="cover"
                       :src='userInfo.photo' />
            <span class="name">{{userInfo.name}}</span>
          </div>
          <router-link to="/user/profile"
                       class="edit-btn">编辑资料</router-link>
        </div>
        <!-- 用户数据 -->
        <div class="user-data">
          <router-link to="/">
            <p class="num">{{userInfo.art_count}}</p>
            <p class="name">头条</p>
          </router-link>
          <router-link to="/">
            <p class="num">{{userInfo.follow_count}}</p>
            <p class="name">关注</p>
          </router-link>
          <router-link to="/">
            <p class="num">{{userInfo.fans_count}}</p>
            <p class="name">粉丝</p>
          </router-link>
          <router-link to="/">
            <p class="num">{{userInfo.like_count}}</p>
            <p class="name">获赞</p>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 2宫格 -->
    <van-grid class="grid-item"
              :column-num="2"
              clickable>
      <van-grid-item to='/my/collect'>
        <i class="toutiao toutiao-shoucang"
           slot="icon"></i>
        <span class="text"
              slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item>
        <i class="toutiao toutiao-lishi"
           slot="icon"></i>
        <span class="text"
              slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 单元格导航 -->
    <div class="grid-nav">
      <van-cell title="消息通知"
                is-link
                to="" />
      <van-cell title="小智同学"
                is-link
                to="" />
    </div>
    <!-- 退出按钮 -->
    <van-cell v-if="$store.state.user"
              @click='quit'
              title="退出"
              class="quit-btn" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.getUser()
  },
  methods: {
    quit() {
      this.$dialog
        .confirm({
          title: '提示消息',
          message: '确定要退出吗'
        })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async getUser() {
      try {
        if (!this.user.token) return false
        const { data: res } = await getUserInfo()
        this.userInfo = res.data
        console.log(res)
      } catch (error) {
        console.log('无token数据')
        // console.log(error)
      }
    }
  },
  components: {}
}
</script>
<style scoped lang="less">
.my-container {
  > .header {
    height: 361px;
    // css中 不能简单直接使用@表示src目录，这样是无法读取，还需要加上一个~
    background: url('~@/assets/banner.png') no-repeat;
    background-size: cover;
    // 没登录
    .no-loign {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .mobile-img {
        width: 132px;
        height: 132px;
      }
      p {
        font-size: 28px;
        color: #fff;
      }
    }
    // 已登录
    .has-login {
      .user-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 76px 32px 0;
        .icon {
          display: flex;
          align-items: center;
          .img {
            width: 132px;
            height: 132px;
            background-color: #fff;
            padding: 4px;
          }
          .name {
            margin-left: 24px;
            font-size: 30px;
            color: #fff;
          }
        }
        .edit-btn {
          width: 116px;
          height: 30px;
          display: block;
          border-radius: 15px;
          background-color: #fff;
          font-size: 20px;
          color: #666;
          text-align: center;
          line-height: 30px;
        }
      }
      .user-data {
        display: flex;
        height: 130px;
        margin-top: 10px;
        a {
          flex: 1;
          text-align: center;
          color: #fff;
          .num {
            font-size: 36px;
            margin: 33px 0 10px;
          }
          .name {
            font-size: 24px;
            margin: 0;
          }
        }
      }
    }
  }
  /deep/ .quit-btn {
    margin-top: 10px;
    .van-cell__title {
      text-align: center;
      line-height: 70px;
      span {
        color: #d86262;
        font-size: 30px;
      }
    }
  }
  .grid-item {
    margin-bottom: 10px;
    .toutiao {
      font-size: 48px;
    }
    .text {
      font-size: 28px;
      margin-top: 10px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
  }
}
</style>  