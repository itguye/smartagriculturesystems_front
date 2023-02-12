<template>
  <div id="main">
    <el-container>
      <el-aside width="210px">
        <common_asid></common_asid>
      </el-aside>
      <el-container>
        <el-header><common_header></common_header></el-header>
        <el-main> <router-view/> </el-main>
      </el-container>
    </el-container>
  </div>
</template>
    
    
<script>
import common_asid from "../components/Asid/ComponAsid.vue";
import common_header from "../components/Header/CommonHeader.vue";
export default {
  data() {
    return {};
  },
  components: {
    common_asid,
    common_header,
  },
};
</script>
    
<style lang="less" scoped>
.el-aside::-webkit-scrollbar {
  display: none;
}

.el-header {
  position: relative;
  height: 60px;
  margin-left: 210px;
  padding: 0;
}

.el-aside {
  display: block;
  position: absolute;
  left: 0;
  width: 210px;
  bottom: 0;
  
}

.el-main {
  position: absolute;
  left: 200px;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
}
</style>
    