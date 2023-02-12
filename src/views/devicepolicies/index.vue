<template>
  <div>
    <scene></scene>
  </div>
</template>

<script>
import add_policies from "./addpolicies.vue";
import policy_tips from "./policytips.vue";
import scene from "./scene.vue"
export default {
  components: {
    add_policies,
    policy_tips,
    scene
  },
};
</script>

<style lang="less" scoped>
.el-card.el-card.box-card_info.is-always-shadow{
 margin-top: 10px;
}
</style>

