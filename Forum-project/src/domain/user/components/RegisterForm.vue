<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '../store/useUserStore'
import { useRouter } from 'vue-router'


const userStore = useUserStore()
const router = useRouter()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')

// 添加错误提示状态
const errors = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

// 验证用户名
const validateUsername = () => {
  if (username.value.length < 3 || username.value.length > 20) {
    errors.value.username = '用户名长度必须在3-20个字符之间'
    return false
  }
  errors.value.username = ''
  return true
}

// 验证密码
const validatePassword = () => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
  if (!passwordRegex.test(password.value)) {
    errors.value.password = '密码至少6位，必须包含字母和数字'
    return false
  }
  errors.value.password = ''
  return true
}

// 验证确认密码
const validateConfirmPassword = () => {
  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = '两次输入的密码不一致'
    return false
  }
  errors.value.confirmPassword = ''
  return true
}
//核心函数，用于验证密码是否符合上面的标准。
const handleSubmit = async () => {
  // 执行所有验证
  const isUsernameValid = validateUsername()
  const isPasswordValid = validatePassword()
  const isConfirmPasswordValid = validateConfirmPassword()

  if (isUsernameValid && isPasswordValid && isConfirmPasswordValid) {
    try {
      await userStore.register({
        username: username.value,
        password: password.value
      })
      
      // 注册成功，跳转到首页
      router.push('/')
    } catch (error: any) {
      // 显示错误信息
      if (error.message === '用户名已存在') {
        errors.value.username = error.message
      } else {
        // 处理其他错误
        console.error('注册失败:', error)
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <!-- ... 原有的表单结构 ... -->
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label class="form-label">用户名</label>
        <input 
          v-model="username"
          type="text" 
          class="form-control"
          :class="{ 'is-invalid': errors.username }"
          @blur="validateUsername"
          required
        />
        <div class="invalid-feedback" v-if="errors.username">
          {{ errors.username }}
        </div>
      </div>
      
      <div class="mb-3">
        <label class="form-label">密码</label>
        <input 
          v-model="password"
          type="password" 
          class="form-control"
          :class="{ 'is-invalid': errors.password }"
          @blur="validatePassword"
          required
        />
        <div class="invalid-feedback" v-if="errors.password">
          {{ errors.password }}
        </div>
      </div>
      
      <div class="mb-3">
        <label class="form-label">确认密码</label>
        <input 
          v-model="confirmPassword"
          type="password" 
          class="form-control"
          :class="{ 'is-invalid': errors.confirmPassword }"
          @blur="validateConfirmPassword"
          required
        />
        <div class="invalid-feedback" v-if="errors.confirmPassword">
          {{ errors.confirmPassword }}
        </div>
      </div>
      <button type="submit" class="btn btn-primary">注册</button>
      <button 
        type="button" 
        class="btn btn-outline-secondary ms-2"
        @click="router.push('/login')"
      >
        返回登录
      </button>
      <!-- ... 其他表单内容 ... -->
    </form>
  </div>
</template>