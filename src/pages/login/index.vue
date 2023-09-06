<template>
  <div class="login-container">
    <cart-header title="用户登录"></cart-header>
    <div class="img-box">
      <image src="/static/icon/logo-xiaoyu.png" mode="widthFix"></image>
    </div>
    <div class="form-box">
      <div class="code-box code-box-two">
        <!-- <div class="phone-type">+86</div> -->
        <span>
          <image class="img" src="/static/icon/phone-2.png"></image>
        </span>
        <input placeholder="请输入手机号" v-model="passwordForm.username" type="tel" v-if="loginType === 'password'">
        <input placeholder="请输入手机号" v-model="form.mobileNo" type="tel" v-else>
      </div>
      <div class="code-box" v-if="loginType !== 'message'">
        <div class="code-left flex-style">
          <span>
            <image class="img" src="/static/icon/password.png"></image>
          </span>
          <template v-if="loginType === 'password'">
            <input v-if="showPassword" placeholder="请输入密码" v-model="passwordForm.password" type="text">
            <input v-else placeholder="请输入密码" v-model="passwordForm.password" type="password">
          </template>
          <template v-else-if="loginType === 'passwordmessage'">
            <input v-if="showPassword" placeholder="请输入密码" v-model="form.password" type="text">
            <input v-else placeholder="请输入密码" v-model="form.password" type="password">
          </template>
          <span @click="togglePasswordVisibility">
            <image class="img" :src="showPassword ? visibleIconSrc : hiddenIconSrc">
            </image>
          </span>
        </div>
      </div>
      <div class="code-box" v-if="loginType !== 'password'">
        <div class="code-left-two flex-style">
          <span>
            <image class="img" src="/static/icon/password.png"></image>
          </span>
          <input placeholder="请输入验证码" v-model="form.verifyCode" type="tel" @input="inputauthcode">
        </div>
        <div class="code-right">
          <div class="code-button color-yellow" type="default" @click="getCode('code')" v-if="!disabled">{{ text }}</div>
          <div class="code-button color-gary" type="default" v-if="disabled && showCode">{{ text }}</div>
        </div>
      </div>

    </div>
    <div class="submit-box">
      <button style="padding-top: 4rpx;" :class="loginDisbaled ? 'unlogin-button' : 'login-button'" @click="toLogin"
        :disabled="loginDisbaled">登录</button>
      <div class="contro-box">
      </div>
      <!-- <div class="register-box">
        <button class="register" type="default" @click="toRegister">注册</button>
      </div> -->
    </div>
    <div class="voice-message">
      <div class="select-type" @click="changeLoginType('password')"
        v-if="loginType === 'passwordmessage' || loginType === 'message'">密码登录</div>
      <!-- <div class="select-type" @click="changeLoginType('passwordmessage')"
        v-if="loginType === 'password' || loginType === 'message'">用密码&验证码登录</div> -->
      <div class="select-type" @click="changeLoginType('message')"
        v-if="loginType === 'password' || loginType === 'passwordmessage'">验证码登录</div>
      <!-- <button v-show="loginType === 'message'" class="voice" type="default" @click="getCode('voiceCode')" :disabled="disabled">{{ voiceText }}</button> -->
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
      },
      visibleIconSrc: '/static/icon/open-2.png',
      hiddenIconSrc: '/static/icon/down-2.png',
      showPassword: false,
      showCode: true
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
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff'
    });
    wx.hideHomeButton()
    wx.setNavigationBarTitle({ title: '' })
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
    togglePasswordVisibility () {
      this.showPassword = !this.showPassword;
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
          this.showCode = true
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
          this.showCode = false
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

.unlogin-button {
  background: gray !important;
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
      width: 150rpx;
      margin-top: 160rpx;
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

  .voice-message {
    text-align: right;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .select-type {
      padding: 0.2rem;
      font-size: 30rpx;
      font-weight: 500;
      color: #3C4253;
    }


  }

  .form-box {
    margin-top: 50rpx;
    padding: 0 40rpx;

    .code-box {
      // height: 1.41rem;
      padding: 10rpx 20rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f0f0f0;
      background: #fff;
      margin-bottom: 50rpx;
      border-radius: 0.27rem;
      overflow: hidden;

      .img {
        width: 32rpx;
        height: 32rpx;
        margin-right: 10rpx;
      }

      input {
        font-size: 30rpx;
        border: none;
        caret-color: #F5C457;
        width: 100%;
        background: none;
        line-height: 1;
        margin-left: 10rpx;
      }

      .code-left {
        width: 100%;
      }

      .flex-style {
        line-height: 40rpx;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }

      .code-left-two {
        width: 60%;
      }

      .code-right {
        .code-button {
          border: 1px solid rgb(246, 197, 99);
          border-radius: 8rpx;
          width: 170rpx;
          height: 42rpx;
          font-size: 26rpx;
          text-align: center;
          line-height: 42rpx;
        }

        .color-yellow {
          color: rgb(246, 197, 99);
          border: 1px solid rgb(246, 197, 99);
        }

        .color-gary {
          color: gray;
          border: 1px solid gray;
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

    button {
      height: 88rpx;
      font-size: 30rpx;
      font-weight: 500;
      color: #FFFFFF;
    }

    .contro-box {
      margin-top: 20rpx;
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
          width: 0.53rem;
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
