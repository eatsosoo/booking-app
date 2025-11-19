<template>
  <div>
    <section
      class="bg-[url('/banner.avif')] bg-center h-96 opacity-85 relative flex justify-center"
    >
      <div
        class="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-50"
      ></div>
      <div
        class="absolute -bottom-4 bg-primary z-10 py-6 px-10 top rounded-tl-4xl rounded-br-4xl shadow-xl max-w-7xl w-7xl"
      >
        <h1 class="uppercase text-white text-2xl semibold">
          Cẩm nang<span class="text-blue-900 font-bold"> căn hộ</span>
        </h1>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-3 py-6 gap-4">
        <div class="col-span-2">
          <div
            v-for="(item, index) in handbookList"
            :key="index"
            class="flex border-b border-gray-300 py-6"
          >
            <NuxtImg
              :src="item.image_url"
              :alt="item.title"
              class="max-w-70 rounded-md transition-transform duration-300 hover:scale-105 shadow-2xs"
            />
            <div class="ml-4">
              <h2 class="text-2xl font-semibold mb-2">{{ item.title }}</h2>
              <p class="text-sm text-gray-500 mb-1">{{ item.date }}</p>
              <h3 class="text-lg font-medium mb-1 text-primary">
                {{ item.subtitle }}
              </h3>
              <p class="text-gray-700">{{ item.subcontent }}</p>
              <Button
                variant="link"
                class="p-0 mt-2 relative inline-block underline underline-offset-2 transition-all duration-200 hover:no-underline after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full hover:after:delay-100"
                >Xem chi tiết</Button
              >
            </div>
          </div>
        </div>

        <div>
          <div class="bg-gray-100 rounded-md shadow-xs p-4 mt-2">
            <h2 class="text-2xl font-semibold">Tìm kiếm</h2>
            <InputGroup class="bg-white mt-4 h-12">
              <InputGroupInput placeholder="Nhập từ khoá..." />
              <InputGroupAddon>
                <ClientOnly>
                  <FontAwesomeIcon :icon="['fas', 'magnifying-glass']" />
                </ClientOnly>
              </InputGroupAddon>
              <InputGroupAddon align="line-end" class="mr-2">
                12 results
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div class="p-4">
            <h2 class="text-2xl font-semibold">Danh mục cẩm nang</h2>
            <ul class="mt-4 space-y-2">
              <li v-for="(category, index) in handleCategorise" :key="index">
                <NuxtLink
                  :to="`/cam-nang/${category.slug}`"
                  class="inline-block hover:text-primary hover:underline font-semibold transition-transform duration-200 hover:-translate-y-1"
                >
                  {{ category.title }}
                </NuxtLink>
                <Separator class="my-4" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Button from "~/components/ui/button/Button.vue";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group";
import Separator from "~/components/ui/separator/Separator.vue";

useSeoMeta({
  title: "Cẩm nang căn hộ",
  description:
    "Trang đặt phòng khách sạn, resort, homestay dễ sử dụng và tối ưu SEO.",
});

