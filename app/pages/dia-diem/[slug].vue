<template>
  <div>
    <section class="p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <NuxtImg
          :src="home.thumbnail"
          class="h-70 md:h-full"
          :alt="home.name"
        />
        <div class="grid grid-cols-2 gap-2">
          <NuxtImg
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          />
          <NuxtImg
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          />
          <NuxtImg
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          />
          <div class="relative">
            <NuxtImg
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            />
            <div
              class="absolute top-0 bottom-0 right-0 left-0 bg-black text-white opacity-50"
            ></div>
            <div
              class="absolute top-0 bottom-0 right-0 left-0 text-white font-semibold flex justify-center items-center text-center"
            >
              Xem tất cả <br />
              11 Ảnh
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <!-- Left column -->
        <div class="col-span-2 space-y-6">
          <!-- Thông tin chung -->
          <div class="p-4 border rounded-2xl shadow-sm bg-white mb-4">
            <h2 class="font-semibold text-lg mb-4">Thông tin chung</h2>
            <Separator class="mb-4" />
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div class="flex items-center gap-2">
                <span>Loại phòng:</span><strong>{{ home.property_types.map((item) => item.name).join(', ') }}</strong>
              </div>
              <div class="flex items-center gap-2">
                <span>Diện tích:</span><strong>{{ home.area}}m²</strong>
              </div>
              <div class="flex items-center gap-2">
                <span>Số khách:</span><strong>{{ home.guest }} khách</strong>
              </div>
              <div class="flex items-center gap-2">
                <span>Phòng ngủ:</span><strong>{{ home.bedrooms }} phòng</strong>
              </div>
              <div class="flex items-center gap-2">
                <span>Giường ngủ:</span><strong>{{ home.bed }} giường</strong>
              </div>
              <div class="flex items-center gap-2">
                <span>Phòng tắm:</span><strong>{{ home.bathrooms }} phòng</strong>
              </div>
            </div>
          </div>

          <!-- Thuê theo giờ -->
          <div class="p-4 border rounded-2xl shadow-sm bg-white space-y-4 mb-4">
            <h2 class="font-semibold text-lg">Thuê theo giờ (Tối đa 10 giờ)</h2>
            <Separator class="mb-4" />
            <div>
              <p class="font-medium">2 giờ đầu</p>
              <p class="text-orange-600 font-semibold">{{ formatCurrency(home.base_hours) }}</p>
              <p class="text-sm text-gray-600">1 giờ tiếp theo + {{ formatCurrency(home.extra_hour) }}</p>
            </div>

            <div>
              <p class="font-medium">Qua đêm (20:00 - 12:00)</p>
              <p class="text-orange-600 font-semibold">{{ formatCurrency(home.per_night) }}</p>
            </div>

            <div>
              <p class="font-medium">Thuê trong ngày (10:00 - 18:00)</p>
              <p class="text-orange-600 font-semibold">{{ formatCurrency(home.per_day) }}</p>
            </div>
          </div>

          <!-- Phụ phí thêm người -->
          <div class="p-4 border rounded-2xl shadow-sm bg-white mb-4">
            <h2 class="font-semibold text-lg mb-2">Phụ phí thêm người</h2>
            <Separator class="mb-4" />
            <p class="font-medium">
              <span class="text-orange-600">+ 200,000đ</span> / người (tính từ
              người thứ 3)
            </p>
          </div>

          <!-- Dịch vụ -->
          <div class="p-4 border rounded-2xl shadow-sm bg-white mb-4">
            <h2 class="font-semibold text-lg mb-2">Dịch vụ</h2>
            <Separator class="mb-4" />
            <p v-for="service in home.services" :key="service.id" class="italic font-xs">
              {{ service.title }}
            </p>
          </div>

          <!-- Giới thiệu -->
          <div
            class="p-4 border rounded-2xl shadow-sm bg-white leading-relaxed text-sm"
          >
            <h2 class="font-semibold text-lg mb-3">Giới thiệu căn hộ</h2>
            <Separator class="mb-4" />
            <p v-html="home.content"></p>
          </div>
        </div>

        <!-- Right column -->
        <div class="col-span-1 space-y-6">
          <!-- Date & Time selection -->
          <div class="p-4 border rounded-2xl shadow-sm bg-white mb-4">
            <h3 class="font-semibold mb-3">
              <DatePicker placeholder="Chọn ngày nhận phòng" />
            </h3>

            <Tabs default-value="morning">
              <TabsList>
                <TabsTrigger value="morning"> Sáng </TabsTrigger>
                <TabsTrigger value="afternoon"> Chiều </TabsTrigger>
              </TabsList>
              <TabsContent value="morning">
                <div
                  class="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-5 gap-2"
                >
                  <Button
                    v-for="time in MORNING_TIMES"
                    :key="time"
                    variant="outline"
                  >
                    {{ time }}
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="afternoon">
                <div
                  class="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-5 gap-2"
                >
                  <Button
                    v-for="time in AFTERNOON_TIMES"
                    :key="time"
                    variant="outline"
                  >
                    {{ time }}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <Separator class="my-4" />

            <h3 class="font-semibold mb-3">
              <DatePicker placeholder="Chọn ngày trả phòng" />
            </h3>

            <Tabs default-value="morning">
              <TabsList>
                <TabsTrigger value="morning"> Sáng </TabsTrigger>
                <TabsTrigger value="afternoon"> Chiều </TabsTrigger>
              </TabsList>
              <TabsContent value="morning">
                <div
                  class="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-5 gap-2"
                >
                  <Button
                    v-for="time in MORNING_TIMES"
                    :key="time"
                    variant="outline"
                  >
                    {{ time }}
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="afternoon">
                <div
                  class="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-5 gap-2"
                >
                  <Button
                    v-for="time in AFTERNOON_TIMES"
                    :key="time"
                    variant="outline"
                  >
                    {{ time }}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <!-- Số lượng người -->
          <div class="p-4 border rounded-2xl shadow-sm bg-white">
            <p class="font-medium mb-3">Số lượng người</p>
            <div class="flex items-center gap-3">
              <Button variant="outline" class="w-12">-</Button>
              <span class="font-semibold text-lg px-4">2</span>
              <Button variant="outline" class="w-12">+</Button>
            </div>
          </div>

          <!-- Button -->
          <NuxtLink to="/xac-nhan">
            <Button class="w-full" size="lg"> Đặt phòng ngay </Button>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import Separator from "~/components/ui/separator/Separator.vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatePicker from "~/components/DatePicker.vue";
import { AFTERNOON_TIMES, MORNING_TIMES } from "~/constants";
import type { Properties, Response } from "~/types";
import { formatCurrency } from '~/utils/string-helper';

const route = useRoute();
const id = route.params.slug;

const config = useRuntimeConfig();

const home = ref<Properties>({} as Properties);

const apiUrl = `${config.public.apiBase}/properties/${id}`;
const { data } = await useFetch<Response<Properties>>(apiUrl);

home.value = data.value?.data.items || ({} as Properties);
</script>

<style scoped></style>
