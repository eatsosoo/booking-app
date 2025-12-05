<template>
  <div class="overflow-x-hidden">
    <section class="bg-[url('/google1.jpg')] h-160 bg-cover bg-center relative">
      <div
        class="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-60"
      ></div>
      <div
        class="absolute bottom-0 uppercase flex justify-center m-4 mb-12 w-full"
      >
        <div class="text-gray-200 w-3/4">
          <h1 class="font-bold text-4xl mb-6 text-shadow-2xs">
            Chào mứng đến với BookingNow
          </h1>
          <p class="text-lg font-semibold text-shadow-2xs mb-4">
            BookingNow là đơn vị chuyên cung cấp giải pháp đặt phòng thảnh thơi
            và dịch vụ tổ chức <br />
            sự kiện chuyên nghiệp - với phong cách phục vụ nhanh - nhiệt tình -
            chính xác.
          </p>

          <button
            class="text-3xl p-4 bg-primary rounded-full font-bold text-white"
          >
            <ClientOnly>
              <FontAwesomeIcon :icon="['fas', 'phone']" class="mr-1" />
            </ClientOnly>
            093 666 8888
          </button>
        </div>
      </div>
    </section>

    <section class="bg-primary cus-background">
      <div class="cus-container">
        <div class="md:flex md:justify-center w-full mb-12">
          <SearchForm :groups="groupOptions" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:px-24">
          <div class="bg-white cus-shadow-1 p-8 rounded-tl-4xl rounded-br-4xl">
            <NuxtImg src="/svg/gt_dv_2.svg" class="h-24 mx-auto mb-6" />
            <h2 class="font-bold text-2xl mb-6 uppercase">LO TỪ A-Z</h2>
            <p>
              Đội ngũ Lala Team đồng hành hỗ trợ mọi vấn đề của khách hàng từ
              trước, trong và sau chuyến đi.
            </p>
          </div>
          <div class="bg-white cus-shadow-1 p-8 rounded-tl-4xl rounded-br-4xl">
            <NuxtImg src="/svg/gt_dv_1.svg" class="h-24 mx-auto mb-6" />
            <h2 class="font-bold text-2xl mb-6 uppercase">Chính xác</h2>
            <p>
              Tất cả các thông tin về dịch vụ đều được cung cấp một cách rõ ràng
              và minh bạch để khách hàng dễ dàng đưa ra lựa chọn phù hợp nhất.
            </p>
          </div>
          <div class="bg-white cus-shadow-1 p-8 rounded-tl-4xl rounded-br-4xl">
            <NuxtImg src="/svg/gt_dv_3.svg" class="h-24 mx-auto mb-6" />
            <h2 class="font-bold text-2xl mb-6 uppercase">Nhiệt tình</h2>
            <p>
              Luôn sẵn sàng giải đáp thắc mắc và hỗ trợ khách hàng xuyên suốt
              hành trình.
            </p>
          </div>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-20 lg:px-24 mt-20 text-white"
        >
          <div class="flex flex-col justify-around">
            <h2 class="text-3xl font-bold uppercase">Về chúng tôi</h2>
            <p class="text-justify py-4">
              Được thành lập từ năm 2024, BookingNow là thương hiệu du lịch uy
              tín, hướng đến việc mang lại cho khách hàng những trải nghiệm đặt
              phòng nhanh chóng, tiện lợi và hoàn toàn thảnh thơi. Chúng tôi
              không chỉ cung cấp hệ thống đặt phòng thông minh, đa dạng lựa chọn
              khách sạn – resort – homestay, mà còn mở rộng dịch vụ sang lĩnh
              vực tổ chức sự kiện với quy trình chuyên nghiệp, linh hoạt theo
              từng nhu cầu riêng biệt của khách hàng.
              <br />
              <br />
              BookingNow không ngừng đổi mới, cải thiện công nghệ và nâng cao
              chất lượng dịch vụ, với mục tiêu trở thành người bạn đồng hành tin
              cậy cho mọi chuyến du lịch, công tác hay sự kiện quan trọng của
              bạn.
            </p>
            <div>
              <Button variant="secondary">Đọc thêm</Button>
            </div>
          </div>
          <div class="flex justify-center md:justify-end">
            <div class="rounded-tl-4xl rounded-br-4xl p-2 bg-white">
              <NuxtImg
                src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
                class="rounded-tl-4xl rounded-br-4xl max-h-96"
              />
            </div>
          </div>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-3 md:gap-12 lg:mx-24 mt-20 bg-white p-8 rounded-xl"
        >
          <div class="flex flex-col justify-center">
            <NuxtImg
              src="https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg"
              class="rounded-tl-4xl rounded-br-4xl max-h-96"
            />
            <p
              class="mt-4 mx-4 font-semibold text-lg uppercase text-center text-blue-950"
            >
              Nghỉ dưỡng đẳng cấp tại Villa Vũng Tàu Tico 05 Sea Shell
            </p>
          </div>
          <div class="col-span-2 text-center">
            <h2 class="uppercase text-2xl font-bold mb-4 mt-4 text-blue-950">
              Giảm giá giờ chót <br />gói dịch vụ thuê Villa, Biệt thự
            </h2>
            <p class="text-justify">
              <span class="font-semibold"
                >Nghỉ dưỡng đẳng cấp bậc nhất Vũng Tàu</span
              >, phù hợp cho nhóm 10–15 người, tọa lạc tại vị trí
              <span class="font-semibold">view biển tuyệt đẹp</span> ngay trên
              trục đường Trần Phú nổi tiếng. Chỉ
              <span class="font-semibold">cách biển khoảng 200m</span>, du khách
              có thể dễ dàng di chuyển đến bãi tắm, ngắm bình minh, hoặc tận
              hưởng không khí biển trong lành bất cứ lúc nào. <br /><br />Không
              gian lưu trú được thiết kế sang trọng, đầy đủ tiện nghi, rất thích
              hợp cho gia đình, nhóm bạn hoặc team building nhỏ. Với số lượng
              căn hạn chế, chỗ ở luôn trong tình trạng được đặt nhanh —
              <span class="font-semibold">
                hãy liên hệ ngay để giữ phòng và trải nghiệm kỳ nghỉ hoàn hảo
                tại Vũng Tàu!</span
              >
            </p>
            <Button class="mt-8">Đặt ngay</Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Dự án hiện tại -->
    <section class="bg-secondary cus-container">
      <div
        v-for="(property, index) in PROPERTY_TYPES"
        :key="property.value"
        class="space-y-10 mb-12"
      >
        <h2 class="text-3xl font-semibold text-center">
          Tìm kiếm loại phòng {{ property.label }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:px-24">
          <!-- Project item -->
          <div
            v-for="(project, i) in ['Miền Bắc', 'Miền Trung', 'Miền Nam']"
            :key="i"
            class="relative bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col"
          >
            <!-- Image -->
            <NuxtImg
              :src="`/rooms/room-${(index + 1) * (i + 1)}.jpg`"
              class="h-58 w-full object-cover transition-transform duration-300 hover:scale-105 shadow-sm"
              :alt="`Tìm kiếm phong loại ${property.label} khu vực ${project}`"
            ></NuxtImg>

            <!-- Content -->
            <div class="text-center">
              <h3 class="mt-4 font-semibold italic">{{ project }}</h3>
              <NuxtLink
                  :to="`/du-an/tim-kiem?page=1&per_page=12&property_types=${property.value}`"
                >
                  <Button class="w-fit underline" variant="link">
                    Xem thêm
                  </Button>
                </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Button from "~/components/ui/button/Button.vue";
import { PROPERTY_TYPES } from "~/constants";
import type { Category, Region, Response } from "~/types";

useSeoMeta({
  title: "Trang chủ",
  description:
    "Trang đặt phòng khách sạn, resort, homestay dễ sử dụng và tối ưu SEO.",
});

const config = useRuntimeConfig();
// =========================
// FETCH API
// =========================
const apiUrl = computed(() => `${config.public.apiBase}/home`);

const { data: provinces } = await useFetch<Response<Region[]>>(
  `${apiUrl.value}/provinces`,
  {
    server: true,
    lazy: false,
    immediate: true,
  }
);


const result = provinces.value?.data.items ?? [];
const groupOptions: any = {};

result.forEach((element) => {
  if (groupOptions[`${element.region}`]) {
    groupOptions[`${element.region}`].push(element.name);
  } else {
    groupOptions[`${element.region}`] = [element.name];
  }
});
</script>
