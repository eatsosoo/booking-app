<template>
  <div class="max-w-5xl mx-auto px-4 py-10">
    <!-- Loading -->
    <div v-if="pending" class="text-center py-20 text-gray-500">
      Đang tải nội dung...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-20 text-red-500">
      Không tìm thấy bài viết.
    </div>

    <!-- Content -->
    <div v-else>
      <h1 class="text-3xl font-bold mb-4">
        {{ service.title }}
      </h1>

      <div
        class="flex flex-wrap items-center justify-between gap-5 text-gray-600 mb-6"
      >
        <!-- Date -->
        <div class="flex items-center gap-2">
          <Calendar class="w-4 h-4" />
          <span>{{ convertUTC(service.created_at) }}</span>
        </div>

        <!-- Share -->
        <div class="flex items-center gap-3">
          <span>Chia sẻ:</span>

          <button
            class="flex items-center gap-1 hover:underline"
            @click="shareFacebook"
          >
            <Facebook class="w-4 h-4" />
            Facebook
          </button>

          <button
            class="flex items-center gap-1 hover:underline"
            @click="shareTwitter"
          >
            <Twitter class="w-4 h-4" />
            Twitter
          </button>
        </div>
      </div>

      <NuxtImg
        :src="`${service.image}`"
        :alt="`${service.slug}`"
        class="rounded-xl w-full max-h-[400px] object-cover mb-8 shadow"
      />

      <article v-html="service.content"></article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useFetch } from "#app";
import { Calendar, Facebook, Twitter } from "lucide-vue-next";
import type { Service, Response } from "~/types";
import { convertUTC } from "~/utils/string-helper";

const route = useRoute();
const config = useRuntimeConfig();
const slug = route.params.slug;

// API URL
const apiUrl = `${config.public.apiBase}/home/services/${slug}`;

// Fetch detail service
const { data, pending, error } = await useFetch<Response<Service>>(apiUrl);

// Extract data (chuẩn API của cậu: data.data)
const service = ref<Service>(data.value?.data.items || ({} as Service));

// SEO meta
useSeoMeta({
  title: service.value?.title,
  description: (service.value?.description || "").substring(0, 150) + "...",
  ogTitle: service.value?.title,
  ogDescription: (service.value?.description || "").substring(0, 150) + "...",
  ogImage: service.value?.image,
  ogUrl: window.location.href,
  twitterCard: "summary_large_image",
  twitterTitle: service.value?.title,
  twitterDescription:
    (service.value?.description || "").substring(0, 150) + "...",
  twitterImage: service.value?.image,
});

const shareFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(service.value.title);
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`,
    "_blank"
  );
};

const shareTwitter = () => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(service.value.title);
  window.open(
    `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    "_blank"
  );
};
</script>

<style>
@import "~/assets/css/reverse-format.css";
</style>
