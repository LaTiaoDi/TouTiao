<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!--
      Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
     -->
    <form action="/">
      <van-search v-model="searchText"
                  show-action
                  placeholder="请输入搜索关键词"
                  background="#3296fa"
                  @search="onSearch"
                  @cancel="onCancel"
                  @focus='searchEnter = false' />
    </form>
    <!-- /搜索栏 -->
    <search-result v-if="searchEnter"
                   :search-text='searchText' />
    <!-- 搜索历史记录 -->

    <!-- /搜索历史记录 -->

    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText"
                       :search-text='searchText'
                       @search='suggestionText' />
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <search-history v-else />
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'

export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data() {
    return {
      searchEnter: false,
      searchText: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearch(val) {
      this.searchEnter = true
      console.log(val)
    },
    onCancel() {
      this.$router.back()
    },
    suggestionText(data) {
      this.searchText = data
      this.searchEnter = true
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>

