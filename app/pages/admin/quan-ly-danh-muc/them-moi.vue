<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { Faq, Response } from "~/types";
import Label from "~/components/ui/label/Label.vue";
import Textarea from "~/components/ui/textarea/Textarea.vue";
import { toast } from "vue-sonner";
import type { CategoryForm } from "~/types/booking";

definePageMeta({
    layout: 'admin'
})

const router = useRouter();
const config = useRuntimeConfig();

const apiCreate = `${config.public.apiBase}/categories`;

// form
const formData = reactive<CategoryForm>({
  name: "",
  image: "",
  description: "",
});

const pending = ref(false);

const saveCategory = async () => {
  pending.value = true;

  try {
    await $fetch(apiCreate, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.success("Tạo FAQ thành công!", {
      description: "FAQ mới đã được thêm.",
    });

    // chuyển về danh sách
    router.push("/admin/quan-ly-danh-muc");
  } catch (err: any) {
    toast.error("Lỗi!", {
      description:
        err?.data?.message ||
        err?.message ||
        "Có lỗi xảy ra, vui lòng thử lại!",
    });
  } finally {
    pending.value = false;
  }
};
</script>

<template>
  <section>
    <h1 class="text-2xl font-semibold mb-8">Tạo dự án mới</h1>

    <div class="grid grid-cols-1 gap-6">
      <!-- name -->
      <div>
        <Label for="name" class="mb-2 ml-1">Tên dự án</Label>
        <Input
          id="name"
          v-model="formData.name"
          placeholder="Nhập tên dự án..."
        />
      </div>

      <!-- description -->
      <div>
        <Label for="description" class="mb-2 ml-1">Mô tả</Label>
        <Textarea
          id="description"
          v-model="formData.description"
          placeholder="Nhập mô tả dự án..."
        />
      </div>

      <!-- Image -->
      <div>
        <Label for="image" class="mb-2 ml-1">Ảnh dự án</Label>
        <UploadImage
          :url="formData.image"
          @uploaded="formData.image = $event"
        />
      </div>
    </div>

    <div class="mt-6">
      <Button variant="default" :loading="pending" @click="saveCategory">
        Tạo mới
      </Button>
    </div>
  </section>
</template>
