<template>
  <div>
    <div class="container-top">
      <el-form :inline="true"
               ref="formData"
               :model="formData"
               class="demo-form-inline"
               label-position="right"
               label-width="85px">
        <el-form-item label="资源类型"
                      prop="agentName">
          <el-input v-model="queryForm.music_type"
                    placeholder="资源类型"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="query">查询</el-button>
          <el-button type="primary"
                     v-if="roles[0] != 3 && roles[0] != 5"
                     @click="toAddMusic">新增资源</el-button>
          <!-- <el-button type="primary"
                     @click="reset">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="container-table">
      <el-table :data="listData"
                border
                row-key="id"
                style="width: 100%"
                :header-cell-style="{ background: '#F2F2F2' }">
        <el-table-column prop="musicName" label="资源名称" align="center"  show-overflow-tooltip>
          <!-- <template slot="header" slot-scope="scope">
              {{ scope.column.label }}
              <span class="caret-wrapper">
                <i class="sort-caret ascending" @click="handlerSort(1)" />
                <i class="sort-caret descending" @click="handlerSort(0)" />
              </span>
            </template> -->
        </el-table-column>
        <el-table-column prop="musicType" label="资源类型" align="center"  show-overflow-tooltip>
          <!-- <template slot="header" slot-scope="scope">
              {{ scope.column.label }}
              <span class="caret-wrapper">
                <i class="sort-caret ascending" @click="handlerSort(1)" />
                <i class="sort-caret descending" @click="handlerSort(0)" />
              </span>
            </template> -->
        </el-table-column>
        <!-- <el-table-column prop="schoolId"
                         label="学校ID"
                         min-width="50">
        </el-table-column> -->
        <el-table-column label="操作"  align="center"  show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text"
              @click="toDeleteMusic(scope.row.id)"
              size="small">删除</el-button>
            <el-button type="text"
              @click="toEditMusic(scope.row)"
              size="small">编辑</el-button>
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
    <addmusic v-if="addVisible" :updateType="updateType" :updateData="updateForm" :visible.sync="addVisible" @submitHandle="submitHandle"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatTableDate } from '@/utils/date'
import { queryMusic, addMusic, modifyMusic, deleteMusic } from '@/api/music'
import addmusic from './addMusicDialog'
export default {
  components: {
    addmusic
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
        music_type: '',
        pageSize: 5,
        pageNum: 1
      }
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  beforeMount () {
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
    this.queryForm.pageSize = localStorage.getItem('mediaResourcesSize') ? +localStorage.getItem('mediaResourcesSize') : 5
  },
  methods: {
    query () {
      // this.queryForm.pageSize = 5
      this.queryForm.pageNum = 1
      this.getList()
    },
    getList () { // 获取资源列表
      queryMusic(this.queryForm)
        .then(res => {
          if (res.code === 200 && res.data.list.length > 0) {
            this.listData = res.data.list
            this.total = res.data.total
          }
        })
    },
    toDeleteMusic (id) { // 删除资源
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMusic({music_id: id})
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
    toAddMusic () { // 打开添加区域弹窗
      this.updateType = 'add'
      this.addVisible = true
    },
    toEditMusic (data) { // 打开编辑区域弹窗
      this.updateForm = data
      this.updateType = 'update'
      this.addVisible = true
    },
    submitHandle (data) { // 提交添加/编辑资源
      this.addVisible = false
      if (this.updateType === 'add') {
        addMusic(data)
          .then(res => {
            if (res.code === 200) {
              this.getList()
            }
          })
      } else {
        modifyMusic(data)
          .then(res => {
            if (res.code === 200) {
              this.getList()
            }
          })
      }
    },
    handleSizeChange (size) {
      localStorage.setItem('mediaResourcesSize', size)
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
