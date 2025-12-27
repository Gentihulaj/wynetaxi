<template>
  <section class="py-14 border-t border-white/10 bg-zinc-950">
    <Container>
      <h2 class="text-2xl font-semibold tracking-tight text-white">Fahrzeuge</h2>
      <p class="mt-2 text-sm text-white/70 max-w-2xl">
        Komfortabel allein oder als Gruppe — wähle das passende Fahrzeug.
      </p>

      <div class="mt-8 grid gap-4 md:grid-cols-2">
        <article
          v-for="(v, idx) in site.vehicles"
          :key="v.name"
          class="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-soft hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition"
          @mouseenter="hovered[idx] = true"
          @mouseleave="hovered[idx] = false"
        >
          <!-- Slider -->
          <div class="relative aspect-[2/1] min-h-[220px] md:min-h-[260px] bg-white/5 overflow-hidden">
            <Transition name="fade" mode="out-in">
              <img
                v-if="v.images?.length"
                :key="currentSrc(idx)"
                :src="currentSrc(idx)"
                :alt="`${v.name} photo ${currentIndex[idx] + 1}`"
                loading="lazy"
                class="h-full w-full object-cover cursor-zoom-in"
                @click="openLightbox(idx)"
              />
              <div
                v-else
                key="noimg"
                class="absolute inset-0 grid place-items-center text-sm text-white/60"
              >
                Kein Foto verfügbar
              </div>
            </Transition>

            <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/0 pointer-events-none"></div>

            <div class="absolute left-4 bottom-4 flex items-center gap-2">
              <span class="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-zinc-900">
                {{ v.capacity }}
              </span>
            </div>

            <!-- Arrows -->
            <button
              v-if="(v.images?.length || 0) > 1"
              class="absolute left-3 top-1/2 -translate-y-1/2 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-white hover:bg-black/40 transition"
              type="button"
              aria-label="Previous image"
              @click="prev(idx)"
            >
              ‹
            </button>

            <button
              v-if="(v.images?.length || 0) > 1"
              class="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-white hover:bg-black/40 transition"
              type="button"
              aria-label="Next image"
              @click="next(idx)"
            >
              ›
            </button>

            <!-- Dots -->
            <div
              v-if="(v.images?.length || 0) > 1"
              class="absolute right-4 bottom-4 flex items-center gap-1.5"
            >
              <button
                v-for="dot in v.images.length"
                :key="dot"
                type="button"
                class="h-2 w-2 rounded-full transition"
                :class="dot - 1 === currentIndex[idx] ? 'bg-white' : 'bg-white/40 hover:bg-white/70'"
                :aria-label="`Go to image ${dot}`"
                @click="go(idx, dot - 1)"
              />
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <div class="flex items-start justify-between gap-4">
              <div class="text-lg font-semibold text-white">{{ v.name }}</div>
            </div>

            <ul class="mt-4 grid gap-2 text-sm text-white/75">
              <li v-for="p in v.perks" :key="p" class="flex gap-2">
                <span class="text-white/40">•</span>
                <span>{{ p }}</span>
              </li>
            </ul>

            <div class="mt-6 flex flex-col sm:flex-row gap-2">
              <router-link
                to="/fahrzeuge"
                class="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition"
              >
                Mehr Details
              </router-link>

              <router-link
                :to="{ path: '/kontakt', hash: '#reservation' }"
                class="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-950 hover:opacity-90 transition"
              >
                Reservieren
              </router-link>
            </div>
          </div>
        </article>
      </div>
    </Container>

    <!-- Lightbox -->
    <div
      v-if="lightbox.open"
      class="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      @click="closeLightbox"
    >
      <div class="absolute inset-0 grid place-items-center p-4">
        <div
          class="relative w-full max-w-5xl"
          @click.stop
        >
          <!-- Top bar -->
          <div class="mb-3 flex items-center justify-between gap-3">
            <div class="text-sm text-white/80">
              <span class="font-medium text-white">{{ activeVehicle?.name }}</span>
              <span class="text-white/50"> • </span>
              <span class="text-white/70">
                {{ (lightbox.imageIndex + 1) }} / {{ activeImages.length }}
              </span>
            </div>

            <button
              class="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15 transition"
              type="button"
              aria-label="Close"
              @click="closeLightbox"
            >
              ✕
            </button>
          </div>

          <!-- Image -->
          <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
            <Transition name="fade" mode="out-in">
              <img
                v-if="activeImages.length"
                :key="activeImages[lightbox.imageIndex]"
                :src="activeImages[lightbox.imageIndex]"
                :alt="activeVehicle?.name || 'Vehicle image'"
                class="w-full max-h-[78vh] object-contain bg-black"
                draggable="false"
              />
            </Transition>

            <!-- Lightbox arrows -->
            <button
              v-if="activeImages.length > 1"
              class="absolute left-3 top-1/2 -translate-y-1/2 rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white hover:bg-black/55 transition"
              type="button"
              aria-label="Previous image"
              @click="lightboxPrev"
            >
              ‹
            </button>
            <button
              v-if="activeImages.length > 1"
              class="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white hover:bg-black/55 transition"
              type="button"
              aria-label="Next image"
              @click="lightboxNext"
            >
              ›
            </button>

            <!-- Dots -->
            <div
              v-if="activeImages.length > 1"
              class="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2"
            >
              <button
                v-for="(src, i) in activeImages"
                :key="src + i"
                type="button"
                class="h-2.5 w-2.5 rounded-full transition"
                :class="i === lightbox.imageIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'"
                :aria-label="`Go to image ${i + 1}`"
                @click="lightbox.imageIndex = i"
              />
            </div>
          </div>

          <div class="mt-3 text-xs text-white/50">
            Tip: ESC to close • ← → to navigate
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive } from "vue";
import Container from "./Container.vue";
import { site } from "../data/site";

