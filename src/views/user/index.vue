<template>
  <div>
    <van-nav-bar title="个人信息"
                 left-arrow
                 class="page-nav-bar"
                 right-text="保存"
                 @click-left='$router.back()' />
    <van-cell-group>
      <input type="file"
             hidden
             ref="file"
             @change="onFileChange">
      <van-cell title="头像"
                is-link
                @click="$refs.file.click()">
        <van-image round
                   width="30"
                   height="30"
                   fit="cover"
                   :src="user.photo" />
      </van-cell>
      <van-cell title="昵称"
                :value="user.name"
                @click="nickShow = true"
                is-link />
      <van-cell title="性别"
                @click="sexShow = true"
                :value="user.gender ? '女':'男'"
                is-link />
      <van-cell title="生日"
                @click="birthdayShow = true"
                :value="user.birthday"
                is-link />
    </van-cell-group>
    <!-- 修改昵称 -->
    <van-popup v-model="nickShow"
               position="bottom"
               :style="{ height: '100%' }">
      <edit-name @exit='nickShow = false'
                 v-if="nickShow"
                 v-model="user.name" />
    </van-popup>
    <!-- 修改昵称 end-->
    <!-- 修改性别 -->
    <van-popup v-model="sexShow"
               position="bottom"
               :style="{ height: '30%' }">
      <edit-sex @exit='sexShow = false'
                v-if="sexShow"
                v-model="user.gender" />
    </van-popup>
    <!-- 修改性别 end-->
    <!-- 修改出生年月日 -->
    <van-popup v-model="birthdayShow"
               position="bottom"
               :style="{ height: '40%' }">
      <edit-birthday @exit='birthdayShow = false'
                     v-if="birthdayShow"
                     v-model="user.birthday" />
    </van-popup>
    <!-- 修改出生年月日 end-->
    <!-- 编辑头像弹出层 -->
    <van-popup v-model="txShow"
               position="bottom"
               :style="{ height: '100%' }">
      <edit-phono :img='img' />
    </van-popup>

    <!--编辑头像end -->
  </div>
</template>

<script>
import editName from './components/update-name'
import editSex from './components/updata-sex'
import editBirthday from './components/updata-birthday'
import editPhono from './components/updata-phono'

import { getUserProfile } from '@/api/user'
export default {
  name: 'UserIndex',
  components: {
    editName,
    editSex,
    editBirthday,
    editPhono
  },
  data() {
    return {
      user: {}, //用户信息
      nickShow: false, //昵称修改弹框
      sexShow: false,
      birthdayShow: false,
      txShow: false,
      img: null
    }
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
        console.log(data)
      } catch (error) {
        console.log('获取用户信息失败')
      }
    },
    onFileChange() {
      //文件改变方法
      const file = this.$refs.file.files[0]

      this.img = window.URL.createObjectURL(file)
      console.log(this.img)
      this.txShow = true
      console.log('我添加了文件')
      this.$refs.file.value = ''
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  background-color: #f5f7f9;
}
</style>