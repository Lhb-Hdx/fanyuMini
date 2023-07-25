<template>
  <div class="cont-box">
    <div class="container-table-top">
      <el-card>
        <div class="broadcast-top">
          <div class="broadcast-top-left">
            <div class="time">{{ time }}</div>
            <div class="date">{{ date }}</div>
          </div>
          <el-button type="danger" @click="toUrgentStop" size="mini">紧急停播</el-button>
        </div>
      </el-card>
    </div>
    <div class="container-table">
      <div class="container-item" style="width: 26%">
        <el-card class="format-card">
          <div class="title">直播范围</div>
          <div class="area-box">
            <div class="area-container">
              <div class="area-box-item" v-if="treeData.length > 0">
                <div class="box-item-title">全校</div>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                  @change="handleCheckAllChange">全选</el-checkbox>
              </div>
              <!-- <el-checkbox-group v-model="deviceCheckList" size="mini" @change="handleCheckedCitiesChange">
                <div class="area-box-item" v-for="(value, key, index) of areaAndDeviceList" :key="index">
                  <div class="box-item-title" v-if="key !== '全校' && value.length > 0">{{ key }}</div>
                  <div class="box-item-container" v-if="key !== '全校' && value.length > 0">
                    <el-checkbox v-for="(item, indx) of value" :label="item.sn" :key="indx">{{item.deviceName}}</el-checkbox>
                  </div>
                </div>
              </el-checkbox-group> -->
              <el-tree :data="treeData" show-checkbox node-key="sn" ref="tree" default-expand-all :props="defaultProps"
                :default-checked-keys="defaultCheckedKeys" :check-on-click-node="true" @check="handleNodeClick">
                <span slot-scope="{ node }">
                  <span :class="{ online: node.label.indexOf('在线') > -1, outline: node.label.indexOf('离线') > -1 }">{{
                    node.label }}</span>
                </span>
              </el-tree>
            </div>
          </div>
        </el-card>
      </div>
      <div class="container-item" style="width: 36%">
        <el-card class="format-card">
          <div class="title">麦克风</div>
          <div class="bg-box" v-if="zhiboForm.action === 'start'"
            :style="{ 'background-image': `url(${backgroundimg})` }">
            <div class="bg-box-item" v-for="n of 20" :key="n"
              :style="{ height: parseInt(Math.random() * 0.75 * zhiboForm.volume, 10) + '%' }"></div>
          </div>
          <div class="bg-box-two" v-else :style="{ 'background-image': `url(${backgroundimg})` }">
          </div>
          <div class="button-box">
            <div class="left">
              <img src="@/assets/images/playicon.png" v-if="zhiboForm.action === '' || zhiboForm.action === 'stop'"
                @click="toZhibo('start')">
              <img src="@/assets/images/stopicon.png" @click="toZhibo('stop')">
            </div>
            <div class="right">
              <div class="volume-icon">
                <img src="@/assets/images/volume.png">
              </div>
              <div class="volume-contro-box">
                <el-slider v-model="zhiboForm.volume" @change="changeZhiboVolume"></el-slider>
              </div>
            </div>
          </div>
          <!-- <div class="display-microphone">
            <div class="title">选择麦克风</div>
            <div class="microphone-box">
              <div class="microphone">
                <el-radio-group v-model="zhiboForm.param">
                  <el-radio label="server">广播室</el-radio>
                  <el-radio v-for="(item, index) of microphoneList" :key="index" :label="item.deviceId">{{ item.deviceName }}</el-radio>
                </el-radio-group>
              </div>
            </div>
          </div> -->
        </el-card>
      </div>
      <div class="container-item" style="width: 36%">
        <el-card class="format-card">
          <div class="title">音频</div>
          <div class="bg-box" v-if="playMusicForm.action === 'play' || playMusicForm.action === 'resume'"
            :style="{ 'background-image': `url(${backgroundimg})` }">
            <div class="bg-box-item" v-for="n of 20" :key="n"
              :style="{ height: parseInt(Math.random() * 0.75 * playMusicForm.volume, 10) + '%' }"></div>
          </div>
          <div class="bg-box-two" v-else :style="{ 'background-image': `url(${backgroundimg})` }">
          </div>
          <div class="button-box-two">
            <div class="button-box-two-left">
              <img src="@/assets/images/playicon.png"
                v-if="playMusicForm.action === '' || playMusicForm.action === 'stop'" @click="toBofangMusic('play')">
              <img src="@/assets/images/pauseicon.png"
                v-if="playMusicForm.action === 'play' || playMusicForm.action === 'resume'"
                @click="toBofangMusic('pause')">
              <img src="@/assets/images/playicon.png" v-if="playMusicForm.action === 'pause'"
                @click="toBofangMusic('resume')">
              <img src="@/assets/images/stopicon.png" @click="toBofangMusic('stop')">
            </div>
            <div class="button-box-two-right">
              <div class="loop-box">
                <img :src="playMusicForm.loop === 1 ? looppic : notlooppic" @click="clickLoop">
              </div>
              <div class="volume-box">
                <div class="volume-icon">
                  <img src="@/assets/images/volume.png">
                </div>
                <div class="volume-contro-box">
                  <el-slider v-model="playMusicForm.volume" @change="changeVolume"></el-slider>
                </div>
              </div>
            </div>
          </div>
          <div class="display-microphone">
            <div class="title-box">
              <div class="title-two">
                <el-button type="text"
                  :disabled="voiceType === 'system' || playMusicForm.action === 'play' || playMusicForm.action === 'resume' || playMusicForm.action === 'pause'"
                  @click="addMusicVisible = true">选择音频</el-button>
              </div>
              <div class="radio-box">
                <el-radio-group v-model="voiceType"
                  :disabled="playMusicForm.action === 'play' || playMusicForm.action === 'resume' || playMusicForm.action === 'pause'"
                  @change="changeMusicType">
                  <el-radio label="selfMusic">自有音乐</el-radio>
                  <!-- <el-radio label="system">系统音乐</el-radio> -->
                </el-radio-group>
              </div>
            </div>
            <div class="music-display-box">
              <div class="music-box" v-if="voiceType === 'selfMusic'">
                <div class="music-item" v-for="(item, index) of showMusicList" :key="index">
                  <div class="item-left">
                    <img src="@/assets/images/musiccp.png">
                    <div class="music-title">{{ item.musicName || item.name }}</div>
                  </div>
                  <img src="@/assets/images/delete.png" @click="toReduceMusic(index)"
                    v-if="playMusicForm.action === '' || playMusicForm.action === 'stop'">
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <selectmusic v-if="addMusicVisible" :visible.sync="addMusicVisible" :selectedmusic="showMusicList"
      @submitHandle="submitAddmusic" />
    <live-push ref="livePushcomponent"></live-push>
  </div>
