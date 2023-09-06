<template>
  <div class="cart">
    <div class="home-top">
      <scroll-view :scroll-x="true" class="can-scroll">
        <view class="can-scroll-item" v-for="(item, index) of tabList" :key="index" @click="changeStatus(item.value)">
          <view class="scroll-item-text" :class="{ 'init-font': item.value === status }">{{ item.name }}</view>
          <view :class="{ 'slider': item.value === status }"></view>
        </view>
      </scroll-view>
    </div>
    <div class="home-main">
      <div class="list-box" :style="{ height: clientHeight - 110 + 'rpx', overflow: 'scroll' }" v-if="!defaultShow">
        <div class="list-box-item" v-for="(item, index) of goodList" :key="index">
          <div class="box-right-container">
            <div class="right-container-left">
              <div class="right-container-top">
                <div class="title-box">
                  <div class="title">{{ item.taskName }}</div>
                </div>
              </div>
              <div class="right-container-bottom" v-if="status !== 3">
                <div class="bottom-item">时间: {{ item.taskTime }}</div>
              </div>
              <div class="right-container-bottom" v-if="status === 3">
                <div class="bottom-item">时间:{{ '手动' }}</div>
              </div>
            </div>
            <div class="operation">
              <div class="operation-box" @click="toControl(index, 0)">
                <div class="img-box">
                  <image src="/static/icon/play.png"></image>
                </div>
                <div class="operating-button">播放</div>
              </div>
              <div class="operation-box" @click="toControl(index, 1)">
                <div class="img-box">
                  <image src="/static/icon/suspend-2.png"></image>
                </div>
                <div class="operating-button">暂停</div>
              </div>
              <div class="operation-box" @click="toControl(index, 2)">
                <div class="img-box">
                  <image src="/static/icon/edit.png"></image>
                </div>
                <div class="operating-button">编辑</div>
              </div>
              <div class="operation-box" @click="toControl(index, 3)">
                <div class="img-box">
                  <image src="/static/icon/delete.png"></image>
                </div>
                <div class="operating-button">删除</div>
              </div>
            </div>
          </div>
        </div>
        <div class="fill"></div>
      </div>
      <div class="notice" v-if="defaultShow" :style="{ height: clientHeight - 110 + 'rpx' }">
        <image src="/static/icon/de-order.png" style="width: 200rpx" mode="widthFix" />
        <div class="tip">没有相关广播信息！</div>
      </div>
    </div>
    <div class="add-box" @click="toPage('add')">
      <image src="/static/icon/add.png"></image>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { loginCheck } from '@/utils/utils'
import {
  taskQuery,
  taskDelete,
  toPlayTask
} from '@/utils/getData'
export default {
  name: 'cart',
  data () {
    return {
      qx: false,
      turn: true,
      selectAll: true,
      show: false,
      defaultShow: false,
      clientHeight: 0,
      status: 1, // 任务的类型，单次1，循环2，手动3
      bottomPullText: '上拉刷新',
      bottomDropText: '释放更新',
      selected: '',
      orderid: '',
      totalPrice: 0,
      jiaoyicardlist: [],
      steps: [1, 2, 3, 4, 5, 6],
      stetusShow: ['单次预约', '循环广播'],
      detailData: {
        calcAmount: {
          payAmount: ''
        }
      },
      tabList: [
        { name: '单次任务', value: 1 },
        { name: '循环任务', value: 2 },
        { name: '手动任务', value: 3 }
      ],
      goodList: [],
      select: [],
      lstCartid: '',
      form: {
        ids: ''
      },
      allForm: {
        pageSize: 6,
        pageNum: 1
      },
      statusForm: {
        pageSize: 6,
        pageNum: 1,
        status: ''
      },
      playForm: {
        action: 'play',
        taskid: ''
      }
    }
  },
  onTabItemTap () {
    this.changeMusicList([])
    this.changeDeviceList([])
    this.changeAreaList([])
  },
  onShow () {
    wx.getStorage({
      key: 'login',
      success: () => {
        this.getList()
      }
    })
  },
  beforeMount () {
    loginCheck()
    wx.setNavigationBarTitle({ title: '任务列表' })
    wx.getSystemInfo({
      success: (res) => {
        let rpxR = res.windowHeight / res.windowWidth
        this.clientHeight = 750 * rpxR
      }
    })
  },
  onUnload () {
    this.playForm = {
      action: 'play',
      taskid: ''
    }
  },
  methods: {
    ...mapMutations(['changeMusicList', 'changeAreaList', 'changeDeviceList']),
    // 立即执行任务
    tolijiPlay (index) {
      this.playForm.taskid = this.goodList[index].id
      toPlayTask(this.playForm)
        .then(res => {
          if (res.code === 200) {
          }
        })
    },
    // 对单个任务执行不同的操作
    toControl (index, num) {
      if (num === 0) {
        this.playForm.action = 'play'
        this.tolijiPlay(index)
      } else if (num === 1) {
        this.playForm.action = 'stop'
        this.tolijiPlay(index)
      } else if (num === 2) {
        console.log(this.goodList[index]);
        wx.navigateTo({
          url: `/pages/addBroadcast/main?form=${JSON.stringify(this.goodList[index])}`
        })
      } else if (num === 3) {
        this.totaskDelete(this.goodList[index].id)
      }
    },
    // toControl (index) {
    // wx.showActionSheet({
    //   itemList: ['播放', '停止', '编辑', '删除'],
    //   success: res => {
    // if (res.tapIndex === 0) {
    //   this.playForm.action = 'play'
    //   this.tolijiPlay(index)
    // } else if (res.tapIndex === 1) {
    //   this.playForm.action = 'stop'
    //   this.tolijiPlay(index)
    // } else if (res.tapIndex === 2) {
    //   wx.navigateTo({
    //     url: `/pages/addBroadcast/main?form=${JSON.stringify(this.goodList[index])}`
    //   })
    // } else if (res.tapIndex === 3) {
    //   this.totaskDelete(this.goodList[index].id)
    // }
    // },
    // fail (res) {
    //   console.log(res.errMsg)
    // }
    // })
    // },
    // 任务类型切换
    changeStatus (value) {
      this.goodList = []
      this.status = value
      this.getList()
    },
    // 删除指定任务
    totaskDelete (id) {
      const that = this
      wx.showModal({
        title: '提示',
        content: '您确认要删除吗',
        success (res) {
          console.log(res);
          if (res.confirm) {
            taskDelete({ taskid: id })
              .then(res => {
                if (res.code === 200) {
                  that.getList()
                }
              })
          }
        }
      })
    },
    // 获取任务列表
    getList () {
      taskQuery({ type: this.status, pageSize: 100000, pageNum: 1 })
        .then(res => {
          if (res.code === 200) {
            if (res.data.list.length > 0) {
              this.goodList = res.data.list
              console.log(this.goodList);
              this.defaultShow = false
            } else {
              this.defaultShow = true
            }
          }
        })
    },
    // 去新增任务
    toPage (str) {
      if (str === 'add') {
        wx.navigateTo({
          url: `/pages/addBroadcast/main?addType=${this.status}`
        })
      } else {
        wx.navigateTo({
          url: '/pages/broadcastList/main'
        })
      }
    }
  },
  watch: {
    select (val) {
      this.select = val
    }
  }
}
</script>

