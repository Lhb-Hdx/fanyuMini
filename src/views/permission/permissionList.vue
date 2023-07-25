<template>
  <div>
    <div class="container-table">
      <el-table :data="tableData"
                border
                style="width: 100%"
                :header-cell-style="{ background: '#F2F2F2' }">
        <el-table-column fixed prop="name" label="名称" min-width="100" align="center" show-overflow-tooltip/>
        <el-table-column prop="value" label="属性" min-width="120" align="center" show-overflow-tooltip/>
        <el-table-column prop="type" label="类型" min-width="120" align="center" show-overflow-tooltip/>
        <el-table-column prop="uri" label="链接" min-width="120" align="center" show-overflow-tooltip/>
        <el-table-column prop="createTime" label="创建时间" min-width="100" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createTime | formatData }}</span>
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
import { permissionList } from '@/api/permission'
import { formatTableDate } from '@/utils/date'
export default {
  name: 'permissionList',
  data () {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      formData: {
        pageNum: 1,
        pageSize: 5
      },
      tableData: []
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
    this.formData.pageSize = localStorage.getItem('rightsManagementSize') ? +localStorage.getItem('manualTasksSize') : 5
  },
  methods: {
    handlerSort (val) {
      console.log(val)
    },
    getList () {
      permissionList(this.formData).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    handleSizeChange: function (size) {
      console.log(size)
      localStorage.setItem('rightsManagementSize', size)
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
