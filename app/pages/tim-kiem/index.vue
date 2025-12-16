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

    <section class="w-full px-6 pt-10 max-w-7xl mx-auto mt-4">
      <SearchForm2 />
    </section>

    <section class="w-full px-6 py-10 max-w-7xl mx-auto mt-4">
      <div v-if="pending">Loading...</div>
      <div v-else-if="error">Có lỗi xảy ra</div>
      <div v-else>
        <!-- Header -->
        <h1 class="text-4xl font-bold text-blue-950">DANH SÁCH PHÒNG</h1>
        <p class="text-gray-600 mt-1">
          Kết quả hiển thị cho
          <span class="font-semibold">{{ paginate.total }} phòng</span>
        </p>

        <!-- Room List -->
        <div v-if="province" class="mt-10 space-y-8">
          <div v-for="room in rooms" :key="room.id">
            <RoomItem :room="room" />
          </div>
        </div>
        <div v-else class="mt-10 space-y-8">
          <div v-for="(districts, province) in regionMenus" :key="province">
            <div
              class="bg-white rounded-xl shadow-sm p-4 pb-0 border border-gray-100 relative"
            >
              <div class="border-l-6 border-l-primary mb-4">
                <p class="text-xl font-semibold ml-4">{{ province }}</p>
              </div>
              <Swiper
                :modules="[Pagination, Autoplay, Grid]"
                :pagination="{ clickable: true }"
                :autoplay="{ delay: 3000 }"
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
                class="slide-district rounded"
              >
                <SwiperSlide
                  v-for="district in districts"
                  :key="`image-slider-${district.title}`"
                  class=""
                >
                  <div class="grid grid-cols-1">
                    <NuxtImg
                      :src="district.thumbnail"
                      class="object-cover rounded border border-gray-200 w-full h-58"
                      @click="updateFilter(province, district.title)"
                    />
                    <p
                      class="text-center my-2 hover:text-primary hover:underline cursor-pointer"
                      @click="updateFilter(province, district.title)"
                    >
                      {{ district.title }}
                    </p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="mt-12">
          <PaginationPage
            class="mt-6"
            :page="paginate.current_page"
            :total-pages="paginate.last_page"
            @change="updatePage($event)"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import PaginationPage from "~/components/PaginationPage.vue";
import type { PaginationType, Properties, Response } from "~/types";
import RoomItem from "~/components/common/place/RoomItem.vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import { Pagination, Autoplay, Grid } from "swiper/modules";

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();

const paginate = ref<PaginationType>({
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

const regionMenus = computed(() => {
  if (!property_types.value || !region.value) return {};
  return getProvinceAndDistrict(
    Number(property_types.value),
    region.value as string,
    rooms.value
  );
});

/** ------------------------------------------------
 * API URL
 */
const apiParams = computed(() => ({
  page: page.value,
  per_page: perPage.value,
  property_types: property_types.value || undefined,
  region: region.value || undefined,
  province: province.value || undefined,
  district: district.value || undefined,
  guest: guest.value || undefined,
}));

const { data, pending, error } = await useAsyncData(
  () =>
    `places-list-${page.value}_${perPage.value}_${property_types.value}_${region.value}_${province.value}_${district.value}`,
  () =>
    $fetch<Response<Properties[]>>(`${config.public.apiBase}/home/properties`, {
      params: apiParams.value,
    }),
  { watch: [apiParams] }
);

const rooms = computed(() => data.value?.data.items ?? []);

const updatePage = (newPage: number) => {
  if (newPage < 1) return;

  router.push({
    query: { ...route.query, page: newPage },
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
};

const updateFilter = (newProvince: string, newDistrict: string) => {
  router.push({
    query: { ...route.query, province: newProvince, district: newDistrict },
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
};

const getProvinceAndDistrict = (
  propertyId: number,
  region: string,
  rooms: Properties[]
) => {
  if (!rooms) return {};

  const records = rooms;

  const filtered = records.filter(
    (p) =>
      p.property_types.some((item) => item.id === propertyId) &&
      p.region === region
  );

  const group: Record<string, { title: string; thumbnail: string }[]> = {};

  filtered.forEach((el) => {
    const disItem = {
      title: el.district,
      thumbnail: el.thumbnail,
    };
    if (!group[el.province]) {
      group[el.province] = [disItem];
    } else if (group[el.province]?.some((dist) => dist.title !== el.district)) {
      group[el.province]?.push(disItem);
    }
  });

  return group;
};

watch(
  data,
  (val) => {
    if (!val) return;

    paginate.value = val.result?.pagination ?? paginate.value;
  },
  { immediate: true }
);
</script>

<style lang="css" scoped>
.slide-district {
  height: 300px;
}
</style>
