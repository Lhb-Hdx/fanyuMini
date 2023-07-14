<template>
<div class="text-container">
  <div class="add-text-broadcast">
    <div class="container">
      <div class="text">添加文字</div>
      <textarea placeholder="请输入文字" v-model="content"/>
      <div class="text-two">选择读音人</div>
      <picker @change="bindNameChange" :range="nameList" range-key="voiceName">
        <div class="add-item">
          <div class="select-box">
            <input placeholder="请选择读音人" v-model="readName" :disabled="true">
            <image src="/static/icon/jiantou.png" mode="widthFix"/>
          </div>
        </div>
      </picker>
      <div class="listen-box" @click="toTryListen">
        <image src="/static/icon/guangbothree.png" mode="widthFix"/>
        <div class="text">试听一下</div>
      </div>
      <div class="submit-box">
        <button @click="compaly" :disabled="content === ''">确认添加</button>
      </div>
    </div>
  </div>
  <van-dialog
    use-slot
    title="请填写文字广播的标题"
    confirm-button-color="#f5b619"
    :show="showConfirmDialog"
    show-cancel-button
    @close="showConfirmDialog = false"
    @confirm="confirmTextToVoice"
  >
    <div class="voice-title">
      <input v-model="title">
    </div>
  </van-dialog>
</div>
</template>

