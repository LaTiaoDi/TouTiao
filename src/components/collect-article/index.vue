<template>
  <div class="collect-article">
    <van-icon color="#777"
              :name="value ? 'star' : 'star-o'"
              :class="{
                activity:value
              }"
              @click="btnCollect" />
  </div>
</template>

<script>
import { addCollections, unCollections } from '@/api/artcle'
export default {
  name: 'collect',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    id: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      gada: true
    }
  },
  methods: {
    async btnCollect() {
      if (!this.value) {
        try {
          await addCollections(this.id)
          this.$emit('input', !this.value)
          this.$toast.success('收藏成功')
        } catch (error) {
          console.log('收藏失败')
        }

        //取消收藏
      } else {
        //收藏
        try {
          await unCollections(this.id)
          this.$emit('input', !this.value)
          this.$toast.success('取消收藏成功')
        } catch (error) {
          console.log('取消收藏失败')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.activity {
  color: #ffa500 !important;
}
</style>

