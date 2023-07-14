<template>
  <div class="cart">
    <div class="add-music-broadcast">
      <div class="home-top">
        <scroll-view :scroll-x="true" class="can-scroll">
          <view class="can-scroll-item" v-for="(item, index) of tabList" :key="index" @click="changeStatus(item.value)">
            <view class="scroll-item-text" :class="{ 'init-font': item.value === status }">{{ item.name }}</view>
          </view>
        </scroll-view>
      </div>
      <div class="container">
        <checkbox-group @change="checkboxChangeArea" v-if="showDevice">
          <div class="box">
            <label class="device-bigBox" v-for="(item, index) of classificationList" :key="index">
              <div class="device-box" @click="goDevice(item)">
                <div class="device-box-img">
                  <image class="img" src="/static/icon/order.png" mode="widthFix" />
                </div>
                <div class="device-box-arrow">
                  <image class="img-2" src="/static/icon/jiantou.png" mode="widthFix" />
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
                  <div class="device-word" v-else>
                    {{ "" }}
                  </div>
                  <!-- <checkbox :value="item.musicType" color="#f5b619" /> -->
                </div>
              </div>
            </label>
          </div>
        </checkbox-group>
        <!-- <radio-group @change="selectMusicChange" v-if="!showDevice">
          <van-collapse accordion :value="activeName" @change="onChange">
            <van-collapse-item
              v-for="(item, index) of musicList"
              :key="index"
              :name="index + ''"
              :title="item.title"
              icon="/static/icon/gedanicon.png"
            > -->
        <checkbox-group @change="changeDetailsArea" v-if="!showDevice">
          <div class="music-item" v-for="(item, index) of musicList" :key="index">
            <div class="music-item-left">
              <div class="music-img-box">
                <image src="/static/icon/musicicontwo.png" mode="widthFix"></image>
              </div>
              <div class="music-title">
                {{ item.musicName || item.menuName }}
              </div>
            </div>
            <div class="music-item-right">
              <!-- <image src="/static/icon/homelaba.png" mode="widthFix" @click="toPlayMusic(index)" />
              <image src="/static/icon/bigstop.png" mode="widthFix" @click="toStopPlayMusic" /> -->
              <!-- <checkbox :value="item.musicPath" color="#f5b619" /> -->
            </div>
          </div>
        </checkbox-group>

        <!-- </van-collapse-item>
          </van-collapse>
        </radio-group> -->
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
  onShow () {
    wx.getStorage({
      key: 'login',
      success: () => {
        // this.getMusicList()
        this.getTypeList()
      },
      fail: () => {
        wx.redirectTo({
          url: '/pages/login/main'
        })
      }
    })
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

    // 点击区域下的设备checkbox
    // checkboxChangeAreaDevice (e) {
    //   this.saveList = e.target.value
    //   this.changeDeviceList(this.saveList)
    // },
    changeStatus (value) {
      this.status = value
      if (this.status === 1) {
        if (!this.showDevice) {
          this.showDevice = 'true'
        }
        this.classificationList = []
        this.getTypeList()
      } else if (this.status === 2) {
        if (!this.showDevice) {
          this.showDevice = 'true'
        }
        this.classificationList = []
        this.getProgramList()
      }
    },
    // 获取节目单
    getProgramList () {
      queryProgramType({ pageSize: 100000, pageNum: 1 })
        .then(res => {
          if (res.code === 200) {
            this.classificationList = res.data.list
            console.log(this.classificationList, 'this.classificationList')
            this.programDetailsList()
          }
        })
    },
    // 获取节目单下的歌曲
    programDetailsList () {
      queryProgramDetailsType()
    },
    // 获取音乐类型列表
    getTypeList () {
      this.musicList = []
      queryMusicType({ pageSize: 100000, pageNum: 1 })
        .then(res => {
          if (res.code === 200) {
            this.classificationList = res.data.list
            this.getMusicList()
          }
          console.log(this.classificationList, '1111')
        })
    },
    // 获取音乐列表
    getMusicList () {
      queryMusic({ pageSize: 100000, pageNum: 1, music_type: '' })
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
            console.log(this.classificationList, 'this.classificationList')
          }
        })
    },
    // 点击区域checkbox
    checkboxChangeArea (e) {
      this.getDeviceMsg(e.target.value)
    },
    // 点击详情页的选择框
    changeDetailsArea (e) {
      console.log(e.target.value)
    },
    // 获取音频分类内的音乐信息
    getDeviceMsg (item) {
      queryMusic({ pageSize: 100000, pageNum: 1, music_type: item })
        .then(res => {
          if (res.code === 200) {
            console.log(res.data.list)
          }
        })
    },
    // 进详情页
    goDevice (item) {
      this.showDevice = !this.showDevice
      this.musicList = []
      if (this.status === 1) {
        queryMusic({ pageSize: 100000, pageNum: 1, music_type: item.musicType })
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
    },
    // 播放音乐
    toPlayMusic (index) {
      let src = this.status === 1 ? this.musicList[index].musicPath : this.musicList[index].musicUrl
      this.innerAudioContext.src = src
      this.innerAudioContext.play()
    },
    // // 播放音乐
    // toPlayMusic (index1, index2) {
    //   let src = this.musicList[index1].list[index2].musicPath
    //   this.innerAudioContext.src = src
    //   this.innerAudioContext.play()
    // },
    // 播放音频函数
    // playAudio (index) {
    //   if (index >= this.audioList.length) {
    //     return
    //   }
    //   this.innerAudioContext.src = this.audioList[index]
    //   this.innerAudioContext.onEnded(() => {
    //     this.playAudio(index + 1)
    //   })
    //   this.innerAudioContext.play()
    // },
    // 停止播放音乐
    toStopPlayMusic () {
      this.innerAudioContext.stop()
    },
    // 点击折叠面板时触发的事件
    onChange (e) {
      this.activeName = e.target[0]
    },
    // 从音乐列表单选音乐
    selectMusicChange (e) {
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

    .container {
      height: 91vh;
      overflow-y: scroll;

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
            top: 0rpx;
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

      .music-item {
        margin: 20rpx 40rpx;
        padding-bottom: 20rpx;
        display: flex;
        border-bottom: 1px solid #efefef;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .music-item-left {
          display: flex;
          align-items: center;
          display: flex;
          line-height: 40rpx;

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
          }

          .item-left-bottom {
            margin-top: 8rpx;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            image {
              width: 36rpx;
            }

            .music-time {
              margin-left: 10rpx;
              font-size: 30rpx;
              color: #888888;
            }
          }
        }

        .music-item-right {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;

          image {
            width: 50rpx;
            margin-right: 30rpx;
          }
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
