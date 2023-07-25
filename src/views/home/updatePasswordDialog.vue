<template>
  <el-dialog title="修改密码"
             :visible.sync="visible"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :show-close="false"
             width="40%">
    <div class="container-dialog">
      <el-form :rules="rules"
               :model="form"
               ref="form"
               class="demo-form-inline"
               label-position="right"
               label-width="80px">
        <el-form-item>
          <el-col class="line">您的账户登录密码为默认密码，存在安全风险，请修改登录密码。</el-col>
        </el-form-item>
        <el-form-item label="新密码"
                      prop="password"
                      label-width="80px">
          <el-input type="password"
                    v-model="form.password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码"
                      prop="passwordRepeat"
                      label-width="80px">
          <el-input type="password"
                    v-model="form.passwordRepeat"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="updatePassword">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { updatePassword } from '@/api/admin'
import Qs from 'qs'
export default {
  name: 'updatePasswordDialog',
  data () {
    var valRepeatPass = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      form: {
        id: '',
        password: '',
        passwordRepeat: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            pattern: /^(?![^a-zA-Z]+$)(?!\\D+$).{8,16}$/,
            message: '请输入包括数字和字母、长度8到16位的密码组合',
            trigger: 'blur'
          }
        ],
        passwordRepeat: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
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
    ...mapGetters(['userId'])
  },
  methods: {
    init () {
      this.visible = true
    },
    updatePassword () {
      this.form.id = this.userId
      let param = Qs.stringify(this.form)
      this.$refs['form'].validate(valid => {
        if (valid) {
          updatePassword(param).then(res => {
            var code = res.code
            var message = res.message
            if (code === 200) {
              this.$message({
                showClose: true,
                message: message,
                type: 'success'
              })
              this.visible = false
              this.$emit('confirmRelation')
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
  padding: 0 100px;
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
