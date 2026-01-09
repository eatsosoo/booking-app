<template>
  <div class="p-2 rounded-md shadow-xs border border-dashed bg-gray-50">
    <div class="flex items-center">
      <input
        ref="videoInput"
        type="file"
        accept="video/*"
        class="hidden"
        @change="handleVideoUpload"
      />
      <Button size="icon" @click="videoInput?.click()">
        <ImageIcon class="w-4 h-4" />
      </Button>
      <span class="text-[14px] ml-2">{{
        videoUrl ? "Thay đổi video" : "Tải video lên"
      }}</span>
      <Spinner v-if="loading" class="size-4 ml-2" />
    </div>
    <div>
      <video
        v-if="videoUrl"
        width="288"
        height="192"
        class="w-72 h-48 mt-2"
        autoplay
        controls
        loop
        playsinline
      >
        <source :src="videoUrl" type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ video.
      </video>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ImageIcon } from "lucide-vue-next";
import { toast } from "vue-sonner";
import type { Response } from "~/types";
import Button from "~/components/ui/button/Button.vue";
import Spinner from "~/components/ui/spinner/Spinner.vue";

const props = defineProps({
  url: { type: String, default: "" },
});
const emit = defineEmits(["uploaded"]);

const config = useRuntimeConfig();
const toastTitle = "Tải video lên";

const videoInput = ref<HTMLInputElement | null>(null);
const videoUrl = ref<string>(props.url);
const loading = ref<boolean>(false);

const handleVideoUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  loading.value = true;

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

    videoUrl.value = data.data.items[0] ?? "";
    emit("uploaded", videoUrl.value);
    toast.success(toastTitle, {
      description: "Video đã được tải lên thành công!",
    });
  } catch (error: any) {
    toast.error(toastTitle, {
      description:
        error?.data.message ??
        "Có lỗi xảy ra khi tải video lên, vui lòng thử lại!",
    });
  } finally {
    target.value = "";
    loading.value = false;
  }
};

watch(props, () => {
  videoUrl.value = props.url;
});
</script>
