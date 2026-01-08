/**
 * 首页 Banner 数据模拟接口
 *
 * 路径: /api/banner
 * 方法: GET
 */

export default defineEventHandler(() => {
  // 模拟网络延迟
  // await new Promise(resolve => setTimeout(resolve, 100))

  return {
    code: 200,
    message: "success",
    data: [
      {
        id: 1,
        title: "Nuxt 4 实战开发",
        image: "https://picsum.photos/800/400?random=1",
        link: "/course/nuxt4",
      },
      {
        id: 2,
        title: "Vue 3 组合式 API 详解",
        image: "https://picsum.photos/800/400?random=2",
        link: "/course/vue3",
      },
      {
        id: 3,
        title: "TypeScript 高级进阶",
        image: "https://picsum.photos/800/400?random=3",
        link: "/course/ts",
      },
    ],
  };
});
