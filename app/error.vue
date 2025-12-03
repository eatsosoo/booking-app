<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
      ></div>
    </div>

    <div class="relative max-w-lg w-full text-center space-y-8 z-10">
      <!-- 404 with Animation -->
      <div class="relative">
        <div
          class="text-[200px] font-bold text-gray-200 leading-none opacity-50"
        >
          {{ props.error?.statusCode || 500 }}
        </div>
        <div
          class="absolute inset-0 flex flex-col items-center justify-center space-y-2"
        >
          <div class="text-6xl font-bold text-gray-800 animate-bounce">
            Oops!
          </div>
          <div class="text-2xl font-semibold text-gray-700">Page Not Found</div>
        </div>
      </div>

      <!-- Error Message -->
      <div
        class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl space-y-4 transform transition-all duration-300 hover:shadow-2xl"
      >
        <div class="flex items-center justify-center space-x-2">
          <svg
            class="w-8 h-8 text-red-500 animate-pulse"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="text-lg text-gray-700">
            {{ errorMessage }}
          </p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink
          to="/"
          class="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-linear-to-r from-red-600 to-yellow-600 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <span
            class="absolute inset-0 bg-linear-to-r from-yellow-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></span>
          <span class="relative flex items-center">
            <svg
              class="w-5 h-5 mr-2 group-hover:animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Trang chủ
          </span>
        </NuxtLink>

        <button
          class="cursor-pointer inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105"
          @click="goBack"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Trở lại
        </button>
      </div>

      <!-- Help Section -->
      <div class="pt-8">
        <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Bạn cần giúp đỡ?</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/gioi-thieu/tu-van-ho-tro"
              class="group p-4 text-center rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors"
            >
              <div
                class="text-blue-600 group-hover:scale-110 transition-transform"
              >
                <svg
                  class="w-8 h-8 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span class="font-medium text-gray-700">Liên hệ</span>
            </a>

            <a
              href="/gioi-thieu/tu-van-ho-tro"
              class="group p-4 text-center rounded-lg bg-gray-50 hover:bg-green-50 transition-colors"
            >
              <div
                class="text-green-600 group-hover:scale-110 transition-transform"
              >
                <svg
                  class="w-8 h-8 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span class="font-medium text-gray-700">Hỗ trợ</span>
            </a>

            <a
              href="/gioi-thieu/cau-hoi-thuong-gap"
              class="group p-4 text-center rounded-lg bg-gray-50 hover:bg-purple-50 transition-colors"
            >
              <div
                class="text-purple-600 group-hover:scale-110 transition-transform"
              >
                <svg
                  class="w-8 h-8 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span class="font-medium text-gray-700">FAQ</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    navigateTo("/");
  }
};

const CODES: Record<number | string, string> = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Page Not Found",
  405: "Method Not Allowed",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  default: "An unexpected error occurred.",
}

const errorCode = props.error?.statusCode?.toString() || 'default'
const errorMessage = CODES[errorCode] || CODES.default

// Set page metadata
useHead({
  title: `${errorCode === 'default' ? 'Error' : errorCode} - ${errorMessage} | Booking Now`,
  meta: [
    {
      name: "description",
      content:
        "The page you're looking for cannot be found. Please check the URL or return to the homepage.",
    },
    { name: "robots", content: "noindex, nofollow" },
  ],
  bodyAttrs: {
    class: "overflow-hidden",
  },
});
</script>

<style>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
