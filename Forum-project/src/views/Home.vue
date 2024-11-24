<template>
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div class="container-fluid">
          <router-link class="navbar-brand" to="/home">贴吧</router-link>
          <button 
            class="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <router-link class="nav-link" to="/home">首页</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/my-forums">我的贴吧</router-link>
              </li>
            </ul>
            <div class="d-flex align-items-center">
              <div class="dropdown">
                <button 
                  class="btn btn-link text-decoration-none dropdown-toggle" 
                  type="button" 
                  id="userDropdown" 
                  data-bs-toggle="dropdown"
                >
                  {{ username }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <router-link class="dropdown-item" to="/user-home">个人主页</router-link>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" @click="handleLogout">退出登录</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
  
      <div class="row">
        <div class="col-md-8">
          <!-- 帖子列表占位 -->
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">欢迎来到贴吧!</h5>
              <p class="card-text">这里将显示帖子列表...</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <!-- 侧边栏占位 -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">热门贴吧</h5>
              <p class="card-text">这里将显示热门贴吧列表...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const username = ref(JSON.parse(localStorage.getItem('currentUser')|| '{}').username)
  
  const handleLogout = () => {
    // 清除登录信息
    localStorage.removeItem('token')
    // 跳转到登录页
    router.push('/login')
  }
  </script>