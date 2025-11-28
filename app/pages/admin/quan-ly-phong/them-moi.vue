<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { Option, Post, Response, Service } from "~/types";
import Label from "~/components/ui/label/Label.vue";
import { toast } from "vue-sonner";
import Textarea from "~/components/ui/textarea/Textarea.vue";
import { ImageIcon } from "lucide-vue-next";
import type { PropertiesForm } from "~/types/booking";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROPERTY_TYPES, TYPE_ROOM } from "~/constants";

definePageMeta({
    layout: 'admin'
})

const config = useRuntimeConfig();

const serviceOptions = ref<Option[]>([]);
const imageInput = ref<HTMLInputElement | null>(null);
const post = ref<PropertiesForm>({
  name: "",
  description: "",
  address: "",
  type: "",
  area: 50,
  guest: 1,
  bedrooms: 1,
  bathrooms: 1,
  bed: 1,
  base_hours: 50000,
  extra_hour: 50000,
  per_day: 50000,
  per_night: 50000,
  content: "<p>Nội dung giới thiệu...</p>",
  thumbnail: "",
  gallery: [],
  services: [],
  property_types: []
});

const toastTitle = "Tải ảnh lên";
const apiUrl = `${config.public.apiBase}/properties`;
const { data: servicesData } = await useFetch<Response<Service[]>>("/api/services")

const { execute, pending } = useFetch<Response<Post>>(apiUrl, {
  method: "POST",
  body: post.value,
  immediate: false,
});

const savePost = async () => {
  const title = "Tạo phòng mới";

  try {
    await execute(); // nếu useFetch gọi API fail → throw error

    toast.success(title, {
      description: "Phòng mới đã được tạo thành công!",
    });

    return navigateTo("/admin/quan-ly-bai-viet");
  } catch (err: any) {
    const msg =
      err?.data?.message ||
      err?.message ||
      "Có lỗi xảy ra, vui lòng thử lại sau!";

    toast.error(title, { description: msg });
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

    post.value.thumbnail = data.value?.data.items ?? "";
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

serviceOptions.value = servicesData.value?.data.items.map((service) => ({
  label: service.title,
  value: service.id,
})) || [];
</script>

<template>
  <section>
    <h1 class="text-2xl font-semibold mb-8">Tạo phòng mới</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Title -->
      <div>
        <Label for="title" class="mb-2 ml-1">Tiêu đề</Label>
        <Input id="title" v-model="post.name" placeholder="Nhập tiêu đề..." />
      </div>

      <!-- Address -->
      <div>
        <Label for="address" class="mb-2 ml-1">Địa chỉ</Label>
        <Input
          id="address"
          v-model="post.address"
          placeholder="Nhập địa chỉ..."
        />
      </div>

      <!-- Loại -->
      <div>
        <Label for="type" class="mb-2 ml-1">Hạng mục</Label>
        <Select v-model="post.type">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Chọn hàng mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Lựa chọn</SelectLabel>
              <SelectItem
                v-for="(label, key) in TYPE_ROOM"
                :key="key"
                :value="key"
              >
                {{ label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <!-- Area -->
      <div>
        <Label for="area"  class="mb-2 ml-1">Diện tích</Label>
        <Input
          id="area"
          v-model="post.area"
          type="number"
          placeholder="Nhập diện tích..."
        />
      </div>

      <!-- Bathrooms -->
      <div>
        <Label for="bathrooms"  class="mb-2 ml-1">Số phòng tắm</Label>
        <Input
          id="bathrooms"
          v-model="post.bathrooms"
          type="number"
          placeholder="Nhập số phòng..."
        />
      </div>

      <!-- bedrooms -->
      <div>
        <Label for="bedrooms"  class="mb-2 ml-1">Số phòng ngủ</Label>
        <Input
          id="bedrooms"
          v-model="post.bedrooms"
          type="number"
          placeholder="Nhập số phòng..."
        />
      </div>

      <!-- bed -->
      <div>
        <Label for="bed"  class="mb-2 ml-1">Số giường ngủ</Label>
        <Input
          id="bed"
          v-model="post.bed"
          type="number"
          placeholder="Nhập số giường..."
        />
      </div>

      <!-- guest -->
      <div>
        <Label for="guest"  class="mb-2 ml-1">Sức chứa (khách)</Label>
        <Input
          id="guest"
          v-model="post.guest"
          type="number"
          placeholder="Nhập số lượng khách..."
        />
      </div>

      <!-- Base hours -->
      <div>
        <Label for="base_hours"  class="mb-2 ml-1">Phí giờ đầu (VND)</Label>
        <Input
          id="base_hours"
          v-model="post.base_hours"
          type="number"
          placeholder="Nhập số tiền..."
        />
      </div>

      <!-- Extra hours -->
      <div>
        <Label for="extra_hour"  class="mb-2 ml-1">Phí giờ tiếp theo (VND)</Label>
        <Input
          id="extra_hour"
          v-model="post.extra_hour"
          type="number"
          placeholder="Nhập số tiền..."
        />
      </div>

      <!-- Per day -->
      <div>
        <Label for="per_day"  class="mb-2 ml-1">Thuê trong ngày (VND)</Label>
        <Input
          id="per_day"
          v-model="post.per_day"
          type="number"
          placeholder="Nhập số tiền..."
        />
      </div>

      <!-- Per day -->
      <div>
        <Label for="per_night"  class="mb-2 ml-1">Thuê qua đêm (VND)</Label>
        <Input
          id="per_night"
          v-model="post.per_night"
          type="number"
          placeholder="Nhập số tiền..."
        />
      </div>

      <!-- Hạng mục -->
      <div>
        <Label for="property_types" class="mb-2 ml-1">Hạng mục</Label>
        <MultiSelect
          v-model="post.property_types"
          :options="PROPERTY_TYPES"
          placeholder="Chọn hạng mục..."
          class="w-64"
        />
      </div>

      <!-- Dịch vụ đi kèm -->
      <div>
        <Label for="property_types" class="mb-2 ml-1">Dịch vụ đi kèm</Label>
        <MultiSelect
          v-model="post.services"
          :options="serviceOptions"
          placeholder="Chọn dịch vụ..."
          class="w-64"
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
        <Label for="thumbnail" class="mb-2 ml-1">Hình ảnh (thumbnail)</Label>
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
            post.thumbnail ? "Thay đổi ảnh" : "Tải ảnh lên"
          }}</span>
          <NuxtImg
            v-if="post.thumbnail"
            :src="post.thumbnail"
            alt="Ảnh bài viết"
            class="w-72 h-48 mt-2"
          />
        </div>
      </div>

      <!-- Content -->
      <div class="col-span-1 md:col-span-2">
        <Label for="content" class="mb-2 ml-1">Nội dung giới thiệu</Label>
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
