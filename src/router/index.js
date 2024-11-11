import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/login/Login.vue';
import Home from "@/views/home/Home.vue";
import { ElMessage } from 'element-plus';

const routes = [
  {
    path: '/',
    redirect: '/login' // 重定向到登录页面
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true, // 需要验证的页面
      allowedRoles: ['admin','user','doctor'], // 允许的角色
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// 导航守卫，前置处理
router.beforeEach((to, from, next) => {
  const userRole = sessionStorage.getItem("userRole"); // 获取用户角色
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // 检查路由是否需要认证
  const allowedRoles = to.meta.allowedRoles || []; // 允许的角色
  const isAuthenticated = !!sessionStorage.getItem('userInfo'); // 检查用户是否已登录
  const a = sessionStorage.getItem('userInfo')

  // 如果路由需要认证（需要登录），且用户没有登录
  if (requiresAuth && !isAuthenticated) {
    next({ path: '/login' }); // 如果没有登录，重定向到登录页面
    ElMessage({
      message: '请先登录！',
      type: 'warning',
    });
  } else if (requiresAuth && allowedRoles.length && !allowedRoles.includes(userRole)) {
    // 如果路由需要认证且设置了角色权限
    if (!allowedRoles.includes(userRole)) {
      // 如果当前用户角色不在允许的角色列表中
      ElMessage({
        message: '您没有权限访问该页面！',
        type: 'error',
      });
      next({ path: '/login' }); // 可以跳转到登录页面或一个没有权限页面
    } else {
      next(); // 如果有权限，放行
    }
  } else {
    next(); // 如果不需要认证（即公开页面），直接放行
  }
});

export default router;
