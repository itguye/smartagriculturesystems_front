<template>
  <el-menu
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse()"
    :default-active="$route.path"
  >
    <h3>{{ isCollapse() ? "系统" : "智慧农业监测系统" }}</h3>

    <template v-for="item in menuData" v-if="!item.hidden && item.children">
      <router-link
        v-if="
          hasOneShowingChildren(item.children) &&
          !item.children[0].children &&
          !item.alwaysShow
        "
        :to="
          item.path != '/'
            ? item.path + '/' + item.children[0].path
            : '/' + item.children[0].path
        "
        :key="item.children[0].name"
      >
        <el-menu-item
          :index="item.path + '/' + item.children[0].path"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <i
            v-if="item.children[0].meta && item.children[0].meta.icon"
            :class="item.children[0].meta.icon"
          ></i>
          <span
            v-if="item.children[0].meta && item.children[0].meta.title"
            slot="title"
            >{{ item.children[0].meta.title }}</span
          >
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name || item.path" :key="item.name">
        <template slot="title">
          <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
          <!-- <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon> -->
          <span v-if="item.meta && item.meta.title" slot="title">{{
            item.meta.title
          }}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item
            :is-nest="true"
            class="nest-menu"
            v-if="child.children && child.children.length > 0"
            :routes="[child]"
            :key="child.path"
          ></sidebar-item>

          <router-link
            v-else
            :to="item.path + '/' + child.path"
            :key="child.name"
          >
            <el-menu-item :index="item.path + '/' + child.path">
              <i
                v-if="child.meta && child.meta.icon"
                :class="child.meta.icon"
              ></i>
              <!-- <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon> -->
              <span v-if="child.meta && child.meta.title" slot="title">{{
                child.meta.title
              }}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template></el-menu
  >
</template>
</el-menu>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    routes: {
      type: Array,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // menuData: [
      //   {
      //     path: "/datapresentaion",
      //     name: "datapresentaion",
      //     label: "数据展示",
      //     icon: "el-icon-s-data",
      //     url: "DataPresentaion/DataPresentaion",
      //   },
      //   {
      //     path: "/deviceaccess",
      //     name: "deviceaccess",
      //     label: "MQTT",
      //     icon: "el-icon-cpu",
      //     url: "Ddeviceaccess/deviceaccess",
      //   },
      //   {
      //     path: "/devicepolicies",
      //     name: "devicepolicies",
      //     label: "设备策略",
      //     icon: "el-icon-s-help",
      //     url: "devicepolicies/devicepolicies",
      //   },
      //   {
      //     path: "/usermanagemen",
      //     name: "usermanagemen",
      //     label: "用户管理",
      //     icon: "el-icon-user-solid",
      //     url: "usermanagemen/usermanagemen",
      //   },
      // ],
      //menuData:[],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === "/datapresentaion" && item.path == "/")
      ) {
        this.$router.push(item.path);
      }
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    hasOneShowingChildren(children) {
      console.log("子菜单");
      console.log(children);
      const showingChildren = children.filter((item) => {
        return !item.hidden;
      });
      if (showingChildren.length === 1) {
        console.log(true);
        return true;
      }
      console.log(false);
      return false;
    },
  },
  computed: {
    ...mapGetters({
      // 把 `this.getNum1` 映射为 `this.$store.getters.getNum1`
      routers: "routers",
      addRouters: "addRouters",
    }),
    // 没有子菜单
    noChildren() {
      console.log(this.routers.filter((item) => !item.children));
      return this.menuData.filter((item) => !item.children);
    },
    // 有子菜单
    hasChildren() {
      console.log(this.routers.filter((item) => item.children));
      return this.menuData.filter((item) => item.children);
    },
    menuData() {
      console.log(this.routers);
      return this.routers;
    },
    router_path() {
      return this.$route.meta.hidden
        ? this.$route.meta.JumpPath
        : this.$route.path;
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  height: 100vh;
  border-right: none;
  h3 {
    color: #fff;
    line-height: 48px;
    text-align: center;
    font-size: 19px;
    font-weight: 400;
  }
}
.router-link-active {
  //点击时去掉下划线
  text-decoration: none;
}

a {
  text-decoration: none; //去掉原有链接文字下划线
}
</style>