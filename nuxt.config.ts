// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 按需加载的官方模块
  modules: ["@nuxt/eslint", "@nuxt/ui"],

  devtools: {
    enabled: true,
  },

  // 全局样式（包含 Tailwind）
  css: ["~/assets/css/main.css"],

  /**
   * 路由渲染与缓存策略
   * 参考 Nuxt 性能最佳实践：
   * - 首页使用 prerender 静态预渲染，提升首屏加载速度与稳定性
   * - 后续有需要可对部分页面关闭 SSR 或启用 SWR/ISR
   */
  routeRules: {
    "/": {
      // 构建时预渲染首页，避免每次请求都在服务端重新渲染
      prerender: true,
    },
  },

  /**
   * NuxtLink 默认行为优化
   * 参考性能指南，开启交互式预取可以避免过多首屏预加载压力
   */
  experimental: {
    defaults: {
      nuxtLink: {
        // 仅在用户交互时预取，减少首屏 JS 体积与请求
        prefetchOn: "interaction",
      },
    },
  },

  // 兼容性日期
  compatibilityDate: "2025-01-15",

  // ESLint 配置
  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
