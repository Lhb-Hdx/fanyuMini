<template>
  <el-dialog :title="updateType === 'add' ? '添加区域' : '修改区域名称'" :visible="visible" @close="closeHandle" :close-on-click-modal="false">
    <div class="addBox">
      <el-form :model="poster" ref="posterFrom" label-width="150px" size="small" :rules="rules">
        <el-form-item label="区域名称：" prop="name">
          <el-input v-model="poster.name" placeholder="区域名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import SingleUpload from '@/components/Upload/singleUpload'
export default {
  name: 'addSharePoster',
  props: ['visible', 'updateType', 'updateName'],
  components: {
    SingleUpload
  },
  data () {
    return {
      poster: {
        name: ''
      },
      rules: {
        name: [{ required: true, message: '请输入区域名称', trigger: 'blur' }],
        parentAgentPhone: [{ required: true, message: '请输入上级代理商手机号', trigger: 'blur' }]
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
    closeHandle () {
      this.$emit('update:id', '')
      this.$emit('update:visible', false)
      this.$emit('update:bankId', null)
    },
    onSubmit () {
      this.$refs['posterFrom'].validate(valid => {
        if (valid) {
          this.$emit('submitHandle', this.poster.name)
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
