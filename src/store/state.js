const state = {
  userInfo: '', // 用户的微信信息
  userSystemInfo: {}, // 用户的系统登录数据
  areaes: [], // 选择的播放区域列表
  devices: [], // 选择的播放设备列表
  musicid: [], // 选择的音乐列表
  musicTitle: '', // 选中的歌曲标题
  programTitle: '', // 选择的节目名字
  programMenuId: '', // 选择的节目id
  areaTitle: '', // 选中的区域标题
  broadcastName: '', // 修改的广播名称
  weekList: [], // 选择的星期列表
  weekNameList: [], // 选择的星期名列表
  playMusicForm: {
    action: '',
    area: [],
    music: [],
    playid: '',
    sn: [],
    volume: 100
  }
}
export default state
