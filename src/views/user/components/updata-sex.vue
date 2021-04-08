<template>
  <div>
    <van-picker title="标题"
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange" />
  </div>
</template>

<script>
import { patchUser } from '@/api/user'
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    async onConfirm(value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
      try {
        await patchUser({
          gender: index
        })
        this.$toast.success('修改成功')
        this.$emit('exit')
        this.$emit('input', index)
      } catch (error) {
        console.log('修改性别失败')
      }
    },
    async onChange(picker, value, index) {
      try {
        await patchUser({
          gender: index
        })
        this.$toast.success('修改成功')

        this.$emit('exit')
        this.$emit('input', index)
      } catch (error) {
        console.log('修改性别失败')
      }
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    onCancel() {
      this.$toast('取消')
    }
  }
}
</script>

<style scoped lang='less'>
.warp {
  padding: 25px;
  background-color: #f5f7f9;
}
</style>