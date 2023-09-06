<template>
  <div class="select-device-container">
    <div class="select-device-box">
      <div class="container">
        <checkbox-group @change="selectDevice">
          <label v-for="(item, index) of deviceList" :key="index">
            <div class="device-item">
              <div class="device-item-left">
                <!-- <image src="/static/icon/deviceIcon.png" mode="widthFix" />
                <div class="title"
                  :class="{ online: item.deviceFormatStatus === '在线', outline: item.deviceFormatStatus === '离线' }">{{
                    item.deviceName }}</div> -->
                <div class="title">{{ item.deviceName }}</div>
                <div class="state" :class="item.deviceFormatStatus === '离线' ? 'outline-color' : 'online-color'">{{
                  item.deviceFormatStatus }}</div>
              </div>
              <!-- <div class="device-item-right" v-if="item.deviceFormatStatus === '在线'"> -->
              <div class="device-item-right">
                <checkbox :value="index" color="#f5b619" />
              </div>
            </div>
          </label>
        </checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
import {
  deviceQuerySchoolAll
} from '@/utils/getData'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      pushItem: {
        id: '',
        name: ''
      },
      deviceList: [], // 获取的设备列表
      devices: []
    }
  },
  onShow () {
    this.getDeviceList()
  },
  beforeMount () {
    wx.setNavigationBarTitle({ title: '选择设备' })
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
    }
  }
}
</script>

<style lang="less" scoped>
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
      padding: 0 30rpx;
      height: 100%;
      overflow-y: scroll;

      .device-item {
        background: #ffffff;
        margin: 24rpx 0;
        padding: 24rpx;
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
            margin-right: 20rpx;
          }

          .state {
            font-size: 24rpx;
            padding: 0 8rpx;
            border-radius: 6rpx;

          }

          .online-color {
            color: #67C23A;
            border: 1px solid #67C23A;
          }

          .outline-color {
            color: gray;
            border: 1px solid gray;
          }
        }

        .device-item-right {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
        }
      }
    }
  }
}
</style>
