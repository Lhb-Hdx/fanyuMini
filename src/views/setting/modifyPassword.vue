<template>
  <el-dialog title="修改密码"
             :close-on-click-modal="false"
             :visible.sync="visible"
             width="40%">
    <div class="container-dialog">
      <el-form :rules="rules"
               :model="form"
               ref="form"
               class="demo-form-inline"
               label-position="right"
               label-width="80px">
        <el-form-item type="password"
                      label="新登录密码"
                      prop="newPassword"
                      label-width="120px">
          <el-input type="password"
                    v-model="form.newPassword"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item type="password"
                      label="确认新密码"
                      prop="newPasswordRepeat"
                      label-width="120px">
          <el-input type="password"
                    v-model="form.newPasswordRepeat"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="短信验证码"
                      prop="verifyCode"
                      label-width="120px">
          <el-input v-model="form.verifyCode"
                    autoComplete="on"
                    placeholder="请获取验证码">
            <el-button slot="append"
                       @click="getCode"
                       :disabled="disabled">{{ text }}</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="updatePassword">确 定</el-button>
        <el-button @click="visible = false">取 消</el-button>

      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAdminInfo, modifyPassword } from '@/api/admin'
import {
  getVerifyCode
} from '@/api/login'
import Qs from 'qs'
export default {
  name: 'modifyPasswordDialog',
  data () {
    var valRepeatPass = (rule, value, callback) => {
      if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      visible: true,
      time: 60,
      text: '获取验证码',
      intervalFunc: null,
      adminInfo: {},
      form: {
        id: '',
        verifyCode: '',
        newPassword: ''
      },
      rules: {
        verifyCode: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
        newPassword: [
          { required: true, message: '请输入新登录密码', trigger: 'blur' },
          {
            pattern: /^(?![^a-zA-Z]+$)(?!\\D+$).{8,16}$/,
            message: '请输入包括数字和字母、长度8到16位的密码组合',
            trigger: 'blur'
          }
        ],
        newPasswordRepeat: [
          { required: true, message: '请输入确认登录密码', trigger: 'blur' },
          {
            pattern: /^(?![^a-zA-Z]+$)(?!\\D+$).{8,16}$/,
            message: '请输入包括数字和字母、长度8到16位的密码组合',
            trigger: 'blur'
          },
          { validator: valRepeatPass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['userId']),
    disabled () {
      if (this.text !== '获取验证码') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    getCode () {
      this.intervalFunc = setInterval(() => {
        this.time--
        this.text = this.time + 's'
        if (this.time === 0) {
          this.time = 60
          this.text = '获取验证码'
          clearInterval(this.intervalFunc)
        }
      }, 1000)
      getAdminInfo(this.userId).then(res => {
        this.adminInfo = res.data
        getVerifyCode({ phone: this.adminInfo.username, type: 5 }).then(res => {
          if (res.code === 200) {
          }
        })
      })
    },
    updatePassword () {
      this.form.id = this.userId
      let param = Qs.stringify(this.form)
      this.$refs['form'].validate(valid => {
        if (valid) {
          modifyPassword(param).then(res => {
            var code = res.code
            var message = res.message
            if (code === 200) {
              this.$message({
                showClose: true,
                message: message,
                type: 'success'
              })
              this.visible = false
              this.getList()
            } else {
              this.$message({
                showClose: true,
                message: message,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-footer {
  text-align: center;
}
.container-dialog {
  padding: 0 50px;
  .title {
    font-size: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #ffa700;
  }
  .container-form {
    margin: 20px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    flex-wrap: wrap;
    .special {
      width: 45%;
    }
    .container-form-item {
      width: 45%;
      .line {
        text-align: center;
      }
    }
    .container-form-item-special {
      width: 45%;
      .inline-form {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-content: center;
        .line {
          text-align: center;
        }
      }
    }
  }
}
</style>
