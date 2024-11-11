<template>
  <el-container class="login-container">
    <el-header class="login-header">
      <NtLogo class="login-logo" />
    </el-header>
    <el-main class="login-main">
      <div class="login-main-content">
        <h2>{{ setting.websiteInfo.desc || '专业评价数据采集分析平台' }}</h2>
        <p class="welcome-text">
          ✨✨✨ 欢迎使用 {{ setting.websiteInfo.name || '专业评价数据采集分析平台' }}@{{ setting.websiteInfo.version || '1.0.0' }}！
        </p>
        <Login v-if="!isRegistering" @show-register="isRegistering = true" />
        <Register v-else @back-to-login="isRegistering = false" />
        />
      </div>
    </el-main>
    <el-footer class="login-footer">
      <div v-if="setting.reference.show" class="copyright">
        {{ `Copyright ©${new Date().getFullYear()} by` }}
        <a target="_blank" class="out-link" :href="setting.reference.authorizationUrl">
          {{ setting.reference.authorization }}
        </a>
        . All rights reserved. |
        <a target="_blank" class="out-link" href="https://www.xxbelongwithtt.cn/">
          {{ setting.reference.number }}
        </a>
      </div>
    </el-footer>
  </el-container>
</template>

<style scoped>
.login-main, .login-footer, .login-header {
  padding: 0;
}
.login-container {
  height: 100vh; /* 使容器占满整个视口高度 */
  background-image: url('@/assets/img/login/loginBg.png'); /* 背景图片路径 */
  background-size: cover; /* 让图片覆盖整个容器 */
  background-repeat: no-repeat; /* 防止图片重复 */
  background-position: center; /* 居中显示图片 */
}
.login-header {
  display: flex;
  padding: 5px 0 0 10px;
}
.login-logo {
  height: 100%;           /* 设置 logo 的高度为 100%，即与父元素一致 */
  object-fit: contain;    /* 保持图片的宽高比 */
}
.login-main {
  display: flex;
  justify-content: center; /* 水平方向靠右对齐 */
  align-items: flex-start; /* 垂直方向居中对齐 */
}
.login-footer{
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: .8rem;
  color: white;
}
.login-footer a{
  text-decoration: none;
  color: orange;
}
</style>

<script>

import {defineComponent} from "vue";
import NtLogo from "@/components/common/NtLogo.vue";
import setting from "@/setting";
import Login from "@/views/login/common/Login.vue"
import Register from "@/views/login/common/Register.vue";

export default defineComponent({
  data(){
    return {
      isRegistering: false, // 控制显示登录或注册组件
    }
  },
  computed: {
    setting() {
      return setting
    }
  },
  components: {NtLogo,Login,Register},
})
</script>