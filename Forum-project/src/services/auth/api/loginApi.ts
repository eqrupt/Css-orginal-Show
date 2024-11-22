
// ## loginApi.ts
// // 1. 输出涉及到的模型
// interface User {
//     username: string;  // 用户名
//     password: string;  // 密码
//     identity: string;  // 身份
//     token: string;     // 令牌
//     userStats: UserStats; // 用户统计数据
//   }
  
//   // 用户统计数据
//   interface UserStats {
//     experience: number;  // 经验值
//     level: number;      // 等级
//     points: number;     // 积分
//     ranking: number;    // 排名
//   }
  
//   // 用户等级规则
//   interface LevelRule {
//     level: number;      // 等级
//     minExperience: number;  // 所需最小经验值
//     maxExperience: number;  // 升级所需经验值
//     benefits: string[];     // 等级特权
//   }
  
//   // 积分规则
//   interface PointsRule {
//     action: string;     // 行为类型(发帖/评论等)
//     points: number;     // 获得积分数
//     dailyLimit: number; // 每日限制次数
//   }
  
//   - RegisterDTO: { username: string; password: string; identity: string }
//   - LoginDTO: { username: string; password: string }
//   - LoginResponse: { token: string; user: User }

import { User, LoginDTO, LoginResponse } from '@/types/auth/register';
// 2. 输出开发时涉及的接口
interface ILoginLocalStorageApi {
  login(loginDTO: LoginDTO): LoginResponse;
  checkCredentials(username: string, password: string): boolean;
  generateToken(): string;
  getUser(username: string): User;
  getUsernameByToken(token: string): string; // 新增通过token获取用户名的方法
}

// // 3. 接口中方法引用的方法
// "login(loginDTO: LoginDTO): LoginResponse": [
//   "checkCredentials(username: string, password: string): boolean", 
//   "generateToken(): string",
//   "getUser(username: string): User"
// ],
// "checkCredentials(username: string, password: string): boolean": [
//   "localStorage.getItem('users'): string | null"
// ],
// "generateToken(): string": [
//   "Math.random().toString(36).substring(2)"
// ],
// "getUser(username: string): User": [
//   "localStorage.getItem('users'): string | null"
// ],
// "getUsernameByToken(token: string): string": [
//   "localStorage.getItem('users'): string | null"
// ]

class LoginLocalStorageApi implements ILoginLocalStorageApi {
  private readonly USERS_KEY = 'users';
  private readonly TOKEN_KEY = 'token';

  login(loginDTO: LoginDTO): LoginResponse {
    const { username, password } = loginDTO;
    
    if (!this.checkCredentials(username, password)) {
      throw new Error('用户名或密码错误');
    }

    const user = this.getUser(username);
    const token = this.generateToken();
    user.token = token;

    // 更新用户token
    const usersJson = localStorage.getItem(this.USERS_KEY) || '[]';
    const users = JSON.parse(usersJson);
    const updatedUsers = users.map((u: User) => 
      u.username === username ? user : u
    );
    localStorage.setItem(this.USERS_KEY, JSON.stringify(updatedUsers));
    
    // 存储token到localStorage
    localStorage.setItem(this.TOKEN_KEY, token);

    return {
      token,
      user
    };
  }

  checkCredentials(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some((user: User) => 
      user.username === username && user.password === password
    );
  }

  generateToken(): string {
    return Math.random().toString(36).substring(2);
  }

  getUser(username: string): User {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.username === username);
    if (!user) {
      throw new Error('用户不存在');
    }
    return user;
  }

  getUsernameByToken(token: string): string {
    const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    const user = users.find((u: User) => u.token === token);
    if (!user) {
      throw new Error('无效的token');
    }
    return user.username;
  }
}
// 单例模式实现
let instance: LoginLocalStorageApi | null = null;

export const LoginApi = (): LoginLocalStorageApi => {
  if (!instance) {
    instance = new LoginLocalStorageApi();
  }
  return instance;
}
