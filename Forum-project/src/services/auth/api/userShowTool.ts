//用于在控制台输出当前的用户
// interface User{
//     username: string;  // 用户名
//     password: string;  // 密码
//     identity: string;  // 身份
//     token: string; // 令牌
//   }


// // 请借鉴这几种方法
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

export function showCurrentUser() {
  const usersStr = localStorage.getItem('users');
  if (!usersStr) {
    console.log('当前没有用户');
    return;
  }

  const users = JSON.parse(usersStr);
  console.log('当前所有用户:', users);
}
// 生成经验值规则并存储到localStorage
export function generateLevelRules() {
  // 定义10个等级的规则
  const levelRules = [];
  
  for (let level = 1; level <= 10; level++) {
    const rule = {
      level: level,
      minExperience: Math.pow(2, level - 1) * 100, // 指数增长的经验值要求
      maxExperience: Math.pow(2, level) * 100,
      benefits: [
        `等级${level}可以发${level}张图片`,
        `每天可以发${level * 2}个帖子`,
        `每次发帖可以获得${level * 10}经验值`
      ]
    };
    levelRules.push(rule);
  }

  // 保存到localStorage
  localStorage.setItem('levelRules', JSON.stringify(levelRules));
  console.log('已生成经验值规则:', levelRules);
}

