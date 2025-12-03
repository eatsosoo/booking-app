<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { Service } from "~/types";
import Label from "~/components/ui/label/Label.vue";
import Textarea from "~/components/ui/textarea/Textarea.vue";
import { toast } from "vue-sonner";
import Select from "~/components/ui/select/Select.vue";
import SelectTrigger from "~/components/ui/select/SelectTrigger.vue";
import SelectValue from "~/components/ui/select/SelectValue.vue";
import SelectContent from "~/components/ui/select/SelectContent.vue";
import SelectGroup from "~/components/ui/select/SelectGroup.vue";
import SelectLabel from "~/components/ui/select/SelectLabel.vue";
import SelectItem from "~/components/ui/select/SelectItem.vue";
import { PUBLISHED_STATUSES, SERVICE_TYPES } from "~/constants";
import { genSlug } from "~/utils/string-helper";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const route = useRoute();
const { request } = useApi();
const id = route.params.id;

/* -----------------------
   GET DATA
------------------------- */
const { data } = await useAsyncData(`project-${id}`, () =>
  request<Service>(`/services/${id}`)
);
const service = ref<Service>(data.value?.data.items || ({} as Service));
const loading = ref<boolean>(false);

/* -----------------------
   UPDATE DATA
------------------------- */
const saveService = async () => {
  loading.value = true;

  try {
    await request<Service>(`/services/${id}`, {
      method: "PUT",
      body: service.value,
    });

    toast.success("Tạo dịch vụ mới", {
      description: "Dịch vụ đã được cập nhật.",
    });

    navigateTo("/admin/quan-ly-dich-vu");
  } catch (err: any) {
    toast.error("Lỗi!", {
      description: err?.data?.message ?? err?.message ?? "Có lỗi xảy ra!",
    });
  } finally {
    loading.value = false;
  }
};

if (typeof service.value.images === "string") {
  service.value.images = JSON.parse(service.value.images as unknown as string);
}
</script>

<template>
  <section>
    <h1 class="text-2xl font-semibold mb-8">Tạo dịch vụ mới</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Question -->
      <div>
        <Label for="title" class="mb-2 ml-1">Tên dịch vụ</Label>
        <Input
          id="title"
          v-model="service.title"
          placeholder="Nhập tên..."
          @change="service.slug = genSlug($event.target.value)"
        />
      </div>

      <!-- Slug -->
      <div>
        <Label for="slug" class="mb-2 ml-1">Slug</Label>
        <Input id="slug" v-model="service.slug" readonly />
      </div>

      <!-- Loại -->
      <div>
        <Label for="type" class="mb-2 ml-1">Cấp độ</Label>
        <Select v-model="service.menu">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Chọn hạng mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Lựa chọn</SelectLabel>
              <SelectItem
                v-for="(label, key) in SERVICE_TYPES"
                :key="key"
                :value="key"
              >
                {{ label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <!-- price -->
      <div>
        <Label for="price" class="mb-2 ml-1">Giá (VND)</Label>
        <Input
          id="price"
          v-model="service.price"
          type="number"
          placeholder="Nhập giá tiền..."
        />
      </div>

      <!-- Loại -->
      <div>
        <Label for="is_published" class="mb-2 ml-1">Trạng thái</Label>
        <Select v-model="service.is_published">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Chọn trạng thái..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Lựa chọn</SelectLabel>
              <SelectItem
                v-for="(label, key) in PUBLISHED_STATUSES"
                :key="key"
                :value="key"
              >
                {{ label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div></div>

      <!-- Image -->
      <div>
        <Label for="thumbnail" class="mb-2 ml-1">Hình ảnh</Label>
        <UploadImage
          :url="service.image"
          @uploaded="service.image = $event"
        />
      </div>

      <!-- description -->
      <div>
        <Label for="description" class="mb-2 ml-1">Mô tả</Label>
        <Textarea
          id="description"
          v-model="service.description"
          placeholder="Nhập mô tả..."
          class="h-[254px]"
        />
      </div>
    </div>

    <div class="mt-6">
      <Button variant="default" :loading="loading" @click="saveService">
        Cập nhật
      </Button>
    </div>
  </section>
</template>
