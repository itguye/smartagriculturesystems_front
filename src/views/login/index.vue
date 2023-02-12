<template>
  <div class="backgroundDiv">
    <el-card class="login-form-layout">
      <el-form
        autoComplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
      >
        <div style="text-align: center">
          <!-- <svg-icon
            icon-class="login-mall"
            style="width: 56px; height: 56px; color: #409eff"
          ></svg-icon> -->
          <el-image
            src="http://qnysas.itguye.top/home/login_121x80.webp"
            fit="fill "
          ></el-image>
        </div>
        <h2 class="login-title color-main">智慧农业监测系统</h2>
        <el-form-item prop="username">
          <el-input
            name="username"
            type="text"
            v-model="loginForm.username"
            autoComplete="on"
            placeholder="请输入用户名"
          >
            <span slot="prefix">
              <svg-icon icon-class="user" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :type="pwdType"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autoComplete="on"
            placeholder="请输入密码"
          >
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
            <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px; text-align: center">
          <el-button
            style="width: 45%; background-color: green"
            type="primary"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >
            登录
          </el-button>
          <el-button
            style="width: 45%; background-color: green"
            type="primary"
            @click.native.prevent="handleTry"
          >
            获取体验账号
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- <img :src="login_center_bg" class="login-center-layout"> -->
    <el-dialog
      title="公众号二维码"
      :visible.sync="dialogVisible"
      :show-close="false"
      :center="true"
      width="30%"
      append-to-body
    >
      <div style="text-align: center">
        <!-- <span class="font-title-large">
          <span class="color-main font-extra-large">关注公众号</span>
          回复<span
            class="color-main font-extra-large">体验</span>获取体验账号
        </span> -->
        <span> 关注公众号,回复"体验"获取体验账号 </span>
        <br />
        <img
          src="http://qnysas.itguye.top/wechat/wechat.jpg"
          width="160"
          height="160"
          style="margin-top: 10px"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogConfirm">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
import { setSupport, getSupport, setCookie, getCookie } from "@/utils/support";
import login_center_bg from "@/assets/images/login_center_bg.png";

export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("密码不能小于3位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass },
        ],
      },
      loading: false,
      pwdType: "password",
      login_center_bg,
      dialogVisible: false,
      supportDialogVisible: false,
    };
  },
  created() {
    this.loginForm.username = getCookie("username");
    this.loginForm.password = getCookie("password");
    if (
      this.loginForm.username === undefined ||
      this.loginForm.username == null ||
      this.loginForm.username === ""
    ) {
      this.loginForm.username = "admin";
    }
    if (
      this.loginForm.password === undefined ||
      this.loginForm.password == null
    ) {
      this.loginForm.password = "";
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      // 进行数据验证
      this.$refs.loginForm.validate((valid) => {
        // 验证无误
        if (valid) {
          this.loading = true;
          // 发送请求
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false;
              setCookie("username", this.loginForm.username, 15);
              setCookie("password", this.loginForm.password, 15);
              this.$router.push({ path: "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("参数验证不合法！");
          return false;
        }
      });
    },
    handleTry() {
      this.dialogVisible = true;
    },
    dialogConfirm() {
      this.dialogVisible = false;
      setSupport(true);
    },
    dialogCancel() {
      this.dialogVisible = false;
      setSupport(false);
    },
  },
};
</script>

<style scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  height: 360px;
  margin: 200px auto;
  border-top: 10px solid green;
}

.login-title {
  text-align: center;
}
.login-title.color-main {
  font-size: 25px;
  margin-top: 5px;
}

.backgroundDiv {
  background: url("http://qnysas.itguye.top/home/home3.jpg") no-repeat;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position: absolute;
  /* background-size: cover; */
}
</style>
