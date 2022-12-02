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
    <view class="functional-layer">
      <view class="timer">
        <view class="timer-left">
          <image src="https://image.ijobway.com/27_sxgl/icon/clock_in_01.png" style="width: 32rpx;height: 32rpx;" />
          <view class="txt">工作时间 {{punchData.jobBeginTime}}-{{punchData.jobEndTime}}</view>
        </view>
        <view class="timer-right">
          <view class="txt">星期三 ｜ {{now}}</view>
        </view>
      </view>

      <view class="sign">
        <image src="https://image.ijobway.com/27_sxgl/icon/clock_in_02.png" style="width: 48rpx;height: 48rpx;" />
        <view class="sign-warp">
          <view style="display:flex; align-items: center;">
            <view class="txt">{{punchData.recordList ? '签到':'未签到'}}</view>
            <view class="sign-icon" v-if="isSignIn">{{ attendanceRecordType[punchData.recordList[0].attendanceRecordType] }}</view>
          </view>
          <view style="display:flex; align-items: center;" v-if="isSignIn">
            <view class="txt">{{punchData.recordList[0].attendanceRecordDate}}</view>
            <view class="sign-icon" style="background: #F37F2C;">{{attendanceRecordStatus[punchData.recordList[0].attendanceRecordStatus] }}</view>
          </view>
        </view>
      </view>
      <view class="address">
        <view class="address-icon"></view>
        <view class="address-detail">
          <image src="https://image.ijobway.com/27_sxgl/icon/clock_in_03.png" />
          <view class="txt" v-if="isSignIn">{{punchData.recordList[0].position}}</view>
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

      <view class="map">
        <map
          id="mapSelected"
          style="width: 100%; height: 100%;"
          :latitude="latitude"
          :longitude="longitude"
          :markers="covers"
          :controls="controls"
          :scale="18"
          @controltap="controltap"
          @regionchange="regionchange"
        ></map>

        <view class="mapBtn" @click="open">
          <view class="copy">
            <view>{{ signInTitle[punchData.punchInType] + signInStatus[punchData.punchState] }}</view>
            <view class="dateTime" id="dateTime">{{dataTime}}</view>
          </view>
          <image src="https://image.ijobway.com/27_sxgl/icon/clock_in_05.png" style="width:100%;height:100%" />
        </view>
      </view>
    </view>
    <uni-popup ref="popup" :duration="3000">
      <view class="modal" style="background:#fff">
        <image src="https://image.ijobway.com/27_sxgl/icon/clock_in_07.png" />
        <view class="success">打卡成功</view>
        <view class="txt">预计3秒后自动消失～</view>
        <button @click="close">知道了</button>
      </view>
    </uni-popup>
  </view>
