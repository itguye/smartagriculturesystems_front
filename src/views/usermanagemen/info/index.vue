<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card" v-loading="listLoading">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <!-- <div class="text-center">
              <userAvatar :user="user" />
            </div>  -->

            <!--头像-->
            <div class="demo-type">
              <el-avatar :size="120" rc="https://empty" @error="errorHandler">
                <img :src="user.icon" />
              </el-avatar>
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <div class="pull-right"> <i class="el-icon-s-custom"></i> 名称:  {{ user.username }}</div>
              </li>

              <li class="list-group-item">
                <div class="pull-right"> <i class="el-icon-user"></i> 昵称:  {{ user.nickName }}</div>
              </li>

              <!-- <li class="list-group-item">
                <i class="el-icon-phone"></i>手机号码
                <div class="pull-right">{{ user.phonenumber }}</div>
              </li> -->
              <li class="list-group-item">
                <div class="pull-right">   <i class="el-icon-message"></i> 邮箱:  {{ user.email }}</div>
              </li>

              <li class="list-group-item">
                <div class="pull-right">   <i class="el-icon-tickets"></i> 备注:  {{ user.note }}</div>
              </li>

              <li class="list-group-item">
                <div class="pull-right"> <i class="el-icon-s-opportunity"></i> 所属角色: {{ user.roles }}</div>
              </li>

              <li class="list-group-item">
                <div class="pull-right"><i class="el-icon-date"></i> 创建日期: {{ user.createTime | formatDateTime}}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本资料</span>
          </div>
          <el-tabs v-model="activeTab" v-loading="listLoading">
            <el-tab-pane label="基本资料" name="userinfo"  >
              <userInfo :user="user" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userAvatar from "../info/user/userAvatar";
import userInfo from "../info/user/userInfo";
import resetPwd from "../info/user/resetPwd";
import { getUserInfoByName } from "@/api/users";
import { mapGetters } from "vuex";
import {formatDate} from "@/utils/date"
export default {
  name: "Profile",
  components: { userAvatar, userInfo, resetPwd },
  data() {
    return {
      listLoading : true,
      user: {},
      roleGroup: {},
      postGroup: {},
      activeTab: "userinfo",
    };
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      console.log("用户信息");
      getUserInfoByName(this.name.toString())
        .then((response) => {
          this.user = response.data;
          this.listLoading = false;
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    errorHandler() {
      return true;
    },
  },
  computed: {
    ...mapGetters({
      name: "name",
    }),
  },
};
</script>

<style lang="less">
.demo-type{
  text-align: center;
  vertical-align: middle;
}
li{
  list-style: none;
}

</style>
