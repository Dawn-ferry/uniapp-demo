<template>
  <div>
    <view class="calendar">
      <uni-calendar
        :clearDate="true"
        :showMonth="false"
        :insert="true"
        :lunar="false"
        :start-date="'1990-01-01'"
        :end-date="'2099-01-01'"
        :selected="selected"
      />
    </view>
    <view class="index" style="font-size:24rpx">
      <view class="txt">
        <view style="margin-right:22rpx;color:#e43d33;font-size:50rpx">·</view>
        <text>异常考勤</text>
      </view>
      <view class="txt" style="margin-left:60rpx">
        <view style="margin-right:22rpx;font-size:50rpx">·</view>
        <text>正常考勤</text>
      </view>
    </view>
    <view class="title">考勤汇总</view>
    <scroll-view scroll-x style="width: 100%;white-space: nowrap;" class="status">
      <!-- <view class="status"> -->
      <view class="item">
        <view class="num">{{ attendanceSummary.attendanceDays}}</view>
        <view class="txt">出勤(天)</view>
      </view>
      <view class="item">
        <view class="num">{{ attendanceSummary.lateNumber}}</view>
        <view class="txt">迟到(次)</view>
      </view>
      <view class="item">
        <view class="num">{{attendanceSummary.leaveEarlyTimes}}</view>
        <view class="txt">早退(次)</view>
      </view>
      <view class="item">
        <view class="num">{{attendanceSummary.lackCardNumber}}</view>
        <view class="txt">缺卡(次)</view>
      </view>
      <view class="item">
        <view class="num">{{attendanceSummary.fieldTrips}}</view>
        <view class="txt">外勤(次)</view>
      </view>
      <view class="item">
        <view class="num">{{attendanceSummary.leaveNumber}}</view>
        <view class="txt">请假(次)</view>
      </view>
      <view class="item">
        <view class="num">{{attendanceSummary.travelTimes}}</view>
        <view class="txt">出差(次)</view>
      </view>
      <!-- </view> -->
    </scroll-view>

    <!--  -->
    <view class="sign">
      <image src="https://image.ijobway.com/27_sxgl/icon/clock_in_02.png" style="width: 48rpx;height: 48rpx;" />
      <view class="sign-warp">
        <view style="display:flex; align-items: center;">
          <view class="txt">{{punchData.recordList ? '签到':'未签到'}}</view>
          <!-- {{ attendanceRecordType[punchData.recordList[0].attendanceRecordType] }} -->
          <view class="sign-icon">1111</view>
        </view>
        <view style="display:flex; align-items: center;">
          <!-- {{punchData.recordList[0].attendanceRecordDate}} -->
          <!-- {{attendanceRecordStatus[punchData.recordList[0].attendanceRecordStatus] }} -->
          <view class="txt">222</view>
          <view class="sign-icon" style="background: #F37F2C;">333</view>
        </view>
        <!-- 申诉中   -->
        <view class="sign-appeal">去申诉</view>
        <!--  appeal  -->
      </view>
    </view>
    <view class="address">
      <view class="address-icon"></view>
      <view class="address-detail">
        <image src="https://image.ijobway.com/27_sxgl/icon/clock_in_03.png" />
        <!-- {{punchData.recordList[0].position}} -->
        <view class="txt" v-if="isSignIn">22</view>
      </view>
    </view>
    <view class="outsign sign">
      <image src="https://image.ijobway.com/27_sxgl/icon/clock_in_04.png" style="width: 48rpx;height: 48rpx;" />
      <view class="sign-warp">
        <view style="display:flex; align-items: center;">
          <view class="txt">{{punchData.recordList&& punchData.recordList[1] ? '签退':'未签到' }}</view>
          <view class="sign-icon" v-if="isSignOut">{{attendanceRecordType[punchData.recordList[1].attendanceRecordType]}}</view>
        </view>
        <view style="display:flex; align-items: center;" v-if="isSignOut">
          <view class="txt">{{punchData.recordList[1].attendanceRecordDate}}</view>
          <view class="sign-icon" style="background: #F37F2C;">{{attendanceRecordStatus[punchData.recordList[1].attendanceRecordStatus] }}</view>
        </view>
      </view>
    </view>
    <view class="address">
      <view class="address-icon"></view>
      <view class="address-detail" v-if="isSignOut">
        <image src="https://image.ijobway.com/27_sxgl/icon/clock_in_03.png" />
        <view class="txt">{{punchData.recordList[1].position}}</view>
      </view>
    </view>
  </div>
