<template>
  <div class="collect-article">
    <van-icon color="#777"
              :name="value === 1 ? 'good-job' : 'good-job-o'"
              :class="{
                activity:value
              }"
              @click="btnCollect" />
  </div>
</template>

<script>
import { getLikes } from '@/api/artcle'
export default {
  name: 'collect',
  props: {
    value: {
      required: true
    },
    id: {
      type: [Object, Number, String],
      required: true
    }
  },

  data() {
    return {}
  },
  methods: {
    async btnCollect() {
      try {
        await getLikes(this.id)
        this.$emit('input', 1)
      } catch (error) {
        console.log('点赞失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.activity {
  color: #e5645f !important;
}
</style>

