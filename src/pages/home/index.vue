<template>
  <view class="content">
    <!-- <image class="logo" src="/static/logo.png"></image> -->
    <view class="bgc"></view>
    <view class="warp">
        <view class="advertise">
            <image class="logo" src="https://image.ijobway.com/27_sxgl/icon/index_icon_06.png"></image>
        </view>
        <view class="clock">
            <image class="logo" src="https://image.ijobway.com/27_sxgl/icon/index_icon_02.png" style="margin-right:22rpx"></image>
            <image class="logo" src="https://image.ijobway.com/27_sxgl/icon/index_icon_05.png"></image>
        </view>
        <view class="task">
          <image  src="https://image.ijobway.com/27_sxgl/icon/index_icon_04.png" ></image>  
          <image  src="https://image.ijobway.com/27_sxgl/icon/index_icon_03.png" style="margin: 0 22rpx"></image>
          <image  src="https://image.ijobway.com/27_sxgl/icon/index_icon_01.png"></image>
        </view>
        <view class="apply">
            <view class="item">
                <image  src="https://image.ijobway.com/27_sxgl/icon/index_icon_07.png"></image>
                <view class="txt">异常申诉</view>
            </view>
            <view class="item">
                <image  src="https://image.ijobway.com/27_sxgl/icon/index_icon_08.png"></image>
                <view class="txt">请假申请</view>
            </view>
            <view class="item">
                <image  src="https://image.ijobway.com/27_sxgl/icon/index_icon_09.png"></image>
                <view class="txt">外勤申请</view>
            </view>
            <view class="item">
                <image  src="https://image.ijobway.com/27_sxgl/icon/index_icon_10.png"></image>
                <view class="txt">出差申请</view>
            </view>
            <view class="item">
                <image  src="https://image.ijobway.com/27_sxgl/icon/index_icon_11.png"></image>
                <view class="txt">投诉申请</view>
            </view>
        </view>




    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {  }
  },
  onLoad() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.content{
    position: relative;
    .bgc {
      width: 100vw;
      height: 130 * 2rpx;
      background: #6d84fc;
    }
    .warp{
      margin: 0 10 * 2rpx;
    }
    .advertise{
        position: absolute;
        top:12 * 2rpx;
        width: 355 * 2rpx;
        height: 152 * 2rpx;
        margin: 20rpx 0;
        image{
          width: 100%;
          height: 100%;
        }
    }
    .task{
        display: flex;
        height: 144rpx;
        margin-top: 20rpx;
        image{
          width: 100%;
          height: 100%;
        }
    }
    .clock{
        display: flex;
        height: 172rpx;
        margin-top: 100rpx;
        justify-content: space-between;
        image{
          width: 100%;
          height: 100%;
        }
    }
    .apply{
        display: flex;
        height: 220rpx;
        .item{
          display: flex;
          width: 20%;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .txt{
            font-weight: 400;
            color: #333333;
            font-size: 26rpx;
            margin-top: 44rpx;
          }
          image{
            width: 72rpx;
            height: 72rpx;
          }
        }
      
    
    }
}


/* 
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
} */
</style>
