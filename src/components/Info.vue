<script setup lang="ts">
import { useTemplateRef } from 'vue'

const modal = useTemplateRef<HTMLDialogElement>('modal')
</script>

<template>
  <div>
    <button class="btn" @click="modal?.showModal()">C'est quoi ?</button>
    <dialog ref="modal" class="modal">
      <div class="modal-box">
        <form method="dialog ">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            @click="modal?.close(); $event.preventDefault()">✕</button>
        </form>
        <h2 class="text-lg font-bold">Infos</h2>
        <div class="py-4">
          <p class="text-balance">C'est un outil pour entrainer les enfants à se représenter afin de leur rendre par la
            suite les calculs plus intuitif.
          </p>
          <p class="text-balance mt-4">Il faut jouer à plusieurs en plaçant l'écran visible pour tous. Il faut être le
            premier à
            donner le nombre avant que la solution ne s'affiche.
          </p>
          <p class="text-balance mt-4">Si vous souhaitez donner votre avis ou participer au développement rendez-vous
            sur
            :<br>
            <a href="https://github.com/Namide/constellation-nombres" rel="noreferrer noopener" target="_blank"
              class="btn btn-link">github.com/Namide/constellation-nombres</a>
          </p>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped></style>
