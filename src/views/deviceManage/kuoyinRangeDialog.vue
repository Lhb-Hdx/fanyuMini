<template>
  <el-dialog class="elDialog" title="扩音范围" :visible="visible" @close="closeHandle" :close-on-click-modal="false">
    <div class="addBox">
      <el-form :model="poster" ref="posterFrom" label-width="0px" size="small" :rules="rules">
        <el-form-item label="" class="scroll-box">
          <!-- <el-checkbox-group v-model="poster.list" size="medium" @change="changeValue">
            <el-checkbox v-for="(item, index) of list" :label="index" :key="index">{{item.deviceName}}</el-checkbox>
          </el-checkbox-group> -->
          <div class="table-wrapper">
            <el-table ref="table" :header-cell-style="{ background: '#F2F2F2' }" :data="list" fit highlight-current-row
              :row-key="getRowKeys" style="width: 100%" @select="handleSelect" @selection-change="handleSelectionChange">
              <el-table-column type="selection" :reserve-selection="true" />
              <el-table-column label="设备名称" prop="deviceName" show-overflow-tooltip />
              <el-table-column label="设备ID" prop="id" show-overflow-tooltip />
            </el-table>
            <!-- <el-pagination @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="queryForm.pageNum"
                  :page-sizes="[5, 10, 20, 40]"
                  :page-size="queryForm.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
            </el-pagination> -->
          </div>
          <div class="table-pagination">

          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import { queryKuoyinDevicePage } from '@/api/device'
export default {
  name: 'addSharePoster',
  props: ['visible', 'sn'],
  data () {
    return {
      total: 0,
      list: [],
      poster: {
        list: []
      },
      rules: {
        id: [{ required: true, message: '请输入设备id', trigger: 'blur' }],
        deviceName: [{ required: true, message: '请输入设备名称', trigger: 'blur' }]
      },
      queryForm: {
        pageSize: 99999,
        pageNum: 1
      },
      ideField: 'id', // 匹配的字段，用id
      allSelection: [] // 所有页面选择的
    }
  },
  created () {
    // console.log(123)
  },
  beforeMount () {
    this.getList()
  },
  methods: {
    getList () { // 查询扩音设备
      queryKuoyinDevicePage({ zhujiao_sn: this.sn, pageSize: this.queryForm.pageSize, pageNum: this.queryForm.pageNum })
        .then(res => {
          if (res.code === 200) {
            this.list = res.data.list
            this.total = res.data.total
            setTimeout(() => {
              res.data.list.forEach((item, indx) => {
                if (item.deviceStatus === 1) {
                  // this.poster.list.push(indx)
                  // 设置选中，记住table组件需要使用ref="table"
                  this.$refs.table.toggleRowSelection(this.list[indx], true)
                  console.log(this.list[indx])
                }
              })
            }, 0)
          }
        })
    },
    // 获取行键
    getRowKeys (row) {
      return row.id
    },
    handleSizeChange (size) {
      this.queryForm.pageSize = size
      this.getList()
    },
    handleCurrentChange (currentPage) {
      this.queryForm.pageNum = currentPage
      this.getList()
    },
    closeHandle () {
      this.$emit('update:id', '')
      this.$emit('update:visible', false)
      this.$emit('update:bankId', null)
    },
    // 保存设备的选择
    handleSelect (rows, row) {
      let handleSelected = rows.length && rows.indexOf(row) !== -1
      if (!handleSelected) {
        this.allSelection = this.allSelection.filter(it => it[this.ideField] !== row[this.ideField])
      }
    },
    // 改变设备选择
    handleSelectionChange (val) {
      this.multipleSelection = val
      let setPagingSelection = [...this.allSelection, ...val]
      setPagingSelection = setPagingSelection.map(it => JSON.stringify(it))
      setPagingSelection = [...new Set(setPagingSelection)].map(item => JSON.parse(item))
      this.allSelection = setPagingSelection
    },
    onSubmit () {
      this.$refs['posterFrom'].validate(valid => {
        if (valid) {
          let array = []
          // for (let n of this.poster.list) {
          for (let n of this.allSelection) {
            // this.list[n].deviceStatus = 1
            // array.push(this.list[n].sn)
            array.push(n.sn)
          }
          console.log(array)
          this.$emit('submitHandle', array)
        }
      })
    },
    cancel () {
      this.$emit('update:visible', false)
      this.$emit('update:id', '')
    },
    changeValue (value) {
      console.log(this.poster)
    }
  }
}
</script>

<style scoped scss="less">
.scroll-box {
  height: 50vh;
  overflow-y: scroll;
}

.el-input {
  width: 70%
}

.addBox {
  padding: 0 35px;
  margin: 0 auto;
}
</style>
<style>
.el-upload-list {
  width: 70% !important
}
</style>
