// interface User { username: string; password: string; identity: string; token: string; userStats: UserStats; }

// interface UserStats { experience: number; level: number; points: number; ranking: number; }

// interface LevelRule { level: number; minExperience: number; maxExperience: number; benefits: string[]; }

// interface PointsRule { action: string; points: number; dailyLimit: number; }

// - RegisterDTO: { username: string; password: string; identity: string }
// - LoginDTO: { username: string; password: string }
// - LoginResponse: { token: string; user: User }
import { User, RegisterDTO } from '@/types/auth/register';

// // 2. 输出开发时涉及的接口
export interface IRegisterLocalStorageApi {
  checkUsernameExists(username: string): boolean;
  createUser(userDTO: RegisterDTO): User;
  getUsers(): User[];
}

// // 3. 接口中方法引用的方法
// "checkUsernameExists(username: string): boolean": [
//   "localStorage.getItem('users'): string | null"
// ],
// "createUser(userDTO: RegisterDTO): User": [
//   "localStorage.getItem('users'): string | null",
//   "localStorage.setItem('users', JSON.stringify(users))"
// ],
// "getUsers(): User[]": [
//   "localStorage.getItem('users'): string | null"
// ]
class RegisterLocalStorageApi implements IRegisterLocalStorageApi {
  checkUsernameExists(username: string): boolean {
    const users = this.getUsers();
    return users.some(user => user.username === username);
  }

  createUser(userDTO: RegisterDTO): User {
    const users = this.getUsers();
    
    // 创建新用户对象
    const newUser: User = {
      ...userDTO,
      token: Math.random().toString(36).substring(2), // 生成随机token
      userStats: {
        experience: 0,
        level: 1, 
        points: 0,
        ranking: 0
      }
    };

    // 添加到用户列表
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return newUser;
  }

  getUsers(): User[] {
    const usersStr = localStorage.getItem('users');
    if (!usersStr) {
      return [];
    }
    return JSON.parse(usersStr);
  }
}

// 创建单例实例
const registerApi = new RegisterLocalStorageApi();

// 导出单例
export default registerApi;
