<template>
  <div>
    <el-upload
      ref="upload"
      :action="dataObj.host"
      :data="dataObj"
      :limit="9"
      list-type="picture-card"
      :file-list="fileList"
      :multiple="true"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      accept=".jpg,.png"
      :on-success="handleUploadSuccess">
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>
<script>
import {policy} from '@/api/oss'

export default {
  name: 'multiUpload',
  props: {
    value: Array
  },
  computed: {
    fileList () {
      let list = this.value.map((item) => {
        return {name: item.substr(item.lastIndexOf('/') + 1), url: item}
      })
      return list
    }
  },
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
      time: null,
      dialogVisible: false
    }
  },
  watch: {
    'value': function (newVal, oldVal) {
      let list = this.value.map((item) => {
        return item
      })
      this.fileArr = list
    }
  },
  methods: {
    emitInput (val) {
      this.$emit('update:value', val)
    },
    handleRemove (file, fileList) {
      let arr = fileList.map((item) => {
        return item.url
      })
      this.emitInput(arr)
    },
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
    handleUploadSuccess (res, file) {
      this.fileArr.push(this.dataObj.host + '/' + this.dataObj.dir + this.time + file.name)
      let urls = this.fileArr.map((item) => {
        return item
      })
      this.emitInput(urls)
    }
  }
}
</script>
<style .scoped>
.el-upload-list--picture-card .el-upload-list__item{
  width: 128px;
  height: 128px;
}

.el-upload--picture-card {
  width: 128px;
  height: 128px;
}
</style>
