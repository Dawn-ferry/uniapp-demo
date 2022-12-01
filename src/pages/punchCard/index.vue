<template>
  <view class="my-content">
    <view class="my-header">
      <view class="info">
        <view class="image">
          <image src="https://image.ijobway.com/27_sxgl/icon/head_portrait_01.png" />
        </view>
        <view class="user">
          <view class="jobs">{{userInfo.jobTitle}}-{{userInfo.nickName}}</view>
          <view class="company">{{userInfo.entName}}</view>
        </view>
      </view>
    </view>
    <view class="functional-layer">2</view>
  </view>
</template>
<script>
// uniList
import { getUserInfo } from '../../api/api'
// import { uniList, uniListItem, uniNoticeBar } from '@dcloudio/uni-ui'

export default {
  name: 'my',
  // components: {
  //   uniList,
  //   uniListItem,
  //   uniNoticeBar
  // },
  data() {
    return {
      practicePlanPath: '', //实习
      internshipSystemPath: '', //实习制度
      userInfo: {
        avatar: '',
        jobTitle: '',
        entName: '',
        nickName: ''
      }
    }
  },
  async onShow() {
    this.getUser()
  },
  methods: {
    openpdf(type) {
      console.log('openpdf', type)
      if (type === 1) {
        uni.navigateTo({ url: `/components/pdfCom/index?pdfUrl=${this.practicePlanPath}` })
      } else {
        uni.navigateTo({ url: `/components/pdfCom/index?pdfUrl=${this.internshipSystemPath}` })
      }
    },
    async getUser() {
      await getUserInfo().then(res => {
        if (res.code === 200) {
          this.name = res.user.nickName
          let { avatar, jobTitle, entName, nickName } = res.user
          this.userInfo = { avatar, jobTitle, entName, nickName }
          //实习
          this.practicePlanPath = res.user.practicePlanPath
          this.internshipSystemPath = res.user.internshipSystemPath
          uni.setStorageSync('userInfo', this.userInfo)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.my-content {
  height: 100vh;
  background: #f4f6f8;
}

.my-header {
  background: url('https://image.ijobway.com/27_sxgl/icon/background_01.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 125 * 2rpx;
  // border: 1px solid red;
  overflow: hidden;
  .info {
    margin: 20 * 2rpx 28 * 2rpx;
    display: flex;
    .user {
      color: #fff;
      margin-left: 12 * 2rpx;
      .jobs {
        width: 500rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 20 * 2rpx;
      }
      .company {
        margin-top: 8 * 2rpx;
        font-size: 14 * 2rpx;
      }
    }
    image {
      width: 56 * 2rpx;
      height: 56 * 2rpx;
      border-radius: 50%;
    }
  }
}
.functional-layer {
  height: 110 * 2rpx;
  width: 327 * 2rpx;
  position: absolute;
  top: 96 * 2rpx;
  margin: 0px 28 * 2rpx;
  background: #ffffff;
  border-radius: 16 * 2rpx 16 * 2rpx 16 * 2rpx 16 * 2rpx;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .layer-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 33%;
    height: 100%;
    .tips {
      margin-top: 8px;
    }
  }
}
.integral {
  background: url('https://image.ijobway.com/27_sxgl/icon/background_02.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 86 * 2rpx 16 * 2rpx 10 * 2rpx 16 * 2rpx;
  height: 82 * 2rpx;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16 * 2rpx;
  border-radius: 12 * 2rpx 12 * 2rpx 12 * 2rpx 12 * 2rpx;
  .tips {
    .title {
      font-size: 16 * 2rpx;
    }
    .txt {
      margin-top: 8 * 2rpx;
      font-size: 12 * 2rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
    }
  }
  .btn {
    width: 56 * 2rpx;
    height: 20 * 2rpx;
    text-align: center;
    line-height: 20 * 2rpx;
    background: #ffffff;
    border-radius: 23 * 2rpx 23 * 2rpx 23 * 2rpx 23 * 2rpx;
    opacity: 1;
    color: #f79656;
    font-size: 10 * 2rpx;
  }
}
.my-footer {
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48 * 2rpx;
    padding: 0 20 * 2rpx;
    .instruction {
      display: flex;
      .tips {
        margin-left: 12 * 2rpx;
        font-size: 14 * 2rpx;
      }
    }
  }
}
</style>
