<script setup lang="ts">
import Settings from '@/components/Settings.vue';
import Info from '@/components/Info.vue';
</script>

<template>
  <main
    class="min-h-dvh flex flex-col justify-center items-center w-full h-full text-center pt-5 pb-20 max-w-10/12 mx-auto">
    <h1 class="text-5xl mb-4 text-balance">Constellation<br>des nombres</h1>
    <div class="pt-10 flex flex-col gap-5 items-center">
      <RouterLink :to="{ name: 'game' }" class="btn btn-primary btn-wide btn-xl">Commencer</RouterLink>
      <Settings />
    </div>
    <Info class="mt-10"></Info>
  </main>
</template>

<style scoped></style>
