<template>
  <el-dialog title="安全退出"
             :visible.sync="visible"
             width="40%"
             center>
    <span>确认要退出当前登录吗？</span>
    <span slot="footer"
          class="dialog-footer">
      <el-button type="primary"
                 @click="logout">确定</el-button>
      <el-button type="primary"
                 @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { logout } from '@/api/login'
export default {
  name: 'logoutDialog',
  data () {
    return {
      visible: true
    }
  },
  methods: {
    logout () {
      logout().then(res => {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
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
