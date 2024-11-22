// // 1. 输出涉及到的模型
// - RegisterDTO: { username: string; password: string; identity: string }
// - LoginDTO: { username: string; password: string }
// - LoginResponse: { token: string; user: User }

// 2. 输出开发时涉及的接口
interface IRegisterService {
  register(registerDTO: RegisterDTO): User;
  validateUsername(username: string): boolean;
  validatePassword(password: string): boolean;
}

// // 3. 接口中方法引用的方法
// "register(registerDTO: RegisterDTO): User": [
//   "localStorageService.checkUsernameExists(username: string): boolean",
//   "localStorageService.createUser(userDTO: UserDTO): User"
// ],
// "validateUsername(username: string): boolean": [
//   // 验证用户名是否符合规范
// ],
// "validatePassword(password: string): boolean": [
//   // 验证密码是否符合规范
// ]
import { User, RegisterDTO } from '@/types/auth/register';
import registerApi, { IRegisterLocalStorageApi } from '../api/registerApi';
export class RegisterService implements IRegisterService {
  private localStorageService: IRegisterLocalStorageApi;
  constructor() {
    this.localStorageService = registerApi;
  }

  register(registerDTO: RegisterDTO): User {
    // 检查用户名是否已存在
    if(this.localStorageService.checkUsernameExists(registerDTO.username)) {
      throw new Error('用户名已存在');
    }

    // 验证用户名和密码
    if(!this.validateUsername(registerDTO.username)) {
      throw new Error('用户名格式不正确');
    }

    if(!this.validatePassword(registerDTO.password)) {
      throw new Error('密码格式不正确'); 
    }

    // 创建用户
    return this.localStorageService.createUser(registerDTO);
  }

  validateUsername(username: string): boolean {
    // 用户名必须是4-16位字符
    const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/;
    return usernameRegex.test(username);
  }

  validatePassword(password: string): boolean {
    // 密码必须是6-20位,只包含大小写字母和数字
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
    return passwordRegex.test(password);
  }
}
