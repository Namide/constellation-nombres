<script setup lang="ts">
import { difficulties, themes, useStore, type Difficulty, type Theme } from '@/composables/useStore';

const { difficulty, theme } = useStore()

const difficultyTrads: Record<Difficulty, string> = {
  easy: 'facile',
  medium: 'moyen',
  hard: 'difficile'
}

const themeTrads: Record<Theme, string> = {
  default: 'par défaut',
  cupcake: 'clair',
  dim: 'sombre',
  valentine: 'rose',
}
</script>

<template>
  <div>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Difficulté</legend>
      <select v-model="difficulty" class="select">
        <option v-for="name of difficulties" :value="name" :key="name">{{
          difficultyTrads[name]
          }}</option>
      </select>
    </fieldset>

    <fieldset class="fieldset">
      <legend class="fieldset-legend">Thème</legend>
      <select v-model="theme" class="select">
        <option v-for="name of themes" :value="name" :key="name">{{
          themeTrads[name]
          }}</option>
      </select>
    </fieldset>
  </div>
</template>

<style scoped></style>
