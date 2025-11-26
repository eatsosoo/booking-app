<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ref } from "vue";
import { useFetch } from "#app";
import type { Faq, Response } from "~/types";

const config = useRuntimeConfig();
const faqs = ref<Faq[]>([]);

const { data, error } = await useFetch<Response<Faq[]>>(
  `${config.public.apiBase}/faqs`
);
if (error.value) {
  console.error("Failed to fetch FAQs:", error.value);
} else {
  faqs.value = data.value?.data.items ?? [];
}
</script>

<template>
  <div>
    <section class="w-full">
      <!-- Hero section -->
      <div class="relative h-[250px] md:h-[400px] w-full">
        <NuxtImg
          src="https://images.pexels.com/photos/5428833/pexels-photo-5428833.jpeg"
          alt="Booking team"
          class="object-cover w-full h-full"
        />
        <div
          class="absolute inset-0 bg-black/40 flex items-center justify-center"
        >
          <h1 class="text-4xl md:text-5xl font-bold text-white">
            Câu hỏi thường gặp
          </h1>
        </div>
      </div>
    </section>
    <section class="max-w-4xl mx-auto px-6 py-16 space-y-10">
      <!-- Title -->
      <div class="text-center space-y-3">
        <p class="text-muted-foreground text-lg italic">
          Tìm câu trả lời nhanh cho những thắc mắc phổ biến về BookingApp.
        </p>
      </div>

      <!-- FAQ Accordion -->
      <Accordion type="single" collapsible class="w-full space-y-4">
        <template v-for="(faq, index) in faqs" :key="index">
          <AccordionItem :value="'item-' + index">
            <AccordionTrigger>
              {{ faq.question }}
            </AccordionTrigger>
            <AccordionContent class="text-muted-foreground">
              {{ faq.answer }}
            </AccordionContent>
          </AccordionItem>
        </template>
      </Accordion>
    </section>
  </div>
</template>
