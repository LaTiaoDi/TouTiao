<template>
  <div>
    <van-datetime-picker v-model="currentDate"
                         type="date"
                         title="选择年月日"
                         :min-date="minDate"
                         :max-date="maxDate"
                         @cancel='$emit("exit")'
                         @confirm="onConfirm" />
  </div>
</template>

<script>
import { patchUser } from '@/api/user'
import dayjs from 'dayjs'
export default {
  props: ['value'],
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value) //当前时间
    }
  },
  methods: {
    async onConfirm() {
      try {
        await patchUser({
          birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
        })
        this.$emit('input', dayjs(this.currentDate).format('YYYY-MM-DD'))
        this.$toast.success('修改成功')
        this.$emit('exit')
      } catch (error) {
        this.$toast('请重试')
      }
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