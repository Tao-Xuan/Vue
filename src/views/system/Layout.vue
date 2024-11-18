<template>
  <el-container style="height: 100vh">
    <!-- 侧边栏 -->
    <el-aside width="200px" style="background-color: #2d3a4b">
      <NtLogo style="height: 72.83px"/>
      <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical-demo"
          background-color="#2d3a4b"
          text-color="#ffffff"
          active-text-color="#ffd04b"
          router
          @select="handleMenuSelect"
      >
        <el-sub-menu>
          <template #title>首页</template>
          <el-menu-item index="/layout/index" icon="el-icon-house">首页</el-menu-item>

          <!-- 仪表盘菜单项，只有 admin 和 doctor 角色可以看到 -->
          <el-menu-item
              v-if="userRole === 'admin' || userRole === 'doctor'"
              index="/layout/setting"
              icon="el-icon-s-platform"
          >仪表盘</el-menu-item>

          <!-- 关于菜单项，所有角色都能看到 -->
          <el-menu-item index="/layout/setting" icon="el-icon-info">关于</el-menu-item>

          <!-- 用户管理菜单项，只有 admin 角色可以看到 -->
          <el-menu-item
              v-if="userRole === 'admin'"
              index="/layout/index"
              icon="el-icon-user"
          >用户管理</el-menu-item>
        </el-sub-menu>
        <!-- 首页菜单项，所有角色都能看到 -->
        <el-menu-item index="/layout/index" icon="el-icon-house">首页</el-menu-item>

        <!-- 仪表盘菜单项，只有 admin 和 doctor 角色可以看到 -->
        <el-menu-item
            v-if="userRole === 'admin' || userRole === 'doctor'"
            index="/layout/setting"
            icon="el-icon-s-platform"
        >仪表盘</el-menu-item>

        <!-- 关于菜单项，所有角色都能看到 -->
        <el-menu-item index="/layout/setting" icon="el-icon-info">关于</el-menu-item>

        <!-- 用户管理菜单项，只有 admin 角色可以看到 -->
        <el-menu-item
            v-if="userRole === 'admin'"
            index="/layout/index"
            icon="el-icon-user"
        >用户管理</el-menu-item>

      </el-menu>
    </el-aside>

    <!-- 主体内容 -->
    <el-container>
      <el-header style="background-color: #b3c0d1; color: #333; padding: 10px">
        <h3 style="margin: 0;line-height: 40px">欢迎使用管理系统</h3>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NtLogo from "@/components/common/NtLogo.vue";

export default {
  name: 'Layout',
  components: {NtLogo},
  data() {
    return {
      activeMenu: "/layout/index",  // 默认激活菜单项
      userRole: sessionStorage.getItem("userRole") || 'guest',  // 获取当前用户角色
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
  line-height: 40px;
  background-color: #b3c0d1;
}

.el-main {
  padding: 10px;
  background-color: #f0f2f5;
}

</style>
