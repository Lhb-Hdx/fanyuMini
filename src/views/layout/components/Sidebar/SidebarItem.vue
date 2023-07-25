<template>
  <div class="menu-wrapper">
    <template v-for="(item, indx) in routes">
      <router-link v-if="item.children.length <= 0"
        :key="item.id"
        :to="item.uri === null ? '' : item.uri">
        <el-menu-item :index="indx+''">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="'#' + item.icon"></use>
          </svg>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="indx+''" :key="item.id">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="'#' + item.icon"></use>
          </svg>
          <span slot="title">{{item.name}}</span>
        </template>

        <template v-for="(child, ind) in item.children">
          <!-- <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item> -->
          <router-link :to="child.uri === null ? '': child.uri" :key="child.id" v-if="child.type < 2">
            <el-menu-item :index="indx+'-'+ind">
              <!-- <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon> -->
              <span slot="title">{{child.name}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasOneShowingChildren (item) {
      if (item.children) {
        const showingChildren = item.children.filter(item => {
          return !item.hidden
        })
        if (showingChildren.length === 1) {
          return true
        }
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.icon {
  width: 22px; height: 16px;
  vertical-align: -3px;
  fill: currentColor;
  overflow: hidden;
}
</style>
