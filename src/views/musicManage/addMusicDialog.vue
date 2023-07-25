<template>
  <el-dialog :title="updateType === 'add' ? '添加资源' : '编辑资源'" :visible="visible" @close="closeHandle" :close-on-click-modal="false">
    <div class="addBox">
      <el-form :model="posterOne" ref="posterFrom" label-width="100px" size="small" :rules="rules">
        <el-form-item label="资源名称：" prop="music_name">
          <el-input v-model="posterOne.music_name" placeholder="资源名称"></el-input>
        </el-form-item>
        <el-form-item label="资源分类：" prop="type">
          <el-select v-model="posterOne.type" placeholder="请选择类型">
            <el-option
              v-for="(item, index) of typeList"
              :key="index"
              :label="item.musicType"
              :value="item.musicType">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="文件类型：" prop="type">
          <el-select v-model="posterOne.type" placeholder="请选择类型">
            <el-option
              v-for="(item, index) of fileList"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="上传位置：">
          <el-select v-model="addType" placeholder="请选择上传位置" @change="changeUploadType">
            <el-option
              v-for="(item, index) of uploadType"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传资源：" prop="url">
          <music-upload v-model="posterOne.url" accept=".mp3,.wav" :addType="addType"></music-upload>
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
import { queryMusicType } from '@/api/music'
import musicUpload from '@/components/Upload/musicUpload'
export default {
  name: 'addSharePoster',
  props: ['visible', 'updateType', 'updateData'],
  components: {
    musicUpload
  },
  data () {
    return {
      addType: 'aliyun',
      typeList: [],
      fileList: [ // 上传的文件类型，录音文件或者文字转语音或者音乐文件
        {name: '录音', value: 3},
        {name: '音乐', value: 3},
        {name: '文字转语音', value: 3}
      ],
      uploadType: [
        {value: 'local', name: '本地服务器'},
        {value: 'aliyun', name: '云端服务器'}
      ],
      posterOne: {
        music_name: '',
        url: '',
        type: ''
      },
      rules: {
        music_name: [{ required: true, message: '请输入资源名称', trigger: 'blur' }],
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
      this.posterOne.music_name = this.updateData.musicName
      this.posterOne.type = this.updateData.musicType
      this.posterOne.music_id = this.updateData.id
      this.posterOne.url = this.updateData.musicPath
    }
    this.getTypeList()
  },
  methods: {
    changeUploadType () {
      this.posterOne.url = ''
    },
    getTypeList () { // 获取音乐类型列表
      queryMusicType({pageSize: 100000, pageNum: 1})
        .then(res => {
          if (res.code === 200 && res.data.list.length > 0) {
            this.typeList = res.data.list
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
