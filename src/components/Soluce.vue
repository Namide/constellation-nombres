<script setup lang="ts">
import type { ConstellationNum } from '@/types/Constellation';
import Points from '@/components/Points.vue';
import NeutralValue from './NeutralValue.vue';
import PrimaryValue from './PrimaryValue.vue';
import SecondaryValue from './SecondaryValue.vue';

defineProps<{ values: ({ type: 'primary' | 'secondary', value: string } | { type: 'neutral', value: string } | { type: 'points', value: ConstellationNum })[] }>()
</script>

<template>
  <div class="flex gap-2 items-end justify-center w-full">
    <template v-for="({ type, value }) of values">
      <PrimaryValue v-if="type === 'primary'">{{
        value
      }}</PrimaryValue>
      <SecondaryValue v-else-if="type === 'secondary'">{{
        value
      }}</SecondaryValue>
      <NeutralValue v-else-if="type === 'neutral'">{{
        value
      }}</NeutralValue>
      <Points v-else-if="type === 'points'" :num="value"></Points>
    </template>
  </div>
</template>

<style scoped></style>
