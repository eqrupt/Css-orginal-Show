import { createRouter, createWebHistory } from 'vue-router';

// 引入各个页面组件
import HomePage from '@/views/HomePage.vue';
import CategoryPage from '@/views/CategoryPage.vue';
import VideoPlayerPage from '@/views/VideoPlayerPage.vue';
import AuthPage from '@/views/AuthPage.vue';
import ProfilePage from '@/views/ProfilePage.vue';

// 创建路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { title: 'Home Page' }
  },
  {
    path: '/category/:category', // 动态路由，接收分类名
    name: 'Category',
    component: CategoryPage,
    meta: { title: 'Category Page' }
  },
  {
    path: '/video/:id', // 动态路由，接收视频ID
    name: 'VideoPlayer',
    component: VideoPlayerPage,
    meta: { title: 'Video Player Page' }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage,
    meta: { title: 'Login / Register' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    meta: { title: 'User Profile' }
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 使用浏览器的历史记录模式
  routes, // 将路由数组传递给router
});

// 设置路由导航守卫，动态设置页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Video Streaming Platform'; // 设置页面标题
  next(); // 继续导航
});

export default router;
