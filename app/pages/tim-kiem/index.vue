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
        <h1>
          <ClientBreadcrumb />
        </h1>
      </div>
    </section>

    <section class="w-full px-6 py-10 max-w-7xl mx-auto mt-4">
      <!-- Header -->
      <h1 class="text-4xl font-bold text-gray-900">DANH SÁCH PHÒNG</h1>
      <p class="text-gray-600 mt-1">
        Kết quả hiển thị cho
        <span class="font-semibold">{{ paginate.total }} phòng</span>
      </p>

      <!-- Room List -->
      <div class="mt-10 space-y-8">
        <div
          v-for="room in rooms"
          :key="room.id"
          class="bg-white rounded-3xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-100 relative"
        >
          <span class="bookmark text-primary">
            <ClientOnly>
              <FontAwesomeIcon
                :icon="['fas', 'bookmark']"
                class="bookmark-icon"
              />
            </ClientOnly>
          </span>
          <!-- Images -->
          <div class="grid grid-cols-2 gap-1 h-78">
            <NuxtImg
              :src="room.thumbnail"
              class="object-cover w-full h-78 transition-transform duration-300 hover:scale-105"
            />
            <div class="grid grid-cols-2 grid-rows-2 gap-1 overflow-hidden">
              <NuxtImg
                v-for="(img, i) in room.gallery"
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
              class="text-xl font-bold text-gray-800 hover:text-yellow-500 transition cursor-pointer line-clamp-1"
            >
              {{ room.name }}
            </h2>
            <p class="text-gray-600 mb-2 text-[14px] line-clamp-3">
              {{ room.description }}
            </p>

            <!-- Location -->
            <ClientOnly>
              <p class="text-gray-600 mb-1 line-clamp-2 text-[14px]">
                <FontAwesomeIcon :icon="['fas', 'location-dot']" class="mr-2" />
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
                <FontAwesomeIcon :icon="['fas', 'people-group']" class="mr-2" />
                {{ room.guest }} người
              </p>
            </ClientOnly>

            <Separator class="my-4" />

            <!-- Prices -->
            <div class="space-x-2 space-y-2 flex flex-wrap">
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
            <div class="mt-2">
              <NuxtLink :to="`/dia-diem/${room.id}`">
                <Button variant="outline">
                  Xem thêm
                  <LogOutIcon />
                </Button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <!-- <Separator class="mb-10 mt-12"/> -->
      <div class="mt-12">
        <PaginationPage
          class="mt-6"
          :page="paginate.current_page"
          :total-pages="paginate.last_page"
          @change="updatePage($event)"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import PaginationPage from "~/components/PaginationPage.vue";
import Button from "~/components/ui/button/Button.vue";
import Separator from "~/components/ui/separator/Separator.vue";
import type { Pagination, Properties, Response } from "~/types";
import { formatCurrency } from "~/utils/string-helper";
import { LogOutIcon } from "lucide-vue-next";

const tagStyle =
  "text-white py-1 px-2 text-[14px] rounded-full font-semibold h-8";

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();

const rooms = ref<Properties[]>([]);
const paginate = ref<Pagination>({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
  has_more_pages: false,
});

const page = computed(() => {
  const p = Number(route.query.page) || 1;
  return p < 1 ? 1 : p;
});
const perPage = computed(() => route.query.per_page || 12);
const region = computed(() => route.query.region || "");
const province = computed(() => route.query.province || "");
const district = computed(() => route.query.district || "");
const property_types = computed(() => route.query.property_types || "");
const guest = computed(() => route.query.guest || "");

/** ------------------------------------------------
 * API URL
 */
const apiUrl = computed(
  () =>
    `${config.public.apiBase}/home/properties?page=${page.value}
    &per_page=${perPage.value}
    &property_types=${property_types.value}
    &region=${region.value}
    &province=${province.value}
    &district=${district.value}
    &guest=${guest.value}`
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
