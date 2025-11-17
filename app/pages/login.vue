<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h1 class="text-2xl font-bold text-center text-primary mb-6">
        Đăng nhập
      </h1>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label for="email" class="block mb-1 text-gray-600">Email</label>
          <Input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="Nhập email..."
          />
        </div>

        <div>
          <label for="password" class="block mb-1 text-gray-600">Mật khẩu</label>
          <Input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Nhập mật khẩu..."
          />
        </div>

        <div class="flex justify-between items-center">
          <label class="flex items-center space-x-2">
            <Checkbox v-model="remember" />
            <span>Ghi nhớ đăng nhập</span>
          </label>

          <NuxtLink
            to="/forgot-password"
            class="text-primary hover:underline text-sm"
          >
            Quên mật khẩu?
          </NuxtLink>
        </div>

        <Button
          type="submit"
          class="w-full"
        >
          Đăng nhập
        </Button>
      </form>

      <!-- <p class="text-center text-gray-600 text-sm mt-6">
        Chưa có tài khoản?
        <NuxtLink to="/register" class="text-primary hover:underline">
          Đăng ký ngay
        </NuxtLink>
      </p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue';
import Checkbox from '~/components/ui/checkbox/Checkbox.vue';
import Input from '~/components/ui/input/Input.vue';

useSeoMeta({
  title: 'Đăng nhập',
  description: 'Trang đăng nhập hệ thống Booking App, tối ưu SEO và bảo mật.',
});

definePageMeta({
  layout: false
})

const email = ref('');
const password = ref('');
const remember = ref(false);

const handleLogin = () => {
  if (!email.value || !password.value) {
    alert('Vui lòng nhập đầy đủ thông tin');
    return;
  }

  // Sau này sẽ thay bằng gọi API login
  console.log('Email:', email.value);
  console.log('Password:', password.value);
  console.log('Remember:', remember.value);
  alert('Đăng nhập thành công (demo)');
};
</script>
