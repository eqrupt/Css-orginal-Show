<!-- 
// 作用是提供登录页面的UI和交互逻辑
// 1. 输出涉及到的模型
- LoginDTO: { username: string; password: string }

// 2. 输出开发时涉及的接口
interface ILoginPage {
  loginDTO: LoginDTO;
  login(): Promise<void>;
  handleLogin(): void;
}

// 3. 接口中方法引用的方法
"login()": [
  "userStore.login(loginDTO: LoginDTO): Promise<void>"
],
"handleLogin()": [
  "login(): Promise<void>",
  "router.push('/')"
]
 -->

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">用户登录</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="username" class="form-label">用户名</label>
                <input 
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': usernameError }"
                  id="username"
                  v-model="loginDTO.username"
                  placeholder="请输入用户名"
                  @input="validateUsername"
                  required
                >
                <div class="invalid-feedback" v-if="usernameError">
                  用户名必须是4-16位字符
                </div>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">密码</label>
                <input
                  type="password" 
                  class="form-control"
                  :class="{ 'is-invalid': passwordError }"
                  id="password"
                  v-model="loginDTO.password"
                  placeholder="请输入密码"
                  @input="validatePassword"
                  required
                >
                <div class="invalid-feedback" v-if="passwordError">
                  密码必须是6-20位,只包含大小写字母和数字
                </div>
              </div>
              <div class="d-grid">
                <button 
                  type="submit" 
                  class="btn btn-primary"
                  :disabled="loading || usernameError || passwordError"
                >
                  {{ loading ? '登录中...' : '登录' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/services/auth/store/userStore'
import type { LoginDTO } from '@/types/auth/register'
import { getLoginService } from '@/services/auth/domain/loginService'
import { useExperienceStore } from '@/services/auth/store/ExperienceStore'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const usernameError = ref(false)
const passwordError = ref(false)
const loginService = getLoginService()

const loginDTO = reactive<LoginDTO>({
  username: '',
  password: ''
})

const validateUsername = () => {
  usernameError.value = !loginService.validateUsername(loginDTO.username)
}

const validatePassword = () => {
  passwordError.value = !loginService.validatePassword(loginDTO.password)
}

const login = async () => {
  try {
    loading.value = true
    await userStore.login(loginDTO)
    router.push('/')
  } catch (error: any) {
    alert(error.message)
  } finally {
    loading.value = false
    // 设置当前用户
    await useExperienceStore().setCurrentUser(loginDTO.username)
  // 登录成功后跳转到首页
  router.push('/home')
  }
}

const handleLogin = () => {
  validateUsername()
  validatePassword()
  if (!usernameError.value && !passwordError.value) {
    login()
  }
}

// 在组件挂载时输出所有用户信息
onMounted(() => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  console.log('当前系统所有用户信息:', users)
  users.forEach((user: any) => {
    console.log(`用户名: ${user.username}, 密码: ${user.password}, 身份: ${user.identity}`)
  })
})

</script>