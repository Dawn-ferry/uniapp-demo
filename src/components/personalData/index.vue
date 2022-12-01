<template>
  <div class="content">
    <view class="photo">
      <image src="https://image.ijobway.com/27_sxgl/icon/personal_data_01.png" />
      <view class="txt">点击更换头像</view>
    </view>
    <view class="warp">
      <view class="info">
        <view class="label">姓&emsp;&emsp;名</view>
        <view class="val">jaha</view>
      </view>
      <view class="info">
        <view class="label">学&emsp;&emsp;号</view>
        <view class="val">jaha</view>
      </view>
      <view class="info">
        <view class="label">院&emsp;&emsp;校</view>
        <view class="val">jaha</view>
      </view>
      <view class="info">
        <view class="label">班&emsp;&emsp;级</view>
        <view class="val">jaha</view>
      </view>
      <view class="info">
        <view class="label">实习公司</view>
        <view class="val">jaha</view>
      </view>
      <view class="info">
        <view class="label">实习岗位</view>
        <view class="val">jaha</view>
      </view>
      <view class="info">
        <view class="label">实习时间</view>
        <view class="val">jaha</view>
      </view>
      <view class="info">
        <view class="label">绑定手机</view>
        <view class="val">jaha</view>
      </view>
      <view class="info">
        <view class="label">绑定微信</view>
        <view class="val">jaha</view>
      </view>
    </view>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {}
  }
}
</script>
<style lang='scss' scoped>
.content {
  text-align: center;
  .photo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 240rpx;
    .txt {
      margin-top: 24rpx;
      font-size: 28rpx;
      color: #878ab8;
    }
    image {
      width: 128rpx;
      height: 128rpx;
    }
  }
  .warp {
    margin: 40rpx 100rpx;
    text-align: left;
    .info {
      display: flex;
      height: 40rpx;
      line-height: 40rpx;
      margin-bottom: 40rpx;
      .label {
        margin-right: 64rpx;
        color: #999999;
        font-size: 28rpx;
      }
      .val {
        font-weight: 500;
        color: #333333;
        line-height: 40rpx;
        font-size: 28rpx;
      }
    }
  }
}
</style>
