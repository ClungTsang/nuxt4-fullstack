/*
 * @Author: HIsheR shawn1440982358@163.com
 * @Date: 2026-01-08 13:09:08
 * @LastEditTime: 2026-01-08 13:15:29
 * @Description:
 */
/**
 * 首页逻辑 Hook
 *
 * 负责处理首页的数据获取和业务逻辑
 * 采用 SSR 模式获取数据
 */

import { http } from "~/utils/http";

// Banner 数据类型定义
interface BannerItem {
  id: number;
  title: string;
  image: string;
  link: string;
}

interface BannerResponse {
  code: number;
  data: BannerItem[];
  message: string;
}

export const useHomeLogic = () => {
  // 使用 useAsyncData 进行服务端数据预取
  // 这里的 key 'home-banner' 用于在服务端和客户端之间同步数据，避免重复请求
  const {
    data: bannerData,
    pending,
    error,
  } = useAsyncData<BannerResponse>("home-banner", () =>
    http.get<BannerResponse>("/banner")
  );

  // 处理 Banner 列表数据，提供默认值
  const banners = computed(() => {
    return bannerData.value?.data || [];
  });

  return {
    banners,
    pending,
    error,
  };
};
