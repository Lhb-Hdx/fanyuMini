<template>
  <div>
    <div class="container-top">
      <el-form :inline="true"
               ref="formData"
               :model="formData"
               class="demo-form-inline"
               label-position="right"
               label-width="85px">
        <!-- <el-form-item label="区域名称"
                      prop="agentName">
          <el-input v-model="formData.area_name"
                    placeholder="区域名称"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary"
                     v-if="roles[0] != 3 && roles[0] != 5"
                     @click="toAddClass">新增</el-button>
                     <el-form-item label="" class="optionStyle">
              <el-input clearable v-model="queryForm.areaName" placeholder="搜索关键词" class="filter-item" style="width: 200px;margin-right: 10px;" />
            </el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
           <!--  <el-button type="primary"
                     @click="reset">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="container-table">
      <el-table :data="listData" border row-key="id" style="width: 100%" :header-cell-style="{ background: '#F2F2F2' }">
        <!-- <el-table-column type="selection" :reserve-selection="true"/> -->
        <el-table-column fixed prop="areaName" label="区域名称" min-width="90%" align="center"  show-overflow-tooltip/>
        <!-- <el-table-column prop="id" label="区域ID" align="center"  show-overflow-tooltip/>
        <el-table-column prop="schoolId" label="学校ID" min-width="50" align="center"  show-overflow-tooltip/> -->
        <el-table-column fixed="right" label="操作" align="center" >
          <template slot-scope="scope">
            <el-button type="text"
              @click="toEditClass(scope.row)"
              size="small">编辑区域信息</el-button>
            <el-button type="text"
              @click="toCheckClassDevice(scope.row.id)"
              size="small">查看区域设备</el-button>
            <el-button type="text"
              @click="toDeleteClass(scope.row.id)"
              size="small">删除区域</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-pagination">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="queryForm.pageNum"
                       :page-sizes="[5, 10, 20, 40]"
                       :page-size="queryForm.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>
    <addclass v-if="addVisible" :updateName="updateName" :updateType="updateType" :visible.sync="addVisible" @submitHandle="submitHandle"/>
    <checkdevice v-if="checkDeviceVisible" :visible.sync="checkDeviceVisible" :checkDeviceListId="checkDeviceListId" @submitHandle="submitCheckDevice"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatTableDate } from '@/utils/date'
import { areaQueryControl, areaAdd, areaUpdate, areaAddDevice, areaDelete } from '@/api/device'
import addclass from './addClassDialog'
import checkdevice from './checkDeviceDialog'
export default {
  components: {
    addclass,
    checkdevice
  },
  name: 'classList',
  data () {
    return {
      total: 0,
      addVisible: false,
      addDeviceVisible: false,
      checkDeviceVisible: false,
      listData: [],
      checkDeviceListId: '',
      updateType: '',
      updateName: '',
      formData: {
        area_id: '',
        area_name: ''
      },
      addDeviceForm: {
        id: '',
        list: []
      },
      queryForm: {
        pageSize: 5,
        pageNum: 1,
        areaName: null
      }
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  beforeMount () {
    this.queryForm.pageSize = localStorage.getItem('areaListSize') ? +localStorage.getItem('areaListSize') : 5
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
  methods: {
    query () {
      this.queryForm.pageNum = 1
      this.getList()
    },
    getList () { // 获取区域列表
      areaQueryControl(this.queryForm)
        .then(res => {
          if (res.code === 200 && res.data.list.length > 0) {
            this.listData = res.data.list
            this.total = res.data.total
          }
        })
    },
    toDeleteClass (id) { // 删除区域
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        areaDelete({area_id: id})
          .then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getList()
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    toAddClass () { // 打开添加区域弹窗
      this.updateType = 'add'
      this.addVisible = true
    },
    toEditClass (data) { // 打开编辑区域弹窗
      this.formData.area_id = data.id
      this.updateName = data.areaName
      this.updateType = 'update'
      this.addVisible = true
    },
    submitHandle (data) { // 提交添加/编辑区域
      this.addVisible = false
      if (this.updateType === 'add') {
        areaAdd({area_name: data})
          .then(res => {
            if (res.code === 200) {
              this.getList()
            }
          })
      } else {
        this.formData.area_name = data
        areaUpdate(this.formData)
          .then(res => {
            if (res.code === 200) {
              this.getList()
            }
          })
      }
    },
    toCheckClassDevice (id) { // 查看当前区域设备
      this.checkDeviceListId = id
      this.addDeviceForm.id = {area_id: id}
      this.checkDeviceVisible = true
    },
    submitCheckDevice (data) { // 配置当前区域的设备
      console.log(data)
      this.checkDeviceVisible = false
      this.addDeviceForm.list = data
      areaAddDevice(this.addDeviceForm)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: '修改设备成功',
              type: 'success'
            })
          }
        })
    },
    handleSizeChange (size) {
      localStorage.setItem('areaListSize', size)
      this.queryForm.pageSize = size
      this.getList()
    },
    handleCurrentChange (currentPage) {
      this.queryForm.pageNum = currentPage
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
.optionStyle {
  margin-left: 20px;
}
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
