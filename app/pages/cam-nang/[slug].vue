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
          <span>{{ convertUTC(post.created_at) }}</span>
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
        :src="`${post.image}`"
        :alt="`${post.slug}`"
        class="rounded-xl w-full max-h-[400px] object-cover mb-8 shadow"
      />

      <article v-html="post.content"></article>
    </div>

    <!-- Related posts -->
    <div v-if="relatedPosts.length" class="mt-14">
      <h2 class="text-2xl font-bold mb-6">Bài viết gợi ý</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtLink
          v-for="item in relatedPosts"
          :key="item.id"
          :to="`/cam-nang/${item.slug}`"
          class="group rounded-xl overflow-hidden border hover:shadow-lg transition"
        >
          <NuxtImg
            :src="item.image"
            :alt="item.title"
            class="h-40 w-full object-cover group-hover:scale-105 transition"
          />

          <div class="p-4">
            <h3
              class="font-semibold line-clamp-2 group-hover:text-primary transition"
            >
              {{ item.title }}
            </h3>

            <div class="text-sm text-gray-500 mt-2 flex items-center gap-1">
              <Calendar class="w-3 h-3" />
              {{ convertUTC(item.created_at) }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useFetch } from "#app";
import { Calendar, Facebook, Twitter } from "lucide-vue-next";
import type { InternalAPI, Post } from "~/types";
import { convertUTC } from "~/utils/string-helper";

const route = useRoute();
const config = useRuntimeConfig();
const slug = route.params.slug;

// Fetch detail post
const { data, pending, error } = await useFetch<InternalAPI<Post>>(
  `/api/posts/${slug}`
);

// Extract data (chuẩn API của cậu: data.data)
const post = ref<Post>(data.value?.data || ({} as Post));

// SEO meta
useSeoMeta({
  title: post.value?.title,
  description: (post.value?.description || "").substring(0, 150) + "...",
  ogTitle: post.value?.title,
  ogDescription: (post.value?.description || "").substring(0, 150) + "...",
  ogImage: post.value?.image,
  ogUrl: `${config.public.siteUrl}/cam-nang/${slug}`,
  ogType: "article",
  twitterCard: "summary_large_image",
  twitterTitle: post.value?.title,
  twitterDescription: (post.value?.description || "").substring(0, 150) + "...",
  twitterImage: post.value?.image,
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

const { data: relatedData } = await useFetch<InternalAPI<Post[]>>(
  `/api/posts`,
  {
    query: {
      limit: 4,
      exclude: slug,
    },
  }
);

const relatedPosts = computed(() => relatedData.value?.data || []);
</script>
