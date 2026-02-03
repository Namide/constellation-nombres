<script setup lang="ts">
import { computed } from "vue"
import type { ConstellationNum } from '@/types/Constellation';

const props = defineProps<{ num: ConstellationNum }>()

const widthCount = computed(() => Math.ceil(props.num / 2))
const heightCount = computed(() => Math.floor(props.num < 2 ? 1 : 2))
</script>

<template>
  <div class="relative  h-auto" :style="{
    width: (100 * widthCount / 5) + '%',
    aspectRatio: `${widthCount}/${heightCount}`
  }">
    <template v-for="(_, index) in new Array(num).fill(1)">
      <div class="absolute border-4 flex items-center justify-center bg-base-300 box-content " :style="{
        top: `calc(${index % 2 ? 50 : 0}% - 4px)`,
        left: `calc(${((index - (index % 2)) * (50 / widthCount)).toFixed(1)}% - 4px)`,
        width: `calc(${100 / widthCount}% - 4px)`,
        height: `calc(${num < 2 ? '100%' : '50%'} - 4px)`
      }">
        <div class="bg-base-content w-1/5 h-1/5 rounded-full"></div>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
