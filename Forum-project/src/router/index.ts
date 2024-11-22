import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/register',
    name: 'Register', 
    component: () => import('@/components/register/RegisterPage.vue'),
    meta: {
      title: '注册',
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/login/LoginPage.vue'),
    meta: {
      title: '登录',
      requiresAuth: false
    }
  },
  
  {
    path: '/post/editor',
    name: 'CreateEditor',
    component: () => import('@/components/post/PostEditor.vue'),
    meta: {
      title: '发布帖子',
      requiresAuth: true
    }
  },
  {
    path: '/post/editor/:id',
    name: 'PostEditor',
    component: () => import('@/components/post/PostEditor.vue'),
    meta: {
      title: '编辑帖子',
      requiresAuth: true
    }
  },
  {
    path: '/post/detail/:id',
    name: 'PostDetail',
    component: () => import('@/components/post/PostDetail.vue'),
    meta: {
      title: '帖子详情',
      requiresAuth: true
    }
  },
  {
    path: '/post/list',
    name: 'PostList',
    component: () => import('@/components/post/PostList.vue'),
    meta: {
      title: '帖子列表',
      requiresAuth: true
    }
  },

  // 需要登录才能访问的路由
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页',
      requiresAuth: true
    }
  },
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title} | 贴吧`
  
  // 判断该路由是否需要登录权限
  if (to.meta.requiresAuth) {
    // 获取用户登录状态
    const token = localStorage.getItem('token')
    
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default router