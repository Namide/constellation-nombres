<script setup lang="ts">
import Constellation from '@/components/Constellation.vue';
import { useStore } from '@/composables/useStore';
import { type ConstellationNum, constellationNums } from '@/types/Constellation';
import { useRafFn } from '@vueuse/core';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const LOOP_COUNT = 20

const router = useRouter()
const { difficulty, mode, landscape } = useStore()

const state = ref<'pause' | 'display' | 'hide' | 'soluce'>('pause')
const loop = ref(0)
const lastChange = ref<number | undefined>(Date.now())
const nums = ref<[ConstellationNum] | [ConstellationNum, ConstellationNum]>([1])

useRafFn
  (async () => {
    if (lastChange.value === undefined) {
      return
    }

    const now = Date.now()

    const times = {
      pause: 1000,
      display:
        { easy: 2000, medium: 500, hard: 250 }[difficulty.value] *
        { "1-10": 1, "10-20": 1.5, "addition": 2 }[mode.value],
      hide: 2000,
      soluce: 2000
    }

    if (now > lastChange.value + times[state.value]) {
      lastChange.value = now
      switch (state.value) {
        case 'pause':
          state.value = 'display'

          switch (mode.value) {
            case '1-10':
              nums.value = [
                constellationNums[Math.floor(constellationNums.length * Math.random())] as 1
              ]
              break
            case '10-20':
              nums.value = [
                10,
                constellationNums[Math.floor((constellationNums.length - 1) * Math.random() + 1)] as 1,
              ]
              break
            case 'addition':
              nums.value = [
                constellationNums[Math.floor((constellationNums.length - 1) * Math.random() + 1)] as 1,
                constellationNums[Math.floor((constellationNums.length - 1) * Math.random() + 1)] as 1,
              ]
              break
          }
          break
        case 'display':
          state.value = 'hide'
          break
        case 'hide':
          state.value = 'soluce'
          break
        case 'soluce':
          loop.value++
          if (loop.value >= LOOP_COUNT) {
            await router.push({ name: 'home' })
          } else {
            state.value = 'pause'
          }
          break
      }
    }
  }, { immediate: true, once: false })
</script>

<template>
  <main class="min-h-dvh flex flex-col items-center justify-center">
    <div class="text-center" :class="{ 'rotate-90 w-[50dvh]': landscape, 'w-10/12 md:w-1/2': !landscape }">
      <Constellation v-if="nums !== undefined && state === 'display'" :num="nums[0]" />
      <Constellation v-if="nums !== undefined && nums.length > 1 && state === 'display'" :num="nums[1]!" class="mt-4" />

      <span v-if="nums !== undefined && state === 'soluce'" class="text-9xl">{{nums.reduce((total, num) => total +
        num)
        }}</span>
    </div>

    <div class="dock dock-xl">
      <button @click="router.push({ name: 'home' })">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6">
          <g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt">
            <polyline points="1 11 12 2 23 11" fill="none" stroke="currentColor" stroke-miterlimit="10"
              stroke-width="2"></polyline>
            <path d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7" fill="none" stroke="currentColor"
              stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></path>
            <line x1="12" y1="22" x2="12" y2="18" fill="none" stroke="currentColor" stroke-linecap="square"
              stroke-miterlimit="10" stroke-width="2"></line>
          </g>
        </svg>
      </button>

      <!-- <button class="dock-active">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-square-play-icon lucide-square-play">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z" />
        </svg>
      </button> -->

      <button v-if="lastChange === undefined" @click="lastChange = Date.now()">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z" />
        </svg>
      </button>
      <button v-else @click="lastChange = undefined">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6">
          <rect x="14" y="3" width="5" height="18" rx="1" stroke="currentColor" />
          <rect x="5" y="3" width="5" height="18" rx="1" stroke="currentColor" />
        </svg>
      </button>

      <button @click="landscape = !landscape">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6">
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
          <path d="M8 16H3v5" />
        </svg>
      </button>
    </div>
  </main>
</template>

<style scoped></style>
