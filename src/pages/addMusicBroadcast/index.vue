<template>
  <div class="music-container">
    <div class="add-music-broadcast">
      <div class="title-box">专辑歌单</div>
      <div class="home-top">
        <scroll-view :scroll-x="true" class="can-scroll">
          <view class="can-scroll-item" v-for="(item, index) of tabList" :key="index" @click="changeStatus(item.value)">
            <view class="scroll-item-text" :class="{ 'init-font': item.value === status }">{{ item.name }}</view>
          </view>
        </scroll-view>
      </div>
      <div class="container" :style="lijiBroadcast ? 'height: 73vh' : 'height: 82vh'">
        <!-- 从添加广播音乐页进入 多选-->
        <checkbox-group @change="checkboxChangeArea" v-if="showDevice && lijiBroadcast && status === 1">
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
                    {{ '' }}
                  </div>
                  <checkbox v-if="item.childLength && lijiBroadcast && status === 1" :value="item.childList || item.id"
                    color="#f5b619" />
                </div>
              </div>
            </label>
          </div>
        </checkbox-group>
        <!-- 从添加广播音乐页进入 单选-->
        <radio-group @change="checkboxChangeArea" v-if="showDevice && lijiBroadcast && status === 2">
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
                    {{ '' }}
                  </div>
                  <radio v-if="lijiBroadcast && status === 2" :value="index" color="#f5b619" />
                </div>
              </div>
            </label>
          </div>
        </radio-group>
        <!-- 从添加任务页进入节目 -->
        <radio-group @change="checkboxChangeArea" v-if="showDevice && !lijiBroadcast">
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
                  <!-- <radio v-if="item.childLength && !lijiBroadcast && status === 2" :value="index" color="#f5b619" /> -->
                  <radio v-if="!lijiBroadcast && status === 2" :value="index" color="#f5b619" />
                </div>
              </div>
            </label>
          </div>
        </radio-group>

        <!-- 从任务列表进入，为单选 -->
        <radio-group @change="selectMusicChange" v-if="!showDevice && !lijiBroadcast">
          <div class="music-item" v-for="(item, index) of musicList" :key="index">
            <div class="music-item-left">
              <div class="music-img-box">
                <image src="/static/icon/musicicontwo.png" mode="widthFix"></image>
              </div>
              <div class="music-title">{{ item.musicName }}</div>
            </div>
            <div class="music-item-right">
              <!-- <image src="/static/icon/homelaba.png" mode="widthFix" @click="toPlayMusic(index)" />
              <image src="/static/icon/bigstop.png" mode="widthFix" @click="toStopPlayMusic" /> -->
              <radio v-if="status === 1" :value="index" color="#f5b619" />
            </div>
          </div>
        </radio-group>
        <!-- 从广播添加音乐进入，为多选 -->
        <checkbox-group @change="changeDetailsArea" v-if="!showDevice && lijiBroadcast">
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
              <checkbox v-if="status === 1" :value="item.musicPath || item.musicUrl" color="#f5b619" />
            </div>
          </div>
        </checkbox-group>
      </div>
      <div class="add-item" v-if="lijiBroadcast">
        <button @click="toSubmitBroadcast">确认添加</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryMusic,
  musicControlNew,
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
      menu_id: null,
      title: '',
      musicid: [{
        id: '',
        name: ''
      }],
      showDevice: true,
      status: 1,
      musicList: [],
      classificationList: [],
      tabList: [
        { name: '音频', value: 1 },
        { name: '节目', value: 2 }
      ],
      playForm: {
        action: 'play',
        area: [],
        music: [],
        playid: '',
        loop: 0,
        sn: [],
        volume: 100,
        menu_id: []
      }
    }
  },
  computed: {
    ...mapState(['devices'])
  },
  onReady () {
    this.innerAudioContext = wx.createInnerAudioContext()
  },
  onShow () {
    this.getTypeList()
    this.status = 1
  },
  onLoad (e) {
    if (e.liji === 'ok') {
      this.lijiBroadcast = true
    }
  },
  onUnload () {
    this.musicList = []
    this.lijiBroadcast = false
    this.innerAudioContext.stop()
    this.activeName = '0'
    this.musicid = [{
      id: '',
      name: ''
    }]
    this.playForm = {
      action: 'play',
      area: [],
      music: [],
      playid: '',
      sn: [],
      volume: 100
    }
  },
  methods: {
    ...mapMutations(['changeMusicList', 'changeMusicTitle', 'changePlayMusicForm', 'changeProgramTitle', 'changeProgramMenuId']),
    // 获取音乐类型列表
    getTypeList () {
      this.musicList = []
      queryMusicType({ pageSize: 100000, pageNum: 1 })
        .then(res => {
          if (res.code === 200) {
            this.classificationList = res.data.list
            this.getMusicList()
          }
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
                  childList.push(item.musicPath)
                }
              })
              this.$set(val, 'childList', JSON.stringify(childList))
              this.$set(val, 'childLength', childList.length)
            })
          }
        })
    },
    changeStatus (value) {
      if (this.status !== value) {
        this.playForm.area = []
        this.playForm.music = []
        this.playForm.playid = ''
        this.playForm.sn = []
      }
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
          }
        })
    },
    // 点击区域checkbox
    checkboxChangeArea (e) {
      console.log(e);
      // 从播放音乐页进去
      if (this.lijiBroadcast) {
        if (this.status === 1) { // 音频
          this.playForm.area = []
          this.playForm.playid = Date.parse(new Date()) + ''
          this.playForm.sn = this.devices
          this.playForm.menu_id = []
          this.playForm.music = []
          if (e.target.value.length === 1) {
            this.playForm.music = JSON.parse(e.target.value)
          } else if (e.target.value.length > 1) {
            let valList = []
            e.target.value.forEach(item => {
              valList = valList.concat(JSON.parse(item))
            })
            this.playForm.music = valList
          }
        } else { // 节目
          this.playForm.music = []
          this.playForm.menu_id = []
          this.playForm.area = []
          this.playForm.playid = Date.parse(new Date()) + ''
          this.playForm.sn = this.devices
          this.playForm.menu_id.push(this.classificationList[e.target.value].id)
        }
        // 从任务选择页进入
      } else {
        this.menu_id = this.classificationList[e.target.value].id
        this.title = this.classificationList[e.target.value].menuName
        this.changeMusicList([])
        this.changeMusicTitle('')
        this.changeProgramTitle(this.title)
        this.changeProgramMenuId(this.menu_id)
      }
    },
    // 从音乐列表单选音乐
    selectMusicChange (e) {
      let array = [{
        id: '',
        name: ''
      }]
      this.title = this.musicList[e.target.value].musicName
      array[0].id = this.musicList[e.target.value].musicPath
      array[0].name = this.musicList[e.target.value].musicName
      this.changeMusicList(array)
      this.changeMusicTitle(this.title)
      this.changeProgramTitle('')
      this.changeProgramMenuId('')
    },
    changeDetailsArea (e) {
      this.playForm.area = []
      this.playForm.music = []
      this.playForm.playid = Date.parse(new Date()) + ''
      this.playForm.sn = this.devices
      this.playForm.music = e.target.value
    },
    // 进详情页
    goDevice (item) {
      this.showDevice = !this.showDevice
      this.playForm.area = []
      this.playForm.music = []
      this.playForm.playid = ''
      this.playForm.sn = []
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
    // 停止播放音乐
    toStopPlayMusic () {
      this.innerAudioContext.stop()
    },

    toSubmitBroadcast () {
      musicControlNew(this.playForm)
        .then(res => {
          if (res.code === 200) {
            this.changePlayMusicForm(this.playForm)
            wx.navigateBack()
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.add-item {
  padding: 10rpx 40rpx;

  button {
    color: #ffffff;
    background: #f5b619;
    border: none;
  }
}

.music-container {
  .add-music-broadcast {
    width: 100vw;
    height: 100vh;
    background: #ffffff;

    .title-box {
      padding: 30rpx 20rpx;
      color: #1a1a1a;
      font-size: 36rpx;
      border-bottom: 1px solid #ebedf0;
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

    .container {
      height: 73vh;
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
</style>
<style>
.van-collapse-item__content {
  padding: 0 !important;
}

.van-cell__title {
  font-size: 36rpx;
}
</style>
