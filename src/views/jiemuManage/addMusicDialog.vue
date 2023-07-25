<template>
  <el-dialog :title="updateType === 'add' ? '添加节目' : '编辑节目'" width="80%" :visible="visible" @close="closeHandle"
    :close-on-click-modal="false">
    <div class="addBox">
      <el-form :model="posterOne" ref="posterFrom" label-width="100px" size="small" :rules="rules">
        <el-form-item label="节目名称：" prop="music_name">
          <el-input v-model="posterOne.music_name" placeholder="节目名称"></el-input>
        </el-form-item>
        <el-form-item label="节目单：">
          <div class="jiemu-box">
            <div class="jiemu-box-left">
              <div class="jiemu-box-left-top">
                <el-form-item>
                  <el-select v-model="queryForm.music_type" @change="getMusicListOfType" placeholder="请选择类型">
                    <el-option v-for="(item, index) of typeList" :key="index" :label="item.musicType"
                      :value="item.musicType">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="jiemu-box-left-table">
                <el-table :data="listData" border row-key="id" style="width: 100%">
                  <el-table-column prop="musicName" label="资源名称">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" @click="toAddMusic(scope.row)" size="small">添加</el-button>
                      <!-- <el-button type="text"
                        @click="toEditMusic(scope.row)"
                        size="small">编辑</el-button> -->
                    </template>
                  </el-table-column>
                </el-table>
                <div class="table-pagination">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="queryForm.pageNum" :page-size="queryForm.pageSize" :page-sizes="[5, 10, 20, 40]"
                    :pager-count="4" layout="total, prev, pager, next, jumper" small :total="total">
                  </el-pagination>
                </div>
              </div>
            </div>
            <div class="jiemu-box-right">
              <div class="jiemu-box-left-top">
                <el-form-item>
                  <el-button type="primary" @click="addListData = []">清空列表</el-button>
                </el-form-item>
              </div>
              <div class="jiemu-box-right-table">
                <el-table :data="addListData" border row-key="id" style="width: 100%">
                  <el-table-column prop="name" label="资源名称">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" @click="toDeleteMusic(scope.$index)" size="small">移除</el-button>
                      <!-- <el-button type="text"
                        @click="toEditMusic(scope.row)"
                        size="small">编辑</el-button> -->
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import { queryMusicType, queryMusic } from '@/api/music'
import { getMusicMenuDetail } from '@/api/jiemu'
import musicUpload from '@/components/Upload/musicUpload'
export default {
  name: 'addSharePoster',
  props: ['visible', 'updateType', 'updateData'],
  components: {
    musicUpload
  },
  data () {
    return {
      addType: 'aliyun',
      total: '',
      addTotal: '',
      listData: [], // 音乐列表
      addListData: [], // 添加音乐列表
      typeList: [], // 音乐类型列表
      uploadType: [
        { value: 'local', name: '本地服务器' },
        { value: 'aliyun', name: '云端服务器' }
      ],
      posterOne: {
        music_name: '',
        url: '',
        type: ''
      },
      queryForm: {
        music_type: '',
        pageSize: 5,
        pageNum: 1
      },
      rules: {
        music_name: [
          { required: true, message: '请输入节目名称', trigger: 'blur' }
        ],
        url: [{ required: true, message: '请上传节目', trigger: 'blur' }],
        type: [{ required: true, message: '请选择节目类型', trigger: 'blur' }]
      }
    }
  },
  created () {
    // console.log(123)
  },
  beforeMount () {
    if (this.updateType === 'update') {
      this.getDetail(this.updateData.id)
      // this.posterOne.music_name = this.updateData.musicName
      // this.posterOne.type = this.updateData.musicType
      // this.posterOne.music_id = this.updateData.id
      // this.posterOne.url = this.updateData.musicPath
    }
    this.getTypeList()
    this.getMusicList()
  },
  methods: {
    changeUploadType () {
      this.posterOne.url = ''
    },
    getDetail (id) {
      // 获取节目详情
      getMusicMenuDetail({ menunid: id }).then(res => {
        if (res.code === 200) {
          this.posterOne.music_name = res.data[0].menuName
          for (let n of res.data) {
            let obj = {}
            obj.name = n.musicName
            obj.id = n.musicId
            this.addListData.push(obj)
          }
        }
      })
    },
    toDeleteMusic (index) {
      // 将音乐从列表移除
      this.addListData.splice(index, 1)
    },

    toAddMusic (data) {
      // 将音乐添加到列表
      let num = 0
      let obj = {}
      obj.id = data.id
      obj.name = data.musicName
      if (this.addListData.length === 0) {
        this.addListData.push(obj)
        this.addTotal = this.addListData.length
      } else {
        for (let n of this.addListData) {
          if (n.id === data.id) {
            num = 1
            break
          }
        }
        if (num === 1) {
          this.$message.error('此资源已经添加')
        } else {
          this.addListData.push(obj)
          this.addTotal = this.addListData.length
        }
      }
    },
    getMusicListOfType () {
      // 根据所选类型获取对应的音乐列表
      this.queryForm.pageSize = 5
      this.queryForm.pageNum = 1
      this.getMusicList()
    },
    getMusicList () {
      // 获取音乐列表
      queryMusic(this.queryForm).then(res => {
        if (res.code === 200 && res.data.list.length > 0) {
          this.listData = res.data.list
          this.total = res.data.total
        }
      })
    },
    handleSizeChange (size) {
      this.queryForm.pageSize = size
      this.getMusicList()
    },
    handleCurrentChange (currentPage) {
      this.queryForm.pageNum = currentPage
      this.getMusicList()
    },
    getTypeList () {
      // 获取音乐类型列表
      queryMusicType({ pageSize: 100000, pageNum: 1 }).then(res => {
        if (res.code === 200 && res.data.list.length > 0) {
          this.typeList = res.data.list
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
          if (this.addListData.length > 0) {
            if (this.updateType === 'update') {
              this.$emit('submitHandle', {
                menuname: { menuid: this.updateData.id },
                formData: this.addListData
              })
            } else {
              this.$emit('submitHandle', {
                menuname: { menuname: this.posterOne.music_name },
                formData: this.addListData
              })
            }
          } else {
            this.$message.error('请选择资源')
          }
        }
      })
    },
    cancel () {
      this.$emit('update:visible', false)
      this.$emit('update:id', '')
    }
  }
}
</script>

<style lang="less" scoped>
.el-input {
  /* width: 70% */
}

.addBox {
  /* width: 600px; */
  padding: 0px;
  margin: 0 auto;
}

.jiemu-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .jiemu-box-left,
  .jiemu-box-right {
    width: 49%;
    height: 460px;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    padding: 10px;
  }
}

.table-pagination {
  margin-top: 10px;
}

.jiemu-box-right-table {
  height: 390px;
  overflow-y: scroll;
}
</style>
<style>
.el-upload-list {
  width: 70% !important;
}
</style>
