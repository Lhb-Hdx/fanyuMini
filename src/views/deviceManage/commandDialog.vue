<template>
  <div>
    <el-dialog title="批量处理" :visible="true" @close="closeHandle" :close-on-click-modal="false">
      <div class="addBox">
        <el-form :model="poster" ref="posterFrom" label-width="150px" size="small" :rules="rules">
          <el-form-item label="命令：" prop="commond">
            <el-input type="textarea" v-model="poster.commond" placeholder="请输入命令"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="disabled" :loading="dialogLoading" @click="onSubmit">提交</el-button>
            <el-button @click="closeHandle">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog title="处理结果" :visible.sync="showResultDialog" :close-on-click-modal="false">
      <div class="addBox">
        <el-form :model="poster" ref="posterFrom" label-width="0px" size="small">
          <el-form-item label="" class="scroll-box">
            <div class="table-wrapper">
              <el-table ref="table" :header-cell-style="{ background: '#F2F2F2' }" :data="list" fit highlight-current-row
                style="width: 100%">
                <el-table-column label="ID" prop="id" align="center" show-overflow-tooltip />
                <el-table-column label="结果" prop="result" align="center" show-overflow-tooltip />
              </el-table>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancel">关 闭</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { postCommonedApi } from '@/api/device'
export default {
  name: 'commondDialog',
  components: {
  },
  props: {
    selectList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      poster: {
        commond: ''
      },
      dialogLoading: false,
      showResultDialog: false,
      list: [],
      selectSnList: [],
      rules: {
        commond: [{ required: true, message: '请输入命令', trigger: 'blur' }]
      }
    }
  },
  computed: {
    disabled () {
      if (this.poster.commond === '') {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.selectList.forEach(item => {
      this.selectSnList.push(item.sn)
    })
  },
  methods: {
    cancel () {
      this.showResultDialog = false
    },
    closeHandle () {
      this.$emit('commandClose')
    },
    onSubmit () {
      this.$refs['posterFrom'].validate(valid => {
        if (valid) {
          this.dialogLoading = true
          postCommonedApi({ cmd: this.poster.commond, sn: this.selectSnList })
            .then(res => {
              this.dialogLoading = false
              if (res.code === 200) {
                this.list = Object.keys(res.data).map(key => ({ id: key, result: res.data[key] }))
                this.showResultDialog = true
              }
            })
        }
      })
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
.el-upload-list {
  width: 70% !important
}
</style>
