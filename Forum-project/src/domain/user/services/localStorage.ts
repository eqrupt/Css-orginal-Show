import { User, UserDTO } from '../types'
import { v4 as uuidv4 } from 'uuid' // 需要先安装 uuid 包

export class LocalStorageService {
  private readonly USER_KEY = 'users'
  private readonly TOKEN_KEY = 'userToken'

  // 获取所有用户
  private getUsers(): User[] {
    const users = localStorage.getItem(this.USER_KEY)
    return users ? JSON.parse(users) : []
  }

  // 保存用户列表
  private saveUsers(users: User[]): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(users))
  }

  // 检查用户名是否存在
  checkUsernameExists(username: string): boolean {
    const users = this.getUsers()
    return users.some(user => user.username === username)
  }

  // 创建新用户
  createUser(userDTO: UserDTO): User {
    const users = this.getUsers()
    
    if (this.checkUsernameExists(userDTO.username)) {
      throw new Error('用户名已存在')
    }

    const newUser: User = {
      id: uuidv4(),
      username: userDTO.username,
      createdAt: new Date()
    }

    users.push(newUser)
    this.saveUsers(users)

    // 生成并保存 token
    const token = uuidv4()
    localStorage.setItem(this.TOKEN_KEY, token)

    return newUser
  }
    // 登录验证
    login(loginDTO: LoginDTO): LoginResponse {
      const users = this.getUsers()
      const user = users.find(u => u.username === loginDTO.username)
      
      if (!user) {
        throw new Error('用户名不存在')
      }
      
      // 在实际项目中，这里应该比较加密后的密码
      if (loginDTO.password !== loginDTO.password) {
        throw new Error('密码错误')
      }
  
      // 生成新的 token
      const token = uuidv4()
      localStorage.setItem(this.TOKEN_KEY, token)
  
      return {
        user,
        token
      }
    }
}

export const localStorageService = new LocalStorageService()