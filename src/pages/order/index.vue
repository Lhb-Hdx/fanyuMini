<template>
  <div class="home-container-box" :style="{height: clientHeight + 'rpx'}">
    <div class="container-top-box">
      <div class="top-box-item" @click="toPage('add')">
        <image src="/static/icon/addicon.png" mode="widthFix"/>
        <div class="text">新建广播</div>
      </div>
      <div class="top-box-item current-bg" @click="toPage('list')">
        <image src="/static/icon/listicon.png" mode="widthFix"/>
        <div class="text">广播列表</div>
      </div>
    </div>
    <div class="container-bottom-box" v-if="steps.length > 0">
      <!-- <div class="bottom-box-top">
        <image src="/static/icon/greenDot.png" mode="widthFix"/>
        <div class="text"></div>
      </div> -->
      <div class="bottom-list-box">
        <div class="list-box-item">
          <div class="list-box-left end-flex">
            <image class="dot" src="/static/icon/greenDot.png" mode="heightFix"/>
            <div class="line linetwo"></div>
          </div>
          <div class="list-box-right">
            <div class="box-right-text">今日广播</div>
          </div>
        </div>
        <div class="list-box-item" v-for="(item, index) of steps" :key="index">
          <div class="list-box-left">
            <div class="line"></div>
            <image src="/static/icon/homegou.png" mode="heightFix"/>
            <div class="line" v-if="index !== steps.length - 1"></div>
          </div>
          <div class="list-box-right">
            <div class="box-right-container">
              <div class="right-container-left">
                <div class="right-container-top">
                  <div class="title">出游活动安排</div>
                  <div class="control-box">
                    <image src="/static/icon/reducevoicetwo.png" mode="widthFix"/>
                    <div class="count">60%</div>
                    <image src="/static/icon/addvoicetwo.png" mode="widthFix"/>
                  </div>
                </div>
                <div class="right-container-bottom">
                  <div class="bottom-item">时间: 7:00 一/二/三/四/五/六</div>
                  <div class="bottom-item">范围: 二年级、三年级</div>
                </div>
              </div>
              <div class="right-container-right" @click="toUpdate">
                <image src="/static/icon/sandian.png" mode="widthFix"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nodata-box" v-else>
      <div class="title-box">
        <div class="text">今日广播</div>
      </div>
      <div class="default-box">
        <image src="/static/icon/gantanhao.png" mode="widthFix"/>
        <div class="text">今日暂无广播</div>
      </div>
    </div>
    <div class="stop-play" @click="tostopplay">
      <div class="text">中断</div>
      <div class="text">播放</div>
    </div>
  </div>
</template>

