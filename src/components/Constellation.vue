<script setup lang="ts">
import type { ConstellationNum } from '@/types/Constellation';

defineProps<{ num: ConstellationNum }>()
</script>

<template>
  <div class="aspect-5/2 border-2 relative bg-base-300">
    <div v-for="(_, index) in new Array(10).fill(1)"
      class="w-1/5 h-1/2 absolute border-2 flex items-center justify-center"
      :style="{ top: index % 2 ? '50%' : 0, left: ((index - (index % 2)) * 10).toFixed(1) + '%' }">
      <div v-if="index < num" class="bg-base-content w-1/5 h-1/5 rounded-full"></div>
    </div>
  </div>
</template>

<style scoped></style>
