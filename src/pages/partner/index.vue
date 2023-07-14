<template>
<div class="partner-box">
  <div v-for="(item, index) of todos" :key="index">
    <div class="partner-video-item" v-if="item.materialType === 2" @click="toPage(item.content)">
      <div class="video-item-top">
        <div class="title">{{ item.title }}</div>
        <div class="time">{{ item.createTime }}</div>
        <div class="introduce">{{ item.content }}</div>
      </div>
      <div class="download-box">
      </div>
    </div>
    <div class="partner-video-item" v-if="item.materialType === 1">
      <div class="video-item-top">
        <div class="title">{{ item.title }}</div>
        <div class="time">{{ item.createTime }}</div>
        <div class="introduce"><text :user-select="true" :decode="true">{{ item.content }}</text></div>
      </div>
      <div class="video-item-bottom">
        <video
          class="myvideo"
          object-fit="cover"
          poster=""
          :src="item.pics"
        ></video>
      </div>
      <div class="download-box">
        <div class="download" @click="toSaveVideo(item.pics)">
          <image src="/static/icon/downLoadicon.png" style="width: 50rpx" mode="widthFix"/>
        </div>
      </div>
    </div>
    <div class="partner-photo-item" v-else-if="item.materialType === 0">
      <div class="photo-item-top">
        <div class="title">{{ item.title }}</div>
        <div class="time">{{ item.createTime }}</div>
        <div class="introduce"><text :user-select="true" :decode="true">{{ item.content }}</text></div>
      </div>
      <div class="photo-item-bottom" @click="toSaveImg(item.pics)">
        <div class="item-box" v-for="(items, indx) of item.pics" :key="indx">
          <image :src="items" mode="scaleToFill"></image>
        </div>
      </div>
      <div class="tip-box">
        点击图片长按可保存
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
// materialGallery
} from '@/utils/getData'
// import { formatTime } from '@/utils'
export default {
  data () {
    return {
      todos: [],
      form: {
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  onReachBottom () {
    console.log(1)
  },
  onShow () {
    this.getRecommendProduct()
  },
  beforeMount () {
    wx.setNavigationBarTitle({title: '比巴伙伴'})
  },
  methods: {
    toPage (url) {
      wx.navigateTo({
        url: `../outPage/main?src=${url}`
      })
    },
    toSaveVideo (videoUrl) {
      wx.showLoading({
        title: '视频保存中'
      })
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success: () => {
                // 用户已经同意小程序使用保存图片
                wx.downloadFile({
                  url: videoUrl,
                  success: wxres => {
                    wx.saveVideoToPhotosAlbum({
                      filePath: wxres.tempFilePath,
                      success: () => {
                        wx.hideLoading()
                        wx.showToast({
                          title: '视频已经成功保存至相册',
                          icon: 'none',
                          duration: 3500
                        })
                      },
                      fail: err => {
                        wx.hideLoading()
                        wx.showToast({
                          title: err.errMsg,
                          icon: 'none',
                          duration: 5000
                        })
                      }
                    })
                  },
                  fail: err => {
                    wx.hideLoading()
                    wx.showToast({
                      title: err.errMsg,
                      icon: 'none',
                      duration: 5000
                    })
                  }
                })
              }
            })
          } else {
            wx.downloadFile({
              url: videoUrl,
              success: wxres => {
                console.log(wxres)
                wx.saveVideoToPhotosAlbum({
                  filePath: wxres.tempFilePath,
                  success: () => {
                    wx.hideLoading()
                    wx.showToast({
                      title: '视频已经成功保存至相册',
                      icon: 'none',
                      duration: 3500
                    })
                  },
                  fail: err => {
                    wx.hideLoading()
                    wx.showToast({
                      title: err.errMsg,
                      icon: 'none',
                      duration: 5000
                    })
                  }
                })
              },
              fail: err => {
                wx.hideLoading()
                wx.showToast({
                  title: err.errMsg,
                  icon: 'none',
                  duration: 5000
                })
              }
            })
          }
        }
      })
    },
    toSaveImg (picArray) {
      wx.previewImage({
        current: picArray[0], // 当前显示图片的http链接
        urls: picArray // 需要预览的图片http链接列表
      })
    },
    getRecommendProduct () {
      // materialGallery(this.form)
      //   .then(res => {
      //     if (res.code === 200) {
      //       if (res.data.list.length > 0) {
      //         this.todos = res.data.list
      //         for (let n of this.todos) {
      //           n.createTime = formatTime(n.createTime)
      //         }
      //         this.loading = false
      //         for (let n of this.todos) {
      //           if (n.materialType === 0 || n.materialType === 2) {
      //             n.pics = n.pics.split(';')
      //           }
      //         }
      //       }
      //     }
      //   })
    }
  }
}
</script>

<style scoped lang="less">
.partner-box {
  padding: 0 30rpx;
  .partner-video-item {
    padding-top: 40rpx;
    border-bottom: 1px solid #dbdbdb;
    .video-item-top {
      .title {
        font-size: 36rpx;
        color: #2c2c2c;
      }
      .time {
        font-size: 30rpx;
        color: #8a8a8a;
        margin-top: 10rpx;
      }
      .introduce {
        font-size: 30rpx;
        color: #515151;
        margin: 20rpx 0;
      }
    }
    .video-item-bottom {
      // border-radius: 20rpx;
      // overflow: hidden;
      .myvideo {
        border-radius: 20rpx;
        width: 100%;
      }
    }
    .download-box {
      padding: 30rpx 0;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      .download {
        width: 20%;
        padding: 0 30rpx;
        text-align: right
      }
    }
  }
  .partner-photo-item {
    padding-top: 40rpx;
    border-bottom: 1px solid #dbdbdb;
    .photo-item-top {
      .title {
        font-size: 36rpx;
        color: #2c2c2c;
      }
      .time {
        font-size: 30rpx;
        color: #8a8a8a;
        margin-top: 10rpx;
      }
      .introduce {
        font-size: 30rpx;
        color: #515151;
        margin: 20rpx 0;
      }
    }
    .photo-item-bottom {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      .item-box {
        width: 33.3%;
        height: 220rpx;
        overflow: hidden;
        margin-bottom: 16rpx;
        text-align: center;
        image {
          width: 94%
        }
      }
    }
    .tip-box {
      text-align: center;
      font-size: 30rpx;
      color: #515151;
      padding: 30rpx 0;
    }
  }
}
</style>
