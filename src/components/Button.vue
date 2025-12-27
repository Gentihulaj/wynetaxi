<template>
    <component
      :is="as"
      :href="href"
      :to="to"
      :type="type"
      class="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition
             focus:outline-none focus:ring-2 focus:ring-white/20
             disabled:opacity-50 disabled:pointer-events-none"
      :class="variantClass"
      v-bind="$attrs"
    >
      <slot />
    </component>
  </template>
  
  <script setup lang="ts">
  import { computed } from "vue";
  
  type Variant = "primary" | "ghost" | "soft";
  
  const props = withDefaults(defineProps<{
    variant?: Variant;
    as?: "button" | "a" | "router-link";
    href?: string;
    to?: any;
    type?: "button" | "submit" | "reset";
  }>(), {
    variant: "primary",
    as: "button",
    type: "button"
  });
  
  const variantClass = computed(() => {
    switch (props.variant) {
      case "ghost":
        return "border border-white/15 bg-transparent hover:bg-white/10 text-white";
      case "soft":
        return "border border-white/10 bg-white/5 hover:bg-white/10 text-white";
      default:
        return "bg-white text-zinc-950 hover:opacity-90";
    }
  });
  </script>
  