<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
    <Container>
      <div class="flex h-16 items-center justify-between">
        <router-link to="/" class="flex items-center gap-2">
          <div class="h-8 w-8 rounded-xl bg-white/10 border border-white/10 grid place-items-center">
            <span class="text-xs font-semibold">WT</span>
          </div>
          <div class="leading-tight">
            <div class="text-sm font-semibold tracking-tight">{{ site.brand }}</div>
            <div class="text-[11px] text-white/60">Taxi • Transfer • Touren</div>
          </div>
        </router-link>

        <nav class="hidden md:flex items-center gap-6 text-sm text-white/80">
          <router-link class="hover:text-white transition" to="/">Home</router-link>
          <router-link class="hover:text-white transition" to="/ueber-uns">Über uns</router-link>
          <router-link class="hover:text-white transition" to="/service">Service</router-link>
          <router-link class="hover:text-white transition" to="/fahrzeuge">Fahrzeuge</router-link>
          <router-link class="hover:text-white transition" to="/kontakt">Kontakt</router-link>
        </nav>

        <div class="flex items-center gap-2">
          <a
            class="hidden sm:inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10 transition"
            :href="`tel:${site.phoneTel}`"
          >
            {{ site.phoneDisplay }}
          </a>

          <!-- Calendly (scheduled rides) -->
          <button
            class="hidden sm:inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10 transition disabled:opacity-60"
            :disabled="calendlyLoading"
            @click="openCalendly"
            title="Für geplante Fahrten (Airport, Touren, Gruppen)"
          >
            <span v-if="!calendlyLoading">Plan a ride</span>
            <span v-else>Loading…</span>
          </button>

          <!-- Your existing reservation -->
          <Button as="router-link" :to="{ path: '/kontakt', hash: '#reservation' }">
            Reservation
          </Button>

          <button
            class="md:hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 transition"
            @click="open = !open"
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>

      <div v-if="open" class="md:hidden pb-4">
        <div class="grid gap-2 text-sm text-white/80">
          <router-link class="rounded-xl border border-white/10 bg-white/5 px-4 py-3" to="/" @click="open=false">Home</router-link>
          <router-link class="rounded-xl border border-white/10 bg-white/5 px-4 py-3" to="/ueber-uns" @click="open=false">Über uns</router-link>
          <router-link class="rounded-xl border border-white/10 bg-white/5 px-4 py-3" to="/service" @click="open=false">Service</router-link>
          <router-link class="rounded-xl border border-white/10 bg-white/5 px-4 py-3" to="/fahrzeuge" @click="open=false">Fahrzeuge</router-link>
          <router-link class="rounded-xl border border-white/10 bg-white/5 px-4 py-3" to="/kontakt" @click="open=false">Kontakt</router-link>

          <a class="rounded-xl border border-white/10 bg-white/5 px-4 py-3" :href="`tel:${site.phoneTel}`">
            Anrufen: {{ site.phoneDisplay }}
          </a>

          <!-- Calendly in mobile menu -->
          <button
            class="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left hover:bg-white/10 transition disabled:opacity-60"
            :disabled="calendlyLoading"
            @click="openCalendlyMobile"
          >
            <span class="block text-white/90">Plan a ride (Calendly)</span>
            <span class="block text-xs text-white/60">Airport • Touren • Gruppen</span>
          </button>

          <router-link
            class="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
            :to="{ path: '/kontakt', hash: '#reservation' }"
            @click="open=false"
          >
            Reservation
          </router-link>
        </div>
      </div>
    </Container>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Container from "./Container.vue";
import Button from "./Button.vue";
import { site } from "../data/site";
import { loadCalendlyScript, openCalendlyPopup } from "../composables/useCalendly";

const open = ref(false);
const calendlyLoading = ref(false);

// ✅ Put your real Calendly event link here:
const calendlyUrl = "https://calendly.com/YOUR_ORG/YOUR_EVENT";

async function openCalendly() {
  try {
    calendlyLoading.value = true;
    await loadCalendlyScript();
    openCalendlyPopup(calendlyUrl);
  } finally {
    calendlyLoading.value = false;
  }
}

async function openCalendlyMobile() {
  open.value = false;
  await openCalendly();
}
</script>
