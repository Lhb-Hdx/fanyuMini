<template>
  <div class="my-container">
    <div class="my-box">
      <div class="bg-picture">
        <image src="/static/icon/bg-2.png"></image>
      </div>
      <div class="nameBox">
        <div class="my-picture">
          <image src="/static/icon/logo-xiaoyu.png" mode="widthFix" />
        </div>
        <div class="my-name">
          {{ userInfor.username }}
        </div>
      </div>

    </div>
    <div class="list-box">
      <div class="list-item" @click="toPage('device')">
        <div class="item-left">
          <image src="/static/icon/device-management.png" mode="widthFix" />
          <div class="item-left-right">设备管理</div>
        </div>
        <div class="item-right">
          <image src="/static/icon/jiantou.png" mode="widthFix" />
        </div>
      </div>
      <div class="list-item" @click="toPage('area')">
        <div class="item-left">
          <image src="/static/icon/regional-management.png" mode="widthFix" />
          <div class="item-left-right">区域管理</div>
        </div>
        <div class="item-right">
          <image src="/static/icon/jiantou.png" mode="widthFix" />
        </div>
      </div>
      <div class="list-item">
        <div class="item-left">
          <image src="/static/icon/user-group.png" mode="widthFix" />
          <div class="item-left-right">用户组</div>
        </div>
        <div class="item-right">
          <image src="/static/icon/jiantou.png" mode="widthFix" />
        </div>
      </div>
      <div class="list-item">
        <div class="item-left">
          <image src="/static/icon/user-management.png" mode="widthFix" />
          <div class="item-left-right">用户管理</div>
        </div>
        <div class="item-right">
          <image src="/static/icon/jiantou.png" mode="widthFix" />
        </div>
      </div>
    </div>
    <!-- <div class="add-item">
      <button @click="toStopBroadcast">紧急停止</button>
    </div> -->
    <div class="add-item" v-if="logined">
      <button class="logout" @click="toLogout" style="padding-top: 4rpx;">账号登出</button>
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
    wx.setNavigationBarTitle({ title: '个人中心' })
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
  margin-top: 160rpx;
  padding: 0 40rpx;

  button {
    color: #F56C6C;
    background: none;
    border: none
  }

  .logout {
    height: 88rpx;
    background: #f5b619;
    font-size: 30rpx;
    font-weight: 500;
    color: #FFFFFF;
  }
}

.my-container {
  background: #ffffff;
  height: 100vh;

  .my-box {
    width: 100%;
    height: 180rpx;
    // padding: 40rpx 0 0 40rpx;
    display: flex;
    align-items: center;

    .bg-picture {
      // z-index: -1;
      width: 100%;
      height: 180rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .nameBox {
      position: fixed;
      display: flex;
      align-items: center;
      margin-left: 50rpx;

      .my-picture {
        background-color: #fff;
        width: 120rpx;
        height: 120rpx;
        border-radius: 60rpx;
        margin-right: 20rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        image {
          width: 50%;
          height: 50%;
        }
      }

      .my-name {
        font-size: 32rpx;
        font-weight: bold;
        color: #FFFFFF;
      }
    }


  }

  .list-box {
    padding: 0 40rpx;

    .list-item {
      padding: 30rpx 0rpx;
      background: #fff;
      border-bottom: 1px solid #eee;
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
          color: #425062;
          font-weight: 500;
        }
      }

      .item-right {
        image {
          width: 12rpx;
          height: 18rpx;
        }
      }
    }
  }
}
</style>
