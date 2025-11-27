<template>
  <div class="flex items-center justify-center gap-3 select-none">
    <!-- Prev -->
    <Button
      variant="ghost"
      :disabled="page <= 1"
      @click="$emit('change', page - 1)"
    >
      ‹ Trước
    </Button>

    <!-- Numbers -->
    <div class="flex items-center gap-2">
      <Button
        v-for="p in pagesToShow"
        :key="p.key"
        variant="ghost"
        :disabled="p.type === 'dots'"
        class="w-9 h-9 flex items-center justify-center rounded-md border transition hover:bg-gray-100 disabled:bg-transparent disabled:border-none disabled:cursor-default"
        :class="{
          'bg-gray-900 text-white border-gray-900': p.number === page,
        }"
        @click="p.type === 'page' && $emit('change', p.number)"
      >
        <span v-if="p.type === 'page'">{{ p.number }}</span>
        <span v-else class="text-xl">…</span>
      </Button>
    </div>

    <!-- Next -->
    <Button
      variant="ghost"
      :disabled="page >= totalPages"
      @click="$emit('change', page + 1)"
    >
      Sau ›
    </Button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Button from "./ui/button/Button.vue";

const props = defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true },
});

const pagesToShow = computed(() => {
  const current = props.page;
  const total = props.totalPages;

  const arr: { type: "page" | "dots", number: number | null, key: string }[] = [];

  const push = (type: "page" | "dots", number?: number) => {
    arr.push({
      type,
      number: number ?? null,
      key: `${type}-${number ?? Math.random()}`,
    });
  };

  push("page", 1);

  if (current > 3) push("dots");

  for (let i = current - 1; i <= current + 1; i++) {
    if (i > 1 && i < total) push("page", i);
  }

  if (current < total - 2) push("dots");

  if (total > 1) push("page", total);

  return arr;
});
</script>
