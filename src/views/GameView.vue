<script setup lang="ts">
import Constellation from '@/components/Constellation.vue';
import Soluce from '@/components/Soluce.vue';
import { useStore } from '@/composables/useStore';
import { createRNGFromTo, createRNGFromList } from '@/helpers/createRNG';
import { type ConstellationNum } from '@/types/Constellation';
import { useRafFn, useWakeLock } from '@vueuse/core';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Points from '@/components/Points.vue';

const LOOP_COUNT = 20

const router = useRouter()
const { difficulty, mode, landscape } = useStore()
const { release, request } = useWakeLock()

onMounted(() => request('screen'))
onUnmounted(() => release())

const state = ref<'pause' | 'display' | 'hide' | 'soluce'>('pause')
const loop = ref(0)
const lastChange = ref<number | undefined>(Date.now())
const ratio = [5, Number({
  "1-10": 2,
  "10-20": 5,
  "addition": 5,
  "div-2": 5,
  "div-3": 5,
  "div-mult": 5,
  "div-mult-rest": 5,
  "20-div-mult": 8,
}[mode.value])] as const

const questionDisplay = ref<({ type: 'operator', value: string } | { type: 'constellation', value: ConstellationNum } | { type: 'points', value: ConstellationNum })[]>([])
const responseDisplay = ref<({ type: 'strong', value: string } | { type: 'normal', value: string } | { type: 'points', value: ConstellationNum })[]>([])

