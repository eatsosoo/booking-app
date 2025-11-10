<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h1 class="text-2xl font-bold text-center text-primary mb-6">
        Đăng nhập
      </h1>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label for="email" class="block mb-1 text-gray-600">Email</label>
          <input
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
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Nhập mật khẩu..."
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div class="flex justify-between items-center">
          <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="remember" />
            <span>Ghi nhớ đăng nhập</span>
          </label>

          <NuxtLink
            to="/forgot-password"
            class="text-primary hover:underline text-sm"
          >
            Quên mật khẩu?
          </NuxtLink>
        </div>

        <button
          type="submit"
          class="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Đăng nhập
        </button>
      </form>

      <p class="text-center text-gray-600 text-sm mt-6">
        Chưa có tài khoản?
        <NuxtLink to="/register" class="text-primary hover:underline">
          Đăng ký ngay
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
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

useSeoMeta({
  title: 'Đăng nhập',
  description: 'Trang đăng nhập hệ thống Booking App, tối ưu SEO và bảo mật.',
});
</script>
