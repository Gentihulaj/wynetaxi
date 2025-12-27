<template>
    <section class="py-14">
      <Container>
        <div class="flex items-end justify-between gap-6">
          <div>
            <h2 class="text-2xl font-semibold tracking-tight">Service</h2>
            <p class="mt-2 text-sm text-white/65 max-w-2xl">
              Klarer Fokus: pünktliche Abholung, sichere Fahrt, einfache Buchung.
            </p>
          </div>
          <Button as="router-link" to="/service" variant="ghost" class="hidden sm:inline-flex">
            Details
          </Button>
        </div>
  
        <div class="mt-8 grid gap-4 md:grid-cols-3">
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
          </div>
        </div>
  
        <div class="mt-6 sm:hidden">
          <Button as="router-link" to="/service" variant="ghost" class="w-full">
            Service Details
          </Button>
        </div>
      </Container>
    </section>
  </template>
  
  <script setup lang="ts">
  import Container from "./Container.vue";
  import Button from "./Button.vue";
  import { site } from "../data/site";
  </script>
  