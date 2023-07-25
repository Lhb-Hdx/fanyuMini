<template>
  <div class="login-container">
    <div class="login-top">
      <div class="top-top">
        <div class="dajiagou">小予智联广播管理平台</div>
      </div>
      <!-- <img src="@/assets/images/logo.png" class="top-right"> -->
    </div>
    <el-card class="login-form-layout" v-show="!toregister">
      <div class="type-select">
        <div
          class="type-item"
          :class="{ current: resource === '2' }"
          @click="changeType('account')"
        >
          密码登录
        </div>
        <div
          class="type-item"
          :class="{ current: resource === '1' }"
          @click="changeType('check')"
        >
          验证码&密码登录
        </div>
        <div
          class="type-item"
          :class="{ current: resource === '3' }"
          @click="changeType('authcode')"
        >
          验证码登录
        </div>
      </div>
      <el-form
        autoComplete="on"
        :model="loginForm"
        :rules="loginRulesss"
        ref="loginForm"
        label-position="left"
      >
        <el-form-item
          prop="mobileNo"
          v-show="resource === '1' || resource === '3'"
        >
          <el-input
            name="username"
            type="text"
            v-model="loginForm.mobileNo"
            autoComplete="on"
            placeholder="请输入手机号"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password" v-show="resource === '1'">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="loginForm.password"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          prop="verifyCode"
          v-show="resource === '1' || resource === '3'"
        >
          <el-input
            name="password"
            type="text"
            v-model="loginForm.verifyCode"
            autoComplete="on"
            placeholder="请获取验证码"
          >
            <el-button
              slot="append"
              @click="getCode"
              :disabled="codeDisabled"
              >{{ text }}</el-button
            >
          </el-input>
        </el-form-item>
        <el-form-item prop="username" v-show="resource === '2'">
          <el-input placeholder="请输入账号" v-model="loginForm.username">
          </el-input>
        </el-form-item>
        <el-form-item v-show="resource === '2'">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="loginForm.password"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px; margin-top: 40px"
          v-if="resource === '2'"
        >
          <el-button
            style="width: 100%"
            type="primary"
            :loading="loading"
            :disabled="disabled2"
            @click.native.prevent="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px; margin-top: 40px"
          v-if="resource === '1' || resource === '3'"
        >
          <el-button
            style="width: 100%"
            type="primary"
            :loading="loading"
            :disabled="disabled1"
            @click.native.prevent="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px; margin-top: 40px">
          <el-button
            style="width: 100%"
            type="text"
            @click.native.prevent="toTabRegister"
          >
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="login-form-layout" v-show="toregister">
      <el-form
        autoComplete="on"
        :model="registerForm"
        :rules="loginRulesTwo"
        ref="registerForm"
        label-position="left"
      >
        <el-form-item prop="school_name">
          <el-input
            name="school_name"
            type="text"
            v-model="registerForm.school_name"
            autoComplete="on"
            placeholder="请输入企业名称"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            name="username"
            type="text"
            v-model="registerForm.username"
            autoComplete="on"
            placeholder="请输入手机号码"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="registerForm.password"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="authcode">
          <el-input
            name="authcode"
            type="text"
            v-model="registerForm.authcode"
            autoComplete="on"
            placeholder="请获取验证码"
          >
            <el-button
              slot="append"
              :disabled="codeDisabledTwo"
              @click="getRegisterCode"
              >{{ registertext }}</el-button
            >
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px; margin-top: 40px">
          <el-button
            style="width: 100%"
            type="primary"
            :loading="loading"
            :disabled="disabled3"
            @click.native.prevent="handleRegister"
          >
            提交注册
          </el-button>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px; margin-top: 40px">
          <el-button
            style="width: 100%"
            type="text"
            @click.native.prevent="backLogin"
          >
            返回登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import {isvalidUsername} from '@/utils/validate'
