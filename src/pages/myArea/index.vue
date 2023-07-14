<template>
<div class="select-device-container">
  <div class="select-device-box">
    <div class="container">
      <checkbox-group @change="selectDevice">
        <label v-for="(item, index) of areaList" :key="index">
          <div class="device-item">
            <div class="device-item-left">
              <image src="/static/icon/iconarea.png" mode="widthFix" />
              <div class="title">{{ item.areaName }}</div>
            </div>
            <div class="device-item-right">
              <!-- <checkbox :value="index" /> -->
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
  areaQueryAll
} from '@/utils/getData'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      pushItem: {
        id: '',
        name: ''
      },
      areaList: [], // 获取的区域列表
      devices: []
    }
  },
  onShow () {
    this.getAreaList()
  },
  beforeMount () {
    wx.setNavigationBarTitle({title: '我的区域'})
  },
  onUnload () {
    this.devices = []
    this.pushItem = {
      id: '',
      title: ''
    }
  },
  methods: {
    ...mapMutations(['changeAreaList']),
    // 获取区域列表
    getAreaList () {
      areaQueryAll({pageSize: 100000, pageNum: 1})
        .then(res => {
          if (res.code === 200) {
            this.areaList = res.data.list
          }
        })
    },
    // 从区域列表选择区域
    selectDevice (e) {
      this.devices = []
      if (e.target.value.length > 0) {
        for (let m of e.target.value) {
          let obj = {}
          obj.id = this.areaList[parseInt(m)].areaId
          obj.name = this.areaList[parseInt(m)].areaName
          this.devices.push(obj)
        }
      }
      this.changeAreaList(this.devices)
    }
  }
}
</script>

<style lang="less" scoped>
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
        }
      }
    }
  }
}
</style>