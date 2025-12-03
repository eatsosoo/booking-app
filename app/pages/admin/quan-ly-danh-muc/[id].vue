<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { Category } from "~/types";
import Label from "~/components/ui/label/Label.vue";
import Textarea from "~/components/ui/textarea/Textarea.vue";
import { toast } from "vue-sonner";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const route = useRoute();
const id = route.params.id;
const { request } = useApi();

/* -----------------------
   GET DATA
------------------------- */
const { data } = await useAsyncData(`project-${id}`, () =>
  request<Category>(`/categories/${id}`)
);
const category = ref<Category>(data.value?.data.items || ({} as Category));
const loading = ref<boolean>(false);

/* -----------------------
   UPDATE DATA
------------------------- */
const saveCategory = async () => {
  loading.value = true;

  try {
    await request<Category>(`/categories/${id}`, {
      method: "PUT",
      body: category.value,
    });

    toast.success("Cập nhật thành công!", {
      description: "Dự án đã được cập nhật.",
    });
    navigateTo("/admin/quan-ly-danh-muc");
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
      <Button variant="default" :loading="loading" @click="saveCategory">
        Lưu thay đổi
      </Button>
    </div>
  </section>
</template>
