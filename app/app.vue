<template>
  <UApp :toaster="{ position: 'top-center', duration: 3000 }">
    <UMain>
      <Analytics />
      <SpeedInsights />
      <NuxtPage />
    </UMain>
  </UApp>
</template>

<script setup lang="ts">
import { Analytics } from "@vercel/analytics/nuxt";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
/**
 * 全局应用配置
 * 设置全局 SEO 信息和 HTML 属性
 */
useHead({
  htmlAttrs: {
    lang: "zh-CN",
  },
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Nuxt 4 Template` : "Nuxt 4 Template";
  },
  meta: [
    {
      name: "description",
      content:
        "基于 Nuxt 4 的高性能企业级开发模板，集成 Nuxt UI 和 Tailwind CSS。",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "charset", content: "utf-8" },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});
</script>