</template>

<script>
// import Recorder from 'js-audio-recorder'
import { mapGetters } from 'vuex'
import { formatTableDate } from '@/utils/date'
import { liveControl, queryMicrophone, musicControlNew, urgentStop } from '@/api/broadcast'
import { getVoiceNameLst } from '@/api/tts'
import { areaQueryControl, querySchoolAllDevice, schoolQueryAreaDevice } from '@/api/device'
import { queryMusic, queryMusicControl } from '@/api/music'
import selectmusic from './selectMusicDialog'
import livePush from '@/components/livePush'
export default {
  components: {
    selectmusic,
    livePush
  },
  name: 'classList',
  data () {
    return {
      websock: null, // websocket对象
      looppic: require('@/assets/images/loop.png'),
      notlooppic: require('@/assets/images/loopone.png'),
      deviceCheckList: [],
      interval: null,
      time: '',
      date: '',
      week: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      backgroundimg: require('@/assets/images/musicbg.png'),
      treeData: [], // 树状组件数据
      defaultCheckedKeys: [], // 树状图默认选中的数据
      treeDataIndex: 0, // 格式化树状组件数据的累加id
      src: '', // 文字转语音试听链接
      tryMusicsrc: '', // 试听音乐
      recorder: {}, // 录音器
      recordeState: '', // 录音状态
      checkAll: false, // 是否全选
      isIndeterminate: false, // 选择区域是否全选
      addMusicVisible: false,
      infinitescrolldisabled: false,
      voiceType: 'selfMusic', // 播放音频的类型，system或者music
      showMusicList: [], // 展示添加的音乐
      deviceList: [], // 设备列表
      allDeviceIdList: [], // 所有设备的id列表
      areaList: [], // 区域列表
      musicList: [], // 音乐列表
      voiceValue: '', // 选择的读音人
      voiceOptions: [], // 读音人列表
      microphoneList: [], // 麦克风列表
      areaAndDeviceList: {}, // 区域和设备整合的对象
      rangeOptions: [ // 是按区域还是设备播放
        { label: '区域', value: 0 },
        { label: '设备', value: 1 }
      ],
      defaultProps: {
        children: 'children',
        label: 'deviceName'
      },
      zhiboForm: {
        action: '',
        groupName: 'm_stream',
        level: '',
        param: 'server',
        sn: [],
        volume: 100
      },
      playMusicForm: {
        action: '',
        area: [],
        music: [],
        playid: '',
        loop: 0, // 0 表示不循环，1表示循环
        sn: [],
        volume: 100
      },
      musicForm: {
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created () {
    this.initWebSocket()
    // this.recorder = new Recorder()
    // this.recorder.onprocess = duration => {
    //   this.posterVoice.recorderTime = parseInt(duration)
    // }
  },
  beforeMount () {
    this.interval = setInterval(this.updateTime, 1000)
    this.updateTime()
    // this.getDeviceList()
    this.getAreaAndDeviceList()
    this.queryPlayStatus()
    // this.getNameList()
    // this.getMusicList()
    // this.getMicphoneList()
    this.getDataToLocal()
  },
  beforeDestroy () {
    clearInterval(this.interval)
    this.websock.close() // 离开路由之后断开websocket连接
  },
  destroyed () {
  },
  filters: {
    formatData (value) {
      return formatTableDate(value)
    }
  },
  methods: {
    initWebSocket () { // 初始化weosocket
      // const wsuri = "ws://127.0.0.1:8080"
      const wsuri = `ws://${location.hostname}:9092`
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen () { // 建立连接之后执行send方法发送数据
      let form = `hello:${this.name}`
      this.websock.send(form)
    },
    websocketonmessage (e) { // 接受websocket服务器数据
      if (e.data.indexOf('musicstatus') > -1) {
        let status = JSON.parse(e.data).musicstatus
        if (status === 0) {
          this.playMusicForm.action = 'stop'
        } else if (status === 1) {
          this.playMusicForm.action = 'play'
        } else if (status === 2) {
          this.playMusicForm.action = 'pause'
        }
      }
    },
    websocketonerror () { // 连接建立失败重连
      this.initWebSocket()
    },
    websocketclose (e) { // 关闭
      console.log('断开连接', e)
    },
    queryPlayStatus () { // 获取广播的播放状态
      queryMusicControl()
        .then(res => {
          if (res.code === 200) {
            if (res.data.music_status === 0 && res.data.system_status === 0) {
              this.playMusicForm.action = 'stop'
            } else if (res.data.music_status === 1 || res.data.system_status === 1) {
              this.playMusicForm.action = 'play'
            } else if (res.data.music_status === 2 || res.data.system_status === 2) {
              this.playMusicForm.action = 'pause'
            }
            if (res.data.live_status === 0 || res.data.live_status === 2) {
              this.zhiboForm.action = 'stop'
            } else if (res.data.live_status === 1) {
              this.zhiboForm.action = 'start'
            }
          }
        })
    },
    saveDataToLocal (str, data) { // 将播放的相关数据存到本地
      localStorage.setItem(str, data)
    },
    getDataToLocal () { // 获取存放在本地的数据
      if (localStorage['musicList']) {
        this.showMusicList = JSON.parse(localStorage.getItem('musicList'))
      }
      if (localStorage['zhiboForm']) {
        this.zhiboForm = JSON.parse(localStorage.getItem('zhiboForm'))
      }
      if (localStorage['playMusicForm']) {
        this.playMusicForm = JSON.parse(localStorage.getItem('playMusicForm'))
        console.log(this.playMusicForm, '1111111111')
        if (this.playMusicForm.music[0] === 'system') {
          this.voiceType = 'system'
        } else {
          this.voiceType = 'selfMusic'
        }
      }
    },
    clickLoop () { // 点击是否循环播放
      if (this.playMusicForm.loop === 0) {
        this.playMusicForm.loop = 1
      } else {
        this.playMusicForm.loop = 0
      }
      if (this.playMusicForm.action === 'play' || this.playMusicForm.action === 'resume') {
        let obj = { ...this.playMusicForm }
        obj.action = 'loop'
        this.toPlayMusic(obj)
      }
    },
    changeVolume (val) { // 改变音乐播放音量
      if (this.playMusicForm.action === 'play' || this.playMusicForm.action === 'resume') {
        let obj = { ...this.playMusicForm }
        obj.action = 'volume'
        this.toPlayMusic(obj)
      }
    },
    changeZhiboVolume (val) { // 改变直播音量
      if (this.zhiboForm.action === 'start') {
        let obj = { ...this.zhiboForm }
        obj.action = 'volume'
        this.toLiveControl(obj)
      }
    },
    toUrgentStop () { // 紧急停播
      urgentStop()
        .then(res => {
          if (res.code === 200) {
            this.zhiboForm.action = 'stop'
            this.playMusicForm.action = 'stop'
          }
        })
    },
    toBofangMusic (str) { // 播放音乐
      if (this.playMusicForm.sn.length === 0) {
        this.$message({
          message: '请选择直播范围',
          type: 'error'
        })
      } else if (this.voiceType !== 'system' && this.showMusicList.length === 0) {
        this.$message({
          message: '请选择音乐',
          type: 'error'
        })
      } else {
        if (this.voiceType !== 'system') {
          let arr = []
          for (let n of this.showMusicList) {
            arr.push(n.musicPath)
          }
          this.playMusicForm.music = arr
        }
        this.playMusicForm.action = str
        if (str === 'play') {
          this.playMusicForm.playid = Date.parse(new Date()) + ''
        }
        this.toPlayMusic(this.playMusicForm)
      }
    },
    // toZhibo (str) { // 开始直播（话筒）
    //   if (this.zhiboForm.sn.length === 0) {
    //     this.$message({
    //       message: '请选择直播范围',
    //       type: 'error'
    //     })
    //   } else {
    //     this.zhiboForm.action = str
    //     if (str === 'start') {
    //       this.zhiboForm.level = Date.parse(new Date()) + ''
    //     }
    //     this.toLiveControl(this.zhiboForm)
    //   }
    // },
    toZhibo (str) { // 开始直播（webRTC）
      if (this.zhiboForm.sn.length === 0) {
        this.$message({
          message: '请选择直播范围',
          type: 'error'
        })
      } else {
        this.zhiboForm.action = str
        if (str === 'start') {
          // let lstsn = this.zhiboForm.sn.join()
          this.$refs.livePushcomponent.getWebRtcControl(this.zhiboForm.sn)
        } else {
          this.$refs.livePushcomponent.toCloseWebRtc()
        }
        this.saveDataToLocal('zhiboForm', JSON.stringify(this.zhiboForm))
      }
    },
    handleNodeClick (data, value) { // 点击树状组件
      this.checkAll = false
      let arr = []
      for (let n of value.checkedKeys) {
        if (typeof n === 'string') {
          arr.push(n)
        }
      }
      this.playMusicForm.sn = arr
      this.zhiboForm.sn = arr
    },
    handleCheckedCitiesChange (value) {
      this.checkAll = value.length === this.allDeviceIdList.length
      // this.isIndeterminate = value.length > 0 && value.length < this.deviceCheckList.length
    },
    handleCheckAllChange (val) { // 点击全选
      if (val) {
        let arr = []
        for (let n = 0; n < this.treeDataIndex; n++) {
          arr.push(n)
        }
        this.$refs.tree.setCheckedKeys(arr)
        this.playMusicForm.sn = this.allDeviceIdList
        this.zhiboForm.sn = this.allDeviceIdList
      } else {
        this.playMusicForm.sn = []
        this.zhiboForm.sn = []
        this.$refs.tree.setCheckedKeys([])
      }
    },
    updateTime () { // 时钟
      let cd = new Date()
      this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2)
      this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + this.week[cd.getDay()]
    },
    zeroPadding (num, digit) { // 补零
      let zero = ''
      for (var i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    },
    toLiveControl (form) { // 直播广播
      this.saveDataToLocal('zhiboForm', JSON.stringify(form))
      liveControl(form)
    },
    toPlayMusic (form) { // 播放音频
      this.saveDataToLocal('playMusicForm', JSON.stringify(form))
      musicControlNew(form)
    },
    getMicphoneList () { // 获取麦克风列表
      queryMicrophone()
        .then(res => {
          if (res.code === 200) {
            this.microphoneList = res.data
            this.zhiboForm.param = res.data[0].deviceId
          }
        })
    },
    getAreaAndDeviceList () { // 获取区域及区域下的设备
      schoolQueryAreaDevice()
        .then(res => {
          if (res.code === 200) {
            this.areaAndDeviceList = res.data
            for (let n in res.data) {
              if (n !== '全校' && res.data[n].length > 0) {
                for (let m of res.data[n]) {
                  this.allDeviceIdList.push(m.sn)
                }
                this.treeData.push({
                  sn: this.treeDataIndex,
                  deviceName: n,
                  children: res.data[n]
                })
                this.treeDataIndex++
              }
            }
            this.$nextTick(() => {
              if (this.playMusicForm.sn.length - this.zhiboForm.sn.length >= 0) {
                this.defaultCheckedKeys = this.playMusicForm.sn
                this.zhiboForm.sn = this.playMusicForm.sn
              } else {
                this.defaultCheckedKeys = this.zhiboForm.sn
                this.playMusicForm.sn = this.zhiboForm.sn
              }
            })
          }
        })
    },
    getMusicList () { // 获取音乐列表
      queryMusic(this.musicForm)
        .then(res => {
          if (res.code === 200 && res.data.list.length > 0) {
            this.musicList = [...this.musicList, ...res.data.list]
            // this.playMusicForm.music.push(this.musicList[0].musicPath)
          } else {
            this.infinitescrolldisabled = true
          }
        })
    },
    toLoadMusicList () {
      this.musicForm.pageNum += 1
      this.getMusicList()
    },
    getDeviceList () { // 获取设备列表
      querySchoolAllDevice()
        .then(res => {
          if (res.code === 200) {
            this.deviceList = res.data
            // this.deviceCheckList.push(res.data[0].id)
            // for (let n of this.deviceList) {
            //   this.allDeviceIdList.push(n.id)
            // }
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
            this.voiceOptions = res.data
            this.voiceValue = res.data[0].voiceEnum
          }
        })
    },
    changeMusicType (val) { // 选择播放的音乐类型
      if (val === 'selfMusic') {
        if (this.showMusicList.length === 0) {
          this.addMusicVisible = true
        }
      } else if (val === 'system') {
        this.playMusicForm.music = ['system']
      }
    },
    toReduceMusic (index) {
      this.showMusicList.splice(index, 1)
      localStorage.setItem('musicList', JSON.stringify(this.showMusicList)) // 将选定的音乐存到本地
    },
    submitAddmusic (data) { // 将音乐添加到播放列表
      this.showMusicList = data
      localStorage.setItem('musicList', JSON.stringify(data)) // 将选定的音乐存到本地
      this.addMusicVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.online {
  color: #67C23A
}

.outline {
  color: #F56C6C
}

.cont-box {
  padding: 10px;

  .container-table-top {
    margin-bottom: 10px;

    .broadcast-top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .broadcast-top-left {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        .time {
          font-size: 20px;
          color: #479cfd;
          margin-right: 10px;
          width: 90px;
        }
      }
    }
  }
}

.title {
  padding-left: 10px;
  border-left: 4px solid #479cfd;
  font-size: 14px;
  margin-bottom: 20px;
}

.bg-box {
  height: 10vh;
  background: #479cfd;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  border-radius: 5px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;

  .bg-box-item {
    width: 2%;
    background: #ffffff;
    opacity: 0.7
  }
}

.bg-box-two {
  height: 10vh;
  background: #479cfd;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.button-box {
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .left {
    width: 25%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    img {
      width: 25px;
      height: auto;
    }
  }

  .right {
    width: 75%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .volume-icon {
      width: 15%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      img {
        width: 25px;
        height: auto;
      }
    }

    .volume-contro-box {
      width: 78%;
    }
  }
}

.button-box-two {
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .button-box-two-left {
    width: 25%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    img {
      width: 25px;
      height: auto;
    }
  }

  .button-box-two-right {
    width: 75%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .loop-box {
      width: 25%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      img {
        width: 25px;
        height: auto;
      }
    }

    .volume-box {
      width: 75%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      .volume-icon {
        width: 20%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        img {
          width: 25px;
          height: auto;
        }
      }

      .volume-contro-box {
        width: 78%;
      }
    }
  }
}

.display-microphone {
  .title-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .title-two {
      // padding-left: 10px;
      // border-left: 4px solid #479cfd;
      // cursor: pointer;
      // font-size: 14px;
      // color: #479cfd;
      // line-height: 1;
      margin-bottom: 10px;
    }
  }

  .microphone-box {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 36vh;

    .microphone {
      overflow-y: scroll;
      overflow-x: hidden;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: -25px;
    }
  }

  .music-display-box {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 36vh;

    .music-box {
      overflow-y: scroll;
      overflow-x: hidden;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: -25px;

      .music-item {
        padding: 10px 20px 10px 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .item-left {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;

          .music-title {
            margin-left: 10px;
          }

          img {
            width: 25px;
            height: auto;
          }
        }

        img {
          width: 14px;
          height: auto;
        }
      }
    }
  }
}

.format-card {
  height: 73vh;
}

.format-card-padding {
  padding: 10px
}

.container-table {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.area-box {
  width: 100%;
  position: relative;
  overflow: hidden;
  height: 63vh;

  .area-container {
    overflow-y: scroll;
    overflow-x: hidden;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: -25px;

    .area-box-item {

      // margin-bottom: 30px;
      .box-item-title {
        font-size: 14px;
        margin-bottom: 10px;
      }

      .box-item-container {
        padding: 0 10px;
      }
    }
  }
}

.el-radio {
  margin-bottom: 10px;
}

.el-checkbox {
  margin-bottom: 10px;
}
</style>
