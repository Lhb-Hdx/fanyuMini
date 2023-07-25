<template>
  <div>
    <el-upload
      :action="dataObj.host"
      :data="dataObj"
      :limit="1"
      list-type="text"
      :multiple="false" :show-file-list="true"
      :file-list="fileList"
      :before-upload="beforeUpload"
      accept=".xls,.xlsx"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess">
      <el-button size="small" type="primary">选择文件</el-button>
      <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
    </el-upload>
  </div>
</template>

<script>
import {policy} from '@/api/oss'
export default {
  name: 'ExcelUpload',
  data () {
    return {
      fileArr: [],
      dataObj: {
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: ''
      },
      time: null
    }
  },
  props: {
    value: String,
    accept: String
  },
  computed: {
    imageUrl () {
      return this.value[0]
    },
    imageName () {
      let val = this.value[0]
      if (val != null && val !== '') {
        return val.substr(val.lastIndexOf('/') + 1)
      } else {
        return null
      }
    },
    fileList () {
      return (this.value != null && this.value.length > 0) ? [{ name: this.imageName, url: this.imageUrl }] : []
    }
  },
  methods: {
    beforeUpload (file) {
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
    },
    handleRemove () {
      this.emitInput(null)
    },
    handleUploadSuccess (res, file) {
      this.fileArr.pop()
      this.fileArr.push({name: file.name, url: this.dataObj.host + '/' + this.dataObj.dir + this.time + file.name})
      let picUrl = this.dataObj.host + '/' + this.dataObj.dir + this.time + file.name
      this.emitInput([picUrl])
    },
    emitInput (val) {
      this.$emit('update:value', val)
    }
  }
}
</script>

<style scoped>

</style>
