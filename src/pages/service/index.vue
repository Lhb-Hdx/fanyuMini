<template>
  <div class="my">
    <button open-type="contact">进入客服会话</button>
  </div>
</template>

<script>
// import card from '@/components/card'
// import carousel from '@/components/carousel'
// import VueMoment from 'vue-moment'

export default {
  data () {
    return {
      date: new Date(),
      tags: ['爱情', '纯情', '旅行的意义'],
      text: '这是一首写给爱人的歌，是爱人给了他积极向上的勇气,从低谷中奋起从低谷中奋起从低谷中奋起从低谷中奋起...',
      list: 10,
      select: 0,
      heartCount: 110,
      comment: 222,
      navData: [
        {
          name: '音乐订单',
          src: '/static/icon/order.png'
        },
        {
          name: '我喜欢的',
          src: '/static/icon/collect.png'
        },
        {
          name: '我的消息',
          src: '/static/icon/news.png'
        },
        {
          name: '火喵客服',
          src: '/static/icon/service.png'
        }
      ]
    }
  },

  components: {
    // carousel
  },

  beforeMount () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
    wx.setNavigationBarTitle({title: '火喵客服'})
  },

  computed: {
    formatterDateMonthAndYear () {
      return this.$moment(this.date).format('MMM.YYYY')
    },
    formatterDateDay () {
      return this.$moment(this.date).format('DD')
    }
  },

  watch: {
    select (val) {
      let date = new Date()
      this.date = this.$moment(date).subtract(val, 'days')
    }
  },

  methods: {
    toDateShow () {
      const url = '../dateShow/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    scrollHandler (e) {
      console.log(e)
      const itemWidth = e.mp.detail.scrollWidth / this.list // 每个item的宽度
      const scrollLeft = e.mp.detail.scrollLeft + 20 // 滚动宽度
      this.select = Math.round(scrollLeft / itemWidth) // 通过Math.round方法对滚动大于一半的位置进行进位
    }
  }
}
</script>

<style scoped lang="less">
.my {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 160rpx;

  .left {
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: column;
    padding-left: 80rpx;
    width: 50%;

    .name {
      margin-top: 20px
    }
    
    .nav-list {
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin-top: 44px;

      .icon {
        margin-right: 10px
      }


    }

    .head {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      overflow: hidden;
    }
  }

  .right {
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: column;
    width: 50%;
  }
}
</style>
