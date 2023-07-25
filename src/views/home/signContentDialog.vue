<template>
  <el-dialog title="签约"
             :visible.sync="visible"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :show-close="false"
             width="60%">
    <div class="container-dialog">
      <el-form ref="form"
               :rules="rules"
               :model="form"
               class="demo-form-inline"
               label-position="center"
               label-width="">
        <el-form-item label=""
                      prop="content">
          <div v-html="form.content"></div>
        </el-form-item>
        <el-form-item label=""
                      prop="checked">
          <el-checkbox v-model="checked">{{form.checkContent}}</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   slot="append"
                   @click="saveContent"
                   :disabled="disabled">同意{{ text }}</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {
  getAgentSignContent, agentSign
} from '@/api/operation'
export default {
  name: 'signDetailDialog',
  data () {
    var valChecked = (rule, value, callback) => {
      if (!this.checked) {
        callback(new Error('请勾选同意签约内容!'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      form: {},
      editorOption: {
        modules: {
          toolbar: []
        }
      },
      rules: {
        checked: [{ validator: valChecked, trigger: 'change' }]
      },
      checked: false,
      time: 20,
      text: '',
      disabled: false,
      intervalFunc: null
    }
  },
  methods: {
    init () {
      getAgentSignContent().then(res => {
        if (res.data.length > 0) {
          this.visible = true
          this.form = res.data[0]
        }
      })
      this.disabled = true
      this.intervalFunc = setInterval(() => {
        this.time--
        this.text = '(' + this.time + 's)'
        if (this.time === 0) {
          this.time = 20
          this.text = ''
          this.disabled = false
          clearInterval(this.intervalFunc)
        }
      }, 1000)
    },
    saveContent () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          agentSign({ signId: this.form.id }).then(res => {
            var code = res.code
            var message = res.message
            if (code === 200) {
              this.$message({
                showClose: true,
                message: message,
                type: 'success'
              })
              this.$emit('signContent')
              this.visible = false
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
.ql-editor {
  width: 500px;
  height: 400px;
}
.dialog-footer {
  text-align: center;
}
.demo-form-inline {
  height: 600px;
  overflow-y: scroll;
}
.container-dialog {
  padding: 0 10px;
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
