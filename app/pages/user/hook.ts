/**
 * 用户页面逻辑 Hook
 *
 * 负责处理用户页面的数据获取
 * 采用 CSR (客户端渲染) 模式
 */

// 用户信息类型定义
interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  email: string;
  role: string;
  balance: number;
}

interface UserResponse {
  code: number;
  message: string;
  data: UserInfo;
}

export const useUserLogic = () => {
  // 使用 useFetch 配合 server: false 实现纯客户端请求
  // 这种方式不会在服务端执行，仅在客户端挂载后发起请求
  const {
    data: userData,
    pending,
    error,
    refresh,
  } = useFetch<UserResponse>("/api/user", {
    key: "user-profile", // 缓存 key
    server: false, // 关键配置：关闭服务端渲染时的请求
    lazy: true, // 推荐：不阻塞路由导航

    // 可以在这里配置请求头等
    onRequest({ options }) {
      // options.headers.set('Authorization', 'Bearer ...')
    },

    onResponseError({ response }) {
      console.error("用户数据获取失败:", response);
    },
  });

  // 计算属性提取实际用户数据
  const userInfo = computed(() => {
    return userData.value?.data || null;
  });

  return {
    userInfo,
    pending,
    error,
    refresh,
  };
};
