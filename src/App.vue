<template>
  <div id="app" @click.stop="refresh">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    refresh () {
      if (this.token !== localStorage.getItem('loginToken')) {
        window.location.reload()
      }
    }
  }
}
</script>

<style lang="less">
// html,body,#app{
//       height: 90%;
//       background-color: black;
//     }
body .el-table colgroup.gutter{
  display: table-cell !important;
}
body .el-table th.gutter{
  display: table-cell!important;
}
.container-box {
  margin-top: 60px;
  margin-left: 10px;
  border: 1px solid #dcdfe6;
  .container-top {
    padding: 10px;
    border-bottom: 1px solid #dcdfe6;
    .line {
      text-align: center;
    }
  }
  .container-total-box {
    color: #e82c50;
    margin: 20px 10px 10px 10px;
    .total-item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .total-item-item {
        margin-right: 15px;
      }
    }
  }
  .container-table {
    padding-bottom: 20px;
    .table-pagination {
      padding: 10px;
    }
  }
}
</style>
