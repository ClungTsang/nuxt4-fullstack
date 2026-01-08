<!--
 * @Author: HIsheR shawn1440982358@163.com
 * @Date: 2026-01-08 13:08:44
 * @LastEditTime: 2026-01-08 13:53:21
 * @Description: 
-->
<template>
  <UContainer class="py-8">
    <h1 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
      首页 (SSR 渲染)
    </h1>

    <!-- 加载状态 -->
    <div v-if="pending" class="flex justify-center py-12">
      <UIcon
        name="i-lucide-loader-2"
        class="w-8 h-8 animate-spin text-primary-500"
      />
    </div>

    <!-- 错误状态 -->
    <UAlert
      v-else-if="error"
      icon="i-lucide-alert-circle"
      color="error"
      variant="soft"
      title="请求出错"
      :description="error.message"
      class="mb-4"
    />

    <!-- 数据展示 -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard
        v-for="(item, index) in banners"
        :key="item.id"
        class="hover:shadow-lg transition-shadow duration-300"
      >
        <div class="aspect-video w-full overflow-hidden">
          <!-- 
            LCP 优化：
            1. 首图添加 fetchpriority="high" 提升优先级
            2. 首图 eager loading，其他 lazy loading
          -->
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            :fetchpriority="index === 0 ? 'high' : 'auto'"
            :loading="index === 0 ? 'eager' : 'lazy'"
          />
        </div>
        <div class="p-4">
          <h3 class="font-medium text-lg text-gray-900 dark:text-white mb-2">
            {{ item.title }}
          </h3>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            ID: {{ item.id }}
          </p>
        </div>
      </UCard>
    </div>

    <div class="mt-8 flex justify-center">
      <UButton
        to="/user"
        size="lg"
        icon="i-lucide-user"
        trailing
        color="primary"
        variant="solid"
      >
        前往用户中心 (CSR 示例)
      </UButton>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
/**
 * 首页组件
 *
 * 展示 Banner 列表
 * 使用 SSR 方式获取数据
 */
import { useHomeLogic } from "./hook";

// 引入业务逻辑
const { banners, pending, error } = useHomeLogic();

// 页面级 SEO 配置
useHead({
  title: '首页',
  meta: [
    { name: 'description', content: 'Nuxt 4 模板首页，展示 SSR 数据获取与性能优化示例。' }
  ]
})
</script>
