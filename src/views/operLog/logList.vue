<template>
  <div>
    <div class="container-top">
      <el-form :inline="true"
               ref="formData"
               :model="formData"
               class="demo-form-inline"
               label-position="right"
               label-width="85px">
        <el-form-item label="角色账号"
                      prop="name">
          <el-input v-model="formData.name"
                    placeholder="角色账号"></el-input>
        </el-form-item>
        <el-form-item label="操作内容"
                      prop="operContent">
          <el-input v-model="formData.operContent"
                    placeholder="操作内容"></el-input>
        </el-form-item>
        <!-- <el-form-item label="操作时间">
          <el-col :span="11">
            <el-form-item prop="startTime">
              <el-date-picker type="date"
                              placeholder="开始日期"
                              v-model="formData.startTime"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line"
                  :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="endTime">
              <el-date-picker type="date"
                              placeholder="结束日期"
                              v-model="formData.endTime"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary"
                     @click="query">查询</el-button>
          <el-button type="primary"
                     @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-table">
      <el-table :data="tableData"
                border
                style="width: 100%"
                :header-cell-style="{ background: '#F2F2F2' }">
        <el-table-column fixed
                         prop="operName"
                         label="角色账号"
                         min-width="100"
                         align="center"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="cmdName"
                         label="操作内容"
                         min-width="120"
                         align="center"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="clientIp"
                         label="IP"
                         min-width="120"
                         align="center"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="updateTime"
                         label="操作时间"
                         min-width="100"
                         align="center"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.updateTime | formatData }}</span>
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
  </div>
</template>

<script>
import { logList } from '@/api/operLog'
import { formatTableDate } from '@/utils/date'
export default {
  name: 'logList',
  data () {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      formData: {
        name: '',
        operContent: '',
        startTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 5
      }
    }
  },
  beforeMount () {
    this.getList()
  },
  mounted () {
    this.formData.pageSize = localStorage.getItem('operationLogSize') ? +localStorage.getItem('operationLogSize') : 5
  },
  filters: {
    formatData (value) {
      return formatTableDate(value)
    }
  },
  methods: {
    handlerSort (val) {
      console.log(val)
    },
    getList () {
      logList(this.formData).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    query () {
      // this.formData.pageSize = ''
      this.formData.pageNum = 1
      this.getList()
    },
    reset () {
      this.$refs['formData'].resetFields()
    },
    handleSizeChange: function (size) {
      localStorage.setItem('operationLogSize', size)
      this.formData.pageSize = size
      this.getList()
    },
    handleCurrentChange: function (currentPage) {
      this.formData.pageNum = currentPage
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
// /deep/ .el-table thead {
//   color: #fff;
//   font-weight: 500;
// }
// /deep/ .el-table th,
// /deep/ .el-table tr,
// /deep/ .el-table tr{
//     background-color: transparent;
//     border-bottom:  1px solid rgb(66, 115, 155);
// }
// /deep/ .el-table td,.building-top .el-table th.is-leaf {
//     border-bottom:  1px solid rgb(66, 115, 155);
//  }
// /deep/ .container-table {
//   background-color: transparent !important;
// }
// /deep/ .container-box .container-table {
//   border-bottom:  1px solid rgb(19,43,62);

// }
// /deep/ .el-table tr{
//     background-color: rgb(19,43,62);
// }

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
