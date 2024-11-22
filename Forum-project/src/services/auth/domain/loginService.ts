// 作用是调用loginApi中的方法，并返回登录结果
// 1. 输出涉及到的模型
// - User: { username: string; password: string; identity: string; token: string }
// - LoginDTO: { username: string; password: string }
// - LoginResponse: { token: string; user: User }
import { LoginDTO, LoginResponse } from '@/types/auth/register';
// 2. 输出开发时涉及的接口
interface ILoginService {
  login(loginDTO: LoginDTO): LoginResponse;
  validateUsername(username: string): boolean;
  validatePassword(password: string): boolean;
}

// 3. 接口中方法引用的方法
// "login(loginDTO: LoginDTO): LoginResponse": [
//   "loginApi.login(loginDTO: LoginDTO): LoginResponse",
//   "validateUsername(username: string): boolean",
//   "validatePassword(password: string): boolean"
// ],
// "validateUsername(username: string): boolean": [
//   // 验证用户名是否符合规范
// ],
// "validatePassword(password: string): boolean": [
//   // 验证密码是否符合规范
// ]



import {  LoginApi  } from '@/services/auth/api/loginApi';  // 假设我们有这个API服务

class LoginService implements ILoginService {
  login(loginDTO: LoginDTO): LoginResponse {
    // 首先验证用户名和密码格式
    if (!this.validateUsername(loginDTO.username)) {
      throw new Error('用户名格式不正确');
    }
    if (!this.validatePassword(loginDTO.password)) {
      throw new Error('密码格式不正确');
    }
    
    // 调用API进行登录
    return LoginApi().login(loginDTO);
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
// 单例模式实现
let instance: LoginService | null = null;

export const getLoginService = (): LoginService => {
  if (!instance) {
    instance = new LoginService();
  }
  return instance;
}
