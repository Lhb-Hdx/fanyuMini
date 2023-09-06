<template>
  <div class="add-broadcast-container">
    <div class="home-top">
      <scroll-view :scroll-x="true" class="can-scroll">
        <view class="can-scroll-item" v-for="(item, index) of tabList" :key="index" @click="changeStatus(item.value)">
          <view class="scroll-item-text" :class="{ 'init-font': item.value !== status }">{{ item.name }} </view>
          <view :class="{ 'slider': item.value === status }"></view>
        </view>
      </scroll-view>
    </div>

    <div class="class-select-box" v-if="status === 1">
      <checkbox-group @change="checkboxChangeArea" v-if="showDevice">
        <div class="box">
          <label class="device-bigBox" v-for="(item, index) of areaList" :key="index">
            <div class="device-box">
              <div class="device-box-img">
                <image class="img" src="/static/icon/onregion-2.png" mode="widthFix" />
              </div>
              <div class="device-box-arrow ">
                <checkbox :value="item.areaId" color="#f5b619" />
              </div>
            </div>
            <div class="device-info" @click="getList(item)">
              <div class="device-name">{{ item.areaName }}</div>
              <div class="device-line">
                <!-- <div class="device-word">{{ "" }}</div> -->
                <div class="img">
                  <image class="img-2" src="/static/icon/jiantou.png" mode="widthFix" />
                </div>
              </div>
            </div>
          </label>
        </div>
      </checkbox-group>

      <div class="device" v-if="!showDevice">
        <div class="search">
          <div class="search-img" @click="changeStatus(1)">
            <image src="/static/icon/back-2.png" mode="widthFix"></image>
          </div>
          <div class="input-box">
            <div class="img-box" @click="search">
              <image src="/static/icon/search-2.png" mode="widthFix" />
            </div>
            <input class="input" placeholder="请输入设备名称" v-model="searchData" />
          </div>
        </div>
        <checkbox-group @change="checkboxChangeAreaDevice">
          <div class="class-select pad">
            <label v-for="(item, index) of areaDeviceList" :key="index" class="labelclass">
              <div class="class-item flex">
                <div class="class-check">
                  <checkbox :value="item.sn" color="#f5b619" />
                </div>
                <div class="class-word">
                  {{ item.deviceName }}
                  <div class="data">{{ item.sn }}</div>
                  <div class="data">{{ deviceName }}</div>
                </div>
                <div class="class-data">
                  <div class="music-line">音量： {{ item.volume }}</div>
                  <div class="music-line">
                    联网：<span :style="{ color: item.deviceStatus === 1 ? '#159F5C' : '#BBBBBB' }">{{ item.deviceStatus ===
                      0 ?
                      '离线' :
                      '在线' }}</span>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </checkbox-group>
      </div>
      <div class="Occ-box"></div>
    </div>

    <div class="class-select-box" v-if="status === 2">
      <checkbox-group @change="checkboxChangeDevice">
        <div class="box">
          <label class="device-bigBox" v-for="(item, index) of deviceList" :key="index">
            <div class="device-box">
              <div class="device-box-img">
                <image class="img" src="/static/icon/onequipment-2.png" mode="widthFix" />
              </div>
              <div class="device-box-arrow ">
                <checkbox :value="item.deviceId" color="#f5b619" :disabled="item.lixian === 1" />
              </div>
            </div>
            <div class="device-info">
              <div class="device-name">{{ item.deviceName }}</div>
              <div :class="item.lixian === 1 ? 'outline' : 'online'">{{ item.lixian === 1 ? '离线' : '在线' }}</div>
            </div>
          </label>
        </div>
      </checkbox-group>
      <div class="Occ-box"></div>
    </div>
    <div class="add-broadcast-box" v-if="show">
      <div class="add-broadcast-item" @click="toadd('text')">
        <image src="/static/icon/onword-2.png" mode="widthFix" />
      </div>
      <div class="add-broadcast-item" @click="toadd('voice')">
        <image src="/static/icon/ontape-2.png" mode="widthFix" />
      </div>
      <div class="add-broadcast-itemtwo" @click="toStopBroadcast">
        <image src="/static/icon/STOP.png" />
      </div>
      <div class="add-broadcast-item" @click="toadd('music')">
        <image src="/static/icon/onmedia-2.png" mode="widthFix" />
      </div>
      <div class="add-broadcast-item" @click="toadd('duijiang')">
        <image src="/static/icon/speech-2.png" mode="widthFix" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  areaQueryDevice,
  areaQueryDeviceSearch,
  areaQueryAll,
  deviceQuerySchoolAll,
  musicControlNew,
  startRrtmp,
  toUrgentStopPlay
} from '@/utils/getData'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'addbroadcast',
  data () {
    return {
      List: [
        { name: '区域', value: 1 },
        { name: '设备', value: 2 }
      ],
      status: 1,
      text: '立即播放',
      show: false,
      logined: false,
      allchecked: false,
      mediaType: '',
      deviceList: [], // 可以播放的设备列表
      areaList: [], // 可以播放的区域列表
      areaDeviceList: [], // 可以播放的区域下的设备列表
      deviceName: '',
      saveList: [],
      showDevice: true,
      searchData: '',
      tabList: [
        { name: '区域', value: 1 },
        { name: '设备', value: 2 }
      ],
      queryForm: {
        pageSize: 99999,
        pageNum: 1
      },
      ids: []
    }
  },
  computed: {
    ...mapState(['devices', 'musicid', 'musicTitle', 'playMusicForm'])
  },
  onTabItemTap () {
    this.text = '立即播放'
    this.changeMusicList([])
    this.changeDeviceList([])
  },
  onShow () {
    wx.getStorage({
      key: 'login',
      success: () => {
        this.logined = true
        this.getCanPlayArea()
      },
      fail: () => {
        wx.redirectTo({
          url: '/pages/login/main'
        })
      }
    })
  },
  onReady () {
    setTimeout(() => {
      this.show = true
    }, 500)
    // this.innerAudioContext = wx.createInnerAudioContext()
  },
  beforeMount () {
    wx.setNavigationBarTitle({ title: '即时广播' })
  },
  methods: {
    ...mapMutations(['changeMusicList', 'changeDeviceList', 'changePlayMusicForm']),
    toStartRrtmp () { // 获取rtmp接口
      startRrtmp(this.saveList)
        .then(res => {
          if (res.code === 200) {
            wx.navigateTo({
              url: `/pages/voiceZhibo/main?rtmp=${res.data}`
            })
          }
        })
    },
    toStopPlayMusic () { // 暂停广播
      let obj = { ...this.playMusicForm }
      obj.action = 'stop'
      musicControlNew(obj)
        .then(res => {
          if (res.code === 200) {
            this.changePlayMusicForm(obj)
          }
        })
    },
    toStopBroadcast () { // 紧急停止
      toUrgentStopPlay()
        .then(res => {
          if (res.code === 200) {
            wx.showToast({
              title: res.message || res.msg,
              icon: 'none',
              duration: 2500
            })
          }
        })
    },
    search () {
      if (this.searchData) {
        areaQueryDeviceSearch({ area_ids: this.ids, devicename: this.searchData })
          .then(res => {
            if (res.code === 200) {
              this.areaDeviceList = res.data
            }
          })
      } else {
        areaQueryDevice(this.ids)
          .then(res => {
            if (res.code === 200) {
              this.areaDeviceList = res.data
            }
          })
      }
    },
    // 查询用户下的所有区域
    getUserAllDevices () {
      deviceQuerySchoolAll({})
        .then(res => {
          if (res.code === 200) {
            for (let n of res.data) {
              if (n.deviceName && n.deviceName.indexOf('离线') > -1) {
                n.lixian = 1
              } else {
                n.lixian = 0
              }
            }
            const listData = res.data.map(item => {
              const modifiedDeviceName = item.deviceName.replace(/\[离线\]|\[在线\]/g, '');
              return { ...item, deviceName: modifiedDeviceName };
            });
            this.deviceList = listData
            console.log(this.deviceList);
          }
        })
    },

    changeStatus (value) {
      if (this.logined) {
        if (this.status !== value) {
          this.changeDeviceList([])
          this.saveList = []
        }
        this.status = value
        if (this.status === 1) {
          this.getCanPlayArea()
          if (!this.showDevice) {
            this.showDevice = 'true'
            this.deviceName = ''
            this.areaDeviceList = []
          }
        } else if (this.status === 2) {
          this.getUserAllDevices()
        }
      } else {
        wx.navigateTo({
          url: '/pages/login/main'
        })
      }
    },
    // 获取设备列表
    getDeviceList (list) {
      areaQueryDevice(list.length > 0 ? list : [''])
        .then(res => {
          if (res.code === 200 && res.data.length > 0) {
            this.saveList = []
            for (let n of res.data) {
              this.saveList.push(n.sn)
            }
            this.changeDeviceList(this.saveList)
          } else {
            this.saveList = []
          }
        })
    },
    // 获取可以播放的区域列表
    getCanPlayArea () {
      areaQueryAll({ pageSize: 100000, pageNum: 1 })
        .then(res => {
          if (res.code === 200) {
            this.areaList = res.data.list
          }
        })
    },
    // 查询可以播放的区域下所有设备
    getList (item) {
      this.showDevice = !this.showDevice
      this.deviceName = item.areaName
      this.ids = []
      this.ids.push(item.areaId)
      setTimeout(() => {
        areaQueryDevice(this.ids)
          .then(res => {
            if (res.code === 200) {
              this.areaDeviceList = res.data
            }
          })
      }, 0)
    },
    // 选择全校
    toSelectAll () {
      if (this.allchecked) {
        this.allchecked = false
      } else {
        this.allchecked = true
      }
    },
    checkboxChangeArea (e) { // 点击区域checkbox
      this.getDeviceList(e.target.value)
    },
    checkboxChangeAreaDevice (e) { // 点击区域下的设备checkbox
      this.saveList = e.target.value
      console.log(this.saveList);

      this.changeDeviceList(this.saveList)
    },
    checkboxChangeDevice (e) { // 点击设备checkbox
      this.saveList = e.target.value
      console.log(this.saveList);
      this.changeDeviceList(this.saveList)
    },
    toadd (type) {
      if (this.logined) {
        if (this.saveList.length > 0) {
          this.mediaType = type
          if (type === 'text') {
            wx.navigateTo({
              url: '/pages/addTextBroadcast/main?liji=ok'
            })
          } else if (type === 'voice') {
            wx.navigateTo({
              url: '/pages/addVoiceBroadcast/main?liji=ok'
            })
          } else if (type === 'music') {
            wx.navigateTo({
              url: '/pages/addMusicBroadcast/main?liji=ok'
            })
          } else if (type === 'duijiang') {
            this.toStartRrtmp()
          }
        } else {
          wx.showToast({
            title: this.status === 1 ? '请先选择区域' : '请先选择设备',
            icon: 'none',
            duration: 3500
          })
        }
      } else {
        wx.navigateTo({
          url: '/pages/login/main'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.submit-box {
  margin-top: 120rpx;

  button {
    color: #ffffff;
    background: #479cfd;
    border: none;
  }
}

.Occ-box {
  width: 100%;
  height: 110rpx;
}

.home-top {
  background-color: #3c4253;
  height: 9vh;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .can-scroll {
    width: 100%;
    white-space: nowrap;

    .can-scroll-item {
      display: inline-block;
      width: 50%;
      text-align: center;
      position: relative;

      .scroll-item-text {
        width: 80%;
        background: #3c4253;
        display: inline-block;
        padding: 20rpx 0;
        border-radius: 10rpx;
        font-size: 32rpx;
        font-weight: bold;
        color: #FFFFFF;
      }

      .slider {
        width: 30rpx;
        border-radius: 4rpx;
        border: 4rpx solid orange;
        position: absolute;
        top: 90%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .init-font {
    opacity: 0.5;
  }
}

.add-broadcast-container {
  background: #F5F8FF;
  overflow-y: scroll;
  height: 100vh;
  position: relative;

  .pad {
    padding: 0 35rpx;
  }

  .mar {
    margin-top: 100rpx;
  }

  .class-select-box {
    position: relative;
    height: 90vh;
    overflow-y: scroll;

    .box {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      .device-bigBox {
        position: relative;
        height: 200rpx;
        width: 329rpx;
        margin: 28rpx 13rpx 20rpx 27rpx;
        background-color: #fff;
        border-radius: 20rpx;

        &:nth-child(2n) {
          margin-right: 0;
        }

        .device-box {
          margin-top: -20rpx;
        }

        .device-box-img {
          margin: 40rpx 0 0 30rpx;
          width: 68rpx;
          height: 68rpx;

          .img {
            width: 100%;
          }
        }

        .device-box-arrow {
          position: absolute;
          display: inline-block;
          top: -10rpx;
          right: 10rpx;
          margin: 30rpx 0 0 30rpx;
          width: 50rpx;
          height: 50rpx;
          display: flex;
          justify-content: center;
          align-items: center;

          .img-2 {
            width: 30%;
          }
        }

        .device-info {
          margin: 5rpx 0 0 30rpx;
          font-size: 28rpx;
          height: 98rpx;

          .device-name {
            margin-top: 10rpx;
            margin-bottom: 10rpx;
            font-size: 32rpx;
            font-weight: 500;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .outline {
            font-size: 24rpx;
            color: gray;
          }

          .online {
            font-size: 24rpx;
            color: green;
          }

          .device-line {
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 30rpx;
            font-size: 24rpx;
            font-weight: 500;
            color: #999999;

            .device-word {
              width: 250rpx;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .img {
              position: absolute;
              right: 24rpx;
              bottom: 30rpx;
              width: 12rpx;
              height: 18rpx;

              .img-2 {
                width: 100%;
              }
            }
          }
        }
      }
    }

    .device {
      .search {
        width: 100vw;
        height: 100rpx;
        background-color: #fff;
        display: flex;
        align-items: center;

        .search-img {
          width: 10vw;
          height: 100rpx;
          display: flex;
          justify-content: center;
          align-items: center;

          image {
            width: 50%;
          }
        }

        .input-box {
          width: 650rpx;
          height: 60rpx;
          padding-left: 20rpx;
          background: #F5F8FF;
          border-radius: 30rpx;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          line-height: 25rpx;

          .input {
            margin-left: 20rpx;
          }

          .img-box {

            image {
              width: 36rpx;
              height: 36rpx;
            }
          }
        }
      }
    }

    .class-select {
      .labelclass {
        width: 45%;

      }

      .flex {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .class-item {
        margin: 20rpx 0;
        color: #2e3547;
        border-bottom: 1px solid #efefef;
        font-size: 32rpx;
        padding: 20rpx 20rpx;
        background-color: #fff;
        border-radius: 30rpx;

        .class-check {
          flex: 1.3;
        }

        .class-word {
          flex: 6;
          font-size: 30rpx;
          font-weight: 500;
          color: #333333;

          .data {
            margin-top: 10rpx;
            font-size: 24rpx;
            font-weight: 500;
            color: #666666;
          }
        }

        .class-data {
          flex: 5;
          margin-top: 45rpx;

          .music-line {
            margin-top: 10rpx;
            font-size: 26rpx;
            color: gray;
          }
        }
      }

      .quyu {
        color: #67c23a;
      }

      .lixian {
        color: #f56c6c !important;
      }
    }
  }

  .add-broadcast-box {
    height: 9vh;
    width: 75vw;
    background: #fff;
    padding: 0 20rpx;
    position: fixed;
    bottom: 40rpx;
    left: 9.5vw;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-radius: 50rpx;

    .add-broadcast-item {
      width: 56rpx;
      height: 56rpx;
      border-radius: 50%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      image {
        width: 100%;
      }
    }

    .add-broadcast-itemtwo {
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
<style>
.van-collapse-item__content {
  padding: 0 !important;
}

.van-cell__title {
  font-size: 34rpx;
}
</style>