const random = {
  "1-10": createRNGFromTo(0, 10),
  "10-20": createRNGFromTo(0, 10),
  "addition": createRNGFromTo(1, 9),
  "div-2": createRNGFromList([2, 4, 6, 8, 10]),
  "div-3": createRNGFromList([3, 6, 9]),
  "div-mult": createRNGFromList([3, 6, 9]),
  "div-mult-rest": createRNGFromTo(2, 10),
  "20-div-mult": createRNGFromTo(1, 10),
}[mode.value]

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
        { "1-10": 1, "10-20": 1.5, addition: 2, "div-2": 2, "div-3": 2, "div-mult": 2, "div-mult-rest": 2, "20-div-mult": 2 }[mode.value],
      hide: 2000,
      soluce: 2000
    }

    if (now > lastChange.value + times[state.value]) {
      lastChange.value = now
      switch (state.value) {
        case 'pause':
          state.value = 'display'

          switch (mode.value) {
            case '1-10': {
              const num = random() as ConstellationNum
              questionDisplay.value = [{ type: 'constellation', value: num }]
              responseDisplay.value = [{ type: 'strong', value: `${num}` }]
              break
            }
            case '10-20': {
              const num = random() as ConstellationNum
              questionDisplay.value = [{ type: 'constellation', value: 10 }, { type: 'constellation', value: num }]
              responseDisplay.value = [{ type: 'strong', value: `${10 + num}` }]
              break
            }
            case 'addition': {
              const num1 = random() as ConstellationNum
              const num2 = random() as ConstellationNum
              questionDisplay.value = [
                { type: 'constellation', value: num1 },
                { type: 'operator', value: '+' },
                { type: 'constellation', value: num2 }
              ]
              responseDisplay.value = [{ type: 'strong', value: `${num1 + num2}` }]
              break
            }
            case 'div-2': {
              const num = random() as ConstellationNum
              questionDisplay.value = [
                { type: 'constellation', value: num },
                { type: 'operator', value: '÷' },
                { type: 'points', value: 2 }
              ]
              responseDisplay.value = [
                { type: 'strong', value: `${(num / 2).toFixed(0)}` },
                { type: 'points', value: 2 }
              ]
              // + = × ÷
              break
            }
            case 'div-3': {
              const num = random() as ConstellationNum
              questionDisplay.value = [
                { type: 'constellation', value: num },
                { type: 'operator', value: '÷' },
                { type: 'points', value: 3 }
              ]
              responseDisplay.value = [
                { type: 'strong', value: `${(num / 3).toFixed(0)}` },
                { type: 'points', value: 3 }
              ]
              // + = × ÷
              break
            }
            case 'div-mult': {
              const num = random() as ConstellationNum
              const divisors = [5, 4, 3, 2].filter(div => Math.round(num / div) === num / div) || [2]
              const divisor = divisors[Math.floor(Math.random() * divisors.length)]!
              questionDisplay.value = [
                { type: 'constellation', value: num },
                { type: 'operator', value: '÷' },
                { type: 'points', value: divisor }
              ]
              responseDisplay.value = [
                { type: 'strong', value: `${(num / divisor).toFixed(0)}` },
                { type: 'points', value: divisor }
              ]
              // + = × ÷
              break
            }
            case 'div-mult-rest': {
              const num = random() as ConstellationNum
              const divisors = [5, 4, 3, 2].filter(div => num / div >= 2)
              if (divisors.length < 1) {
                divisors.push(...[5, 4, 3, 2].filter(div => num / div >= 1))
              }
              const divisor = divisors[Math.floor(Math.random() * divisors.length)]!
              questionDisplay.value = [
                { type: 'constellation', value: num },
                { type: 'operator', value: '÷' },
                { type: 'points', value: Math.floor(divisor) }
              ]

              const intQuotient = Math.floor(num / divisor)
              const rest = Math.round(num - intQuotient * divisor)
              responseDisplay.value = [
                { type: 'strong', value: `${(intQuotient).toFixed(0)}` },
                { type: 'points', value: divisor }
              ]

              if (rest > 0) {
                // responseDisplay.value.push(
                //   { type: 'normal', value: `+` },
                //   { type: 'strong', value: `${rest.toFixed(0)}` }
                // )
                responseDisplay.value.push(
                  { type: 'normal', value: `+` },
                  { type: 'strong', value: `${rest.toFixed(0)}` },
                  { type: 'points', value: 1 },
                )
              }

              // + = × ÷
              break
            }
            case '20-div-mult': {
              const num2 = random() as ConstellationNum
              const num = num2 + 10
              const divisors = [5, 4, 3, 2].filter(div => num / div >= 2)
              if (divisors.length < 1) {
                divisors.push(...[5, 4, 3, 2].filter(div => num / div >= 1))
              }
              const divisor = divisors[Math.floor(Math.random() * divisors.length)]!
              questionDisplay.value = [
                { type: 'constellation', value: 10 },
                { type: 'constellation', value: num2 },
                { type: 'operator', value: '÷' },
                { type: 'points', value: Math.floor(divisor) }
              ]

              const intQuotient = Math.floor(num / divisor)
              const rest = Math.round(num - intQuotient * divisor)
              responseDisplay.value = [
                { type: 'strong', value: `${(intQuotient).toFixed(0)}` },
                { type: 'points', value: divisor }
              ]

              if (rest > 0) {
                // responseDisplay.value.push(
                //   { type: 'normal', value: `+` },
                //   { type: 'strong', value: `${rest.toFixed(0)}` }
                // )
                responseDisplay.value.push(
                  { type: 'normal', value: `+` },
                  { type: 'strong', value: `${rest.toFixed(0)}` },
                  { type: 'points', value: 1 },
                )
              }

              // + = × ÷
              break
            }
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
  <main class="min-h-dvh overflow-hidden">
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[calc(-50%-40px)] text-center flex flex-col justify-center items-center gap-4"
      :class="{
        'rotate-90 w-[calc(90dvh-80px)]': landscape,
        'w-10/12 md:w-1/2': !landscape
      }" :style="{
        aspectRatio: `${ratio[0]} / ${ratio[1]}`,
        maxWidth: landscape ? `calc(${ratio[0] * 90 / ratio[1]}vw)` : `calc(${ratio[0] / ratio[1]} * 90dvh - 80px)`
      }">

      <template v-if="state === 'display'" v-for="item of questionDisplay">

        <Constellation v-if="item.type === 'constellation'" :num="item.value" class="w-full" />
        <div v-else-if="item.type === 'operator'" class="text-9xl -my-10 z-10 relative text-base-content">
          {{ item.value }}
        </div>
        <Points v-else-if="item.type === 'points'" :num="item.value" class="text-9xl relative text-base-content">
        </Points>

      </template>

      <Soluce v-if="state === 'soluce'" class="text-9xl" :values="responseDisplay"></Soluce>
    </div>

    <div class="dock dock-xl">
      <button @click="router.push({ name: 'home' })">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6">
          <g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt">
            <polyline points="1 11 12 2 23 11" fill="none" stroke="currentColor" stroke-miterlimit="10"
              stroke-width="2">
            </polyline>
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
