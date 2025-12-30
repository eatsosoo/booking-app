<template>
  <div class="overflow-x-hidden relative">
    <div
      v-if="token && showActions"
      class="fixed bottom-0 p-4 flex justify-center shadow-md bg-blue-950 w-full z-50 space-x-2 transition-all duration-300 ease-in-out"
      :class="{
        'transform translate-y-0 opacity-100': showActions,
        'transform translate-y-full opacity-0': !showActions,
      }"
    >
      <Button
        v-if="!enableEditor"
        :loading="updating"
        @click="enableEditor = true"
        >Chỉnh sửa</Button
      >
      <Button
        v-if="enableEditor"
        variant="secondary"
        :loading="updating"
        @click="updateHomePage()"
        >Cập nhật</Button
      >
      <Button
        variant="outline"
        @click="
          showActions = false;
          enableEditor = false;
        "
      >
        <XIcon />
      </Button>
    </div>

    <section class="h-160 bg-cover bg-center relative">
      <NuxtImg
        :src="baseInfo.BANNER"
        alt="Đặt phòng khách sạn giá tốt"
        format="webp"
        preload
        priority
        fetchpriority="high"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div
        class="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-60"
      ></div>
      <div
        class="absolute bottom-0 uppercase flex justify-center m-4 mb-12 w-full"
      >
        <div class="text-gray-200 w-3/4">
          <h1 class="font-bold text-4xl mb-6 text-shadow-2xs">
            Chào mừng đến với DYHOME
          </h1>
          <p class="text-lg font-semibold text-shadow-2xs mb-4">
            DYHOME là đơn vị chuyên cung cấp giải pháp đặt phòng thảnh thơi và
            dịch vụ tổ chức <br />
            sự kiện chuyên nghiệp - với phong cách phục vụ nhanh - nhiệt tình -
            chính xác.
          </p>

          <button
            class="text-3xl p-4 bg-primary rounded-full font-bold text-white flex items-center gap-4"
          >
            <PhoneCall :size="34" />
            {{ formatTelNumber(baseInfo.PHONE || "") }}
          </button>
        </div>
      </div>
    </section>

    <section class="bg-section">
      <div class="cus-container">
        <div class="md:flex md:justify-center w-full">
          <SearchForm />
        </div>
      </div>
    </section>

    <section ref="editorDiv">
      <div v-if="!enableEditor" class="cus-container">
        <div v-html="homePageHtml"></div>
      </div>
      <div v-else>
        <ClientOnly>
          <EditorCustom
            :model-value="homePageHtml"
            :menu-bar="false"
            @update:model-value="homePageHtml = $event"
          />
        </ClientOnly>
      </div>
    </section>

    <!-- Dự án hiện tại -->
    <section class="bg-section">
      <div class="cus-container">
        <div
          v-for="property in regionImages"
          :key="property.key"
          class="space-y-10 mb-12"
        >
          <h2 class="home-head-2">
            {{ property.title }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:px-24">
            <!-- Project item -->
            <div
              v-for="(region, i) in property.regions"
              :key="i"
              class="relative bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col"
            >
              <RegionCard
                :region="region.title"
                :property="property.title"
                :images="region.images"
              />
              <div class="text-center mb-4">
                <NuxtLink
                  :to="`/tim-kiem?page=1&per_page=12&property_types=${property.key}&region=${region.title}`"
                >
                  <h3
                    class="mt-4 font-semibold italic hover:underline cursoir-pointer"
                  >
                    {{ region.title }}
                  </h3>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cẩm nang -->
    <ClientOnly>
      <section>
        <div class="cus-container">
          <h2 class="home-head-2">Tin tức & Cẩm nang du lịch</h2>
          <div class="lg:px-24 relative">
            <Swiper
              :modules="[Pagination, Autoplay, Grid, Navigation]"
              :navigation="{
                prevEl: '.swiper-prev',
                nextEl: '.swiper-next',
              }"
              :autoplay="{ delay: 5000 }"
              :loop="true"
              :grid="{ rows: 2 }"
              :slides-per-view="1"
              :space-between="20"
              :breakpoints="{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                  grid: {
                    rows: 2,
                  },
                },
                1024: {
                  slidesPerView: 2,
                  grid: {
                    rows: 2,
                  },
                },
              }"
              class="mySwiper"
            >
              <SwiperSlide v-for="post in posts" :key="post.id">
                <div class="rounded-md shadow-md flex h-[200px] border">
                  <div class="h-[200px] w-[200px] shrink-0">
                    <img
                      :src="post.image"
                      :alt="`${post.slug}`"
                      class="h-full w-[200px] object-cover rounded-l-md"
                    />
                  </div>
                  <div class="p-2 flex-1 mx-2">
                    <p class="text-2xl font-semibold line-clamp-1">
                      {{ post.title }}
                    </p>
                    <p class="flex text-gray-500 text-[14px] my-2">
                      <Calendar :size="20" class="mr-2" />{{
                        convertUTC(post.created_at)
                      }}
                    </p>
                    <p class="text-[14px] line-clamp-4">
                      {{ post.description }}
                    </p>
                    <p class="">
                      <NuxtLink
                        :to="`/cam-nang/${post.slug}`"
                        class="underline text-blue-950 font-semibold"
                        >Xem thêm</NuxtLink
                      >
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>

            <!-- Prev -->
            <button
              class="hidden lg:block swiper-prev absolute left-8 top-1/2 -translate-y-1/2 z-10 bg-primary shadow rounded-lg p-2"
              aria-label="Bài viết trước"
            >
              <ChevronLeft :size="30" />
            </button>

            <!-- Next -->
            <button
              class="hidden lg:block swiper-next absolute right-8 top-1/2 -translate-y-1/2 z-10 bg-primary shadow rounded-lg p-2"
              aria-label="Bài viết tiếp theo"
            >
              <ChevronRight :size="30" />
            </button>
          </div>
        </div>
      </section>
    </ClientOnly>

    <ClientOnly>
      <section class="bg-section">
        <div class="cus-container">
          <h2 class="home-head-2">Video & Mạng xã hội</h2>
          <div class="lg:px-24">
            <Swiper
              :modules="[Pagination, Autoplay, Grid]"
              :pagination="{ clickable: true }"
              :loop="true"
              :slides-per-view="1"
              :space-between="20"
              :breakpoints="{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                },
                1024: {
                  slidesPerView: 2,
                },
                1280: {
                  slidesPerView: 3,
                },
              }"
              class="video-slide"
            >
              <SwiperSlide
                v-for="video in videos"
                :key="`video-${video.id}`"
                class="shadow-md rounded-xl video-slide-h"
              >
                <div>
                  <iframe
                    v-if="getTikTokEmbedUrl(video.setting_value)"
                    :src="getTikTokEmbedUrl(video.setting_value)"
                    class="w-full aspect-9/16 rounded-xl"
                    frameborder="0"
                    allowfullscreen
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  XIcon,
} from "lucide-vue-next";
import {
  formatTelNumber,
  getTikTokEmbedUrl,
  convertUTC,
  nowDate,
} from "~/utils/string-helper";
import Button from "~/components/ui/button/Button.vue";
import type { InternalAPI, Post, Response, SystemSetting } from "~/types";
import { toast } from "vue-sonner";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import { Pagination, Autoplay, Grid, Navigation } from "swiper/modules";
import RegionCard from "~/components/common/RegionCard.vue";
import EditorCustom from "~/components/common/editor/EditorCustom.vue";

