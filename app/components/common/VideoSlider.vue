<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

defineProps<{
  urls: string[];
}>();
</script>

<template>
  <ClientOnly>
    <section>
      <div class="cus-container">
        <h2 class="home-head-2">Video nổi bật</h2>

        <div class="lg:px-24 relative">
          <Swiper
            :modules="[Pagination, Autoplay, Navigation]"
            :navigation="{
              prevEl: '.swiper-prev',
              nextEl: '.swiper-next',
            }"
            :autoplay="{ delay: 5000, disableOnInteraction: false }"
            :loop="true"
            :slides-per-view="1"
            :space-between="40"
            :breakpoints="{
              640: { slidesPerView: 1 },
              768: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 3,
              },
            }"
            class=""
          >
            <SwiperSlide v-for="(url, index) in urls" :key="index">
              <div
                class="rounded-2xl shadow-md border overflow-hidden bg-orange-100 p-4 max-w-90 mx-auto"
              >
                <video
                  :src="url"
                  autoplay
                  muted
                  loop
                  playsinline
                  preload="metadata"
                  class="w-full h-full object-cover rounded-md"
                />
              </div>
            </SwiperSlide>
          </Swiper>

          <!-- Prev -->
          <button
            class="hidden lg:block swiper-prev absolute left-8 top-1/2 -translate-y-1/2 z-10 bg-primary shadow rounded-lg p-2"
            aria-label="Video trước"
          >
            <ChevronLeft :size="30" />
          </button>

          <!-- Next -->
          <button
            class="hidden lg:block swiper-next absolute right-8 top-1/2 -translate-y-1/2 z-10 bg-primary shadow rounded-lg p-2"
            aria-label="Video tiếp theo"
          >
            <ChevronRight :size="30" />
          </button>
        </div>
      </div>
    </section>
  </ClientOnly>
</template>
