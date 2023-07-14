<template>
  <div class="code-container">
    <swiper
      :indicator-dots="true"
      indicator-active-color="#FF7E7B"
      :autoplay="false"
      :interval="5000"
      :duration="500"
      style="width: 100%; height: 90vh">
      <block v-for="(item, indx) in imgList" :key="indx">
        <swiper-item class="swp-item">
          <div class="container" @click="toSave(indx)">
            <image :src="item.pic" style="height: 100%" mode="heightFix"/>
            <canvas style="width: 160rpx; height: 160rpx;" :canvas-id="'myQrcode' + indx" class="my-qrcode"></canvas>
          </div>
        </swiper-item>
      </block>
    </swiper>
    <div class="text">点击海报保存至相册</div>
  </div>
</template>

<script>
// import drawQrcode from 'weapp-qrcode'
import { mapState } from 'vuex'
import {
// sharePosterRead,
// compositePoster
} from '@/utils/getData'
export default {
  data () {
    return {
      imgList: [],
      form: {
        pageSize: 10,
        pageNum: 1
      },
      creatForm: {
        backgroundUrl: '',
        qrCodeUrl: ''
      },
      saveUrl: ''
    }
  },
  beforeMount () {
    wx.setNavigationBarTitle({title: '我的二维码'})
  },
  mounted () {
  },
  computed: {
    ...mapState(['userSystemInfo'])
  },
  onShow () {
    this.getData()
  },
  methods: {
    getData () {
      // sharePosterRead(this.form)
      //   .then(res => {
      //     if (res.code === 200 && res.data.list.length > 0) {
      //       this.imgList = res.data.list
      //       this.imgList.forEach((item, index) => {
      //         drawQrcode({
      //           width: '80',
      //           height: '80',
      //           canvasId: 'myQrcode' + index,
      //           text: `https://mall.beeba.cn/share/?invitationCode=${this.userSystemInfo.inviteCode}#/`,
      //           image: {
      //             imageResource: '/static/icon/logo.png',
      //             dx: 30,
      //             dy: 30,
      //             dWidth: 20,
      //             dHeight: 20
      //           }
      //         })
      //       })
      //     }
      //   })
    },
    toSave (indx) {
      // let _this = this
      wx.showLoading({
        title: '海报合成中'
      })
      this.creatForm.qrCodeUrl = `https://mall.beeba.cn/share/?invitationCode=${this.userSystemInfo.inviteCode}#/`
      this.creatForm.backgroundUrl = this.imgList[indx].pic
      // compositePoster(this.creatForm)
      //   .then(res => {
      //     if (res.code === 200) {
      //       _this.saveUrl = res.data.split('?Expires')[0]
      //       wx.hideLoading()
      //       wx.getSetting({
      //         success: res => {
      //           if (!res.authSetting['scope.writePhotosAlbum']) {
      //             wx.authorize({
      //               scope: 'scope.writePhotosAlbum',
      //               success: () => {
      //                 // 用户已经同意小程序使用保存图片
      //                 wx.getImageInfo({
      //                   src: _this.saveUrl,
      //                   success: wxres => {
      //                     wx.saveImageToPhotosAlbum({
      //                       filePath: wxres.path,
      //                       success: () => {
      //                         wx.showToast({
      //                           title: '海报已经成功保存至相册',
      //                           icon: 'none',
      //                           duration: 3500
      //                         })
      //                       }
      //                     })
      //                   },
      //                   fail: err => {
      //                     wx.showToast({
      //                       title: err.errMsg,
      //                       icon: 'none',
      //                       duration: 5000
      //                     })
      //                   }
      //                 })
      //               }
      //             })
      //           } else {
      //             wx.getImageInfo({
      //               src: _this.saveUrl,
      //               success: wxres => {
      //                 wx.saveImageToPhotosAlbum({
      //                   filePath: wxres.path,
      //                   success: () => {
      //                     wx.showToast({
      //                       title: '海报已经成功保存至相册',
      //                       icon: 'none',
      //                       duration: 3500
      //                     })
      //                   },
      //                   fail: err => {
      //                     wx.showToast({
      //                       title: err.errMsg,
      //                       icon: 'none',
      //                       duration: 5000
      //                     })
      //                   }
      //                 })
      //               },
      //               fail: err => {
      //                 wx.showToast({
      //                   title: err.errMsg,
      //                   icon: 'none',
      //                   duration: 5000
      //                 })
      //               }
      //             })
      //           }
      //         }
      //       })
      //     }
      //   })
    }
  }
}
</script>

<style scoped lang="less">
.swp-item {
  text-align: center;
}
.container {
  height: 100%;
  display: inline-block;
  position: relative;
}
.my-qrcode {
  position: absolute;
  bottom: 70rpx;
  right: 48rpx;
}
.text {
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