useSeoMeta({
  // --- BASIC ---
  title: "Trang chủ - Đặt phòng khách sạn, resort giá tốt",
  description:
    "Nền tảng đặt phòng khách sạn, resort, homestay dễ sử dụng. So sánh giá tốt nhất, đặt phòng nhanh chóng, thanh toán an toàn.",

  // --- OPEN GRAPH (Facebook, Zalo, LinkedIn) ---
  ogTitle: "Booking - Đặt phòng khách sạn, resort, homestay giá tốt",
  ogDescription:
    "Tìm kiếm và đặt phòng khách sạn, resort, homestay với giá ưu đãi. Nhiều lựa chọn, hỗ trợ 24/7.",
  ogImage: "https://dyhome.com/og-image.png",
  ogUrl: "https://dyhome.com",
  ogType: "website",

  // --- TWITTER CARD ---
  twitterCard: "summary_large_image",
  twitterTitle: "Booking - Đặt phòng khách sạn & resort",
  twitterDescription:
    "Đặt phòng khách sạn, resort, homestay nhanh chóng – giá tốt nhất thị trường.",
  twitterImage: "https://dyhome.com/og-image.png",
});

const { homePageSetting, videos, baseInfo, regionImages } = useSystemSetting();
const token = useCookie("token");
const { request } = useApi();

const { data } = await useFetch<InternalAPI<Post[]>>(
  `/api/posts?page=1&limit=20`,
  {
    server: true,
    lazy: false,
    immediate: true,
  }
);

const homePageHtml = ref<string>(homePageSetting.value.setting_value);
const enableEditor = ref<boolean>(false);
const btnText = ref<string>("Chỉnh sửa");
const updating = ref<boolean>(false);
const showActions = ref<boolean>(true);
const posts = ref<Post[]>(data.value?.data || []);

const updateHomePage = async () => {
  updating.value = true;
  try {
    await request<SystemSetting>(`/settings/${homePageSetting.value.id}`, {
      method: "PUT",
      body: {
        ...homePageSetting.value,
        setting_value: homePageHtml.value,
      },
    });

    toast.success("Cập nhật trang chủ", {
      description: "Trang chủ đã được cập nhật thành công!",
    });
    enableEditor.value = false;
  } catch (err: any) {
    toast.error("Cập nhật trang chủ", {
      description: err?.message || "Có lỗi xảy và vui lòng thử lại sau!",
    });
  } finally {
    updating.value = false;
  }
};

watch(
  () => enableEditor.value,
  (newVal) => {
    btnText.value = newVal ? "Lưu thay đổi" : "Chỉnh sửa";
  }
);

watch(
  () => homePageSetting.value,
  (newVal) => (homePageHtml.value = newVal.setting_value)
);

onMounted(() => {
  regionImages.value.forEach((element) => {
    element.regions.forEach((region) => {
      region.images.forEach((src: any) => {
        const img = new Image();
        img.src = src;
      });
    });
  });
});
</script>

<style>
.mySwiper {
  width: 100%;
  height: 440px;
}
.video-slide {
  width: 100%;
  height: 800px;
  border-radius: 16px;
}
.video-slide-h {
  height: 769px !important;
}
</style>
