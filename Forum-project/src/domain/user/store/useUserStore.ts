import { defineStore } from 'pinia'
import { User, UserDTO } from '../types'
import { localStorageService } from '../services/localStorage'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null as User | null,
    isAuthenticated: false
  }),
  
  actions: {
    register(userDTO: UserDTO) {
      try {
        // 检查用户名是否已存在
        if (localStorageService.checkUsernameExists(userDTO.username)) {
          throw new Error('用户名已存在')
        }

        // 创建新用户
        const newUser = localStorageService.createUser(userDTO)
        
        // 更新状态
        this.currentUser = newUser
        this.isAuthenticated = true

        return newUser
      } catch (error) {
        throw error
      }
    },
    async login(loginDTO: LoginDTO) {
        try {
          const response = localStorageService.login(loginDTO)
          
          // 更新状态
          this.currentUser = response.user
          this.isAuthenticated = true
          this.token = response.token
  
          return response
        } catch (error) {
          throw error
        }
      }
  }
})