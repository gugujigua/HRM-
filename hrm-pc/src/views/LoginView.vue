<template>
  <div class="container login-container">
    <div class="login-box">
      <h2>HRM系统登陆</h2>
      <el-form
        ref="loginForm"
        :model="loginData"
        :rules="loginRules"
        label-width="54px"
      >
        <el-form-item label="账号" prop="jobNumber">
          <el-input v-model="loginData.jobNumber" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            show-password=""
            v-model="loginData.password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" style="width: 100%"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ElMessage, type FormInstance } from "element-plus";
export default defineComponent({
  data() {
    return {
      loginData: {
        jobNumber: "",
        password: "",
      },
      loginRules: {
        jobNumber: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      (this.$refs.loginForm as FormInstance).validate((valid) => {
        if (valid) {
          this.api.login.login(this.loginData).then((res) => {
            if (res.data.code === 200) {
              ElMessage({
                showClose: true,
                message: "登录成功",
                type: "success",
              });
              sessionStorage.setItem("token", res.data.token);
              sessionStorage.setItem("user", JSON.stringify(res.data.data));
              this.$store.dispatch("getMenu");
              this.$router.push({ name: "main" });
            }

            console.log(res);
          });
        }
      });
    },
  },
  mounted() {
    console.log(this);
    console.log(this.api);
  },
});
</script>

<style scoped>
.login-container {
  background: url(../assets/images/1.jpg) no-repeat center/cover;
}
.login-box {
  width: 360px;
  background: #fff;
  position: absolute;
  padding: 30px 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.login-box h2 {
  margin-bottom: 20px;
  text-align: center;
  font-size: 22px;
}
</style>
