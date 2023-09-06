<template>
  <div class="select-device-container">
    <div class="select-device-box">
      <div class="search">
        <div class="input-box">
          <div class="img-box" @click="search">
            <image src="/static/icon/search-2.png" mode="widthFix" />
          </div>
          <input class="input" placeholder="请输入SN号" v-model="sn" />
        </div>
      </div>
      <div class="container">
        <div v-for="(item, index) of deviceList" :key="index">
          <div class="device-item">
            <div class="left">
              <div class="num">{{ index + 1 }}</div>
              <div class="device-item-left">
                <div class="name">
                  <div class="title">{{ item.deviceName }}</div>
                  <div class="state" :class="item.deviceFormatStatus === '离线' ? 'outline-color' : 'online-color'">{{
                    item.deviceFormatStatus }}</div>
                </div>
                <div class="id">ID：{{ item.deviceId }}</div>
              </div>
            </div>
            <div class="device-item-right" @click="getDeviceVoulme(item)">
              <image src="/static/icon/volume-2.png" mode="widthFix" />
              <div class="volume">修改音量</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-dialog use-slot title="修改设备音量" confirm-button-color="#479CFD" :show="showConfirmDialog" show-cancel-button
      @close="showConfirmDialog = false" @confirm="confirmSetVolume">
      <div class="voice-title">
        <input placeholder="请输入0-100之内的值" v-model="volume" @input="inputVolume">
      </div>
    </van-dialog>
  </div>
</template>

