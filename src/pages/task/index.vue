<template>
  <div class="cart">
    <div class="home-top">
      <scroll-view :scroll-x="true" class="can-scroll">
        <view class="can-scroll-item" v-for="(item, index) of tabList" :key="index" @click="changeStatus(item.value)">
          <view class="scroll-item-text" :class="{'init-font': item.value === status}">{{item.name}}</view>
        </view>
      </scroll-view>
    </div>
    <div class="home-main">
      <div class="list-box" :style="{height: clientHeight - 110 + 'rpx', overflow: 'scroll'}" v-if="!defaultShow">
        <div class="list-box-item" v-for="(item, index) of goodList" :key="index">
          <div class="box-right-container">
            <div class="right-container-left">
              <div class="right-container-top">
                <div class="title-box">
                  <div class="fangkuai"></div>
                  <div class="title">{{ item.taskName }}</div>
                </div>
                <!-- <div class="control-box">
                  <image src="/static/icon/reducevoicetwo.png" mode="widthFix"/>
                  <div class="count">60%</div>
                  <image src="/static/icon/addvoicetwo.png" mode="widthFix"/>
                </div> -->
              </div>
              <div class="right-container-bottom" v-if="status !== 3">
                <div class="bottom-item">时间: {{ item.taskTime }}</div>
                <!-- <div class="bottom-item" v-else>时间: {{ item.taskTime }}</div>
                <div class="bottom-item">范围: {{ item.schId }}</div> -->
              </div>
            </div>
            <div class="right-container-right" @click="toControl(index)">
              <image src="/static/icon/sandian.png" mode="widthFix"/>
            </div>
          </div>
        </div>
      </div>
      <div class="notice" v-if="defaultShow" :style="{height: clientHeight - 110 + 'rpx'}">
        <image src="/static/icon/de-order.png" style="width: 200rpx" mode="widthFix"/>
        <div class="tip">没有相关广播信息！</div>
      </div>
    </div>
    <div class="add-box" @click="toPage('add')">+</div>
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
        {name: '单次任务', value: 1},
        {name: '循环任务', value: 2},
        {name: '手动任务', value: 3}
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
    wx.setNavigationBarTitle({title: '任务列表'})
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
    toControl (index) {
      wx.showActionSheet({
        itemList: ['播放', '停止', '编辑', '删除'],
        success: res => {
          if (res.tapIndex === 0) {
            this.playForm.action = 'play'
            this.tolijiPlay(index)
          } else if (res.tapIndex === 1) {
            this.playForm.action = 'stop'
            this.tolijiPlay(index)
          } else if (res.tapIndex === 2) {
            wx.navigateTo({
              url: `/pages/addBroadcast/main?form=${JSON.stringify(this.goodList[index])}`
            })
          } else if (res.tapIndex === 3) {
            this.totaskDelete(this.goodList[index].id)
          }
        },
        fail (res) {
          console.log(res.errMsg)
        }
      })
    },
    // 任务类型切换
    changeStatus (value) {
      this.goodList = []
      this.status = value
      this.getList()
    },
    // 删除指定任务
    totaskDelete (id) {
      taskDelete({taskid: id})
        .then(res => {
          if (res.code === 200) {
            this.getList()
          }
        })
    },
    // 获取任务列表
    getList () {
      taskQuery({type: this.status, pageSize: 100000, pageNum: 1})
        .then(res => {
          if (res.code === 200) {
            if (res.data.list.length > 0) {
              this.goodList = res.data.list
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
  background: #ffffff;
  height: 110rpx;
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
      .scroll-item-text {
        width: 80%;
        color: #2e3547;
        background: #efefef;
        font-size: 30rpx;
        // line-height: 100rpx;
        display: inline-block;
        padding: 20rpx 0;
        border-radius: 10rpx;
      }
    }
  }
  .init-font {
    background: #3c4253 !important;
    color: #ffffff !important;
  }
}
.home-main {
  // background: #F2F2F2;
  -webkit-overflow-scrolling: touch;
  .list-box {
    padding: 0 40rpx;
    .list-box-item {
      margin: 30rpx 0;
      border-bottom: 1px solid #efefef;
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
            .title-box {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              .fangkuai {
                width: 14rpx;
                height: 14rpx;
                background: #f5b619;
                margin-right: 10rpx;
              }
              .title {
                color: #f5b619;
                font-size: 34rpx;
              }
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
            margin-top: 15rpx;
            .bottom-item {
              // margin-top: 10rpx;
              color: #808080;
              font-size: 30rpx;
              overflow: hidden;
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
  bottom: 10%;
  right: 5%;
  background: #f5b619;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 40rpx;
  color: #ffffff;
}
</style>
