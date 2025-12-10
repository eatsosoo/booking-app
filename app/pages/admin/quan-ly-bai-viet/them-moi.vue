<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { Category, Option3, Post, Response } from "~/types";
import Label from "~/components/ui/label/Label.vue";
import { toast } from "vue-sonner";
import Textarea from "~/components/ui/textarea/Textarea.vue";
import type { PostForm } from "~/types/booking";
import { genSlug } from "~/utils/string-helper";
import UploadImage from "~/components/common/UploadImage.vue";
import EditorCustom from "~/components/common/EditorCustom.vue";
import { PROPERTY_TYPES } from "~/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchSelect from "~/components/common/SearchSelect.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const post = ref<PostForm>({
  title: "",
  slug: "",
  image: "",
  description: "",
  keywords: "",
  property_types: [],
  category_id: null,
  region: "Miền bắc",
  content: "Nội dung bài viết...",
});
const categoryOptions = ref<Option3[]>([]);

const config = useRuntimeConfig();
const { request } = useApi();
const { data: categoriesData } = await useFetch<Response<Category[]>>(
  `${config.public.apiBase}/home/categories`
);

const savePost = async () => {
  const titleNotify = "Tạo bài viết mới";

  try {
    // POST bài viết mới
    await request<Response<Post>>("/posts", {
      method: "POST",
      body: post.value,
    });

    toast.success(titleNotify, {
      description: "Bài viết đã được tạo thành công!",
    });

    // Redirect về trang quản lý bài viết
    // return navigateTo("/admin/quan-ly-bai-viet");
  } catch (err: any) {
    const msg = err?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau!";
    toast.error(titleNotify, { description: msg });
  }
};

const handleContentChange = (val: string) => {
  post.value.content = val;
};

categoryOptions.value =
  categoriesData.value?.data.items.map((service) => ({
    label: service.name,
    value: service.id,
  })) || [];
</script>

<template>
  <section>
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
        <SearchSelect
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

      <!-- Keywords -->
      <div>
        <Label for="keywords" class="mb-2 ml-1">Từ khoá</Label>
        <Input
          id="keywords"
          v-model="post.keywords"
          placeholder="Nhập từ khoá..."
        />
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

      <!-- Image -->
      <div>
        <Label for="image" class="mb-2 ml-1">Hình ảnh</Label>
        <UploadImage :url="post.image" @uploaded="post.image = $event" />
      </div>

      <!-- Content -->
      <div class="col-span-1 md:col-span-2">
        <Label for="content" class="mb-2 ml-1">Nội dung bài viết</Label>
        <ClientOnly>
          <EditorCustom
            :model-value="post.content"
            @update:model-value="handleContentChange"
          />
        </ClientOnly>
      </div>
    </div>

    <!-- Save button -->
    <div class="mt-6">
      <Button variant="default" @click="savePost">Tạo mới</Button>
    </div>
  </section>
</template>
