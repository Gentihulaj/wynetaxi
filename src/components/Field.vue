<template>
    <div class="grid gap-2">
      <label class="text-xs text-white/70">{{ label }}</label>
  
      <input
        :value="modelValue"
        :type="type"
        :min="min"
        :placeholder="placeholder"
        class="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
        @input="onInput"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  type Model = string | number;
  
  const props = defineProps<{
    modelValue: Model;
    label: string;
    placeholder?: string;
    type?: string;
    min?: string | number;
  }>();
  
  const emit = defineEmits<{
    (e: "update:modelValue", v: Model): void;
  }>();
  
  function onInput(e: Event) {
    const v = (e.target as HTMLInputElement).value;
    emit("update:modelValue", v);
  }
  </script>
  