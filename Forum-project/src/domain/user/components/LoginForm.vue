<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../store/useUserStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')

const handleSubmit = async () => {
  try {
    error.value = ''
    await userStore.login({
      username: username.value,
      password: password.value
    })
    
    // 登录成功，跳转到首页
    router.push('/');
    console.log('登录成功');
  } catch (e: any) {
    error.value = e.message || '登录失败'
  }
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <!-- 错误提示 -->
      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div class="mb-3">
        <label class="form-label">用户名</label>
        <input 
          v-model="username"
          type="text" 
          class="form-control"
          required
        />
      </div>
      
      <div class="mb-3">
        <label class="form-label">密码</label>
        <input 
          v-model="password"
          type="password" 
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary" @click="handleSubmit">登录</button>
      <button 
          type="button" 
          class="btn btn-outline-secondary"
          @click="router.push('/register')"
        >
          注册账号
        </button>
    </form>
  </div>
</template>