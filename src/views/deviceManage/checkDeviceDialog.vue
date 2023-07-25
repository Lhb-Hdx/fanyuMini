<template>
  <el-dialog title="区域设备" :visible="visible" @close="closeHandle" :close-on-click-modal="false">
    <div class="addBox">
      <el-form :model="poster" ref="posterFrom" label-width="0px" size="small" :rules="rules">
        <el-form-item label="" class="scroll-box">
          <!-- <el-checkbox-group v-model="poster.list" size="medium" @change="changeValue">
            <el-checkbox v-for="(item, index) of list" :label="index" :key="index">{{item.deviceName}}</el-checkbox>
          </el-checkbox-group> -->
          <div class="table-wrapper">
            <el-table ref="table" :header-cell-style="{ background: '#F2F2F2' }" :data="list" fit highlight-current-row :row-key="getRowKeys" style="width: 100%" @select="handleSelect" @selection-change="handleSelectionChange">
              <el-table-column type="selection" :reserve-selection="true"/>
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
import { queryAllDeviceByPage } from '@/api/device'
export default {
  name: 'addSharePoster',
  props: ['visible', 'checkDeviceListId'],
  data () {
    return {
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
      total: 0,
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
    handleSizeChange (size) {
      this.queryForm.pageSize = size
      this.getList()
    },
    handleCurrentChange (currentPage) {
      this.queryForm.pageNum = currentPage
      this.getList()
    },
    // 获取行键
    getRowKeys (row) {
      return row.id
    },
    // 保存的选择
    handleSelect (rows, row) {
      let handleSelected = rows.length && rows.indexOf(row) !== -1
      if (!handleSelected) {
        this.allSelection = this.allSelection.filter(it => it[this.ideField] !== row[this.ideField])
      }
    },
    // 改变选择
    handleSelectionChange (val) {
      this.multipleSelection = val
      let setPagingSelection = [...this.allSelection, ...val]
      setPagingSelection = setPagingSelection.map(it => JSON.stringify(it))
      setPagingSelection = [...new Set(setPagingSelection)].map(item => JSON.parse(item))
      this.allSelection = setPagingSelection
    },
    getList () { // 根据区域id查询所有设备
      queryAllDeviceByPage({area_ids: this.checkDeviceListId, pageSize: this.queryForm.pageSize, pageNum: this.queryForm.pageNum})
        .then(res => {
          if (res.code === 200) {
            console.log(res)
            this.list = res.data.list
            this.total = res.data.total
            res.data.list.forEach((item, indx) => {
              if (item.deviceStatus === 1) {
                console.log(this.list[indx])
                // this.poster.list.push(indx)
                this.$refs.table.toggleRowSelection(this.list[indx], true)
              }
            })
          }
        })
    },
    closeHandle () {
      this.$emit('update:id', '')
      this.$emit('update:visible', false)
      this.$emit('update:bankId', null)
    },
    onSubmit () {
      this.$refs['posterFrom'].validate(valid => {
        if (valid) {
          let array = []
          // for (let n of this.poster.list) {
          console.log(this.allSelection)
          for (let n of this.allSelection) {
            // this.list[n].deviceStatus = 1
            // array.push(this.list[n])
            array.push(n)
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

<style scoped>
.el-input {
  width: 70%
}
.scroll-box {
  height: 50vh;
  overflow-y: scroll;
}
.addBox {
  /* width: 600px; */
  padding: 0 35px;
  margin: 0 auto;
}
</style>
<style>
.el-upload-list{
  width: 70% !important
}
</style>
