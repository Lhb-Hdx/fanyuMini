<template>
  <div class="add-broadcast-container">
    <div class="add-item" @click="changeName">
      <div class="input-box">
        <div class="box">
          <div class="box-left">
            <div class="img">
              <image src="/static/icon/name-2.png"></image>
            </div>
            <div class="name">广播名称</div>
          </div>
          <div class="box-right">
            {{ broadcastName }}
            <div class="r-img">
              <image src="/static/icon/jiantou.png"></image>
            </div>
          </div>
        </div>
      </div>
    </div>
    <picker @change="bindTaskTypeChange" :range="musicTypeList" range-key="taskClass" v-if="form.taskType === 2">
      <div class="add-item">
        <div class="input-box">
          <div class="box">
            <div class="box-left">
              <div class="img">
                <image src="/static/icon/date-2.png"></image>
              </div>
              <div class="name">播放日期</div>
            </div>
            <div class="box-right">
              {{ form.classname }}
              <div class="r-img">
                <image src="/static/icon/jiantou.png"></image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </picker>
    <picker mode="date" @change="bindDateChange" v-if="form.taskType === 1">
      <div class="add-item">
        <div class="input-box">
          <div class="box">
            <div class="box-left">
              <div class="img">
                <image src="/static/icon/date-2.png"></image>
              </div>
              <div class="name">播放日期</div>
            </div>
            <div class="box-right">
              {{ playDate }}
              <div class="r-img">
                <image src="/static/icon/jiantou.png"></image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </picker>

    <picker @change="bindPayTypeChange" :range="playTypeList" range-key="name" v-if="form.taskType === 2">
      <div class="add-item">
        <div class="input-box">
          <div class="box">
            <div class="box-left">
              <div class="img">
                <image src="/static/icon/type-2.png"></image>
              </div>
              <div class="name">播放类型</div>
            </div>
            <div class="box-right">
              {{ playType }}
              <div class="r-img">
                <image src="/static/icon/jiantou.png"></image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </picker>

    <picker mode="time" start="00:00" end="23:59" @change="bindTimeChange" v-if="form.taskType !== 3">
      <div class="add-item">
        <div class="input-box">
          <div class="box">
            <div class="box-left">
              <div class="img">
                <image src="/static/icon/time-2.png"></image>
              </div>
              <div class="name">开始时间</div>
            </div>
            <div class="box-right">
              {{ playTime }}
              <div class="r-img">
                <image src="/static/icon/jiantou.png"></image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </picker>
    <picker mode="time" start="00:00" end="23:59" @change="bindEndTimeChange"
      v-if="form.taskType !== 3 && playType === '按结束时间'">
      <div class="add-item">
        <div class="input-box">
          <div class="box">
            <div class="box-left">
              <div class="img">
                <image src="/static/icon/time-2.png"></image>
              </div>
              <div class="name">结束时间</div>
            </div>
            <div class="box-right">
              {{ form.endtime }}
              <div class="r-img">
                <image src="/static/icon/jiantou.png"></image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </picker>
    <picker @change="playtimesChange" :range="playtimesList" range-key="value">
      <div class="add-item" v-if="playType === '按播放次数'">
        <div class="input-box">
          <div class="box">
            <div class="box-left">
              <div class="img">
                <image src="/static/icon/frequency-2.png"></image>
              </div>
              <div class="name">播放次数</div>
            </div>
            <div class="box-right">
              {{ form.playtimes }}
              <div class="r-img">
                <image src="/static/icon/jiantou.png"></image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </picker>
    <div class="add-item" @click="bindWeekChange" v-if="form.taskType === 2">
      <div class="input-box">
        <div class="box">
          <div class="box-left">
            <div class="img">
              <image src="/static/icon/time-2.png"></image>
            </div>
            <div class="name">执行星期</div>
          </div>
          <div class="box-right">
            <div class="data">
              {{ weekNameList }}
            </div>
            <div class="r-img">
              <image src="/static/icon/jiantou.png"></image>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="add-item" @click="toSelectBroadcasttype">
      <div class="input-box">
        <div class="box">
          <div class="box-left">
            <div class="img">
              <image src="/static/icon/content-2.png"></image>
            </div>
            <div class="name">广播内容</div>
          </div>
          <div class="box-right">
            <div class="add-img">
              <image src="/static/icon/add-2.png"></image>
            </div>
            添加广播内容
          </div>
        </div>
      </div>
    </div>
    <!-- 已选广播内容 -->
    <div class="add-item bg" v-if="programTitle || musicid.length !== 0">
      <div class="input-box">
        <div class="box">
          <div class="box-left">
            <div class="img">
              <image src="/static/icon/characters-2.png" v-if="mediaType === 'text'"></image>
              <image src="/static/icon/music-2.png" v-if="mediaType === 'voice'"></image>
              <image src="/static/icon/tape-2.png" v-if="mediaType === 'music'"></image>
            </div>
            <div class="name">{{ programTitle || musicid[0].name }}</div>
          </div>
          <div class="box-right" @click="deleteTitle()">
            <div class="delete-img">
              <image src="/static/icon/close-2.png"></image>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 已选广播范围 -->
    <div class="add-item" @click="toSelectDevice">
      <div class="input-box">
        <div class="box">
          <div class="box-left">
            <div class="img">
              <image src="/static/icon/range-2.png"></image>
            </div>
            <div class="name">广播范围</div>
          </div>
          <div class="box-right">
            <div class="add-img">
              <image src="/static/icon/add-2.png"></image>
            </div>
            添加广播范围
          </div>
        </div>
      </div>
    </div>
    <div class="add-item bg" v-if="areaType === 'device'">
      <div class="input-box" v-for="( item, index ) of  devices " :key="index">
        <div class="box">
          <div class="box-left">
            <div class="img">
              <image src="/static/icon/equipment-2.png"></image>
            </div>
            <div class="name">{{ item.name }}</div>
          </div>
          <div class="box-right" @click="deleteRange()">
            <div class="delete-img">
              <image src="/static/icon/close-2.png"></image>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="add-item bg" v-else-if="areaType === 'area'">
      <div class="input-box" v-for="( item, index ) of  areaes " :key="index">
        <div class="box">
          <div class="box-left">
            <div class="img">
              <image src="/static/icon/equipment-2.png"></image>
            </div>
            <div class="name">{{ item.name }}</div>
          </div>
          <div class="box-right" @click="deleteRange(item)">
            <div class="delete-img">
              <image src="/static/icon/close-2.png"></image>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 已选广播范围 -->
    <div class="item">
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
      playType: '', // 播放类型
      weekName: '',
      playTypeList: [
        { name: '按播放次数', value: '1' },
        { name: '按结束时间', value: '2' }
      ],
      playtimesList: [],
      weekData: [
        { name: '全部', value: '*' },
        { name: '星期一', value: '1' },
        { name: '星期二', value: '2' },
        { name: '星期三', value: '3' },
        { name: '星期四', value: '4' },
        { name: '星期五', value: '5' },
        { name: '星期六', value: '6' },
        { name: '星期日', value: '7' }
      ],
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
        menu_id: '',
        endtime: '',
        playtimes: '',
        week: []
      }
    }
  },
  computed: {
    ...mapState(['areaes', 'weekList', 'weekNameList', 'devices', 'musicid', 'broadcastName', 'musicTitle', 'programTitle', 'programMenuId'])
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
    this.changeWeekList([])
    this.changeWeekNameList([])
    this.changeBroadcastName('')
    this.form.classname = ''
    this.playType = ''
    this.updateTask = false
    this.mediaType = ''
    this.weekName = ''
    this.areaType = 'device'
    this.defaultCheck = [false, false, false, false, false, false, false]
    this.playTime = ''
    this.playDate = ''
    this.playtimesList = []
    this.form = {
      areaes: [],
      devices: [],
      classid: '',
      classname: '',
      endtime: '',
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
      this.form.playtimes = obj.playTimes
      this.form.endtime = obj.endTime
      this.changeBroadcastName(obj.taskName)
      if (obj.playTimes) {
        this.playType = this.playTypeList[0].name
      }
      if (obj.endTime) {
        this.playType = this.playTypeList[1].name
      }
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
      this.changeWeekList(JSON.parse(obj.reverOne))
      let name = []
      if (this.weekData && JSON.parse(obj.reverOne)) {
        this.weekData.forEach(item => {
          JSON.parse(obj.reverOne).forEach(num => {
            if ('' + num === '' + item.value) {
              name.push(item.name)
            }
          })
        })
      }
      this.changeWeekNameList(name)
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
    for (let i = 1; i <= 100; i++) {
      const newItem = { name: String(i), value: String(i) };
      this.playtimesList.push(newItem);
    }
  },
  beforeMount () {
    // wx.setNavigationBarTitle({title: '添加广播'})
  },
  methods: {
    ...mapMutations(['changeMusicList', 'changeBroadcastName', 'changeWeekList', 'changeWeekNameList', 'changeAreaList', 'changeDeviceList', 'changeProgramTitle', 'changeProgramMenuId']),
    bindTaskTypeChange (e) { // 选择不同的分类
      this.form.classid = this.musicTypeList[parseInt(e.target.value)].id
      this.form.classname = this.musicTypeList[parseInt(e.target.value)].taskClass
    },
    // 选择不同的分类
    playtimesChange (e) {
      // this.form.playtimes = this.playtimesList[parseInt(e.target.value)].name
      this.$set(this.form, 'playtimes', this.playtimesList[parseInt(e.target.value)].name)
    },
    // 选择播放类型
    bindPayTypeChange (e) {
      this.form.endtime = ''
      this.playtimes = ''
      this.playType = this.playTypeList[parseInt(e.target.value)].name
    },
    // 选择播放星期
    bindWeekChange (e) {
      wx.navigateTo({
        // url: '/pages/selectWeek/main'
        url: `/pages/selectWeek/main?form=${JSON.stringify(this.weekList)}`
      })
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
    changeName () {
      wx.navigateTo({
        url: '/pages/changeBroadcastName/main'
      })
    },
    // 删除已选广播内容
    deleteTitle () {
      this.changeProgramTitle('')
      this.changeMusicList([])
    },
    // 删除已选广播范围
    deleteRange (item) {
      if (this.areaType === 'device') {
        this.changeDeviceList([])
      } else if (this.areaType === 'area') {
        const filteredData = this.areaes.filter(num => num.id !== item.id);
        this.changeAreaList(filteredData)
      }
    },
    toSubmitBroadcast () { // 提交添加或者编辑任务
      this.form.fengLei = this.mediaType
      this.form.areaes = []
      this.form.music = this.musicid
      this.form.menu_id = this.programMenuId
      this.form.taskname = this.broadcastName
      if (this.weekList && this.updateTask) {
        let num = []
        this.weekList.forEach(item => {
          num.push(item)
        })
        this.form.week = num
      } else {
        this.form.week = this.weekList
      }
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
    // checkboxChange (value) {
    //   this.form.week = value.target.value
    // },
    // 选定广播的播放时间
    bindTimeChange (value) {
      this.playTime = value.target.value + ':00'
    },
    // 选定广播的结束时间
    bindEndTimeChange (value) {
      this.form.endtime = value.target.value + ':00'
      console.log(this.form.endtime);
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
  background: #fff;
  height: 100vh;
  overflow-y: scroll;

  .bg {
    background-color: #F5F8FF;
  }

  .item {
    margin: 40rpx 0;

    button {
      color: #ffffff;
      background: #f5b619;
      border: none;
      width: 620rpx;
      height: 80rpx;
      background: #F5B619;
      font-size: 30rpx;
      border-radius: 8rpx;
    }

  }

  .add-item {

    .title {
      margin-bottom: 20rpx;
      color: #1A1A1A;
      font-size: 36rpx;
    }

    .input-box {
      padding: 30rpx 30rpx;
      border-bottom: 1px solid #eee;

      .box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .box-left {
          display: flex;
          justify-content: center;
          align-items: center;
          line-height: 38rpx;

          .img {
            margin-right: 20rpx;
            width: 30rpx;
            height: 30rpx;

            image {
              width: 100%;
              height: 100%;
            }
          }

          .name {
            font-size: 30rpx;
            font-weight: 500;
            color: #333333;
          }
        }

        .box-right {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 30rpx;
          font-weight: 500;
          color: #333333;

          .data {
            width: 400rpx;
            text-align: right;
          }

          .add-img {
            width: 30rpx;
            height: 30rpx;
            margin-right: 10rpx;

            image {
              width: 100%;
              height: 100%;
            }
          }

          .r-img {
            margin: 0 0 20rpx 30rpx;
            width: 15rpx;
            height: 20rpx;

            image {
              width: 100%;
              height: 100%;
            }
          }

          .delete-img {
            margin: 0 0 10rpx 30rpx;
            width: 30rpx;
            height: 30rpx;
            padding-top: 6rpx;

            image {
              width: 100%;
              height: 100%;
            }
          }
        }
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
