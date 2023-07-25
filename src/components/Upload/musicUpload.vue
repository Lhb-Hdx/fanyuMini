<template>
  <div>
    <el-upload
      v-if="addType === 'local'"
      action=""
      :data="uploadForm"
      list-type="text"
      :http-request="handleRequest"
      :multiple="false" :show-file-list="showFileList"
      :file-list="fileList"
      :accept="accept"
      :on-remove="handleRemove">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传{{ accept }}文件</div>
    </el-upload>
    <el-upload
      v-else
      :action="dataObj.host"
      :data="dataObj"
      list-type="text"
      :multiple="false" :show-file-list="showFileList"
      :file-list="fileList"
      :accept="accept"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传{{ accept }}文件</div>
    </el-upload>
  </div>
</template>
<script>
import {policy} from '@/api/oss'
import { upLoadMusic } from '@/api/music'
export default {
  name: 'singleUpload',
  props: {
    value: String,
    accept: String,
    addType: String
  },
  created () {
  },
  computed: {
    imageUrl () {
      return this.value
    },
    imageName () {
      if (this.value != null && this.value !== '') {
        return this.value.substr(this.value.lastIndexOf('/') + 1)
      } else {
        return null
      }
    },
    fileList () {
      return [{
        name: this.imageName,
        url: this.imageUrl
      }]
    },
    showFileList: {
      get: function () {
        return this.value !== null && this.value !== '' && this.value !== undefined
      },
      set: function (newValue) {
      }
    }
  },
  data () {
    return {
      uploadForm: {
        file: {}
      },
      dataObj: {
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: ''
      },
      time: null,
      dialogVisible: false
    }
  },
  methods: {
    handleRequest (param) {
      let form = new FormData()
      form.append('file', param.file)
      upLoadMusic(form)
        .then(res => {
          if (res.code === 200) {
            this.showFileList = true
            this.fileList.pop()
            this.fileList.push({name: param.file.name, url: res.data})
            this.emitInput(this.fileList[0].url)
          }
        })
    },
    emitInput (val) {
      this.$emit('input', val)
    },
    handleRemove (file, fileList) {
      this.emitInput('')
    },
    handlePreview (file) {
      this.dialogVisible = true
    },
    beforeUpload (file) {
      if (this.addType === 'local') {
        this.uploadForm.file = file
      } else {
        let _self = this
        this.time = new Date().getTime()
        return new Promise((resolve, reject) => {
          policy().then(response => {
            _self.dataObj.policy = response.data.policy
            _self.dataObj.signature = response.data.signature
            _self.dataObj.ossaccessKeyId = response.data.accessKeyId
            _self.dataObj.key = response.data.dir + this.time + file.name
            _self.dataObj.dir = response.data.dir
            _self.dataObj.host = response.data.host
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(err)
          })
        })
      }
    },
    handleUploadSuccess (res, file) {
      this.showFileList = true
      this.fileList.pop()
      this.fileList.push({name: file.name, url: this.dataObj.host + '/' + this.dataObj.dir + this.time + file.name})
      this.emitInput(this.fileList[0].url)
    }
  }
}
</script>
<style>

</style>
