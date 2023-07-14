<template>
  <div class="add-broadcast-container">
    <div class="add-item">
      <!-- <div class="title">广播名称</div> -->
      <div class="input-box">
        <input placeholder="请输入广播名称" v-model="form.taskname">
      </div>
    </div>
    <!-- <div class="add-item">
    <div class="title">播放类型</div>
    <div class="select-box" @click="toSelectPlaytype">
      <div class="">{{ taskTypeName[form.taskType - 1] }}</div>
      <image src="/static/icon/jiantou.png" mode="widthFix"/>
    </div>
  </div> -->
    <picker @change="bindTaskTypeChange" :range="musicTypeList" range-key="taskClass" v-if="form.taskType === 2">
      <div class="add-item">
        <div class="select-box">
          <input placeholder="请选择任务分类" v-model="form.classname" :disabled="true">
          <image src="/static/icon/jiantou.png" mode="widthFix" />
        </div>
      </div>
    </picker>
    <picker mode="date" @change="bindDateChange" v-if="form.taskType === 1">
      <div class="add-item">
        <!-- <div class="title">播放日期</div> -->
        <div class="select-box">
          <input placeholder="请选择播放日期" v-model="playDate" :disabled="true">
          <image src="/static/icon/jiantou.png" mode="widthFix" />
        </div>
      </div>
    </picker>
    <picker mode="time" start="00:00" end="23:59" @change="bindTimeChange" v-if="form.taskType !== 3">
      <div class="add-item">
        <!-- <div class="title">请选择播放时间</div> -->
        <div class="select-box">
          <input placeholder="请选择开始时间" v-model="playTime" :disabled="true">
          <image src="/static/icon/jiantou.png" mode="widthFix" />
        </div>
      </div>
    </picker>
    <!-- <div class="add-item">
    <div class="title">选择星期</div>
    <div class="check-box">
      <checkbox-group @change="checkboxChange" class="format-check">
        <label v-for="(item, index) of weekList" :key="index" @click="toSelectCheck(index)">
          <checkbox :value="item.value" hidden></checkbox>
          <div class="label-text" :class="{selectedbox: defaultCheck[index]}">{{ item.name }}</div>
        </label>
      </checkbox-group>
    </div>
  </div> -->
    <div class="add-item">
      <!-- <div class="title">广播内容</div> -->
      <div class="add-broadcast" @click="toSelectBroadcasttype" v-if="!programTitle && musicid.length === 0">
        <div class="addicon">+</div>
        <div class="text">添加广播内容</div>
      </div>
      <div class="broadcast-list-box" v-else>
        <div class="list-box-item">
          <div class="box-item-left">
            <image src="/static/icon/Ticon.png" mode="widthFix" v-if="mediaType === 'text'" />
            <image src="/static/icon/microphone.png" mode="widthFix" v-if="mediaType === 'voice'" />
            <image src="/static/icon/musicicon.png" mode="widthFix" v-if="mediaType === 'music'" />
            <div class="item-left-right">{{ programTitle || musicid[0].name }}</div>
          </div>
          <div class="box-item-right" @click="toSelectBroadcasttype">
            <image src="/static/icon/sandian.png" mode="widthFix" />
          </div>
        </div>
      </div>
    </div>
    <div class="add-item">
      <!-- <div class="title">广播范围</div> -->
      <div class="add-broadcast" @click="toSelectDevice" v-if="areaes.length === 0 && devices.length === 0">
        <div class="addicon">+</div>
        <div class="text">添加广播范围</div>
      </div>
      <div class="broadcast-list-box" v-else-if="areaType === 'device'">
        <div class="list-box-item" v-for="(item, index) of devices" :key="index">
          <div class="box-item-left">
            <image src="/static/icon/deviceIcon.png" mode="widthFix" />
            <div class="item-left-right">{{ item.name }}</div>
          </div>
          <div class="box-item-right" @click="toSelectDevice">
            <image src="/static/icon/sandian.png" mode="widthFix" />
          </div>
        </div>
      </div>
      <div class="broadcast-list-box" v-else-if="areaType === 'area'">
        <div class="list-box-item" v-for="(item, index) of areaes" :key="index">
          <div class="box-item-left">
            <image src="/static/icon/iconarea.png" mode="widthFix" />
            <div class="item-left-right">{{ item.name }}</div>
          </div>
          <div class="box-item-right" @click="toSelectDevice">
            <image src="/static/icon/sandian.png" mode="widthFix" />
          </div>
        </div>
      </div>
    </div>
    <div class="add-item">
      <button @click="toSubmitBroadcast">{{ updateTask ? '确认修改' : '确认添加' }}</button>
    </div>
  </div>
</template>