</template>
<script>
// uniList
import { getUserInfo, getattendance, getattendanceRecord } from '../../api/api'
import { uniPopup } from '@dcloudio/uni-ui'
import moment from 'moment'
export default {
  name: 'my',
  components: {
    uniPopup
  },
  computed: {
    isSignIn() {
      return !!this.punchData.recordList
    },
    isSignOut() {
      return this.punchData.recordList && this.punchData.recordList.length >= 2
    }
  },
  data() {
    return {
      punchData: {
        recordList: null
      },
      now: moment().format('YYYY-MM-DD'),
      signInTitle: {
        0: '公司',
        1: '外勤'
      },
      signInStatus: {
        0: '签到',
        1: '签退'
      },
      attendanceRecordType: {
        0: '公司', //签到
        1: '外勤',
        2: '公司', //签退
        3: '外勤'
      },
      attendanceRecordStatus: {
        0: '正常',
        1: '迟到',
        2: '缺卡',
        3: '代打卡'
      },
      title: 'map',
      latitude: 39.909, // 默认纬度
      longitude: 116.39742, // 默认经度(北京天安门)
      covers: [
        {
          id: 110,
          latitude: 39.909,
          longitude: 116.39742,
          iconPath: '	https://hellouniapp.dcloud.net.cn/static/location.png',
          width: '20',
          height: '20'
        }
      ],
      controls: [
        {
          // 控件
          id: 99,
          position: {
            // 控件位置
            left: 160,
            top: 120
          },
          iconPath: 'https://hellouniapp.dcloud.net.cn/static/location.png' // 控件图标
        }
      ],
      address_info: '',
      address_info_recomd: '',
      address: '',

      timer: null,
      dataTime: '',
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
    this.queryFn()
  },
  onLoad() {
    this.isGetLocation()
    var that = this
    this.timer = setInterval(() => {
      that.dataTime = moment().format('HH:mm:ss')
    }, 1000)
  },
  onHide() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  },

  methods: {
    isGetLocation(a = 'scope.userLocation') {
      //检查当前是否已经授权访问scope属性
      console.log('e222', a)
      var _this = this
      uni.getSetting({
        success(res) {
          console.log(res)
          console.log('res', res)
          if (!res.authSetting[a]) {
            //每次进入程序判断当前是否获得授权，如果没有就去获得授权，如果获得授权，就直接获取当前地理位置
            _this.getAuthorizeInfo()
          } else {
            //方式一
            _this.getLocationInfo()
            // 方式二
            // _this.getLocation();
          }
        }
      })
    },
    getAuthorizeInfo(a = 'scope.userLocation') {
      // uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
      var _this = this
      uni.authorize({
        scope: a,
        success() {
          //允许授权
          //方式一
          // _this.getLocationInfo();
          // 方式二
          _this.getLocation()
        }
      })
    },
    //
    updataMark(latitude, longitude) {
      this.covers[0].longitude = longitude
      this.covers[0].latitude = latitude
    },
    getLocationInfo() {
      //直接调用即可
      var _this = this
      //  getLocation
      uni.getLocation({
        type: 'gcj02',
        success: function (res) {
          console.log('this', _this)
          _this.latitude = res.latitude
          _this.longitude = res.longitude
          _this.getLocationDetail()
          _this.updataMark(res.latitude, res.longitude)
          console.log('当前位置的经度：' + res.longitude)
          console.log('当前位置的纬度：' + res.latitude)
        }
      })

      // uni.onLocationChange(function (res) {
      //   console.log('纬度：' + res.latitude)
      //   console.log('经度：' + res.longitude)
      // })

      // uni.chooseLocation({
      //   success: res => {
      //     console.log('getLocationInfo222', res)
      //     if (res.errMsg == 'chooseLocation:ok') {
      //       this.address_info = res.name + res.address
      //       this.latitude = res.latitude
      //       this.longitude = res.longitude
      //     }
      //   },
      //   fail: err => {
      //     console.log('fail---', err)
      //   }
      // })
    },
    //获取当前所在位置的经纬度
    getLocation() {
      uni.getLocation({
        type: 'gcj02',
        success: res => {
          console.log(res)
          this.latitude = res.latitude.toString()
          this.longitude = res.longitude.toString()
          _this.updataMark(this.latitude, this.longitude)

          // 获取地理位置详情信息
          this.getLocationDetail()
        }
      })
    },
    //根据经纬度获取详细的地址
    getLocationDetail() {
      uni.request({
        header: {
          'Content-Type': 'application/text'
        },
        url:
          'https://apis.map.qq.com/ws/geocoder/v1/?location=' +
          this.latitude +
          ',' +
          this.longitude +
          '&key=XOXBZ-MZWWD-CDX4H-PONXN-UA5PJ-D7FJN',
        success: re => {
          //成功获取到经纬度
          console.log('getLocationDetail', re)
          if (re.statusCode == 200) {
            this.address_info_recomd = re.data.result.formatted_addresses.recommend
            this.address_info =
              re.data.result.address_reference.town.title +
              re.data.result.address_reference.street.title +
              re.data.result.address_reference.landmark_l2.title
            this.address = re.data.result.address
          } else {
            uni.showToast({
              title: '获取地理位置失败，请重试',
              icon: 'none'
            })
          }
        }
      })
    },
    // 在地图渲染更新完成时触发
    regionchange(e) {
      console.log('regionchange')
      if (e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')) {
        this.mapCtx = uni.createMapContext('mapSelected') // 创建map的上下文对象, 从而操控map组件
        this.mapCtx.getCenterLocation({
          success: res => {
            console.log(res)
            this.latitude = res.latitude
            this.longitude = res.longitude
            // this.getLocationDetail()
          }
        })
      }
    },

    async queryFn() {
      var that = this
      await getattendance().then(res => {
        if (res.code === 200) {
          // punchData
          that.punchData = res.data
          console.log('getattendance', that.punchData)
        }
      })
    },
    // 签到
    open() {
      //
      let params = {
        attendanceRecordType: this.punchData.punchState,
        attendanceRecordStatus: this.punchData.punchInType,
        position: this.address,
        longitude: this.longitude,
        latitude: this.latitude,
        // position: '融汇创意园3号楼上海君果信息技术有限公司', //位置
        // longitude: 121.560271, //经度
        // latitude: 31.238666, //纬度
        type: 0
      }
      console.log('params', this.punchData.recordList)
      console.log('params', this.punchData.recordList.length)
      if (this.punchData.recordList.length >= 2) {
        uni.showToast({
          title: '请勿重复签退',
          icon: 'error'
        })
        return
      }
      //
      getattendanceRecord(params).then(res => {
        if (res.code === 200) {
          //
          uni.showToast({
            title: '打卡成功',
            icon: 'success'
          })
          console.log('getattendanceRecord', res)
        } else {
          uni.showToast({
            title: '打卡失败',
            icon: 'error'
          })
          console.log('getattendanceRecord-err', res)
        }
        this.queryFn()
      })

      // this.$refs.popup.open('center')
    },
    close() {
      this.$refs.popup.close()
    },
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
.modal {
  width: 560rpx;
  height: 544rpx;
  background: #ffffff;
  border-radius: 48rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  image {
    width: 292rpx;
    height: 234rpx;
    margin: 52rpx 0;
  }
  .success {
    font-size: 32rpx;
    color: #333333;
  }
  .txt {
    font-size: 28rpx;
    margin: 16rpx 0;
    color: #666666;
  }
  button {
    width: 192rpx;
    height: 64rpx;
    font-size: 28rpx;
    background: #6370fd;
    border-radius: 32rpx;
    color: #fff;
    line-height: 64rpx;
  }
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
  height: 1180rpx;
  width: 702rpx;
  position: absolute;
  top: 176rpx;
  margin: 0 24rpx;
  background: #ffffff;
  border-radius: 16 * 2rpx 16 * 2rpx 16 * 2rpx 16 * 2rpx;
  opacity: 1;
  .mapBtn {
    width: 280rpx;
    height: 280rpx;
    position: absolute;
    left: 0;
    right: 0;
    top: -186rpx;
    margin: auto;
    .copy {
      color: #fff;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .map {
    position: absolute;
    bottom: 24rpx;
    margin: 0 24rpx;
    width: 654rpx;
    height: 440rpx;
    // border: 1px solid red;
  }
  .timer {
    height: 88rpx;
    display: flex;
    justify-items: center;
    justify-content: space-between;
    padding: 0rpx 24rpx;
    font-size: 24rpx;
    .timer-left {
      display: flex;
      padding-top: 32rpx;
      color: #666666;
    }
    .timer-right {
      display: flex;
      padding-top: 32rpx;
      color: #666666;
    }
  }
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
}
</style>
