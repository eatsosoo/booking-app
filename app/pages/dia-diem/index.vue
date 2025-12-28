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
          Kết quả tìm kiếm cho từ khoá "<span class="text-blue-900 font-bold">{{
            keyword
          }}</span
          >"
        </h1>
      </div>
    </section>

    <section class="max-w-7xl mx-auto mt-22 p-4">
      <SearchRooms
        :place="(keyword as string)"
        :title="(title as string)"
        :bath-room-num="(bathRoomNum as string)"
        :bed-room-num="(bedRoomNum as string)"
        :services="(services as string)"
        @submit="handleSubmit"
      />

      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold my-6 text-blue-900">
          Tìm được <span class="text-primary">{{ paginate.total }}</span> địa
          điểm cho bạn!
        </h2>

        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline"> Sắp xếp </Button>
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
          class="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer rounded-br-3xl rounded-tl-3xl flex flex-col justify-between"
        >
          <div>
            <NuxtImg
              :src="room.thumbnail"
              :alt="room.name"
              width="400"
              height="250"
              class="w-full h-52 object-cover"
              format="webp"
            />

            <div class="p-4 pb-0">
              <h2 class="text-xl font-semibold mb-1">{{ room.name }}</h2>
              <p class="text-gray-600 mb-2 line-clamp-3">
                {{ room.description }}
              </p>
              <ClientOnly>
                <p class="text-gray-600 mb-1 line-clamp-2 text-[14px]">
                  <FontAwesomeIcon
                    :icon="['fas', 'location-dot']"
                    class="mr-2"
                  />
                  {{ room.address }}
                </p>
                <p class="text-gray-600 mb-1 text-[14px]">
                  <FontAwesomeIcon :icon="['fas', 'bed']" class="mr-2" />
                  {{ room.bedrooms }} phòng ngủ
                </p>
                <p class="text-gray-600 mb-1 text-[14px]">
                  <FontAwesomeIcon :icon="['fas', 'bed']" class="mr-2" />
                  {{ room.bathrooms }} phòng tắm
                </p>
                <p class="text-gray-600 mb-1 text-[14px]">
                  <FontAwesomeIcon
                    :icon="['fas', 'people-group']"
                    class="mr-2"
                  />
                  {{ room.guest }} người
                </p>
              </ClientOnly>
              <div class="mt-4 space-x-2 space-y-2 flex flex-wrap">
                <p
                  v-if="Number(room.base_hours)"
                  :class="tagStyle"
                  class="bg-primary"
                >
                  {{ formatCurrency(room.base_hours) }} / 2 giờ đầu
                </p>
                <p
                  v-if="Number(room.extra_hour)"
                  :class="tagStyle"
                  class="bg-red-300"
                >
                  {{ formatCurrency(room.extra_hour) }} / giờ tiếp theo
                </p>

                <p
                  v-if="Number(room.per_night)"
                  :class="tagStyle"
                  class="bg-orange-300"
                >
                  {{ formatCurrency(room.per_night) }} / đêm
                </p>
                <p
                  v-if="Number(room.per_day)"
                  :class="tagStyle"
                  class="bg-blue-300"
                >
                  {{ formatCurrency(room.per_day) }} / ngày
                </p>
                <p
                  v-if="Number(room.per_month)"
                  :class="tagStyle"
                  class="bg-indigo-300"
                >
                  {{ formatCurrency(room.per_month) }} / tháng
                </p>
              </div>
            </div>
          </div>

          <NuxtLink :to="`/dia-diem/${room.slug}`" class="mb-2">
            <Button variant="link" class="text-md underline"> Xem thêm </Button>
          </NuxtLink>
        </div>
      </div>

      <Separator class="mt-10 mb-6" />
      <PaginationPage
        class="mt-6"
        :page="paginate.current_page"
        :total-pages="paginate.last_page"
        @change="updatePage($event)"
      />
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
import type { PaginationType, Properties, Response } from "~/types";
import { formatCurrency } from "~/utils/string-helper";

useSeoMeta({
  title: "Danh sách phòng",
  description:
    "Danh sách các phòng khách sạn đẹp, giá tốt, đặt ngay tại DyHome.",
});

const route = useRoute();
const config = useRuntimeConfig();
const router = useRouter();

const page = computed(() => {
  const p = Number(route.query.page) || 1;
  return p < 1 ? 1 : p;
});
const perPage = computed(() => route.query.per_page || 12);
const keyword = computed(() => route.query.place || "");
const propertyType = computed(() => route.query.property_types || "");
const title = computed(() => route.query.title || "");
const bathRoomNum = computed(() => route.query.bath || "");
const bedRoomNum = computed(() => route.query.bed || "");
const services = computed(() => route.query.services || "");

const rooms = ref<Properties[]>([]);
const paginate = ref<PaginationType>({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
  has_more_pages: false,
});

const apiUrl = computed(
  () =>
    `${config.public.apiBase}/home/properties?page=${page.value}&per_page=${perPage.value}&property_types=${propertyType.value}&title=${title.value}&bed=${bedRoomNum.value}&bath=${bathRoomNum.value}`
);

const { data } = await useAsyncData(
  () => `places-list-${apiUrl.value}`,
  () => $fetch<Response<Properties[]>>(apiUrl.value),
  { watch: [apiUrl] }
);

const updatePage = (newPage: number) => {
  router.push({
    query: {
      ...route.query,
      page: newPage,
    },
  });
};

watchEffect(() => {
  if (data.value) {
    rooms.value = data.value.data.items;
    paginate.value = data.value.result?.pagination || paginate.value;
  }
});

const handleSubmit = (formData: any) => {
  router.push({
    query: {
      page: 1,
      per_page: 12,
      property_types: propertyType.value,
      title: formData.title,
      bath: formData.bathroom,
      bed: formData.bedroom,
      services: formData.services.join(","),
      place: formData.place,
    },
  });
};

const tagStyle =
  "text-white py-1 px-2 text-[14px] rounded-full font-semibold h-8";
</script>
