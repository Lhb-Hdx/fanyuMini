<template>
  <div class="add-broadcast-container">
    <div class="home-top">
      <scroll-view :scroll-x="true" class="can-scroll">
        <view class="can-scroll-item" v-for="(item, index) of tabList" :key="index" @click="changeStatus(item.value)">
          <view class="scroll-item-text" :class="{ 'init-font': item.value === status }">{{ item.name }}</view>
        </view>
      </scroll-view>
    </div>

    <div class="class-select-box" v-if="status === 1">
      <checkbox-group @change="checkboxChangeArea" v-if="showDevice">
        <div class="box">
          <label class="device-bigBox" v-for="(item, index) of areaList" :key="index">
            <div class="device-box" @click="getList(item)">
              <div class="device-box-img">
                <image class="img" src="/static/icon/horn.png" mode="widthFix" />
              </div>
              <div class="device-box-arrow">
                <image class="img-2" src="/static/icon/jiantou.png" mode="widthFix" />
              </div>
            </div>
            <div class="device-info">
              <div class="device-name">{{ item.areaName }}</div>
              <div class="device-line">
                <div class="device-word">{{ "" }}</div>
                <checkbox :value="item.areaId" color="#f5b619" />
              </div>
            </div>
          </label>
        </div>
      </checkbox-group>

      <div class="device" v-if="!showDevice">
        <div class="search">
          <div class="input-box">
            <input class="input" placeholder="请输入设备名称" v-model="searchData" />
            <div class="img-box" @click="search">
              <image src="/static/icon/search.png" mode="widthFix" />
            </div>
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
                  <div class="music-line">音量：{{ item.volume }}</div>
                  <div class="music-line">
                    联网：<span :style="{ color: item.deviceStatus === 1 ? 'blue' : 'red' }">{{ item.deviceStatus === 0 ?
                      '离线' :
                      '在线' }}</span>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </checkbox-group>
      </div>
    </div>

    <div class="class-select-box pad" v-if="status === 2">
      <checkbox-group @change="checkboxChangeDevice">
        <div class="class-select">
          <label v-for="(item, index) of deviceList" :key="index" class="labelclass">
            <div class="class-item quyu" :class="{ lixian: item.lixian === 1 }">
              <checkbox :value="item.deviceId" color="#f5b619" />
              {{ item.deviceName }}
            </div>
          </label>
        </div>
      </checkbox-group>
    </div>
    <div class="add-broadcast-box" v-if="show">
      <div class="add-broadcast-item" @click="toadd('text')">
        <image src="/static/icon/add-text.png" mode="widthFix" />
      </div>
      <div class="add-broadcast-item" @click="toadd('voice')">
        <image src="/static/icon/add-micphone.png" mode="widthFix" />
      </div>
      <div class="add-broadcast-itemtwo" @click="toStopBroadcast">
        <image src="/static/icon/jiting.png" mode="widthFix" />
      </div>
      <div class="add-broadcast-item" @click="toadd('music')">
        <image src="/static/icon/add-music.png" mode="widthFix" />
      </div>
      <div class="add-broadcast-item" @click="toadd('duijiang')">
        <image src="/static/icon/add-duijiangji.png" mode="widthFix" />
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
              }
            }
            this.deviceList = res.data
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
      console.log(this.ids);
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
      this.changeDeviceList(this.saveList)
    },
    checkboxChangeDevice (e) { // 点击设备checkbox
      this.saveList = e.target.value
      this.changeDeviceList(this.saveList)
    },
    toadd (type) {
      if (this.logined) {
        console.log(this.saveList)
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

.home-top {
  height: 9vh;
  // position: fixed;
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

      .scroll-item-text {
        width: 80%;
        color: #2e3547;
        background: #efefef;
        font-size: 30rpx;
        display: inline-block;
        padding: 20rpx 0;
        border-radius: 10rpx;
      }
    }
  }

  .init-font {
    background: #3c4253 !important;
    color: #ffffff !important;
  }
}

.add-broadcast-container {
  background: #ffffff;
  overflow-y: scroll;
  height: 100vh;
  position: relative;

  .pad {
    padding: 0 50rpx;
  }

  .mar {
    margin-top: 100rpx;
  }

  .class-select-box {
    height: 79vh;
    overflow-y: scroll;
    position: relative;

    .box {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      .device-bigBox {
        position: relative;
        height: 230rpx;
        width: 330rpx;
        margin: 20rpx 13rpx 20rpx 27rpx;

        &:nth-child(2n) {
          margin-right: 0;
        }

        background-color: rgb(220, 224, 235);
        border-radius: 20rpx;

        .device-box-img {
          margin: 30rpx 0 0 30rpx;
          width: 80rpx;
          height: 80rpx;

          .img {
            width: 60%;
          }
        }

        .device-box-arrow {
          position: absolute;
          display: inline-block;
          top: 10rpx;
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
          margin-left: 20rpx;
          font-size: 28rpx;

          .device-name {
            margin-bottom: 10rpx;
          }

          .device-line {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 24rpx;
            line-height: 30rpx;
            color: rgb(100, 100, 100);

            .device-word {
              width: 250rpx;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }

    .device {
      .search {
        position: relative;
        width: 100%;
        // position: fixed;
        // top: 100rpx;
        background-color: rgba(255, 255, 255, 1);
        z-index: 10;

        .input-box {
          margin: 0rpx 30rpx;
          background: #efefef;
          border-radius: 16rpx;
          padding: 30rpx;

          .input {
            height: 38rpx;
            min-height: 38rpx;
          }
        }

        .img-box {
          z-index: 99;
          position: absolute;
          width: 100rpx;
          height: 100rpx;
          right: 30rpx;
          top: 0rpx;
          display: flex;
          justify-content: center;
          align-items: center;

          image {
            width: 50%;
          }
        }
      }
    }

    .all-class-box {
      color: #479cfd;
      border: 1px solid #479cfd;
      border-radius: 10rpx;
      font-size: 36rpx;
      text-align: center;
      padding: 15rpx 0;
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
        padding: 30rpx 0;

        .class-check {
          flex: 1.5;
        }

        .class-word {
          flex: 7;

          .data {
            margin-top: 10rpx;
            font-size: 26rpx;
            color: gray;
          }
        }

        .class-data {
          flex: 3;

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

    .stop-box {
      position: fixed;
      bottom: 20vh;
      right: 30rpx;
      width: 90rpx;
      height: 90rpx;
      background: #f56c6c;
      border-radius: 50%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .stop {
        border-radius: 4rpx;
        width: 30rpx;
        height: 30rpx;
        background: #ffffff;
      }
    }
  }

  .add-broadcast-box {
    height: 12vh;
    width: 100vw;
    background: #ffffff;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .add-broadcast-item {
      width: 80rpx;
      height: 80rpx;
      background: #3c4253;
      border-radius: 50%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      image {
        width: 60%;
      }
    }

    .add-broadcast-itemtwo {
      width: 120rpx;
      height: 120rpx;
      background: #f4531c;
      border-radius: 50%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      image {
        width: 88%;
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