<script>
import {
  deviceQuerySchoolAll,
  getVoulme,
  SetSystemVolume,
  SnQuerySchoolAll
} from '@/utils/getData'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      showConfirmDialog: false, // 输入音量的弹窗的显示与隐藏
      volume: '', // 初始音量
      pushItem: {
        id: '',
        name: ''
      },
      deviceList: [], // 获取的设备列表
      devices: [],
      changeVoiceForm: { // 修改设备音量的参数对象
        systemVolume: '',
        sn: ''
      },
      line: '离线',
      sn: ''
    }
  },
  onShow () {
    this.getDeviceList()
  },
  beforeMount () {
    wx.setNavigationBarTitle({ title: '我的设备' })
  },
  onUnload () {
    this.devices = []
    this.pushItem = {
      id: '',
      title: ''
    }
  },
  methods: {
    ...mapMutations(['changeDeviceList']),
    // 输入音量的值限定在0~100
    inputVolume () {
      if (this.volume < 0) {
        this.volume = 0
      } else if (this.volume > 100) {
        this.volume = 100
      }
    },
    search () {
      if (this.sn) {
        SnQuerySchoolAll({ sn: this.sn })
          .then(res => {
            if (res.code === 200) {
              console.log(res);
              for (let n of res.data) {
                if (n.deviceName) {
                  if (n.deviceName.indexOf('在线') > -1) {
                    n.deviceFormatStatus = '在线'
                  } else if (n.deviceName.indexOf('离线') > -1) {
                    n.deviceFormatStatus = '离线'
                  } else {
                    n.deviceFormatStatus = '在线'
                  }
                }
              }
              const listData = res.data.map(item => {
                const modifiedDeviceName = item.deviceName.replace(/\[离线\]|\[在线\]/g, '');
                return { ...item, deviceName: modifiedDeviceName };
              });
              this.deviceList = listData
            }
          })
      } else {
        this.getDeviceList()
      }
    },
    // 获取设备列表
    getDeviceList () {
      deviceQuerySchoolAll()
        .then(res => {
          if (res.code === 200) {
            for (let n of res.data) {
              if (n.deviceName) {
                if (n.deviceName.indexOf('在线') > -1) {
                  n.deviceFormatStatus = '在线'
                } else if (n.deviceName.indexOf('离线') > -1) {
                  n.deviceFormatStatus = '离线'
                } else {
                  n.deviceFormatStatus = '在线'
                }
              }
            }
            const listData = res.data.map(item => {
              const modifiedDeviceName = item.deviceName.replace(/\[离线\]|\[在线\]/g, '');
              return { ...item, deviceName: modifiedDeviceName };
            });
            this.deviceList = listData
          }
        })
    },
    // 从设备列表选择设备
    selectDevice (e) {
      this.devices = []
      if (e.target.value.length > 0) {
        for (let m of e.target.value) {
          let obj = {}
          obj.id = this.deviceList[parseInt(m)].deviceId
          obj.name = this.deviceList[parseInt(m)].deviceName
          this.devices.push(obj)
        }
      }
      this.changeDeviceList(this.devices)
    },
    // 获取当前选中设备的音量
    getDeviceVoulme (item) {
      this.changeVoiceForm.sn = item.deviceId
      getVoulme({ sn: item.deviceId })
        .then(res => {
          if (res.code === 200) {
            this.showConfirmDialog = true
            this.volume = parseInt(res.data.split(':')[0])
          }
        })
    },
    // 对单个设备执行不同的操作
    toControl (item) {
      wx.showActionSheet({
        itemList: ['修改音量'],
        success: res => {
          if (res.tapIndex === 0) {
            this.changeVoiceForm.sn = item.deviceId
            this.getDeviceVoulme(item)
          } else if (res.tapIndex === 1) {
            this.playForm.action = 'stop'
            this.tolijiPlay(item)
          } else if (res.tapIndex === 2) {
            wx.navigateTo({
              url: `/pages/addBroadcast/main?form=${JSON.stringify(this.goodList[item])}`
            })
          } else if (res.tapIndex === 3) {
            this.totaskDelete(this.goodList[item].id)
          }
        },
        fail (res) {
          console.log(res.errMsg)
        }
      })
    },
    // 确认修改音量
    confirmSetVolume () {
      this.changeVoiceForm.systemVolume = this.volume === '' ? 0 : this.volume
      SetSystemVolume(this.changeVoiceForm)
        .then(res => {
          if (res.code === 200) {
            this.showConfirmDialog = false
            wx.showToast({
              title: '操作成功',
              icon: 'none',
              duration: 3000
            })
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.voice-title {
  padding: 60rpx 90rpx;

  input {
    padding: 30rpx;
    background: #e6e6e6;
    border-radius: 20rpx;
  }
}

.online {
  color: #67C23A !important
}

.outline {
  color: #F56C6C !important
}

.select-device-container {
  .select-device-box {
    width: 100vw;
    height: 100vh;
    background: #F2F2F2;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;

    .search {
      width: 100vw;
      height: 100rpx;
      background-color: #fff;
      position: fixed;
      left: 0;
      display: flex;
      align-items: center;

      .input-box {
        width: 670rpx;
        height: 60rpx;
        margin: 0 40rpx;
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

    .container {
      padding: 100rpx 40rpx 0 40rpx;
      height: 100%;
      overflow-y: scroll;
      background: #F5F8FF;

      .device-item {
        background: #ffffff;
        margin: 20rpx 0;
        padding: 10rpx 20rpx 10rpx 20rpx;
        border-radius: 20rpx;

        .left {
          display: flex;
          margin-top: 20rpx;
          border-bottom: 1px solid #eee;

          .online-color {
            color: #159F5C;
            border: 1px solid #159F5C;
          }

          .outline-color {
            color: #BBBBBB;
            border: 1px solid #BBBBBB;
          }

          .num {
            flex: 1;
          }

          .device-item-left {
            flex: 15;

            .name {
              display: flex;

              .title {
                color: #1A1A1A;
                font-size: 30rpx;
                margin: 0 20rpx 0 0;
                max-width: 460rpx;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              .state {
                font-size: 24rpx;
                padding: 0 8rpx;
                border-radius: 6rpx;
              }
            }

            .id {
              font-size: 24rpx;
              font-weight: 500;
              color: #999999;
              margin: 20rpx 0 10rpx 0rpx;
              padding-bottom: 10rpx;
            }
          }
        }


        .device-item-right {
          margin: 15rpx 0;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;

          image {
            width: 30rpx
          }

          .volume {
            margin: 0 10rpx;
            font-size: 24rpx;
            color: #666666;
          }
        }
      }
    }
  }
}
</style>
