<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type {
  Category,
  Option,
  Option2,
  Option3,
  Response,
  Service,
} from "~/types";
import Label from "~/components/ui/label/Label.vue";
import { toast } from "vue-sonner";
import Textarea from "~/components/ui/textarea/Textarea.vue";
import type { PropertiesForm } from "~/types/booking";
import { PROPERTY_TYPES } from "~/constants";
import MultiSelect from "~/components/common/MultiSelect.vue";
import Separator from "~/components/ui/separator/Separator.vue";
import SearchSelect from "~/components/common/SearchSelect.vue";
import { genSlug } from "~/utils/string-helper";
import UploadImage from "~/components/common/UploadImage.vue";
import UploadMultiImage from "~/components/common/UploadMultiImage.vue";
import EditorCustom from "~/components/common/EditorCustom.vue";
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

const config = useRuntimeConfig();
const serviceOptions = ref<Option[]>([]);
const categoryOptions = ref<Option3[]>([]);
const post = ref<PropertiesForm>({
  name: "",
  description: "",
  address: "",
  type: "villa",
  area: 50,
  guest: 1,
  bedrooms: 1,
  bathrooms: 1,
  bed: 1,
  base_hours: 0,
  extra_hour: 0,
  per_day: 0,
  per_night: 0,
  per_month: 0,
  content: "<p>Nội dung giới thiệu...</p>",
  thumbnail: "",
  gallery: [],
  services: [],
  property_types: [],
  category_id: 1,
  slug: "",
  region: "Miền Bắc",
});

const { data: servicesData } = await useFetch<Response<Service[]>>(
  "/api/services"
);
const { data: categoriesData } = await useFetch<Response<Category[]>>(
  `${config.public.apiBase}/home/categories`
);

const { request } = useApi();
const pending = ref(false);

const savePost = async () => {
  pending.value = true;

  try {
    await request("/properties", {
      method: "POST",
      body: {
        ...post.value,
        category_id: Number(post.value.category_id),
      },
    });

    toast.success("Phòng mới đã được tạo thành công!", {
      description: "Phòng mới đã được thêm.",
    });

    navigateTo("/admin/quan-ly-phong");
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

const handleContentChange = (val: string) => {
  post.value.content = val;
};

serviceOptions.value =
  servicesData.value?.data.items.map((service) => ({
    label: service.title,
    value: service.id,
  })) || [];
categoryOptions.value =
  categoriesData.value?.data.items.map((service) => ({
    label: service.name,
    value: service.id,
  })) || [];

post.value.category_id = categoryOptions.value[0]?.value;
</script>

<template>
  <section>
    <h1 class="text-2xl font-semibold mb-8">Tạo phòng mới</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Title -->
      <div>
        <Label for="title" class="mb-2 ml-1">Tiêu đề</Label>
        <Input
          id="title"
          v-model="post.name"
          placeholder="Nhập tiêu đề..."
          @change="post.slug = genSlug($event.target.value)"
        />
      </div>

      <!-- Loại hình -->
      <div>
        <Label for="property_types" class="mb-2 ml-1">Loại hình</Label>
        <MultiSelect
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

      <!-- Address -->
      <div>
        <Label for="address" class="mb-2 ml-1">Địa chỉ</Label>
        <Input
          id="address"
          v-model="post.address"
          placeholder="Nhập địa chỉ..."
        />
      </div>

      <!-- Area -->
      <div>
        <Label for="area" class="mb-2 ml-1">Diện tích</Label>
        <Input
          id="area"
          v-model="post.area"
          type="number"
          placeholder="Nhập diện tích..."
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
    </div>

    <Separator class="my-6" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Bathrooms -->
      <div>
        <Label for="bathrooms" class="mb-2 ml-1">Số phòng tắm</Label>
        <Input
          id="bathrooms"
          v-model="post.bathrooms"
          type="number"
          placeholder="Nhập số phòng..."
        />
      </div>

      <!-- bedrooms -->
      <div>
        <Label for="bedrooms" class="mb-2 ml-1">Số phòng ngủ</Label>
        <Input
          id="bedrooms"
          v-model="post.bedrooms"
          type="number"
          placeholder="Nhập số phòng..."
        />
      </div>

      <!-- bed -->
      <div>
        <Label for="bed" class="mb-2 ml-1">Số giường ngủ</Label>
        <Input
          id="bed"
          v-model="post.bed"
          type="number"
          placeholder="Nhập số giường..."
        />
      </div>

      <!-- guest -->
      <div>
        <Label for="guest" class="mb-2 ml-1">Sức chứa (khách)</Label>
        <Input
          id="guest"
          v-model="post.guest"
          type="number"
          placeholder="Nhập số lượng khách..."
        />
      </div>
    </div>

    <Separator class="my-6" />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Base hours -->
      <div>
        <Label for="base_hours" class="mb-2 ml-1">Phí giờ đầu (VND)</Label>
        <Input
          id="base_hours"
          v-model="post.base_hours"
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
          v-model="post.extra_hour"
          type="number"
          placeholder="Nhập số tiền..."
        />
      </div>

      <!-- Per day -->
      <div>
        <Label for="per_day" class="mb-2 ml-1">Thuê trong ngày (VND)</Label>
        <Input
          id="per_day"
          v-model="post.per_day"
          type="number"
          placeholder="Nhập số tiền..."
        />
      </div>

      <!-- Per day -->
      <div>
        <Label for="per_night" class="mb-2 ml-1">Thuê qua đêm (VND)</Label>
        <Input
          id="per_night"
          v-model="post.per_night"
          type="number"
          placeholder="Nhập số tiền..."
        />
      </div>

      <!-- Per month -->
      <div>
        <Label for="per_month" class="mb-2 ml-1">Thuê theo tháng (VND)</Label>
        <Input
          id="per_month"
          v-model="post.per_month"
          type="number"
          placeholder="Nhập số tiền..."
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
    </div>

    <Separator class="my-6" />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <UploadImage
          :url="post.thumbnail"
          @uploaded="post.thumbnail = $event"
        />
      </div>

      <!-- Gallery -->
      <div class="col-span-1 md:col-span-2">
        <Label for="gallery" class="mb-2 ml-1">Ảnh trưng bày</Label>
        <UploadMultiImage
          :urls="post.gallery"
          @uploaded="post.gallery = $event"
        />
      </div>

      <!-- Content -->
      <div class="col-span-1 md:col-span-2">
        <Label for="content" class="mb-2 ml-1">Nội dung giới thiệu</Label>
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
      <Button variant="default" :loading="pending" @click="savePost"
        >Tạo mới</Button
      >
    </div>
  </section>
</template>
