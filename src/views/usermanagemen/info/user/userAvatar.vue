<template>
    <div class="demo-type">
      <el-avatar :size="60" rc="https://empty" @error="errorHandler">
        <img :src="user.icon"/>
      </el-avatar>
    </div>
  </template>
  <script>
    export default {
      methods: {
        errorHandler() {
          return true
        }
      }
    }
  </script>