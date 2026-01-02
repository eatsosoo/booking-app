<template>
  <div
    class="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 relative"
  >
    <!-- Title -->
    <h2
      class="text-xl font-bold text-gray-800 hover:text-yellow-500 transition cursor-pointer line-clamp-1 mb-2"
    >
      {{ room.name }}
    </h2>
    <!-- Ribbon -->
    <div
      class="absolute top-18 left-0 bg-amber-200 text-gray-600 text-xs px-3 py-1 font-medium after:content-[''] after:absolute after:right-[-14px] after:top-0 after:border-y-[12px] after:border-y-transparent after:border-l-[14px] after:border-l-amber-200"
    >
      {{ ROOM_STATUSES[room.is_published] }}
    </div>

    <!-- Bookmark -->
    <span class="bookmark text-primary">
      <ClientOnly>
        <FontAwesomeIcon :icon="['fas', 'bookmark']" class="bookmark-icon" />
      </ClientOnly>
    </span>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Images -->
      <div class="grid grid-cols-2 gap-1 h-78">
        <img
          :src="room.thumbnail"
          :alt="`${room.slug}-thumbnail`"
          class="object-cover w-full h-78 transition-transform duration-300 hover:scale-105 border border-gray-200"
        />
        <div class="grid grid-cols-2 grid-rows-2 gap-1 overflow-hidden">
          <template v-for="index in 4" :key="index">
            <img
              v-if="room.gallery[index]"
              :src="room.gallery[index]"
              :alt="`${room.slug}-galerry-${index}`"
              class="object-cover w-full h-full transition-transform duration-300 hover:scale-105 border border-gray-200"
            />
          </template>
        </div>
      </div>

      <!-- Content -->
      <div>
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
          <p v-if="Number(room.per_day)" :class="tagStyle" class="bg-blue-300">
            {{ formatCurrency(room.per_day) }} / ngày
          </p>
          <p
            v-if="Number(room.per_month)"
            :class="tagStyle"
            class="bg-indigo-300"
          >
            {{ formatCurrency(room.per_month) }} / tháng
          </p>
          <p v-if="Number(room.room)" :class="tagStyle" class="bg-green-500">
            Phụ phí {{ formatCurrency(room.room) }} / người
          </p>
        </div>
        <div class="mt-2">
          <NuxtLink :to="`/dia-diem/${room.slug}`">
            <Button variant="outline">
              Xem thêm
              <LogOutIcon />
            </Button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { LogOutIcon } from "lucide-vue-next";
import type { PropType } from "vue";
import Button from "~/components/ui/button/Button.vue";
import Separator from "~/components/ui/separator/Separator.vue";
import { ROOM_STATUSES } from "~/constants";
import type { Properties } from "~/types";
import { formatCurrency } from "~/utils/string-helper";

const tagStyle =
  "text-white py-1 px-2 text-[14px] rounded-full font-semibold h-8";

const props = defineProps({
  room: {
    type: Object as PropType<Properties>,
    required: true,
  },
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