<style lang="less" scoped>
.cart::before {
  content: "";
  display: table;
  background: #ffffff;
}

.home-top {
  background-color: #3c4253;
  height: 9vh;
  // position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .can-scroll {
    width: 100%;
    white-space: nowrap;

    .can-scroll-item {
      display: inline-block;
      width: 33%;
      text-align: center;
      position: relative;

      .scroll-item-text {
        width: 80%;
        color: rgb(176, 177, 182);
        background: #3c4253;
        font-size: 30rpx;
        display: inline-block;
        padding: 20rpx 0;
        border-radius: 10rpx;
        font-size: 32rpx;
        font-weight: bold;
      }

      .slider {
        width: 30rpx;
        border-radius: 4rpx;
        border: 4rpx solid orange;
        position: absolute;
        top: 90%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .init-font {
    background: #3c4253 !important;
    color: #ffffff !important;
  }
}

.home-main {
  -webkit-overflow-scrolling: touch;

  .fill {
    width: 100%;
    height: 150rpx;
  }

  .list-box {
    padding: 0 30rpx;
    background-color: #F5F8FF;

    .list-box-item {
      margin: 30rpx 0;
      border-bottom: 1px solid #efefef;

      .box-right-container {
        height: 150rpx;
        background: #ffffff;
        border-radius: 20rpx;
        padding: 25rpx;

        .right-container-left {
          border-bottom: 1px solid #EEEEEE;

          .right-container-top {

            .title {
              font-size: 30rpx;
              font-weight: 500;
              color: #333333;
              margin-bottom: 15rpx;
            }
          }

          .right-container-bottom {

            .bottom-item {
              font-size: 24rpx;
              font-weight: 500;
              color: #999999;
              margin-bottom: 15rpx;
            }
          }
        }

        .operation {
          display: flex;
          justify-content: flex-end;

          .operation-box {
            display: flex;
            justify-content: center;
            // align-items: center;
            line-height: 30rpx;
            padding: 20rpx 0;

            .img-box {
              margin: 0 10rpx 0 30rpx;
              width: 24rpx;
              height: 24rpx;

              image {
                width: 100%;
                height: 100%;
              }
            }

            .operating-button {
              font-size: 24rpx;
              font-weight: 500;
              color: #666666;
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

  .notice {
    text-align: center;

    image {
      padding-top: 30%;
    }

    .tip {
      margin-top: 0.3rem;
      font-size: 30rpx;
    }
  }
}

.add-box {
  position: fixed;
  bottom: 7%;
  right: 5%;
  width: 100rpx;
  height: 100rpx;

  image {
    width: 100%;
    height: 100%;
  }
}
</style>
