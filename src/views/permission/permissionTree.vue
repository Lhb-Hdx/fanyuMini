<template>
  <div>
    <el-tree :data="treeData"
             show-checkbox
             node-key="id">
    </el-tree>
  </div>
</template>

<script>
import { permissionTree } from '@/api/permission'
export default {
  name: 'permissionTree',
  data () {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  beforeMount () {
    this.getList()
  },
  methods: {
    getList () {
      permissionTree().then(res => {
        this.treeData = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
