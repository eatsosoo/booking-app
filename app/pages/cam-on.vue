<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
    <div
      class="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center animate-fadeIn"
    >
      <!-- Icon -->
      <div
        class="mx-auto mb-6 h-20 w-20 flex items-center justify-center rounded-full bg-green-100 text-green-600"
      >
        <CheckIcon :size="48" />
      </div>

      <!-- Title -->
      <h1 class="text-3xl font-bold text-gray-800 mb-3">
        Đặt phòng thành công!
      </h1>

      <!-- Description -->
      <p class="text-gray-600 leading-relaxed mb-6">
        Cảm ơn bạn đã tin tưởng sử dụng dịch vụ của <strong>DYHOME</strong>.<br />
        Chúng tôi đã gửi thông tin chi tiết về đơn đặt phòng của bạn vào email và
        sẽ liên hệ xác nhận trong thời gian sớm nhất.
      </p>

      <!-- Booking info -->
      <div class="bg-gray-100 text-gray-700 rounded-lg p-4 text-sm mb-6">
        <p>Mã đơn đặt phòng:</p>
        <p class="text-xl font-semibold text-primary">{{ bookingCode }}</p>
      </div>

      <!-- Button -->
      <NuxtLink
        to="/"
        class="block w-full"
      >
        <button
          class="w-full py-3 bg-primary hover:bg-primary/90 transition text-white font-semibold rounded-xl shadow"
        >
          Quay về trang chủ
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon } from "lucide-vue-next";

// Mã booking truyền qua query: /cam-on?code=ABC123
const route = useRoute();
const bookingCode = computed(() => route.query.code ?? "—");
</script>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
}
</style>
