<template>
  <!-- Zalo Component -->
  <div class="fixed bottom-4 left-4 z-50">
    <!-- Container với hiệu ứng phóng to thu nhỏ -->
    <div class="animate-[pulseScale_2s_ease-in-out_infinite]">
      <!-- Zalo button -->
      <a
        :href="`https://zalo.me/${props.phone}`"
        target="_blank"
        rel="noopener noreferrer"
        class="relative flex items-center justify-center w-10 h-9 bg-white rounded-lg shadow-2xl hover:shadow-[#0068FF]/40 transition-all duration-300 group hover:scale-110"
      >
        <!-- Zalo Icon - Bạn có thể thay thế SVG của bạn ở đây -->
        <img src="/brand/zalo.png" alt="contact-zalo-icon" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
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
@keyframes pulseScale {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Hiệu ứng phóng to thu nhỏ mượt mà hơn */
@keyframes gentleScale {
  0% {
    transform: scale(1);
    box-shadow: 0 10px 25px rgba(0, 104, 255, 0.2);
  }
  50% {
    transform: scale(1.08);
    box-shadow: 0 15px 35px rgba(0, 104, 255, 0.3);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 10px 25px rgba(0, 104, 255, 0.2);
  }
}

/* Hoặc hiệu ứng bounce nhẹ */
@keyframes gentleBounce {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  30% {
    transform: translateY(-5px) scale(1.05);
  }
  60% {
    transform: translateY(0) scale(1);
  }
}

/* Hiệu ứng sóng xoay tròn */
@keyframes rotateWave {
  0% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(90deg) scale(1.05);
  }
  50% {
    transform: rotate(180deg) scale(1.1);
  }
  75% {
    transform: rotate(270deg) scale(1.05);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

/* Áp dụng animation tùy chọn */
.animate-pulse-scale {
  animation: pulseScale 2s ease-in-out infinite;
}

.animate-gentle-scale {
  animation: gentleScale 3s ease-in-out infinite;
}

.animate-gentle-bounce {
  animation: gentleBounce 4s ease-in-out infinite;
}
</style>
