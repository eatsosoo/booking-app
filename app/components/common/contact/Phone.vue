<template>
  <!-- Thêm vào layout hoặc component -->
  <div class="fixed bottom-16 left-4 z-50">
    <!-- Container với hiệu ứng rung -->
    <div class="animate-[shake_2s_ease-in-out_infinite]">
      <!-- Phone button -->
      <a
        :href="`tel:${props.phone}`"
        class="relative flex items-center justify-center w-10 h-10 bg-amber-500 rounded-full shadow-2xl hover:bg-amber-600 transition-colors duration-300 group"
      >
        <!-- Icon nhấp nháy -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>

        <!-- Hiệu ứng sóng lan tỏa -->
        <div
          class="absolute inset-0 border-4 border-amber-400 rounded-full animate-ping opacity-75"
        ></div>
        <div
          class="absolute inset-0 border-4 border-amber-300 rounded-full animate-ping opacity-50"
          style="animation-delay: 0.2s"
        ></div>
        <div
          class="absolute inset-0 border-4 border-amber-200 rounded-full animate-ping opacity-25"
          style="animation-delay: 0.4s"
        ></div>

        <!-- Tooltip -->
        <div
          class="absolute left-[50px] bg-amber-400 bg-opacity-90 text-blue-950 text-sm px-3 pt-1 pb-2 rounded-lg animate-pulse w-32"
        >
          <p class="mt-1">
            <span class="font-bold">{{ formatTelNumber(props.phone) }}</span>
          </p>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatTelNumber } from "~/utils/string-helper";
interface Props {
  phone?: string;
  showNotification?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  phone: "0123456789",
  showNotification: false,
});
</script>

<style>
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}
</style>
