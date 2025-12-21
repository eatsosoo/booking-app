<template>
  <section class="px-6 py-10 max-w-7xl mx-auto mt-4 min-h-[calc(100vh-415px)]">
    <p class="font-semibold text-2xl">Welcome to DyHome</p>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
</script>
