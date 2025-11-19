<template>
  <div>
    <section class="bg-[url('/google1.jpg')] h-160 bg-cover bg-center relative">
      <div
        class="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-60"
      ></div>
      <div class="absolute bottom-0 uppercase flex justify-center m-4 mb-12 w-full">
        <div class="text-gray-200 w-3/4">
          <h1 class="font-bold text-4xl mb-6 text-shadow-2xs ">Chào mứng đến với BookingNow</h1>
          <p class="text-lg font-semibold text-shadow-2xs mb-4">
            BookingNow là đơn vị chuyên cung cấp giải pháp đặt phòng thảnh thơi
            và dịch vụ tổ chức <br />
            sự kiện chuyên nghiệp - với phong cách phục vụ nhanh - nhiệt tình -
            chính xác.
          </p>

          <button class="text-3xl p-4 bg-primary rounded-full font-bold text-white">
            <FontAwesomeIcon :icon="['fas', 'phone']" class="mr-1"/>
            093 666 8888
          </button>
        </div>
      </div>
    </section>

    <section class="bg-primary cus-background">
      <div class="cus-container ">
        <div class="md:flex md:justify-center w-full mb-12">
          <SearchForm />
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
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

useSeoMeta({
  title: "Trang chủ",
  description:
    "Trang đặt phòng khách sạn, resort, homestay dễ sử dụng và tối ưu SEO.",
});
</script>
