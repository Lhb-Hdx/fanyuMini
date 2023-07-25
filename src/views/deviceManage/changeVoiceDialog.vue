<template>
  <el-dialog title="修改设备音量" :visible="visible" @close="closeHandle" :close-on-click-modal="false">
    <div class="addBox">
      <el-form :model="poster" ref="posterFrom" label-width="100px" size="small" :rules="rules">
        <el-form-item label="设备音量：" prop="voice">
          <el-input v-model="poster.voice"></el-input>
        </el-form-item>
        <el-form-item class="list-top">
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import { getDeviceVoulme } from '@/api/device'
export default {
  name: 'addSharePoster',
  props: ['visible', 'sn'],
  data () {
    var checkVoice = (rule, value, callback) => {
      if (value === '' || value > 100) {
        return callback(new Error('音量范围为0-100'))
      } else {
        callback()
      }
    }
    return {
      list: [],
      poster: {
        voice: 0
      },
      marks: {
        0: '0',
        50: '50'
      },
      rules: {
        voice: [{ validator: checkVoice, trigger: 'blur' }]
      }
    }
  },
  created () {
    // console.log(123)
  },
  beforeMount () {
    this.getData()
  },
  methods: {
    getData () {
      getDeviceVoulme({sn: this.sn})
        .then(res => {
          if (res.code === 200) {
            // this.poster.voice = parseInt(res.data.split(':')[0])
            this.poster.voice = res.data
          }
        })
    },
    closeHandle () {
      this.$emit('update:id', '')
      this.$emit('update:visible', false)
      this.$emit('update:bankId', null)
    },
    onSubmit () {
      this.$refs['posterFrom'].validate(valid => {
        if (valid) {
          this.$emit('submitHandle', this.poster.voice)
        }
      })
    },
    cancel () {
      this.$emit('update:visible', false)
      this.$emit('update:id', '')
    }
  }
}
</script>

<style scoped>
.list-top {
  margin-top: 60px;
}
.el-input {
  width: 70%
}
.addBox {
  padding: 0 35px;
  margin: 0 auto;
}
</style>
<style>
.el-upload-list{
  width: 70% !important
}
</style>
