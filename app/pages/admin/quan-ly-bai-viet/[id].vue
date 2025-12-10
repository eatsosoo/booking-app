<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import Label from "~/components/ui/label/Label.vue";
import type { Category, Option2, Post, Response } from "~/types";
import { toast } from "vue-sonner";
import { useApi } from "~/composables/useApi";
import EditorCustom from "~/components/common/EditorCustom.vue";
import UploadImage from "~/components/common/UploadImage.vue";
import { PROPERTY_TYPES } from "~/constants";
import MultiSelect from "~/components/common/MultiSelect.vue";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const route = useRoute();
const id = route.params.id as string;
const loading = ref<boolean>(false);
const post = ref<Post>({} as Post);
const { request } = useApi();

const categoryOptions = ref<Option2[]>([]);

const config = useRuntimeConfig();
const { data: categoriesData } = await useFetch<Response<Category[]>>(
  `${config.public.apiBase}/home/categories`
);

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

categoryOptions.value =
  categoriesData.value?.data.items.map((service) => ({
    label: service.name,
    value: service.id.toString(),
  })) || [];

post.value.category_id = categoryOptions.value[0]?.value;
post.value.property_types = post.value.property_types.map((item) => item.id)
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

      <!-- Loại hình -->
      <div>
        <Label for="property_types" class="mb-2 ml-1">Loại hình</Label>
        <CommonMultiSelect
          v-model="post.property_types"
          :options="PROPERTY_TYPES"
          placeholder="Chọn loại hình..."
          class="w-64"
        />
      </div>

      <!-- Loại -->
      <div>
        <Label for="type" class="mb-2 ml-1">Loại dự án</Label>
        <CommonSearchSelect
          :model-value="post.category_id"
          :frameworks="categoryOptions"
          @update:model-value="post.category_id = $event"
        />
      </div>

      <!-- Region -->
      <div>
        <Label for="answer" class="mb-2 ml-1">Khu vực</Label>
        <Select v-model="post.region">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Chọn khu vực..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel></SelectLabel>
              <SelectItem value="Miền Bắc"> Miền Bắc </SelectItem>
              <SelectItem value="Miền Trung"> Miền Trung </SelectItem>
              <SelectItem value="Miền Nam"> Miền Nam </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
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
