<template>
  <el-dialog title="修改设备功放" :visible="visible" @close="closeHandle" :close-on-click-modal="false">
    <div class="addBox">
      <el-form :model="poster" ref="posterFrom" label-width="100px" size="small" :rules="rules">
        <el-form-item label="设备功放：" prop="voice">
          <el-input v-model="poster.voice" :max="4"></el-input>
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
    var checkGongfang = (rule, value, callback) => {
      if (value === '' || value > 4) {
        return callback(new Error('功放等级为0-4'))
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
        2: '2'
      },
      rules: {
        voice: [{ validator: checkGongfang, trigger: 'blur' }]
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
            this.poster.voice = parseInt(res.data.split(':')[1])
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
