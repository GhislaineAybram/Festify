<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useRuntimeConfig } from '#app';
import Button from 'primevue/button';

interface Celebration {
  name: string;
  description: string;
  author: string;
  date: string;
  hour: string;
  location: string;
}

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const { data: celebration, error } = await useFetch<Celebration>(() => `${runtimeConfig.public.apiUrl}/celebration/${route.params.id}`);

if (error.value) {
  console.error('Failed to fetch celebration data', error.value);
}
</script>

<template>
  <main class="main">
    <div class="bg-white">
    <div class="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
      <div>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ celebration?.name }}</h2>
        <p class="text-2xl mt-4 text-gray-900">{{ celebration?.description }}</p>
        <p class="mt-4 text-gray-500">proposé par {{ celebration?.author }}</p>

        <dl class="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
          <div class="border-t border-gray-200 pt-4">
            <dt class="font-medium text-gray-900">Date</dt>
            <dd class="mt-2 text-sm text-gray-500">Le {{ celebration?.date }}</dd>
          </div>
          <div class="border-t border-gray-200 pt-4">
            <dt class="font-medium text-gray-900">Heure</dt>
            <dd class="mt-2 text-sm text-gray-500">à {{ celebration?.hour }}</dd>
          </div>
          <div class="border-t border-gray-200 pt-4">
            <dt class="font-medium text-gray-900">Participants</dt>
            <dd class="mt-2 text-sm text-gray-500">30</dd>
          </div>
        </dl>

        <dl class="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
          <div class="border-t border-gray-200 pt-4">
            <dt class="font-medium text-gray-900">Ma réponse</dt>
            <div id="event-answer">
              <Button icon="pi pi-check" severity="success" rounded aria-label="Filter" />
              <Button icon="pi pi-bell" severity="warn" rounded aria-label="Notification" />
              <Button icon="pi pi-times" severity="danger" rounded aria-label="Cancel" />
            </div>
          </div>
        </dl>
      </div>
    </div>
  </div>

  </main>
</template>

<style>
@media (min-width: 1024px) {
  .main {
    margin-top: 59px;
    display: flex;
  }
}
</style>