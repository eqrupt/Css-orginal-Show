<template>
  <div class="container-fluid">
    <div class="row">
      <!-- 侧边导航栏 -->
      <div class="col-md-2 bg-light sidebar">
        <div class="list-group mt-3">
          <template v-if="!token">
            <router-link to="/register" class="list-group-item list-group-item-action">
              注册
            </router-link>
            <router-link to="/login" class="list-group-item list-group-item-action">
              登录
            </router-link>
          </template>
          <template v-else>
            <router-link to="/home" class="list-group-item list-group-item-action">
              首页
            </router-link>
            <router-link to="/post/editor" class="list-group-item list-group-item-action">
              发布帖子
            </router-link>
            <router-link to="/post/list" class="list-group-item list-group-item-action">
              帖子列表
            </router-link>
            <a href="#" class="list-group-item list-group-item-action" @click.prevent="logout">
              退出登录
            </a>
          </template>
        </div>
      </div>

      <!-- 主内容区域 -->
      <div class="col-md-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const token = ref<string | null>(null)

const checkLoginStatus = () => {
  token.value = localStorage.getItem('token')
}
watch(() => router.currentRoute.value, () => {
  checkLoginStatus()
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('currentUser')
  token.value = null
  router.push('/login')
}

onMounted(() => {
  checkLoginStatus()
})
</script>