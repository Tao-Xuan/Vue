<template>
  <div class="home-page">
    <el-container style="height: 100vh; display: flex; justify-content: center; align-items: center;">
      <el-card class="box-card" style="width: 300px; text-align: center;">
        <div slot="header" class="clearfix">
          <span style="font-size: 24px; color: #409EFF;">欢迎访问管理系统</span>
        </div>
        <div style="margin-top: 20px; font-size: 16px;">
          <p>这是一个无权限的首页页面，展示一些系统信息。</p>
          <p>点击下面的按钮可以跳转到登录页面进行注册或登录。</p>
        </div>
        <el-button
            type="primary"
            style="margin-top: 30px;"
            @click="goToLogin">去登录</el-button>
      </el-card>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    goToLogin() {
      this.$router.push('/login');  // 跳转到登录页面
    }
  }
}
</script>

<style scoped>
.home-page {
  background-color: #f9f9f9;
}
</style>
