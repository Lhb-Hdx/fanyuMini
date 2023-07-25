<template>
  <div>
    <div class="container-top">
      <el-form :inline="true" ref="formData" :model="formData" class="demo-form-inline" label-position="right">
        <el-form-item label="新增任务类型">
          <el-select v-model="typeValue" placeholder="请选择">
            <el-option v-for="(item, index) of options" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toAddTask">新增</el-button>
          <el-button type="primary" @click="toSetDate">设置屏蔽日期</el-button>
          <!-- <el-button type="primary"
                     @click="reset">重置</el-button> -->
        </el-form-item>
        <el-form-item label="任务分类">
          <el-select v-model="queryForm.classname" placeholder="请选择">
            <el-option label="全部" :value="null"></el-option>
            <el-option v-for="(item, index) of classListData" :key="index" :label="item.taskClass"
              :value="item.taskClass">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-table">
      <el-table :data="listData" border row-key="id" style="width: 100%" :header-cell-style="{ background: '#F2F2F2' }">
        <el-table-column prop="taskName" align="center" label="任务名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="className" label="任务分类" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="taskTime" label="执行时间" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="taskTime" label="执行星期" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-for="(item, index) of JSON.parse(scope.row.reverOne)" :key="index">
              {{ item === '*' ? '全部'
                : item === '1' ? '星期一'
                  : item === '2' ? '星期二'
                    : item === '3' ? '星期三'
                      : item === '4' ? '星期四'
                        : item === '5' ? '星期五'
                          : item === '6' ? '星期六'
                            : item === '7' ? '星期日'
                              : '' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="播放设备" min-width="50" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-for="(item, index) of JSON.parse(scope.row.taskDevice)" :key="index">{{ item.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="播放区域" min-width="50" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-for="(item, index) of JSON.parse(scope.row.taskArea)" :key="index">{{ item.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="任务音频" min-width="50" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-for="(item, index) of JSON.parse(scope.row.taskMusic)" :key="index">{{ item.name }}</div>
            <div>{{ scope.row.menuName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="音频分类" min-width="50" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ scope.row.taskFenlei === 'voice' ? '录音' : scope.row.taskFenlei === 'music' ? '音乐' :
              scope.row.taskFenlei === 'text' ? '文字转语音' : '' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button type="text" v-if="roles[0] != 3 && roles[0] != 5" @click="toDeleteTask(scope.row.id)"
              size="small">删除</el-button>
            <el-button type="text" v-if="roles[0] != 3 && roles[0] != 5" @click="toupdateTask(scope.row)"
              size="small">编辑</el-button>
            <el-button type="text" @click="toContro(scope.row, 'play')" size="small">播放</el-button>
            <el-button type="text" @click="toContro(scope.row, 'pause')" size="small">暂停</el-button>
            <el-button type="text" v-if="playForm.action === 'pause'" @click="toContro(scope.row, 'resume')"
              size="small">恢复播放</el-button>
            <el-button type="text" @click="toContro(scope.row, 'stop')" size="small">停止</el-button>
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
    <addtexttask v-if="addTextVisible" :updateTask="updateTask" :updateData="updateData" :addType="2"
      :visible.sync="addTextVisible" @submitHandle="submitHandle" />
    <addmusictask v-if="addMusicVisible" :updateTask="updateTask" :updateData="updateData" :addType="2"
      :visible.sync="addMusicVisible" @submitHandle="submitHandle" />
    <addvoicetask v-if="addVoiceVisible" :updateTask="updateTask" :updateData="updateData" :addType="2"
      :visible.sync="addVoiceVisible" @submitHandle="submitHandle" />
    <addforbidendate v-if="addforbidendateVisible" :visible.sync="addforbidendateVisible"
      @submitHandle="submitaddforbidendate" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatTableDate } from '@/utils/date'
import { taskQuery, taskDelete, taskAdd, taskUpdate, restDayAdd, taskClassQuery, taskToPlay } from '@/api/task'
import addtexttask from './addTextTaskDialog'
import addmusictask from './addMusicTaskDialog'
import addvoicetask from './addVoiceTaskDialog'
import addforbidendate from './setDateDialog'
export default {
  components: {
    addtexttask,
    addmusictask,
    addvoicetask,
    addforbidendate
  },
  name: 'classList',
  data () {
    return {
      total: 0,
      typeValue: 0,
      addTextVisible: false,
      addMusicVisible: false,
      addVoiceVisible: false,
      addforbidendateVisible: false,
      updateTask: false,
      updateData: {},
      listData: [], // 列表数据
      classListData: [], // 课件类型列表
      options: [
        { label: '文字', value: 0 },
        { label: '录音', value: 1 },
        { label: '音乐', value: 2 }
      ],
      updateForm: {
        taskid: '',
        oTaskParam: {}
      },
      forbidenForm: {
        lst: []
      },
      formData: {},
      queryForm: {
        type: 2,
        classname: null,
        pageSize: 5,
        pageNum: 1
      },
      playForm: {
        action: '',
        taskid: ''
      }
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  beforeMount () {
    this.queryForm.pageSize = localStorage.getItem('recurringTaskSize') ? +localStorage.getItem('recurringTaskSize') : 5
    this.getList()
    this.getClassList()
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
    toContro (data, state) { // 播放控制
      this.playForm.action = state
      this.playForm.taskid = data.id
      taskToPlay(this.playForm)
    },
    getClassList () { // 获取课件分类列表
      taskClassQuery({ pageSize: 100000, pageNum: 1 })
        .then(res => {
          if (res.code === 200 && res.data.list.length > 0) {
            this.classListData = res.data.list
          }
        })
    },
    getList () { // 获取任务列表，2循环任务
      taskQuery(this.queryForm)
        .then(res => {
          if (res.code === 200 && res.data.list.length > 0) {
            this.listData = res.data.list
            this.total = res.data.total
          } else {
            this.listData = []
          }
        })
    },
    toDeleteTask (id) { // 删除任务
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        taskDelete({ taskid: id })
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
    toupdateTask (data) { // 打开编辑的弹窗
      this.updateTask = true
      this.updateData = data
      this.updateForm.taskid = data.id
      if (data.taskFenlei === 'text') {
        this.addTextVisible = true
      } else if (data.taskFenlei === 'voice') {
        this.addVoiceVisible = true
      } else if (data.taskFenlei === 'music') {
        this.addMusicVisible = true
      }
    },
    toAddTask () { // 按类型打开添加任务弹窗
      this.updateTask = false
      this.updateData = {}
      if (this.typeValue === 0) {
        this.addTextVisible = true
      } else if (this.typeValue === 1) {
        this.addVoiceVisible = true
      } else if (this.typeValue === 2) {
        this.addMusicVisible = true
      }
    },
    submitHandle (data) { // 提交添加任务
      this.addTextVisible = false
      this.addMusicVisible = false
      this.addVoiceVisible = false
      if (this.updateTask) {
        this.updateForm.oTaskParam = data
        taskUpdate(this.updateForm)
          .then(res => {
            if (res.code === 200) {
              this.getList()
            }
          })
      } else {
        taskAdd(data)
          .then(res => {
            if (res.code === 200) {
              this.getList()
            }
          })
      }
    },
    toSetDate () { // 打开设置日期的弹窗
      this.addforbidendateVisible = true
    },
    submitaddforbidendate (data) { // 提交禁用的日期
      this.forbidenForm.lst = data
      this.addforbidendateVisible = false
      restDayAdd(this.forbidenForm)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: '设置成功',
              type: 'success'
            })
          }
        })
    },
    handleSizeChange (size) {
      localStorage.setItem('recurringTaskSize', size)
      this.queryForm.pageSize = size
      this.getList()
    },
    handleCurrentChange (currentPage) {
      this.queryForm.pageNum = currentPage
      this.getList()
    },
    toQuery () {
      this.queryForm.pageNum = 1
      // this.queryForm.pageSize = 5
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
