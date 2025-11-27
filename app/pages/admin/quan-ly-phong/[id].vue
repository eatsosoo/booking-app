<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { Properties, Response } from "~/types";
import Label from "~/components/ui/label/Label.vue";
import { toast } from "vue-sonner";
import { TYPE_ROOM } from "~/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageIcon } from "lucide-vue-next";
import Textarea from "~/components/ui/textarea/Textarea.vue";

definePageMeta({
    layout: 'admin'
})

const route = useRoute();
const config = useRuntimeConfig();
const id = route.params.id;

const message = ref<string>("");
const home = ref<Properties>({} as Properties);
const imageInput = ref<HTMLInputElement | null>(null);

const toastTitle = "Tải ảnh lên";
const apiUrl = `${config.public.apiBase}/properties/${id}`;
const { data } = await useFetch<Response<Properties>>(apiUrl);

const saveProperties = async () => {
  const { error } = useFetch<Response<Properties>>(apiUrl, {
    method: "PUT",
    body: home.value,
  });

  if (error.value) {
    message.value =
      error.value?.data.message || "Có lỗi xảy ra, vui lòng thử lại sau!";
    toast.error("Cập nhật điểm đến", {
      description: message.value,
    });
  } else {
    toast.success("Cập nhật điểm đến", {
      description: "Bài viết đã được cập nhật thành công!",
    });
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

    home.value.thumbnail = data.value?.data.items ?? "";
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

home.value = data.value?.data.items || ({} as Properties);
if (typeof home.value.gallery === "string") {
  home.value.gallery = JSON.parse(home.value.gallery as unknown as string);
}
</script>

<template>
  <section>
    <h1 class="text-2xl font-semibold mb-8">Chi tiết & Chỉnh sửa điểm đến</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Title -->
      <div>
        <Label for="title" class="mb-2 ml-1">Tiêu đề</Label>
        <Input id="title" v-model="home.name" placeholder="Nhập tiêu đề..." />
      </div>

      <!-- Address -->
      <div>
        <Label for="address" class="mb-2 ml-1">Địa chỉ</Label>
        <Input
          id="address"
          v-model="home.address"
          placeholder="Nhập địa chỉ..."
        />
      </div>

      <!-- Loại -->
      <div>
        <Label for="type" class="mb-2 ml-1">Hạng mục</Label>
        <Select v-model="home.type">
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
        <Label for="area" class="mb-2 ml-1">Diện tích</Label>
        <Input
          id="area"
          v-model="home.area"
          type="number"
          placeholder="Nhập diện tích..."
        />
      </div>

      <!-- Bathrooms -->
      <div>
        <Label for="bathrooms" class="mb-2 ml-1">Số phòng tắm</Label>
        <Input
          id="bathrooms"
          v-model="home.bathrooms"
          type="number"
          placeholder="Nhập số phòng..."
        />
      </div>

      <!-- bedrooms -->
      <div>
        <Label for="bedrooms" class="mb-2 ml-1">Số phòng ngủ</Label>
        <Input
          id="bedrooms"
          v-model="home.bedrooms"
          type="number"
          placeholder="Nhập số phòng..."
        />
      </div>

      <!-- bed -->
      <div>
        <Label for="bed" class="mb-2 ml-1">Số giường ngủ</Label>
        <Input
          id="bed"
          v-model="home.bed"
          type="number"
          placeholder="Nhập số giường..."
        />
      </div>

      <!-- guest -->
      <div>
        <Label for="guest" class="mb-2 ml-1">Sức chứa (khách)</Label>
        <Input
          id="guest"
          v-model="home.guest"
          type="number"
          placeholder="Nhập số lượng khách..."
        />
      </div>

      <!-- Base hours -->
      <div>
        <Label for="base_hours" class="mb-2 ml-1">Phí giờ đầu (VND)</Label>
        <Input
          id="base_hours"
          v-model="home.base_hours"
          type="number"
          placeholder="Nhập số tiền..."
        />
      </div>

      <!-- Extra hours -->
      <div>
        <Label for="extra_hour" class="mb-2 ml-1"
          >Phí giờ tiếp theo (VND)</Label
        >
        <Input
          id="extra_hour"
          v-model="home.extra_hour"
          type="number"
          placeholder="Nhập số tiền..."
        />
      </div>

      <!-- Per day -->
      <div>
        <Label for="per_day" class="mb-2 ml-1">Thuê trong ngày (VND)</Label>
        <Input
          id="per_day"
          v-model="home.per_day"
          type="number"
          placeholder="Nhập số tiền..."
        />
      </div>

      <!-- Per day -->
      <div>
        <Label for="per_night" class="mb-2 ml-1">Thuê qua đêm (VND)</Label>
        <Input
          id="per_night"
          v-model="home.per_night"
          type="number"
          placeholder="Nhập số tiền..."
        />
      </div>

      <!-- Description -->
      <div>
        <Label for="description" class="mb-2 ml-1">Mô tả</Label>
        <Textarea
          id="description"
          v-model="home.description"
          placeholder="Nhập mô tả..."
          class="h-62"
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
            home.thumbnail ? "Thay đổi ảnh" : "Tải ảnh lên"
          }}</span>
          <NuxtImg
            v-if="home.thumbnail"
            :src="home.thumbnail"
            alt="Ảnh điểm đến"
            class="w-72 h-48 mt-2"
          />
        </div>
      </div>

      <!-- Content -->
      <div class="col-span-1 md:col-span-2">
        <Label for="content" class="mb-2 ml-1">Nội dung giới thiệu</Label>
        <ClientOnly>
          <TinyEditor
            :model-value="home.content"
            @update:model-value="home.content = $event"
          />
        </ClientOnly>
      </div>
    </div>

    <!-- Save button -->
    <div class="mt-6">
      <Button variant="default" @click="saveProperties"
        >Lưu thay đổi</Button
      >
    </div>
  </section>
</template>
