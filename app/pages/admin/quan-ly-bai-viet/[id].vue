<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import Label from "~/components/ui/label/Label.vue";
import type { Post } from "~/types";
import { toast } from "vue-sonner";
import { useApi } from "~/composables/useApi";
import EditorCustom from "~/components/common/editor/EditorCustom.vue";
import UploadImage from "~/components/common/UploadImage.vue";
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
import { genSlug } from "~/utils/string-helper";
import Textarea from "~/components/ui/textarea/Textarea.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const route = useRoute();
const id = route.params.id as string;
const loading = ref<boolean>(false);
const post = ref<Post>({} as Post);
const roomTypeSelect = ref<number>(1);

const { request } = useApi();
const { getProvinces, getDistricts } = useProvinces();

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
      body: {
        ...post.value,
        property_types: [roomTypeSelect.value],
      },
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

const provinceOptions = computed(() => {
  return getProvinces(roomTypeSelect.value, post.value.region);
});
const districtOptions = computed(() => {
  return getDistricts(
    roomTypeSelect.value,
    post.value.region,
    post.value.province
  );
});
roomTypeSelect.value = post.value.property_types[0]?.id as number;
</script>

<template>
  <section>
    <h1 class="text-2xl font-semibold mb-8">Chi tiết & Chỉnh sửa bài viết</h1>

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

      <!-- Loại hình -->
      <div>
        <Label for="property_types" class="mb-2 ml-1">Loại hình</Label>
        <Select v-model="roomTypeSelect">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Chọn loại hình..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel></SelectLabel>
              <SelectItem
                v-for="type in PROPERTY_TYPES"
                :key="type.value"
                :value="type.value"
              >
                {{ type.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <!-- Slug -->
      <div>
        <Label for="slug" class="mb-2 ml-1">Slug</Label>
        <Input id="slug" v-model="post.slug" disabled />
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

      <!-- Province -->
      <div>
        <Label for="answer" class="mb-2 ml-1">Địa danh</Label>
        <Select v-model="post.province">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Chọn địa danh..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel></SelectLabel>
              <SelectItem :value="null">Không thiết lập</SelectItem>
              <SelectItem
                v-for="province in provinceOptions"
                :key="province"
                :value="province"
              >
                {{ province }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div></div>

      <!-- District -->
      <div>
        <Label for="answer" class="mb-2 ml-1">Quận/Huyện</Label>
        <Select v-model="post.district">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Chọn quận/huyện..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel></SelectLabel>
              <SelectItem :value="null">Không thiết lập</SelectItem>
              <SelectItem
                v-for="district in districtOptions"
                :key="district"
                :value="district"
              >
                {{ district }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
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
      <div class="sol-span-2">
        <Label for="image" class="mb-2 ml-1">Thumbnail</Label>
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
