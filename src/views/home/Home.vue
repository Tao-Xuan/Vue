<template>
  <div>
    <h2>欢迎{{ user.uname }}！您的 uid 为{{ user.uid }},角色：{{ user.role }}</h2>
    <div v-if="user.role === 'admin'">
      <p>管理员可以看到这个内容。</p>
    </div>
    <div v-if="user.role === 'user'">
      <p>普通用户可以看到这个内容。</p>
    </div>
    <el-button @click="logout"> 登出 </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        uname: "",
        uid: null,
        role: "",
      },
    };
  },
  methods: {
    logout() {
      // 移除本地用户登录信息
      sessionStorage.removeItem('userInfo');
      sessionStorage.removeItem('userRole');
      // 跳转页面到登录页
      this.$router.push('/login');
    }
  },
  mounted() {
    if (sessionStorage.getItem('userInfo')) {
      // 将用户信息存储到sessionStorage中
      this.user = JSON.parse(sessionStorage.getItem('userInfo'));
    }
    if (sessionStorage.getItem('userRole')) {
      this.user.role = sessionStorage.getItem('userRole');
    }
  },
};
</script>

<style scoped>
</style>