<template>
  <!-- <scroll-bar> -->
    <!-- :collapse="isCollapse" -->
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
     
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  <!-- </scroll-bar> -->
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
//import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem },//, ScrollBar
  computed: {
    ...mapGetters({
      // 把 `this.getNum1` 映射为 `this.$store.getters.getNum1`
      routers: "routers"
    }),
    routes() {
      // return this.$router.options.routes
      console.log(this.routers)
      return this.routers
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
