// // 1. 输出涉及到的模型
// - User: { username: string; password: string; identity: string; token: string }
// - RegisterDTO: { username: string; password: string; identity: string }


// // 2. 输出开发时涉及的接口
// interface IUserStore {
//   user: User | null;
//   isLoggedIn: boolean;
//   register(registerDTO: RegisterDTO): Promise<void>;
//   login(loginDTO: LoginDTO): Promise<void>;
//   logout(): void;
// }

// 3. 接口中方法引用的方法
// "register(registerDTO: RegisterDTO)": [
//   "registerService.register(registerDTO: RegisterDTO): User",
//   "state.user = user",
//   "state.isLoggedIn = true"
// ],
// "login(loginDTO: LoginDTO)": [
//   "loginService.login(loginDTO: LoginDTO): LoginResponse",
//   "state.user = loginResponse.user",
//   "state.isLoggedIn = true"
// ],
// "logout()": [
//   "state.user = null",
//   "state.isLoggedIn = false"
// ]

import { User, RegisterDTO, LoginDTO } from '@/types/auth/register';
import { defineStore } from 'pinia';
import { RegisterService } from '../domain/registerService';
import { getLoginService } from '../domain/loginService';
import { ref, computed } from 'vue';
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const isLoggedIn = ref(false);
  const token = ref<string | null>(null);

  // getters
  const getUser = computed(() => {
    if (!user.value) {
      // 如果user为空但token存在,从localStorage获取当前用户信息
      const currenttoken = localStorage.getItem('token')
      console.log('正在启动查找token环节')
      console.log(currenttoken)
      if (currenttoken) {
        // 如果token存在,设置token和登录状态
        token.value = currenttoken
        isLoggedIn.value = true
        const users = localStorage.getItem('users')
        if (users) {
          const userList = JSON.parse(users)
          const currentUser = userList.find((u: User) => u.token === currenttoken)
          user.value = currentUser
          
        }
      }
    }
    return user.value
  });
  const getIsLoggedIn = computed(() => isLoggedIn.value);
  const getToken = computed(() => token.value);

  // actions
  async function register(registerDTO: RegisterDTO) {
    const registerService = new RegisterService();
    const newUser = registerService.register(registerDTO);
    user.value = newUser;
    isLoggedIn.value = true;
  }

  async function login(loginDTO: LoginDTO) {
    // TODO: 实现登录逻辑
    const loginService = getLoginService();
    const loginResponse = loginService.login(loginDTO);
    user.value = loginResponse.user;
    isLoggedIn.value = true;
    token.value = loginResponse.token;
    // 保存用户数据到localStorage
    localStorage.setItem('currentUser', JSON.stringify(loginResponse.user));
  }

  function logout() {
    user.value = null;
    isLoggedIn.value = false;
    // 清除localStorage中的用户数据
    localStorage.removeItem('currentUser');
  }

  return {
    user,
    isLoggedIn,
    token,
    getUser,
    getIsLoggedIn, 
    getToken,
    register,
    login,
    logout
  };
});
