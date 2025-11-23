<template>
  <div>
    <section
      class="bg-[url('/banner2.avif')] bg-center bg-cover h-96 opacity-85 relative flex justify-center"
    >
      <div
        class="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-50"
      ></div>
      <div
        class="absolute -bottom-4 bg-primary z-10 py-6 px-10 top rounded-tl-4xl rounded-br-4xl shadow-xl max-w-7xl w-full"
      >
        <h1 class="uppercase text-white text-2xl semibold">
          Các căn hộ "<span class="text-blue-900 font-bold">Khu đô thị Vinhomes Smart City</span>"
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
      <!-- <div class="flex flex-wrap gap-2 mt-6">
        <Button
          v-for="item in filters"
          :key="item.value"
          :variant="item.value === filterVal ? 'default' : 'outline'"
          @click="filterVal = item.value"
        >
          {{ item.label }}
        </Button>
      </div> -->

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

      <!-- Pagination -->
       <!-- <Separator class="mb-10 mt-12"/> -->
       <div class="mt-12">
        <PaginateWrap />
       </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import Button from "~/components/ui/button/Button.vue";
import Separator from "~/components/ui/separator/Separator.vue";

const { params } = useRoute()
const { slug } = params

console.log(slug)
// const filters = [
//   { label: "Tất cả", value: "all" },
//   { label: "Khách sạn", value: "hotel" },
//   { label: "Villa", value: "villa" },
//   { label: "Studio", value: "studio" },
//   { label: "Căn hộ 1 PN", value: "1pn" },
//   { label: "Căn hộ 2 PN", value: "2pn" },
//   { label: "Căn hộ 3 PN", value: "3pn" },
// ];

const rooms = [
  {
    id: 1,
    title: "Căn hộ cho cặp đôi tại Vinhomes Smart City",
    location: "Vinhomes Smart City, Nam Từ Liêm, Hà Nội",
    type: "Studio",
    guests: "1-2 khách",
    images: [
      "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    firstPrice: "450,000 đ / 2 giờ đầu",
    nightPrice: "650,000 đ / đêm",
    nextHour: "55,000 đ / 1 giờ tiếp theo",
  },
  {
    id: 3,
    title: "Căn hộ cao cấp view Hồ Tây Full tiện nghi",
    location: "Vinhomes Smart City, Nam Từ Liêm, Hà Nội",
    type: "Căn hộ",
    guests: "1-3 khách",
    tag: "View Đẹp",
    images: [
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    firstPrice: "600,000 đ / 2 giờ đầu",
    nightPrice: "900,000 đ / đêm",
    nextHour: "80,000 đ / 1 giờ tiếp theo",
  },
  {
    id: 4,
    title: "Studio Mini có ban công tại Times City",
    location: "Vinhomes Smart City, Nam Từ Liêm, Hà Nội",
    type: "Studio",
    guests: "1-2 khách",
    tag: "Tiết Kiệm",
    sale: "Giờ Vàng",
    images: [
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    firstPrice: "350,000 đ / 2 giờ đầu",
    nightPrice: "500,000 đ / đêm",
    nextHour: "40,000 đ / 1 giờ tiếp theo",
  },
  {
    id: 5,
    title: "Căn hộ Duplex có bếp nấu ăn Royal City",
    location: "Vinhomes Smart City, Nam Từ Liêm, Hà Nội",
    type: "Duplex",
    guests: "2-4 khách",
    tag: "Có Bếp",
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    firstPrice: "550,000 đ / 2 giờ đầu",
    nightPrice: "800,000 đ / đêm",
    nextHour: "70,000 đ / 1 giờ tiếp theo",
  },
  {
    id: 6,
    title: "Studio có bồn tắm lớn & view thành phố",
    location: "Vinhomes Smart City, Nam Từ Liêm, Hà Nội",
    type: "Studio",
    guests: "1-2 khách",
    tag: "Sang Trọng",
    sale: "Mới",
    images: [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    firstPrice: "500,000 đ / 2 giờ đầu",
    nightPrice: "750,000 đ / đêm",
    nextHour: "65,000 đ / 1 giờ tiếp theo",
  },
  {
    id: 7,
    title: "Căn hộ có Gym & Hồ bơi nội khu",
    location: "Vinhomes Smart City, Nam Từ Liêm, Hà Nội",
    type: "Căn hộ",
    guests: "1-3 khách",
    tag: "Tiện Ích",
    images: [
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    firstPrice: "650,000 đ / 2 giờ đầu",
    nightPrice: "950,000 đ / đêm",
    nextHour: "85,000 đ / 1 giờ tiếp theo",
  },
  {
    id: 8,
    title: "Studio giá rẻ gần sân bay Nội Bài",
    location: "Vinhomes Smart City, Nam Từ Liêm, Hà Nội",
    type: "Studio",
    guests: "1-2 khách",
    tag: "Giá Rẻ",
    sale: "Khuyến Mãi",
    images: [
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    firstPrice: "300,000 đ / 2 giờ đầu",
    nightPrice: "450,000 đ / đêm",
    nextHour: "35,000 đ / 1 giờ tiếp theo",
  }
];

// const filterVal = ref("all");
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
