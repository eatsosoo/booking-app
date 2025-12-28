<template>
  <div>
    <section class="p-4">
      <div
        class="flex items-center text-gray-600 space-x-2 py-4 w-7xl mx-auto px-8"
      >
        <MapPinHouse :size="18" class="mr-4" />
        <NuxtLink
          v-for="(item, index) in breadcrumb"
          :key="item.name"
          :to="item.url"
          class="hover:underline font-semibold text-lg flex items-center text-blue-950 cursor-pointer"
        >
          {{ item.name }}
          <ChevronRight
            v-if="index < breadcrumb.length - 1"
            :size="16"
            class="ml-4"
          />
        </NuxtLink>
      </div>

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
                <div v-if="Number(home.base_hours)">
                  <p class="font-medium">Thuê theo giờ</p>
                  <p class="text-sm text-gray-600">
                    2 giờ đầu
                    <span class="text-orange-600 font-semibold">{{
                      formatCurrency(home.base_hours)
                    }}</span>
                  </p>
                  <p class="text-sm text-gray-600">
                    1 giờ tiếp theo + {{ formatCurrency(home.extra_hour) }}
                  </p>
                </div>

                <div v-if="Number(home.per_night)">
                  <p class="font-medium">Nghỉ qua đêm (18:00 - 06:00)</p>
                  <p class="text-orange-600 font-semibold">
                    {{ formatCurrency(home.per_night) }}
                  </p>
                </div>

                <div v-if="Number(home.per_day)">
                  <p class="font-medium">Thuê theo ngày</p>
                  <p class="text-orange-600 font-semibold">
                    {{ formatCurrency(home.per_day) }}
                  </p>
                </div>
              </div>
              <!-- Phụ phí thêm người -->
              <div class="border-l px-2">
                <div v-if="Number(home.per_month)">
                  <p class="font-medium">Thuê theo tháng</p>
                  <p class="text-orange-600 font-semibold">
                    {{ formatCurrency(home.per_month) }}
                  </p>
                </div>
                <div v-if="Number(home.room)">
                  <p class="font-medium">Phụ phí</p>
                  <p class="font-semibold">
                    <span class="text-orange-600"
                      >+ {{ formatCurrency(home.room) }}</span
                    >
                    / người (tính từ người thứ {{ home.guest + 1 }})
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Dịch vụ -->
          <div class="p-4 border rounded-2xl shadow-sm bg-white mb-4">
            <h2 class="font-semibold text-lg mb-2">Dịch vụ</h2>
            <Separator class="mb-4" />
            <p v-if="home.services.length === 0" class="text-xs">
              Không có dịch vụ đi kèm
            </p>
            <p
              v-for="service in home.services"
              :key="service.id"
              class="italic text-xs"
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
                    :disabled="current > `${times.start_date} ${time}`"
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
                    :disabled="current > `${times.start_date} ${time}`"
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
                    :disabled="
                      `${times.end_date} ${time}` <
                      `${times.start_date} ${times.start_time}`
                    "
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
                    :disabled="
                      `${times.end_date} ${time}` <
                      `${times.start_date} ${times.start_time}`
                    "
                    :variant="time === times.end_time ? 'default' : 'outline'"
                    @click="times.end_time = time"
                  >
                    {{ time }}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <!-- Chọn kiểu thuê -->
          <div class="p-4 border rounded-2xl shadow-sm bg-white">
            <!-- <p class="font-medium mb-3">Thuê</p> -->
            <RadioGroup v-model="rentType">
              <div class="flex items-center space-x-2">
                <RadioGroupItem id="base_hours" value="base_hours" />
                <Label for="base_hours">Thuê theo giờ</Label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem id="per_night" value="per_night" />
                <Label for="per_night">Thuê qua đêm</Label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem id="per_day" value="per_day" />
                <Label for="per_day">Thuê theo ngày</Label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem
                  id="per_month"
                  value="per_month"
                  :disabled="!enableRadio"
                />
                <Label for="per_month">Thuê theo tháng</Label>
              </div>
            </RadioGroup>
          </div>

          <!-- Số lượng người -->
          <div class="p-4 border rounded-2xl shadow-sm bg-white">
            <p class="font-medium mb-2">Số lượng người</p>
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
            <p class="font-medium mb-2">Chi phí dự kiến</p>
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronRight, MapPinHouse } from "lucide-vue-next";

