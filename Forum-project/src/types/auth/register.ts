// 用户接口定义
export interface User {
  username: string;  // 用户名
  password: string;  // 密码
  identity: string;  // 身份
  token: string;     // 令牌
  userStats: UserStats; // 用户统计数据
}

// 注册数据传输对象
export interface RegisterDTO {
  username: string;
  password: string;
  identity: string;
}

// 登录数据传输对象
export interface LoginDTO {
  username: string;
  password: string;
}

// 登录响应对象
export interface LoginResponse {
  token: string;
  user: User;
}

// 用户统计数据
export interface UserStats {
  experience: number;  // 经验值
  level: number;      // 等级
  points: number;     // 积分
  ranking: number;    // 排名
}

// 用户等级规则
export interface LevelRule {
  level: number;      // 等级
  minExperience: number;  // 所需最小经验值
  maxExperience: number;  // 升级所需经验值
  benefits: string[];     // 等级特权
}

// 积分规则
export interface PointsRule {
  action: string;     // 行为类型(发帖/评论等)
  points: number;     // 获得积分数
  dailyLimit: number; // 每日限制次数
}
