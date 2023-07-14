<template>
  <div class="login-container">
    <div class="form-box">
      <div class="code-box code-box-two">
        <div class="phone-type">+86</div>
        <input placeholder="请输入手机号" v-model="form.telephone">
      </div>
      <div class="code-box">
        <div class="code-left">
          <input placeholder="请输入验证码" v-model="form.authCode" type="tel" @input="inputauthcode">
        </div>
        <div class="code-right">
          <button class="code-button" type="default" @click="getCode('code')" :disabled="disabledCode">{{ text }}</button>
        </div>
      </div>
      <div class="code-box">
        <input placeholder="请输入邀请码" v-model="form.invitationCode">
      </div>
      <div class="voice-message">
        <mt-button class="voice" type="default" @click="getCode('voiceCode')" :disabled="disabledCode">{{ voiceText }}</mt-button>
      </div>
    </div>
    <div class="submit-box">
      <!-- <div class="contro-box">
        <div class="contro-left" @click="remember = !remember">
          <img :src="remember ? argreeUrl : argueUrl">
          <div>点击注册，即表示您已阅读并同意<span @click="$router.push('/serviceProtocal')">《大嘉购服务协议》</span></div>
        </div>
      </div> -->
      <div class="register-box">
        <button class="register-button" type="default" @click="toRegister" :disabled="disabled">提交注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import {
// register,
// getAuthCode,
// getAuthCodeVoice,
// determineRegistered,
// personinfo
} from '@/utils/getData'
export default {
  name: 'login',
  data () {
    return {
      off: true,
      timeInterval: null,
      remember: true,
      clicked: true,
      password1: '',
      password2: '',
      text: '获取验证码',
      voiceText: '获取语音验证码',
      time: 60,
      form: {
        telephone: '',
        authCode: '',
        invitationCode: ''
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  computed: {
    disabledCode () {
      if (this.form.telephone.length !== 11 || this.text !== '获取验证码' || this.voiceText !== '获取语音验证码') {
        return true
      } else {
        return false
      }
    },
    disabled () {
      if (this.form.telephone === '' || this.form.authCode === '' || this.form.invitationCode === '' || !this.remember || !this.off) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapMutations(['changeSystemUserInfo']),
    inputauthcode () {
      if (this.form.authCode.length > 4) {
        this.form.authCode = this.form.authCode.slice(0, 4)
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
      // determineRegistered({phone: this.form.telephone})
      //   .then(res => {
      //     if (res.code === 200) {
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
      //         getAuthCode({telephone: this.form.telephone, type: 4})
      //           .then(res => {
      //             if (res.code === 200) {
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
      //         getAuthCodeVoice({telephone: this.form.telephone, type: 4})
      //           .then(res => {
      //             if (res.code === 200) {
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
      //     } else if (res.code === 505) {
      //       wx.showToast({
      //         title: res.message,
      //         icon: 'none',
      //         duration: 2000
      //       })
      //       setTimeout(() => {
      //         wx.redirectTo({
      //           url: '/pages/login/main'
      //         })
      //       }, 2000)
      //     }
      //   })
    },
    getCode (str) {
      this.queryRegisterStatus(str)
    },
    toRegister () {
      this.off = false
      // register(this.form)
      //   .then(res => {
      //     if (res.code === 200) {
      //       wx.setStorage({
      //         key: 'Authorization',
      //         data: res.data.tokenHead + res.data.token,
      //         success: () => {
      //           this.getInfor()
      //         }
      //       })
      //     } else {
      //       this.off = true
      //       this.form.passwrod = this.password1
      //     }
      //   })
      //   .catch(() => {
      //     this.off = true
      //     this.form.passwrod = this.password1
      //   })
    }
  }
}
</script>

<style lang="less" scoped>
button::after {
  border: none
}
.register-button {
  background: #FF7E7B !important;
  color: #ffffff !important
}
.login-container {
  //background: #ffffff;
  //height: 100vh;
  .form-box {
    // margin-top: 1.5rem;
    padding: 40rpx 40rpx 0;
    .code-box {
      //padding: 0.43rem 0;
      padding: 0.35rem 0.43rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      // border-bottom: 1px solid #f0f0f0;
      background: #F9F9FB;
      margin-bottom: 0.4rem;
      border-radius: 0.27rem;
      overflow: hidden;
      input {
        font-size: 30rpx;
        border: none;
        background: none;
        caret-color: #F5C457;
        width: 100%;
        line-height: 1;
      }
      .code-left {
        width: 60%
      }
      .code-right {
        width: 2.4rem;
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
          font-size: 0.25rem
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
      text-align: right;
      .voice {
        background: none;
        width: 3.2rem;
        border: none;
        padding: 0.2rem;
        border-radius: none;
        box-shadow: none;
        text-align: right;
        //border: 1px solid #E82C50;
        color: #F5A623;
        //height: 30px;
        font-size: 0.3rem
      }
    }
    .clear {
      border: none;
    }
  }
  .submit-box {
    padding: 0 40rpx;
    margin-top: 90rpx;
    .contro-box {
      // margin-top: 0.67rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .contro-left {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        img {
          width: 0.3rem;
          height: auto;
          margin-right: 0.1rem;
          // margin-top: 0.1rem;
        }
        div {
          margin-top: 0.1rem;
          font-size: 0.3rem;
          color: #646464;
          line-height: 1
        }
        span {
          color:#F4BC40
        }
      }
    }
    .register-box {
      margin-top: 1.34rem;
      .register {
        background: none;
        border: 1px solid #E82C50;
        color: #E82C50;
      }
    }
  }
}
</style>
