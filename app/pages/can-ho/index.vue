<template>
  <div>
    <section
      class="bg-[url('/banner2.avif')] bg-center bg-contain h-96 opacity-85 relative flex justify-center"
    >
      <div
        class="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-50"
      ></div>
      <div
        class="absolute -bottom-4 bg-primary z-10 py-6 px-10 top rounded-tl-4xl rounded-br-4xl shadow-xl max-w-7xl w-full"
      >
        <h1 class="uppercase text-white text-2xl semibold">
          Các căn hộ "<span class="text-blue-900 font-bold">dịch vụ</span>"
        </h1>
      </div>
    </section>

    <section class="w-full px-6 py-10 max-w-7xl mx-auto mt-4">
      <!-- Header -->
      <h1 class="text-4xl font-bold text-gray-900">DANH SÁCH PHÒNG</h1>
      <p class="text-gray-600 mt-1">
        Kết quả hiển thị cho <span class="font-semibold">29 phòng</span>
      </p>

      <!-- Filter Buttons -->
      <div class="flex flex-wrap gap-2 mt-6">
        <Button
          v-for="item in filters"
          :key="item.value"
          :variant="item.value === filterVal ? 'default' : 'outline'"
          @click="filterVal = item.value"
        >
          {{ item.label }}
        </Button>
      </div>

      <!-- Room List -->
      <div class="mt-10 space-y-8">
        <div
          v-for="room in rooms"
          :key="room.id"
          class="bg-white rounded-3xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-100 relative"
        >
        <span class="bookmark text-primary">
            <ClientOnly>
                <FontAwesomeIcon :icon="['fas', 'bookmark']" class="bookmark-icon" />
            </ClientOnly>
        </span>
          <!-- Images -->
          <div class="grid grid-cols-2 gap-1 h-78">
            <NuxtImg
              :src="room.images[0]"
              class="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
            <div class="grid grid-cols-2 grid-rows-2 gap-1 overflow-hidden">
              <NuxtImg
                v-for="(img, i) in room.images"
                :key="i"
                :src="img"
                class="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          <!-- Content -->
          <div>
            <!-- Title -->
            <h2
              class="text-xl font-bold text-gray-800 hover:text-yellow-500 transition cursor-pointer"
            >
              {{ room.title }}
            </h2>

            <!-- Location -->
            <p class="flex items-center gap-2 text-gray-600 mt-1">
              <ClientOnly>
                <FontAwesomeIcon :icon="['fas', 'location-dot']" class="text-primary" />
              </ClientOnly>
              {{ room.location }}
            </p>

            <!-- Type + Guest -->
            <div class="flex items-center gap-5 mt-2 text-gray-700">
              <p class="flex items-center gap-2">
                <ClientOnly>
                  <FontAwesomeIcon :icon="['fas', 'bed']" />
                </ClientOnly>
                {{ room.type }}
              </p>
              <p class="flex items-center gap-2">
                <ClientOnly>
                  <FontAwesomeIcon :icon="['fas', 'people-group']" />
                </ClientOnly>
                {{ room.guests }}
              </p>
            </div>

            <Separator class="my-6" />

            <!-- Prices -->
            <div class="mt-4">
              <p class="text-orange-500 font-semibold text-lg">
                {{ room.firstPrice }}
              </p>
              <p class="text-yellow-500 font-semibold text-lg">
                {{ room.nightPrice }}
              </p>
              <p class="text-gray-500 font-semibold text-lg mt-1">{{ room.nextHour }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Button from "~/components/ui/button/Button.vue";
import Separator from "~/components/ui/separator/Separator.vue";

const filters = [
  { label: "Tất cả", value: "all" },
  { label: "Khách sạn", value: "hotel" },
  { label: "Villa", value: "villa" },
  { label: "Studio", value: "studio" },
  { label: "Căn hộ 1 PN", value: "1pn" },
  { label: "Căn hộ 2 PN", value: "2pn" },
  { label: "Căn hộ 3 PN", value: "3pn" },
];

const rooms = [
  {
    id: 1,
    title: "Căn hộ dịch vụ cho cặp đôi tại Vinhomes Smart City",
    location: "Vinhomes Smart City, Nam Từ Liêm, Hà Nội",
    type: "Studio",
    guests: "1-2 khách",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    ],
    firstPrice: "400,000 đ / 2 giờ đầu",
    nightPrice: "600,000 đ / đêm",
    nextHour: "50,000 đ / 1 giờ tiếp theo",
    tag: "Nổi Bật",
  },

  {
    id: 2,
    title: "Studio – Có máy chiếu với Ghế Matxa thư giãn",
    location: "Vinhomes Smart City, Nam Từ Liêm, Hà Nội",
    type: "Studio",
    guests: "1-2 khách",
    tag: "Nổi Bật",
    sale: "Siêu Sale",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    ],
    firstPrice: "400,000 đ / 2 giờ đầu",
    nightPrice: "600,000 đ / đêm",
    nextHour: "50,000 đ / 1 giờ tiếp theo",
  },
];

const filterVal = ref("all");
</script>

<style scoped>
.bookmark {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 9;
    border-top: 48px solid #fff5e0;
    border-left: 48px solid transparent;
    border-radius: 0 10px;
}
.bookmark-icon {
    z-index: 999;
    top: 0;
    right: 0;
    position: absolute;
    margin-top: -40px;
    margin-right: 5px;
    color: #ffa920;
    font-size: 12px;
}
</style>