// import { jsRsaEncrypt } from '@/decrypt'
import validateSlide from '@/components/validateSlide'
import { mapActions } from 'vuex'
import {
  getVerifyCode,
  addEnterprise
} from '@/api/login'
// import loginCenterBg from '@/assets/images/loginCenterBg.png'
import { setTimeout } from 'timers'

export default {
  name: 'login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    // const validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('验证码错误'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      num: 0,
      time: 60,
      time2: 60,
      text: '获取验证码',
      registertext: '获取验证码',
      toregister: false,
      intervalFunc: null,
      intervalFunc2: null,
      resource: '2',
      slideValid2: false, // 密码登陆时是否拖动滑块
      slideValid1: false, // 验证码登陆时是否拖动滑块
      confirmWords2: '拖动滑块验证',
      confirmWords1: '拖动滑块后方可获取验证码',
      msg: '',
      password: '',
      codeUrl: `${process.env.BASE_API}/admin/createImg`,
      // bg: require('@/assets/images/loginCenterBg.png'),
      loginForm: {
        mobileNo: '',
        verifyCode: '',
        username: '',
        password: ''
      },
      registerForm: {
        school_name: '',
        // mobileNo: '',
        // verifyCode: '',
        username: '',
        password: '',
        authcode: ''
      },
      loginRules: {
        mobileNo: [{ required: true, trigger: 'blur', validator: validateUsername }, {
          pattern: /^1[3456789]\d{9}$/,
          message: '请输入正确的手机号码',
          trigger: 'blur'
        }],
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loginRulesTwo: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }, {
          pattern: /^1[3456789]\d{9}$/,
          message: '请输入正确的手机号码',
          trigger: 'blur'
        }],
        school_name: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  computed: {
    disabled1 () { // 密码&验证码登录
      if (this.loginForm.mobileNo.length !== 11 || this.loginForm.verifyCode === '' || this.loginForm.password === '') {
        return true
      } else {
        return false
      }
    },
    disabled2 () { // 密码登录
      if (this.loginForm.username.length !== 11 || this.loginForm.password === '') {
        return true
      } else {
        return false
      }
    },
    disabled3 () { // 注册
      if (this.registerForm.school_name === '' || this.registerForm.username.length !== 11 || this.registerForm.password === '' || this.registerForm.authcode === '') {
        return true
      } else {
        return false
      }
    },
    codeDisabled () { // 登录获取验证码
      if (this.loginForm.mobileNo.length !== 11 || this.text !== '获取验证码') {
        return true
      } else {
        return false
      }
    },
    codeDisabledTwo () { // 注册获取验证码
      if (this.registerForm.username.length !== 11 || this.registertext !== '获取验证码') {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    validateSlide
  },
  beforeDestroy () {
    clearInterval(this.intervalFunc)
    clearInterval(this.intervalFunc2)
  },
  directives: {
    noMoreClick: {
      inserted (el, binding) {
        el.addEventListener('click', () => {
          el.classList.add('is-disabled')
          el.disabled = true
          setTimeout(() => {
            el.disabled = false
            el.classList.remove('is-disabled')
          }, 2000)
        })
      }
    }
  },
  methods: {
    ...mapActions(['Type']),
    backLogin () {
      this.$refs.registerForm.resetFields()
      this.$refs.loginForm.resetFields()
      this.toregister = false
    },
    toTabRegister () {
      this.$refs.registerForm.resetFields()
      this.$refs.loginForm.resetFields()
      this.toregister = true
    },
    changeCode () {
      this.codeUrl = `${process.env.BASE_API}/admin/createImg?` + Date.parse(new Date())
    },
    toSlideValid () {
      if (this.resource === '2') {
        this.slideValid2 = true
        this.confirmWords2 = '验证通过'
      } else if (this.resource === '1') {
        this.slideValid1 = true
        this.confirmWords1 = '验证通过'
      }
    },
    changeType (str) {
      this.$refs.loginForm.resetFields()
      if (str === 'account') {
        this.slideValid2 = false
        this.confirmWords2 = '拖动滑块验证'
        this.resource = '2'
        this.Type('2')
      } else if (str === 'check') {
        this.slideValid1 = false
        this.resource = '1'
        this.Type('1')
      } else {
        this.loginForm.password = '****'
        this.resource = '3'
        this.Type('3')
      }
      // this.$refs.validSlideComponent.initComponent()
    },
    reset (value) {
      this.Type(value)
      this.$refs.loginForm.resetFields()
    },
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    getCode () {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.intervalFunc = setInterval(() => {
            this.time--
            this.text = this.time + 's'
            if (this.time === 0) {
              this.time = 60
              this.text = '获取验证码'
              clearInterval(this.intervalFunc)
            }
          }, 1000)
          getVerifyCode({ phone: this.loginForm.mobileNo.trim(), type: 2 })
            .then(res => {
              if (res.code === 200) {
                //     this.loginForm.verifyCode = res.data
              }
            })
        }
      })
    },
    getRegisterCode () { // 获取注册验证码
      this.$refs['registerForm'].validate(valid => {
        if (valid) {
          this.intervalFunc2 = setInterval(() => {
            this.time2--
            this.registertext = this.time2 + 's'
            if (this.time2 === 0) {
              this.time2 = 60
              this.registertext = '获取验证码'
              clearInterval(this.intervalFunc2)
            }
          }, 1000)
          getVerifyCode({ phone: this.registerForm.username.trim(), type: 2 })
            .then(res => {
              if (res.code === 200) {
                //     this.loginForm.verifyCode = res.data
              }
            })
        }
      })
    },
    handleRegister () {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          addEnterprise(this.registerForm)
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '账号注册成功，请登录',
                  type: 'success'
                })
                this.backLogin()
              }
            })
        }
      })
    },
    handleLogin () {
      console.log(location.host)
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.resource === '2') {
            // this.loginForm.password = this.password
            // this.loginForm.password = jsRsaEncrypt(this.password)
          } else {
            // this.loginForm.password = ''
          }
          this.$store.dispatch('Login', this.loginForm)
            .then(res => {
              this.loading = false
              this.$router.push({ path: '/' })
              if (res.code !== 200) {
                this.loginForm.picauthcode = ''
                this.changeCode()
              }
            })
            .catch(() => {
              this.loginForm.picauthcode = ''
              this.changeCode()
            })
        } else {
          console.log('参数验证不合法！')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  width: 100vw;
  background: #001010;
  // background: linear-gradient(0deg,#262835,#0F111F);
  position: relative;
  height: 100vh;
  .login-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 60%;
      height: auto;
    }
  }
}
.type-select {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .type-item {
    padding: 20px 0;
    margin: 0 0 20px;
    color: #ffffff;
    cursor: pointer;
  }
  .current {
    color: #479cfd;
    border-bottom: 1px solid #479cfd;
  }
}
.el-card {
  background: rgba(255, 255, 255, 0.1);
  border: none;
}
.login-top {
  background: #ffffff;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .top-top {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .dajiagou {
      font-size: 20px;
      margin-left: 10px;
      padding-left: 10px;
      border-left: 1px solid #aaaaaa;
    }
  }
  .top-right {
    height: 30px;
    width: auto;
  }
  .top {
    font-size: 40px;
    color: #ffffff;
    opacity: 0.7;
  }
  .bottom {
    font-size: 18px;
    margin-top: 1%;
    color: #ffffff;
    opacity: 0.5;
  }
}
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 29%;
  width: 30vw;
  // margin: 0 auto;
  // border-top: 10px solid #409eff;
}

.login-title {
  text-align: center;
  margin-top: 0;
}

.login-center-layout {
  background: #409eff;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  max-height: 100%;
  // margin-top: 200px;
}
.slide-verify {
  position: absolute !important;
  top: 35%;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.tip {
  position: absolute !important;
  top: 58.5%;
  width: 200px;
  text-align: center;
  left: 0;
  right: 0;
  margin: 0 auto;
}
</style>
