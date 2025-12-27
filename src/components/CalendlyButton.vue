<script setup lang="ts">
    import { loadCalendlyScript } from "../composables/useCalendly";
    
    const props = defineProps<{
      url: string;
      label?: string;
    }>();
    
    async function open() {
      await loadCalendlyScript();
      // @ts-ignore
      window.Calendly.initPopupWidget({ url: props.url });
    }
    </script>
    
    <template>
      <button
        class="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 transition"
        @click="open"
      >
        {{ props.label ?? "Plan a ride" }}
      </button>
    </template>
    