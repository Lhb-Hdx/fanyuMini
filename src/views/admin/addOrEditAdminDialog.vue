<template>
  <el-dialog :title="!form.id?'新建用户':'编辑用户'"
             :visible.sync="visible"
             ref="form"
             width="30%">
    <div class="container-dialog">
      <el-form ref="form"
               :rules="rules"
               :model="form"
               class="demo-form-inline"
               label-position="right"
               label-width="80px">
        <el-form-item label="登录账号"
                      prop="username"
                      label-width="100px">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item v-if="!form.id"
                      label="密码"
                      prop="password"
                      label-width="100px">
          <el-input type="password"
                    v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item v-if="!form.id"
                      label="确认密码"
                      prop="confirmPassword"
                      label-width="100px">
          <el-input type="password"
                    v-model="form.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名"
                      prop="nickName"
                      label-width="100px">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话"
                      prop="mobileno"
                      label-width="100px">
          <el-input v-model="form.mobileno"></el-input>
        </el-form-item>
        <el-form-item label="所属权限组"
                      label-width="100px">
          <el-select v-model="form.roleId"
                     placeholder="所属权限组">
            <el-option v-for="(item, index) of list"
                       :key="index"
                       :label="item.name"
                       :value="item.id"
                       @click.native="option_click_handler(item)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态"
                      prop="status"
                      label-width="100px">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-tree :data="treeData"
                 ref="tree"
                 show-checkbox
                 :default-checked-keys="checkedData"
                 node-key="id"
                 :props="defaultProps">
        </el-tree>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="saveAdmin">保存</el-button>
        <el-button @click="visible = false">取消</el-button>

      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getAdminInfo, updateAdmin, register, getPermission } from '@/api/admin'
import { roleList, getRolePermissionTree } from '@/api/role'
export default {
  name: 'addOrEditAdminDialog',
  data () {
    var valConfirmPass = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      id: '', // 在编辑用户的时候，获取用户的详细信息没返回用户id，所以把父组件传过来的id暂存起来
      form: {
        id: '',
        username: '',
        password: '',
        roleId: '',
        status: '',
        confirmPassword: '',
        nickName: '',
        mobileno: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入登陆账号', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: valConfirmPass, trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        mobileno: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ]
      },
      list: [],
      treeData: [],
      checkedData: [],
      expandedData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    init (id) {
      this.visible = true
      this.form.id = id || false
      this.id = this.form.id
      this.form.status = 1
      this.form.password = ''
      this.$nextTick(() => {
        this.$refs['form'].resetFields()
      })
      if (this.form.id) {
        getAdminInfo(this.form.id).then(res => {
          this.form = res.data
          getRolePermissionTree(this.form.roleId).then(res => {
            this.treeData = res.data
          })
          getPermission(this.id).then(res => {
            this.checkedData = []
            this.traverse(res.data)
          })
        })
      }
      roleList().then(res => { // 获取角色列表
        this.list = res.data
        if (!this.id) {
          this.form.roleId = this.list[0].id
          getRolePermissionTree(this.form.roleId).then(res => {
            this.treeData = res.data
            this.checkedData = []
            this.traverse(res.data)
          })
        }
      })
    },
    traverse (data) {
      data.forEach(item => {
        if (item.pid === 0) {
          this.expandedData.push(item.id)
        } else {
          this.checkedData.push(item.id)
        }
        if (item.children.length > 0) {
          this.traverse(item.children)
        } else {
          this.checkedData.push(item.id)
        }
      })
    },
    option_click_handler (data) {
      getRolePermissionTree(data.id).then(res => {
        this.treeData = res.data
        this.checkedData = []
        this.traverse(res.data)
      })
    },
    saveAdmin () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let parentArr = this.$refs.tree.getHalfCheckedKeys()
          let childArr = this.$refs.tree.getCheckedKeys()
          this.form.permissionIds = parentArr.concat(childArr)
          if (!this.id) {
            register(this.form).then(res => {
              var code = res.code
              var message = res.message
              if (code === 200) {
                this.$message({
                  showClose: true,
                  message: message,
                  type: 'success'
                })
                this.visible = false
                this.$emit('list')
              } else {
                this.$message({
                  showClose: true,
                  message: message,
                  type: 'error'
                })
              }
            })
          } else {
            this.form.id = this.id
            updateAdmin(this.id, this.form).then(res => {
              var code = res.code
              var message = res.message
              if (code === 200) {
                this.$message({
                  showClose: true,
                  message: message,
                  type: 'success'
                })
                this.visible = false
                this.$emit('list')
              } else {
                this.$message({
                  showClose: true,
                  message: message,
                  type: 'error'
                })
              }
            })
          }
        } else {
          return false
        }
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
  //padding: 0 100px;
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
