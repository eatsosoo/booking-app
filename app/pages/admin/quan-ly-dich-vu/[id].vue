<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { Response, Service } from "~/types";
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
import { ImageIcon } from "lucide-vue-next";
import { genSlug } from "~/utils/string-helper";

definePageMeta({
  layout: "admin",
});

const router = useRouter();
const config = useRuntimeConfig();

const apiUrl = `${config.public.apiBase}/services/${router.currentRoute.value.params.id}`;
const { data } = await useFetch<Response<Service>>(
  `${apiUrl}`,
  {
    method: "GET",
  }
);

// form
const imageInput = ref<HTMLInputElement | null>(null);
const service = ref<Service>({} as Service);

const pending = ref(false);

const saveService = async () => {
  pending.value = true;

  try {
    await $fetch(apiUrl, {
      method: "PUT",
      body: service.value,
    });

    toast.success("Tạo dịch vụ mới", {
      description: "Dịch vụ đã được cập nhật.",
    });

    router.push("/admin/quan-ly-dich-vu");
  } catch (err: any) {
    toast.error("Lỗi!", {
      description: err?.data?.message ?? err?.message ?? "Có lỗi xảy ra!",
    });
  } finally {
    pending.value = false;
  }
};


const handleImageUpload = async (e: Event) => {
  const toastTitle = "Tải ảnh";
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

    service.value.image = data.value?.data.items[0] ?? "";
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

service.value = data.value?.data.items || ({} as Service);
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
            service.image ? "Thay đổi ảnh" : "Tải ảnh lên"
          }}</span>
          <NuxtImg
            v-if="service.image"
            :src="service.image"
            alt="Ảnh bài viết"
            class="w-72 h-48 mt-2"
          />
        </div>
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
      <Button variant="default" :loading="pending" @click="saveService">
        Cập nhật
      </Button>
    </div>
  </section>
</template>
