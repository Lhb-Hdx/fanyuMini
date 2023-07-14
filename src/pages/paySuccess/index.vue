<template>
  <div class="cash-box">
    <div class="main-box-two">
      <image src="/static/icon/stockSuccess.png" v-if="payStatus" style="width: 200rpx" mode="widthFix"/>
      <image src="/static/icon/stockFailed.png" v-else style="width: 200rpx" mode="widthFix"/>
      <div class="tip" v-if="payStatus">支付成功</div>
      <div class="tip" v-else>支付失败</div>
    </div>
    <div class="submit-box">
      <div class="register-box">
        <div class="botton-box">
          <button type="default" @click="toMyorder" class="register">查看订单</button>
          <button type="default" @click="toHome" class="wx-button-order">返回首页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'takeCash',
  data () {
    return {
    }
  },
  computed: {
    ...mapState([])
  },
  beforeMount () {
    wx.setNavigationBarTitle({title: '支付结果'})
  },
  components: {
  },
  methods: {
    toMyorder () {
      wx.redirectTo({
        url: '/pages/order/main'
      })
    },
    toHome () {
      wx.switchTab({
        url: '/pages/index/main'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.wx-button-order {
  background: #FF7E7B;
  color: #ffffff;
}
.cash-box {
  margin: 1.28rem 0;
  .main-box-two {
    background: #ffffff;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .tip {
      color: #7C7C7C;
      text-align: center;
      font-size: 0.4rem;
      margin-top: 0.37rem;
    }
  }
  .submit-box {
    padding: 0 0.3rem;
    margin-top: 0.67rem;
    .register-box {
      //margin-top: 20%;
      .botton-box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
      .register {
        //margin-top: 0.5rem;
        background: none;
        border: 1px solid #FF7E7B;
        color: #FF7E7B
      }
    }
  }
}
</style>
