<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title"
           class="title-text">我的频道</div>
      <van-button class="edit-btn"
                  type="danger"
                  plain
                  round
                  @click='isEdit = !isEdit'
                  size="mini">{{ isEdit ? "完成":"编辑 "}}</van-button>
    </van-cell>
    <van-grid class="my-grid"
              :gutter="10">
      <van-grid-item class="grid-item"
                     @click='btnChange(item,index)'
                     v-for="(item,index) in myChannels"
                     :key='item.id'>
        <van-icon slot="icon"
                  v-show="isEdit && !isShow.includes(item.id)"
                  name="clear"></van-icon>
        <span class="text"
              :class="{active:index ==active }"
              slot="text">{{item.name}}</span>
      </van-grid-item>

    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title"
           class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid"
              :gutter="10">
      <van-grid-item v-for="item in recommendChannels"
                     @click='add(item)'
                     :key='item.id'
                     class="grid-item"
                     icon="plus"
                     :text="item.name" />
    </van-grid>
    <!-- /频道推荐 -->

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { addUserChannel, getAllChannels, deleteChannels } from '@/api/channel'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
      isShow: [0]
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      const channels = []
      this.allChannels.forEach((element) => {
        const ret = this.myChannels.find((myChannels) => {
          return myChannels.id === element.id
        })
        if (!ret) {
          channels.push(element)
        }
      })
      return channels
    }
  },
  watch: {},
  created() {
    this.getAll()
  },
  mounted() {},
  methods: {
    async getAll() {
      try {
        const { data: res } = await getAllChannels()
        console.log(res)
        this.allChannels = res.data.channels
      } catch (error) {
        console.dir(error)
        console.log('请求全部数据失败')
      }
    },
    async add(data) {
      this.myChannels.push(data)
      //用户登陆存入线上地址
      if (this.user) {
        try {
          await addUserChannel([
            {
              id: data.id,
              seq: this.myChannels.length
            }
          ])
        } catch (error) {
          console.dir(error)
          console.log('添加频道失败')
        }
      } else {
        // 存入本地
        setItem('CHANNEL', this.myChannels)
      }
    },
    btnChange(item, index) {
      if (this.isEdit) {
        if (this.isShow.includes(index)) return
        if (index <= this.active) {
          console.log(index - 1)
          this.$emit('gada', this.active - 1)
          // this.$emit('gada', this.index - 1)
        }
        this.myChannels.splice(index, 1)
        this.deleteChannel(item.id) //发送删除请求函数
      } else {
        this.$emit('gada', index, false)
      }
    },
    async deleteChannel(id) {
      if (this.user) {
        try {
          await deleteChannels(id)
        } catch (error) {
          console.log(error)
          console.log('删除频道失败')
        }
      } else {
        setItem('CHANNEL', this.myChannels)
      }
    }
  }
}
</script>


<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>

