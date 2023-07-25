<template>
  <div>
    <!-- <div class="container-top">
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
        <el-form-item label="操作时间">
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
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="query">查询</el-button>
          <el-button type="primary"
                     @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <div class="container-table">
      <el-table :data="tableData"
                border
                style="width: 100%"
                :header-cell-style="{ background: '#F2F2F2' }">
        <el-table-column prop="taskName" label="任务名称" align="center" show-overflow-tooltip>
          <!-- <template slot="header" slot-scope="scope">
              {{ scope.column.label }}
              <span class="caret-wrapper">
                <i class="sort-caret ascending" @click="handlerSort(1)" />
                <i class="sort-caret descending" @click="handlerSort(0)" />
              </span>
            </template> -->
          </el-table-column>
        <el-table-column prop="taskTime" label="设定时间" align="center" show-overflow-tooltip>
          <!-- <template slot="header" slot-scope="scope">
              {{ scope.column.label }}
              <span class="caret-wrapper">
                <i class="sort-caret ascending" @click="handlerSort(1)" />
                <i class="sort-caret descending" @click="handlerSort(0)" />
              </span>
            </template> -->
          </el-table-column>
        <el-table-column label="播放设备" min-width="70" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-for="(item, index) of JSON.parse(scope.row.taskDeviceName)" :key="index">{{ item }}</div>
          </template>
        </el-table-column>
        <el-table-column label="任务音频" min-width="150" align="center" >
          <template slot-scope="scope">
            <div v-for="(item, index) of JSON.parse(scope.row.taskMusic)" :key="index">{{ item }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="taskResult" label="播放结果" min-width="60" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="updateTime" label="播放时间" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createTime | formatData }}</span>
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
  </div>
</template>

<script>
import { playLogList } from '@/api/operLog'
import { formatTableDate } from '@/utils/date'
export default {
  name: 'logList',
  data () {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      queryForm: {
        pageSize: 5,
        pageNum: 1
      }
    }
  },
  beforeMount () {
    this.queryForm.pageSize = localStorage.getItem('playLogSize') ? +localStorage.getItem('playLogSize') : 5
    this.getList()
  },
  filters: {
    formatData (value) {
      return formatTableDate(value)
    }
  },
  methods: {
    getList () {
      playLogList(this.queryForm).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
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
    handleSizeChange (size) {
      localStorage.setItem('playLogSize', size)
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
