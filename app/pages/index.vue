<template>
  <section>
    <h2 class="text-2xl font-semibold mb-4 bg-amber-300">
      Chào mừng bạn đến với Booking App
    </h2>
    <p>
      Trang web giúp bạn đặt phòng khách sạn, resort, homestay một cách dễ dàng
      và nhanh chóng.
    </p>
    <Button @click="console.log('test')">Click me</Button>
    <NuxtImg
      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
      alt="Booking Banner"
      class="rounded-2xl mt-4"
    />
  </section>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button"

useSeoMeta({
  title: "Trang chủ",
  description:
    "Trang đặt phòng khách sạn, resort, homestay dễ sử dụng và tối ưu SEO.",
});
</script>
