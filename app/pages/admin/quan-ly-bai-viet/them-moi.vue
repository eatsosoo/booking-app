<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { Post, Response } from "~/types";
import Label from "~/components/ui/label/Label.vue";
import { toast } from "vue-sonner";
import Textarea from "~/components/ui/textarea/Textarea.vue";
import { ImageIcon } from "lucide-vue-next";
import type { PostForm } from "~/types/booking";

definePageMeta({
  layout: "admin",
});

const config = useRuntimeConfig();

const imageInput = ref<HTMLInputElement | null>(null);
const message = ref<string>("");
const post = ref<PostForm>({
  title: "",
  slug: "",
  image: "",
  description: "",
  keywords: "",
  content: "Nội dung bài viết...",
});

const toastTitle = "Tải ảnh lên";
const apiUrl = `${config.public.apiBase}/posts`;

const { execute, pending, error } = useFetch<Response<Post>>(apiUrl, {
  method: "POST",
  body: post.value,
  immediate: false,
});

const savePost = async () => {
  await execute();

  const titleNotify = "Tạo bài viết mới";

  if (error.value) {
    message.value =
      error.value?.data.message || "Có lỗi xảy ra, vui lòng thử lại sau!";
    toast.error(titleNotify, {
      description: message.value,
    });
  } else {
    toast.success(titleNotify, {
      description: "Bài viết đã được tạo thành công!",
    });
    return navigateTo("/admin/quan-ly-bai-viet");
  }
};

const handleImageUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("media", file);

    const { data, error } = await useFetch<Response<string>>(
      `${config.public.apiBase}/home/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (error.value) {
      toast.error(toastTitle, {
        description:
          error.value?.data.message || "Có lỗi xảy ra khi tải ảnh lên!",
      });
      return;
    }

    post.value.image = data.value?.data.items ?? "";
    toast.success(toastTitle, {
      description: "Ảnh đã được tải lên thành công!",
    });
  } catch (error) {
    toast.error(toastTitle, {
      description: "Có lỗi xảy ra khi tải ảnh lên, vui lòng thử lại!",
    });
  } finally {
    target.value = "";
  }
};

const handleContentChange = (val: string) => {
  post.value.content = val;
};
</script>

<template>
  <section class="w-full px-6 py-10 max-w-7xl mx-auto mt-4">
    <h1 class="text-2xl font-semibold mb-8">Tạo bài viết mới</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Title -->
      <div>
        <Label for="title" class="mb-2 ml-1">Tiêu đề</Label>
        <Input
          id="title"
          v-model="post.title"
          placeholder="Nhập tiêu đề..."
          @change="post.slug = genSlug($event.target.value)"
        />
      </div>

      <!-- Slug -->
      <div>
        <Label for="slug" class="mb-2 ml-1">Slug</Label>
        <Input id="slug" v-model="post.slug" readonly />
      </div>

      <!-- Description -->
      <div>
        <Label for="description" class="mb-2 ml-1">Mô tả</Label>
        <Textarea
          id="description"
          v-model="post.description"
          placeholder="Nhập mô tả..."
        />
      </div>

      <!-- Keywords -->
      <div>
        <Label for="keywords" class="mb-2 ml-1">Từ khoá</Label>
        <Input
          id="keywords"
          v-model="post.keywords"
          placeholder="Nhập từ khoá..."
        />
      </div>

      <!-- Image -->
      <div>
        <Label for="image" class="mb-2 ml-1">Hình ảnh</Label>
        <input
          ref="imageInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleImageUpload"
        />

        <div class="p-2 rounded-md shadow-xs border border-dashed">
          <Button size="icon" variant="secondary" @click="imageInput?.click()">
            <ImageIcon class="w-4 h-4" />
          </Button>
          <span class="text-md ml-2">{{
            post.image ? "Thay đổi ảnh" : "Tải ảnh lên"
          }}</span>
          <NuxtImg
            v-if="post.image"
            :src="post.image"
            alt="Ảnh bài viết"
            class="w-72 h-48 mt-2"
          />
        </div>
      </div>

      <!-- Content -->
      <div class="col-span-1 md:col-span-2">
        <Label for="content" class="mb-2 ml-1">Nội dung bài viết</Label>
        <ClientOnly>
          <TinyEditor
            :model-value="post.content"
            @update:model-value="handleContentChange"
          />
        </ClientOnly>
      </div>
    </div>

    <!-- Save button -->
    <div class="mt-6">
      <Button variant="default" :loading="pending" @click="savePost"
        >Tạo mới</Button
      >
    </div>
  </section>
</template>
