<template>
  <div>
    <div class="container-top">
      <el-form :inline="true" ref="formData" :model="formData" class="demo-form-inline" label-position="right"
        label-width="85px">
        <!-- <el-form-item label="区域名称"
                      prop="agentName">
          <el-input v-model="formData.area_name"
                    placeholder="区域名称"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="changeAllvoiceVisible = true">设置所有设备音量</el-button>
          <!-- <el-button type="primary"
                     @click="query">查询</el-button> -->
          <el-button type="primary" @click="refreshDisk">刷新存储信息</el-button>
          <el-button type="primary" @click="addDeviceShow = true">添加设备</el-button>
          <el-form-item label="" class="optionStyle">
            <el-select v-model="queryForm.status" placeholder="请选择" @change="Inquire">
              <el-option label="全部" :value="null"></el-option>
              <el-option v-for="(item, index) of options" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-input clearable v-model="queryForm.devicename" placeholder="搜索设备名称" class="filter-item"
              style="width: 200px;margin-right: 10px;">
              <el-button slot="append" icon="el-icon-search" @click="Inquire"></el-button>
            </el-input>
            <el-input clearable v-model="queryForm.sn" placeholder="搜索设备ID" class="filter-item"
              style="width: 200px;margin-right: 10px;">
              <el-button slot="append" icon="el-icon-search" @click="Inquire"></el-button>
            </el-input>
            <!-- <el-input clearable v-model="queryForm.ip" placeholder="搜索设备IP" class="filter-item" style="width: 200px;margin-right: 10px;" >
                <el-button slot="append" icon="el-icon-search" @click="Inquire"></el-button>
              </el-input> -->
          </el-form-item>
          <el-form-item class="query">
            <!-- <el-button type="primary" @click="Inquire">查询</el-button> -->
            <el-button class="filter-item" type="primary" icon="el-icon-upload2"
              @click="openImportFileDialog">批量导入</el-button>
            <el-button class="filter-item" type="primary" @click="openCommandDialog">批量处理</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-table">
      <el-table @selection-change="handleSelectionChange" :data="listData" border row-key="id" style="width: 100%"
        :header-cell-style="{ background: '#F2F2F2' }">
        <el-table-column type="selection" width="55" :reserve-selection="true" />
        <el-table-column prop="deviceName" width="150" label="设备名称" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column width="250" prop="id" label="设备ID" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column width="150" prop="deviceIp" label="设备ip" align="center" show-overflow-tooltip />
        <!-- <el-table-column width="150" prop="mobileCcid" label="CCID" align="center"  show-overflow-tooltip/> -->
        <el-table-column prop="volume" label="设备音量" align="center" show-overflow-tooltip />
        <el-table-column prop="distInfo" label="存储空间" align="center" show-overflow-tooltip />
        <!-- <el-table-column width="150" prop="deviceStatus" :formatter="formatStatus" label="设备状态" align="center"  show-overflow-tooltip> -->
        <el-table-column width="150" prop="deviceStatus" label="设备状态" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span :style="{ color: setColor(row.deviceStatus) }">{{ setStatus(row.deviceStatus) }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="toRename(scope.row)" size="small">修改名称</el-button>
            <el-button type="text" style="margin-left: 0" @click="toChangeGongfang(scope.row.id)"
              size="small">修改功放</el-button>
            <el-button type="text" style="margin-left: 0" @click="toChangeVoice(scope.row.id)"
              size="small">修改音量</el-button>
            <el-button type="text" style="margin-left: 0" @click="toChangeChannel(scope.row.id)"
              size="small">修改频道</el-button>
            <el-button type="text" style="margin-left: 0" @click="toChangeKuoyinRange(scope.row.id)"
              size="small">扩音范围</el-button>
            <el-button type="text" style="margin-left: 0" @click="toDeleteDevice(scope.row.id)"
              size="small">删除设备</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="queryForm.pageNum" :page-sizes="[5, 10, 20, 40]" :page-size="queryForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <renamedevice v-if="renameVisible" :renameName="renameName" :visible.sync="renameVisible"
      @submitHandle="submitRename" />
    <changevoice v-if="changevoiceVisible" :sn="changeVoiceForm.sn" :visible.sync="changevoiceVisible"
      @submitHandle="submitChangeVoice" />
    <changegongfang v-if="changegongfangVisible" :sn="changeGongfangForm.sn" :visible.sync="changegongfangVisible"
      @submitHandle="submitChangeGongfang" />
    <changechanneldialog v-if="changechannelVisible" :sn="changeChannelForm.sn" :visible.sync="changechannelVisible"
      @submitHandle="submitChangeChannel" />
    <changekuoyinrangedialog v-if="changeKuoyinVisible" :sn="kuoyinForm.zhujiao_sn" :visible.sync="changeKuoyinVisible"
      @submitHandle="submitChangeKuoyin" />
    <changeallvoice v-if="changeAllvoiceVisible" :visible.sync="changeAllvoiceVisible"
      @submitHandle="submitChangeAllVoice" />
    <commandDialog v-if="showCommandDialog" :selectList="selectList" @commandClose="showCommandDialog = false">
    </commandDialog>
    <add-device v-if="addDeviceShow" @close="addDeviceShow = false" @submitHandle="submitAddDevice"></add-device>
    <el-dialog title="导入  (仅限xls/xlsx文件)" :visible.sync="showImportFileDialog" width="50%" top="5vh">
      <el-form label-width="90px">
        <el-form-item label="选择文件">
          <el-upload ref="uploadRef" action="" accept=".xls,.xlsx" :http-request="upload" :on-change="changeUpload"
            :before-upload="beforeUpload" :on-remove="removeUpload" :file-list="fileList" :limit="1"
            :on-exceed="handleExceed">
            <el-button size="small" type="primary">导入</el-button>
          </el-upload>
          <ExportExcel size="mini" class="filter-item" buttonTitle="下载模板" :fillter-list="fillerList"
            :excel-title="ExcelTitle" :file-name="exportFileName" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showImportFileDialog = false">取 消</el-button>
        <el-button class="filter-item" type="primary" @click="confirmImportFile">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { policy } from '@/api/oss'
import { formatTableDate } from '@/utils/date'
import ExportExcel from '@/components/ExportExcel/export-excel'
import excelUpload from '@/components/Upload/excelUpload'
import axios from 'axios'
import { getToken } from '@/utils/auth'

import {
  querySchoolAllDevice,
  setDeviceName,
  setSystemVolume,
  setGongfangLevel,
  setChannel,
  setKuoyinDevice,
  refreshDiskInfo,
  SetSystemVolumeToAllDevice,
  deletedevice,
  adddevice
  // importExcelUsing
} from '@/api/device'
import renamedevice from './renameDeviceDialog'
import changevoice from './changeVoiceDialog'
import changeallvoice from './changeAllVoiceDialog'
import changegongfang from './changeGongfangDialog'
import changechanneldialog from './changeChannelDialog'
import changekuoyinrangedialog from './kuoyinRangeDialog'
import commandDialog from './commandDialog'
import addDevice from './addDevice'
export default {
  components: {
    renamedevice,
    changevoice,
    changegongfang,
    changechanneldialog,
    changekuoyinrangedialog,
    changeallvoice,
    addDevice,
    ExportExcel,
    excelUpload,
    commandDialog
  },
  name: 'classList',
  data () {
    return {
      total: 0,
      addDeviceShow: false,
      renameVisible: false,
      changevoiceVisible: false,
      changegongfangVisible: false,
      changechannelVisible: false,
      changeKuoyinVisible: false,
      changeAllvoiceVisible: false,
      showCommandDialog: false,
      renameName: '',
      listData: [],
      updateType: '',
      renameForm: {
        device_name: '',
        sn: ''
      },
      changeVoiceForm: {
        systemVolume: '',
        sn: ''
      },
      changeGongfangForm: {
        level: '',
        sn: ''
      },
      changeChannelForm: {
        channel: '',
        sn: ''
      },
      kuoyinForm: {
        zhujiao_sn: '',
        snlst: []
      },
      queryForm: {
        pageSize: 5,
        pageNum: 1,
        status: null,
        devicename: null,
        sn: null
        // ip: null
        // nameSort: '',
        // idSort: ''
      },
      options: [
        { label: '在线', value: '1' },
        { label: '离线', value: '0' }
      ],
      showImportFileDialog: false,
      fillerList: [],
      colorData: [
        { label: '离线', value: 0, color: 'red' },
        { label: '在线', value: 1, color: 'green' }
      ],
      ExcelTitle: [
        {
          title: 'id',
          dataIndex: 'id'
        },
        {
          title: 'name',
          dataIndex: 'deviceType'
        }
      ],
      exportFileName: '模板',
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
      selectList: []
    }
  },
  computed: {
    ...mapGetters(['roles']),
    setColor () {
      const that = this
      return function (level) {
        const levelIdx = that.colorData.findIndex(item => item.value === level)
        if (levelIdx !== -1) {
          return that.colorData[levelIdx].color
        }
      }
    },
    setStatus () {
      const that = this
      return function (level) {
        const levelIdx = that.colorData.findIndex(item => item.value === level)
        if (levelIdx !== -1) {
          return that.colorData[levelIdx].label
        }
      }
    }
  },
  beforeMount () {
    this.queryForm.pageSize = localStorage.getItem('devicesSize') ? +localStorage.getItem('devicesSize') : 5
    this.getList()
  },
  filters: {
    formatData (value) {
      return formatTableDate(value)
    }
  },
  created () {
    // this.Visible = true
  },
  mounted () {
    console.log(localStorage.getItem('devicesSize'))
  },
  methods: {
    // 获取行键
    getRowKeys (row) {
      return row.id
    },
    // 选择行
    handleSelectionChange (val) {
      this.selectList = val
      console.log(this.selectList)
    },
    // 删除文件
    removeUpload () {
      this.fileListLength = ''
    },
    // 检测upload上传变换
    changeUpload (file, fileList) {
      this.fileListLength = file
    },
    // 打开弹窗
    openImportFileDialog () {
      this.showImportFileDialog = true
    },
    // 打开命令弹窗
    openCommandDialog () {
      if (this.selectList.length === 0) {
        this.$message.warning(`请先选择需要处理的设备`)
        return
      }
      this.showCommandDialog = true
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
    },
    beforeUpload (file) {
      let _self = this
      this.time = new Date().getTime()
      const isType = file.type === 'application/vnd.ms-excel'
      const isTypeComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const fileType = isType || isTypeComputer
      if (!fileType) {
        this.$refs.uploadRef.clearFiles()
        this.$message.error('上传文件只能是xls/xlsx格式！')
      }
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
    // 上传
    upload (param) {
      // let fdata = new FormData()
      // fdata.append('file', param.file)
    },
    // 提交文件
    confirmImportFile () {
      let fdata = new FormData()
      fdata.append('file', this.fileListLength.raw)
      const _this = this
      if (this.fileListLength) {
        const token = getToken()
        axios({
          method: 'post',
          url: process.env.NODE_ENV === 'development' ? '/api/thirdapi/deviceapi/importExcel' : '/thirdapi/deviceapi/importExcel',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token
          },
          data: fdata
        }).then(res => {
          if (res.data.code === 200) {
            _this.$message.success('导入成功')
            this.$refs.uploadRef.clearFiles()
            this.showImportFileDialog = false
            this.getList()
          } else {
            _this.$message.error('导入异常，请检查后重试')
          }
        })
        // importExcelUsing({
        //   // file: _this.fileListLength.raw
        //   file: _this.fdata
        // }).then(res => {
        //   if (res.code === 200) {
        //     console.log(res)
        //     _this.$message.success('上传成功')
        //     this.$refs.uploadRef.clearFiles()
        //     this.showImportFileDialog = false
        //     this.getList()
        //   }
        // })
      } else {
        _this.$message.error('请先选择文件')
      }
    },
    submitAddDevice (data) { // 添加设备
      this.addDeviceShow = false
      adddevice(data)
        .then(res => {
          if (res.code === 200) {
            // this.queryForm.pageSize = 5
            // this.queryForm.pageNum = 1
            this.getList()
          }
        })
    },
    handlerNameSort (val) {
      this.queryForm.nameSort = val
      this.getList()
    },
    handlerIDSort (val) {
      this.queryForm.idSort = val
      this.getList()
    },
    toDeleteDevice (id) {
      this.$confirm('此操作将删除该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deviceDelete(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deviceDelete (id) { // 删除设备
      deletedevice({ device_id: id })
        .then(res => {
          if (res.code === 200) {
            // this.queryForm.pageSize = 5
            // this.queryForm.pageNum = 1
            this.getList()
          }
        })
    },
    refreshDisk () { // 刷新存储信息
      refreshDiskInfo()
        .then(res => {
          if (res.code === 200) {
            // this.queryForm.pageSize = 5
            // this.queryForm.pageNum = 1
            this.getList()
          }
        })
    },
    getList () { // 获取设备列表
      querySchoolAllDevice({
        pageSize: this.queryForm.pageSize,
        pageNum: this.queryForm.pageNum,
        status: this.queryForm.status ? this.queryForm.status : null,
        devicename: this.queryForm.devicename ? this.queryForm.devicename : null,
        sn: this.queryForm.sn ? this.queryForm.sn : null,
        ip: this.queryFormip ? this.queryFormip : null
      })
        .then(res => {
          if (res.code === 200) {
            this.listData = res.data.list
            this.total = res.data.total
          }
        })
    },
    toRename (data) { // 打开重命名弹窗
      this.renameForm.sn = data.sn
      this.renameName = data.deviceName
      this.renameVisible = true
    },
    submitRename (name) { // 提交重命名
      this.renameForm.device_name = name
      this.renameVisible = false
      setDeviceName(this.renameForm)
        .then(res => {
          if (res.code === 200) {
            this.getList()
          }
        })
    },
    toChangeVoice (sn) { // 打开修改音量弹窗
      this.changeVoiceForm.sn = sn
      this.changevoiceVisible = true
    },
    submitChangeVoice (data) { // 提交修改音量
      this.changeVoiceForm.systemVolume = data
      this.changevoiceVisible = false
      setSystemVolume(this.changeVoiceForm)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: '修改音量成功',
              type: 'success'
            })
            this.getList()
          }
        })
    },
    submitChangeAllVoice (data) { // 提交修改所有设备音量
      this.changeAllvoiceVisible = false
      SetSystemVolumeToAllDevice({ systemVolume: data })
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: '修改音量成功',
              type: 'success'
            })
            this.getList()
          }
        })
    },
    toChangeGongfang (sn) { // 打开修改功放弹窗
      this.changeGongfangForm.sn = sn
      this.changegongfangVisible = true
    },
    submitChangeGongfang (data) { // 提交修改功放
      this.changeGongfangForm.level = data
      this.changegongfangVisible = false
      setGongfangLevel(this.changeGongfangForm)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: '修改功放成功',
              type: 'success'
            })
          }
        })
    },
    toChangeChannel (sn) { // 打开频道修改弹窗
      this.changeChannelForm.sn = sn
      this.changechannelVisible = true
    },
    submitChangeChannel (data) { // 提交频道修改
      this.changeChannelForm.channel = data
      this.changechannelVisible = false
      setChannel(this.changeChannelForm)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: '修改频道成功',
              type: 'success'
            })
          }
        })
    },
    toChangeKuoyinRange (sn) { // 打开修改扩音的弹窗
      this.kuoyinForm.zhujiao_sn = sn
      this.changeKuoyinVisible = true
    },
    submitChangeKuoyin (data) { // 提交修改扩音
      this.changeKuoyinVisible = false
      this.kuoyinForm.snlst = data
      setKuoyinDevice(this.kuoyinForm)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: '设置成功',
              type: 'success'
            })
          }
        })
    },
    formatStatus: function (row, column) {
      return row.deviceStatus === 1 ? '在线' : row.deviceStatus === 0 ? '离线' : ''
    },
    handleSizeChange (size) {
      localStorage.setItem('devicesSize', size)
      this.queryForm.pageSize = size
      this.queryForm.pageNum = 1
      this.getList()
    },
    handleCurrentChange (currentPage) {
      this.queryForm.pageNum = currentPage
      this.getList()
    },
    // 查询
    Inquire (e) {
      this.queryForm.pageNum = 1
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-footer {
  text-align: center;
}

// .query {
//   margin-top: 10px;
// }
.optionStyle {
  margin-left: 10px;
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
</style>
