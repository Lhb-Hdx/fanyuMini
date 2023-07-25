<template>
  <el-dialog title="添加设备" :visible="true" @close="closeHandle" :close-on-click-modal="false">
    <div class="addBox">
      <el-form :model="poster" ref="posterFrom" label-width="150px" size="small" :rules="rules">
        <el-form-item label="设备id：" prop="device_id">
          <el-input v-model="poster.device_id" placeholder="设备id"></el-input>
        </el-form-item>
        <el-form-item label="验证码：" prop="authcode">
          <el-input v-model="poster.authcode" placeholder="验证码">
            <el-button slot="append"
                       @click="getRegisterCode">获取验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="disabled" @click="onSubmit">提交</el-button>
          <el-button @click="closeHandle">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import SingleUpload from '@/components/Upload/singleUpload'
import { getdeviceauthcode } from '@/api/device'
export default {
  name: 'addSharePoster',
  components: {
    SingleUpload
  },
  data () {
    return {
      poster: {
        device_id: '',
        authcode: ''
      },
      rules: {
        device_id: [{ required: true, message: '请输入设备id', trigger: 'blur' }]
      }
    }
  },
  computed: {
    disabled () {
      if (this.poster.device_id === '' || this.poster.authcode === '') {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    // console.log(123)
  },
  beforeMount () {
    if (this.updateType === 'update') {
      this.poster.name = this.updateName
    }
  },
  methods: {
    getRegisterCode () {
      this.$refs['posterFrom'].validate(valid => {
        if (valid) {
          getdeviceauthcode({device_id: this.poster.device_id})
            .then(res => {
              if (res.code === 200) {
                //     this.loginForm.verifyCode = res.data
              }
            })
        }
      })
    },
    closeHandle () {
      this.$emit('close')
    },
    onSubmit () {
      this.$refs['posterFrom'].validate(valid => {
        if (valid) {
          this.$emit('submitHandle', this.poster)
        }
      })
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 70%
}
.addBox {
  /* width: 600px; */
  padding: 0 35px;
  margin: 0 auto;
}
</style>
<style>
.el-upload-list{
  width: 70% !important
}
</style>
