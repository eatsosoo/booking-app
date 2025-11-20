<template>
  <div>
    <section
      class="bg-[url('/banner1.jpg')] bg-center h-96 opacity-85 relative flex justify-center"
    >
      <div
        class="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-50"
      ></div>
      <div
        class="absolute -bottom-4 bg-primary z-10 py-6 px-10 top rounded-tl-4xl rounded-br-4xl shadow-xl max-w-7xl w-full"
      >
        <h1 class="uppercase text-white text-2xl semibold">
          Kết quả tìm kiếm cho từ khoá "<span class="text-blue-900 font-bold"
            >Hà Nội</span
          >"
        </h1>
      </div>
    </section>

    <section class="max-w-7xl mx-auto mt-22 p-4">
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

            <NuxtLink :to="`/dia-diem/${room.slug}`">
              <Button
                variant="link"
                class="text-md underline"
              >
                Xem thêm
              </Button>
            </NuxtLink>
          </div>
        </div>
      </div>

      <Separator class="mt-10 mb-6"/>
      <PaginateWrap />
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
import Separator from "~/components/ui/separator/Separator.vue";

const rooms = ref([
  {
    id: 1,
    name: "Biệt Thự View Biển Cao Cấp",
    description: "Biệt thự riêng tư với hồ bơi, view biển tuyệt đẹp, phù hợp cho gia đình và nhóm bạn. Có bếp đầy đủ tiện nghi và sân vườn rộng rãi.",
    price: 3200000,
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    address: "Bãi Dài, Phú Quốc, Kiên Giang",
    roomInfo: "4 phòng ngủ, 3 phòng tắm",
    numPeople: "8 người",
    rate: 4.9,
    slug: 'biet-thu-view-bien-cao-cap',
  },
  {
    id: 2,
    name: "Căn Hộ Studio View Thành Phố",
    description: "Căn hộ studio hiện đại với view toàn cảnh thành phố, nội thất mới 100%, wifi tốc độ cao và phòng gym miễn phí.",
    price: 850000,
    image: "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    address: "Quận 1, TP. Hồ Chí Minh",
    roomInfo: "1 phòng ngủ, 1 phòng tắm",
    numPeople: "2 người",
    rate: 4.7,
    slug: 'can-ho-studio-view-thanh-pho'
  },
  {
    id: 3,
    name: "Nhà Gỗ View Rừng Thông",
    description: "Nhà gỗ ấm cúng giữa rừng thông, không gian yên tĩnh lý tưởng để nghỉ dưỡng. Có lò sưởi và ban công ngắm cảnh.",
    price: 1250000,
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    address: "Đường Hồ Xuân Hương, Đà Lạt, Lâm Đồng",
    roomInfo: "2 phòng ngủ, 2 phòng tắm",
    numPeople: "4 người",
    rate: 4.8,
    slug: 'nha-go-view-rung-thong'
  },
  {
    id: 4,
    name: "Homestay View Ruộng Bậc Thang",
    description: "Homestay độc đáo với view ruộng bậc thang tuyệt đẹp, trải nghiệm văn hóa địa phương. Bao gồm bữa sáng đặc sản.",
    price: 750000,
    image: "https://images.pexels.com/photos/3188786/pexels-photo-3188786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    address: "Thôn Cát Cát, Sa Pa, Lào Cai",
    roomInfo: "3 phòng ngủ, 2 phòng tắm",
    numPeople: "6 người",
    rate: 4.6,
    slug: 'homestay-view-ruong-bac-thang'
  },
  {
    id: 5,
    name: "Villa Hồ Bơi Riêng View Núi",
    description: "Villa sang trọng với hồ bơi riêng, view núi non hùng vĩ. Có người quản gia và đầu bếp riêng theo yêu cầu.",
    price: 5500000,
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    address: "Hòa Bình, Việt Nam",
    roomInfo: "5 phòng ngủ, 4 phòng tắm",
    numPeople: "10 người",
    rate: 5.0,
    slug: 'villa-ho-boi-rieng-view-nui'
  },
  {
    id: 6,
    name: "Căn Hộ View Sông Sang Trọng",
    description: "Căn hộ cao cấp với view sông tuyệt đẹp, nội thất thiết kế tinh tế. Tiện nghi 5 sao và dịch vụ khách sạn đẳng cấp.",
    price: 1950000,
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    address: "Quận Bình Thạnh, TP. Hồ Chí Minh",
    roomInfo: "2 phòng ngủ, 2 phòng tắm",
    numPeople: "4 người",
    rate: 4.9,
    slug: 'can-ho-view-song-sang-trong'
  },
  {
    id: 7,
    name: "Nhà Vườn Yên Tĩnh",
    description: "Không gian nghỉ dưỡng yên bình với vườn cây xanh mát, phù hợp cho những ai muốn tránh xa ồn ào thành thị.",
    price: 680000,
    image: "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    address: "Củ Chi, TP. Hồ Chí Minh",
    roomInfo: "3 phòng ngủ, 2 phòng tắm",
    numPeople: "6 người",
    rate: 4.5,
    slug: 'nha-vuon-yen-tinh'
  },
  {
    id: 8,
    name: "Căn Hộ Mini Trung Tâm",
    description: "Căn hộ mini tiện nghi, vị trí đắc địa ngay trung tâm, dễ dàng di chuyển đến các điểm du lịch và mua sắm.",
    price: 520000,
    image: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    address: "Quận Hoàn Kiếm, Hà Nội",
    roomInfo: "1 phòng ngủ, 1 phòng tắm",
    numPeople: "2 người",
    rate: 4.3,
    slug: 'can-ho-mini-trung-tam'
  },
  {
    id: 9,
    name: "Bungalow View Biển Lãng Mạn",
    description: "Bungalow nhỏ xinh nằm ngay sát biển, view hoàng hôn tuyệt đẹp. Thiết kế mở, phù hợp cho các cặp đôi muốn không gian riêng tư.",
    price: 1450000,
    image: "https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    address: "Đảo Nam Du, Kiên Giang",
    roomInfo: "1 phòng ngủ, 1 phòng tắm",
    numPeople: "2 người",
    rate: 4.8,
    slug: 'bungalow-view-bien-lang-man'
  }
]);

const formatPrice = (value: number) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

// const bookRoom = (room: { id: number; name: string }) => {
//   alert(`Bạn đã chọn đặt: ${room.name}`);
// };

useSeoMeta({
  title: "Danh sách phòng",
  description:
    "Danh sách các phòng khách sạn đẹp, giá tốt, đặt ngay tại Booking App.",
});
</script>
