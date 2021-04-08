<template>
  <div><img :src="img"
         ref="image">
    <van-nav-bar left-text="返回"
                 right-text="按钮"
                 left-arrow
                 @click-left="onClickLeft"
                 @click-right="onClickRight" />
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'updataPhono',
  props: {
    img: {
      type: [Object, String],
      required: true
    }
  },
  data() {
    return {
      cropper: null
    }
  },
  methods: {
    onClickLeft() {
      console.log(1)
    },
    onClickRight() {
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('photo', blob)

        updateUserPhoto(formData)
      })
    }
  },
  mounted() {
    this.cropper = new Cropper(this.$refs.image, {
      viewMode: 1, // 限制裁切框不要超过画布的大小
      dragMode: 'move', // 移动画布
      aspectRatio: 1, // 定义裁剪框的固定长宽比
      autoCropArea: 1, // 0到1之间的数字。定义自动裁剪区域的大小（百分比）
      cropBoxMovable: false, // 启用通过拖动来移动裁剪框的功能。
      cropBoxResizable: false, // 启用以通过拖动来调整裁剪框的大小。
      background: false,
      movable: true
    })
  }
}
</script>

<style>
img {
  display: block;
  max-width: 100%;
}
</style>