<template>
  <div class="p-2 rounded-md shadow-xs border border-dashed">
    <input
      ref="imageInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleImageUpload"
    />
    <Button size="icon" variant="secondary" @click="imageInput?.click()">
      <ImageIcon class="w-4 h-4" />
    </Button>
    <span class="text-md ml-2">{{
      imageUrl ? "Thay đổi ảnh" : "Tải ảnh lên"
    }}</span>
    <NuxtImg
      v-if="imageUrl"
      :src="imageUrl"
      alt="Ảnh phòng"
      class="w-72 h-48 mt-2"
    />
  </div>
</template>

<script setup lang="ts">
import { ImageIcon } from "lucide-vue-next";
import { toast } from "vue-sonner";
import type { Response } from "~/types";
import Button from "~/components/ui/button/Button.vue";

const props = defineProps({
  url: { type: String, default: "" },
});
const emit = defineEmits(["uploaded"]);

const config = useRuntimeConfig();
const toastTitle = "Tải ảnh lên";

const imageInput = ref<HTMLInputElement | null>(null);
const imageUrl = ref<string>(props.url);

const handleImageUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("media", file);

    const data = await $fetch<Response<string>>(
      `${config.public.apiBase}/home/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    imageUrl.value = data.data.items[0] ?? "";
    emit("uploaded", imageUrl.value);
    toast.success(toastTitle, {
      description: "Ảnh đã được tải lên thành công!",
    });
  } catch (error: any) {
    toast.error(toastTitle, {
      description: error?.data.message ?? "Có lỗi xảy ra khi tải ảnh lên, vui lòng thử lại!",
    });
  } finally {
    target.value = "";
  }
};

watch(
  props,
  () => {
    imageUrl.value = props.url;
  }
)
</script>
