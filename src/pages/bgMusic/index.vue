<template>
  <div class="cart">
    <div class="add-music-broadcast">
      <div class="home-top">
        <div c class="img-box" @click="back" v-if="!showDevice">
          <image src="/static/icon/return-2.png" mode="widthFix" />
        </div>
        <scroll-view :scroll-x="true" class="can-scroll">
          <view class="can-scroll-item" v-for="(item, index) of tabList" :key="index" @click="changeStatus(item.value)">
            <view class="scroll-item-text" :class="{ 'init-font': item.value !== status }">{{ item.name }}</view>
            <view :class="{ 'slider': item.value === status }"></view>
          </view>
        </scroll-view>
      </div>
      <div class="container">
        <checkbox-group v-if="showDevice && status === 1">
          <div class="box">
            <label class="device-bigBox" @click="goDevice(item)" v-for="(item, index) of classificationList" :key="index">
              <div class="device-box">
                <div class="device-box-img">
                  <image class="img" src="/static/icon/audio-2.png" mode="widthFix" />
                </div>
              </div>
              <div class="device-info">
                <div class="device-name">
                  {{ item.musicType || item.menuName }}
                </div>
                <div class="device-line">
                  <div class="device-word" v-if="item.childLength">
                    共 {{ item.childLength }} 首
                  </div>
                  <div class="img">
                    <image class="img-2" src="/static/icon/jiantou.png" mode="widthFix" />
                  </div>
                </div>
              </div>
            </label>
          </div>
        </checkbox-group>
        <checkbox-group v-if="showDevice && status === 2">
          <div class="box">
            <label class="device-bigBox" @click="goDevice(item)" v-for="(item, index) of classificationList2"
              :key="index">
              <div class="device-box">
                <div class="device-box-img">
                  <image class="img" src="/static/icon/program-2.png" mode="widthFix" />
                </div>
              </div>
              <div class="device-info">
                <div class="device-name">
                  {{ item.musicType || item.menuName }}
                </div>
                <div class="device-line">
                  <div class="device-word" v-if="item.childLength">
                    共 {{ item.childLength }} 首
                  </div>
                  <div class="img">
                    <image class="img-2" src="/static/icon/jiantou.png" mode="widthFix" />
                  </div>
                </div>
              </div>
            </label>
          </div>
        </checkbox-group>
        <checkbox-group v-if="!showDevice">
          <div class="music-item" :class="{ 'no-underline': index === item.length - 1 }"
            v-for="(item, index) of musicList" :key="index">
            <div class="music-item-left">
              <div class="music-title">
                <div class="index">{{ index + 1 }}</div>
                <div>{{ item.musicName || item.menuName }}</div>
              </div>
            </div>
            <div class="content"></div>
          </div>
        </checkbox-group>

      </div>
    </div>
    <div class="notice" v-if="defaultShow" :style="{ height: clientHeight + 'rpx' }">
      <image src="/static/icon/developing.png" style="width: 300rpx" mode="widthFix" />
      <div class="tip">正在开发中...</div>
    </div>
  </div>
</template>

