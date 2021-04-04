<template>
  <div class="search-suggestion">
    <van-cell v-for="(item,index) in suggestion"
              :key='index'
              icon="search"
              @click='$emit("search",item)'>
      <div slot="title"
           v-html="heightLight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestApi } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestion: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.getSuggest(value)
      }, 200),
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    async getSuggest(p) {
      try {
        const { data: res } = await getSuggestApi(p)
        this.suggestion = res.data.options
      } catch (error) {
        console.log('获取推荐列表失败')
      }
    },
    heightLight(data) {
      const reg = new RegExp(this.searchText, 'gi') //配置正则校验，输入的内容
      const highlightStr = `<span class="active">${this.searchText}</span>` //输入的内容
      return data.replace(reg, highlightStr)
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .active {
  color: red;
}
</style>

