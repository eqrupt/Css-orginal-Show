import { LevelRule, UserStats } from '@/types/auth/register';
import { User } from '@/types/auth/register';
import { generateLevelRules } from './userShowTool';

interface IExperienceStore {
  // 从localStorage获取token，根据token获取用户经验信息
  getExperienceByToken(token: string): UserStats;

  // 获取用户统计数据
  getUserStats(username: string): UserStats;

  // 更新用户经验值,返回更新后的用户统计数据 
  updateExperience(username: string, experience: number): UserStats;

  // 计算用户等级
  calculateLevel(experience: number): number;

  // 获取用户排名
  getUserRanking(username: string): number;
}

class ExperienceStore implements IExperienceStore {
  readonly USERS_KEY = 'users';

  // 封装查找用户的方法
  findUser(key: string, value: string): User {
    const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]') as User[];
    const user = users.find(u => u[key as keyof User] === value);
    if (!user) {
      throw new Error('用户不存在');
    }
    return user;
  }

  getExperienceByToken(token: string): UserStats {
    const user = this.findUser('token', token);
    return user.userStats;
  }

  getUserStats(username: string): UserStats {
    const user = this.findUser('username', username);
    return user.userStats;
  }

  updateExperience(username: string, experience: number): UserStats {
    const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]') as User[];
    const user = this.findUser('username', username);

    // 更新经验值
    user.userStats.experience += experience;
    // 重新计算等级
    user.userStats.level = this.calculateLevel(user.userStats.experience);

    // 保存更新后的用户数据
    const updatedUsers = users.map((u: User) => 
      u.username === username ? user : u
    );
    localStorage.setItem(this.USERS_KEY, JSON.stringify(updatedUsers));

    return user.userStats;
  }

  calculateLevel(experience: number): number {
    const levelRules = JSON.parse(localStorage.getItem('levelRules') || '[]');
    if (levelRules.length === 0) {
      generateLevelRules();
      return this.calculateLevel(experience); // 重新调用以获取新生成的规则
    }
    // 根据经验值计算等级
    const currentLevel = levelRules.find((rule: LevelRule) => 
      experience >= rule.minExperience && experience < rule.maxExperience
    );
    return currentLevel ? currentLevel.level : 1;
  }

  getUserRanking(username: string): number {
    const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]') as User[];
    // 按经验值排序
    const sortedUsers = users.sort((a: User, b: User) => 
      b.userStats.experience - a.userStats.experience
    );
    const rank = sortedUsers.findIndex((u: User) => u.username === username) + 1;
    return rank || -1;
  }
}

// 单例模式实现
let instance: ExperienceStore | null = null;

export const ExperienceStoreInstance = (): ExperienceStore => {
  if (!instance) {
    instance = new ExperienceStore();
  }
  return instance;
}