<script>
import {
// getBannerList,
// personinfo
} from '@/utils/getData'
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      dialog: false,
      goShopingDialog: false,
      clientHeight: 0,
      type: 'baby',
      imgList: [],
      steps: [1, 2, 3, 4, 5, 6],
      loginForm: {
        avatarUrl: '',
        nickName: '',
        sex: ''
      }
    }
  },
  computed: {
    ...mapState(['userSystemInfo'])
  },
  onLoad () {
    wx.setNavigationBarTitle({title: '智能广播'})
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              this.onGotUserInfo(res)
            }
          })
        } else {
          this.dialog = true
        }
      }
    })
  },
  onShow () {
    wx.getStorage({
      key: 'login',
      success: () => {
        this.getInfor()
      }
    })
    this.getbanner()
  },
  beforeMount () {
    wx.getSystemInfo({
      success: (res) => {
        let rpxR = res.windowHeight / res.windowWidth
        this.clientHeight = 750 * rpxR
      }
    })
  },
  methods: {
    ...mapMutations(['changeUserInfo', 'changeSystemUserInfo']),
    toPage (str) {
      if (str === 'add') {
        wx.navigateTo({
          url: '/pages/addBroadcast/main'
        })
      } else {
        wx.navigateTo({
          url: '/pages/broadcastList/main'
        })
      }
    },
    tostopplay () {
      wx.showModal({
        title: '',
        content: '您确定要中断全部播放吗？',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    toUpdate () {
      wx.showActionSheet({
        itemList: ['中断播放', '编辑/查看', '删除'],
        success (res) {
          console.log(res.tapIndex)
        },
        fail (res) {
          console.log(res.errMsg)
        }
      })
    },
    getInfor () {
      // personinfo()
      //   .then(res => {
      //     if (res.code === 200) {
      //       this.changeSystemUserInfo(res.data)
      //     }
      //   })
    },
    showDialog (type) {
      wx.getStorage({
        key: 'login',
        success: () => {
          this.showdis(type)
        },
        fail () {
          wx.navigateTo({
            url: '/pages/login/main'
          })
        }
      })
    },
    showdis (type) {
      if (this.userSystemInfo.partnerLevelId === 8) {
        this.goShopingDialog = true
        this.type = type
      } else if (this.userSystemInfo.partnerLevelId === 7) {
        if (type === 'baby') {
          wx.showToast({
            title: '您已经是宝宝用户，可升级为妈妈用户',
            icon: 'none',
            duration: 3500
          })
        } else {
          this.goShopingDialog = true
          this.type = type
        }
      } else if (this.userSystemInfo.partnerLevelId === 6) {
        wx.showToast({
          title: '您已经是妈妈用户',
          icon: 'none',
          duration: 3500
        })
      } else if (this.userSystemInfo.partnerLevelId === 5) {
        wx.showToast({
          title: '您已经是超级妈妈',
          icon: 'none',
          duration: 3500
        })
      }
    },
    toGoshoping () {
      this.goShopingDialog = false
      wx.getStorage({
        key: 'login',
        success: () => {
          wx.navigateTo({
            url: `/pages/goshoping/main?type=${this.type}`
          })
        },
        fail () {
          wx.navigateTo({
            url: '/pages/login/main'
          })
        }
      })
    },
    getbanner () {
      // getBannerList()
      //   .then(resp => {
      //     if (resp.code === 200) {
      //       this.imgList = resp.data.list
      //       wx.hideLoading()
      //     } else {
      //       wx.showToast({
      //         title: resp.message,
      //         icon: 'none',
      //         duration: 2000
      //       })
      //     }
      //   })
      //   .catch((err) => {
      //     wx.showToast({
      //       title: err.message,
      //       icon: 'none',
      //       duration: 2000
      //     })
      //   })
    },
    onGotUserInfo (e) {
      // console.log(e)
      this.dialog = false
      if (e.target && e.target.errMsg === 'getUserInfo:ok') {
        this.changeUserInfo(e.target.userInfo)
      } else if (e.errMsg === 'getUserInfo:ok') {
        this.changeUserInfo(e.userInfo)
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container-box {
  background: #F2F2F2;
  overflow-y: scroll;
  .container-top-box {
    padding: 40rpx 40rpx 20rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .top-box-item {
      width: 45%;
      padding: 25rpx 0;
      background: #21D47F;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 20rpx;
      image {
        width: 40rpx;
      }
      .text {
        font-size: 35rpx;
        color: #ffffff;
        margin-left: 20rpx;
      }
    }
    .current-bg {
      background: #479CFD;
    }
  }
  .container-bottom-box {
    padding: 0 40rpx 190rpx;
    .bottom-box-top {
      padding: 10rpx 0;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      image {
        width: 40rpx;
      }
      .text {
        font-size: 35rpx;
        color: #515151;
        margin-left: 20rpx;
      }
    }
    .bottom-list-box {
      .list-box-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;
        .list-box-left {
          width: 6%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          .line {
            width: 1px;
            height: 43%;
            background: #bfbfbf
          }
          image {
            height: 14%;
          }
          .dot {
            height: 42%
          }
          .linetwo {
            height: 22%;
          }
        }
        .end-flex {
          justify-content: flex-end;
        }
        .list-box-right {
          width: 90%;
          padding: 20rpx 0;
          .box-right-text {
            font-size: 38rpx;
            color: #515151;
          }
          .box-right-container {
            background: #ffffff;
            border-radius: 20rpx;
            padding: 30rpx;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .right-container-left {
              .right-container-top {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                .title {
                  color: #1A1A1A;
                  font-size: 36rpx;
                }
                .control-box {
                  margin-left: 30rpx;
                  display: flex;
                  flex-direction: row;
                  justify-content: flex-start;
                  align-items: center;
                  image {
                    width: 50rpx;
                  }
                  .count {
                    color: #808080;
                    font-size: 30rpx;
                    margin: 0 10rpx;
                  }
                }
              }
              .right-container-bottom {
                margin-top: 30rpx;
                .bottom-item {
                  margin-top: 10rpx;
                  color: #808080;
                  font-size: 30rpx
                }
              }
            }
            .right-container-right {
              image {
                width: 60rpx
              }
            }
          }
        }
      }
    }
  }
  .nodata-box {
    padding: 20rpx 40rpx 0;
    .title-box {
      margin-bottom: 20rpx;
      .text {
        color: #1A1A1A;
        font-size: 36rpx;
      }
    }
    .default-box {
      height: 200rpx;
      border-radius: 20rpx;
      background: #ffffff;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      image {
        width: 40rpx;
      }
      .text {
        margin-left: 10rpx;
        color: #808080;
        font-size: 30rpx
      }
    }
  }
  .stop-play {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 75rpx;
    width: 120rpx;
    height: 120rpx;
    background: #FF3444;
    position: fixed;
    bottom: 60rpx;
    right: 50rpx;
    .text {
      color: #ffffff;
      font-size: 30rpx;
    }
  }
}
</style>
