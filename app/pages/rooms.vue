<template>
  <div>
    <section
      class="bg-[url('/banner1.jpg')] bg-center h-96 opacity-85 relative flex justify-center"
    >
      <div
        class="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-50"
      ></div>
      <div
        class="absolute -bottom-4 bg-primary z-10 py-6 px-10 top rounded-tl-4xl rounded-br-4xl shadow-xl max-w-7xl w-7xl"
      >
        <h1 class="uppercase text-white text-2xl semibold">
          Kết quả tìm kiếm cho từ khoá "<span class="text-blue-900 font-bold"
            >Hà Nội</span
          >"
        </h1>
      </div>
    </section>

    <section class="max-w-7xl mx-auto mt-22">
      <SearchRooms />

      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold my-6 text-blue-900">
          Tìm được <span class="text-primary">790</span> Villa, Biệt thự cho
          bạn!
        </h2>

        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline">
              <ClientOnly>
                <FontAwesomeIcon :icon="['fas', 'filter']" />
              </ClientOnly>

              Sắp xếp
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div class="grid gap-4">
              <div class="grid gap-2">
                <div class="flex items-center gap-4">
                  <Checkbox id="newest" :default-value="false" />
                  <Label for="newest">Mới nhất</Label>
                </div>
                <div class="flex items-center gap-4">
                  <Checkbox id="mostBooked" :default-value="true" />
                  <Label for="mostBooked">Được đặt nhiều nhất</Label>
                </div>
                <div class="flex items-center gap-4">
                  <Checkbox id="hightestRated" :default-value="true" />
                  <Label for="hightestRated">Đánh giá cao nhất</Label>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="room in rooms"
          :key="room.id"
          class="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer rounded-br-3xl rounded-tl-3xl"
        >
          <NuxtImg
            :src="room.image"
            :alt="room.name"
            width="400"
            height="250"
            class="w-full h-52 object-cover"
            format="webp"
          />

          <div class="p-4">
            <h2 class="text-xl font-semibold mb-1">{{ room.name }}</h2>
            <p class="text-gray-600 mb-2">{{ room.description }}</p>
            <p class="text-gray-600 mb-2">
              <ClientOnly>
                <FontAwesomeIcon :icon="['fas', 'location-dot']" class="mr-2" />
              </ClientOnly>
              {{ room.address }}
            </p>
            <p class="text-gray-600 mb-2">
              <ClientOnly>
                <FontAwesomeIcon :icon="['fas', 'bed']" class="mr-2" />
              </ClientOnly>

              {{ room.roomInfo }}
            </p>
            <p class="text-gray-600 mb-2">
              <ClientOnly>
                <FontAwesomeIcon :icon="['fas', 'people-group']" class="mr-2" />
              </ClientOnly>

              {{ room.numPeople }}
            </p>
            <p class="text-lg font-bold text-blue-900 my-4">
              {{ formatPrice(room.price) }} / đêm
            </p>

            <NuxtLink to="/room-detail">
              <Button
                variant="link"
                class="text-md underline"
                @click="bookRoom(room)"
              >
                Xem thêm
              </Button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Button from "~/components/ui/button/Button.vue";
import Checkbox from "~/components/ui/checkbox/Checkbox.vue";
import Label from "~/components/ui/label/Label.vue";
import Popover from "~/components/ui/popover/Popover.vue";
import PopoverContent from "~/components/ui/popover/PopoverContent.vue";
import PopoverTrigger from "~/components/ui/popover/PopoverTrigger.vue";

const rooms = ref([
  {
    id: 1,
    name: "Phòng Deluxe Hướng Biển",
    description: "Tầm nhìn tuyệt đẹp, ban công riêng, miễn phí bữa sáng.",
    price: 1200000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    address: "Hạ Long, Quảng Ninh",
    roomInfo: "6 phòng ngủ, 9 toilet",
    numPeople: "14 người",
    rate: 5,
  },
  {
    id: 2,
    name: "Phòng Superior",
    description: "Phòng thoáng mát, nội thất sang trọng, tiện nghi đầy đủ.",
    price: 950000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    address: "Hạ Long, Quảng Ninh",
    roomInfo: "6 phòng ngủ, 9 toilet",
    numPeople: "14 người",
    rate: 5,
  },
  {
    id: 3,
    name: "Phòng Gia Đình",
    description: "Phù hợp cho nhóm hoặc gia đình 4 người, view thành phố.",
    price: 1800000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    address: "Hạ Long, Quảng Ninh",
    roomInfo: "6 phòng ngủ, 9 toilet",
    numPeople: "14 người",
    rate: 5,
  },
  {
    id: 4,
    name: "Phòng Gia Đình",
    description: "Phù hợp cho nhóm hoặc gia đình 4 người, view thành phố.",
    price: 1800000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    address: "Hạ Long, Quảng Ninh",
    roomInfo: "6 phòng ngủ, 9 toilet",
    numPeople: "14 người",
    rate: 5,
  },
]);

const formatPrice = (value: number) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const bookRoom = (room: { id: number; name: string }) => {
  alert(`Bạn đã chọn đặt: ${room.name}`);
};

useSeoMeta({
  title: "Danh sách phòng",
  description:
    "Danh sách các phòng khách sạn đẹp, giá tốt, đặt ngay tại Booking App.",
});
</script>
