<script setup lang="ts">
import Settings from '@/components/Settings.vue';

</script>

<template>
  <main
    class="min-h-dvh flex flex-col justify-center items-center w-full h-full text-center pt-5 pb-20 max-w-10/12 mx-auto">
    <h1 class="text-5xl mb-4 text-balance">Constellation des nombres</h1>
    <p class="text-balance">Outil pour entrainer les enfants à se représenter les nombres sous forme de
      constellation afin de leur rendre par la suite les calculs plus intuitif.
    </p>
    <p class="text-balance mt-4">Jouez à plusieurs en plaçant l'écran visible pour tous. Le premier qui donne le bon
      nombre avant l'affichage de la solution gagne 1 point.
    </p>

    <div class="pt-10 flex flex-col gap-5 items-center">
      <RouterLink :to="{ name: 'game' }" class="btn btn-primary btn-wide btn-xl">Commencer</RouterLink>
      <Settings />
    </div>
  </main>
</template>

<style scoped></style>
