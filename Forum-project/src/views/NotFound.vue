<template>
    <div class="container">
      <div class="row min-vh-100 align-items-center justify-content-center">
        <div class="col-md-6 text-center">
          <h1 class="display-1 mb-4">404</h1>
          <h2 class="mb-4">页面未找到</h2>
          <p class="mb-4">抱歉，您访问的页面不存在。</p>
          <router-link to="/home" class="btn btn-primary">
            返回首页
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // 无需额外逻辑
  </script>
  
  <style scoped>
  .min-vh-100 {
    min-height: 100vh;
  }
  </style>