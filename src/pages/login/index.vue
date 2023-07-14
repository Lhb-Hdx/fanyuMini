<template>
  <div class="login-container">
    <cart-header title="用户登录"></cart-header>
    <div class="img-box">
      <image src="/static/icon/logo-xiaoyu.png" mode="widthFix"></image>
    </div>
    <div class="form-box">
      <div class="code-box code-box-two">
        <div class="phone-type">+86</div>
        <input placeholder="请输入手机号" v-model="passwordForm.username" type="tel" v-if="loginType === 'password'">
        <input placeholder="请输入手机号" v-model="form.mobileNo" type="tel" v-else>
      </div>
      <div class="code-box" v-if="loginType !== 'message'">
        <div class="code-left">
          <input placeholder="请输入密码" v-model="passwordForm.password" type="password" v-if="loginType === 'password'">
          <input placeholder="请输入密码" v-model="form.password" type="password" v-else-if="loginType === 'passwordmessage'">
        </div>
      </div>
      <div class="code-box" v-if="loginType !== 'password'">
        <div class="code-left-two">
          <input placeholder="请输入验证码" v-model="form.verifyCode" type="tel" @input="inputauthcode">
        </div>
        <div class="code-right">
          <button class="code-button" type="default" @click="getCode('code')" :disabled="disabled">{{ text }}</button>
        </div>
      </div>
      <div class="voice-message">
        <div class="select-type" @click="changeLoginType('password')"
          v-if="loginType === 'passwordmessage' || loginType === 'message'">用密码登录</div>
        <div class="select-type" @click="changeLoginType('passwordmessage')"
          v-if="loginType === 'password' || loginType === 'message'">用密码&验证码登录</div>
        <div class="select-type" @click="changeLoginType('message')"
          v-if="loginType === 'password' || loginType === 'passwordmessage'">用验证码登录</div>
        <!-- <button v-show="loginType === 'message'" class="voice" type="default" @click="getCode('voiceCode')" :disabled="disabled">{{ voiceText }}</button> -->
      </div>
    </div>
    <div class="submit-box">
      <button class="login-button" @click="toLogin" :disabled="loginDisbaled">登录</button>
      <div class="contro-box">
      </div>
      <!-- <div class="register-box">
        <button class="register" type="default" @click="toRegister">注册</button>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import {
  login,
  getVerifyCode,
  passwordMobileLogin,
  mobileLogin
  // getAuthCode,
  // getAuthCodeVoice,
  // determineRegistered,
  // personinfo
} from '@/utils/getData'
export default {
  name: 'login',
  data () {
    return {
      timeInterval: null,
      remember: false,
      loginType: wx.getStorageSync('loginType') ? wx.getStorageSync('loginType') : 'password',
      text: '获取验证码',
      voiceText: '获取语音验证码',
      time: 60,
      clicked: true,
      password: '', // 储存原始密码，提交失败后将加密之后的密码进行还原
      form: {
        mobileNo: '',
        verifyCode: '',
        password: ''
      },
      passwordForm: {
        username: '',
        password: ''
      }
    }
  },
  components: {
  },
  computed: {
    disabled: {
      get () {
        if (this.form.mobileNo.length !== 11 || this.text !== '获取验证码' || this.voiceText !== '获取语音验证码') {
          return true
        } else {
          return false
        }
      },
      set () { }
    },
    loginDisbaled () {
      if (this.loginType === 'passwordmessage') {
        if (this.form.mobileNo.length !== 11 || this.form.verifyCode === '' || this.form.password === '') {
          return true
        } else {
          return false
        }
      } else if (this.loginType === 'password') {
        if (this.passwordForm.username === '' || this.passwordForm.password === '') {
          return true
        } else {
          return false
        }
      } else {
        if (this.form.mobileNo.length !== 11 || this.form.verifyCode === '') {
          return true
        } else {
          return false
        }
      }
    }
  },
  onUnload () {
    this.form = {
      mobileNo: '',
      verifyCode: ''
    }
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  beforeMount () {
    wx.setNavigationBarTitle({ title: '登录' })
  },
  methods: {
    ...mapMutations(['changeSystemUserInfo']),
    changeLoginType (str) {
      this.loginType = str
      wx.setStorageSync('loginType', this.loginType)
    },
    inputauthcode () {
      if (this.form.verifyCode.length > 4) {
        // this.form.verifyCode = this.form.verifyCode.slice(0, 4)
      }
    },
    getInfor () {
      // personinfo()
      //   .then(res => {
      //     if (res.code === 200) {
      //       this.changeSystemUserInfo(res.data)
      //       wx.setStorage({
      //         key: 'login',
      //         data: 1,
      //         success: () => {
      //           wx.reLaunch({
      //             url: '../index/main'
      //           })
      //         }
      //       })
      //     }
      //   })
    },
    queryRegisterStatus (str) {
      this.timeInterval = setInterval(() => {
        if (this.time > 0) {
          this.time--
          if (str === 'code') {
            this.text = this.time + 's'
          } else if (str === 'voiceCode') {
            this.voiceText = this.time + 's'
          }
        } else {
          this.time = 60
          this.text = '获取验证码'
          this.voiceText = '获取语音验证码'
          clearInterval(this.timeInterval)
        }
      }, 1000)
      if (str === 'code') {
        getVerifyCode({ phone: this.form.mobileNo, type: 2 })
          .then(res => {
            if (res.code === 200) {
              // this.form.verifyCode = res.data
            } else {
              this.time = 60
              this.text = '获取验证码'
              clearInterval(this.timeInterval)
            }
          })
          .catch(() => {
            this.time = 60
            this.text = '获取验证码'
            clearInterval(this.timeInterval)
          })
      } else if (str === 'voiceCode') {
        // getAuthCodeVoice({telephone: this.form.mobileNo, type: 2})
        //   .then(res => {
        //     if (res.code === 200) {
        //       // this.form.verifyCode = res.data
        //     } else {
        //       this.time = 60
        //       this.voiceText = '获取语音验证码'
        //       clearInterval(this.timeInterval)
        //     }
        //   })
        //   .catch(() => {
        //     this.time = 60
        //     this.voiceText = '获取语音验证码'
        //     clearInterval(this.timeInterval)
        //   })
      }
      // determineRegistered({phone: this.form.mobileNo})
      //   .then(res => {
      //     if (res.code === 505) {
      //       this.timeInterval = setInterval(() => {
      //         if (this.time > 0) {
      //           this.time--
      //           if (str === 'code') {
      //             this.text = this.time + 's'
      //           } else if (str === 'voiceCode') {
      //             this.voiceText = this.time + 's'
      //           }
      //         } else {
      //           this.time = 60
      //           this.text = '获取验证码'
      //           this.voiceText = '获取语音验证码'
      //           clearInterval(this.timeInterval)
      //         }
      //       }, 1000)
      //       if (str === 'code') {
      //         getAuthCode({telephone: this.form.mobileNo, type: 2})
      //           .then(res => {
      //             if (res.code === 200) {
      //               // this.form.verifyCode = res.data
      //             } else {
      //               this.time = 60
      //               this.text = '获取验证码'
      //               clearInterval(this.timeInterval)
      //             }
      //           })
      //           .catch(() => {
      //             this.time = 60
      //             this.text = '获取验证码'
      //             clearInterval(this.timeInterval)
      //           })
      //       } else if (str === 'voiceCode') {
      //         getAuthCodeVoice({telephone: this.form.mobileNo, type: 2})
      //           .then(res => {
      //             if (res.code === 200) {
      //               // this.form.verifyCode = res.data
      //             } else {
      //               this.time = 60
      //               this.voiceText = '获取语音验证码'
      //               clearInterval(this.timeInterval)
      //             }
      //           })
      //           .catch(() => {
      //             this.time = 60
      //             this.voiceText = '获取语音验证码'
      //             clearInterval(this.timeInterval)
      //           })
      //       }
      //     } else if (res.code === 200) {
      //       wx.showToast({
      //         title: res.data,
      //         icon: 'none',
      //         duration: 2000
      //       })
      //       setTimeout(() => {
      //         wx.navigateTo({
      //           url: '/pages/register/main'
      //         })
      //       }, 2000)
      //     }
      //   })
    },
    getCode (str) {
      this.queryRegisterStatus(str)
    },
    toLogin () {
      if (this.loginType === 'password') {
        login(this.passwordForm)
          .then(res => {
            if (res.code === 200) {
              wx.setStorage({
                key: 'Authorization',
                data: res.data.tokenHead + res.data.token,
                success: () => {
                  wx.setStorage({
                    key: 'login',
                    data: 1,
                    success: () => {
                      wx.reLaunch({
                        url: '../index/main'
                      })
                    }
                  })
                }
              })
            }
          })
          .catch(() => {
          })
      } else if (this.loginType === 'passwordmessage') {
        passwordMobileLogin(this.form)
          .then(res => {
            if (res.code === 200) {
              wx.setStorage({
                key: 'Authorization',
                data: res.data.tokenHead + res.data.token,
                success: () => {
                  wx.setStorage({
                    key: 'login',
                    data: 1,
                    success: () => {
                      wx.reLaunch({
                        url: '../index/main'
                      })
                    }
                  })
                }
              })
            }
          })
          .catch(() => {
          })
      } else {
        mobileLogin(this.form)
          .then(res => {
            if (res.code === 200) {
              wx.setStorage({
                key: 'Authorization',
                data: res.data.tokenHead + res.data.token,
                success: () => {
                  wx.setStorage({
                    key: 'login',
                    data: 1,
                    success: () => {
                      wx.reLaunch({
                        url: '../index/main'
                      })
                    }
                  })
                }
              })
            }
          })
          .catch(() => {
          })
      }
    },
    toRegister () {
      wx.navigateTo({
        url: '../register/main'
      })
    }
  }
}
</script>

<style lang="less" scoped>
button::after {
  border: none
}

.login-button {
  background: #f5b619 !important;
  color: #ffffff !important
}

.login-container {
  background: #ffffff;
  width: 100vw;

  .img-box {
    width: 100%;
    // margin-top: 1.5rem;
    text-align: center;
    height: 340rpx;
    position: relative;
    background: #ffffff;

    image {
      width: 250rpx;
      margin-top: 60rpx;
    }
  }

  .img-box-two {
    width: 100%;
    padding: 0.8rem;
    text-align: left;

    img {
      height: 0.61rem;
      width: auto;
    }
  }

  .form-box {
    margin-top: 50rpx;
    padding: 0 40rpx;

    .code-box {
      // height: 1.41rem;
      padding: 0.35rem 0.43rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      //border-bottom: 1px solid #f0f0f0;
      background: #F9F9FB;
      margin-bottom: 0.4rem;
      border-radius: 0.27rem;
      overflow: hidden;

      input {
        font-size: 30rpx;
        border: none;
        caret-color: #F5C457;
        width: 100%;
        background: none;
        line-height: 1;
      }

      .code-left {
        width: 100%
      }

      .code-left-two {
        width: 60%
      }

      .code-right {
        // width: 2.4rem;
        border-left: 1px solid #BFBFC3;

        .code-button {
          background: none;
          border: none;
          border-radius: none;
          box-shadow: none;
          //border: 1px solid #E82C50;
          color: #1A559A;
          //height: 30px;
          font-size: 30rpx
        }

        .mint-button-text {
          font-size: 0.37rem
        }
      }
    }

    .code-box-two {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      .phone-type {
        color: #3E4155;
        font-size: 30rpx;
        margin-right: 0.4rem;
        font-weight: 550;
      }
    }

    .voice-message {
      // text-align: right;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .changePhone {
        color: #929292;
        padding: 0.2rem 0.2rem 0.2rem 0;
      }

      .select-type {
        padding: 0.2rem;
      }

      .voice {
        background: none;
        width: 3.2rem;
        border: none;
        padding: 0.2rem;
        border-radius: none;
        box-shadow: none;
        text-align: right;
        margin: 0;
        //border: 1px solid #E82C50;
        color: #FF7E7B;
        //height: 30px;
        font-size: 30rpx
      }
    }

    .clear {
      background: none;
      border: none;

      input {
        background: none;
        caret-color: #E82C50
      }
    }
  }

  .submit-box {
    padding: 0 40rpx;
    margin-top: 90rpx;

    .contro-box {
      margin-top: 90rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .contro-left {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        img {
          width: 0.43rem;
          height: auto;
          margin-right: 0.1rem;
        }

        div {
          font-size: 0.37rem;
          color: #646464
        }
      }
    }

    .register-box {
      .register {
        background: none;
        // border: 1px solid #E82C50;
        color: #1A559A;
        box-shadow: none
      }
    }
  }
}
</style>
