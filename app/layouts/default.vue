<template>
  <div>
    <SpeedInsights />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";
</script>
