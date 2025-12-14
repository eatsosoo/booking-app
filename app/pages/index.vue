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

    <section class="bg-[url('/google1.jpg')] h-160 bg-cover bg-center relative">
      <div
        class="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-60"
      ></div>
      <div
        class="absolute bottom-0 uppercase flex justify-center m-4 mb-12 w-full"
      >
        <div class="text-gray-200 w-3/4">
          <h1 class="font-bold text-4xl mb-6 text-shadow-2xs">
            Chào mứng đến với DYHOME
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
            <!-- {{ formatTelNumber(settings.phone_number) }} -->
          </button>
        </div>
      </div>
    </section>

    <section class="bg-section">
      <div class="cus-container">
        <div class="md:flex md:justify-center w-full">
          <SearchForm :groups="groupOptions" />
        </div>
      </div>
    </section>

    <section ref="editorDiv">
      <div v-if="!enableEditor" class="cus-container">
        <div v-html="homePageHtml"></div>
      </div>
      <div v-else>
        <CommonEditorCustom
          :model-value="homePageHtml"
          :menu-bar="false"
          @update:model-value="homePageHtml = $event"
        />
      </div>
    </section>

    <!-- Dự án hiện tại -->
    <section class="bg-section">
      <div class="cus-container">
        <div
          v-for="(property, index) in PROPERTY_TYPES"
          :key="property.value"
          class="space-y-10 mb-12"
        >
          <h2 class="home-head-2">
            {{ property.label }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:px-24">
            <!-- Project item -->
            <div
              v-for="(project, i) in ['Miền Bắc', 'Miền Trung', 'Miền Nam']"
              :key="i"
              class="relative bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col"
            >
              <!-- Image -->
              <NuxtImg
                :src="
                  randomImages[i]
                    ? `/rooms/${genSlug(property.label)}-${genSlug(project)}-${
                        randomImages[i]
                      }.jpg`
                    : '/no-image.jpg'
                "
                class="h-58 w-full object-cover transition-transform duration-300 hover:scale-105 shadow-sm"
                :alt="`Tìm kiếm phong loại ${property.label} khu vực ${project}`"
              ></NuxtImg>

              <!-- Content -->
              <div class="text-center">
                <h3 class="mt-4 font-semibold italic">{{ project }}</h3>
                <NuxtLink
                  :to="`/tim-kiem?page=1&per_page=12&property_types=${property.value}`"
                >
                  <Button class="w-fit underline" variant="link">
                    Xem thêm
                  </Button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cẩm nang -->
    <section>
      <div class="cus-container">
        <h2 class="home-head-2">Tin tức & Sự kiện</h2>
        <div class="lg:px-24">
          <Swiper
            :modules="[Pagination, Autoplay, Grid]"
            :pagination="{ clickable: true }"
            :autoplay="{ delay: 2500 }"
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
            <SwiperSlide v-for="index in 12" :key="index">
              <div class="rounded-md shadow-md flex h-[200px] border">
                <div class="h-[200px] w-[200px] shrink-0">
                  <img
                    :src="posts[index] ? posts[index].image : posts[0]?.image"
                    class="h-full w-[200px] object-cover rounded-l-md"
                  />
                </div>
                <div class="p-2 flex-1">
                  <p class="text-2xl font-semibold line-clamp-1">
                    {{ posts[index] ? posts[index].title : posts[0]?.title }}
                  </p>
                  <p class="flex text-gray-500 text-[14px] my-2">
                    <TimerIcon :size="20" />2025/12/11
                  </p>
                  <p class="text-[14px] line-clamp-4">
                    {{
                      posts[index]
                        ? posts[index].description
                        : posts[0]?.description
                    }}
                  </p>
                  <p class="">
                    <NuxtLink
                      :to="`/cam-nang/${
                        posts[index] ? posts[index].slug : posts[0]?.slug
                      }`"
                      class="underline text-primary"
                      >Xem thêm</NuxtLink
                    >
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>

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
  </div>
</template>

<script setup lang="ts">
import { PhoneCall, TimerIcon, XIcon } from "lucide-vue-next";
import { formatTelNumber, genSlug } from "~/utils/string-helper";
import Button from "~/components/ui/button/Button.vue";
import { PROPERTY_TYPES } from "~/constants";
import type { Post, Response, SettingItem, SystemSetting } from "~/types";
import { toast } from "vue-sonner";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import { Pagination, Autoplay, Grid } from "swiper/modules";

useSeoMeta({
  // --- BASIC ---
  title: "Trang chủ | DYHOME - Đặt phòng khách sạn, resort giá tốt",
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

const { provinces } = useProvinces();
const { homePageSetting, videos } = useSystemSetting();
const token = useCookie("token");
const { request } = useApi();

const config = useRuntimeConfig();
const { data } = await useFetch<Response<Post[]>>(
  `${config.public.apiBase}/home/posts`
);

const homePageHtml = ref<string>(homePageSetting.value.setting_value);
const enableEditor = ref<boolean>(false);
const btnText = ref<string>("Chỉnh sửa");
const updating = ref<boolean>(false);
const showActions = ref<boolean>(true);
const posts = ref<Post[]>(data.value?.data.items || []);

const result = provinces.value?.data.items ?? [];
const groupOptions: any = {};

result.forEach((element) => {
  if (groupOptions[`${element.region}`]) {
    groupOptions[`${element.region}`].push(element.name);
  } else {
    groupOptions[`${element.region}`] = [element.name];
  }
});

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

const randomImages = ref<number[]>([]);

// tạo mảng 13 phần tử random cho mỗi project
onMounted(() => {
  randomImages.value = Array.from(
    { length: PROPERTY_TYPES.length },
    () => Math.floor(Math.random() * 2) + 1
  );

  setInterval(() => {
    randomImages.value = randomImages.value.map(
      () => Math.floor(Math.random() * 2) + 1
    );
  }, 2000);
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
