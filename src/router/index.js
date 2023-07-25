import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    name: 'home',
    redirect: '/basic',
    children: [{
      path: 'home/homestat',
      name: 'homestat',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home' }
    }, {
      path: 'basic',
      name: 'Basic',
      component: () => import('@/views/layout/basic'),
      meta: { title: '空白页', icon: 'home' }
    }]
  },
  {
    path: '/setings', // 设备管理
    component: Layout,
    children: [{
      path: 'deviceList', // 设备列表
      name: 'deviceList',
      component: () => import('@/views/deviceManage/deviceList'),
      meta: { title: '设备列表' }
    },
    {
      path: 'classList', // 区域列表
      name: 'classList',
      component: () => import('@/views/deviceManage/classList'),
      meta: { title: '区域列表' }
    }]
  },
  {
    path: '/broadcastAdmin', // 任务管理
    component: Layout,
    children: [{
      path: 'danci_taskList',
      name: 'danci_taskList',
      component: () => import('@/views/taskManage/singleTask'),
      meta: { title: '单次任务' }
    },
    {
      path: 'xunhuan_taskList',
      name: 'xunhuan_taskList',
      component: () => import('@/views/taskManage/xunhuanTask'),
      meta: { title: '循环任务' }
    },
    {
      path: 'shoudong_taskList',
      name: 'shoudong_taskList',
      component: () => import('@/views/taskManage/handleTask'),
      meta: { title: '手动任务' }
    },
    {
      path: 'fenlei',
      name: 'fenlei',
      component: () => import('@/views/taskManage/typeList'),
      meta: { title: '分类管理' }
    }]
  },
  {
    path: '/kejian', // 资源（音乐）管理
    component: Layout,
    children: [{
      path: 'kejian',
      name: 'kejian',
      component: () => import('@/views/musicManage/musicList'),
      meta: { title: '媒体资源' }
    },
    {
      path: 'fenlei',
      name: 'kejianfenlei',
      component: () => import('@/views/musicManage/typeList'),
      meta: { title: '资源分类' }
    }]
  },
  {
    path: '/jiemuManage', // 节目管理
    component: Layout,
    children: [{
      path: 'jiemu',
      name: 'jiemu',
      component: () => import('@/views/jiemuManage/jiemuList'),
      meta: { title: '节目' }
    }]
  },
  {
    path: '/broadcastAdmin', // 广播管理
    component: Layout,
    children: [{
      path: 'timelyBroadcast',
      name: 'timelyBroadcast',
      component: () => import('@/views/broadcastManage'),
      meta: { title: '直播' }
    }]
  },
  {
    path: '/role',
    component: Layout,
    children: [{
      path: 'list', // 角色管理
      name: 'roleList',
      component: () => import('@/views/role/roleList'),
      meta: { title: '角色管理' }
    }]
  },
  {
    path: '/admin',
    component: Layout,
    children: [{
      path: 'list', // 用户管理
      name: 'adminList',
      component: () => import('@/views/admin/adminList'),
      meta: { title: '用户管理' }
    }]
  },
  {
    path: '/permission',
    component: Layout,
    children: [{
      path: 'list', // 权限管理
      name: 'permissionList',
      component: () => import('@/views/permission/permissionList'),
      meta: { title: '权限管理' }
    }]
  },
  {
    path: '/log',
    component: Layout,
    children: [{
      path: 'list', // 操作日志
      name: 'logList',
      component: () => import('@/views/operLog/logList'),
      meta: { title: '操作日志' }
    },
    {
      path: 'playlist', // 播放日志
      name: 'playLogList',
      component: () => import('@/views/operLog/playLogList'),
      meta: { title: '播放日志' }
    }]
  },
  {
    path: '/admin',
    component: Layout,
    children: [{
      path: 'securitySet', // 安全设置
      name: 'securitySet',
      component: () => import('@/views/setting/securitySet'),
      meta: { title: '安全设置' }
    }]
  },
  {
    path: '/admin',
    component: Layout,
    children: [{
      path: 'modifyPassword', // 修改密码
      name: 'modifyPassword',
      component: () => import('@/views/setting/modifyPassword'),
      meta: { title: '修改密码' }
    }]
  },
  {
    path: '/admin',
    component: Layout,
    children: [{
      path: 'logout', // 安全退出
      name: 'logout',
      component: () => import('@/views/setting/logout'),
      meta: { title: '安全退出' }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
