<template>
  <el-dialog :title="title" :visible="visible" @close="cancel" :close-on-click-modal="false" top="3vh">
    <div class="addBox">
      <el-form :model="poster" ref="posterFrom" label-width="150px" size="small" :rules="rules">
        <el-form-item label="任务名称：" prop="taskname">
          <el-input v-model="poster.taskname" placeholder="任务名称"></el-input>
        </el-form-item>
        <el-form-item label="执行时间：" prop="time" v-if="addType === 1">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:00" format="yyyy-MM-dd HH:mm" v-model="poster.time"
            type="datetime" placeholder="选择执行时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="执行时间：" prop="time" v-if="addType === 2">
          <el-time-picker v-model="poster.time" value-format="HH:mm:00" format="HH:mm" placeholder="选择执行时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="播放类型：" v-if="addType === 2 && poster.time">
          <el-select v-model="playType" placeholder="请选择播放类型" @change="changePlayType">
            <el-option v-for="(item, index) of playTypeList" :key="index" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="播放次数：" prop="playtimes" v-if="addType === 2 && playType === '1' && poster.time">
          <el-input v-model="poster.playtimes" placeholder="请输入播放次数"></el-input>
        </el-form-item>
        <el-form-item label="结束时间：" prop="endtime" v-if="addType === 2 && playType === '2' && poster.time">
          <el-time-picker :picker-options="{
            selectableRange: `${poster.time}-23:59:59`
          }" v-model="poster.endtime" value-format="HH:mm:00" format="HH:mm" placeholder="选择结束时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="选择星期：" v-if="addType === 2">
          <el-select v-model="poster.weekList" placeholder="请选择星期" multiple @change="changeWeek">
            <el-option v-for="(item, index) of weekList" :key="index" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务分类：">
          <el-select v-model="poster.classIdx" placeholder="请选择" @change="changeClass">
            <el-option v-for="(item, index) of classlistData" :key="index" :label="item.taskClass" :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择资源：">
          <el-select v-model="sourceType" placeholder="请选择媒体资源">
            <el-option v-for="(item, index) of sourceTypeList" :key="index" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择音乐：" v-if="sourceType === 1">
          <el-select v-model="poster.src" placeholder="请选择" @change="changeMusic">
            <el-option v-for="(item, index) of musicList" :key="index" :label="item.musicName" :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择节目：" v-if="sourceType === 2">
          <el-select v-model="poster.menu_id" placeholder="请选择" @change="changeMusic">
            <el-option v-for="(item, index) of jiemuList" :key="index" :label="item.menuName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="播放范围：">
          <el-select v-model="poster.rangeValue" placeholder="请选择">
            <el-option v-for="(item, index) of rangeOptions" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择区域：" prop="areaList" v-if="poster.rangeValue === 0">
          <el-select v-model="poster.areaList" placeholder="请选择区域" multiple>
            <el-option v-for="(item, index) of areaList" :key="index" :label="item.areaName" :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择设备：" prop="deviceList" v-if="poster.rangeValue === 1">
          <el-select v-model="poster.deviceList" placeholder="请选择设备" multiple>
            <el-option v-for="(item, index) of deviceList" :key="index" :label="item.deviceName" :value="index">
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
import { getMusicMenu } from '@/api/jiemu'
import { queryMusic } from '@/api/music'
import { areaQueryControl, querySchoolAllDevice } from '@/api/device'
import { taskClassQuery } from '@/api/task'
export default {
  name: 'addSharePoster',
  props: ['visible', 'addType', 'updateTask', 'updateData'],
  data () {
    return {
      playType: '1', // 任务的播放类型，按次数播放或者按设定的有效时间播放
      sourceType: 1, // 选择的媒体资源类型，1从音乐列表选择，2从节目列表选择
      defaultTime: '',
      fullscreenLoading: false,
      changeVoiceUrl: false,
      src: '',
      deviceList: [],
      areaList: [],
      musicList: [],
      jiemuList: [],
      classlistData: [],
      sourceTypeList: [ // 添加任务时选择音乐的类型
        { name: '音乐', value: 1 },
        { name: '节目', value: 2 }
      ],
      playTypeList: [
        { name: '按播放次数', value: '1' },
        { name: '按结束时间', value: '2' }
      ],
      weekList: [
        { name: '全部', value: '*' },
        { name: '星期一', value: '1' },
        { name: '星期二', value: '2' },
        { name: '星期三', value: '3' },
        { name: '星期四', value: '4' },
        { name: '星期五', value: '5' },
        { name: '星期六', value: '6' },
        { name: '星期日', value: '7' }
      ],
      poster: {
        src: 0, // 选中的音乐的index
        classIdx: 0,
        title: '',
        textarea: '',
        taskname: '',
        time: '',
        rangeValue: 0, // 选择的是区域还是设备 0区域 1设备
        areaList: [],
        deviceList: [],
        weekList: [],
        playtimes: '',
        endtime: '',
        menu_id: ''
      },
      submitForm: {
        areaes: [],
        devices: [],
        week: [],
        music: [
          {
            id: '',
            name: ''
          }
        ],
        classid: '',
        classname: '',
        fengLei: 'music',
        taskType: this.addType, // 3手工任务，1单次任务，2循环任务
        taskname: '',
        time: '',
        playtimes: '',
        endtime: '',
        menu_id: ''
      },
      rangeOptions: [
        { label: '区域', value: 0 },
        { label: '设备', value: 1 }
      ],
      rules: {
        title: [{ required: true, message: '请输入文字标题', trigger: 'blur' }],
        taskname: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
        time: [{ required: true, message: '请输入任务执行时间', trigger: 'blur' }],
        textarea: [{ required: true, message: '请输入文字内容', trigger: 'blur' }],
        areaList: [{ required: true, message: '请选择区域', trigger: 'change' }],
        deviceList: [{ required: true, message: '请选择设备', trigger: 'change' }],
        endtime: [{ required: true, message: '请选择任务结束时间', trigger: 'blur' }],
        playtimes: [{ required: true, message: '请输入播放次数', trigger: 'blur' }]
      }
    }
  },
  computed: {
    title () {
      if (this.updateTask) {
        return this.addType === 1 ? '编辑单次任务' : this.addType === 2 ? '编辑循环任务' : '编辑手动任务'
      } else {
        return this.addType === 1 ? '添加单次任务' : this.addType === 2 ? '添加循环任务' : '添加手动任务'
      }
    }
  },
  created () {
    let time = new Date()
    this.defaultTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + '00:00:00'
  },
  beforeMount () {
    this.getClassList()
    this.getMusicList()
    this.getDeviceList()
    this.getAreaList()
    this.getjiemuList()
    if (this.addType === 2) {
      this.poster.playtimes = 1
    }
    if (this.updateTask) {
      if (this.updateData.playTimes) {
        this.playType = '1'
      }
      if (this.updateData.endTime) {
        this.playType = '2'
      }
      if (this.updateData.menuId) {
        this.sourceType = 2
      } else {
        this.sourceType = 1
      }
      console.log(this.updateData)
      this.poster.id = this.updateData.id
      this.poster.weekList = JSON.parse(this.updateData.reverOne)
      this.poster.taskname = this.updateData.taskName
      this.poster.time = this.updateData.taskTime
      this.poster.title = JSON.parse(this.updateData.taskMusic)[0].name
      this.poster.playtimes = this.updateData.playTimes
      this.poster.endtime = this.updateData.endTime
      this.poster.menu_id = this.updateData.menuId
      this.submitForm.classid = this.updateData.classId
      this.submitForm.classname = this.updateData.className
      this.submitForm.music[0].id = JSON.parse(this.updateData.taskMusic)[0].id
      this.submitForm.music[0].name = JSON.parse(this.updateData.taskMusic)[0].name
      if (JSON.parse(this.updateData.taskArea).length > 0) {
        this.poster.rangeValue = 0
      }
      if (JSON.parse(this.updateData.taskDevice).length > 0) {
        this.poster.rangeValue = 1
      }
    }
  },
  methods: {
    changePlayType (val) { // 选择播放类型(按次数播放或者播放到某天)
      if (val === '1') { // 按次数
        this.poster.endtime = null
      } else {
        this.poster.playtimes = null
      }
    },
    changeWeek (val) { // 选择星期
      if (val.includes('*')) {
        this.poster.weekList = ['*']
      }
    },
    getClassList () { // 获取分类列表
      taskClassQuery({ pageSize: 100000, pageNum: 1 })
        .then(res => {
          if (res.code === 200 && res.data.list.length > 0) {
            this.classlistData = res.data.list
            if (this.updateTask) {
              res.data.list.forEach((item, index) => {
                if (this.updateData.classId === item.id) {
                  this.poster.classIdx = index
                }
              })
            }
          }
        })
    },
    getDeviceList () { // 获取设备列表
      querySchoolAllDevice({ pageSize: 100000, pageNum: 1 })
        .then(res => {
          if (res.code === 200 && res.data.list.length > 0) {
            this.deviceList = res.data.list
            if (this.updateTask && this.poster.rangeValue === 1) {
              for (let n of JSON.parse(this.updateData.taskDevice)) {
                res.data.list.forEach((item, index) => {
                  if (n.id === item.id) {
                    this.poster.deviceList.push(index)
                  }
                })
              }
            }
          }
        })
    },
    getAreaList () { // 获取区域列表
      areaQueryControl({ pageSize: 100000, pageNum: 1 })
        .then(res => {
          if (res.code === 200 && res.data.list.length > 0) {
            this.areaList = res.data.list
            if (this.updateTask && this.poster.rangeValue === 0) {
              for (let n of JSON.parse(this.updateData.taskArea)) {
                res.data.list.forEach((item, index) => {
                  if (n.id === item.id) {
                    this.poster.areaList.push(index)
                  }
                })
              }
            }
          }
        })
    },
    getMusicList () { // 获取音乐列表
      queryMusic({ pageSize: 100000, pageNum: 1 })
        .then(res => {
          if (res.code === 200 && res.data.list.length > 0) {
            this.musicList = res.data.list
            console.log(this.musicList)
            if (this.updateTask) {
              res.data.list.forEach((item, index) => {
                if (JSON.parse(this.updateData.taskMusic)[0].id === item.musicPath) {
                  this.poster.src = index
                }
              })
            }
          }
        })
    },
    getjiemuList () { // 获取节目列表
      getMusicMenu({ pageSize: 100000, pageNum: 1 })
        .then(res => {
          if (res.code === 200 && res.data.list.length > 0) {
            this.jiemuList = res.data.list
            console.log(this.jiemuList)
            this.poster.menu_id = res.data.list[0].id
            if (this.updateTask) {
              this.poster.menu_id = this.updateData.menuId
            }
          }
        })
    },
    changeMusic () { // 选择音乐
      if (this.updateTask) {
        this.changeVoiceUrl = true
      }
    },
    changeClass (value) { // 修改类型
      this.submitForm.classid = this.classlistData[value].id
      this.submitForm.classname = this.classlistData[value].taskClass
    },
    toTryListen () { // 试听
      this.src = this.musicList[this.poster.src].musicPath
    },
    onSubmit () {
      this.$refs['posterFrom'].validate(valid => {
        if (valid) {
          // if (this.poster.id) {
          //   this.submitForm.id = this.poster.id
          //   console.log(this.submitForm.id)
          // }
          this.submitForm.endtime = this.poster.endtime
          this.submitForm.playtimes = this.poster.playtimes
          this.submitForm.week = this.poster.weekList
          this.submitForm.id = this.poster.id
          this.submitForm.taskname = this.poster.taskname
          this.submitForm.time = this.poster.time
          this.submitForm.menu_id = this.poster.menu_id
          this.submitForm.classid = this.classlistData[this.poster.classIdx].id
          this.submitForm.classname = this.classlistData[this.poster.classIdx].taskClass
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
          if (this.updateTask && !this.changeVoiceUrl) {
            if (this.sourceType === 1) {
              this.submitForm.menu_id = null
              this.submitForm.music[0].id = this.musicList[this.poster.src].musicPath
              this.submitForm.music[0].name = this.musicList[this.poster.src].musicName
            } else if (this.sourceType === 2) {
              this.submitForm.music = null
            }
            this.$emit('submitHandle', this.submitForm)
          } else {
            this.submitForm.music[0].id = this.musicList[this.poster.src].musicPath
            this.submitForm.music[0].name = this.musicList[this.poster.src].musicName
            if (this.sourceType === 1) { // 资源类型为音乐
              this.submitForm.menu_id = null
            } else if (this.sourceType === 2) { // 资源类型为节目
              this.submitForm.music = null
            }
            this.$emit('submitHandle', this.submitForm)
          }
          this.fullscreenLoading = false
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
.el-upload-list {
  width: 70% !important
}
</style>
