<template>
    <section class="py-14">
      <Container>
        <h1 class="text-3xl font-semibold tracking-tight">Fahrzeuge</h1>
        <p class="mt-3 text-white/70 max-w-3xl">
          Fahrzeugwahl nach Bedarf: komfortabel solo oder als Gruppe.
        </p>
  
        <div class="mt-10 grid gap-4 md:grid-cols-2">
          <div
            v-for="v in site.vehicles"
            :key="v.name"
            class="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-soft"
          >
            <div class="flex items-center justify-between gap-4">
              <div class="text-lg font-semibold">{{ v.name }}</div>
              <span class="text-xs rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
                {{ v.capacity }}
              </span>
            </div>
  
            <ul class="mt-4 grid gap-2 text-sm text-white/70">
              <li v-for="p in v.perks" :key="p" class="flex gap-2">
                <span class="text-white/60">•</span>
                <span>{{ p }}</span>
              </li>
            </ul>
  
            <div class="mt-6 flex flex-col sm:flex-row gap-2">
              <Button as="router-link" :to="{ path: '/kontakt', hash: '#reservation' }" variant="primary">
                Reservieren
              </Button>
              <Button as="a" :href="`tel:${site.phoneTel}`" variant="soft">Anrufen</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  </template>
  
  <script setup lang="ts">
  import Container from "../components/Container.vue";
  import Button from "../components/Button.vue";
  import { site } from "../data/site";
  </script>
  