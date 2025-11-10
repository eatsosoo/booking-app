<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h1 class="text-2xl font-bold text-center text-primary mb-6">
        Quên mật khẩu
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
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
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

        <div>
          <label for="confirm_password" class="block mb-1 text-gray-600">Xác nhận mật khẩu</label>
          <Input
            id="confirm_password"
            v-model="password"
            type="password"
            required
            placeholder="Nhập lại mật khẩu..."
          />
        </div>

        <Button
          type="submit"
          class="w-full"
        >
          Đổi mật khẩu
        </Button>
      </form>

      <p class="text-center text-gray-600 text-sm mt-6">
        <NuxtLink to="/login" class="text-primary hover:underline">
          Đăng nhập ngay
        </NuxtLink>
      </p>
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
  layout: false,
});

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
