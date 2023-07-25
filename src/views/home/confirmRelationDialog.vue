<template>
  <el-dialog title=""
             :visible.sync="visible"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :show-close="false"
             width="40%">
    <div class="container-dialog">
      <el-form :model="form"
               ref="form"
               class="demo-form-inline"
               label-position="right"
               label-width="80px">
        <el-form-item>
          <div class="top">【{{form.agentName}}+{{form.telephoneNumber}}】邀请你成为大嘉购的服务商。</div>
        </el-form-item>
        <el-form-item>
          <div style="  margin-left: 30px;">点击【不同意】系统会自动删除您的信息，谨慎操作。</div>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="agree">同意</el-button>
        <el-button type="primary"
                   @click="disagree">不同意</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getParentAgentInfo, deleteAgent, cofirmRelationship } from '@/api/agent'
import { logout } from '@/api/login'
export default {
  name: 'confirmRelationDialog',
  data () {
    return {
      visible: false,
      form: {}
    }
  },
  methods: {
    init () {
      this.visible = true
      getParentAgentInfo().then(res => {
        this.form = res.data
      })
    },
    agree () {
      cofirmRelationship().then(res => {
        var code = res.code
        var message = res.message
        if (code === 200) {
          this.$message({
            showClose: true,
            message: message,
            type: 'success'
          })
          this.visible = false
          this.$emit('signContent')
        } else {
          this.$message({
            showClose: true,
            message: message,
            type: 'error'
          })
        }
      })
    },
    disagree () {
      deleteAgent().then(res => { })
      logout().then(res => {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.top {
  font-size: 16px;
  font-weight: 600;
}
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
