// // 1. 输出涉及到的模型
// - User: { username: string; password: string; identity: string; token: string; userStats: UserStats }
// - UserStats: { experience: number; level: number; points: number; ranking: number }
// - LevelRule: { level: number; minExperience: number; maxExperience: number; benefits: string[] }

import { defineStore } from 'pinia';
import { ExperienceStoreInstance } from '../api/experienceApi';
import { UserStats, LevelRule } from '@/types/auth/register.ts';

export const useExperienceStore = defineStore('experience', {
  state: () => ({
    experienceApi: ExperienceStoreInstance(),
    currentUsername: '', // 当前用户名
    userStats: null as UserStats | null, // 用户统计数据
    levelRules: [] as LevelRule[] // 等级规则
  }),

  getters: {
    // 获取当前用户经验值
    currentExperience(): number {
      return this.userStats?.experience || 0;
    },

    // 获取当前用户等级
    currentLevel(): number {
      return this.userStats?.level || 1;
    },

    // 获取当前用户排名
    currentRanking(): number {
      return this.userStats?.ranking || 0;
    },

    // 获取等级规则
    rules(): LevelRule[] {
      return this.levelRules;
    }
  },

  actions: {
    // 设置当前用户
    setCurrentUser(username: string) {
      this.currentUsername = username;
      this.userStats = this.experienceApi.getUserStats(username);
      this.levelRules = JSON.parse(localStorage.getItem('levelRules') || '[]');
    },

    // 获取用户经验值信息
    getExperience(username: string) {
      const stats = this.experienceApi.getUserStats(username);
      if(username === this.currentUsername) {
        this.userStats = stats;
      }
      return stats;
    },

    // 增加用户经验值
    addExperience(username: string, amount: number) {
      const stats = this.experienceApi.updateExperience(username, amount);
      if(username === this.currentUsername) {
        this.userStats = stats;
      }
      return stats;
    },

    // 获取用户等级
    getUserLevel(username: string) {
      const stats = this.experienceApi.getUserStats(username);
      return this.experienceApi.calculateLevel(stats.experience);
    },

    // 获取用户排名
    getUserRanking(username: string) {
      const ranking = this.experienceApi.getUserRanking(username);
      if(username === this.currentUsername && this.userStats) {
        this.userStats.ranking = ranking;
      }
      return ranking;
    },

    // 获取等级规则
    getLevelRules() {
      this.levelRules = JSON.parse(localStorage.getItem('levelRules') || '[]');
      return this.levelRules;
    }
  }
});
