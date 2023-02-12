<template>
  <div class="header-container">
    <div class="l-content">
      <!-- <el-button icon="el-icon-menu" size="mini" @click="handleMenu"></el-button> -->
      <!--面包屑-->
      <!-- <span class="text">首页</span> -->
    </div>

    <div class="c-content">
      <p>欢迎,{{ name }}进入系统</p>
    </div>

    <div class="r-content">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar :src="avatar" class="user"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    handleCommand(command) {
      if (command === "logout") {
        this.$store.dispatch("LogOut").then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      } else if (command === "userInfo") {
        if (this.$route.path !== "/usermanagemen/info") {
          this.$router.replace("/usermanagemen/info");
        }
       
      }
    },
  },
  computed: {
    ...mapGetters({
      name: "name",
      avatar: "avatar",
      roles: "roles",
    }),
  },
};
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
}
p {
  color: #fff;
  font-size: 14px;
  margin-right: 25px;
}

.c-content {
  text-align: right;
  padding-left: 1470px;
}
</style>