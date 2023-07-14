<template>
<div class="voice-container">
  <div class="add-voice-broadcast">
    <div class="container">
      <div class="timetwo">
        <van-circle v-model="currentRate" :stroke-width="6" layer-color="#F2F2F2" color="#f5b619" :size="180" :rate="30" :speed="0" :text="minutesOne + '' + minutesTwo + '' + ':' + secondsOne + '' + secondsTwo" />
      </div>
      <!-- <div class="time">{{ minutesOne + '' + minutesTwo + '' + ':' + secondsOne + '' + secondsTwo}}</div> -->
      <div class="process">{{ recording }}</div>
      <div class="tip-box">
        <div class="tip">每段录音最长10分钟</div>
        <!-- <div class="tip">音，系统可以流畅的衔接播放</div> -->
      </div>
      <div class="button-box">
        <div class="image-box">
          <image :src="recording === '' ? '/static/icon/micphone.png' : '/static/icon/stopicon.png'" mode="widthFix" @click="toStartRecord"/>
        </div>
        <div class="set-box" v-if="setVoiceShow">
          <div class="set-box-box">
            <div class="set-box-item" @click="tryListhenVoice">
              <div class="box-item-box blur">试听</div>
            </div>
            <div class="set-box-item" @click="reRecorde">
              <div class="box-item-box red">重录</div>
            </div>
            <div class="set-box-item" @click="compaly">
              <div class="box-item-box green">完成</div>
            </div>
          </div>
        </div>
      </div>
      <van-dialog
        use-slot
        title="请填写录音广播的标题"
        confirm-button-color="#479CFD"
        :show="showConfirmDialog"
        show-cancel-button
        @close="showConfirmDialog = false"
        @confirm="toConfirmSaveVoice"
      >
        <div class="voice-title">
          <input v-model="title">
        </div>
      </van-dialog>
    </div>
  </div>
</div>
</template>

