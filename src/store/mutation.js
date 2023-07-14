const mutations = {
  // 修改选择的音乐名称
  changePlayMusicForm (state, data) {
    state.playMusicForm = data
  },
  // 修改选择的音乐名称
  changeMusicTitle (state, data) {
    state.musicTitle = data
  },
  // 修改选择的区域名字
  changeAreaTitle (state, data) {
    state.areaTitle = data
  },
  // 修改选择的节目名字
  changeProgramTitle (state, data) {
    state.programTitle = data
  },
  // 修改选择的节目id
  changeProgramMenuId (state, data) {
    state.programMenuId = data
  },
  // 修改选择的音乐列表
  changeMusicList (state, data) {
    state.musicid = data
  },
  // 修改选择的设备列表
  changeDeviceList (state, data) {
    state.devices = data
  },
  // 修改选择的区域列表
  changeAreaList (state, data) {
    state.areaes = data
  },
  // 修改获取的系统用户信息
  changeSystemUserInfo (state, data) {
    state.userSystemInfo = data
  },
  // 修改获取的用户微信信息
  changeUserInfo (state, data) {
    state.userInfo = data
  }
}
export default mutations
