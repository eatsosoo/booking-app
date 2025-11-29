<script setup lang="ts">
import { ref, watch } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { Category, Response } from "~/types";
import Label from "~/components/ui/label/Label.vue";
import Textarea from "~/components/ui/textarea/Textarea.vue";
import { toast } from "vue-sonner";

definePageMeta({
  layout: "admin",
});

const route = useRoute();
const config = useRuntimeConfig();
const id = route.params.id;

const apiUrl = `${config.public.apiBase}/categories/${id}`;

// GET → lấy dữ liệu FAQ
const { data } = useFetch<Response<Category>>(apiUrl);

const category = ref<Category>({} as Category);
const loading = ref(false);

// Khi GET thành công, gán vào form
watch(data, (val) => {
  if (val?.data) {
    category.value = val.data.items;
  }
});

// Hàm lưu
const savecategory = async () => {
  loading.value = true;

  try {
    await $fetch(apiUrl, {
      method: "PUT",
      body: category,
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.success("Cập nhật thành công!", {
      description: "Dự án đã được cập nhật.",
    });
  } catch (err: any) {
    toast.error("Lỗi!", {
      description:
        err?.data?.message ||
        err?.message ||
        "Có lỗi xảy ra, vui lòng thử lại!",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section>
    <h1 class="text-2xl font-semibold mb-8">Chi tiết & Chỉnh sửa dự án</h1>

    <div class="grid grid-cols-1 gap-6">
      <!-- Question -->
      <div>
        <Label for="title" class="mb-2 ml-1">Tên dự án</Label>
        <Input id="title" v-model="category.name" placeholder="Nhập tên..." />
      </div>

      <!-- description -->
      <div>
        <Label for="description" class="mb-2 ml-1">Mô tả dự án</Label>
        <Textarea
          id="description"
          v-model="category.description"
          placeholder="Nhập câu mô tả..."
        />
      </div>

      <!-- Image -->
      <div>
        <Label for="image" class="mb-2 ml-1">Ảnh dự án</Label>
        <UploadImage
          :url="category.image"
          @uploaded="category.image = $event"
        />
      </div>
    </div>

    <!-- Save button -->
    <div class="mt-6">
      <Button variant="default" :loading="loading" @click="savecategory"> Lưu thay đổi </Button>
    </div>
  </section>
</template>
