<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { Category, Option2, Properties, Response, Service } from "~/types";
import Label from "~/components/ui/label/Label.vue";
import { toast } from "vue-sonner";
import { PROPERTY_TYPES } from "~/constants";
import Textarea from "~/components/ui/textarea/Textarea.vue";
import Separator from "~/components/ui/separator/Separator.vue";
import MultiSelect from "~/components/common/MultiSelect.vue";
import SearchSelect from "~/components/common/SearchSelect.vue";
import UploadImage from "~/components/common/UploadImage.vue";
import UploadMultiImage from "~/components/common/UploadMultiImage.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const { request } = useApi();
const route = useRoute();
const config = useRuntimeConfig();
const id = route.params.id;

const loading = ref<boolean>(false);
const multiSelected = reactive({
  property_types: [] as (string | number)[],
  services: [] as (string | number)[],
});
const serviceOptions = ref<Option2[]>([]);
const categoryOptions = ref<Option2[]>([]);

/* -----------------------
   GET DATA
------------------------- */
const { data } = await useAsyncData(`properties-${id}`, () =>
  request<Properties>(`/properties/${id}`)
);
const home = ref<Properties>(data.value?.data.items || ({} as Properties));

const { data: servicesData } = await useFetch<Response<Service[]>>(
  "/api/services"
);
const { data: categoriesData } = await useFetch<Response<Category[]>>(
  `${config.public.apiBase}/home/categories`
);

/* -----------------------
   UPDATE DATA
------------------------- */
const saveProperties = async () => {
  loading.value = true;
  try {
    await request(`/properties/${id}`, {
      method: "PUT",
      body: {
        ...home.value,
        property_types: multiSelected.property_types,
        services: multiSelected.services,
        slug: genSlug(home.value.name),
        category_id: Number(home.value.category_id),
      },
    });

    toast.success("Cập nhật phòng", {
      description: "Phòng đã được cập nhật thành công!",
    });
  } catch (err: any) {
    toast.error("Cập nhật phòng", {
      description: err?.message || "Không thể kết nối đến máy chủ!",
    });
  } finally {
    loading.value = false;
  }
};

multiSelected.property_types = home.value.property_types.map((item) => item.id);
multiSelected.services = home.value.services.map((item) => item.id);

serviceOptions.value =
  servicesData.value?.data.items.map((service) => ({
    label: service.title,
    value: service.id.toString(),
  })) || [];
categoryOptions.value =
  categoriesData.value?.data.items.map((service) => ({
    label: service.name,
    value: service.id.toString(),
  })) || [];
</script>

<template>
  <section>
    <h1 class="text-2xl font-semibold mb-8">Chi tiết & Chỉnh sửa phòng</h1>

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

      <!-- Loại -->
      <div>
        <Label for="type" class="mb-2 ml-1">Loại dự án</Label>
        <SearchSelect
          :model-value="home.category_id.toString()"
          :frameworks="categoryOptions"
          @update:model-value="home.category_id = $event"
        />
      </div>
    </div>

    <Separator class="my-6" />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>

    <Separator class="my-6" />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>

    <Separator class="my-6" />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <!-- Hạng mục -->
      <div>
        <Label for="property_types" class="mb-2 ml-1">Hạng mục</Label>
        <MultiSelect
          v-model="multiSelected.property_types"
          :options="PROPERTY_TYPES"
          placeholder="Chọn hạng mục..."
          class="w-64"
        />
      </div>

      <!-- Dịch vụ đi kèm -->
      <div>
        <Label for="property_types" class="mb-2 ml-1">Dịch vụ đi kèm</Label>
        <MultiSelect
          v-model="multiSelected.services"
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
          v-model="home.description"
          placeholder="Nhập mô tả..."
          class="h-64"
        />
      </div>

      <!-- Image -->
      <div>
        <Label for="thumbnail" class="mb-2 ml-1">Hình ảnh (thumbnail)</Label>
        <UploadImage
          :url="home.thumbnail"
          @uploaded="home.thumbnail = $event"
        />
      </div>

      <!-- Gallery -->
      <div class="col-span-1 md:col-span-2">
        <Label for="gallery" class="mb-2 ml-1">Ảnh trưng bày</Label>
        <UploadMultiImage
          :urls="home.gallery"
          @uploaded="home.gallery = $event"
        />
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
      <Button variant="default" :loading="loading" @click="saveProperties">Lưu thay đổi</Button>
    </div>
  </section>
</template>
