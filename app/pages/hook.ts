/**
 * 首页逻辑 Hook
 *
 * 负责处理首页的数据获取和业务逻辑
 * 采用 SSR 模式获取数据，确保首屏渲染稳定，避免 hydration 问题
 */

import { http } from "~/utils/http";

// Banner 数据类型定义
interface BannerItem {
  // Banner 唯一标识，主键，自增 ID
  id: number;
  // Banner 标题文案，用于主文案展示
  title: string;
  // Banner 图片地址，需为可访问的 http/https 链接
  image: string;
  // Banner 点击跳转链接，当前仅为占位字段
  link: string;
}

// Banner 接口响应结构
interface BannerResponse {
  // 业务状态码，200 表示成功
  code: number;
  // 实际业务数据，Banner 列表
  data: BannerItem[];
  // 文本提示信息，用于展示或调试
  message: string;
}

/**
 * 使用组合式 API 暴露首页业务逻辑
 * 所有返回值均为响应式数据，供组件直接使用
 */
export const useHomeLogic = () => {
  /**
   * 使用 useAsyncData 进行服务端数据预取
   * 注意：
   * - key 必须为稳定常量，保证服务端与客户端 payload 对齐，避免 hydration mismatch
   * - 使用 http 封装层统一处理 baseURL、错误日志等
   */
  const {
    data: bannerData,
    pending,
    error,
  } = useAsyncData<BannerResponse>("home-banner", () =>
    http.get<BannerResponse>("/banner")
  );

  /**
   * 计算属性：Banner 列表
   * 当接口数据为空或请求失败时，返回空数组，避免模板渲染时出现 undefined
   */
  const banners = computed<BannerItem[]>(() => {
    return bannerData.value?.data || [];
  });

  return {
    banners,
    pending,
    error,
  };
};
