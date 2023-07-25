<template>
  <el-dialog :title="addType === 1 ? '添加单次任务' : addType === 2 ? '添加循环任务' : '添加手动任务'" :visible="visible" @close="cancel" :close-on-click-modal="false">
    <div class="addBox">
      <el-form :model="poster" ref="posterFrom" label-width="150px" size="small" :rules="rules">
        <el-form-item label="任务名称：" prop="taskname">
          <el-input v-model="poster.taskname" placeholder="任务名称"></el-input>
        </el-form-item>
        <el-form-item label="执行时间：" prop="time" v-if="addType === 1">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="poster.time"
            type="datetime"
            placeholder="选择执行时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="执行时间：" prop="time" v-if="addType === 2">
          <el-time-picker
            v-model="poster.time"
            value-format="HH:mm:ss"
            placeholder="选择执行时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="播放范围：">
          <el-select v-model="poster.rangeValue" placeholder="请选择">
            <el-option
              v-for="(item, index) of rangeOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择区域：" prop="areaList" v-if="poster.rangeValue === 0">
          <el-select v-model="poster.areaList" placeholder="请选择区域" multiple>
            <el-option
              v-for="(item, index) of areaList"
              :key="index"
              :label="item.areaName"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择设备：" prop="deviceList" v-if="poster.rangeValue === 1">
          <el-select v-model="poster.deviceList" placeholder="请选择设备" multiple>
            <el-option
              v-for="(item, index) of deviceList"
              :key="index"
              :label="item.deviceName"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="录音标题：" prop="title">
          <el-input v-model="poster.title" placeholder="录音标题"></el-input>
        </el-form-item>
        <el-form-item label="录音时长(秒)：">
          <el-input v-model="poster.recorderTime" placeholder="任务名称" readonly></el-input>
        </el-form-item>
        <div>
          <el-button size="small" type="danger" @click="toRecorde" v-if="recordeState === ''">开始录音</el-button>
          <el-button size="small" type="success" @click="toStopRecorde" v-if="recordeState === 'ing'">结束录音</el-button>
          <el-button size="small" type="success" @click="toPauseRecorde" v-if="recordeState === 'ing'">暂停录音</el-button>
          <el-button size="small" type="success" @click="toResumeRecorde" v-if="recordeState === 'pause'">继续录音</el-button>
          <el-button size="small" type="success" @click="toTryListen" v-if="recordeState === '' && poster.recorderTime > 0">试听</el-button>
          <el-button size="small" type="primary" @click="toUploadAliyun" :loading="fullscreenLoading" v-if="recordeState === '' && poster.recorderTime > 0">{{ submitStr }}</el-button>
          <el-button size="small" @click="cancel">取消</el-button>
          <!-- <el-button size="small" @click="toUploadAliyun">测试上传</el-button> -->
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import Recorder from 'js-audio-recorder'
import lamejs from 'lamejs'
import { areaQueryControl, querySchoolAllDevice } from '@/api/device'
export default {
  name: 'addSharePoster',
  props: ['visible', 'addType'],
  data () {
    var checkTime = (rule, value, callback) => {
      if (value === 0) {
        return callback(new Error('录音时长不能为0'))
      } else {
        callback()
      }
    }
    return {
      recorder: {},
      recordeState: '',
      fullscreenLoading: false,
      submitStr: '提交',
      src: '',
      deviceList: [],
      areaList: [],
      poster: {
        title: '',
        textarea: '',
        taskname: '',
        time: '',
        rangeValue: 0, // 选择的是区域还是设备 0区域 1设备
        areaList: [],
        recorderTime: 0,
        deviceList: []
      },
      submitForm: {
        areaes: [],
        devices: [],
        music: [
          {
            id: '',
            name: ''
          }
        ],
        fengLei: '',
        taskType: this.addType,
        taskname: '',
        time: ''
      },
      rangeOptions: [
        {label: '区域', value: 0},
        {label: '设备', value: 1}
      ],
      rules: {
        title: [{ required: true, message: '请输入录音标题', trigger: 'blur' }],
        taskname: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
        time: [{ required: true, message: '请输入任务执行时间', trigger: 'blur' }],
        textarea: [{ required: true, message: '请输入文字内容', trigger: 'blur' }],
        areaList: [{ required: true, message: '请选择区域', trigger: 'change' }],
        deviceList: [{ required: true, message: '请选择设备', trigger: 'change' }],
        recorderTime: [{ validator: checkTime, trigger: 'blur' }]
      }
    }
  },
  created () {
    this.recorder = new Recorder()
    this.recorder.onprocess = duration => {
      this.poster.recorderTime = parseInt(duration)
    }
  },
  beforeMount () {
    this.getDeviceList()
    this.getAreaList()
  },
  beforeDestroy () {
    this.recorder.destroy()
  },
  methods: {
    convertToMp3 (wavDataView) {
      this.fullscreenLoading = true // 打开loading弹窗
      this.submitStr = '提交中'
      // 获取wav头信息
      const wav = lamejs.WavHeader.readHeader(wavDataView) // 此处其实可以不用去读wav头信息，毕竟有对应的config配置
      const { channels, sampleRate } = wav
      const mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, 128)
      // 获取左右通道数据
      const result = this.recorder.getChannelData()
      const buffer = []
      const leftData = result.left && new Int16Array(result.left.buffer, 0, result.left.byteLength / 2)
      const rightData = result.right && new Int16Array(result.right.buffer, 0, result.right.byteLength / 2)
      const remaining = leftData.length + (rightData ? rightData.length : 0)
      const maxSamples = 1152
      for (let i = 0; i < remaining; i += maxSamples) {
        const left = leftData.subarray(i, i + maxSamples)
        let right = null
        let mp3buf = null
        if (channels === 2) {
          right = rightData.subarray(i, i + maxSamples)
          mp3buf = mp3enc.encodeBuffer(left, right)
        } else {
          mp3buf = mp3enc.encodeBuffer(left)
        }
        if (mp3buf.length > 0) {
          buffer.push(mp3buf)
        }
      }
      const enc = mp3enc.flush()
      if (enc.length > 0) {
        buffer.push(enc)
      }
      return new Blob(buffer, { type: 'audio/mp3' })
    },
    getDeviceList () { // 获取设备列表
      querySchoolAllDevice()
        .then(res => {
          if (res.code === 200) {
            this.deviceList = res.data
          }
        })
    },
    getAreaList () { // 获取区域列表
      areaQueryControl()
        .then(res => {
          if (res.code === 200) {
            this.areaList = res.data
          }
        })
    },
    toRecorde () { // 开始录音
      this.poster.recorderTime = 0
      this.recordeState = 'ing'
      this.recorder.start()
    },
    toPauseRecorde () { // 暂停录音
      this.recordeState = 'pause'
      this.recorder.pause()
    },
    toResumeRecorde () { // 继续录音
      this.recordeState = 'ing'
      this.recorder.resume()
    },
    toStopRecorde () { // 结束录音
      this.recordeState = ''
      this.recorder.stop()
    },
    toTryListen () { // 试听
      this.recorder.play()
    },
    toUploadAliyun () {
      this.$refs['posterFrom'].validate(valid => {
        if (valid) {
          // this.fullscreenLoading = true
          // let blob = this.recorder.getWAVBlob()
          let blob = this.convertToMp3(this.recorder.getWAV())
          let OSS = require('ali-oss')
          let client = new OSS({
            region: 'oss-cn-beijing',
            accessKeyId: 'LTAI4GJvXsAuBpwR9PK3pYpR',
            accessKeySecret: 'bpsE8GNCaAKs2hvsa9SssJ8xx6kIaN',
            bucket: 'beeba-mall',
            secure: true
          })
          const fileName = 'school/' + parseInt(Math.random() * 100000000, 10) + 1 + Date.parse(new Date()) + '.mp3'
          client.put(fileName, blob, {
            progress: (p) => {
              // console.log(p)
            }
          })
            .then(res => {
              // this.src = res.url
              if (res.url) {
                this.onSubmit(res.url)
              }
            })
        }
      })
    },
    onSubmit (src) {
      this.submitForm.taskname = this.poster.taskname
      this.submitForm.time = this.poster.time
      this.submitForm.music[0].id = src
      this.submitForm.music[0].name = this.poster.title
      if (this.poster.rangeValue === 0) { // 选择的区域
        this.submitForm.devices = []
        this.submitForm.areaes = []
        for (let n of this.poster.areaList) {
          let obj = {}
          obj.id = this.areaList[n].id
          obj.name = this.areaList[n].areaName
          this.submitForm.areaes.push(obj)
        }
      } else if (this.poster.rangeValue === 1) { // 选择的设备
        this.submitForm.devices = []
        this.submitForm.areaes = []
        for (let n of this.poster.deviceList) {
          let obj = {}
          obj.id = this.deviceList[n].id
          obj.name = this.deviceList[n].deviceName
          this.submitForm.devices.push(obj)
        }
      }
      this.fullscreenLoading = false
      this.submitStr = '提交'
      // console.log(this.submitForm)
      this.$emit('submitHandle', this.submitForm)
    },
    cancel () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>
.text-voice {
  margin-top: 0;
}
.el-input {
  /* width: 70% */
}
.addBox {
  padding: 0 35px;
  margin: 0 auto;
}
</style>
<style>
.el-upload-list{
  width: 70% !important
}
</style>
