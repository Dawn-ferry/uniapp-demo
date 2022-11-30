<template>
  <div>
    <!-- open-type="getUserInfo" 代表唤起用户授权窗口 -->
    <!--  @getuserinfo="getUserInfo()"  代表用户同意授权后回调的函数 -->
    <button open-type="getUserInfo" @getuserinfo="getUserInfo()">授权助力</button>
    <uni-badge text="1"></uni-badge>

    <!-- <button open-type="getUserInfo" @click="loginMP">huoqu</button> -->
  </div>
</template>
<script>
import { uniBadge } from '@dcloudio/uni-ui'
// import uniBadge from '@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue' //也可使用此方式引入组件

export default {
  name: 'login',
  components: { uniBadge },

  data() {
    return {
      userId: '', // 用户ID
      userName: '', // 用户名称
      userSex: '' // 用户性别
    }
  },

  methods: {
    getUserInfo() {
      uni.login({
        // oauth  代表授权登录
        service: 'oauth',
        success: function (res) {
          console.log('res', res)
          // uni.switchTab({
          //   url: '/pages/my/index'
          // })
        }
      })
    }
    // getUserInfo() {
    //   let _this = this
    //   // uni.getProvider（）获取服务商信息判断手机端是否安装了app
    //   uni.getProvider({
    //     // oauth  代表授权登录
    //     service: 'oauth',
    //     success: function (res) {
    //       // console.log('res');
    //       // 登录
    //       uni.login({
    //         provider: 'weixin',
    //         success: res => {
    //           console.log('APPID、APPSecret', res)
    //           // 微信公共平台获取(APPID、APPSecret)
    //           // APPID
    //           let appid = 'wx71e899335cedf7c0'
    //           // AppSecret
    //           let secret = '639dea63f6850fffe434b1bdd206544d'
    //           let url =
    //             'https://api.weixin.qq.com/sns/jscode2session?appid=' +
    //             appid +
    //             '&secret=' +
    //             secret +
    //             '&js_code=' +
    //             res.code +
    //             '&grant_type=authorization_code'
    //           uni.request({
    //             url: url, // 请求路径
    //             success: result => {
    //               console.log('result', result)
    //               // 获取Id(唯一的)
    //               _this.userId = result.data.openid
    //               console.log('这是openID:' + _this.userId)
    //               uni
    //                 .getUserInfo({
    //                   provider: 'weixin'
    //                 })
    //                 .then(res => {
    //                   // 获取用户所有信息
    //                   console.log(' 获取用户所有信息', res[1].userInfo)
    //                   // 获取用户姓名
    //                   _this.userName = res[1].userInfo.nickName
    //                   // 获取用户性别gender: 0未知、1男、2女
    //                   _this.usersex = res[1].userInfo.gender
    //                 })
    //             }
    //           })
    //         }
    //       })
    //     }
    //   })
    // }
  }

  // 回调函数
}
</script>
<style scoped>
</style>
