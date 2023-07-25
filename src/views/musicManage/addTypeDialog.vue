<template>
  <el-dialog :title="updateType === 'add' ? '添加资源分类' : '编辑资源分类'" :visible="visible" @close="closeHandle" :close-on-click-modal="false">
    <div class="addBox">
      <el-form :model="posterOne" ref="posterFrom" label-width="130px" size="small" :rules="rules">
        <el-form-item label="资源分类名称：" prop="music_type_name">
          <el-input v-model="posterOne.music_type_name" placeholder="资源分类名称"></el-input>
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
import musicUpload from '@/components/Upload/musicUpload'
export default {
  name: 'addSharePoster',
  props: ['visible', 'updateType', 'updateData'],
  components: {
    musicUpload
  },
  data () {
    return {
      typeList: [],
      posterOne: {
        music_type_name: ''
      },
      rules: {
        music_type_name: [{ required: true, message: '请输入资源分类名称', trigger: 'blur' }],
        url: [{ required: true, message: '请上传资源', trigger: 'blur' }],
        type: [{ required: true, message: '请选择资源类型', trigger: 'blur' }]
      }
    }
  },
  created () {
    // console.log(123)
  },
  beforeMount () {
    if (this.updateType === 'update') {
      this.posterOne.music_type_name = this.updateData.musicType
      this.posterOne.music_type_id = this.updateData.id
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
          this.$emit('submitHandle', this.posterOne)
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
  /* width: 70% */
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
