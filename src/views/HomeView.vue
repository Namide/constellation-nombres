<script setup lang="ts">
import Settings from '@/components/Settings.vue';

</script>

<template>
  <main class="min-h-dvh flex flex-col justify-center items-center w-full h-full text-center pt-5 pb-20">
    <h1 class="text-5xl mb-2 text-balance">Constellation des nombres</h1>
    <p class="max-w-10/12 text-balance">Outil pour entrainer les enfants à se représenter les nombres sous forme de
      constellation afin de leur rendre par la suite les calculs plus instinctifs.
    </p>

    <div class="py-20 flex flex-col gap-5 items-center">
      <RouterLink :to="{ name: 'game' }" class="btn btn-primary btn-wide btn-xl">Commencer</RouterLink>
      <Settings />
    </div>
  </main>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
