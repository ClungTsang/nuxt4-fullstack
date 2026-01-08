/*
 * @Author: HIsheR shawn1440982358@163.com
 * @Date: 2026-01-08 13:15:21
 * @LastEditTime: 2026-01-08 13:15:24
 * @Description: 
 */
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
      username: "TraeDeveloper",
      nickname: "全栈开发者",
      avatar:
        "https://ui-avatars.com/api/?name=Trae+Developer&background=random",
      email: "developer@trae.ai",
      role: "admin",
      balance: 9999.99,
    },
  };
});
