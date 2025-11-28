<template>
  <div class="space-y-4 border border-dashed p-2 rounded-md">
    <!-- Nút upload -->
    <div class="flex items-center space-x-2">
      <label
        class="inline-block px-4 py-2 border border-dashed rounded-md cursor-pointer hover:bg-primary/10 transition"
      >
        <ImagesIcon class="w-4 h-4" />
        <input
          type="file"
          class="hidden"
          multiple
          accept="image/*"
          @change="handleFiles"
        />
      </label>
      <span>Tải ảnh</span>
    </div>

    <!-- Preview ảnh -->
    <div v-if="images.length > 0" class="grid grid-cols-3 gap-4">
      <div
        v-for="(img, index) in images"
        :key="img"
        class="relative group w-full h-32 rounded-md overflow-hidden border border-gray-200"
      >
        <img :src="img" alt="preview" class="w-full h-full object-cover" />

        <!-- Nút x hiện khi hover -->
        <button
          @click="removeImage(index)"
          class="absolute top-1 right-1 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
        >
          ×
        </button>
      </div>
    </div>
    <div v-else class="text-center">
      <p>Không có hình ảnh</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRuntimeConfig } from "#app";
import { toast } from "vue-sonner";
import { ImagesIcon } from "lucide-vue-next";

const props = defineProps({
  urls: { type: Array as PropType<string[]>, default: [] },
});

const emit = defineEmits<{
  (e: "uploaded", imageUrls: string[]): void;
}>();

const images = ref<string[]>(props.urls);
const config = useRuntimeConfig();
const toastTitle = "Upload ảnh";

const handleFiles = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  if (!files || files.length === 0) return;

  try {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("media", files[i]); // nhiều file cùng key "media"
    }

    const { data, error } = await useFetch<{ data: { items: string[] } }>(
      `${config.public.apiBase}/home/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (error.value) {
      toast.error(toastTitle, {
        description:
          error.value?.data?.message || "Có lỗi xảy ra khi tải ảnh lên!",
      });
      return;
    }

    const urls = data.value?.data.items || [];
    urls.forEach((url) => images.value.push(url));

    toast.success(toastTitle, {
      description: "Ảnh đã được tải lên thành công!",
    });

    emit("uploaded", images.value);
  } catch (err) {
    toast.error(toastTitle, {
      description: "Có lỗi xảy ra khi tải ảnh lên, vui lòng thử lại!",
    });
  } finally {
    target.value = "";
  }
};

const removeImage = (index: number) => {
  images.value.splice(index, 1);
  emit("uploaded", images.value);
};
</script>

<style scoped>
/* Hiện nút x khi hover ảnh */
.group:hover .group-hover\:flex {
  display: flex;
}
</style>
