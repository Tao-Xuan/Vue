<template>
  <div class="box">
    <el-card class="box-card">
      <h2 class="login-title">登录</h2>
      <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-position="top"
          class="login-form"
      >
        <!-- 用户名输入框 -->
        <el-form-item prop="uname" class="custom-form-item">
          <el-input
              v-model="ruleForm.uname"
              placeholder="用户名"
              class="input-item"
          >
            <template #prefix>
              <el-icon><User style="color: black;"/></el-icon><!-- 用户图标 -->
            </template>
          </el-input>
        </el-form-item>

        <!-- 密码输入框 -->
        <el-form-item prop="password" class="custom-form-item">
          <el-input
              type="password"
              v-model="ruleForm.password"
              placeholder="密码"
              autocomplete="off"
              class="input-item"
          >
            <template #prefix>
              <el-icon><Lock style="color: black;"/></el-icon> <!-- 密码图标 -->
            </template>
          </el-input>
        </el-form-item>
        <!-- 角色选择框 -->
      </el-form>
      <div class="btnGroup">
        <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            v-loading="loading"
        >登录</el-button>
        <el-button @click="resetForm('ruleForm')" style="margin-left: 0">重置</el-button>
        <el-button @click="$emit('show-register')" style="margin-left: 0">注册</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        uname: "",
        password: "",
      },
      rules: {
        uname: [
          { required: true, message: "请输入用户名！", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码！", trigger: "blur" },
        ],
      },
      loading: false, // 是否显示加载动画
    };
  },
  methods: {
    submitForm(formName) {
      // 验证表单中的账号密码是否有效，因为在上面rules中定义为了必填 required: true
      this.$refs[formName].validate((valid) => {
        // 点击登录后，让登录按钮开始转圈圈（展示加载动画）
        this.loading = true;
        // 如果经过校验，账号密码都不为空，则发送请求到后端登录接口
        if (valid) {
          let _this = this;
          // 使用 axios 将登录信息发送到后端
          this.$axios({
            url: "/api/user/login",               // 请求地址
            method: "post",                       // 请求方法
            headers: {                            // 请求头
              "Content-Type": "application/json",
            },
            params: {                             // 请求参数
              uname: _this.ruleForm.uname,
              password: _this.ruleForm.password,
            },
          }).then((res) => { // 当收到后端的响应时执行该括号内的代码，res 为响应信息，也就是后端返回的信息
            if (res.data.code === "0") {  // 当响应的编码为 0 时，说明登录成功
              // 将用户信息存储到sessionStorage中
              sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
              sessionStorage.setItem("userRole", res.data.data.role);
              // if (sessionStorage.getItem("role") === "admin") {
              //   // 显示管理员页面或跳转
              // } else if (sessionStorage.getItem("role") === "user") {
              //   // 显示普通用户页面或跳转
              // }
              // 跳转页面到首页
              this.$router.push('/home');
              // 显示后端响应的成功信息
              this.$message({
                message: res.data.msg,
                type: "success",
              });
            } else {  // 当响应的编码不为 0 时，说明登录失败
              // 显示后端响应的失败信息
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
            // 不管响应成功还是失败，收到后端响应的消息后就不再让登录按钮显示加载动画了
            _this.loading = false;
            console.log(res);
          });
        } else {  // 如果账号或密码有一个没填，就直接提示必填，不向后端请求
          console.log("error submit!!");
          this.loading = false;
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box-card {
  display: flex;
  width: 300px;  /* 将宽度缩小 */
  height: 450px;
  padding: 0 15px;  /* 增加内边距，让高度适当拉长 */
  flex-direction: column;
  align-items: stretch;
}

.login-title {
  margin-bottom: 20px;
  text-align: left;
  font-size: 24px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.custom-form-item {
  margin: 0 0 15px;  /* 缩小表单项间距 */
}

.input-item {
  width: 100%;
  height: 40px;
}

.input-item .el-input__inner {
  padding-left: 35px;
  line-height: 40px;
}

.input-item .el-input__inner .el-icon {
  line-height: 40px;
  vertical-align: middle;
}

.btnGroup {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  margin-top: 20px; /* 适当增大按钮组的顶部间距 */
}

.el-button {
  width: 100%;
  margin-bottom: 10px;
}

.el-button:last-child {
  margin-bottom: 0;
}
</style>
