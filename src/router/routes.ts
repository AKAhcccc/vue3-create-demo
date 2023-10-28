// 对外暴露配置路由（常亮路由）
export const constantRoute = [
  // 常亮路由
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login', //命名路由
    // 路由原信息
    meta: {
      title: '登录', //菜单标题
      hidden: true, //代表路由的标题，在菜单中是否隐藏 ， true隐藏 false 不隐藏
    },
  },
  {
    // 登录成功展示数据
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'Layout',
    meta: {
      title: '', //菜单标题
      hidden: true,
      icon: '',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: {
          title: '首页', //菜单标题
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      hidden: false,
      title: '数据大屏',
      icon: 'Monitor',
    },
  },
  {
    path: '/ticket',
    component: () => import('@/layout/index.vue'),
    name: 'Ticket',
    meta: {
      title: '八维票务', //菜单标题
      hidden: false,
      icon: 'HomeFilled',
    },
    redirect: '/ticket/trainManagement',
    children: [
      {
        path: '/ticket/trainManagement',
        component: () => import('@/views/ticket/TrainManagement/index.vue'),
        name: 'TrainManagement',
        meta: {
          hidden: false,
          title: '车次管理',
          icon: 'Van',
        },
      },
      {
        path: '/ticket/stationManagement',
        component: () => import('@/views/ticket/StationManagement/index.vue'),
        name: 'StationManagement',
        meta: {
          hidden: false,
          title: '车站管理',
          icon: 'AddLocation',
        },
      },
      {
        path: '/ticket/lineManagement',
        component: () => import('@/views/ticket/LineManagement/index.vue'),
        name: 'LineManagement',
        meta: {
          hidden: false,
          title: '线路管理',
          icon: 'Guide',
        },
      },
      {
        path: '/ticket/ticketManagement',
        component: () => import('@/views/ticket/TicketManagement/index.vue'),
        name: 'TicketManagement',
        meta: {
          hidden: false,
          title: '车票管理',
          icon: 'Ticket',
        },
      },
      {
        path: '/ticket/orderManagement',
        component: () => import('@/views/ticket/OrderManagement/index.vue'),
        name: 'OrderManagement',
        meta: {
          hidden: false,
          title: '订单管理',
          icon: 'List',
        },
      },
      {
        path: '/ticket/personalTrajectory',
        component: () => import('@/views/ticket/PersonalTrajectory/index.vue'),
        name: 'PersonalTrajectory',
        meta: {
          hidden: false,
          title: '个人轨迹监控',
          icon: 'Place',
        },
      },
    ],
  },
  {
    //404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404', //菜单标题
      hidden: true,
    },
  },
]

// 异步路由
export const asyncRoute = [
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Unlock',
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          hidden: false,
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          hidden: false,
          title: '角色管理',
          icon: 'Tools',
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          hidden: false,
          title: '菜单管理',
          icon: 'Operation',
        },
      },
    ],
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods',
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCart',
          hidden: false,
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          icon: 'Management',
          hidden: false,
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'Spu',
          icon: 'SetUp',
          hidden: false,
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'Sku',
          icon: 'ScaleToOriginal',
          hidden: false,
        },
      },
    ],
  },
]

// 任意路由
export const anyRoute = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'Any',
  meta: {
    title: '任意路由', //菜单标题
    hidden: true,
  },
}
