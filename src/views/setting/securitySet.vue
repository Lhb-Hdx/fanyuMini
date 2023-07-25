<template>
  <el-dialog title="安全设置"
             :visible.sync="visible"
             width="40%">
    <div class="container-dialog">
      <el-form ref="form"
               :rules="rules"
               :model="form"
               class="demo-form-inline"
               label-position="right"
               label-width="80px">
        <el-form-item label="手机验证码登陆" prop="status" label-width="120px">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="securitySet">确 定</el-button>
        <el-button @click="visible = false">取 消</el-button>

      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { securitySet } from '@/api/admin'
import Qs from 'qs'
export default {
  name: 'securitySetDialog',
  data () {
    return {
      visible: true,
      form: {
        id: '',
        status: ''
      },
      rules: {
        status: [
          {
            required: true,
            message: '请选择是否手机验证码登陆',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  methods: {
    securitySet () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.id = this.userId
          let param = Qs.stringify(this.form)
          securitySet(param).then(res => {
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
