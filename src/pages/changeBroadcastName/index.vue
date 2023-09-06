<template>
  <div class="text-container">
    <div class="add-text-broadcast">
      <div class="container">
        <div class="input-box">
          <textarea placeholder="请输入广播名称" v-model="broadcastName" />
        </div>
        <div class="submit-box">
          <button @click="compaly">保 存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      broadcastName: ''
    }
  },
  computed: {
    ...mapState(['broadcastName'])
  },
  beforeMount () {
    wx.setNavigationBarTitle({ title: '添加名称' })
  },
  onUnload () {
    this.broadcastName = ''
  },
  methods: {
    ...mapMutations(['changeBroadcastName']),
    compaly () {
      if (this.broadcastName === '') {
        wx.showToast({
          title: '请输入内容',
          icon: 'none',
          duration: 2500
        })
      } else {
        this.changeBroadcastName(this.broadcastName)
        wx.navigateBack()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.submit-box {
  position: fixed;
  bottom: 43rpx;
  margin-left: 65rpx;

  button {
    background: #f5b619;
    border: none;
    width: 620rpx;
    height: 88rpx;
    font-size: 30rpx;
    font-weight: 500;
    color: #FFFFFF;
  }
}

.text-container {
  .add-text-broadcast {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    overflow-y: scroll;
    background-color: #F5F8FF;

    .container {
      height: 100%;

      .input-box {
        height: 330rpx;
        margin-top: 20rpx;
        padding: 0 20rpx;
        background-color: #fff;
      }

      textarea {
        height: 30%;
        padding: 30rpx 30rpx;
        background: #fff;
        font-size: 28rpx;
        width: auto;
      }
    }
  }
}
</style>