<script>
import {
  queryMusic,
  queryMusicType,
  queryProgramType,
  queryProgramDetailsType
} from '@/utils/getData'
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      activeName: '0', // 折叠面板当前展开的name
      lijiBroadcast: false,
      innerAudioContext: {},
      title: '',
      musicid: [],
      musicList: [],
      classificationList: [],
      classificationList2: [],
      status: 1,
      showDevice: true,
      audioList: [],
      tabList: [
        { name: '音频', value: 1 },
        { name: '节目', value: 2 }
      ]
    }
  },
  computed: {
    ...mapState(['devices'])
  },
  onReady () {
    this.innerAudioContext = wx.createInnerAudioContext()
  },
  onLoad () {
    this.getTypeList()
    this.getProgramList()
  },
  beforeMount () {
    wx.setNavigationBarTitle({ title: '媒资列表' })
  },
  onHide () {
    this.innerAudioContext.stop()
    this.activeName = '0'
    this.musicList = []
    this.status = 1
  },
  onUnload () {
  },
  methods: {
    ...mapMutations(['changeMusicList', 'changeMusicTitle']),
    changeStatus (value) {
      this.status = value
      if (this.status === 1) {
        if (!this.showDevice) {
          this.showDevice = 'true'
        }
        // this.getTypeList()
      } else if (this.status === 2) {
        if (!this.showDevice) {
          this.showDevice = 'true'
        }
        // this.getProgramList()
      }
    },
    back () {
      this.showDevice = !this.showDevice
    },
    // 获取节目单
    getProgramList () {
      queryProgramType({ pageSize: 10000, pageNum: 1 })
        .then(res => {
          if (res.code === 200) {
            this.classificationList2 = res.data.list
          }
        })
    },
    // 获取音乐类型列表
    getTypeList () {
      this.musicList = []
      queryMusicType({ pageSize: 10000, pageNum: 1 })
        .then(res => {
          if (res.code === 200) {
            this.classificationList = res.data.list
            this.getMusicList()
          }
        })
    },
    // 获取音乐列表
    getMusicList () {
      queryMusic({ pageSize: 10000, pageNum: 1, music_type: '' })
        .then(res => {
          if (res.code === 200) {
            this.classificationList.forEach(val => {
              let childList = []
              res.data.list.forEach(item => {
                if (val.musicType === item.musicType) {
                  childList.push(item)
                }
              })
              this.$set(val, 'childList', childList)
              this.$set(val, 'childLength', childList.length)
            })
          }
        })
    },
    // 进详情页
    goDevice (item) {
      this.showDevice = !this.showDevice
      this.musicList = []
      if (this.status === 1) {
        queryMusic({ pageSize: 10000, pageNum: 1, music_type: item.musicType })
          .then(res => {
            if (res.code === 200) {
              this.musicList = res.data.list
            }
          })
      } else if (this.status === 2) {
        queryProgramDetailsType({ menunid: item.id })
          .then(res => {
            if (res.code === 200) {
              this.musicList = res.data
            }
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cart::before {
  content: "";
  display: table;
}



.cart {
  .add-music-broadcast {
    width: 100vw;
    height: 100vh;
    background: #ffffff;

    .home-top {
      background-color: #3c4253;
      height: 9vh;
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 999;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .img-box {
        width: 80rpx;
        height: 90rpx;
        position: fixed;
        left: 0rpx;
        top: 10rpx;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;

        image {
          width: 36rpx;
          height: 36rpx;
        }
      }



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
            font-size: 30rpx;
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
        // background: #3c4253 !important;
        // color: #ffffff !important;
      }
    }

    .container {
      height: 90vh;
      overflow-y: scroll;
      background-color: rgb(244, 247, 255);
      margin-top: 10rpx;

      .box {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        background-color: rgb(244, 247, 255);

        .device-bigBox {
          position: relative;
          height: 200rpx;
          width: 329rpx;
          margin: 20rpx 13rpx 20rpx 27rpx;
          background-color: #fff;
          border-radius: 20rpx;
          // box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);

          &:nth-child(2n) {
            margin-right: 0;
          }

          .device-box-img {
            margin: 20rpx 0 0 30rpx;
            width: 68rpx;
            height: 68rpx;

            .img {
              width: 100%;
            }
          }

          .device-info {
            margin: 15rpx 0 0 30rpx;
            font-size: 28rpx;

            .device-name {
              margin-bottom: 10rpx;
              font-size: 32rpx;
              font-weight: 500;
              color: #333333;
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

      .no-underline {
        border-bottom: none;
      }

      .music-item {
        padding: 20rpx 40rpx;
        padding-bottom: 20rpx;
        background-color: #fff;

        .music-item-left {
          display: flex;
          align-items: center;
          line-height: 40rpx;
          margin-bottom: 20rpx;

          .music-img-box {
            width: 30rpx;
            height: 30rpx;
            margin-right: 20rpx;

            image {
              width: 100%;
            }
          }

          .music-title {
            font-size: 30rpx;
            color: #444444;
            display: flex;
            align-items: center;
            justify-content: center;

            .index {
              margin-right: 30rpx;
            }
          }
        }

        .content {
          border-bottom: 1px solid rgb(244, 247, 255);
          padding-top: -20rpx;
        }

        .no-underline {
          border-bottom: none;
        }
      }
    }
  }
}

.notice {
  text-align: center;

  image {
    padding-top: 30%;
  }

  .tip {
    margin-top: 0.3rem;
    font-size: 30rpx;
  }
}
</style>
<style>
.van-collapse-item__content {
  padding: 0 !important;
}

.van-cell__title {
  font-size: 36rpx;
}
</style>
