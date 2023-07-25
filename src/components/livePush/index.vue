<template>
  <div>
    <!-- <div class="in">
      <el-form :inline="true" :model="formData" size="small" label-width="140px" ref="formData">
          <el-form-item label="URL" prop="pushUrl">
            <el-input placeholder="请输入URL" v-model.trim="formData.pushUrl"></el-input>
          </el-form-item>
          <el-form-item label="sessionid" prop="sessionid">
            <el-input placeholder="" v-model.trim="formData.sessionid"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="startPublish" icon="el-icon-search" type="primary">推流</el-button>
          </el-form-item>
        </el-form>
    </div> -->
    <div v-show="false">
      <video ref="myplayer" controls preload="auto" autoplay width="500" height="400">
      </video>
      <!-- <div><button id="capture">拍照</button></div>
      <canvas ref="myCanvas" id="canvas" width="480" height="320"></canvas> -->
    </div>
  </div>
</template>

<script>
import '@/webRtcjs/jquery-1.10.2.min'
import '@/webRtcjs/srs.page'
import { SrsRtcPublisherAsync } from '@/webRtcjs/srs.sdk'
import '@/webRtcjs/winlin.utility'
import '@/webRtcjs/adapter-7.4.0.min'
import { webRtcControl } from '@/api/broadcast'
export default {
  name: 'livepush',
  data () {
    return {
      sdk: null,
      constraints: { video: true, audio: true },
      formData: {
        sessionid: '',
        pushUrl: `webrtc://${location.host}/live/livestream`
      }
    }
  },
  mounted () {
  },
  methods: {
    toCloseWebRtc () { // 关闭推流
      // 关闭麦克风
      let audioTracks = this.sdk.stream.getAudioTracks()
      audioTracks.forEach(track => {
        track.stop()
      })
      // 关闭推流
      if (this.sdk) {
        this.sdk.close()
      }
    },
    getWebRtcControl (list) { // 获取推流地址
      webRtcControl(list)
        .then(res => {
          if (res.code === 200) {
            this.formData.pushUrl = `webrtc://${location.host}/live/${res.data}`
            this.startPublish()
          }
        })
    },
    startPublish () { // 开始推流
      if (this.sdk) {
        this.sdk.close()
      }
      this.sdk = new SrsRtcPublisherAsync()
      let video = this.$refs.myplayer
      video.srcObject = this.sdk.stream
      this.sdk.publish(this.formData.pushUrl)
        .then(session => {
          this.formData.sessionid = session.sessionid
        })
        .catch(reason => {
          this.sdk.close()
        })
    },
    onSuccess (stream) { // 获取媒体流成功的回调
      console.log(stream)
      // let url = window.URL || window.webkitURL
      let video = this.$refs.myplayer
      // 将视频流内容设置为video元素的源（注意：此处因为使用的是比较新的浏览器，必须直接设置，否则报错）
      // 如果使用的不是较新的浏览器，可以这样设置：video.src = url.createObjectURL(stream)
      // if (url) {
      //   video.src = url.createObjectURL(stream)
      // }
      video.srcObject = stream
      video.play()
    },
    onFailed (error) { // 获取媒体流失败的回调
      console.log('访问媒体设备失败', error.name, error.message)
    },
    getUserMedia (constrains, success, error) { // 访问用户媒体设备的兼容方法
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constrains)
          .then(success)
          .catch(error)
      } else if (navigator.webkitGetUserMedia) {
        navigator.webkitGetUserMedia(constrains, success, error)
      } else if (navigator.mozGetUserMedia) {
        navigator.mozGetUserMedia(constrains, success, error)
      } else if (navigator.getUserMedia) {
        navigator.getUserMedia(constrains, success, error)
      }
    },
    toStart () { // 开始调用摄像头
      if (navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia) {
        this.getUserMedia(this.constraints, this.onSuccess, this.onFailed)
      } else {
        alert('你的浏览器不支持访问用户的媒体设备')
      }
    },
    toTakePhoto () { // 点击拍照
      let context = this.$refs.myCanvas
      let video = this.$refs.myplayer
      context.drawImage(video, 0, 0, 480, 320)
    }
  }
}
</script>

<style lang="less"></style>
