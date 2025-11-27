<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { Post, Response } from "~/types";
import Label from "~/components/ui/label/Label.vue";
import { toast } from "vue-sonner";

const route = useRoute();
const config = useRuntimeConfig();
const id = route.params.id;

const message = ref<string>("");
const post = ref<Post>({} as Post);

const apiUrl = `${config.public.apiBase}/posts/${id}`;
const { data } = await useFetch<Response<Post>>(apiUrl);

watch(data, (val) => {
  if (val?.data.items) {
    post.value = val.data.items; // ✔ update sau khi fetch xong
  }
});

const { execute, pending, error } = useFetch<Response<Post>>(apiUrl, {
  method: "PUT",
  body: post.value,
  immediate: false,
});

const savePost = async () => {
  await execute();
  if (error.value) {
    message.value =
      error.value?.data.message || "Có lỗi xảy ra, vui lòng thử lại sau!";
    toast.error("Cập nhật bài viết", {
      description: message.value,
    });
  } else {
    toast.success("Cập nhật bài viết", {
      description: "Bài viết đã được cập nhật thành công!",
    });
  }
};

post.value = data.value?.data.items || ({} as Post);
</script>

<template>
  <section class="w-full px-6 py-10 max-w-7xl mx-auto mt-4">
    <h1 class="text-2xl font-semibold mb-8">Chi tiết & Chỉnh sửa bài viết</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Title -->
      <div>
        <Label for="title" class="mb-2 ml-1">Tiêu đề</Label>
        <Input id="title" v-model="post.title" placeholder="Nhập tiêu đề..." />
      </div>

      <!-- Slug -->
      <div>
        <Label for="slug" class="mb-2 ml-1">Slug</Label>
        <Input id="slug" v-model="post.slug" readonly />
      </div>

      <!-- Description -->
      <div>
        <Label for="description" class="mb-2 ml-1">Mô tả</Label>
        <Input
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

      <!-- Content -->
      <div class="col-span-1 md:col-span-2">
        <Label for="content" class="mb-2 ml-1">Nội dung bài viết</Label>
        <ClientOnly>
          <TinyEditor :model-value="post.content" />
        </ClientOnly>
      </div>
    </div>

    <!-- Save button -->
    <div class="mt-6">
      <Button variant="default" :loading="pending" @click="savePost"
        >Lưu thay đổi</Button
      >
    </div>
  </section>
</template>
