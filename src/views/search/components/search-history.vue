<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span v-show="isDeleteShow"
            @click='isDeleteShow = !isDeleteShow'>编辑</span>
      <span v-show='!isDeleteShow'
            @click="$emit('delHistory',[])">全部删除</span>
      <span v-show='!isDeleteShow'
            @click='isDeleteShow = !isDeleteShow'>完成</span>
      <van-icon name="delete" />
    </van-cell>
    <van-cell :title="item"
              v-for="(item,index) in searchHistory"
              :key='index'
              @click='deleteHistory(item,index)'>
      <van-icon name="close"
                v-show='!isDeleteShow' />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: true
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    deleteHistory(data, index) {
      if (this.isDeleteShow) {
        //访问历史记录
        console.log(data)
        this.$emit('search', data)
      } else {
        // 删除历史记录
        this.searchHistory.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>

