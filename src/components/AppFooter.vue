<template>
  <footer class="border-t border-white/10 bg-zinc-950">
    <Container>
      <div class="py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div class="text-lg font-semibold">{{ site.brand }}</div>
          <div class="mt-2 text-sm text-white/60">
            Schnell, sicher, pünktlich — Transfers, Gruppenfahrten, Tagestouren.
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            <Badge v-for="h in site.highlights" :key="h">{{ h }}</Badge>
          </div>
        </div>

        <div class="text-sm">
          <div class="font-semibold">Kontakt</div>
          <div class="mt-2 text-white/70">
            <div>
              Telefon:
              <a class="text-white hover:underline" :href="`tel:${site.phoneTel}`">
                {{ site.phoneDisplay }}
              </a>
            </div>
            <div class="mt-1">
              E-Mail:
              <a class="text-white hover:underline" :href="`mailto:${site.email}`">
                {{ site.email }}
              </a>
            </div>
          </div>
        </div>

        <div class="text-sm">
          <div class="font-semibold">Navigation</div>
          <div class="mt-2 grid gap-2 text-white/70">
            <router-link class="hover:text-white" to="/service">Service</router-link>
            <router-link class="hover:text-white" to="/fahrzeuge">Fahrzeuge</router-link>
            <router-link class="hover:text-white" to="/kontakt">Reservation</router-link>
          </div>
        </div>
      </div>

      <div class="pb-8 text-xs text-white/50 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <div>© {{ new Date().getFullYear() }} {{ site.brand }}. All rights reserved.</div>
      </div>
    </Container>
  </footer>
</template>

<script setup lang="ts">
import Container from "./Container.vue";
import Badge from "./Badge.vue";
import { site } from "../data/site";
</script>
