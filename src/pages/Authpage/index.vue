<template>
  <div class="warp">
    <view class="info">认证您的身份信息</view>
    <view class="tips">信息将绑定一职向前平台账号</view>
    <view class="uni-form-item uni-column">
      <view class="title">姓名</view>
      <uni-easyinput class="ipt" v-model="name" placeholder="请输入真实姓名"></uni-easyinput>
    </view>
    <view class="uni-form-item uni-column">
      <view class="title">学号</view>
      <uni-easyinput class="ipt" v-model="number" placeholder="请输入学号"></uni-easyinput>
    </view>
    <button class="btn" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="loginFn">确定</button>
    <!-- <button class="bottom" @click="login">登录</button> -->
  </div>
</template>
<script>
import { uniEasyinput } from '@dcloudio/uni-ui'

export default {
  components: {
    uniEasyinput
  },
  name: 'Author',
  data() {
    return {
      name: '',
      number: ''
    }
  },
  methods: {
    loginFn() {
      let name = this.name
      let number = this.number
      if (!this.name && !this.number) {
        uni.showToast({
          title: '姓名和学号不能为空',
          icon: 'none'
        })
        return
      }
      uni.login({
        provider: 'weixin',
        success: function (loginRes) {
          console.log('this.name', name)
          console.log('this.number', number)

          uni.request({
            url: 'https://runjava.1lesson.cn/wechat/base/login',
            data: {
              code: loginRes.code,
              type: 1,
              number: number,
              name: name
            },
            method: 'post',
            success: res => {
              // 存储token
              if (res.data.code === 200) {
                uni.setStorageSync('token', res.data.token)
                uni.switchTab({
                  url: '/pages/home/index'
                })
              } else {
                uni.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        },
        fail: res => {
          console.log('err', res)
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.warp {
  text-align: center;
  margin: 0 37px;
  .uni-form-item {
    .title {
      margin-bottom: 16px;
    }
    ::v-deep .uni-easyinput .is-input-border {
      border-radius: 22px 22px 22px 22px;
    }
    margin: 44px 0;
  }
}
.info {
  font-size: 20px;
  margin-top: 39px;
}
.tips {
  color: #666666;
  margin-top: 12px;
}
.btn {
  color: #fff;
  background-color: #6370fd;
  width: 80%;
  height: 40px;
  line-height: 40px;
  border-radius: 20px 20px 20px 20px;
  position: absolute;
  bottom: 38px;
}
</style>
