<template>
  <footer class="bg-gray-900 text-gray-300 pt-12 pb-6">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8"
    >
      <!-- Cột 1: Giới thiệu -->
      <div>
        <NuxtLink to="/" class="flex items-center space-x-2 mb-4">
          <!-- <img src="/logo.png" alt="Logo" class="h-8 w-8 object-contain" /> -->
          <span class="text-xl font-semibold text-white">DYHOME</span>
        </NuxtLink>
        <p class="text-sm leading-relaxed">
          DYHOME giúp bạn dễ dàng đặt phòng khách sạn, vé du lịch, tour trọn
          gói, và nhiều dịch vụ khác trên toàn thế giới với giá tốt nhất.
        </p>
        <div class="flex space-x-4 mt-4">
          <NuxtLink
            :to="baseInfo.FACEBOOK"
            aria-label="Facebook"
            class="hover:text-blue-400 transition"
          >
            <Facebook size="20" />
          </NuxtLink>
          <NuxtLink
            :to="baseInfo.INSTAGRAM"
            aria-label="Instagram"
            class="hover:text-pink-400 transition"
          >
            <Instagram size="20" />
          </NuxtLink>
          <NuxtLink
            :to="baseInfo.YOUTUBE"
            aria-label="YouTube"
            class="hover:text-red-500 transition"
          >
            <Youtube size="20" />
          </NuxtLink>
          <NuxtLink
            :to="baseInfo.TWITTER"
            aria-label="Twitter"
            class="hover:text-gray-500 transition"
          >
            <Twitter size="20" />
          </NuxtLink>
        </div>
      </div>

      <!-- Cột 2: Liên kết nhanh -->
      <div>
        <h3 class="text-white font-semibold mb-4 text-lg">Liên kết nhanh</h3>
        <ul class="space-y-2 text-sm">
          <li>
            <NuxtLink to="/" class="hover:text-blue-400">Trang chủ</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/tim-kiem" class="hover:text-blue-400"
              >Phòng</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/dich-vu" class="hover:text-blue-400"
              >Dịch vụ</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/cam-nang" class="hover:text-blue-400"
              >Giới thiệu</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/gioi-thieu/tu-van-ho-tro" class="hover:text-blue-400"
              >Liên hệ</NuxtLink
            >
          </li>
        </ul>
      </div>

      <!-- Cột 3: Hỗ trợ khách hàng -->
      <div>
        <h3 class="text-white font-semibold mb-4 text-lg">Hỗ trợ khách hàng</h3>
        <ul class="space-y-2 text-sm">
          <li>
            <NuxtLink
              to="/gioi-thieu/cau-hoi-thuong-gap"
              class="hover:text-blue-400"
              >Câu hỏi thường gặp</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/gioi-thieu/cau-hoi-thuong-gap"
              class="hover:text-blue-400"
              >Chính sách & điều khoản</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/gioi-thieu/cau-hoi-thuong-gap"
              class="hover:text-blue-400"
              >Bảo mật thông tin</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/gioi-thieu/tu-van-ho-tro" class="hover:text-blue-400"
              >Trung tâm hỗ trợ</NuxtLink
            >
          </li>
        </ul>
      </div>

      <!-- Cột 4: Liên hệ -->
      <div>
        <h3 class="text-white font-semibold mb-4 text-lg">Liên hệ</h3>
        <ul class="space-y-3 text-sm">
          <li class="flex items-start space-x-2">
            <LocationEdit />
            <span>{{ baseInfo.ADDRESS }}</span>
          </li>
          <li class="flex items-center space-x-2 item">
            <Phone size="18" />
            <span
              >Hotline:
              <NuxtLink
                :to="`tel:+84${baseInfo.PHONE}`"
                class="hover:text-blue-400"
                >{{ baseInfo.PHONE }}</NuxtLink
              ></span
            >
          </li>
          <li class="flex items-center space-x-2">
            <Mail size="18" />
            <span
              >Email:
              <NuxtLink
                :to="`mailto:${baseInfo.EMAIL}`"
                class="hover:text-blue-400"
                >{{ baseInfo.EMAIL }}
              </NuxtLink></span
            >
          </li>
        </ul>
      </div>
    </div>

    <!-- Dòng bản quyền -->
    <div
      class="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500"
    >
      © {{ new Date().getFullYear() }} DYHOME. Tất cả các quyền được bảo lưu.
    </div>
  </footer>
</template>

<script setup>
import {
  Facebook,
  Instagram,
  LocationEdit,
  Mail,
  Phone,
  Twitter,
  Youtube,
} from "lucide-vue-next";

const { baseInfo } = useSystemSetting();
</script>