const handbookList = [
  {
    title: "Cẩm nang Homestay D’Eldorado Tây Hồ – Gợi ý chỗ nghỉ view hồ...",
    date: "2025-01-15",
    subtitle: `Homestay D' Eldorado Tây Hồ - Tân Hoàng Minh Tây Hồ`,
    subcontent:
      "Khám phá Homestay D’Eldorado Tây Hồ – vị trí đắc địa, view hồ thoáng mát, tiện nghi sang trọng. Cẩm nang chọn chỗ nghỉ lý tưởng cùng SunHomestay",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Cẩm nang Homestay D’Eldorado Tây Hồ – Gợi ý chỗ nghỉ view hồ...",
    date: "2025-01-15",
    subtitle: `Homestay D' Eldorado Tây Hồ - Tân Hoàng Minh Tây Hồ`,
    subcontent:
      "Khám phá Homestay D’Eldorado Tây Hồ – vị trí đắc địa, view hồ thoáng mát, tiện nghi sang trọng. Cẩm nang chọn chỗ nghỉ lý tưởng cùng SunHomestay",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Cẩm nang Homestay D’Eldorado Tây Hồ – Gợi ý chỗ nghỉ view hồ...",
    date: "2025-01-15",
    subtitle: `Homestay D' Eldorado Tây Hồ - Tân Hoàng Minh Tây Hồ`,
    subcontent:
      "Khám phá Homestay D’Eldorado Tây Hồ – vị trí đắc địa, view hồ thoáng mát, tiện nghi sang trọng. Cẩm nang chọn chỗ nghỉ lý tưởng cùng SunHomestay",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Cẩm nang Homestay D’Eldorado Tây Hồ – Gợi ý chỗ nghỉ view hồ...",
    date: "2025-01-15",
    subtitle: `Homestay D' Eldorado Tây Hồ - Tân Hoàng Minh Tây Hồ`,
    subcontent:
      "Khám phá Homestay D’Eldorado Tây Hồ – vị trí đắc địa, view hồ thoáng mát, tiện nghi sang trọng. Cẩm nang chọn chỗ nghỉ lý tưởng cùng SunHomestay",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Cẩm nang Homestay D’Eldorado Tây Hồ – Gợi ý chỗ nghỉ view hồ...",
    date: "2025-01-15",
    subtitle: `Homestay D' Eldorado Tây Hồ - Tân Hoàng Minh Tây Hồ`,
    subcontent:
      "Khám phá Homestay D’Eldorado Tây Hồ – vị trí đắc địa, view hồ thoáng mát, tiện nghi sang trọng. Cẩm nang chọn chỗ nghỉ lý tưởng cùng SunHomestay",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
];

const handleCategorise = [
  {
    slug: "homestay-vinhomes-smart-city-nam-tu-liem",
    title: "Homestay Vinhomes Smart City - Nam Từ Liêm",
  },
  {
    slug: "homestay-vinhomes-ocean-park-1-gia-lam",
    title: "Homestay Vinhomes Ocean Park 1 - Gia Lâm",
  },
  {
    slug: "homestay-vinhomes-skalake-my-dinh",
    title: "Homestay Vinhomes SkyLake - Mỹ Đình",
  },
  {
    slug: "homestay-vinhomes-ocean-park-23",
    title: "Homestay Vinhomes Ocean Park 2,3",
  },
  {
    slug: "homestay-vinhomes-green-bay-dai-lo-thang-long-nam-tu-liem",
    title: "Homestay Vinhomes Green Bay - Đại Lộ Thăng Long - Nam Từ Liêm",
  },
  {
    slug: "homestay-vinhomes-dcapital-tran-duy-hung",
    title: "Homestay Vinhomes D'capital Trần Duy Hưng",
  },
  {
    slug: "homestay-vinhomes-metropolis-lieu-giai",
    title: "Homestay Vinhomes Metropolis Liễu Giai",
  },
  {
    slug: "vinhomes-co-loa-vinhomes-global-gate-dong-anh",
    title: "Vinhomes Cổ Loa - Vinhomes Global Gate Đông Anh",
  },
  {
    slug: "homestay-times-city",
    title: "Homestay Times City",
  },
  {
    slug: "homestay-flamingo-hai-tien-thanh-hoa",
    title: "Homestay Flamingo Hải Tiến - Thanh Hóa",
  },
  {
    slug: "homestay-quy-nhon",
    title: "Homestay Quy Nhơn",
  },
  {
    slug: "homestay-d-eldorado-tay-ho-tan-hoang-minh-tay-ho",
    title: "Homestay D' Eldorado Tây Hồ - Tân Hoàng Minh Tây Hồ",
  },
];
</script>

<!-- <style lang="css">
li a::after {
    content: "\f178";
    font-family: "Font Awesome 5 Pro";
    font-size: 16px;
    font-weight: 100;
    -webkit-transition: .3s;
    -moz-transition: .3s;
    -ms-transition: .3s;
    -o-transition: .3s;
    transition: .3s
}
</style> -->
