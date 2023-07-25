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
                     @click="toAddMusic">新增分类</el-button>
          <!-- <el-button type="primary"
                     @click="query">查询</el-button>
          <el-button type="primary"
                     @click="reset">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="container-table">
      <el-table :data="listData"
                border
                row-key="id"
                style="width: 100%"
                :header-cell-style="{ background: '#F2F2F2'}">
        <el-table-column prop="taskClass" label="分类名称" align="center"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="schoolId" :formatter="formatStatus" label="状态"  align="center"  show-overflow-tooltip/>
        <el-table-column label="操作"  align="center">
          <template slot-scope="scope">
            <el-button type="text"
              @click="toDeleteMusic(scope.row.id)"
              size="small">删除</el-button>
            <el-button type="text"
              @click="toEditMusic(scope.row)"
              size="small">编辑</el-button>
            <el-button @click="toChangeStatus(scope.row.id, scope.row.status == 1 ? 0 : 1)"
                       type="text"
                       size="small">{{scope.row.status == 1 ? '关闭' : '开启'}}</el-button>
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
    <addtype v-if="addVisible" :updateType="updateType" :updateData="updateForm" :visible.sync="addVisible" @submitHandle="submitHandle"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatTableDate } from '@/utils/date'
import { taskClassQuery, taskClassAdd, taskClassDelete, taskClassUpdate, taskClassUpdateStatus } from '@/api/task'
import addtype from './addTypeDialog'
export default {
  components: {
    addtype
  },
  name: 'classList',
  data () {
    return {
      total: 0,
      addVisible: false,
      listData: [],
      updateType: '',
      formData: {
      },
      updateForm: {
        musicid: ''
      },
      queryForm: {
        pageSize: 5,
        pageNum: 1
      }
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  beforeMount () {
    this.queryForm.pageSize = localStorage.getItem('taskClassificationSize') ? +localStorage.getItem('taskClassificationSize') : 5
    this.getList()
  },
  filters: {
    formatData (value) {
      return formatTableDate(value)
    }
  },
  methods: {
    getList () { // 获取课件分类列表
      taskClassQuery(this.queryForm)
        .then(res => {
          if (res.code === 200 && res.data.list.length > 0) {
            this.listData = res.data.list
            this.total = res.data.total
          }
        })
    },
    toDeleteMusic (id) { // 删除课件分类
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        taskClassDelete({classid: id})
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
    toChangeStatus (id, status) {
      taskClassUpdateStatus({classid: id, status: status})
        .then(res => {
          if (res.code === 200) {
            this.getList()
          }
        })
    },
    formatStatus: function (row, column) {
      return row.status === 1 ? '开启' : '关闭'
    },
    toAddMusic () { // 打开添加弹窗
      this.updateType = 'add'
      this.addVisible = true
    },
    toEditMusic (data) { // 打开编辑弹窗
      this.updateForm = data
      this.updateType = 'update'
      this.addVisible = true
    },
    submitHandle (data) { // 提交添加/编辑课件分类
      this.addVisible = false
      if (this.updateType === 'add') {
        taskClassAdd(data)
          .then(res => {
            if (res.code === 200) {
              this.getList()
            }
          })
      } else {
        taskClassUpdate(data)
          .then(res => {
            if (res.code === 200) {
              this.getList()
            }
          })
      }
    },
    handleSizeChange (size) {
      localStorage.setItem('taskClassificationSize', size)
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
