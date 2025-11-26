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
        {{ post.title }}
      </h1>

      <div
        class="flex flex-wrap items-center justify-between gap-5 text-gray-600 mb-6"
      >
        <!-- Date -->
        <div class="flex items-center gap-2">
          <Calendar class="w-4 h-4" />
          <span>{{ formatDate(post.created_at) }}</span>
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
            @click="shareTwitter"
            class="flex items-center gap-1 hover:underline"
          >
            <Twitter class="w-4 h-4" />
            Twitter
          </button>
        </div>
      </div>

      <NuxtImg
        :src="`http://api-gateway.dyhome.vn/${post.image}`"
        class="rounded-xl w-full max-h-[400px] object-cover mb-8 shadow"
      />

      <article
        class="prose prose-lg max-w-none format format-sm sm:format-base lg:format-lg format-blue"
        v-html="post.content"
      ></article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useFetch } from "#app";
import { Calendar, Facebook, Twitter } from "lucide-vue-next";
import type { Post, Response } from "~/types";

const route = useRoute();
const config = useRuntimeConfig();
const slug = route.params.slug;

// API URL
const apiUrl = `${config.public.apiBase}/home/posts/${slug}`;

// Fetch detail post
const { data, pending, error } = await useFetch<Response<Post>>(apiUrl);

// Extract data (chuẩn API của cậu: data.data)
const post = ref<Post>(data.value?.data.items || {} as Post);

// Format date
const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("vi-VN");
};

// SEO meta
useSeoMeta({
  title: () => post.value?.title,
  description: () => (post.value?.description || "").substring(0, 150) + "...",
});

const shareFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(post.value.title);
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`,
    "_blank"
  );
};

const shareTwitter = () => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(post.value.title);
  window.open(
    `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    "_blank"
  );
};
</script>

<style>
@import "~/assets/css/reverse-format.css";
</style>