/** Slider state per card */
const currentIndex = reactive<Record<number, number>>({});
const hovered = reactive<Record<number, boolean>>({});

function ensureInit() {
  site.vehicles.forEach((v, i) => {
    if (currentIndex[i] === undefined) currentIndex[i] = 0;
    if (hovered[i] === undefined) hovered[i] = false;

    const len = v.images?.length ?? 0;
    if (len > 0) currentIndex[i] = Math.max(0, Math.min(currentIndex[i], len - 1));
  });
}

function currentSrc(i: number) {
  const imgs = site.vehicles[i]?.images ?? [];
  return imgs[currentIndex[i] ?? 0] ?? "";
}

function next(i: number) {
  const len = site.vehicles[i]?.images?.length ?? 0;
  if (len <= 1) return;
  currentIndex[i] = ((currentIndex[i] ?? 0) + 1) % len;
}
function prev(i: number) {
  const len = site.vehicles[i]?.images?.length ?? 0;
  if (len <= 1) return;
  currentIndex[i] = ((currentIndex[i] ?? 0) - 1 + len) % len;
}
function go(i: number, to: number) {
  const len = site.vehicles[i]?.images?.length ?? 0;
  if (len <= 0) return;
  currentIndex[i] = Math.max(0, Math.min(to, len - 1));
}

/** Auto-rotate */
let timer: number | null = null;
const ROTATE_MS = 3500;

onMounted(() => {
  ensureInit();
  timer = window.setInterval(() => {
    ensureInit();
    site.vehicles.forEach((v, i) => {
      const len = v.images?.length ?? 0;
      if (len > 1 && !hovered[i]) next(i);
    });
  }, ROTATE_MS);

  window.addEventListener("keydown", onKeyDown);
});

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer);
  window.removeEventListener("keydown", onKeyDown);
  unlockScroll();
});

/** Lightbox state */
const lightbox = reactive({
  open: false,
  vehicleIndex: 0,
  imageIndex: 0
});

const activeVehicle = computed(() => site.vehicles[lightbox.vehicleIndex] ?? null);
const activeImages = computed(() => activeVehicle.value?.images ?? []);

function lockScroll() {
  document.documentElement.style.overflow = "hidden";
}
function unlockScroll() {
  document.documentElement.style.overflow = "";
}

function openLightbox(vehicleIdx: number) {
  ensureInit();
  lightbox.vehicleIndex = vehicleIdx;
  lightbox.imageIndex = currentIndex[vehicleIdx] ?? 0;
  lightbox.open = true;
  lockScroll();
}

function closeLightbox() {
  lightbox.open = false;
  unlockScroll();
}

function lightboxNext() {
  const len = activeImages.value.length;
  if (len <= 1) return;
  lightbox.imageIndex = (lightbox.imageIndex + 1) % len;
}
function lightboxPrev() {
  const len = activeImages.value.length;
  if (len <= 1) return;
  lightbox.imageIndex = (lightbox.imageIndex - 1 + len) % len;
}

function onKeyDown(e: KeyboardEvent) {
  if (!lightbox.open) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") lightboxNext();
  if (e.key === "ArrowLeft") lightboxPrev();
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 240ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
