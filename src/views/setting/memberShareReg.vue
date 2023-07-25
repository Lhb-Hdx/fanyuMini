<template>
  <el-dialog title="分享注册"
             :visible.sync="visible"
             width="40%"
             center>
    <div v-show="shareRegUrl"
         class="response">
      <qrcode :value="shareRegUrl"
              v-if="shareRegUrl"
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
import { jsRsaEncrypt } from '@/decrypt'
import { getAgentInfo } from '@/api/agent'
import { mapGetters } from 'vuex'
import Qrcode from '@xkeshi/vue-qrcode'
export default {
  name: 'memberShareRegDialog',
  components: {
    qrcode: Qrcode
  },
  data () {
    return {
      visible: true,
      shareRegUrl: ''
    }
  },
  computed: {
    ...mapGetters(['userId', 'roles'])
  },
  beforeMount () {
    this.init()
  },
  methods: {
    init () {
      if (this.roles[0] === '6') {
        this.shareRegUrl = `${process.env.CONTEXT3}?agenTinvitCode=${this.userId}&displayCode=*******${this.userId}#/`
      } else {
        getAgentInfo().then(res => {
          let agenTinvitCode = jsRsaEncrypt(res.data.inviteCode)
          let displayCode = '*******' + res.data.inviteCode.slice(-4)
          this.shareRegUrl = `${process.env.CONTEXT3}?agenTinvitCode=${agenTinvitCode}&displayCode=${displayCode}#/`
        })
      }
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