</template>
<script>
import { queryAttendanceCalendar, queryAttendanceSummary } from '../../api/api'
import moment from 'moment'
export default {
  name: 'myAttendance',
  data() {
    return {
      AttendanceCalendar: [],
      attendanceSummary: {},
      selected: [
        {
          date: '2022-12-01'
        },
        {
          date: '2022-12-02'
        }
      ]
    }
  },
  onShow() {
    // console.log('moment')
    this.getAttendanceCalendar()
    this.getAttendanceSummary()
  },
  methods: {
    getAttendanceCalendar() {
      let date = moment().format('YYYY-MM')
      queryAttendanceCalendar(date).then(res => {
        if (res.code === 200) {
          // AttendanceCalendar
          // 获取异常数据
          res.data.map(item => {
            /* 
          "attendanceId": 2, //出勤ID
"userId": 102,
"attendType": 2, //出勤状态：1、正常，2、异常（迟到\早退\缺卡）
"attendDate": "2022-09-12" //日期
          */
            if (item.attendType === 2) {
              let params = {
                attendanceId: item.attendanceId,
                attendType: item.attendType,
                attendDate: item.attendDate
              }
            }
          })
          this.console.log('queryAttendanceCalendar  ', res)
        }
        // 数据过滤
      })
    },
    getAttendanceSummary() {
      let date = moment().format('YYYY-MM')
      queryAttendanceSummary(date).then(res => {
        if (res.code === 200) {
          this.attendanceSummary = res.data
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.sign {
  height: 80rpx;
  display: flex;
  align-items: center;
  padding: 0 32rpx;
  .sign-warp {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 574rpx;
    height: 40rpx;
    .txt {
      margin-left: 16rpx;
      margin-right: 8rpx;
    }
    .sign-icon {
      text-align: center;
      width: 56rpx;
      height: 32rpx;
      line-height: 32rpx;
      background: #6370fd;
      color: #fff;
      font-size: 20rpx;
      border-radius: 6rpx 6rpx 6rpx 6rpx;
    }
    .sign-appeal {
      width: 100rpx;
      height: 36rpx;
      line-height: 36rpx;
      text-align: center;
      border-radius: 18rpx;
      border: 2rpx solid #cb1313;
      color: #cb1313;
      font-size: 20rpx;
      font-weight: 500;
    }
  }
}
.address {
  height: 80rpx;
  display: flex;
  padding: 0 32rpx;
  .address-icon {
    width: 12rpx;
    height: 80rpx;
    background: rgba(65, 96, 251, 0.14);
    border-radius: 6rpx;
    margin: 0 21rpx;
  }
  .address-detail {
    width: 574rpx;
    background: #f9fbff;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    image {
      width: 32rpx;
      height: 32rpx;
      margin: 0 12rpx;
    }
    .txt {
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #878ab8;
    }
  }
}
.index {
  border: 1px solid red;
  height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  .txt {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid red;
  }
}
.title {
  // border: 1px solid red;
  margin: 0 40rpx;
  font-size: 28rpx;
  font-weight: 500;
  display: flex;
  height: 88rpx;
  align-items: center;
}
.status {
  height: 120rpx;
  background: #f9fbff;
  border-radius: 16rpx;
  margin: 0 32rpx;
  .item {
    text-align: center;
    width: 88rpx;
    height: 80rpx;
    margin: 20rpx;
    display: inline-block;
    // border: 1px solid red;
    .num {
      font-size: 28rpx;
      font-weight: 500;
      color: #333333;
    }
    .txt {
      font-size: 24rpx;
      color: #999999;
      font-weight: 400;
    }
  }
}
</style>
