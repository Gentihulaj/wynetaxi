<template>
  <section class="py-14">
    <Container>
      <h1 class="text-3xl font-semibold tracking-tight">Kontakt</h1>
      <p class="mt-3 text-white/70 max-w-3xl">
        Schnellste Wege: Telefon oder WhatsApp. Für Details: Formular unten.
      </p>

      <div class="mt-8 grid gap-4 md:grid-cols-3">
        <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div class="font-semibold">Telefon</div>
          <a class="mt-2 block text-white/80 hover:text-white underline" :href="`tel:${site.phoneTel}`">
            {{ site.phoneDisplay }}
          </a>
          <div class="mt-2 text-sm text-white/60">Für sofortige Abholung am besten anrufen.</div>
        </div>

        <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div class="font-semibold">WhatsApp</div>
          <a class="mt-2 block text-white/80 hover:text-white underline" :href="waQuick" target="_blank" rel="noopener">
            Nachricht senden
          </a>
          <div class="mt-2 text-sm text-white/60">Ideal für schnelle Reservierungen.</div>
        </div>

        <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div class="font-semibold">E-Mail</div>
          <a class="mt-2 block text-white/80 hover:text-white underline" :href="'mailto:' + site.email">
            {{ site.email }}
          </a>
          <div class="mt-2 text-sm text-white/60">Für längere Details oder spezielle Anfragen.</div>
        </div>
      </div>

      <div id="reservation" class="mt-12 scroll-mt-24">
        <div class="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-soft">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="text-lg font-semibold">Reservation</div>
              <div class="text-sm text-white/60">Ausfüllen → per WhatsApp oder E-Mail senden.</div>
            </div>
            <Button as="a" :href="`tel:${site.phoneTel}`" variant="ghost">Anrufen</Button>
          </div>

          <form class="mt-6 grid gap-4" @submit.prevent="sendWhatsApp">
            <div class="grid sm:grid-cols-2 gap-3">
              <Field v-model="p.pickup" label="Abholort" placeholder="Adresse / Ort / Treffpunkt" />
              <Field v-model="p.destination" label="Ziel" placeholder="Adresse / Ort" />
            </div>

            <div class="grid sm:grid-cols-3 gap-3">
              <Field v-model="p.date" label="Datum" type="date" />
              <Field v-model="p.time" label="Uhrzeit" type="time" />
              <Field v-model.number="p.passengers" label="Personen" type="number" min="1" />
            </div>

            <div class="grid sm:grid-cols-2 gap-3">
              <Field v-model="p.name" label="Name" placeholder="Vorname Nachname" />
              <Field v-model="p.phone" label="Telefon" placeholder="+41 …" />
            </div>

            <div class="grid gap-2">
              <label class="text-xs text-white/70">Notiz</label>
              <textarea
                v-model="p.notes"
                class="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
                rows="4"
                placeholder="Gepäck, Kindersitz, Flugnummer, usw."
              />
            </div>

            <div class="flex flex-col sm:flex-row gap-2">
              <Button type="submit" variant="primary">WhatsApp senden</Button>
              <Button type="button" variant="soft" @click="sendEmail">E-Mail senden</Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import Container from "../components/Container.vue";
import Button from "../components/Button.vue";
import Field from "../components/Field.vue";
import { site, type BookingPayload, bookingToText, buildMailtoLink, buildWhatsAppLink } from "../data/site";

const p = reactive<BookingPayload>({
  pickup: "",
  destination: "",
  date: "",
  time: "",
  passengers: 1,
  name: "",
  phone: "",
  notes: ""
});

const waQuick = computed(() => buildWhatsAppLink("Hallo! Ich möchte eine Fahrt reservieren."));

function sendWhatsApp() {
  const text = bookingToText(p);
  window.open(buildWhatsAppLink(text), "_blank", "noopener,noreferrer");
}

function sendEmail() {
  const subject = "Reservation Anfrage";
  const body = bookingToText(p);
  window.location.href = buildMailtoLink(subject, body);
}
</script>
