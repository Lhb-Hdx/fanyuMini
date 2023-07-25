<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <!-- <img :src="logoicon" class="logo"> -->
    <el-dropdown class="avatar-container" trigger="click">
      <span class="el-dropdown-link">
        {{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <!-- <div class="avatar-wrapper">
        <div>{{ name }}</div>
        <i class="el-icon-caret-bottom"></i>
      </div> -->
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <!-- <router-link class="inlineBlock" to="/home/homestat">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link> -->
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  data () {
    return {
      logoicon: require('@/assets/images/logosmall.png')
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  background: #479CFD;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  // height: 50px;
  // line-height: 50px;
  // border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .logo {
      position: absolute;
      top: 10px;
      right: 150px;
      height: 30px;
      width: auto;
    }
  .avatar-container {
    top: 0;
    line-height: 50px;
    position: absolute;
    right: 35px;
    .el-dropdown-link {
      line-height: 50px;
      margin-top: 20px
    }
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 0px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 19px;
        font-size: 12px;
      }
    }
  }
}
</style>
