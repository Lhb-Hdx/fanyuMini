<template>
  <div class="my-container">
    <div class="my-box">
      <div class="my-box-top">
        <image src="/static/icon/logo-xiaoyu.png" mode="widthFix"/>
        <div class="infor-box" v-if="logined">{{ userInfor.username }}</div>
        <div class="login-btn" v-else @click="toLogin">登录</div>
      </div>
    </div>
    <div class="list-box">
      <div class="list-item" @click="toPage('device')">
        <div class="item-left">
          <image src="/static/icon/deviceIcon.png" mode="widthFix"/>
          <div class="item-left-right">设备管理</div>
        </div>
        <div class="item-right">
          <image src="/static/icon/jiantou.png" mode="widthFix"/>
        </div>
      </div>
      <div class="list-item" @click="toPage('area')">
        <div class="item-left">
          <image src="/static/icon/iconarea.png" mode="widthFix"/>
          <div class="item-left-right">区域管理</div>
        </div>
        <div class="item-right">
          <image src="/static/icon/jiantou.png" mode="widthFix"/>
        </div>
      </div>
      <div class="list-item">
        <div class="item-left">
          <image src="/static/icon/userGroupicon.png" mode="widthFix"/>
          <div class="item-left-right">用户组</div>
        </div>
        <div class="item-right">
          <image src="/static/icon/jiantou.png" mode="widthFix"/>
        </div>
      </div>
      <div class="list-item">
        <div class="item-left">
          <image src="/static/icon/usericon.png" mode="widthFix"/>
          <div class="item-left-right">用户管理</div>
        </div>
        <div class="item-right">
          <image src="/static/icon/jiantou.png" mode="widthFix"/>
        </div>
      </div>
    </div>
    <!-- <div class="add-item">
      <button @click="toStopBroadcast">紧急停止</button>
    </div> -->
    <div class="add-item" v-if="logined">
      <button class="logout" @click="toLogout">账号登出</button>
    </div>
  </div>
</template>

<script>
import {
  info,
  toUrgentStopPlay
} from '@/utils/getData'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      logined: false,
      userInfor: {
        username: '',
        userId: ''
      }
    }
  },
  onShow () {
    wx.getStorage({
      key: 'login',
      success: () => {
        this.logined = true
        this.getUserData()
      },
      fail: () => {
        this.logined = false
      }
    })
  },
  beforeMount () {
    wx.setNavigationBarTitle({title: '个人中心'})
  },
  computed: {
    ...mapState(['userSystemInfo', 'userInfo']),
    formatterDateMonthAndYear () {
      return this.$moment(this.date).format('MMM.YYYY')
    }
  },
  methods: {
    // 登出
    toLogout () {
      wx.clearStorage({
        success: () => {
          wx.redirectTo({
            url: '/pages/login/main'
          })
        }
      })
    },
    // 去登录
    toLogin () {
      wx.navigateTo({
        url: '/pages/login/main'
      })
    },
    toPage (str) {
      if (this.logined) {
        if (str === 'device') {
          wx.navigateTo({
            url: '/pages/myDevice/main'
          })
        } else if (str === 'area') {
          wx.navigateTo({
            url: '/pages/myArea/main'
          })
        }
      } else {
        wx.navigateTo({
          url: '/pages/login/main'
        })
      }
    },
    getUserData () {
      info()
        .then(res => {
          if (res.code === 200) {
            this.userInfor = res.data
          }
        })
    },
    toStopBroadcast () { // 紧急停止
      toUrgentStopPlay()
        .then(res => {
          if (res.code === 200) {
            wx.showToast({
              title: res.message || res.msg,
              icon: 'none',
              duration: 2500
            })
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
button::after {
  border: none
}
.add-item {
  margin: 50rpx 0;
  padding: 0 40rpx;
  button {
    color: #F56C6C;
    background: none;
    border: none
  }
  .logout {
    background: #f5b619;
    color: #ffffff
  }
}
.my-container {
  background: #ffffff;
  height: 100vh;
  .my-box {
    padding: 40rpx;
    .my-box-top {
      padding: 50rpx 0;
      // background: #ffffff;
      border-radius: 10rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      image {
        width: 140rpx;
      }
      .infor-box {
        margin-top: 40rpx;
        font-size: 36rpx;
        color: #425062
      }
      .login-btn {
        margin-top: 40rpx;
        font-size: 32rpx;
        color: #ffffff;
        padding: 10rpx 20rpx;
        border-radius: 10rpx;
        background: #479CFD
      }
    }
  }
  .list-box {
    // border-top: 1px solid #cdcdcd;
    // margin-top: 40rpx;
    padding: 0 40rpx;
    .list-item {
      padding: 30rpx 40rpx;
      background: #f2f2f2;
      border-radius: 14rpx;
      // border-bottom: 1px solid #cdcdcd;
      margin-bottom: 26rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .item-left {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        image {
          width: 40rpx
        }
        .item-left-right {
          margin-left: 30rpx;
          font-size: 32rpx;
          color: #425062
        }
      }
      .item-right {
        image {
          width: 14rpx
        }
      }
    }
  }
}
</style>