<script>
import {
  aliOssSign,
  musicControlNew,
  getVoiceNameLst,
  textToVoice
} from '@/utils/getData'
import { mapMutations, mapState } from 'vuex'
// eslint-disable-next-line no-undef
const plugin = requirePlugin('WechatSI')
export default {
  data () {
    return {
      readName: '', // 选中的读音人的名字
      readNameValue: '', // 选中的读音人的值
      nameList: [], // 读音人列表
      showConfirmDialog: false,
      innerAudioContext: {},
      localBroadcastUrl: '',
      content: '',
      title: '',
      lijiBroadcast: false,
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
    ...mapState(['devices'])
  },
  onReady () {
    this.innerAudioContext = wx.createInnerAudioContext()
  },
  onShow () {
    this.getNameList()
  },
  onLoad (e) {
    if (e.liji === 'ok') {
      this.lijiBroadcast = true
    }
  },
  onUnload () {
    this.readName = ''
    this.readNameValue = ''
    this.nameList = []
    this.content = ''
    this.title = ''
    this.lijiBroadcast = false
    this.innerAudioContext.stop()
    this.playForm = {
      action: 'play',
      area: [],
      loop: 0,
      music: [],
      playid: '',
      sn: [],
      volume: 100
    }
  },
  methods: {
    ...mapMutations(['changeMusicList', 'changeMusicTitle', 'changePlayMusicForm']),
    toTryListen () {
      if (this.content === '') {
        wx.showToast({
          title: '请输入内容',
          icon: 'none',
          duration: 2500
        })
      } else {
        textToVoice({name: this.readNameValue, text: this.content})
          .then(res => {
            if (res.code === 200 && res.data !== '' && res.data !== null) {
              this.voicePlay(res.data)
            } else {
              wx.showToast({
                title: '文字转语音失败',
                icon: 'none',
                duration: 2500
              })
            }
          })
      }
    },
    confirmTextToVoice () {
      if (this.title !== '') {
        this.showConfirmDialog = false
        textToVoice({name: this.readNameValue, text: this.content})
          .then(res => {
            if (res.code === 200 && res.data !== '' && res.data !== null) {
              if (this.lijiBroadcast) {
                this.playForm.area = []
                this.playForm.music = []
                this.playForm.playid = Date.parse(new Date()) + ''
                this.playForm.sn = this.devices
                this.playForm.music.push(res.data)
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
                arr[0].id = res.data
                arr[0].name = this.title
                this.changeMusicList(arr)
                this.changeMusicTitle(this.title)
                wx.hideLoading()
                wx.navigateBack()
              }
            } else {
              wx.showToast({
                title: '文字转语音失败',
                icon: 'none',
                duration: 2500
              })
            }
          })
      } else {
        this.showConfirmDialog = true
        wx.showToast({
          title: '请输入标题',
          icon: 'none',
          duration: 2500
        })
      }
    },
    getNameList () { // 获取读音人列表
      getVoiceNameLst()
        .then(res => {
          if (res.code === 200) {
            this.nameList = res.data
            this.readName = res.data[0].voiceName
            this.readNameValue = res.data[0].voiceEnum
          }
        })
    },
    bindNameChange (e) { // 选择不同的读音人
      this.readName = this.nameList[parseInt(e.target.value)].voiceName
      this.readNameValue = this.nameList[parseInt(e.target.value)].voiceEnum
    },
    // 点击完成
    compaly () {
      if (this.lijiBroadcast) {
        this.title = 'ok'
        this.confirmTextToVoice()
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
    // 文字转语音
    wordYun () {
      plugin.textToSpeech({
        lang: 'zh_CN',
        tts: true,
        content: this.content,
        success: res => {
          this.localBroadcastUrl = res.filename
          this.voicePlay(this.localBroadcastUrl)
        },
        fail: err => {
          if (err.retcode === -20002) {
            wx.showToast({
              title: '输入的待合成格式不正确',
              icon: 'none',
              duration: 2500
            })
          }
        }
      })
    },
    // 音频播放
    voicePlay (src) {
      if (src === '' || src === null) {
        wx.showToast({
          title: '暂无语音',
          icon: 'none',
          duration: 2500
        })
        return
      }
      this.innerAudioContext.src = src
      this.innerAudioContext.play()
    },
    toConfirmSaveVoice () {
      if (this.title !== '') {
        plugin.textToSpeech({
          lang: 'zh_CN',
          tts: true,
          content: this.content,
          success: res => {
            wx.showLoading({
              title: '音频上传中',
              mask: true
            })
            this.localBroadcastUrl = res.filename
            console.log(res.filename)
            this.showConfirmDialog = false
            this.downloadToLocal(res.filename)
          },
          fail: err => {
            if (err.retcode === -20002) {
              wx.showToast({
                title: '输入的待合成格式不正确',
                icon: 'none',
                duration: 2500
              })
            }
          }
        })
      }
    },
    downloadToLocal (url) {
      wx.downloadFile({
        url: url,
        success: res => {
          this.localBroadcastUrl = res.tempFilePath
          this.getSts()
        },
        fail: err => {
          console.log(err)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.submit-box {
  margin-top: 50rpx;
  button {
    color: #ffffff;
    background: #f5b619;
    border: none
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
.text-container {
  .add-text-broadcast {
    width: 100vw;
    height: 100vh;
    background: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    overflow-y: scroll;
    .container {
      padding: 0 40rpx;
      height: 100%;
      .text {
        padding: 30rpx 0;
        color: #1A1A1A;
        font-size: 36rpx;
      }
      .text-two {
        padding-top: 40rpx;
        color: #1A1A1A;
        font-size: 36rpx;
      }
      textarea {
        height: 30%;
        padding: 30rpx;
        border-radius: 20rpx;
        background: #F2F2F2;
        width: auto;
      }
      .add-item {
        margin: 30rpx 0;
        button {
          color: #ffffff;
          background: #479CFD;
          border: none
        }
        .title {
          margin-bottom: 20rpx;
          color: #1A1A1A;
          font-size: 36rpx;
        }
        .input-box {
          background: #ffffff;
          border-radius: 16rpx;
          padding: 30rpx;
          input {
            border: none
          }
        }
        .select-box {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          background: #F2F2F2;
          border-radius: 16rpx;
          padding: 30rpx;
          input {
            border: none
          }
          image {
            width: 16rpx;
          }
        }
        .check-box {
          background: #ffffff;
          border-radius: 16rpx;
          padding: 30rpx;
          .format-check {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .selectedbox {
              color: #ffffff;
              background: #479CFD;
            }
            .label-text {
              width: 70rpx;
              height: 70rpx;
              font-size: 30rpx;
              border-radius: 35rpx;
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
            }
            label {
              text-align: center;
            }
          }
        }
        .add-broadcast {
          background: #ffffff;
          border-radius: 16rpx;
          padding: 30rpx;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .addicon {
            width: 40rpx;
            height: 40rpx;
            border: 1px solid #21D47F;
            border-radius: 50%;
            font-size: 30rpx;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            color: #21D47F
          }
          .text {
            color: #21D47F;
            font-size: 30rpx;
            margin-top: 20rpx
          }
        }
        .broadcast-list-box {
          background: #ffffff;
          border-radius: 16rpx;
          padding: 30rpx;
          .list-box-item {
            padding: 20rpx 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .box-item-left {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              image {
                width: 50rpx
              }
              .item-left-right {
                font-size: 30rpx;
                color: #1A1A1A;
                padding-left: 10rpx;
                width: 360rpx;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap
              }
            }
            .box-item-right {
              padding: 0 20rpx;
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
              align-items: center;
              image {
                width: 50rpx
              }
            }
          }
        }
      }
      .listen-box {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        image {
          width: 40rpx
        }
        .text {
          text-align: right;
          color: #808080;
          font-size: 30rpx;
        }
      }
    }
  }
}
</style>
