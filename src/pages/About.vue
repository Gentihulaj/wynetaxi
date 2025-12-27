<template>
    <section class="py-14">
      <Container>
        <h1 class="text-3xl font-semibold tracking-tight">Über uns</h1>
        <p class="mt-4 text-white/70 max-w-3xl">
          Wir sind ein lokaler Taxi- und Transfer-Service mit Fokus auf Zuverlässigkeit, klare Kommunikation
          und entspannte Fahrten. Das Ziel ist simpel: du kommst pünktlich an — ohne Drama.
        </p>
  
        <div class="mt-10 grid gap-4 md:grid-cols-3">
          <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div class="font-semibold">Pünktlichkeit</div>
            <p class="mt-2 text-sm text-white/70">Wir planen realistisch, damit du nicht schwitzt.</p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div class="font-semibold">Sicherheit</div>
            <p class="mt-2 text-sm text-white/70">Ruhige Fahrweise, klare Abholungspunkte, sauberes Fahrzeug.</p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div class="font-semibold">Einfach buchen</div>
            <p class="mt-2 text-sm text-white/70">WhatsApp, Telefon oder E-Mail — du wählst.</p>
          </div>
        </div>
      </Container>
    </section>
  </template>
  
  <script setup lang="ts">
  import Container from "../components/Container.vue";
  </script>
  