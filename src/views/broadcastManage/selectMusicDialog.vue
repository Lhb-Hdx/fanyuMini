<template>
  <el-dialog title="选择音乐" :visible="visible" @close="closeHandle" :close-on-click-modal="false">
    <div class="addBox">
      <el-form :model="poster" ref="posterFrom" label-width="0px" size="small" :rules="rules">
        <el-form-item label="" prop="list" class="scroll-box">
          <el-checkbox-group v-model="poster.list" size="medium" @change="changeValue">
            <el-collapse accordion>
              <el-collapse-item v-for="(item, index) of list" :key="index" :title="item.name">
                <div>
                  <el-checkbox v-for="(ite, idx) of item.list" :label="ite.id" :key="idx">{{ite.musicName}}</el-checkbox>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import { queryMusic, queryMusicType } from '@/api/music'
export default {
  name: 'addSharePoster',
  props: ['visible', 'selectedmusic'],
  data () {
    return {
      list: [],
      musicList: [],
      poster: {
        list: []
      },
      rules: {
        id: [{ required: true, message: '请输入设备id', trigger: 'blur' }],
        list: [{ required: true, message: '请选择音乐', trigger: 'blur' }]
      }
    }
  },
  created () {
    // console.log(123)
  },
  beforeMount () {
    this.getTypeList()
    if (this.selectedmusic.length > 0) {
      let arr = []
      for (let m of this.selectedmusic) {
        arr.push(m.id)
      }
      this.poster.list = arr
    }
  },
  methods: {
    getTypeList () { // 获取音乐类型列表
      queryMusicType({pageSize: 100000, pageNum: 1})
        .then(res => {
          if (res.code === 200 && res.data.list.length > 0) {
            for (let n of res.data.list) {
              let obj = {
                name: n.musicType,
                list: []
              }
              this.list.push(obj)
            }
          }
          this.getMusicList()
        })
    },
    getMusicList () { // 获取音乐列表
      queryMusic({pageSize: 100000, pageNum: 1})
        .then(res => {
          if (res.code === 200 && res.data.list.length > 0) {
            this.musicList = res.data.list
            for (let m of this.list) {
              for (let n of res.data.list) {
                if (m.name === n.musicType) {
                  m.list.push(n)
                }
              }
            }
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
          let arr = []
          for (let m of this.poster.list) {
            for (let n of this.musicList) {
              if (m === n.id) {
                arr.push(n)
              }
            }
          }
          this.$emit('submitHandle', arr)
        }
      })
    },
    cancel () {
      this.$emit('update:visible', false)
      this.$emit('update:id', '')
    },
    changeValue (value) {
      // console.log(this.poster)
    }
  }
}
</script>

<style scoped>
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
.el-upload-list{
  width: 70% !important
}
.el-collapse-item__header {
  font-size: 16px;
}
</style>
