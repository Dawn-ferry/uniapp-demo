<template>
  <view class="content" style="background-color: url('/static/img/bgc.png');">
    <image src="/static/img/bgc.png" />
    <view class="calendar">
      <uni-calendar style="height:100%" :insert="true" :lunar="true" :selected="selected" />
    </view>
  </view>
</template>
<script>
export default {
  name: 'calendar',
  data() {
    return {
      selected: [
        {
          // 打点日期
          date: '2022-12-01',
          // 打点描述
          info: '签到'
          // 额外信息
          // data: {
          //   custom: '自定义信息',
          //   name: '自定义消息头'
          // }
        }
      ]
    }
  }
}
</script>
<style lang='scss' scoped>
.content {
  background: url('https://image.ijobway.com/27_sxgl/icon/background_01.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.calendar {
  height: 608rpx;
  border: 1px solid red;
  //  ::v-deep .uni-easyinput .is-input-border {
}
::v-deep .uni-calendar .uni-calendar__content {
  // background-color: url('/static/img/bgc.png');
  background: url('https://image.ijobway.com/27_sxgl/icon/background_01.png');
  color: #fff;
  width: 100%;
}
</style>