<script>
import {
  aliOssSign,
  musicControlNew
} from '@/utils/getData'
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      totalSecond: 600,
      interval: null,
      setVoiceShow: false,
      showConfirmDialog: false,
      lijiBroadcast: false,
      innerAudioContext: {},
      recorderManager: {},
      localBroadcastUrl: '',
      title: '',
      text: 'www',
      minutesOne: 0, // 十分
      minutesTwo: 0, // 分
      secondsOne: 0, // 十秒
      secondsTwo: 0, // 秒
      recording: '', // 是否正在录音的展示字符
      dataObj: {
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: '',
        success_action_status: '200'
      },
      playForm: {
        action: 'play',
        area: [],
        music: [],
        playid: '',
        sn: [],
        volume: 100
      }
    }
  },
  computed: {
    ...mapState(['devices']),
    currentRate () {
      return (this.minutesOne * 10 * 60 + this.minutesTwo * 60 + this.secondsOne * 10 + this.secondsTwo) / this.totalSecond * 100
    }
  },
  onReady () {
    this.innerAudioContext = wx.createInnerAudioContext()
    this.recorderManager = wx.getRecorderManager()
    this.recorderManager.onStop(res => {
      this.localBroadcastUrl = res.tempFilePath
      this.setVoiceShow = true
      this.recording = ''
    })
  },
  beforeMount () {
    wx.setNavigationBarTitle({title: '添加录音'})
  },
  onLoad (e) {
    if (e.liji === 'ok') {
      this.lijiBroadcast = true
    }
  },
  onUnload () {
    clearInterval(this.interval)
    this.interval = null
    this.innerAudioContext.destroy()
    this.lijiBroadcast = false
    this.setVoiceShow = false
    this.showConfirmDialog = false
    this.minutesOne = 0
    this.minutesTwo = 0
    this.secondsOne = 0
    this.secondsTwo = 0
    this.localBroadcastUrl = ''
    this.recording = ''
    this.title = ''
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
    ...mapMutations(['changeMusicList', 'changeMusicTitle', 'changePlayMusicForm']),
    // 点击完成
    compaly () {
      if (this.lijiBroadcast) {
        this.title = 'ok'
        this.toConfirmSaveVoice()
      } else {
        this.showConfirmDialog = true
      }
    },
    // 获取oss签名参数
    getSts () {
      aliOssSign()
        .then(res => {
          let number = Date.parse(new Date()) + Math.ceil(Math.random() * 100000)
          let mediaType
          if (this.localBroadcastUrl.indexOf('.mp3') !== -1) {
            mediaType = '.mp3'
          } else if (this.localBroadcastUrl.indexOf('.aac') !== -1) {
            mediaType = '.aac'
          } else if (this.localBroadcastUrl.indexOf('.wav') !== -1) {
            mediaType = '.wav'
          } else if (this.localBroadcastUrl.indexOf('.pcm') !== -1) {
            mediaType = '.pcm'
          } else {
            mediaType = '.mp3'
          }
          if (res.code === 200) {
            this.dataObj.policy = res.data.policy
            this.dataObj.signature = res.data.signature
            this.dataObj.ossaccessKeyId = res.data.accessKeyId
            this.dataObj.key = res.data.dir + number + mediaType
            this.dataObj.dir = res.data.dir
            this.dataObj.host = res.data.host
            this.toUploadAliyun()
          }
        })
    },
    // 上传临时文件去阿里云
    toUploadAliyun () {
      wx.uploadFile({
        url: this.dataObj.host,
        filePath: this.localBroadcastUrl,
        name: 'file',
        formData: this.dataObj,
        success: this.onUpLoadSuccess,
        fail: err => {
          console.log(err)
        }
      })
    },
    // 上传阿里云成功后的回调
    onUpLoadSuccess () {
      if (this.lijiBroadcast) {
        this.playForm.area = []
        this.playForm.music = []
        this.playForm.playid = Date.parse(new Date()) + ''
        this.playForm.sn = this.devices
        this.playForm.music.push(`${this.dataObj.host}/${this.dataObj.key}`)
        musicControlNew(this.playForm)
          .then(res => {
            if (res.code === 200) {
              this.changePlayMusicForm(this.playForm)
              wx.hideLoading()
              wx.navigateBack()
            }
          })
      } else {
        let arr = [{
          id: '',
          name: ''
        }]
        arr[0].id = `${this.dataObj.host}/${this.dataObj.key}`
        arr[0].name = this.title
        this.changeMusicList(arr)
        this.changeMusicTitle(this.title)
        wx.hideLoading()
        wx.navigateBack()
      }
    },
    // 音频播放
    voicePlay (src) {
      if (src === '') {
        console.log('暂无语音')
        return
      }
      this.innerAudioContext.src = src
      this.innerAudioContext.play()
    },
    // 计时器
    timeStart () {
      if (this.secondsTwo < 9) {
        this.secondsTwo++
      } else {
        this.secondsTwo = 0
        if (this.secondsOne < 5) {
          this.secondsOne++
        } else {
          this.secondsOne = 0
          if (this.minutesTwo < 9) {
            this.minutesTwo++
          } else {
            this.minutesTwo = 0
            this.minutesOne++
          }
        }
      }
    },
    // 试听录音
    tryListhenVoice () {
      this.voicePlay(this.localBroadcastUrl)
    },
    // 开始录音
    toStartRecord () {
      if (this.recording === '正在录音') {
        this.recording = ''
        this.recorderManager.stop()
        clearInterval(this.interval)
      } else {
        this.recording = '正在录音'
        this.localBroadcastUrl = ''
        this.setVoiceShow = false
        this.minutesOne = 0
        this.minutesTwo = 0
        this.secondsOne = 0
        this.secondsTwo = 0
        this.recorderManager.start({
          duration: 600000,
          format: 'mp3'
        })
        this.interval = setInterval(() => {
          this.timeStart()
        }, 1000)
      }
    },
    // 重新录音
    reRecorde () {
      this.toStartRecord()
    },
    // 保存录音文件并准备上传
    toConfirmSaveVoice () {
      if (this.title !== '') {
        this.showConfirmDialog = false
        wx.showLoading({
          title: '音频上传中',
          mask: true
        })
        this.getSts()
      } else {
        this.showConfirmDialog = true
        wx.showToast({
          title: '请输入标题',
          icon: 'none',
          duration: 2500
        })
      }
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
.voice-container {
  .add-voice-broadcast {
    width: 100vw;
    height: 100vh;
    background: #ffffff;
    overflow-y: scroll;
    .container {
      padding: 0;
      height: 100%;
      .time {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 150rpx 0 30rpx;
        font-size: 70rpx;
        color: #1A1A1A;
      }
      .timetwo {
        padding: 60rpx 0 0;
        font-size: 70rpx;
        color: #1A1A1A;
        text-align: center;
      }
      .process {
        line-height: 100rpx;
        height: 100rpx;
        color: #21D47F;
        font-size: 40rpx;
        text-align: center;
      }
      .tip-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .tip {
          margin-top: 20rpx;
          font-size: 30rpx;
          color: #B3B3B3;
        }
      }
      .button-box {
        // position: absolute;
        // bottom: 220rpx;
        // left: 0;
        // width: 100%;
        margin-top: 90rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .image-box {
          background: #f5b619;
          width: 170rpx;
          height: 170rpx;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          image {
            width: 80rpx;
          }
        }
        .set-box {
          width: 100%;
          height: 110rpx;
          margin-top: 60rpx;
          .set-box-box {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .set-box-item {
              width: 33%;
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              .box-item-box {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                width: 100rpx;
                height: 100rpx;
                border-radius: 50%;
                color: #ffffff;
                font-size: 30rpx;
              }
              .blur {
                background: #f5b619
              }
              .red {
                background: #5d657b
              }
              .green {
                background: #3c4253
              }
            }
          }
        }
      }
      .voice-title {
        padding: 60rpx 90rpx;
        input {
          padding: 30rpx;
          background: #e6e6e6;
          border-radius: 20rpx;
        }
      }
    }
  }
}
</style>