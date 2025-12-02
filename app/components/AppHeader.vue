<template>
  <header class="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center space-x-2">
        <!-- <img src="/logo.png" alt="Logo" class="h-8 w-8 object-contain" /> -->
        <span class="font-semibold text-xl text-gray-800">BookingNow</span>
      </NuxtLink>

      <!-- Menu desktop -->
      <div class="hidden md:flex space-x-8 text-gray-700 font-medium">
        <AppMenu />
      </div>

      <!-- Action buttons -->
      <div v-if="token" class="hidden md:flex items-center space-x-4">
          <Button variant="outline" @click="logout">
            Đăng xuất
          </Button>
      </div>

      <!-- Mobile menu button -->
      <button
        class="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100"
        @click="toggleMenu">
        <svg 
          v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg 
          v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- Mobile menu -->
    <transition name="fade">
      <div v-if="isOpen" class="md:hidden bg-white border-t border-gray-200">
        <div class="px-4 py-3 space-y-3 text-gray-700 font-medium">
          <template v-for="menu in menus" :key="menu.title">
            <NuxtLink :to="menu.link" class="block hover:bg-gray-200 hover:text-black px-4 py-2 hover:rounded-2xl m-0" @click="toggleMenu">{{
              menu.title }}</NuxtLink>
          </template>
          <!-- <AppMenu /> -->

          <!-- <div class="border-t border-gray-200 pt-3 space-y-2">
            <NuxtLink to="/login" class="mr-2">
              <Button>
                Đăng nhập
              </Button>
            </NuxtLink>
            <NuxtLink to="/register">
              <Button variant="secondary">
                Đăng ký
              </Button>
            </NuxtLink>
          </div> -->
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import Button from './ui/button/Button.vue'

const token = useCookie("token");
const isOpen = ref(false)
const toggleMenu = () => (isOpen.value = !isOpen.value)
const menus = [
  { title: 'Trang chủ', link: '/' },
  { title: 'Dịch vụ', link: '/dich-vu' },
  { title: 'Cẩm nang du lịch', link: '/cam-nang' },
  { title: 'Về chúng tôi', link: '/gioi-thieu/ve-chung-toi' },
  { title: 'Tư vấn hỗ trợ', link: '/gioi-thieu/tu-van-ho-tro' },
  { title: 'Câu hỏi thường gặp', link: '/gioi-thieu/cau-hoi-thuong-gap' },
]

const logout = () => {
  token.value = null;
  navigateTo('/');
}
</script>