const route = useRoute();
const id = route.params.slug;
const config = useRuntimeConfig();
const minDate = nowDate();
const current = nowDateTime();

/* -----------------------
   STATE
------------------------- */
const rentType = ref<"base_hours" | "per_day" | "per_night" | "per_month">(
  "base_hours"
);
const home = ref<Properties>({} as Properties);
const times = reactive({
  start_date: minDate,
  start_time: "",
  end_date: "",
  end_time: "",
});

/* -----------------------
   FETCH API
------------------------- */
const apiUrl = `${config.public.apiBase}/home/properties/${id}`;
const { data } = await useFetch<Response<Properties>>(apiUrl);

home.value = data.value?.data.items || ({} as Properties);

/* -----------------------
   SEO META
------------------------- */
useSeoMeta({
  title: `${home.value.name} - DyHome`,
  description:
    home.value.content?.substring(0, 160) ||
    "Xem chi tiết và đặt phòng tại DyHome.",
  ogTitle: `${home.value.name} - DyHome`,
  ogDescription:
    home.value.content?.substring(0, 160) ||
    "Xem chi tiết và đặt phòng tại DyHome.",
  ogImage: home.value.thumbnail,
  ogUrl: `${config.public.siteUrl}/dia-diem/${id}`,
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: `${home.value.name} - DyHome`,
  twitterDescription:
    home.value.content?.substring(0, 160) ||
    "Xem chi tiết và đặt phòng tại DyHome.",
  twitterImage: home.value.thumbnail,
  keywords: `${home.value.name}, ${home.value.district}, ${home.value.province}, phòng cho thuê, ${home.value.property_types?.[0]?.name}`,
});

const amountGuest = ref<number>(home.value.guest);
const homeVal = home.value;
const typeName = homeVal.property_types?.[0];

const breadcrumb = [
  {
    name: typeName?.name,
    url: buildUrl({ property_types: typeName?.id }),
  },
  {
    name: homeVal.region,
    url: buildUrl({
      property_types: typeName?.id,
      region: homeVal.region,
    }),
  },
  {
    name: homeVal.province,
    url: buildUrl({
      property_types: typeName?.id,
      region: homeVal.region,
      province: homeVal.province,
    }),
  },
  {
    name: homeVal.district,
    url: buildUrl({
      property_types: typeName?.id,
      region: homeVal.region,
      province: homeVal.province,
      district: homeVal.district,
    }),
  },
  {
    name: homeVal.name,
    url: "",
  },
];

/* -----------------------
  COMPUTED
------------------------- */
const enableRadio = computed(() => {
  const { start_date, start_time, end_date, end_time } = times;
  if (!start_date || !start_time || !end_date || !end_time) return false;

  const start = createDateTime(start_date, start_time);
  const end = createDateTime(end_date, end_time);

  if (end <= start) return false;

  const days = (end.getTime() - start.getTime()) / 864e5; // 1000*60*60*24
  return days >= 30;
});

const totalPrice = computed(() => {
  const { start_date, start_time, end_date, end_time } = times;
  if (!start_date || !start_time || !end_date || !end_time) return 0;
  const info = {
    base_hours: Number(home.value.base_hours),
    extra_hour: Number(home.value.extra_hour),
    per_day: Number(home.value.per_day),
    per_night: Number(home.value.per_night),
    per_month: Number(home.value.per_month),
  };
  return calculateRoomPriceV2({
    start_date,
    start_time,
    end_date,
    end_time,
    rent_type: rentType.value,
    price: info,
  });
});

/* -----------------------
   METHODS
------------------------- */
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
