/**
 * HTTP 请求封装模块
 *
 * 基于 Nuxt 4 的 $fetch 进行封装
 * 遵循官方最佳实践：
 * 1. 仅作为 HTTP 客户端，不包含 SSR/CSR 逻辑
 * 2. 统一处理请求拦截、响应处理和错误处理
 * 3. 提供类型安全的 API
 */

import type { UseFetchOptions } from "#app";

// 定义响应结构接口
export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

/**
 * HTTP 请求类
 * 封装基础的 GET, POST 等方法
 */
class HttpRequest {
  // 基础配置
  private baseURL: string;

  constructor() {
    // 可以在这里设置默认的基础路径，例如从环境变量获取
    this.baseURL = "/api";
  }

  /**
   * 核心请求方法
   * @param url 请求地址
   * @param options 请求配置
   * @returns Promise<T>
   */
  private async request<T>(url: string, options: any = {}): Promise<T> {
    const defaultOptions = {
      baseURL: this.baseURL,
      // 请求拦截
      onRequest({ options }: any) {
        // 可以在这里添加 token 等 headers
        // options.headers = options.headers || {}
        // console.log('【请求拦截】', url)
      },
      // 响应拦截
      onResponse({ response }: any) {
        // console.log('【响应拦截】', response.status)
        // 这里可以根据后端约定的状态码进行处理
        // 例如：response._data = response._data.data
      },
      // 错误处理
      onResponseError({ response }: any) {
        console.error("【接口报错】", response.status, response.statusText);
        // 可以在这里统一抛出错误或显示提示
      },
    };

    // 合并配置
    const newOptions = {
      ...defaultOptions,
      ...options,
      // 合并 headers
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    return $fetch<T>(url, newOptions);
  }

  /**
   * GET 请求
   * @param url 请求地址
   * @param query 查询参数
   * @param options 其他配置
   */
  public get<T>(url: string, query?: any, options?: any): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "GET",
      query,
    });
  }

  /**
   * POST 请求
   * @param url 请求地址
   * @param body 请求体
   * @param options 其他配置
   */
  public post<T>(url: string, body?: any, options?: any): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "POST",
      body,
    });
  }

  /**
   * PUT 请求
   * @param url 请求地址
   * @param body 请求体
   */
  public put<T>(url: string, body?: any, options?: any): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "PUT",
      body,
    });
  }

  /**
   * DELETE 请求
   * @param url 请求地址
   * @param query 查询参数
   */
  public delete<T>(url: string, query?: any, options?: any): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "DELETE",
      query,
    });
  }
}

// 导出单例
export const http = new HttpRequest();
