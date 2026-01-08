/**
 * 用户基础数据模拟接口
 *
 * 路径: /api/user
 * 方法: GET
 */

export default defineEventHandler((event) => {
  // 模拟鉴权或获取用户信息

  return {
    code: 200,
    message: "success",
    data: {
      id: 1001,
      username: "HIsheR",
      nickname: "全栈开发者",
      avatar: "https://ui-avatars.com/api/?name=HR&background=random",
      email: "shawn1440982358@gmail.com",
      role: "admin",
      balance: 9999.99,
    },
  };
});
