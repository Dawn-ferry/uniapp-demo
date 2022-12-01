<template>
	<div>
		<view>
			<view class='header'>
			  <image src='../../static/logo.png'></image>
			</view>
			<view class='content'>
			  <view>申请获取以下权限</view>
			  <text>获得你的公开信息(昵称，头像、地区等)</text>
			</view>
			<!-- withCredentials=true  获取到除用户基本信息之外的encryptedData以及iv等数据 -->
			<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="login">
			授权登录
			</button>
		
		 </view>
	</div>
</template>

<script>
	// import { htxcx } from "@/store/api.js"
	// import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				code:"",
				isCanUse: uni.getStorageSync('isCanUse')//默认为true  记录当前用户是否是第一次授权使用的
			}
		},

		onLoad() {
			// this.login()
		},
		methods: {
			// ...mapMutations(["setName"]),
      //第一授权获取用户信息===》按钮触发
			// wxGetUserInfo(){ 
			// 	let _this = this;
			// 	// 获取用户信息
			// 	uni.getUserInfo({
			// 		provider: 'weixin',
			// 		success: function (res) {
      //       console.log('第一授权获取用户信息',res)
			// 			// _this.encryptedData = res.encryptedData
			// 			// _this.nickName = res.userInfo.nickName; //昵称
			// 			// _this.avatarUrl = res.userInfo.avatarUrl; //头像
			// 			uni.setStorageSync('isCanUse', false);//记录是否第一次授权 false:表示不是第一次授权
						// _this.updateUserInfo();
			// 		},fail:function (fail){console.log("fail:",fail)}
			// 	});
			// },
			login(){
				let _this = this;
				uni.showLoading({
				title: '登录中...'
				});
				
				// 1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
          console.log('获取登录用户code',loginRes);
						_this.code = loginRes.code;
            _this.updateUserInfo();//调用更新信息方法
						// if (!_this.isCanUse) {
						//非第一次授权获取用户信息
            // 			uni.getUserInfo({
            // 				provider: 'weixin',
            // 				success: function(infoRes) {
            // 					console.log('',infoRes);
            //  　　　　   //获取用户信息后向调用信息更新方法
            // 					// _this.nickName = infoRes.userInfo.nickName; //昵称
            // 					// _this.avatarUrl = infoRes.userInfo.avatarUrl; //头像
            // 					_this.updateUserInfo();//调用更新信息方法
            // 				}
            // 			});
						// }
						// 将用户登录code传递到后台置换用户SessionKey、OpenId等信息
						uni.hideLoading();
					},
				})
					
			},
			updateUserInfo(){ //向后台更新信息
        if(this.code){
            uni.request({
            url: 'https://runjava.1lesson.cn/wechat/base/login', 
            data: {
                code:this.code,
                type:0,
                number:"",
                name:""
            },
            method:'post',
            success: (res) => {
            console.log('erw2e',res);
                if(res.data.code===200){
                //新 token  替换
                  uni.setStorageSync('token', res.data.token)
                  uni.switchTab({
                    url: '/pages/my/index'
                  })  
                }else {
                  uni.navigateTo({
                    url: '/pages/Authpage/index'
                })  
              }
            },
            fail:(res)=>{
                console.log('err',res);

            }
          });
        }
          // code  type  0-授权  1-认证
          // uni.navigateTo({
          //   url: '/pages/Authpage/index'
          // })  
				
			}
		}
	}
</script>

<style scoped>
	.header {
	    margin: 90rpx 0 90rpx 50rpx;
	    border-bottom: 1px solid #ccc;
	    text-align: center;
	    width: 650rpx;
	    height: 300rpx;
	    line-height: 450rpx;
	  }
	  .header image {
	    width: 200rpx;
	    height: 200rpx;
	  }
	 
	  .content {
	    margin-left: 50rpx;
	    margin-bottom: 90rpx;
	  }
	 
	  .content text {
	    display: block;
	    color: #9d9d9d;
	    margin-top: 40rpx;
	  }
	  .bottom {
	    border-radius: 80rpx;
	    margin: 70rpx 50rpx;
	    font-size: 35rpx;
	  }
</style>

