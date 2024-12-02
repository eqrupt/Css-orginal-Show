<!-- // 1. 输出涉及到的模型
- RegisterDTO: { username: string; password: string; identity: string }

// 2. 输出开发时涉及的接口
interface IRegisterPage {
  registerDTO: RegisterDTO;
  register(): Promise<void>;
  handleRegister(): void;
}

// 3. 接口中方法引用的方法
"register()": [
  "userStore.register(registerDTO: RegisterDTO): Promise<void>"
],
"handleRegister()": [
  "register(): Promise<void>",
  "router.push('/login')"
] -->
<!-- 
## 技术栈
- Vue3
- TypeScript
- Pinia
- bootstrap5 -->

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">用户注册</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label for="username" class="form-label">用户名</label>
                <input 
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': usernameError }"
                  id="username"
                  v-model="registerDTO.username"
                  placeholder="请输入4-16位字符"
                  @input="validateUsername"
                  required
                >
                <div class="invalid-feedback" v-if="usernameError">
                  用户名必须是4-16位字符,只能包含字母、数字
                </div>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">密码</label>
                <input
                  type="password" 
                  class="form-control"
                  :class="{ 'is-invalid': passwordError }"
                  id="password"
                  v-model="registerDTO.password"
                  placeholder="请输入6-20位密码,需包含大小写字母和数字"
                  @input="validatePassword"
                  required
                >
                <div class="invalid-feedback" v-if="passwordError">
                  密码必须是6-20位,只包含大小写字母和数字
                </div>
              </div>
              <div class="mb-3">
                <label for="identity" class="form-label">身份</label>
                <select 
                  class="form-select"
                  id="identity"
                  v-model="registerDTO.identity"
                  required
                >
                  <option value="">请选择身份</option>
                  <option value="user">用户</option>
                  <option value="admin">管理员</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="captcha" class="form-label">验证码</label>
                <div class="d-flex align-items-center">
                  <input
                    type="text"
                    class="form-control me-2"
                    :class="{ 'is-invalid': captchaError }"
                    id="captcha"
                    v-model="inputCaptcha"
                    placeholder="请输入验证码"
                    required
                  >
                  <canvas 
                    ref="captchaCanvas"
                    width="100"
                    height="40"
                    @click="refreshCaptcha"
                    style="cursor: pointer;"
                  ></canvas>
                </div>
                <div class="invalid-feedback" v-if="captchaError">
                  验证码错误
                </div>
              </div>
              <div class="d-grid">
                <button 
                  type="submit" 
                  class="btn btn-primary"
                  :disabled="loading || usernameError || passwordError"
                >
                  {{ loading ? '注册中...' : '注册' }}
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
import type { RegisterDTO } from '@/types/auth/register'
import { showCurrentUser } from '@/services/auth/api/userShowTool'
import { RegisterService } from '@/services/auth/domain/registerService'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const usernameError = ref(false)
const passwordError = ref(false)
const captchaError = ref(false)
const registerService = new RegisterService()
const captchaCanvas = ref<HTMLCanvasElement | null>(null)
const captchaText = ref('')
const inputCaptcha = ref('')

showCurrentUser()
const registerDTO = reactive<RegisterDTO>({
  username: '',
  password: '',
  identity: ''
})

const validateUsername = () => {
  usernameError.value = !registerService.validateUsername(registerDTO.username)
}

const validatePassword = () => {
  passwordError.value = !registerService.validatePassword(registerDTO.password)
}

const generateCaptcha = () => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = 0; i < 4; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

const drawCaptcha = () => {
  if (!captchaCanvas.value) return
  const ctx = captchaCanvas.value.getContext('2d')
  if (!ctx) return

  // 生成新的验证码
  captchaText.value = generateCaptcha()

  // 清空画布
  ctx.fillStyle = '#f0f0f0'
  ctx.fillRect(0, 0, 100, 40)

  // 绘制验证码
  ctx.font = '24px Arial'
  ctx.fillStyle = '#333'
  ctx.textBaseline = 'middle'
  
  // 随机旋转每个字符
  for (let i = 0; i < captchaText.value.length; i++) {
    const x = 20 + i * 20
    const y = 20
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate((Math.random() - 0.5) * 0.4)
    ctx.fillText(captchaText.value[i], -5, 0)
    ctx.restore()
  }

  // 添加干扰线
  for (let i = 0; i < 3; i++) {
    ctx.beginPath()
    ctx.moveTo(Math.random() * 100, Math.random() * 40)
    ctx.lineTo(Math.random() * 100, Math.random() * 40)
    ctx.strokeStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
    ctx.stroke()
  }
}

const refreshCaptcha = () => {
  drawCaptcha()
  inputCaptcha.value = ''
  captchaError.value = false
}

const validateCaptcha = () => {
  return inputCaptcha.value.toLowerCase() === captchaText.value.toLowerCase()
}

const register = async () => {
  try {
    loading.value = true
    await userStore.register(registerDTO)
    await router.push('/login')
  } catch (error: any) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

const handleRegister = () => {
  validateUsername()
  validatePassword()
  captchaError.value = !validateCaptcha()
  
  if (!usernameError.value && !passwordError.value && !captchaError.value) {
    register()
  }
}

onMounted(() => {
  drawCaptcha()
})
</script>
