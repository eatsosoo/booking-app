<template>
  <div>
    <section class="p-4">
      <div
        class="flex gap-2 cursor-pointer h-[390px] lg:h-[390px] xl:h-[500px]"
      >
        <!-- Thumbnail bên trái -->
        <div class="h-full flex-1">
          <NuxtImg
            :src="home.thumbnail"
            :alt="`Thumbnail ${home.name}`"
            class="w-full h-full object-cover rounded"
          />
        </div>

        <!-- 4 ảnh nhỏ bên phải -->
        <div class="flex-1 grid grid-cols-2 grid-rows-2 gap-2 h-full">
          <div class="w-full h-full">
            <NuxtImg
              :src="home.gallery[0] ?? '/no-image.jpg'"
              :alt="`Bộ ảnh ${home.name} 1`"
              class="w-full h-full object-cover rounded"
            />
          </div>

          <div class="w-full h-full">
            <NuxtImg
              :src="home.gallery[1] ?? '/no-image.jpg'"
              :alt="`Bộ ảnh ${home.name} 2`"
              class="w-full h-full object-cover rounded"
            />
          </div>

          <div class="w-full h-full">
            <NuxtImg
              :src="home.gallery[2] ?? '/no-image.jpg'"
              :alt="`Bộ ảnh ${home.name} 3`"
              class="w-full h-full object-cover rounded"
            />
          </div>

          <!-- Ảnh có overlay -->
          <div class="relative w-full h-full group">
            <NuxtImg
              :src="home.gallery[3] ?? '/no-image.jpg'"
              :alt="`Bộ ảnh ${home.name} 4`"
              class="w-full h-full object-cover rounded"
            />

            <!-- Overlay -->
            <div
              class="absolute inset-0 bg-black/50 rounded flex justify-center items-center text-white font-semibold text-center transition-all duration-200 group-hover:scale-110"
            >
              Xem tất cả <br />
              {{ home.gallery.length }} ảnh
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <!-- Left column -->
        <div class="col-span-2 space-y-6">
          <!-- Giới thiệu -->
          <div
            class="p-4 border rounded-2xl shadow-sm bg-white leading-relaxed text-sm"
          >
            <h2 class="font-semibold text-lg mb-3">Giới thiệu căn hộ</h2>
            <Separator class="mb-4" />
            <p v-html="home.content"></p>
          </div>

          <!-- Thông tin chung -->
          <div class="p-4 border rounded-2xl shadow-sm bg-white mb-4">
            <h2 class="font-semibold text-lg mb-4">Thông tin chung</h2>
            <Separator class="mb-4" />
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div class="flex items-center gap-2">
                <span>Loại phòng:</span
                ><strong>{{
                  home.property_types.map((item) => item.name).join(", ")
                }}</strong>
              </div>
              <div class="flex items-center gap-2">
                <span>Diện tích:</span><strong>{{ home.area }}m²</strong>
              </div>
              <div class="flex items-center gap-2">
                <span>Số khách:</span><strong>{{ home.guest }} khách</strong>
              </div>
              <div class="flex items-center gap-2">
                <span>Phòng ngủ:</span
                ><strong>{{ home.bedrooms }} phòng</strong>
              </div>
              <div class="flex items-center gap-2">
                <span>Giường ngủ:</span><strong>{{ home.bed }} giường</strong>
              </div>
              <div class="flex items-center gap-2">
                <span>Phòng tắm:</span
                ><strong>{{ home.bathrooms }} phòng</strong>
              </div>
            </div>
          </div>

          <!-- Thuê theo giờ -->
          <div class="p-4 border rounded-2xl shadow-sm bg-white space-y-4 mb-4">
            <h2 class="font-semibold text-lg">Giá phòng</h2>
            <Separator class="mb-4" />
            <div class="grid grid-cols-1 md:grid-cols-2">
              <div>
                <div>
                  <p class="font-medium">2 giờ đầu</p>
                  <p class="text-orange-600 font-semibold">
                    {{ formatCurrency(home.base_hours) }}
                  </p>
                  <p class="text-sm text-gray-600">
                    1 giờ tiếp theo + {{ formatCurrency(home.extra_hour) }}
                  </p>
                </div>

                <div>
                  <p class="font-medium">Nghỉ qua đêm (20:00 - 12:00)</p>
                  <p class="text-orange-600 font-semibold">
                    {{ formatCurrency(home.per_night) }}
                  </p>
                </div>

                <div>
                  <p class="font-medium">Thuê trong ngày (10:00 - 18:00)</p>
                  <p class="text-orange-600 font-semibold">
                    {{ formatCurrency(home.per_day) }}
                  </p>
                </div>
              </div>
              <!-- Phụ phí thêm người -->
              <div class="border-l px-2">
                <div>
                  <p class="font-medium">Thuê theo tháng</p>
                  <p class="text-orange-600 font-semibold">
                    {{ formatCurrency(home.per_month) }}
                  </p>
                </div>
                <div>
                  <p class="font-medium">Phụ phí</p>
                  <p class="font-semibold">
                    <span class="text-orange-600">+ 200,000đ</span> / người (tính
                  từ người thứ {{ home.guest + 1 }})
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Dịch vụ -->
          <div class="p-4 border rounded-2xl shadow-sm bg-white mb-4">
            <h2 class="font-semibold text-lg mb-2">Dịch vụ</h2>
            <Separator class="mb-4" />
            <p
              v-for="service in home.services"
              :key="service.id"
              class="italic font-xs"
            >
              {{ service.title }}
            </p>
          </div>
        </div>

        <!-- Right column -->
        <div class="col-span-1 space-y-6">
          <!-- Date & Time selection -->
          <div class="p-4 border rounded-2xl shadow-sm bg-white mb-4">
            <h3 class="font-semibold mb-3">
              <DatePicker
                :model-value="times.start_date"
                :min="minDate"
                :max="times.end_date"
                placeholder="Chọn ngày nhận phòng"
                @update:model-value="times.start_date = $event"
              />
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
                    :variant="time === times.start_time ? 'default' : 'outline'"
                    @click="times.start_time = time"
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
                    :variant="time === times.start_time ? 'default' : 'outline'"
                    @click="times.start_time = time"
                  >
                    {{ time }}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <Separator class="my-4" />

            <h3 class="font-semibold mb-3">
              <DatePicker
                :model-value="times.end_date"
                :min="times.start_date"
                placeholder="Chọn ngày trả phòng"
                @update:model-value="times.end_date = $event"
              />
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
                    :variant="time === times.end_time ? 'default' : 'outline'"
                    @click="times.end_time = time"
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
                    :variant="time === times.end_time ? 'default' : 'outline'"
                    @click="times.end_time = time"
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
              <Button
                variant="outline"
                class="w-12"
                :disabled="amountGuest === 1"
                @click="amountGuest--"
                >-</Button
              >
              <span class="font-semibold text-lg px-4">{{ amountGuest }}</span>
              <Button variant="outline" class="w-12" @click="amountGuest++"
                >+</Button
              >
            </div>
          </div>

          <!-- Số lượng người -->
          <div class="p-4 border rounded-2xl shadow-sm bg-white">
            <p class="font-medium mb-3">Chi phí dự kiến</p>
            <div class="flex items-center gap-3">
              <span class="font-semibold text-lg px-4">{{
                formatCurrency(totalPrice)
              }}</span>
            </div>
          </div>

          <!-- Button -->
          <Button class="w-full" size="lg" @click="confirmOrder">
            Đặt phòng ngay
          </Button>
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
import { formatCurrency } from "~/utils/string-helper";
import { toast } from "vue-sonner";

