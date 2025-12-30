<template>
  <div>
    <!-- Banner -->
    <section
      class="bg-[url('/banner.avif')] bg-center bg-cover h-96 relative flex justify-center"
    >
      <div class="absolute inset-0 bg-black/50"></div>

      <div
        class="absolute -bottom-4 bg-primary z-10 py-6 px-10 rounded-tl-4xl rounded-br-4xl shadow-xl max-w-7xl w-full"
      >
        <h1 class="uppercase text-white text-2xl font-semibold">
          Cẩm nang<span class="text-blue-900 font-bold"> căn hộ</span>
        </h1>
      </div>
    </section>

    <!-- Main content -->
    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Posts -->
        <div class="md:col-span-2">
          <div
            v-for="item in posts"
            :key="item.id"
            class="flex flex-col md:flex-row border-b border-gray-300 py-6 gap-4"
          >
            <NuxtImg
              :src="`${item.image}`"
              :alt="item.title"
              class="w-full md:w-72 h-48 object-cover rounded-md transition-transform duration-300 hover:scale-105 shadow-sm"
            />

            <div class="flex-1">
              <h2 class="text-2xl font-semibold mb-2">{{ item.title }}</h2>
              <p class="text-sm text-gray-500 mb-2">
                {{ formatDate(item.created_at) }}
              </p>

              <p class="text-gray-700 mb-3 line-clamp-3">
                {{ item.description }}
              </p>

              <NuxtLink
                :to="`/cam-nang/${item.slug}`"
                class="text-primary underline underline-offset-2 hover:no-underline"
              >
                Xem chi tiết
              </NuxtLink>
            </div>
          </div>

          <!-- Pagination -->
          <PaginationPage
            class="mt-6"
            :page="pagination.current_page"
            :total-pages="pagination.last_page"
            @change="goToPage"
          />
        </div>

        <!-- Sidebar -->
        <aside class="space-y-6">
          <div class="bg-gray-100 rounded-md shadow p-4">
            <h2 class="text-2xl font-semibold">Tìm kiếm</h2>

            <InputGroup class="bg-white mt-4 h-12">
              <InputGroupInput v-model="search" placeholder="Nhập từ khoá..." />
              <InputGroupAddon>
                <ClientOnly>
                  <FontAwesomeIcon :icon="['fas', 'magnifying-glass']" />
                </ClientOnly>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <!-- <div class="p-4 bg-white">
            <h2 class="text-2xl font-semibold">Danh mục dự án</h2>

            <ul class="mt-4 space-y-2">
              <li
                v-for="(cat, idx) in categories"
                :key="idx"
                class="border-b border-gray-200 pb-2"
              >
                <span
                  class="font-semibold inline-block hover:text-primary hover:underline transition-all hover:-translate-y-1 text-gray-600"
                >
                  {{ cat.name }}
                </span>
              </li>
            </ul>
          </div> -->
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useFetch } from "#app";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "~/components/ui/input-group";
import type { Post, Response } from "~/types";

useSeoMeta({
  title: "Cẩm nang căn hộ - Hướng dẫn và kinh nghiệm về căn hộ",
  description:
    "Cẩm nang căn hộ với các bài viết hữu ích về hướng dẫn, kinh nghiệm, và mẹo về căn hộ. Tìm kiếm thông tin cần thiết để lựa chọn căn hộ phù hợp.",
  ogTitle: "Cẩm nang căn hộ - Hướng dẫn và kinh nghiệm",
  ogDescription:
    "Cẩm nang căn hộ với các bài viết hữu ích về hướng dẫn, kinh nghiệm, và mẹo về căn hộ.",
  ogType: "website",
  ogImage: "/banner.avif",
  keywords:
    "cẩm nang căn hộ, hướng dẫn căn hộ, kinh nghiệm căn hộ, lựa chọn căn hộ",
});

definePageMeta({
  layout: "default",
});

const config = useRuntimeConfig();
const page = ref(1);
const search = ref("");
let debounce: string | number | NodeJS.Timeout | undefined = undefined;

// =========================
// FETCH API
// =========================
const apiUrl = computed(
  () =>
    `${config.public.apiBase}/home/posts?page=${page.value}&search=${search.value}`
);

const { data } = await useFetch<Response<Post[]>>(apiUrl, {
  server: true,
  lazy: false,
  immediate: true,
});

const posts = computed(() => data.value?.data.items ?? []);
const pagination = computed(
  () => data.value?.result?.pagination ?? { current_page: 1, last_page: 1 }
);

// const { data: projectData } = await useFetch<Response<Category[]>>(`${config.public.apiBase}/home/categories?page=1&per_page=12`, {
//   server: true,
//   lazy: false,
//   immediate: true,
// });
// const categories = ref<Category[]>(projectData.value?.data.items ?? [])

// Format date
const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("vi-VN");
};

// =========================
// Debounce search
// =========================
watch(search, () => {
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    page.value = 1;
  }, 400);
});

// =========================
// Change page
// =========================
const goToPage = (p: number) => {
  page.value = p;
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>
