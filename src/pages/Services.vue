<template>
    <section class="py-14">
      <Container>
        <h1 class="text-3xl font-semibold tracking-tight">Service</h1>
        <p class="mt-3 text-white/70 max-w-3xl">
          Transfers, Gruppenreisen, Tagestouren — hier ist alles sauber aufgelistet.
        </p>
  
        <div class="mt-10 grid gap-4 md:grid-cols-3">
          <div
            v-for="s in site.services"
            :key="s.title"
            class="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-soft"
          >
            <div class="text-lg font-semibold">{{ s.title }}</div>
            <div class="mt-2 text-sm text-white/65">{{ s.desc }}</div>
            <ul class="mt-4 grid gap-2 text-sm text-white/70">
              <li v-for="b in s.bullets" :key="b" class="flex gap-2">
                <span class="text-white/60">✓</span>
                <span>{{ b }}</span>
              </li>
            </ul>
  
            <div class="mt-6">
              <Button as="router-link" :to="{ path: '/kontakt', hash: '#reservation' }" variant="primary">
                Reservation
              </Button>
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
  