<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import Label from "~/components/ui/label/Label.vue";
import type { Post } from "~/types";
import { toast } from "vue-sonner";
import { useApi } from "~/composables/useApi";
import EditorCustom from "~/components/common/EditorCustom.vue";
import UploadImage from "~/components/common/UploadImage.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const route = useRoute();
const id = route.params.id as string;
const loading = ref<boolean>(false);
const post = ref<Post>({} as Post);
const { request } = useApi();

/* -----------------------
   GET DATA (SSR friendly)
------------------------- */
const res = await request<Post>(`/posts/${id}`);
post.value = res.data.items;

/* -----------------------
   UPDATE
------------------------- */
const savePost = async () => {
  loading.value = true;
  try {
    await request(`/posts/${id}`, {
      method: "PUT",
      body: post.value,
    });

    toast.success("Cập nhật bài viết thành công!");
    navigateTo("/admin/quan-ly-bai-viet");
  } catch (err: any) {
    toast.error("Cập nhật thất bại", {
      description: err?.data?.message || "Vui lòng thử lại.",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section>
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

      <!-- Image -->
      <div class="sol-span-2">
        <Label for="image" class="mb ml-1">Thumbnail</Label>
        <UploadImage v-model="post.image" @uploaded="post.image = $event" />
      </div>

      <!-- Content -->
      <div class="col-span-1 md:col-span-2">
        <Label for="content" class="mb-2 ml-1">Nội dung bài viết</Label>
        <ClientOnly>
          <EditorCustom
            :model-value="post.content"
            @update:model-value="post.content = $event"
          />
        </ClientOnly>
      </div>
    </div>

    <!-- Save button -->
    <div class="mt-6">
      <Button variant="default" :loading="loading" @click="savePost"
        >Lưu thay đổi</Button
      >
    </div>
  </section>
</template>
