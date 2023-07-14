<template>
<div class="select-device-container">
  <div class="select-device-box">
    <div class="container">
      <checkbox-group>
        <label v-for="(item, index) of deviceList" :key="index">
          <div class="device-item">
            <div class="device-item-left">
              <image src="/static/icon/deviceIcon.png" mode="widthFix" />
              <div class="title" :class="{online: item.deviceFormatStatus === '在线', outline: item.deviceFormatStatus === '离线'}">{{ item.deviceName }}</div>
            </div>
            <div class="device-item-right" @click="toControl(item)">
              <image src="/static/icon/sandian.png" mode="widthFix"/>
            </div>
          </div>
        </label>
      </checkbox-group>
    </div>
  </div>
  <van-dialog
    use-slot
    title="修改设备音量"
    confirm-button-color="#479CFD"
    :show="showConfirmDialog"
    show-cancel-button
    @close="showConfirmDialog = false"
    @confirm="confirmSetVolume"
  >
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
  SetSystemVolume
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
      }
    }
  },
  onShow () {
    this.getDeviceList()
  },
  beforeMount () {
    wx.setNavigationBarTitle({title: '我的设备'})
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
            this.deviceList = res.data
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
      getVoulme({sn: item.deviceId})
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
    .container {
      padding: 0 40rpx;
      height: 100%;
      overflow-y: scroll;
      .device-item {
        background: #ffffff;
        margin: 40rpx 0;
        padding: 30rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-radius: 20rpx;
        .device-item-left {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          image {
            width: 40rpx;
          }
          .title {
            color: #1A1A1A;
            font-size: 30rpx;
            margin-left: 20rpx;
          }
        }
        .device-item-right {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          image {
            width: 60rpx
          }
        }
      }
    }
  }
}
</style>