<script>
import {
  taskAdd,
  taskUpdate,
  taskClassQuery
} from '@/utils/getData'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'addbroadcast',
  data () {
    return {
      updateTask: false,
      musicTypeList: [],
      mediaType: '', // 当前选定的广播类型，文字或语音或音乐
      areaType: 'device', // 区域类型，设备或区域
      defaultCheck: [false, false, false, false, false, false, false],
      taskTypeName: ['单次播放', '循环播放', '手动播放'],
      playTime: '', // 新建广播的播放时间
      playDate: '', // 新建广播的播放日期，循环播放的广播日期不传
      weekList: [{
        name: '日',
        value: 0
      }, {
        name: '一',
        value: 1
      }, {
        name: '二',
        value: 2
      }, {
        name: '三',
        value: 3
      }, {
        name: '四',
        value: 4
      }, {
        name: '五',
        value: 5
      }, {
        name: '六',
        value: 6
      }],
      form: {
        areaes: [],
        devices: [],
        classid: '',
        classname: '',
        fengLei: '',
        music: [],
        taskname: '',
        taskType: 1,
        time: '',
        menu_id: ''
      }
    }
  },
  computed: {
    ...mapState(['areaes', 'devices', 'musicid', 'musicTitle', 'programTitle', 'programMenuId'])
  },
  onShow () {
    if (this.form.taskType === 2) {
      this.queryTaskTypeList()
    }
  },
  onUnload () {
    this.changeMusicList([])
    this.changeAreaList([])
    this.changeDeviceList([])
    this.changeProgramTitle('')
    this.changeProgramMenuId('')
    this.updateTask = false
    this.mediaType = ''
    this.areaType = 'device'
    this.defaultCheck = [false, false, false, false, false, false, false]
    this.playTime = ''
    this.playDate = ''
    this.form = {
      areaes: [],
      devices: [],
      classid: '',
      classname: '',
      fengLei: '',
      music: [],
      taskname: '',
      taskType: 1,
      time: '',
      menu_id: ''
    }
  },
  onReady () {
  },
  onLoad (query) {
    if (query.form) {
      this.updateTask = true
      let obj = JSON.parse(query.form)
      console.log(obj);
      this.mediaType = obj.taskFenlei
      this.form.id = obj.id
      this.form.taskname = obj.taskName
      this.form.taskType = obj.taskType
      this.form.classid = obj.classId
      this.form.classname = obj.className
      if (this.form.taskType === 2) {
        this.playTime = obj.taskTime
      } else if (this.form.taskType === 1) {
        let arr = obj.taskTime.split(' ')
        this.playTime = arr[1]
        this.playDate = arr[0]
      }
      this.changeMusicList(JSON.parse(obj.taskMusic))
      this.changeAreaList(JSON.parse(obj.taskArea))
      this.changeDeviceList(JSON.parse(obj.taskDevice))
      this.changeProgramTitle(obj.menuName)
      this.changeProgramMenuId(obj.menuId)
      if (JSON.parse(obj.taskArea).length > 0) {
        this.areaType = 'area'
      } else if (JSON.parse(obj.taskDevice).length > 0) {
        this.areaType = 'device'
      }
    }
    if (query.addType) {
      this.form.taskType = parseInt(query.addType)
    }
    wx.setNavigationBarTitle({ title: this.updateTask ? '编辑任务' : '添加任务' })
  },
  beforeMount () {
    // wx.setNavigationBarTitle({title: '添加广播'})
  },
  methods: {
    ...mapMutations(['changeMusicList', 'changeAreaList', 'changeDeviceList', 'changeProgramTitle', 'changeProgramMenuId']),
    bindTaskTypeChange (e) { // 选择不同的分类
      this.form.classid = this.musicTypeList[parseInt(e.target.value)].id
      this.form.classname = this.musicTypeList[parseInt(e.target.value)].taskClass
    },
    queryTaskTypeList () { // 获取任务分类列表
      taskClassQuery({ pageSize: 100000, pageNum: 1 })
        .then(res => {
          if (res.code === 200) {
            this.musicTypeList = res.data.list
            if (!this.updateTask) {
              this.form.classid = res.data.list[0].id
              this.form.classname = res.data.list[0].taskClass
            }
          }
        })
    },
    toSubmitBroadcast () { // 提交添加或者编辑任务
      this.form.fengLei = this.mediaType
      this.form.areaes = []
      this.form.music = this.musicid
      this.form.menu_id = this.programMenuId
      if (this.areaType === 'device') {
        this.form.devices = this.devices
        this.form.areaes = []
      } else if (this.areaType === 'area') {
        this.form.areaes = this.areaes
        this.form.devices = []
        // for (let n of this.areaes) {
        //   this.form.areaes.push(n.id)
        // }
      }
      console.log(this.form);
      if (this.form.taskname === '' || (this.form.music.length === 0 && !this.programTitle) || (this.areaType === 'device' && this.form.devices.length === 0) || (this.areaType === 'area' && this.form.areaes.length === 0)) {
        wx.showToast({
          title: '请将信息填写完整',
          icon: 'none',
          duration: 3500
        })
      } else {
        if (this.updateTask) {
          this.toTaskUpdate()
        } else {
          this.toAddBroadcast()
        }
      }
    },
    // 添加广播
    toAddBroadcast () {
      if (this.form.taskType === 2) {
        this.form.time = this.playTime
      } else if (this.form.taskType === 1) {
        this.form.time = this.playDate + ' ' + this.playTime
      } else {
        this.form.time = ''
      }
      taskAdd(this.form)
        .then(res => {
          if (res.code === 200) {
            wx.navigateBack()
          }
        })
    },
    // 编辑广播
    toTaskUpdate () {
      if (this.form.taskType === 2) {
        this.form.time = this.playTime
      } else if (this.form.taskType === 1) {
        this.form.time = this.playDate + ' ' + this.playTime
      } else {
        this.form.time = ''
      }
      taskUpdate(this.form)
        .then(res => {
          if (res.code === 200) {
            wx.navigateBack()
          }
        })
    },
    // 选择广播的播放类型
    toSelectPlaytype () {
      wx.showActionSheet({
        itemList: this.taskTypeName,
        success: res => {
          this.form.taskType = res.tapIndex + 1
          if (res.tapIndex === 1) {
            this.playDate = ''
          }
        },
        fail (res) {
          console.log(res.errMsg)
        }
      })
    },
    // 选择广播的类型
    toSelectBroadcasttype () {
      wx.showActionSheet({
        itemList: ['文字广播', '录音广播', '音频广播'],
        success: res => {
          if (res.tapIndex === 0) {
            this.mediaType = 'text'
            wx.navigateTo({
              url: '/pages/addTextBroadcast/main'
            })
          } else if (res.tapIndex === 1) {
            this.mediaType = 'voice'
            wx.navigateTo({
              url: '/pages/addVoiceBroadcast/main'
            })
          } else if (res.tapIndex === 2) {
            this.mediaType = 'music'
            wx.navigateTo({
              url: '/pages/addMusicBroadcast/main'
            })
          }
        },
        fail (res) {
          console.log(res.errMsg)
        }
      })
    },
    // 选择广播范围
    toSelectDevice () {
      wx.showActionSheet({
        itemList: ['设备', '区域'],
        success: res => {
          if (res.tapIndex === 0) {
            this.areaType = 'device'
            wx.navigateTo({
              url: '/pages/selectDevice/main'
            })
          } else if (res.tapIndex === 1) {
            this.areaType = 'area'
            wx.navigateTo({
              url: '/pages/selectArea/main'
            })
          }
        },
        fail (res) {
          console.log(res.errMsg)
        }
      })
    },
    // 选择星期改变选定的样式
    toSelectCheck (indx) {
      if (this.defaultCheck[indx]) {
        this.$set(this.defaultCheck, indx, false)
      } else {
        this.$set(this.defaultCheck, indx, true)
      }
    },
    // 选定星期
    checkboxChange (value) {
      console.log(value)
      this.form.week = value.target.value
    },
    // 选定广播的播放时间
    bindTimeChange (value) {
      this.playTime = value.target.value + ':00'
    },
    // 选定广播的播放日期
    bindDateChange (value) {
      this.playDate = value.target.value
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

.add-broadcast-container {
  background: #ffffff;
  height: 100vh;
  overflow-y: scroll;
  padding: 0 40rpx;

  .add-item {
    margin: 40rpx 0;

    button {
      color: #ffffff;
      background: #f5b619;
      border: none
    }

    .title {
      margin-bottom: 20rpx;
      color: #1A1A1A;
      font-size: 36rpx;
    }

    .input-box {
      background: #efefef;
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
      background: #efefef;
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
      background: #efefef;
      border-radius: 16rpx;
      padding: 50rpx 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .addicon {
        width: 70rpx;
        height: 70rpx;
        background: #f5b619;
        margin-right: 10rpx;
        border-radius: 50%;
        font-size: 40rpx;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        color: #ffffff
      }

      .text {
        color: #9493a1;
        font-size: 30rpx;
      }
    }

    .broadcast-list-box {
      background: #efefef;
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
            width: 40rpx
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
}
</style>
<style>
.van-collapse-item__content {
  padding: 0 !important
}

.van-cell__title {
  font-size: 34rpx;
}
</style>
