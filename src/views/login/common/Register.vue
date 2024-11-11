<template>
  <div class="box">
    <el-card class="box-card">
      <h2 class="login-title">注册</h2>
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
              <el-icon><User style="color: black;"/></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 密码输入框 -->
        <el-form-item prop="pass" class="custom-form-item">
          <el-input
              type="password"
              v-model="ruleForm.pass"
              placeholder="密码"
              autocomplete="off"
              class="input-item"
          >
            <template #prefix>
              <el-icon><Lock style="color: black;"/></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 确认密码输入框 -->
        <el-form-item prop="password" class="custom-form-item">
          <el-input
              type="password"
              v-model="ruleForm.password"
              placeholder="确认密码"
              autocomplete="off"
              class="input-item"
          >
            <template #prefix>
              <el-icon><Lock style="color: black;"/></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="btnGroup">
        <el-button type="primary" @click="submitForm('ruleForm')" v-loading="loading">
          提交
        </el-button>
        <el-button @click="resetForm('ruleForm')" style="margin-left: 0">重置</el-button>
        <el-button @click="goBack;$emit('back-to-login')" style="margin-left: 0">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.password !== "") {
          this.$refs.ruleForm.validateField("password");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        uname: "",
        pass: "",
        password: "",
      },
      rules: {
        uname: [{ required: true, message: "用户名不能为空！", trigger: "blur" }],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        password: [{ required: true, validator: validatePass2, trigger: "blur" }],
      },
      loading: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        this.loading = true;
        if (valid) {
          let _this = this;
          this.$axios({
            url: "/api/user/register",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: {
              uname: _this.ruleForm.uname,
              password: _this.ruleForm.password,
            },
          }).then((res) => {
            if (res.data.code === "0") {
              this.$message({ message: res.data.msg, type: "success"});
              this.$router.push({name: "login"});
            } else {
              this.$message({message: res.data.msg, type: "warning"});
            }
            _this.loading = false;
          });
        } else {
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
  width: 300px;
  height: 450px;
  padding: 0 15px;
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
  margin: 0 0 15px;
}

.input-item {
  width: 100%;
  height: 40px;
}

.input-item .el-input__inner {
  padding-left: 35px;
  line-height: 40px;
}

.btnGroup {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  margin-top: 20px;
}

.el-button {
  width: 100%;
  margin-bottom: 10px;
}

.el-button:last-child {
  margin-bottom: 0;
}
</style>
