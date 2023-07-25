<template>
  <div>
    <div class="container-top">
      <el-form :inline="true"
               class="demo-form-inline"
               label-position="right"
               label-width="85px">
        <el-form-item>
          <el-button type="primary"
                     @click="addOrEdit('')">添加角色</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-table">
      <el-table :data="tableData"
                border
                style="width: 100%">
        <el-table-column fixed
                         prop="name"
                         label="角色名称">
        </el-table-column>
        <el-table-column prop="name"
                         label="修改人"
                         min-width="120">
        </el-table-column>
        <el-table-column prop="createTime"
                         label="最后修改时间"
                         min-width="120">
          <!-- <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createTime | formatData }}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="status"
                         :formatter="formatStatus"
                         label="状态"
                         min-width="120">
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         min-width="100">
          <template slot-scope="scope">
            <el-button @click="addOrEdit(scope.row.id)"
                       type="text"
                       size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <addOrEditRoleDialog v-if="addOrEditRoleDialogVisible"
                         @list="getList"
                         ref="addOrEditRoleDialog"></addOrEditRoleDialog>
  </div>
</template>

<script>
import { roleList } from '@/api/role'
import addOrEditRoleDialog from './addOrEditRoleDialog'
import { formatTableDate } from '@/utils/date'
export default {
  name: 'roleList',
  components: {
    addOrEditRoleDialog
  },
  data () {
    return {
      tableData: [],
      addOrEditRoleDialogVisible: false
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
  methods: {
    getList () {
      roleList().then(res => {
        this.tableData = res.data
      })
    },
    addOrEdit (id) {
      this.addOrEditRoleDialogVisible = true
      this.$nextTick(() => {
        this.$refs.addOrEditRoleDialog.init(id)
      })
    },
    formatStatus: function (row, column) {
      return row.status === 1
        ? '正常'
        : row.status === 2
          ? '冻结'
          : '禁用'
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-footer {
  text-align: center;
}
.container-dialog {
  padding: 0 20px;
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
