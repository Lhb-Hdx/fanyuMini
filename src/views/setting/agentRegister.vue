<template>
  <el-dialog title="服务商注册"
             :visible.sync="visible"
             width="40%"
             center>
    <div v-show="agentRegUrl"
         class="response">
      <qrcode :value="agentRegUrl"
              v-if="agentRegUrl"
              :options="{ size: 170 }"></qrcode>
    </div>
    <span slot="footer"
          class="dialog-footer">
      <el-button type="primary"
                 @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { agentRegister } from '@/api/admin'
import Qrcode from '@xkeshi/vue-qrcode'
export default {
  name: 'agentRegisterDialog',
  data () {
    return {
      visible: true,
      agentRegUrl: ''
    }
  },
  components: {
    qrcode: Qrcode
  },
  beforeMount () {
    this.init()
  },
  methods: {
    init () {
      agentRegister().then(res => {
        this.agentRegUrl = res.data
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
.response {
  text-align: center;
}
</style>
