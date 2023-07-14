<template>
  <div class="cart">
    <div class="notice" v-if="defaultShow" :style="{height: clientHeight + 'rpx'}">
      <image src="/static/icon/developing.png" style="width: 300rpx" mode="widthFix"/>
      <div class="tip">正在开发中...</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import {
// enquiryOrder,
// queryOrderByStatus,
// confirmReceipt
} from '@/utils/getData'
export default {
  name: 'cart',
  data () {
    return {
      qx: false,
      turn: true,
      selectAll: true,
      show: false,
      defaultShow: true,
      clientHeight: 0,
      status: '',
      bottomPullText: '上拉刷新',
      bottomDropText: '释放更新',
      selected: '',
      orderid: '',
      totalPrice: 0,
      jiaoyicardlist: [],
      stetusShow: ['待付款', '待发货', '已发货', '已完成', '已关闭', '无效订单'],
      detailData: {
        calcAmount: {
          payAmount: ''
        }
      },
      tabList: [
        {name: '全部', value: ''},
        {name: '待付款', value: 0},
        {name: '待发货', value: 1},
        {name: '已发货', value: 2},
        {name: '已完成', value: 3}
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
      }
    }
  },
  beforeMount () {
    wx.setNavigationBarTitle({title: '智能备课'})
    wx.getSystemInfo({
      success: (res) => {
        let rpxR = res.windowHeight / res.windowWidth
        this.clientHeight = 750 * rpxR
      }
    })
    // this.getShopCarList()
  },
  methods: {
    ...mapMutations([]),
    toCollectMoney (index) {
      this.changeOrderSn(this.goodList[index].order_sn)
      wx.navigateTo({
        url: '/pages/collectMoney/main'
      })
    },
    toOrderDetail (index) {
      this.changeOrderId(this.goodList[index].id)
      this.changeOrderSn(this.goodList[index].order_sn)
      // this.$router.push({name: 'orderDetail'})
    },
    changeStatus (value) {
      this.status = value
      this.bottomPullText = '上拉刷新'
      this.bottomDropText = '释放更新'
      this.goodList = []
      if (value === '') {
        this.allForm.pageNum = 1
        this.getShopCarList()
      } else {
        this.statusForm.pageNum = 1
        this.statusForm.status = value
        this.getShopCarListByStatus()
      }
    },
    getShopCarList () {
      // enquiryOrder(this.allForm)
      //   .then(res => {
      //     if (res.code === 200) {
      //       if (res.data.list.length > 0) {
      //         this.goodList = res.data.list
      //         this.defaultShow = false
      //       } else {
      //         this.defaultShow = true
      //       }
      //     }
      //   })
    },
    getShopCarListByStatus () {
      // queryOrderByStatus(this.statusForm)
      //   .then(res => {
      //     if (res.code === 200) {
      //       if (res.data.list.length > 0) {
      //         this.goodList = res.data.list
      //         this.defaultShow = false
      //       } else {
      //         this.defaultShow = true
      //       }
      //     }
      //   })
    },
    comfirmReceive (index) {
      // confirmReceipt({orderSn: this.goodList[index].order_sn})
      //   .then(res => {
      //     if (res.code === 200) {
      //       this.defaultShow = false
      //       this.goodList = []
      //       if (this.status === '') {
      //         this.getShopCarList()
      //       } else {
      //         this.getShopCarListByStatus(this.status)
      //       }
      //     }
      //   })
    },
    toExpressPage (index) {
      this.changeOrderSn(this.goodList[index].order_sn)
      // this.$router.push('/expressInfor')
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
</style>
