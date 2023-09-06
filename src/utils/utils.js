export const fetch = function (url = '', data = {}, method = 'POST', config = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json', // 默认值
        Authorization: config.nologin ? '' : wx.getStorageSync('Authorization')
      },
      success: function (res) {
        resolve(res.data)
        if (res.data.code !== 200 && res.data.code !== 505 && res.data.code !== 0) {
          wx.showToast({
            title: res.data.message || res.data.msg,
            icon: 'none',
            duration: 2500
          })
        }
        if (res.data.code === 401) {
          wx.clearStorageSync()
          wx.redirectTo({
            url: '/pages/login/main'
          })
        }
      },
      fail: function (err) {
        reject(err)
        wx.showToast({
          title: err.message,
          icon: 'none',
          duration: 2500
        })
      }
    })
  })
}

export const formatDate = (date) => {
  return date.split(' ', 1)
}

export const loginCheck = function () {
  if (!wx.getStorageSync('login')) {
    wx.redirectTo({
      url: '/pages/login/main'
    })
  }
}
