<template>
  <el-dialog :title="title"
             :visible.sync="visible"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :show-close="false"
             width="50%">
    <div class="container-dialog">
      <el-form :model="form"
               class="demo-form-inline"
               label-position="center"
               label-width="">
        <el-form-item label=""
                      prop="context">
          <div v-html="form.context"></div>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   slot="append"
                   @click="close">关闭</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {
  pushContentDetail, readPushContent
} from '@/api/pushContent'
export default {
  name: 'contentDetailDialog',
  data () {
    return {
      visible: false,
      form: {},
      title: ''
    }
  },
  methods: {
    init (id, title) {
      this.title = title
      this.visible = true
      pushContentDetail({ id: id }).then(res => {
        this.form = res.data
        if (this.form.reserveOne !== '1') {
          readPushContent({ id: id }).then(res => {
          })
        }
      })
    },
    close () {
      this.visible = false
      this.$emit('pushContent')
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-footer {
  text-align: center;
}
.demo-form-inline {
  height: 500px;
  overflow-y: scroll;
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
