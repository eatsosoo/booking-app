<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h1 class="text-2xl font-semibold text-center text-primary mb-6">
        DYHOME
      </h1>

      <form class="space-y-5" @submit.prevent="handleLogin">
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
          <label for="password" class="block mb-1 text-gray-600"
            >Mật khẩu</label
          >
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
        </div>

        <Button type="submit" :loading="loading" class="w-full">
          Đăng nhập
        </Button>
      </form>
    </div>

    <ClientOnly>
      <Toaster />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";
import Button from "~/components/ui/button/Button.vue";
import Checkbox from "~/components/ui/checkbox/Checkbox.vue";
import Input from "~/components/ui/input/Input.vue";
import { Toaster } from "~/components/ui/sonner";
import "vue-sonner/style.css";

useSeoMeta({
  title: "Đăng nhập",
  description: "Trang đăng nhập hệ thống DyHome, tối ưu SEO và bảo mật.",
});

definePageMeta({
  layout: false,
  middleware: [],
});

const { login } = useAuth();

const email = ref("");
const password = ref("");
const remember = ref(false);
const loading = ref(false);

const handleLogin = async () => {
  if (!email.value || !password.value) {
    toast.error("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  loading.value = true;

  try {
    const result = await login(email.value, password.value);

    if (result.statusCode !== 200) {
      toast.error("Đăng nhập thất bại *", {
        description:
          result.message || "Sai email hoặc mật khẩu, vui lòng kiểm tra lại.",
      });
      return;
    }

    if (result.data.items.token) {
      const token = useCookie("token");
      const role = useCookie("role");
      token.value = result.data.items.token;
      role.value = result.data.items.user_id;
    }

    toast.success("Đăng nhập thành công!");

    return navigateTo("/admin");
  } catch (e) {
    toast.error("Đăng nhập thất bại **", {
      description: "Có lỗi xảy ra, vui lòng thử lại!",
    });
  } finally {
    loading.value = false;
  }
};
</script>