const route = useRoute();
const id = route.params.slug;
const config = useRuntimeConfig();
const minDate = nowDate();

const home = ref<Properties>({} as Properties);
const times = reactive({
  start_date: minDate,
  start_time: "",
  end_date: "",
  end_time: "",
});

const apiUrl = `${config.public.apiBase}/home/properties/${id}`;
const { data } = await useFetch<Response<Properties>>(apiUrl);

home.value = data.value?.data.items || ({} as Properties);

const amountGuest = ref<number>(home.value.guest);
const totalPrice = computed(() => {
  const { start_date, start_time, end_date, end_time } = times;
  if (!start_date || !start_time || !end_date || !end_time) return 0;
  const info = {
    start_date: `${start_date} ${start_time}`,
    end_date: `${end_date} ${end_time}`,
    base_hours: home.value.base_hours,
    extra_hour: home.value.extra_hour,
    per_day: home.value.per_day,
    per_night: home.value.per_night,
    per_month: home.value.per_month,
    guest: home.value.guest,
    actual_guest: amountGuest.value,
  };
  return calculateRoomPrice(info).total;
});

const confirmOrder = () => {
  const { start_date, start_time, end_date, end_time } = times;
  if (!start_date) {
    toast.warning("Đặt phòng", {
      description: "Vui lòng chọn ngày nhận phòng",
    });
    return;
  }
  if (!start_time) {
    toast.warning("Đặt phòng", {
      description: "Vui lòng chọn thời gian nhận phòng",
    });
    return;
  }
  if (!end_date) {
    toast.warning("Đặt phòng", { description: "Vui lòng chọn ngày trả phòng" });
    return;
  }
  if (!end_time) {
    toast.warning("Đặt phòng", {
      description: "Vui lòng chọn thời gian trả phòng",
    });
    return;
  }

  const orderDataa = {
    room_id: id,
    amount_guest: amountGuest.value,
    times,
    total: totalPrice.value,
  };
  sessionStorage.setItem("order", JSON.stringify(orderDataa));

  navigateTo("/xac-nhan");
};
</script>
