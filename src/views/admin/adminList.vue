<template>
  <div>
    <div class="container-top">
      <el-form :inline="true"
               ref="formData"
               :model="formData"
               class="demo-form-inline"
               label-position="right"
               label-width="85px">
        <el-form-item label="登录账号"
                      prop="account">
          <el-input v-model="formData.account"
                    placeholder="登录账号"></el-input>
        </el-form-item>
        <el-form-item label="用户名称"
                      prop="name">
          <el-input v-model="formData.name"
                    placeholder="用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="所属角色"
                      prop="role">
          <el-input v-model="formData.role"
                    placeholder="所属角色"></el-input>
        </el-form-item>
        <el-form-item label="状态"
                      prop="status">
          <el-select v-model="formData.status"
                     placeholder="状态">
            <el-option v-for="(item, index) of statusList"
                       :key="index"
                       :label="item.name"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="addOrEdit('')">新增</el-button>
          <el-button type="primary"
                     @click="query">查询</el-button>
          <el-button type="primary"
                     @click="reset">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-table">
      <el-table :data="tableData"
                border
                style="width: 100%"
                :header-cell-style="{ background: '#F2F2F2' }">
        <el-table-column prop="username" label="登录账号" align="center" show-overflow-tooltip/>
        <el-table-column prop="nickName" label="用户名称" min-width="60" align="center" show-overflow-tooltip/>
        <!-- <el-table-column prop="loginTime"
                         label="最后登录时间"
                         min-width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.loginTime !== null "
                  style="margin-left: 10px">{{ scope.row.loginTime | formatData}}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="loginCount"
                         label="登录次数"
                         min-width="120">
        </el-table-column> -->
        <!-- <el-table-column prop="role"
                         label="所属角色"
                         min-width="100">
        </el-table-column> -->
        <el-table-column prop="status"
                         :formatter="formatStatus"
                         label="状态"
                         min-width="100"
                         align="center"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         min-width="100"
                         align="center"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="toSetArea(scope.row.id)"
                       type="text"
                       size="small">配置区域</el-button>
            <el-button @click="toSetDevice(scope.row.id)"
                       type="text"
                       size="small">配置设备</el-button>
            <!-- <el-button @click="addOrEdit(scope.row.id)"
                       type="text"
                       size="small">编辑</el-button> -->
            <el-button @click="setStatus(scope.row.id,scope.row.status == 1 ? 2 : 1)"
                       type="text"
                       size="small">{{scope.row.status == 1 ? '禁用':'启用'}}</el-button>
            <el-button type="text"
                       size="small"
                       @click="initPassword(scope.row.id)">初始化密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-pagination">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="formData.pageNum"
                       :page-sizes="[5, 10, 20, 40]"
                       :page-size="formData.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>
    <addOrEditAdminDialog v-if="addOrEditAdminDialogVisible"
                          @list="getList"
                          ref="addOrEditAdminDialog"></addOrEditAdminDialog>
    <checkdevice v-if="checkDeviceVisible" :visible.sync="checkDeviceVisible" :checkDeviceListId="deviceForm.id" @submitHandle="submitCheckDevice"/>
    <checkarea v-if="checkAreaVisible" :visible.sync="checkAreaVisible" :checkAreaListId="areaForm.id" @submitHandle="submitCheckArea"/>
  </div>
</template>

<script>
import { adminList, setAdminStatus, initPassword } from '@/api/admin'
import { deviceSetControl, areaSetControl } from '@/api/device'
import addOrEditAdminDialog from './addOrEditAdminDialog'
import { formatTableDate } from '@/utils/date'
import checkdevice from './checkDeviceDialog'
import checkarea from './checkAreaDialog'
export default {
  name: 'adminList',
  components: {
    addOrEditAdminDialog,
    checkdevice,
    checkarea
  },
  data () {
    return {
      checkDeviceVisible: false,
      checkAreaVisible: false,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      statusList: [
        { name: '全部', value: '' },
        { name: '正常', value: '1' },
        { name: '冻结', value: '2' }
      ],
      tableData: [],
      formData: {
        name: '',
        account: '',
        status: '',
        pageNum: 1,
        pageSize: 5
      },
      deviceForm: {
        id: '',
        devicelst: []
      },
      areaForm: {
        id: '',
        arealst: []
      },
      addOrEditAdminDialogVisible: false
    }
  },
  filters: {
    formatData (value) {
      return formatTableDate(value)
    }
  },
  beforeMount () {
    this.getList()
  },
  mounted () {
    this.formData.pageSize = localStorage.getItem('USERSize') ? +localStorage.getItem('USERSize') : 5
  },
  methods: {
    getList () {
      adminList(this.formData).then(res => {
        this.tableData = res.data
        this.total = res.data.length
      })
    },
    query () {
      this.formData.pageSize = ''
      this.formData.pageNum = ''
      this.getList()
    },
    reset () {
      this.$refs['formData'].resetFields()
    },
    handleSizeChange: function (size) {
      localStorage.setItem('USERSize', size)
      this.formData.pageSize = size
      this.getList()
    },
    handleCurrentChange: function (currentPage) {
      this.formData.pageNum = currentPage
      this.getList()
    },
    addOrEdit (id) {
      this.addOrEditAdminDialogVisible = true
      this.$nextTick(() => {
        this.$refs.addOrEditAdminDialog.init(id)
      })
    },
    formatStatus: function (row, column) {
      return row.status === 1 ? '正常' : row.status === 2 ? '冻结' : '禁用'
    },
    setStatus (id, status) {
      setAdminStatus({ id: id, status: status }).then(res => {
        var code = res.code
        var message = res.message
        if (code === 200) {
          this.$message({
            showClose: true,
            message: message,
            type: 'success'
          })
          this.visible = false
          this.getList()
        } else {
          this.$message({
            showClose: true,
            message: message,
            type: 'error'
          })
        }
      })
    },
    initPassword (id) {
      initPassword({ id: id }).then(res => {
        var code = res.code
        var message = res.message
        if (code === 200) {
          this.$message({
            showClose: true,
            message: message,
            type: 'success'
          })
          this.visible = false
          this.getList()
        } else {
          this.$message({
            showClose: true,
            message: message,
            type: 'error'
          })
        }
      })
    },
    toSetDevice (id) {
      this.deviceForm.id = id
      this.checkDeviceVisible = true
    },
    submitCheckDevice (data) {
      this.deviceForm.devicelst = data
      this.checkDeviceVisible = false
      deviceSetControl(this.deviceForm)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: '设备配置成功',
              type: 'success'
            })
          }
        })
    },
    toSetArea (id) {
      this.areaForm.id = id
      this.checkAreaVisible = true
    },
    submitCheckArea (data) {
      this.areaForm.arealst = data
      this.checkAreaVisible = false
      areaSetControl(this.areaForm)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: '设备配置成功',
              type: 'success'
            })
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-footer {
  text-align: center;
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
