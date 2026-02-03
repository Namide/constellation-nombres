<script setup lang="ts">
import type { ConstellationNum } from '@/types/Constellation';
import Points from '@/components/Points.vue';

defineProps<{ values: ({ type: 'strong', value: string } | { type: 'normal', value: string } | { type: 'points', value: ConstellationNum })[] }>()
</script>

<template>
  <div class="flex gap-2 items-end justify-center w-full">
    <template v-for="({ type, value }) of values">
      <span v-if="type === 'strong'" class="btn btn-xl btn-primary text-6xl py-10">{{
        value
      }}</span>
      <span v-if="type === 'normal'" class="btn btn-xl btn-neutral text-4xl py-8">{{
        value
      }}</span>
      <Points v-if="type === 'points'" :num="value"></Points>
    </template>
  </div>
</template>

<style scoped></style>
