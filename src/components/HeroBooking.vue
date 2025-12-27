<template>
  <section class="relative ">
    <div class="absolute inset-0">
      <div class="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
      <div class="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-950/60"></div>
    </div>

    <Container>
      <div class="relative py-14 sm:py-18 lg:py-20 grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            <span class="h-2 w-2 rounded-full bg-white/70"></span>
            Taxi • Transfer • Touren
          </div>

          <h1 class="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Modern buchen. <span class="text-white/70">Schnell ankommen.</span>
          </h1>

          <div class="mt-6 flex flex-wrap gap-3">
            <Button as="a" :href="`tel:${site.phoneTel}`" variant="soft">
              📞 Anrufen
            </Button>
            <Button as="router-link" :to="{ path: '/kontakt', hash: '#reservation' }" variant="primary">
              Reservation starten
            </Button>
            <Button as="router-link" to="/fahrzeuge" variant="ghost">
              Fahrzeuge ansehen
            </Button>
          </div>

          <div class="mt-8 flex flex-wrap gap-2">
            <Badge v-for="h in site.highlights" :key="h">{{ h }}</Badge>
          </div>
        </div>

        <div class="rounded-2xl border border-white/10 bg-white/5 shadow-soft p-5 sm:p-6">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="text-sm font-semibold">Quick Reservation</div>
              <div class="text-xs text-white/60">Kein Login, kein Stress.</div>
            </div>
            <a class="text-xs text-white/70 hover:text-white underline" href="#reservation">
              Vollständiges Formular
            </a>
          </div>

          <form class="mt-4 grid gap-3" @submit.prevent="sendWhatsApp">
            <div class="grid sm:grid-cols-2 gap-3">
              <Field v-model="p.pickup" label="Abholort" placeholder="z.B. Aarau Bahnhof" />
              <Field v-model="p.destination" label="Ziel" placeholder="z.B. Zürich Flughafen" />
            </div>

            <div class="grid sm:grid-cols-3 gap-3">
              <Field v-model="p.date" label="Datum" type="date" />
              <Field v-model="p.time" label="Uhrzeit" type="time" />
              <Field v-model.number="p.passengers" label="Personen" type="number" min="1" />
            </div>

            <div class="grid sm:grid-cols-2 gap-3">
              <Field v-model="p.name" label="Name" placeholder="Dein Name" />
              <Field v-model="p.phone" label="Telefon" placeholder="+41 …" />
            </div>

            <div class="grid gap-2">
              <label class="text-xs text-white/70">Notiz</label>
              <textarea
                v-model="p.notes"
                class="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
                rows="3"
                placeholder="Gepäck, Kindersitz, Meeting-Point, usw."
              />
            </div>

            <div class="flex flex-col sm:flex-row gap-2 pt-1">
              <Button type="submit" variant="primary" class="w-full sm:w-auto">
                WhatsApp senden
              </Button>
              <Button type="button" variant="soft" class="w-full sm:w-auto" @click="sendEmail">
                E-Mail senden
              </Button>
              <Button as="a" :href="`tel:${site.phoneTel}`" variant="ghost" class="w-full sm:w-auto">
                Anrufen
              </Button>
            </div>

            <div class="text-[11px] text-white/55">
              Hinweis: Das ist eine Anfrage. Bestätigung erfolgt nach Rückmeldung.
            </div>
          </form>
        </div>
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Container from "./Container.vue";
import Button from "./Button.vue";
import Badge from "./Badge.vue";
import Field from "./Field.vue";
import { site, type BookingPayload, bookingToText, buildWhatsAppLink, buildMailtoLink } from "../data/site";

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
