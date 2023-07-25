<template>
  <scroll-bar>
    <el-menu
      background-color="#e7e7e7"
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import {
  getPermission
} from '@/api/login'

export default {
  data () {
    return {
      routes: []
    }
  },
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar',
      'userId'
    ]),
    // routes () {
    //   let arr = []
    //   for (let n of this.$router.options.routes) {
    //     if (!n.hidden) {
    //       arr.push(n)
    //     }
    //   }
    //   return arr
    // },
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  mounted () {
  },
  beforeMount () {
    this.getMenu()
  },
  methods: {
    getMenu () {
      getPermission(this.userId)
        .then(res => {
          if (res.code === 200) {
            this.routes = res.data
            if (this.$route.fullPath === '/basic') {
              if (this.routes.length > 0) {
                let menu = this.routes[0]
                if (menu && menu.children.length > 0) {
                  this.$router.push(menu.children[0].uri)
                } else {
                  this.$router.push(menu.uri)
                }
              }
            }
          }
        })
    }
  }
}
</script>
