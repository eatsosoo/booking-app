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
          Các căn hộ dự án
          <!-- "
          <span class="text-blue-900 font-bold"
            >Khu đô thị Vinhomes Smart City</span
          >" -->
        </h1>
      </div>
    </section>

    <section class="w-full px-6 py-10 max-w-7xl mx-auto mt-4">
      <!-- Header -->
      <h1 class="text-4xl font-bold text-gray-900">DANH SÁCH PHÒNG</h1>
      <p class="text-gray-600 mt-1">
        Kết quả hiển thị cho <span class="font-semibold">{{ paginate.total }} phòng</span>
      </p>

      <!-- Filter Buttons -->
      <div class="flex flex-wrap gap-2 mt-6">
        <Button
          v-for="item in filterOptions"
          :key="item.value"
          :variant="item.value.toString() === filterVal ? 'default' : 'outline'"
          @click="filterPage(item.value as number)"
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
              class="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
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
              class="text-xl font-bold text-gray-800 hover:text-yellow-500 transition cursor-pointer"
            >
              {{ room.name }}
            </h2>

            <!-- Location -->
            <p class="flex items-center gap-2 text-gray-600 mt-1">
              <ClientOnly>
                <FontAwesomeIcon
                  :icon="['fas', 'location-dot']"
                  class="text-primary"
                />
              </ClientOnly>
              {{ room.address }}
            </p>

            <!-- Type + Guest -->
            <div class="flex items-center gap-5 mt-2 text-gray-700">
              <p class="flex items-center gap-2">
                <ClientOnly>
                  <FontAwesomeIcon :icon="['fas', 'bed']" />
                </ClientOnly>
                {{ room.property_types.map((item) => item.name).join(' | ') }}
              </p>
              <p class="flex items-center gap-2">
                <ClientOnly>
                  <FontAwesomeIcon :icon="['fas', 'people-group']" />
                </ClientOnly>
                {{ room.guest }}
              </p>
            </div>

            <Separator class="my-6" />

            <!-- Prices -->
            <div class="mt-4">
              <p class="text-orange-500 font-semibold text-lg">
                {{ formatCurrency(room.base_hours) }} / 2 giờ đầu
              </p>
              <p class="text-yellow-500 font-semibold text-lg">
                {{ formatCurrency(room.per_night) }} / đêm
              </p>
              <p class="text-gray-500 font-semibold text-lg mt-1">
                {{ formatCurrency(room.extra_hour) }} / 1 giờ tiếp theo
              </p>
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
// import Button from "~/components/ui/button/Button.vue";
import Separator from "~/components/ui/separator/Separator.vue";
import { PROPERTY_TYPES } from "~/constants";
import type { Pagination, Properties, Response } from "~/types";
import { formatCurrency } from "~/utils/string-helper";

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
const filterVal = ref<string>("");

/** ------------------------------------------------
 * API URL
 */ 
const apiUrl = computed(
  () =>
    `${config.public.apiBase}/home/properties?page=${page.value}&per_page=${perPage.value}&region=${region.value}&property_types=${filterVal.value}`
);

const filterOptions = ref([{ label: "Tất cả", value: ""}, ...PROPERTY_TYPES])

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

const filterPage = (value: number) => {
  filterVal.value = value.toString();
  router.push({
    query: {
      ...route.query,
      property_types: value,
    },
  });
}

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
