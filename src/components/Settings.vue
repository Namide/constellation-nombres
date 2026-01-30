<script setup lang="ts">
import { difficulties, modes, themes, useStore, type Difficulty, type Theme } from '@/composables/useStore';

const { difficulty, theme, mode } = useStore()

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
  gold: 'or',
}
</script>

<template>
  <div class="mt-10">
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Mode</legend>
      <select v-model="mode" class="select">
        <option v-for="mode of modes" :value="mode" :key="mode">{{
          mode
          }}</option>
      </select>
    </fieldset>

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
