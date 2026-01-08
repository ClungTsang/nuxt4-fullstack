<template>
  <UContainer class="py-8">
    <div class="mb-6">
      <UButton
        to="/"
        variant="ghost"
        icon="i-lucide-arrow-left"
        color="primary"
      >
        返回首页
      </UButton>
    </div>

    <h1 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
      用户中心 (CSR 渲染)
    </h1>

    <!-- 加载状态 -->
    <div v-if="pending" class="flex items-center space-x-2 py-4">
      <UIcon
        name="i-lucide-loader-2"
        class="w-5 h-5 animate-spin text-primary-500"
      />
      <span class="text-gray-600 dark:text-gray-300">正在获取用户信息...</span>
    </div>

    <!-- 错误状态 -->
    <UAlert
      v-else-if="error"
      icon="i-lucide-alert-triangle"
      color="error"
      variant="soft"
      title="获取失败"
      :description="error.message"
    >
      <template #actions>
        <UButton color="error" variant="soft" size="xs" @click="refresh"
          >重试</UButton
        >
      </template>
    </UAlert>

    <!-- 用户信息展示 -->
    <UCard v-else-if="userInfo" class="max-w-md mx-auto">
      <template #header>
        <div class="flex items-center space-x-4">
          <UAvatar :src="userInfo.avatar" :alt="userInfo.nickname" size="2xl" />
          <div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ userInfo.nickname }}
            </h2>
            <p class="text-gray-500 dark:text-gray-400 text-sm">
              @{{ userInfo.username }}
            </p>
          </div>
        </div>
      </template>

      <div class="space-y-4">
        <div
          class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800"
        >
          <span class="text-gray-600 dark:text-gray-400">ID</span>
          <code
            class="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
            >{{ userInfo.id }}</code
          >
        </div>
        <div
          class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800"
        >
          <span class="text-gray-600 dark:text-gray-400">邮箱</span>
          <span class="text-gray-900 dark:text-gray-200">{{
            userInfo.email
          }}</span>
        </div>
        <div
          class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800"
        >
          <span class="text-gray-600 dark:text-gray-400">角色</span>
          <UBadge color="primary" variant="subtle">{{ userInfo.role }}</UBadge>
        </div>
        <div class="flex justify-between items-center py-2">
          <span class="text-gray-600 dark:text-gray-400">余额</span>
          <span class="text-xl font-bold text-green-600 dark:text-green-400">
            ¥ {{ userInfo.balance.toFixed(2) }}
          </span>
        </div>
      </div>

      <template #footer>
        <UButton
          block
          @click="refresh"
          icon="i-lucide-refresh-cw"
          color="primary"
          variant="solid"
        >
          刷新数据
        </UButton>
      </template>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
/**
 * 用户中心组件
 *
 * 展示用户信息
 * 使用 CSR 方式获取数据 (server: false)
 */
import { useUserLogic } from "./hook";

// 引入用户逻辑
const { userInfo, pending, error, refresh } = useUserLogic();
</script>
