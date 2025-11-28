<template>
  <div>
    <section
      class="bg-[url('/banner1.jpg')] bg-center bg-cover h-96 opacity-85 relative flex justify-center"
    >
      <div
        class="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-50"
      ></div>
      <div
        class="absolute -bottom-4 bg-primary z-10 py-6 px-10 top rounded-tl-4xl rounded-br-4xl shadow-xl max-w-7xl w-full"
      >
        <h1 class="uppercase text-white text-2xl semibold">
          Các loại hình <span class="text-blue-900 font-bold">dịch vụ</span>
        </h1>
      </div>
    </section>

    <section class="w-full px-6 py-10 max-w-7xl mx-auto mt-4">
      <!-- Header -->
      <h1 class="text-4xl font-bold text-gray-900 uppercase">Danh sách</h1>
      <p class="text-gray-600 mt-1">
        Kết quả hiển thị cho <span class="font-semibold">{{ services.length }} dịch vụ</span>
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        <div
          v-for="service in services"
          :key="service.slug"
          class="border border-gray-200 shadow-md rounded-2xl p-4 flex flex-col justify-between"
        >
          <div>
            <div
            :style="{ backgroundImage: `url('${service.image}')` }"
            class="h-60 w-full rounded-lg mb-4 bg-cover bg-center"
          ></div>
          <h2 class="text-blue-950 font-bold text-lg leading-6 px-2">
            {{ service.title }}
          </h2>
          <h3 class="text-gray-400 font-semibold text-[14px] px-2">
            {{ service.description }}
          </h3>
          </div>
          <div class="flex justify-between items-center text-primary font-semibold text-md mx-2 border-t border-gray-200 mt-4 pt-2">
            <p class="">
              {{ formatCurrency(parseInt(service.price)) }}
            </p>
            <NuxtLink to="/dich-vu" class="hover:underline">Xem thêm</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Response, Service } from '~/types';

const config = useRuntimeConfig();
const apiUrl = computed(
  () =>
    `${config.public.apiBase}/services`
);

const { data } = await useFetch<Response<Service[]>>(apiUrl, {
  server: true,
  lazy: false,
  immediate: true,
});

const services = ref(data.value?.data.items || []);
</script>
