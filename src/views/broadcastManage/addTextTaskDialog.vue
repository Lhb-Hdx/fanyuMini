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
        <el-form-item label="文字内容：" prop="textarea">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="poster.textarea">
          </el-input>
        </el-form-item>
        <el-form-item label="文字标题：" prop="title">
          <el-input v-model="poster.title" placeholder="文字标题"></el-input>
        </el-form-item>
        <el-form-item label="试听声种：">
          <el-select v-model="voiceValue" placeholder="请选择">
            <el-option
              v-for="(item, index) of options"
              :key="index"
              :label="item.voiceName"
              :value="item.voiceEnum">
            </el-option>
          </el-select>
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
        <el-form-item>
          <el-button type="primary" @click="onSubmit" v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
          <el-button type="success" @click="toTryListen">试听</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
      <audio :src="src" ref="myaudio" autoplay="autoplay" v-show="false"></audio>
    </div>
  </el-dialog>
</template>
<script>
import { getVoiceNameLst, textToVoice } from '@/api/tts'
import { areaQueryControl, querySchoolAllDevice } from '@/api/device'
export default {
  name: 'addSharePoster',
  props: ['visible', 'addType'],
  data () {
    return {
      fullscreenLoading: false,
      src: '',
      voiceValue: '',
      deviceList: [],
      areaList: [],
      poster: {
        title: '',
        textarea: '',
        taskname: '',
        time: '',
        rangeValue: 0,
        areaList: [],
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
      options: [],
      rangeOptions: [
        {label: '区域', value: 0},
        {label: '设备', value: 1}
      ],
      rules: {
        title: [{ required: true, message: '请输入文字标题', trigger: 'blur' }],
        taskname: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
        time: [{ required: true, message: '请输入任务执行时间', trigger: 'blur' }],
        textarea: [{ required: true, message: '请输入文字内容', trigger: 'blur' }],
        areaList: [{ required: true, message: '请选择区域', trigger: 'change' }],
        deviceList: [{ required: true, message: '请选择设备', trigger: 'change' }]
      }
    }
  },
  created () {
    // console.log(123)
  },
  beforeMount () {
    this.getNameList()
    this.getDeviceList()
    this.getAreaList()
  },
  methods: {
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
    getNameList () { // 获取读音人列表
      getVoiceNameLst()
        .then(res => {
          if (res.code === 200) {
            this.options = res.data
            this.voiceValue = res.data[0].voiceEnum
          }
        })
    },
    toTryListen () { // 试听
      this.$refs['posterFrom'].validateField('textarea', errorMessage => {
        if (!errorMessage) {
          textToVoice({text: this.poster.textarea, voice_name: this.voiceValue})
            .then(res => {
              if (res.code === 200) {
                this.src = res.data
              }
            })
        }
      })
    },
    onSubmit () {
      this.$refs['posterFrom'].validate(valid => {
        if (valid) {
          this.fullscreenLoading = true
          textToVoice({text: this.poster.textarea, voice_name: this.voiceValue})
            .then(res => {
              if (res.code === 200) {
                this.submitForm.taskname = this.poster.taskname
                this.submitForm.time = this.poster.time
                this.submitForm.music[0].id = res.data
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
                // console.log(this.submitForm)
                this.$emit('submitHandle', this.submitForm)
              }
            })
        }
      })
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
