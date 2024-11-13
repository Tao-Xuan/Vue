<template>
  <el-container style="height: 100vh">
    <!-- 侧边栏 -->
    <el-aside width="200px" style="background-color: #2d3a4b">
      <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical-demo"
          background-color="#2d3a4b"
          text-color="#ffffff"
          active-text-color="#ffd04b"
          router
          @select="handleMenuSelect"
      >
        <el-menu-item index="/dashboard/home" icon="el-icon-house">首页</el-menu-item> <!-- 保证路径是 /dashboard/home -->
        <el-menu-item index="/dashboard/home" icon="el-icon-s-platform">仪表盘</el-menu-item>
        <el-menu-item index="/dashboard/about" icon="el-icon-info">关于</el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主体内容 -->
    <el-container>
      <el-header style="background-color: #b3c0d1; color: #333; padding: 10px">
        <h3>欢迎使用管理系统</h3>
      </el-header>
      <el-main>
        <!-- 动态加载路由对应的组件 -->
        <router-view></router-view>  <!-- 这里是嵌套路由的地方 -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      activeMenu: "",  // 默认激活菜单项
    };
  },
  methods: {
    handleMenuSelect(index) {
      this.activeMenu = index;  // 更新激活的菜单项
    },
  },
};
</script>

<style scoped>
.el-aside {
  background-color: #2d3a4b;
}

.el-menu-item {
  color: white;
}

.el-menu-item:hover {
  background-color: #3e4e5e;
}

.el-header {
  text-align: center;
  font-size: 24px;
  line-height: 60px;
  background-color: #b3c0d1;
}

.el-main {
  padding: 20px;
  background-color: #f0f2f5;
}
</style>
