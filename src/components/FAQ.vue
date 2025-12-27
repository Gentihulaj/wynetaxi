<template>
    <section class="py-14 border-t border-white/10">
      <Container>
        <h2 class="text-2xl font-semibold tracking-tight">FAQ</h2>
  
        <div class="mt-6 grid gap-3">
          <details
            v-for="f in site.faq"
            :key="f.q"
            class="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <summary class="cursor-pointer list-none flex items-center justify-between gap-4">
              <span class="font-medium">{{ f.q }}</span>
              <span class="text-white/60">+</span>
            </summary>
            <p class="mt-3 text-sm text-white/70">{{ f.a }}</p>
          </details>
        </div>
      </Container>
    </section>
  </template>
  
  <script setup lang="ts">
  import Container from "./Container.vue";
  import { site } from "../data/site";
  </script>
  