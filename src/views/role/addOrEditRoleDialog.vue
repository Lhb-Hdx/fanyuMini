<template>
  <el-dialog :title="!form.id?'新建角色':'编辑角色'"
             :visible.sync="visible"
             width="40%">
    <div class="container-dialog">
      <el-form ref="form"
               :model="form"
               :rules="rules"
               class="demo-form-inline"
               label-position="right"
               label-width="80px">
        <div class="container-form-item">
          <el-form-item label="角色名称"
                        prop="name"
                        label-width="100px">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div>
        <div class="container-form-item">
          <el-form-item label="状态"
                        prop="status"
                        label-width="100px">
            <el-radio-group v-model="form.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <el-tree :data="treeData"
                 ref="tree"
                 show-checkbox
                 node-key="id"
                 :default-expanded-keys="expandedData"
                 :default-checked-keys="checkedData"
                 :props="defaultProps">
        </el-tree>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="saveRole">保存</el-button>
        <el-button @click="visible = false">取消</el-button>

      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getRolePermissionTree, updatePermission, createRole, getRoleInfo } from '@/api/role'
import { permissionTree } from '@/api/permission'
export default {
  name: 'addOrEditRoleDialog',
  data () {
    return {
      visible: false,
      form: {
        id: '',
        name: '',
        status: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
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
      this.form.id = id || 0
      this.form.status = 1
      this.$nextTick(() => {
        this.$refs['form'].resetFields()
      })
      if (this.form.id) {
        getRoleInfo({ roleId: this.form.id }).then(res => {
          this.form = res.data
        })
        getRolePermissionTree(this.form.id).then(res => {
          this.expandedData = []
          this.checkedData = []
          this.traverse(res.data)
        })
      }
      permissionTree().then(res => {
        this.treeData = res.data
      })
    },
    traverse (data) {
      data.forEach(item => {
        if (item.pid === 0) {
          this.expandedData.push(item.id)
        }
        if (item.children.length > 0) {
          this.traverse(item.children)
        } else {
          this.checkedData.push(item.id)
        }
      })
    },
    saveRole () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let parentArr = this.$refs.tree.getHalfCheckedKeys()
          let childArr = this.$refs.tree.getCheckedKeys()
          this.$set(this.form, 'permissionIds', parentArr.concat(childArr))
          if (!this.form.id) {
            createRole(this.form).then(res => {
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
            updatePermission(this.form).then(res => {
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
  padding: 0 20px;
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
