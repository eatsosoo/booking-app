<template>
  <div class="flex items-center justify-center px-4">
    <div class="max-w-md text-center">
      <h1 class="text-7xl font-bold text-red-500">403</h1>

      <h2 class="mt-4 text-2xl font-semibold text-gray-800">
        Không có quyền truy cập
      </h2>

      <p class="mt-2 text-gray-600">
        Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị
        viên nếu bạn nghĩ đây là lỗi.
      </p>

      <div class="mt-6 flex justify-center gap-3">
        <Button variant="default" @click="navigateTo('/admin')">
          Dashboard
        </Button>
        <Button variant="outline" @click="goBack"> Quay lại </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";

definePageMeta({
  layout: "admin",
});
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>
